// src/components/meditations/MeditationsList.tsx
"use client";

import { useState, useRef } from "react";
import { EmailGateModal } from "./EmailGateModal";

type Meditation = {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
};

const DESCRIPTION_MAX = 220;

export function MeditationsList({
  meditations,
  userEmail,
}: {
  meditations: Meditation[];
  userEmail: string | null;
}) {
  const [pendingDownload, setPendingDownload] = useState<Meditation | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefsMap = useRef<Map<string, HTMLAudioElement>>(new Map());

  function registerAudio(id: string, el: HTMLAudioElement | null) {
    if (el) audioRefsMap.current.set(id, el);
    else audioRefsMap.current.delete(id);
  }

  function handlePlay(id: string) {
    // Pause every other audio when one starts playing
    audioRefsMap.current.forEach((audio, audioId) => {
      if (audioId !== id && !audio.paused) {
        audio.pause();
      }
    });
    setPlayingId(id);
  }

  function handlePause(id: string) {
    if (playingId === id) setPlayingId(null);
  }

  function handleEnded(id: string) {
    setPlayingId(null);
    // Auto-continue: play the next meditation in the list
    const idx = meditations.findIndex((m) => m.id === id);
    if (idx >= 0 && idx < meditations.length - 1) {
      const next = meditations[idx + 1];
      const nextAudio = audioRefsMap.current.get(next.id);
      if (nextAudio) {
        // Small delay so the current row's UI clears before next plays
        setTimeout(() => {
          nextAudio.play().catch((err) => {
            console.warn("[meditations] autoplay blocked:", err);
          });
          // Scroll the next item into view
          nextAudio.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      }
    }
  }

  if (meditations.length === 0) {
    return (
      <div
        style={{
          padding: "4rem 1.5rem",
          background: "rgba(255,255,255,0.025)",
          border: "1px dashed rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎵</p>
        <p style={{ margin: 0, fontSize: "0.9375rem" }}>
          No meditations available yet — check back soon.
        </p>
      </div>
    );
  }

  function handleDownloadClick(m: Meditation) {
    if (userEmail) {
      triggerDownload(m);
    } else {
      setPendingDownload(m);
    }
  }

  function triggerDownload(m: Meditation) {
    const a = document.createElement("a");
    a.href = m.audio_url;
    a.download = `${m.title}.${m.audio_url.split(".").pop() ?? "mp3"}`;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {meditations.map((m, idx) => (
          <MeditationRow
            key={m.id}
            meditation={m}
            index={idx}
            isPlaying={playingId === m.id}
            registerAudio={registerAudio}
            onPlay={() => handlePlay(m.id)}
            onPause={() => handlePause(m.id)}
            onEnded={() => handleEnded(m.id)}
            onDownload={() => handleDownloadClick(m)}
          />
        ))}
      </div>

      {pendingDownload && (
        <EmailGateModal
          meditation={pendingDownload}
          onClose={() => setPendingDownload(null)}
          onSuccess={() => {
            const m = pendingDownload;
            setPendingDownload(null);
            setTimeout(() => triggerDownload(m), 150);
          }}
        />
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Single meditation row
// ───────────────────────────────────────────────────────────────────────
function MeditationRow({
  meditation,
  index,
  isPlaying,
  registerAudio,
  onPlay,
  onPause,
  onEnded,
  onDownload,
}: {
  meditation: Meditation;
  index: number;
  isPlaying: boolean;
  registerAudio: (id: string, el: HTMLAudioElement | null) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnded: () => void;
  onDownload: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const description = meditation.description ?? "";
  const isLong = description.length > DESCRIPTION_MAX;
  const displayed = !isLong || expanded
    ? description
    : description.slice(0, DESCRIPTION_MAX).trimEnd() + "…";

  return (
    <div
      style={{
        position: "relative",
        padding: "1.5rem",
        background: isPlaying
          ? "linear-gradient(135deg, rgba(12,176,1,0.08) 0%, rgba(255,255,255,0.025) 100%)"
          : "rgba(255,255,255,0.025)",
        border: isPlaying
          ? "1px solid rgba(12,176,1,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "1.25rem",
        transition: "all 0.25s ease",
        boxShadow: isPlaying ? "0 0 32px rgba(12,176,1,0.08)" : "none",
      }}
      className="hk-meditation-row"
    >
      {/* Number badge in corner */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1.25rem",
          fontSize: "0.6875rem",
          color: "rgba(255,255,255,0.25)",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "flex-start",
        }}
        className="hk-meditation-row-flex"
      >
        {/* Thumbnail */}
        <div
          style={{
            width: 144,
            height: 144,
            minWidth: 144,
            borderRadius: "1rem",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(12,176,1,0.12) 0%, rgba(12,176,1,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            boxShadow: isPlaying
              ? "0 0 24px rgba(12,176,1,0.18)"
              : "0 4px 16px rgba(0,0,0,0.25)",
            transition: "box-shadow 0.25s",
          }}
          className="hk-meditation-thumb"
        >
          {meditation.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={meditation.thumbnail_url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "2.5rem", opacity: 0.6 }}>🎵</span>
          )}
          {isPlaying && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,3,28,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "flex-end",
                  height: "32px",
                }}
              >
                <span className="hk-bar" style={{ animationDelay: "0s" }} />
                <span className="hk-bar" style={{ animationDelay: "0.15s" }} />
                <span className="hk-bar" style={{ animationDelay: "0.3s" }} />
                <span className="hk-bar" style={{ animationDelay: "0.45s" }} />
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {isPlaying && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.1875rem 0.625rem",
                background: "rgba(12,176,1,0.15)",
                border: "1px solid rgba(12,176,1,0.3)",
                borderRadius: "99px",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#0CB001",
                marginBottom: "0.625rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#0CB001",
                  animation: "hk-blink 1.2s infinite",
                }}
              />
              Now Playing
            </div>
          )}

          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 0.5rem",
              letterSpacing: "-0.015em",
              lineHeight: 1.25,
              paddingRight: "2rem",
            }}
          >
            {meditation.title}
          </h3>

          {description && (
            <div
              style={{
                fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              {displayed}{" "}
              {isLong && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#0CB001",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    padding: 0,
                    marginLeft: "0.25rem",
                    fontFamily: "inherit",
                  }}
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}

          {/* Audio + actions */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <audio
              ref={(el) => registerAudio(meditation.id, el)}
              controls
              src={meditation.audio_url}
              preload="metadata"
              onPlay={onPlay}
              onPause={onPause}
              onEnded={onEnded}
              style={{
                flex: "1 1 280px",
                minWidth: "240px",
                height: 36,
              }}
            >
              Your browser does not support audio playback.
            </audio>

            <button
              onClick={onDownload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 1rem",
                borderRadius: "99px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s, border-color 0.15s",
                whiteSpace: "nowrap",
              }}
              className="hk-download-btn"
            >
              ↓ Download
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hk-meditation-row:hover {
          border-color: rgba(255,255,255,0.14);
        }
        .hk-download-btn:hover {
          background: rgba(12,176,1,0.1);
          border-color: rgba(12,176,1,0.4);
        }
        .hk-bar {
          width: 4px;
          background: #0CB001;
          border-radius: 2px;
          animation: hk-bar-bounce 0.9s ease-in-out infinite;
          height: 8px;
          display: inline-block;
        }
        @keyframes hk-bar-bounce {
          0%, 100% { height: 8px; }
          50% { height: 28px; }
        }
        @media (max-width: 580px) {
          .hk-meditation-row-flex {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .hk-meditation-thumb {
            width: 100% !important;
            height: 200px !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
