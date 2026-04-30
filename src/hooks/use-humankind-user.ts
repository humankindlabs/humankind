// src/hooks/use-humankind-user.ts
//
// Client-side hook that fetches the current user's identity from
// app.humankind.center/api/public/me via cross-domain CORS request.
//
// Uses sessionStorage to cache the result so navigations within the marketing
// site don't refetch on every page. Cache lives only for the session — closes
// with the tab, so logging in/out is reflected on the next tab open.
//
// Returns:
//   { user, loading, error }
//
// Use:
//   const { user, loading } = useHumankindUser();
//   if (loading) return <Skeleton />;
//   if (!user) return <SignInButton />;
//   return <UserWidget user={user} />;

"use client";

import { useEffect, useState } from "react";

const APP_URL = "https://app.humankind.center";
const CACHE_KEY = "hk_user_v1";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export type HumankindUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatarUrl: string | null;
  username: string | null;
};

type CacheEntry = {
  user: HumankindUser | null;
  fetchedAt: number;
};

function readCache(): CacheEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(user: HumankindUser | null) {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { user, fetchedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // sessionStorage may be unavailable (Safari private mode, etc.) — ignore
  }
}

export function useHumankindUser() {
  // Initialize from cache if available — avoids loading flash on subsequent navs
  const cached = typeof window !== "undefined" ? readCache() : null;

  const [user, setUser] = useState<HumankindUser | null>(cached?.user ?? null);
  const [loading, setLoading] = useState<boolean>(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // If cache is fresh, no need to refetch
    const fresh = readCache();
    if (fresh) {
      setUser(fresh.user);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${APP_URL}/api/public/me`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = (await res.json()) as { user: HumankindUser | null };
        if (cancelled) return;

        setUser(data.user);
        writeCache(data.user);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setUser(null);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, error };
}

/**
 * Manually clear the user cache. Call this after sign-out from another tab,
 * or when you want to force a refresh.
 */
export function clearHumankindUserCache() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}
