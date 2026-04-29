// src/components/homepage/HomepageFooter.tsx
import Link from "next/link";

const NAV_LINKS = [
  { label: "Our Vision",            href: "/our-vision" },
  { label: "What Is Humankind?",    href: "/what-is-humankind" },
  { label: "Meditation Downloads",  href: "https://humankind.center/meditation-downloads/", external: true },
  { label: "Shop Our Merch",        href: "https://humankind.center/shop/", external: true },
  { label: "Book the Venue",        href: "https://venue.humankind.center/", external: true },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/athumankind",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/humankind.center/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Humankindcenter",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@humankind.center",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/humankindcenter/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <path fill="white" d="M20 12a2 2 0 0 0-2-2 2 2 0 0 0-1.28.46A9.65 9.65 0 0 0 13 9.5l.72-3.37 2.34.5a1.5 1.5 0 1 0 .16-.73l-2.6-.55a.27.27 0 0 0-.32.2l-.8 3.78A9.65 9.65 0 0 0 7.28 10.46 2 2 0 0 0 4 12a2 2 0 0 0 1 1.73 3.42 3.42 0 0 0 0 .44C5 16.31 8.13 18 12 18s7-1.69 7-3.83a3.42 3.42 0 0 0 0-.44A2 2 0 0 0 20 12zm-11 1.5a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm5.83 2.78a3.82 3.82 0 0 1-3.66 0 .25.25 0 0 1 .24-.44 3.31 3.31 0 0 0 3.18 0 .25.25 0 1 1 .24.44zm-.33-1.78a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>
      </svg>
    ),
  },
];

export function HomepageFooter() {
  return (
    <footer style={{
      background: "rgba(0,3,28,0.98)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
    }}>

      {/* Main footer content */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "4rem 2rem 3rem",
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        gap: "2.5rem",
      }}>

        {/* Logo */}
        <div>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--hk-font-brand)", fontWeight: 900, letterSpacing: "0.04em", color: "#fff" }}>
            humankind
          </p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>
            Conscious Community · Sedona, AZ
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 2rem", justifyContent: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
              className="hk-footer-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Follow us + social icons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Follow Us :</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: "44px", height: "44px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "0.625rem",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "border-color 0.15s, color 0.15s, background 0.15s",
                }}
                className="hk-social-icon"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Address + phone */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#fff" }}>Humankind Center</p>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            1730 W State Rte 89A Suite 7<br />Sedona, AZ 86336
          </p>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
            Support line:{" "}
            <a href="tel:+16026228555" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              (602) 622-8555
            </a>
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "1.25rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1rem",
        maxWidth: "1200px", margin: "0 auto",
      }}>
        <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} Humankind Center. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/privacy" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
      </div>

      <style>{`
        .hk-footer-link:hover { color: #fff !important; }
        .hk-social-icon:hover { border-color: rgba(12,176,1,0.4) !important; color: #0CB001 !important; background: rgba(12,176,1,0.06) !important; }
      `}</style>
    </footer>
  );
}