// src/components/homepage/sections/SectionFeature2x2.tsx
// 2x2 bordered feature grid — PostGenerator pattern from index-5
import Link from "next/link";

const FEATURES = [
  {
    icon: "🎤",
    title: "Live Events",
    desc: "Weekly gatherings, workshops, sound healings, and conscious experiences in Sedona.",
    href: "/events",
  },
  {
    icon: "📡",
    title: "Live Streaming",
    desc: "Watch from anywhere. Full access to our weekly podcast and member-only broadcasts.",
    href: "/live",
  },
  {
    icon: "🌐",
    title: "Community",
    desc: "Connect with seekers, creators, and explorers through our growing member network.",
    href: "/register",
  },
  {
    icon: "⭐",
    title: "at humankind",
    desc: "Our flagship events brand — conferences, retreats, and experiences designed to expand your world.",
    href: "/events",
  },
];

export function SectionFeature2x2() {
  return (
    <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>About Humankind</p>
        <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", marginBottom: "1rem" }}>
          More than a membership.<br />A movement.
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.75 }}>
          A space where conscious people come together to learn, grow, and connect — through live events, weekly streams, and a global community rooted in Sedona.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "1.5rem", overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
      }} className="hk-2x2-grid">
        {FEATURES.map((f, i) => (
          <div key={f.title} style={{
            padding: "2.5rem",
            borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            transition: "background 0.2s",
          }} className="hk-2x2-cell">
            <div style={{
              width: "52px", height: "52px", borderRadius: "1rem",
              background: "rgba(12,176,1,0.08)", border: "1px solid rgba(12,176,1,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.375rem", marginBottom: "1.25rem",
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "0.625rem" }}>{f.title}</h3>
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{f.desc}</p>
            <Link href={f.href} style={{ fontSize: "0.875rem", color: "#0CB001", fontWeight: 500, textDecoration: "none" }}>
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        .hk-2x2-cell:hover { background: rgba(12,176,1,0.03) !important; }
        @media (max-width: 640px) {
          .hk-2x2-grid { grid-template-columns: 1fr !important; }
          .hk-2x2-cell { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .hk-2x2-cell:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}