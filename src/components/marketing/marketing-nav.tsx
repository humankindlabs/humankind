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
          // brand wordmark: Mont Heavy, app-logo size
          fontFamily: "'Mont', system-ui, sans-serif",
          fontSize: "1.4625rem",
          fontWeight: 900,
          textDecoration: "none",
          letterSpacing: "-0.01em",
          color: "#fff",
          lineHeight: 1,
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

  // Prefer THE menu computed by the app (/api/public/me — single source of
  // truth for every property); the local list is only an offline fallback.
  const items: Array<{ href: string; label: string; icon?: string; accent?: string } | "divider"> = user.menu ?? [
    { href: `${APP_URL}/media`, label: "Live Stream", icon: "play" },
    { href: paid && u ? `${APP_URL}/human/${u}/events` : `${APP_URL}/events`, label: "Upcoming Events", icon: "cal" },
    { href: "https://stay.humankind.center/", label: "Stay Listings", icon: "home" },
    ...(u ? [{ href: `${APP_URL}/human/${u}`, label: "Account", icon: "user" }] : []),
    ...(paid && u ? [{ href: `${APP_URL}/human/${u}/tickets`, label: "Tickets", icon: "ticket" }] : []),
    ...(u ? [{ href: `${APP_URL}/human/${u}/gov`, label: "Governance", icon: "vote" }] : []),
    ...(u ? [{ href: `${APP_URL}/human/${u}/settings/billing`, label: "Billing", icon: "card" }] : []),
    ...(isAdmin || canCheckIn ? ["divider" as const] : []),
    ...(isAdmin ? [{ href: `${APP_URL}/admin`, label: "Admin", icon: "shield", accent: "#818cf8" }] : []),
    ...(canCheckIn ? [{ href: `${APP_URL}/check-in/kiosk`, label: "Check-in", icon: "checkin", accent: "#34d399" }] : []),
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
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: item.accent ?? "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                }}
              >
                <MenuItemIcon name={item.icon ?? "home"} />
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

function MenuItemIcon({ name }: { name: string }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <span style={{ width: "16px", height: "16px", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {name === "home" && (
        <svg {...props}><path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></svg>
      )}
      {name === "cal" && (
        <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      )}
      {name === "play" && (
        <svg {...props}><polygon points="5 3 19 12 5 21 5 3" /></svg>
      )}
      {name === "ticket" && (
        <svg {...props}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
      )}
      {name === "vote" && (
        <svg {...props}><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
      )}
      {name === "gear" && (
        <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .67.39 1.27 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.24.61.84 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
      )}
      {name === "user" && (
        <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      )}
      {name === "qr" && (
        <svg {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><line x1="14" y1="14" x2="21" y2="14" /><line x1="14" y1="18" x2="18" y2="18" /><line x1="14" y1="21" x2="21" y2="21" /></svg>
      )}
      {name === "shield" && (
        <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      )}
      {name === "checkin" && (
        <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>
      )}
      {name === "card" && (
        <svg {...props}><rect x="2" y="5" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
      )}
      {name === "logout" && (
        <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
      )}
    </span>
  );
}
