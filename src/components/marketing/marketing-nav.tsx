// src/components/marketing/marketing-nav.tsx
//
// Client-side marketing nav with cross-domain user widget.
//
// Strategy: use the useHumankindUser hook to fetch user identity from
// app.humankind.center via CORS. While loading, show a subtle skeleton
// in place of the auth buttons (no "Sign in" flash for logged-in users).

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useHumankindUser, clearHumankindUserCache, type HumankindUser } from "@/hooks/use-humankind-user";

const APP_URL = "https://app.humankind.center";

const NAV_LINKS = [
  { label: "Our Vision",         href: "/our-vision" },
  { label: "What is humankind",  href: "/what-is-humankind" },
  { label: "Connect",            href: "/connect" },
  { label: "Book the Venue",     href: "https://venue.humankind.center/", external: true },
] as const;

export function MarketingNav() {
  const { user, loading } = useHumankindUser();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 1.5rem",
        background: "rgba(0, 3, 28, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      className="hk-marketing-nav"
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          fontSize: "1.0625rem",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: "-0.01em",
          color: "#fff",
        }}
      >
        humankind
      </Link>

      {/* Center links */}
      <div
        style={{
          display: "flex",
          gap: "1.75rem",
          alignItems: "center",
        }}
        className="hk-marketing-nav-links"
      >
        {NAV_LINKS.map((l) => {
          const style = {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontWeight: 500,
          } as const;
          return "external" in l && l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" style={style}>
              {l.label}
            </a>
          ) : (
            <Link key={l.href} href={l.href} style={style}>
              {l.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", minHeight: "44px" }}>
        {loading ? (
          <NavSkeleton />
        ) : user ? (
          <UserWidget user={user} />
        ) : (
          <SignedOutButtons />
        )}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hk-marketing-nav-links { display: none !important; }
          .hk-user-widget-info { display: none !important; }
        }
        @keyframes hk-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Loading skeleton — subtle pulsing circle, matches user widget size
// ────────────────────────────────────────────────────────────────────────
function NavSkeleton() {
  return (
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        animation: "hk-pulse 1.4s ease-in-out infinite",
      }}
      aria-label="Loading"
    />
  );
}

// ────────────────────────────────────────────────────────────────────────
// Signed-out buttons
// ────────────────────────────────────────────────────────────────────────
function SignedOutButtons() {
  return (
    <>
      <a
        href={`${APP_URL}/login`}
        style={{
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.7)",
          textDecoration: "none",
          padding: "0.5rem 0.75rem",
          fontWeight: 500,
        }}
      >
        Sign in
      </a>
      <a
        href={`${APP_URL}/register`}
        style={{
          background: "#0CB001",
          color: "#fff",
          padding: "0.5rem 1.125rem",
          borderRadius: "99px",
          fontSize: "0.875rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Join Free
      </a>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Logged-in user widget — avatar + name/email opens the same dropdown menu
// as the app's top bar, with absolute links into app.humankind.center.
// ────────────────────────────────────────────────────────────────────────
function UserWidget({ user }: { user: HumankindUser }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "humankind member";
  const initial = (user.firstName?.[0] ?? user.email?.[0] ?? "H").toUpperCase();

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const u = user.username ? encodeURIComponent(user.username) : null;
  const paid = user.tier === "online" || user.tier === "full";
  const isAdmin = user.role === "admin" || user.role === "super_admin";
  const canCheckIn = isAdmin || user.role === "host";

  const items: Array<{ href: string; label: string; accent?: string } | "divider"> = [
    { href: `${APP_URL}/media`, label: "Live Stream" },
    { href: paid && u ? `${APP_URL}/human/${u}/events` : `${APP_URL}/events`, label: "Upcoming Events" },
    ...(u ? [{ href: `${APP_URL}/human/${u}`, label: "Account" }] : []),
    ...(paid && u ? [{ href: `${APP_URL}/human/${u}/tickets`, label: "Tickets" }] : []),
    ...(u ? [{ href: `${APP_URL}/human/${u}/gov`, label: "Governance" }] : []),
    ...(paid && u ? [{ href: `${APP_URL}/human/${u}/settings/billing`, label: "Billing" }] : []),
    ...(isAdmin || canCheckIn ? ["divider" as const] : []),
    ...(isAdmin ? [{ href: `${APP_URL}/admin`, label: "Admin", accent: "#818cf8" }] : []),
    ...(canCheckIn ? [{ href: `${APP_URL}/check-in/kiosk`, label: "Check-in", accent: "#0CB001" }] : []),
  ];

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="hk-user-widget"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          padding: "0.25rem 0.25rem 0.25rem 0.75rem",
          borderRadius: "99px",
          transition: "background 0.15s",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        title="Open menu"
      >
        <div style={{ textAlign: "right", lineHeight: 1.2 }} className="hk-user-widget-info">
          <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500, color: "#fff" }}>{fullName}</p>
          {user.email && (
            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{user.email}</p>
          )}
        </div>

        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <div
            style={{
              width: "44px", height: "44px", borderRadius: "50%", background: "#0CB001",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 600, fontSize: "0.875rem", flexShrink: 0,
            }}
          >
            {initial}
          </div>
        )}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            right: 0,
            minWidth: "230px",
            background: "#0b1020",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "0.5rem",
            boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            zIndex: 100,
          }}
        >
          {items.map((item, i) =>
            item === "divider" ? (
              <div key={`d-${i}`} style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0.375rem 0.25rem" }} />
            ) : (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                className="hk-menu-item"
                style={{
                  display: "block",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: item.accent ?? "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ),
          )}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0.375rem 0.25rem" }} />
          <a
            href={`${APP_URL}/auth/logout`}
            role="menuitem"
            className="hk-menu-item"
            onClick={() => clearHumankindUserCache()}
            style={{
              display: "block",
              padding: "0.625rem 0.875rem",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
            }}
          >
            Sign out
          </a>
        </div>
      )}

      <style>{`
        .hk-user-widget:hover { background: rgba(255,255,255,0.05); }
        .hk-menu-item:hover { background: rgba(255,255,255,0.07); }
      `}</style>
    </div>
  );
}
