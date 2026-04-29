// src/components/homepage/sections/SectionCommunityCTA.tsx
import Link from "next/link";

export function SectionCommunityCTA() {
  return (
    <section style={{ padding: "7rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(12,176,1,0.08) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div style={{ position: "relative", maxWidth: "620px", margin: "0 auto" }}>
        <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Join the Community</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "#fff" }}>
          Ready to be part<br />of something real?
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          Join thousands of members already experiencing conscious events, weekly streams, and genuine connection — rooted in Sedona.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="https://app.humankind.center/register" className="hk-btn hk-btn-primary hk-btn-lg" style={{ borderRadius: "99px", boxShadow: "0 0 36px rgba(12,176,1,0.3)" }}>
            Join for Free
          </Link>
          <Link href="https://app.humankind.center/login" className="hk-btn hk-btn-secondary hk-btn-lg" style={{ borderRadius: "99px" }}>
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}