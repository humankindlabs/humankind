// src/components/homepage/heroes/HeroA.tsx
import Link from "next/link";
import { VideoModal } from "@/components/marketing/video-modal";

export function HeroA() {
  return (
    <section style={{
      position: "relative", minHeight: "100dvh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "8rem 2rem 4rem", overflow: "hidden",
    }}>

      {/* Two-tone background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "#00031C" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(12,176,1,0.12) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(12,176,1,0.06) 0%, transparent 100%)" }} />
      </div>

      {/* Circles */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
        {[500, 700, 900, 1100, 1300].map((size, i) => (
          <div key={size} style={{
            position: "absolute", width: `${size}px`, height: `${size}px`,
            borderRadius: "50%",
            border: `1px solid rgba(12,176,1,${0.28 - i * 0.04})`,
            animation: `hk-spin ${20 + i * 8}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
          }} />
        ))}
        {[0, 1, 2].map((i) => (
          <div key={`pulse-${i}`} style={{
            position: "absolute", width: "380px", height: "380px", borderRadius: "50%",
            border: "1.5px solid rgba(12,176,1,0.35)",
            animation: "hk-pulse-ring 3.5s ease-out infinite",
            animationDelay: `${i * 1.1}s`,
          }} />
        ))}
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(12,176,1,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(12,176,1,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(12,176,1,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", background: "#0CB001", boxShadow: "0 0 0 12px rgba(12,176,1,0.08), 0 0 0 28px rgba(12,176,1,0.04)", animation: "hk-blink 2.5s ease-in-out infinite" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: "820px", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(12,176,1,0.1)", border: "1px solid rgba(12,176,1,0.3)", borderRadius: "99px", padding: "0.375rem 1rem", fontSize: "0.75rem", fontWeight: 600, color: "#0CB001", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0CB001", animation: "hk-blink 1.5s infinite" }} />
          Sedona's Conscious Community
        </div>

        <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem", background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.55) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Where Humanity<br />Gathers to Connect
        </h1>

        <p style={{ fontSize: "clamp(0.9375rem, 1.75vw, 1.125rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto 2.5rem" }}>
          Live events, conscious gatherings, and a global streaming community. Join seekers, creators, and explorers rooted in Sedona.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0CB001", color: "#fff", padding: "0.875rem 2rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(12,176,1,0.35)" }}>
            Join for Free →
          </Link>
          <VideoModal />
        </div>

        {/* Stats — real numbers */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
          {[
            { num: "100+",    label: "Community Members" },
            { num: "50+",    label: "Events / Year" },
            { num: "Weekly", label: "Live Streams" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1.875rem", fontWeight: 900, color: "#0CB001", letterSpacing: "-0.02em", fontFamily: "var(--hk-font-brand)" }}>{s.num}</p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.35, zIndex: 2 }}>
        <span style={{ fontSize: "0.625rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)", animation: "hk-scroll-line 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}