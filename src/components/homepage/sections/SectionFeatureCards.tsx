// src/components/homepage/sections/SectionFeatureCards.tsx
import Link from "next/link";

const FEATURES = [
  {
    icon: "🎤",
    title: "Live Events",
    desc: "Weekly gatherings, workshops, sound healings, and conscious experiences in Sedona and beyond.",
    href: "/events",
  },
  {
    icon: "📡",
    title: "Live Streaming",
    desc: "Watch from anywhere. Full access to our weekly podcast streams and member-only broadcasts every Friday.",
    href: "/live",
  },
  {
    icon: "🌐",
    title: "Global Community",
    desc: "Connect with like-minded seekers, creators, and explorers through our growing member network.",
    href: "/register",
  },
  {
    icon: "🎵",
    title: "Conscious Music",
    desc: "Live music events and conscious dance gatherings that move your body and elevate your spirit.",
    href: "/events",
  },
  {
    icon: "🧘",
    title: "Workshops & Retreats",
    desc: "Immersive experiences for personal growth — meditation, sound bath, breathwork, and more.",
    href: "/events",
  },
  {
    icon: "📲",
    title: "Member App",
    desc: "Manage tickets, watch replays, join live chat, and stay connected — all in one place.",
    href: "/register",
  },
];

export function SectionFeatureCards() {
  return (
    <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>What We Offer</p>
        <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff" }}>
          Everything you need to<br />expand your consciousness
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{
            padding: "2rem",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "1.25rem",
            transition: "border-color 0.2s, background 0.2s",
          }}
          className="hk-feature-card-hover"
          >
            {/* Icon with blob shape */}
            <div style={{
              width: "64px", height: "64px",
              background: "rgba(12,176,1,0.08)",
              border: "1px solid rgba(12,176,1,0.15)",
              borderRadius: "28% 72% 50% 50% / 26% 20% 80% 74%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.75rem", marginBottom: "1.5rem",
            }}>
              {f.icon}
            </div>

            <h3 style={{ fontSize: "1.1875rem", fontWeight: 700, color: "#fff", marginBottom: "0.625rem" }}>{f.title}</h3>
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{f.desc}</p>

            <Link href={f.href} style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              fontSize: "0.875rem", color: "#0CB001", fontWeight: 500,
              textDecoration: "none", position: "relative",
            }}
            className="hk-learn-more"
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        .hk-feature-card-hover:hover {
          border-color: rgba(12,176,1,0.2) !important;
          background: rgba(12,176,1,0.03) !important;
        }
      `}</style>
    </section>
  );
}