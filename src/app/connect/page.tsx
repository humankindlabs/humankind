// src/app/connect/page.tsx
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

export const metadata: Metadata = {
  title: "Connect — Humankind Center",
  description:
    "Get in touch with humankind. Newsletter, phone, and social channels — stay connected with our Sedona community.",
};

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/athumankind", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/humankind.center/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@Humankindcenter", icon: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@humankind.center", icon: "tiktok" },
  { label: "Reddit", href: "https://www.reddit.com/user/humankindcenter/", icon: "reddit" },
] as const;

export default function ConnectPage() {
  return (
    <div
      style={{
        background: "#00031C",
        color: "#fff",
        minHeight: "100dvh",
        fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
        overflowX: "hidden",
      }}
    >
      <MarketingNav />

      {/* Hero */}
      <section
        style={{
          padding: "5rem 2rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          <p
            className="hk-eyebrow"
            style={{ color: "#0CB001", marginBottom: "1rem" }}
          >
            Get in touch
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
              color: "#fff",
            }}
          >
            Connect with humankind
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Whether you have a question, want to collaborate, or just want to stay
            in the loop — here&apos;s how to reach us.
          </p>
        </div>
      </section>

      {/* Two-column: contact info + newsletter */}
      <section style={{ padding: "3rem 2rem 5rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
          }}
          className="hk-connect-grid"
        >
          {/* LEFT — contact info */}
          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Reach out directly
            </h2>

            <div style={{ display: "grid", gap: "1.25rem" }}>
              <ContactRow
                label="Phone"
                value={
                  <a
                    href="tel:+16026228555"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    (602) 622-8555
                  </a>
                }
              />
              <ContactRow
                label="Visit"
                value={
                  <span style={{ color: "#fff" }}>
                    1730 W State Rte 89A Suite 7
                    <br />
                    Sedona, AZ 86336
                  </span>
                }
              />
            </div>

            {/* Socials */}
            <div style={{ marginTop: "2.5rem" }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "1rem",
                }}
              >
                Follow Along
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "44px",
                      height: "44px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "0.625rem",
                      background: "rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "border-color 0.15s, color 0.15s, background 0.15s",
                    }}
                    className="hk-social-icon"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — newsletter */}
          <div
            style={{
              padding: "2rem",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1.25rem",
            }}
          >
            <p
              className="hk-eyebrow"
              style={{ color: "#0CB001", marginBottom: "0.75rem" }}
            >
              Newsletter
            </p>
            <h2
              style={{
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Stay in the loop
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}
            >
              Get updates on upcoming events, live streams, and what&apos;s
              happening at the Sedona center.
            </p>
            <NewsletterForm source="connect-page" />
          </div>
        </div>
      </section>

      <HomepageFooter />

      <style>{`
        .hk-social-icon:hover {
          border-color: rgba(12,176,1,0.4) !important;
          color: #0CB001 !important;
          background: rgba(12,176,1,0.06) !important;
        }
        @media (max-width: 768px) {
          .hk-connect-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "1rem 1.25rem",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "0.875rem",
      }}
    >
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: "1rem", lineHeight: 1.55, margin: 0 }}>{value}</p>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon
            points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
            fill="white"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
        </svg>
      );
    case "reddit":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path
            fill="white"
            d="M20 12a2 2 0 0 0-2-2 2 2 0 0 0-1.28.46A9.65 9.65 0 0 0 13 9.5l.72-3.37 2.34.5a1.5 1.5 0 1 0 .16-.73l-2.6-.55a.27.27 0 0 0-.32.2l-.8 3.78A9.65 9.65 0 0 0 7.28 10.46 2 2 0 0 0 4 12a2 2 0 0 0 1 1.73 3.42 3.42 0 0 0 0 .44C5 16.31 8.13 18 12 18s7-1.69 7-3.83a3.42 3.42 0 0 0 0-.44A2 2 0 0 0 20 12zm-11 1.5a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm5.83 2.78a3.82 3.82 0 0 1-3.66 0 .25.25 0 0 1 .24-.44 3.31 3.31 0 0 0 3.18 0 .25.25 0 1 1 .24.44zm-.33-1.78a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
          />
        </svg>
      );
    default:
      return null;
  }
}