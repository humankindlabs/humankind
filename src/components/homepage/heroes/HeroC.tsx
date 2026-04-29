// src/components/homepage/heroes/HeroC.tsx
import Link from "next/link";
import { VideoModal } from "@/components/marketing/video-modal";

export function HeroC() {
  return (
    <section style={{
      position: "relative", minHeight: "100dvh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "6rem 2rem 4rem", overflow: "hidden",
      background: "#00031C",
    }}>
      {/* Two-tone bg */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(12,176,1,0.11) 0%, transparent 100%)" }} />
      </div>

      {/* SVG spinning rings */}
      <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", width: "900px", height: "900px", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1 }}>
        <svg viewBox="0 0 900 900" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "hk-spin-slow 32s linear infinite", willChange: "transform" }}>
          <circle cx="450" cy="450" r="440" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <path d="M450 10 A440 440 0 0 1 890 450" stroke="url(#hc-g1)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="hc-g1" x1="450" y1="10" x2="890" y2="450" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0CB001" /><stop offset="1" stopColor="#0CB001" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg viewBox="0 0 900 900" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "hk-spin-slow 22s linear infinite reverse", willChange: "transform" }}>
          <circle cx="450" cy="450" r="320" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <path d="M450 130 A320 320 0 0 1 770 450" stroke="url(#hc-g2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="hc-g2" x1="450" y1="130" x2="770" y2="450" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0CB001" /><stop offset="1" stopColor="#0CB001" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg viewBox="0 0 900 900" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", animation: "hk-spin-slow 18s linear infinite", willChange: "transform" }}>
          <circle cx="450" cy="450" r="200" stroke="rgba(12,176,1,0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "700px" }}>
        <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", marginBottom: "1.5rem" }}>
          Conscious Community · Sedona, AZ
        </span>

        <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "#fff" }}>
          Experience live events<br />from anywhere in the world
        </h1>

        <p style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto 2.5rem" }}>
          Weekly conscious gatherings in Sedona. Weekly live streams for the world. One community — in person and online.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
          <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0CB001", color: "#fff", padding: "0.875rem 2rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(12,176,1,0.35)" }}>
            Join for Free →
          </Link>
          <VideoModal />
        </div>

        <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.25)" }}>
          Free to join · No credit card required
        </p>

        {/* Stats — real numbers */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", marginTop: "3.5rem", flexWrap: "wrap" }}>
          {[
            { num: "50+",    label: "Community Members" },
            { num: "50+",    label: "Events / Year" },
            { num: "Weekly", label: "Live Streams" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0CB001", letterSpacing: "-0.02em" }}>{s.num}</p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}