// src/components/homepage/sections/SectionTestimonials.tsx

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Full Member",
    body: "Humankind has completely transformed how I connect with conscious community. The weekly live streams keep me connected even when I can't make it to Sedona.",
    initial: "S",
    color: "#0CB001",
  },
  {
    name: "David K.",
    role: "Full Member",
    body: "The events here are unlike anything else — you can feel the intention behind everything. The Odyssey Conference genuinely changed my life.",
    initial: "D",
    color: "#0CB001",
  },
  {
    name: "Luna R.",
    role: "Online Access Member",
    body: "I'm based in Europe and the live streams let me be part of this incredible community every Friday. Worth every penny.",
    initial: "L",
    color: "#0CB001",
  },
  {
    name: "James T.",
    role: "Member since 2022",
    body: "From sound baths to conscious dance, every event I've attended has been perfectly curated. This is the community I've been searching for.",
    initial: "J",
    color: "#0CB001",
  },
  {
    name: "Maya P.",
    role: "Full Member",
    body: "The QR check-in makes everything seamless. And the live chat during streams creates this amazing shared experience with people around the world.",
    initial: "M",
    color: "#0CB001",
  },
  {
    name: "Alex W.",
    role: "Online Access Member",
    body: "Being able to watch replays means I never miss content. The replay library alone is worth the membership — so much wisdom in there.",
    initial: "A",
    color: "#0CB001",
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "420px",
      background: "rgba(8, 10, 26, 0.95)",
      border: "1px solid rgba(12,176,1,0.25)",
      borderRadius: "1rem",
      padding: "1.75rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      // Card glow effect like the screenshot's purple glow — ours is green
      boxShadow: "0 0 0 1px rgba(12,176,1,0.08), 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle top-left glow accent */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "120px", height: "120px",
        background: "radial-gradient(circle, rgba(12,176,1,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Avatar + name row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(12,176,1,0.25) 0%, rgba(12,176,1,0.08) 100%)",
          border: "1px solid rgba(12,176,1,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.0625rem", fontWeight: 700, color: "#0CB001",
          flexShrink: 0,
        }}>
          {t.initial}
        </div>
        <div>
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", lineHeight: 1 }}>{t.name}</p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "0.3rem" }}>{t.role}</p>
        </div>
      </div>

      {/* Quote */}
      <p style={{
        fontSize: "0.9375rem",
        color: "rgba(255,255,255,0.6)",
        lineHeight: 1.7,
        flex: 1,
      }}>
        {t.body}
      </p>
    </div>
  );
}

export function SectionTestimonials() {
  return (
    <section style={{
      padding: "6rem 0",
      background: "rgba(255,255,255,0.012)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 2rem", marginBottom: "3.5rem" }}>
        <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Community Voices</p>
        <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", marginBottom: "0.75rem" }}>
          What Our Members Say
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Real stories from the Humankind community — in Sedona and around the world.
        </p>
      </div>

      {/* Single scrolling row — padded on both sides, doesn't go full width */}
      <div style={{ overflow: "hidden", padding: "1rem 0" }}>
        <div style={{
          display: "flex",
          gap: "1.5rem",
          paddingLeft: "3rem", /* left padding so first card isn't flush */
          width: "max-content",
          animation: "hk-marquee-seamless 55s linear infinite",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}>
          {/* Duplicate exactly 2x for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}