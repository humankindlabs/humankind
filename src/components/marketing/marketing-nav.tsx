// src/components/marketing/marketing-nav.tsx
//
// Client-side marketing nav with cross-domain user widget.
//
// Strategy: use the useHumankindUser hook to fetch user identity from
// app.humankind.center via CORS. While loading, show a subtle skeleton
// in place of the auth buttons (no "Sign in" flash for logged-in users).

"use client";

import Link from "next/link";
import { useHumankindUser } from "@/hooks/use-humankind-user";

const APP_URL = "https://app.humankind.center";

const NAV_LINKS = [
  { label: "Our Vision",         href: "/our-vision" },
  { label: "What is humankind",  href: "/what-is-humankind" },
  { label: "Connect",            href: "/connect" },
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
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {l.label}
          </Link>
        ))}
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
// Logged-in user widget — avatar + name/email, links to dashboard
// ────────────────────────────────────────────────────────────────────────
function UserWidget({
  user,
}: {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    avatarUrl: string | null;
  };
}) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "humankind member";
  const initial = (user.firstName?.[0] ?? user.email?.[0] ?? "H").toUpperCase();

  return (
    <a
      href={`${APP_URL}/media`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.875rem",
        textDecoration: "none",
        padding: "0.25rem 0.25rem 0.25rem 0.75rem",
        borderRadius: "99px",
        transition: "background 0.15s",
      }}
      className="hk-user-widget"
      title="Go to your dashboard"
    >
      <div
        style={{
          textAlign: "right",
          lineHeight: 1.2,
        }}
        className="hk-user-widget-info"
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#fff",
          }}
        >
          {fullName}
        </p>
        {user.email && (
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {user.email}
          </p>
        )}
      </div>

      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt=""
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#0CB001",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
      )}

      <style>{`
        .hk-user-widget:hover { background: rgba(255,255,255,0.05); }
      `}</style>
    </a>
  );
}
