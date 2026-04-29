// src/components/homepage/heroes/HeroB.tsx
import Link from "next/link";
import { VideoModal } from "@/components/marketing/video-modal";

const IMAGES_COL_1 = [
  "/images/homepage/ai/img-9.jpg",
  "/images/homepage/ai/img-14.jpg",
  "/images/homepage/ai/img-21.jpg",
  "/images/homepage/ai/img-22.jpg",
  "/images/homepage/ai/img-10.jpg",
];

const IMAGES_COL_2 = [
  "/images/homepage/ai/img-6.jpg",
  "/images/homepage/ai/img-11.jpg",
  "/images/homepage/ai/img-12.jpg",
  "/images/homepage/ai/img-13.jpg",
  "/images/homepage/ai/img-8.jpg",
];

export function HeroB() {
  return (
    <section style={{
      position: "relative", minHeight: "100dvh",
      display: "flex", alignItems: "center",
      padding: "6rem 2rem 4rem", overflow: "hidden",
      background: "#00031C",
    }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "70%", background: "radial-gradient(ellipse 70% 60% at 20% 0%, rgba(12,176,1,0.10) 0%, transparent 100%)" }} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }} className="hk-hero-b-grid">
        <div>
          <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0CB001", background: "rgba(12,176,1,0.1)", marginBottom: "1.25rem" }}>
            Sedona · Arizona
          </span>
          <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "1.25rem", color: "#fff" }}>
            Conscious events,<br />live streams &<br />real community.
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "420px" }}>
            Join Humankind — weekly gatherings, global live streams, and a growing community of seekers, creators, and explorers rooted in Sedona.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0CB001", color: "#fff", padding: "0.875rem 2rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 32px rgba(12,176,1,0.3)" }}>
              Join for Free →
            </Link>
            <VideoModal />
          </div>

          {/* Social proof — real avatars */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "2.5rem" }}>
            <div style={{ display: "flex" }}>
              {[
                "/avatars/avatar_orange.png",
                "/avatars/avatar_green.png",
                "/avatars/avatar_light-blue.png",
                "/avatars/avatar_purple.png",
              ].map((src, n) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "50%",
                    border: "2px solid #00031C",
                    marginLeft: n === 0 ? 0 : "-10px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)" }}>
              Growing community in <span style={{ color: "#fff", fontWeight: 600 }}>Sedona & worldwide</span>
            </p>
          </div>
        </div>

        {/* Scrolling image columns — seamless */}
        <div style={{ height: "520px", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "hk-col-up 20s linear infinite", willChange: "transform" }}>
            {[...IMAGES_COL_1, ...IMAGES_COL_1].map((src, i) => (
              <div key={i} style={{ borderRadius: "1rem", overflow: "hidden", flexShrink: 0 }}>
                <img src={src} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "hk-col-down 24s linear infinite", willChange: "transform", transform: "translateY(-50%)" }}>
            {[...IMAGES_COL_2, ...IMAGES_COL_2].map((src, i) => (
              <div key={i} style={{ borderRadius: "1rem", overflow: "hidden", flexShrink: 0 }}>
                <img src={src} alt="" style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hk-col-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes hk-col-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hk-hero-b-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}