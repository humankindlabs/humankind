// src/components/homepage/sections/SectionFeatureSplit.tsx
// Alternating image + text rows — index-2 AIMade pattern
import Link from "next/link";

const ROWS = [
  {
    eyebrow: "Live Events",
    title: "Gather in person in Sedona",
    body: "From conscious conferences to sound healings, live music, and dance — Humankind hosts weekly experiences at our Sedona venue. Every event is designed to connect you with community and elevate your awareness.",
    cta: { label: "View Upcoming Events", href: "/events" },
    image: "/images/homepage/ai/img-7.jpg",
    imageRight: false,
    badge: "In Person",
  },
  {
    eyebrow: "Live Streaming",
    title: "Watch from anywhere in the world",
    body: "Can't make it to Sedona? Our weekly podcast and member-only streams bring the experience directly to you. Full replay library, live chat, and member access — available globally.",
    cta: { label: "Watch Live", href: "/live" },
    image: "/images/homepage/ai/img-8.jpg",
    imageRight: true,
    badge: "Online Access",
  },
];

export function SectionFeatureSplit() {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
        {ROWS.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hk-split-section">

            {/* Image side */}
            <div style={{ order: row.imageRight ? 2 : 1, position: "relative" }}>
              <div style={{ borderRadius: "1.5rem", overflow: "hidden", position: "relative" }}>
                <img src={row.image} alt="" style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }} />
                {/* Dark overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.35)" }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: "1.5rem", left: "1.5rem",
                background: "rgba(0,3,28,0.8)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(12,176,1,0.25)",
                borderRadius: "99px", padding: "0.375rem 1rem",
                fontSize: "0.75rem", fontWeight: 700, color: "#0CB001",
                letterSpacing: "0.06em", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0CB001", animation: "hk-blink 1.5s infinite" }} />
                {row.badge}
              </div>
            </div>

            {/* Text side */}
            <div style={{ order: row.imageRight ? 1 : 2, maxWidth: "480px" }}>
              <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0CB001", background: "rgba(12,176,1,0.1)", marginBottom: "1.25rem" }}>
                {row.eyebrow}
              </span>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
                {row.title}
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "2rem" }}>
                {row.body}
              </p>
              <Link href={row.cta.href} style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "#0CB001", color: "#fff",
                padding: "0.75rem 1.75rem", borderRadius: "99px",
                fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none",
                boxShadow: "0 0 24px rgba(12,176,1,0.25)",
              }}>
                {row.cta.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hk-split-section { grid-template-columns: 1fr !important; }
          .hk-split-section > * { order: unset !important; }
        }
      `}</style>
    </section>
  );
}