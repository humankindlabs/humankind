// src/components/homepage/sections/SectionImageGrid.tsx
import Link from "next/link";

export function SectionImageGrid() {
  return (
    <section style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "0.75rem" }}>Life at Humankind</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Events, community &<br />conscious experiences
            </h2>
          </div>
          <Link href="https://app.humankind.center/events" style={{ fontSize: "0.9375rem", color: "#0CB001", textDecoration: "none", fontWeight: 500 }}>
            View all events →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="hk-image-grid">

          {/* Large left */}
          <div style={{ gridRow: "1 / 3", position: "relative", borderRadius: "1.5rem", overflow: "hidden" }}>
            <img src="/images/homepage/ai/img-10.jpg" alt="" style={{ width: "100%", height: "100%", minHeight: "420px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,3,28,0.7) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", borderRadius: "0.75rem", padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", textAlign: "center" }}>Conscious Conference — Sedona, AZ</p>
              </div>
            </div>
          </div>

          {/* Top right */}
          <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden" }}>
            <img src="/images/homepage/ai/img-13.jpg" alt="" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,3,28,0.65) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", borderRadius: "0.5rem", padding: "0.75rem 1rem" }}>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Sound Healing Circle</p>
              </div>
            </div>
          </div>

          {/* Bottom right — 2 cols */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden" }}>
              <img src="/images/homepage/ai/img-8.jpg" alt="" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,3,28,0.65) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.75rem" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", borderRadius: "0.5rem", padding: "0.5rem 0.75rem" }}>
                  <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Live Music</p>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden" }}>
              <img src="/images/homepage/ai/img-12.jpg" alt="" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.5)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link href="https://app.humankind.center/events" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "0.625rem 1rem", borderRadius: "99px", fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none" }}>
                  Explore More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .hk-image-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}