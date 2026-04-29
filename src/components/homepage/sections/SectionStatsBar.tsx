// src/components/homepage/sections/SectionStatsBar.tsx
import Link from "next/link";

const STATS = [
  { num: "100+",    label: "Community Members",  desc: "and growing" },
  { num: "150+",    label: "Events Per Year",     desc: "in Sedona & online" },
  { num: "Weekly", label: "Live Streams",        desc: "every Friday" },
  { num: "4",      label: "Event Types",         desc: "conferences, workshops, music & more" },
];

export function SectionStatsBar() {
  return (
    <section style={{
      padding: "4rem 2rem",
      background: "rgba(12,176,1,0.04)",
      borderTop: "1px solid rgba(12,176,1,0.12)",
      borderBottom: "1px solid rgba(12,176,1,0.12)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#0CB001", letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "var(--hk-font-brand)" }}>{s.num}</p>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginTop: "0.5rem" }}>{s.label}</p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}