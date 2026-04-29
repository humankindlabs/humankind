// src/components/homepage/sections/SectionLiveCTA.tsx
//
// Live broadcast preview section.
// Now takes broadcast info as a prop (passed from page.tsx, which fetches
// from app's /api/public/homepage-data endpoint). Avoids RLS issues that
// blocked direct Supabase reads from the marketing site's anon key.

import Link from "next/link";

type Broadcast = {
  enabled: boolean;
  isLive: boolean;
  thumbnail: string | null;
  videoId: string | null;
  nowPlaying: string;
};

const DEFAULT_BROADCAST: Broadcast = {
  enabled: true,
  isLive: false,
  thumbnail: null,
  videoId: null,
  nowPlaying: "Humankind Broadcast",
};

export function SectionLiveCTA({
  broadcast = DEFAULT_BROADCAST,
}: {
  broadcast?: Broadcast;
}) {
  const { isLive, thumbnail, videoId, nowPlaying } = broadcast;

  return (
    <section style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gap: "4rem",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="hk-home-split"
      >
        {/* Text */}
        <div>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>
            24/7 Consciousness Network
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              color: "#fff",
            }}
          >
            Always on.
            <br />
            Always streaming.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Tune in to the Humankind broadcast — curated content playing around
            the clock. Live events, replays, talks, and more. Join free to start
            watching.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="https://app.humankind.center/register"
              className="hk-btn hk-btn-primary"
              style={{ borderRadius: "99px", gap: "0.5rem" }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#fff",
                  animation: isLive ? "hk-blink 1s infinite" : "none",
                  flexShrink: 0,
                }}
              />
              {isLive ? "Watch Live Now" : "Start Watching"}
            </Link>
            <Link
              href="https://app.humankind.center/register?tier=online"
              className="hk-btn hk-btn-secondary"
              style={{ borderRadius: "99px" }}
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* Broadcast preview */}
        <Link
          href="https://app.humankind.center/register"
          style={{ textDecoration: "none", display: "block" }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "1.5rem",
              overflow: "hidden",
              border: `1px solid ${isLive ? "rgba(239,68,68,0.3)" : "rgba(12,176,1,0.15)"}`,
              background: "rgba(255,255,255,0.02)",
              boxShadow: isLive
                ? "0 0 40px rgba(239,68,68,0.1)"
                : "0 8px 32px rgba(0,0,0,0.4)",
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            className="hk-live-preview-hover"
          >
            <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
              {videoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    pointerEvents: "none",
                  }}
                  allow="autoplay"
                />
              ) : thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                />
              ) : null}
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
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(12,176,1,0.15)",
                    border: "2px solid rgba(12,176,1,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 32px rgba(12,176,1,0.25)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "12px solid transparent",
                      borderBottom: "12px solid transparent",
                      borderLeft: "20px solid #0CB001",
                      marginLeft: "5px",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {isLive ? "We're live — join to watch" : "Join free to tune in"}
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "0.875rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                {isLive ? (
                  <span className="hk-badge hk-badge-live">Live</span>
                ) : (
                  <span
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      background: "rgba(12,176,1,0.1)",
                      color: "#4ade80",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Broadcast
                  </span>
                )}
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.8)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isLive ? "Live Now" : nowPlaying}
                </p>
              </div>
              <span style={{ fontSize: "0.8125rem", color: "#0CB001", fontWeight: 500 }}>
                Watch →
              </span>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .hk-live-preview-hover:hover { transform: translateY(-2px); border-color: rgba(12,176,1,0.2) !important; }
        @media (max-width: 768px) { .hk-home-split { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
