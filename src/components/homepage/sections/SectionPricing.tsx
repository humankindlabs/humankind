// src/components/homepage/sections/SectionPricing.tsx
import Link from "next/link";

const PLANS = [
  {
    tier: "free",
    title: "Free",
    price: "Free",
    features: ["Public events", "Basic streaming", "Community profile", "Event discovery"],
    cta: "Get Started",
    href: "https://app.humankind.center/register",
  },
  {
    tier: "full",
    title: "Full Membership",
    price: "$77/mo",
    features: ["In-person events", "Event check-in (QR)", "Member gatherings", "Priority registration", "Full livestream + replays"],
    cta: "Join Now",
    href: "https://app.humankind.center/register?tier=full",
    highlight: true,
  },
  {
    tier: "online",
    title: "Online Access",
    price: "$11/mo",
    features: ["Full livestream", "Replay library", "Member-only streams", "Live chat"],
    cta: "Join Now",
    href: "https://app.humankind.center/register?tier=online",
  },
  {
    tier: "kids",
    title: "Kids",
    price: "Free",
    features: ["Age-appropriate content", "Guardian approval", "Safe community"],
    cta: "Get Started",
    href: "https://app.humankind.center/register?tier=kids",
  },
];

export function SectionPricing() {
  return (
    <section style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Membership</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1rem", color: "#fff" }}>Choose your access level</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", maxWidth: "440px", margin: "0 auto" }}>Start free and upgrade anytime. Cancel whenever you want.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
          {PLANS.map((plan) => (
            <div key={plan.tier} style={{
              padding: "1.75rem",
              background: plan.highlight ? "rgba(12,176,1,0.05)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${plan.highlight ? "rgba(12,176,1,0.28)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "1.5rem", position: "relative",
            }}>
              {plan.highlight && (
                <div style={{ position: "absolute", top: "-1px", right: "1.25rem", background: "#0CB001", color: "#fff", fontSize: "0.6875rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "0 0 0.75rem 0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Popular
                </div>
              )}
              <p style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "0.375rem", color: "#fff" }}>{plan.title}</p>
              <p style={{ fontSize: "1.875rem", fontWeight: 800, color: plan.highlight ? "#0CB001" : "#fff", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
                {plan.price.includes("/") ? (
                  <>
                    <span style={{ fontFamily: "var(--hk-font-brand)" }}>{plan.price.split("/")[0]}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>/mo</span>
                  </>
                ) : (
                  <span style={{ fontFamily: "var(--hk-font-brand)" }}>{plan.price}</span>
                )}
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}>
                    <span style={{ color: "#0CB001", flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`hk-btn hk-btn-full ${plan.highlight ? "hk-btn-primary" : "hk-btn-secondary"}`} style={{ borderRadius: "99px", justifyContent: "center" }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="hk-meta" style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Questions? <a href="mailto:hello@humankind.center" style={{ color: "#0CB001", textDecoration: "none" }}>Contact us</a>
        </p>
      </div>
    </section>
  );
}