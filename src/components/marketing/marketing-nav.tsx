// src/components/marketing/marketing-nav.tsx
//
// Marketing nav with logged-in user widget.
//
// Logged in:    avatar circle + name/email on right side, clicking goes to dashboard
// Not logged in: "Sign in" link + "Join Free" CTA button
//
// Auth detection happens server-side via cross-domain cookies on .humankind.center.

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const APP_URL = "https://app.humankind.center";

const NAV_LINKS = [
  { label: "Our Vision", href: "/our-vision" },
  { label: "What is humankind", href: "/what-is-humankind" },
  { label: "Conf",        href: "https://conf.humankind.center/", external: true },
] as const;

export async function MarketingNav() {
  let userInfo: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    avatarUrl: string | null;
  } | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url, email")
        .eq("id", user.id)
        .maybeSingle<{
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          email: string | null;
        }>();

      userInfo = {
        firstName: profile?.first_name ?? null,
        lastName: profile?.last_name ?? null,
        email: profile?.email ?? user.email ?? null,
        avatarUrl: profile?.avatar_url ?? null,
      };
    }
  } catch {
    // Anonymous visitor or auth error — render the signed-out state
  }

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
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        {userInfo ? (
          <UserWidget user={userInfo} />
        ) : (
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
        )}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hk-marketing-nav-links { display: none !important; }
          .hk-user-widget-info { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Logged-in user widget — avatar + name/email block, links to dashboard
// ───────────────────────────────────────────────────────────────────────

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
      href={`${APP_URL}/dashboard`}
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
