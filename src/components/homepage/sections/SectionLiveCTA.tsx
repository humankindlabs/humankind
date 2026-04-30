// src/components/homepage/sections/SectionLiveCTA.tsx
import Link from "next/link";

type Broadcast = {
  enabled?: boolean;
  isLive: boolean;
  thumbnail: string | null;
  videoId: string | null;
  nowPlaying: string;
};

type Props = {
  broadcast: Broadcast;
};

export function SectionLiveCTA({ broadcast }: Props) {
  const { isLive, thumbnail, videoId, nowPlaying } = broadcast;

  return (
    <section
      className="hk-live-cta-section"
      style={{
        padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="hk-home-split hk-live-cta-grid"
        style={{
          display: "grid",
          alignItems: "center",
          gap: "clamp(2rem, 5vw, 4rem)",
          gridTemplateColumns: "1fr 1fr",
        }}
      >

        {/* Text */}
        <div>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>24/7 Consciousness Network</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
            Always on.<br />Always streaming.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "2rem" }}>
            Tune in to the Humankind broadcast — curated content playing around the clock. Live events, replays, talks, and more. Join free to start watching.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/register" className="hk-btn hk-btn-primary" style={{ borderRadius: "99px", gap: "0.5rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff", animation: isLive ? "hk-blink 1s infinite" : "none", flexShrink: 0 }} />
              {isLive ? "Watch Live Now" : "Start Watching"}
            </Link>
            <Link href="/register?tier=online" className="hk-btn hk-btn-secondary" style={{ borderRadius: "99px" }}>View Plans</Link>
          </div>
        </div>

        {/* Broadcast preview — clicking goes to /register */}
        <Link
          href="/register"
          className="hk-live-preview-link"
          style={{
            textDecoration: "none",
            display: "block",
            width: "100%",
            // Cap how big the video can get on mobile so it doesn't dominate the screen
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          <div
            className="hk-live-preview-hover"
            style={{
              position: "relative",
              borderRadius: "1.5rem",
              overflow: "hidden",
              border: `1px solid ${isLive ? "rgba(239,68,68,0.3)" : "rgba(12,176,1,0.15)"}`,
              background: "rgba(255,255,255,0.02)",
              boxShadow: isLive ? "0 0 40px rgba(239,68,68,0.1)" : "0 8px 32px rgba(0,0,0,0.4)",
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
              width: "100%",
            }}
          >
            {/* 16:9 preview */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: "#000",
                width: "100%",
              }}
            >
              {videoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    pointerEvents: "none",
                    display: "block",
                  }}
                  allow="autoplay"
                />
              ) : thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.7,
                  }}
                />
              ) : null}

              {/* Overlay with play button */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: videoId
                    ? "rgba(0,3,28,0.3)"
                    : thumbnail
                      ? "rgba(0,3,28,0.4)"
                      : "radial-gradient(circle at 50% 50%, rgba(12,176,1,0.08) 0%, rgba(0,3,28,0.8) 100%)",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "clamp(56px, 12vw, 72px)",
                    height: "clamp(56px, 12vw, 72px)",
                    borderRadius: "50%",
                    background: "rgba(12,176,1,0.15)",
                    border: "2px solid rgba(12,176,1,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 32px rgba(12,176,1,0.25)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "16px solid #0CB001",
                      marginLeft: "4px",
                    }}
                  />
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", textShadow: "0 1px 4px rgba(0,0,0,0.5)", textAlign: "center", padding: "0 1rem" }}>
                  {isLive ? "We're live — join to watch" : "Join free to tune in"}
                </p>
              </div>
            </div>

            {/* Footer bar */}
            <div
              style={{
                padding: "0.875rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {isLive ? (
                  <span className="hk-badge hk-badge-live">Live</span>
                ) : (
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(12,176,1,0.1)", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>Broadcast</span>
                )}
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                  {isLive ? "Live Now" : nowPlaying}
                </p>
              </div>
              <span style={{ fontSize: "0.8125rem", color: "#0CB001", fontWeight: 500, flexShrink: 0 }}>Watch →</span>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .hk-live-preview-hover:hover {
          transform: translateY(-2px);
          border-color: rgba(12,176,1,0.2) !important;
        }

        /* Single-column stacked layout on tablet + mobile */
        @media (max-width: 1023px) {
          .hk-live-cta-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Tighter mobile spacing */
        @media (max-width: 640px) {
          .hk-live-cta-section {
            padding: 2.5rem 1rem !important;
          }
          .hk-live-cta-grid {
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
