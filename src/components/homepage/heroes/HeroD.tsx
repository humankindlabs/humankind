// src/components/homepage/heroes/HeroD.tsx
import Link from "next/link";

const MARQUEE_1 = ["Conscious Events", "Live Streaming", "Community", "Sedona", "Gatherings"];
const MARQUEE_2 = ["Sound Healing", "Workshops", "Live Music", "Retreats", "Conferences"];

export function HeroD() {
  return (
    <>
      {/* Two-tone page background */}
      <div style={{
        position: "relative",
        background: "#00031C",
        paddingTop: "5rem",
        overflow: "hidden",
      }}>
        {/* Top green tint */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(12,176,1,0.13) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Floating star decorations — outside the card */}
        <div aria-hidden="true" style={{ position: "absolute", top: "80px", left: "6%", width: "20px", height: "20px", background: "rgba(12,176,1,0.3)", borderRadius: "5px", transform: "rotate(45deg)", animation: "hk-spin-slow 10s linear infinite", zIndex: 2 }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "100px", right: "6%", width: "14px", height: "14px", borderRadius: "50%", background: "rgba(12,176,1,0.4)", animation: "hk-blink 2s infinite", zIndex: 2 }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "40%", right: "4%", width: "22px", height: "22px", background: "rgba(12,176,1,0.15)", borderRadius: "6px", transform: "rotate(20deg)", animation: "hk-spin-slow 14s linear infinite reverse", zIndex: 2 }} />

        {/* ── Rounded image card with content overlay ── */}
        <div style={{
          position: "relative", zIndex: 1,
          margin: "0 2rem 3rem",
          borderRadius: "1.5rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(12,176,1,0.06)",
          animation: "hk-float-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          opacity: 0,
          minHeight: "520px",
        }}>
          {/* Background image */}
          <img
            src="/images/homepage/ai/img-3.jpg"
            alt="Humankind events"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
            }}
          />

          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.68)" }} />

          {/* Green tint overlay */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(12,176,1,0.08) 0%, transparent 70%)" }} />

          {/* Content — centered over image */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            minHeight: "520px",
            padding: "5rem 2rem",
            textAlign: "center",
          }}>
            <span style={{
              display: "inline-block", padding: "0.375rem 1rem",
              borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)", marginBottom: "1.5rem",
            }}>
              Humankind · Sedona, Arizona
            </span>

            <h1 style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: "#fff", marginBottom: "1.25rem",
              maxWidth: "760px",
            }}>
              Where the conscious<br />world comes together
            </h1>

            <p style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              color: "rgba(255,255,255,0.6)", lineHeight: 1.75,
              maxWidth: "520px", marginBottom: "2.5rem",
            }}>
              Conferences, workshops, live music, and conscious dance — in Sedona and streaming globally every week.
            </p>

            <Link href="https://app.humankind.center/register" style={{
              display: "inline-flex", alignItems: "center",
              background: "#0CB001", color: "#fff",
              padding: "0.9375rem 2.5rem", borderRadius: "99px",
              fontSize: "1rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 0 40px rgba(12,176,1,0.4)",
            }}>
              Discover More →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Marquee words strip — seamless ── */}
      <div style={{
        background: "rgba(0,3,28,0.98)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden", padding: "1.5rem 0",
      }}>
        {/* Row 1 */}
        <div style={{ overflow: "hidden", marginBottom: "0.75rem" }}>
          <div style={{
            display: "flex", gap: "0",
            width: "max-content",
            animation: "hk-marquee-seamless 18s linear infinite",
            willChange: "transform", backfaceVisibility: "hidden",
          }}>
            {[...MARQUEE_1, ...MARQUEE_1].map((item, i) => (
              <span key={i} style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 800,
                color: "rgba(255,255,255,0.12)",
                fontFamily: "var(--hk-font-brand)", letterSpacing: "-0.02em",
                padding: "0 2rem", whiteSpace: "nowrap",
              }}>
                {item}
                <span style={{ color: "rgba(12,176,1,0.3)", marginLeft: "2rem" }}>·</span>
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 */}
        <div style={{ overflow: "hidden" }}>
          <div style={{
            display: "flex", gap: "0",
            width: "max-content",
            animation: "hk-marquee-seamless-reverse 22s linear infinite",
            willChange: "transform", backfaceVisibility: "hidden",
          }}>
            {[...MARQUEE_2, ...MARQUEE_2].map((item, i) => (
              <span key={i} style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 800,
                color: "rgba(12,176,1,0.15)",
                fontFamily: "var(--hk-font-brand)", letterSpacing: "-0.02em",
                padding: "0 2rem", whiteSpace: "nowrap",
              }}>
                {item}
                <span style={{ color: "rgba(255,255,255,0.08)", marginLeft: "2rem" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hk-float-in {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}