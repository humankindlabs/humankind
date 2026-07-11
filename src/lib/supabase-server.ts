// src/lib/supabase-server.ts
//
// Server-side Supabase client for the marketing site.
//
// Reads auth cookies scoped to NEXT_PUBLIC_COOKIE_DOMAIN (e.g. ".humankind.center"
// in production), allowing detection of users logged in via app.humankind.center.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const merged: CookieOptions = COOKIE_DOMAIN
                ? { ...options, domain: COOKIE_DOMAIN }
                : options;
              cookieStore.set(name, value, merged);
            });
          } catch {
            // Server Components can't set cookies — safe to ignore here
            // since we're only reading auth state.
          }
        },
      },
    }
  );
}
