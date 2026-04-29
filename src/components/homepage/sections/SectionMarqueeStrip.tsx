// src/components/homepage/sections/SectionMarqueeStrip.tsx
import Link from "next/link";

const ROW_1 = [
  "/images/homepage/ai/img-9.jpg",
  "/images/homepage/ai/img-14.jpg",
  "/images/homepage/ai/img-21.jpg",
  "/images/homepage/ai/img-22.jpg",
  "/images/homepage/ai/img-10.jpg",
  "/images/homepage/ai/img-1.jpg",
];

const ROW_2 = [
  "/images/homepage/ai/img-6.jpg",
  "/images/homepage/ai/img-11.jpg",
  "/images/homepage/ai/img-12.jpg",
  "/images/homepage/ai/img-13.jpg",
  "/images/homepage/ai/img-8.jpg",
  "/images/homepage/ai/img-7.jpg",
];

const IMG_W = 260;
const IMG_H = 190;
const GAP   = 16;

export function SectionMarqueeStrip() {
  return (
    <section style={{ padding: "6rem 0 6rem", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 2.5rem", padding: "0 2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "0.75rem" }}>Events & Gatherings</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
            See what's happening<br />at Humankind
          </h2>
        </div>
        <Link href="https://app.humankind.center/events" style={{ display: "inline-flex", alignItems: "center", background: "#0CB001", color: "#fff", padding: "0.75rem 1.75rem", borderRadius: "99px", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          View All Events
        </Link>
      </div>

      {/* Row 1 — scroll left */}
      <div style={{ overflow: "hidden", marginBottom: `${GAP}px` }}>
        <div className="hk-mq-track-l" style={{ display: "flex", gap: `${GAP}px`, flexWrap: "nowrap" }}>
          {/* Set A */}
          {ROW_1.map((src, i) => (
            <img key={`a${i}`} src={src} alt="" style={{ width: `${IMG_W}px`, height: `${IMG_H}px`, objectFit: "cover", borderRadius: "1rem", flexShrink: 0, display: "block" }} />
          ))}
          {/* Set B — identical duplicate for seamless loop */}
          {ROW_1.map((src, i) => (
            <img key={`b${i}`} src={src} alt="" style={{ width: `${IMG_W}px`, height: `${IMG_H}px`, objectFit: "cover", borderRadius: "1rem", flexShrink: 0, display: "block" }} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div style={{ overflow: "hidden" }}>
        <div className="hk-mq-track-r" style={{ display: "flex", gap: `${GAP}px`, flexWrap: "nowrap" }}>
          {/* Set A */}
          {ROW_2.map((src, i) => (
            <img key={`a${i}`} src={src} alt="" style={{ width: `${IMG_W}px`, height: `${IMG_H}px`, objectFit: "cover", borderRadius: "1rem", flexShrink: 0, display: "block" }} />
          ))}
          {/* Set B — identical duplicate */}
          {ROW_2.map((src, i) => (
            <img key={`b${i}`} src={src} alt="" style={{ width: `${IMG_W}px`, height: `${IMG_H}px`, objectFit: "cover", borderRadius: "1rem", flexShrink: 0, display: "block" }} />
          ))}
        </div>
      </div>

      <style>{`
        /* Track width = (IMG_W + GAP) * count = (260+16)*6 = 1656px per set */
        /* Animate exactly -1656px (one full set width) for perfect loop */
        .hk-mq-track-l {
          width: max-content;
          animation: hk-mq-left 28s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .hk-mq-track-r {
          width: max-content;
          animation: hk-mq-right 34s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        @keyframes hk-mq-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${(IMG_W + GAP) * 6}px); }
        }
        @keyframes hk-mq-right {
          0%   { transform: translateX(-${(IMG_W + GAP) * 6}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}