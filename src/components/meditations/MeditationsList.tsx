// src/components/meditations/MeditationsList.tsx
"use client";

import { useState } from "react";
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

  if (meditations.length === 0) {
    return (
      <div
        style={{
          padding: "3rem 1.5rem",
          background: "rgba(255,255,255,0.025)",
          border: "1px dashed rgba(255,255,255,0.08)",
          borderRadius: "1rem",
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <p style={{ margin: 0 }}>
          No meditations available yet — check back soon.
        </p>
      </div>
    );
  }

  function handleDownloadClick(m: Meditation) {
    if (userEmail) {
      // Already on our list (logged in) — direct download
      triggerDownload(m);
    } else {
      // Not logged in — show email gate first
      setPendingDownload(m);
    }
  }

  function triggerDownload(m: Meditation) {
    // Force download via temporary anchor
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
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {meditations.map((m) => (
          <MeditationRow
            key={m.id}
            meditation={m}
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
            // Small delay so the modal closes cleanly before download
            setTimeout(() => triggerDownload(m), 150);
          }}
        />
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Single meditation row with thumbnail + player + actions
// ───────────────────────────────────────────────────────────────────────
function MeditationRow({
  meditation,
  onDownload,
}: {
  meditation: Meditation;
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
        display: "flex",
        gap: "1.25rem",
        padding: "1.25rem",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.25rem",
        transition: "border-color 0.15s",
      }}
      className="hk-meditation-row"
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 96,
          height: 96,
          minWidth: 96,
          borderRadius: "0.75rem",
          overflow: "hidden",
          background: "rgba(12,176,1,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
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
          <span style={{ fontSize: "1.75rem" }}>🎵</span>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 0.375rem",
            letterSpacing: "-0.01em",
          }}
        >
          {meditation.title}
        </p>

        {description && (
          <div
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.55,
              marginBottom: "0.875rem",
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

        {/* Audio player */}
        <audio
          controls
          src={meditation.audio_url}
          preload="metadata"
          style={{
            width: "100%",
            maxWidth: "100%",
            height: 36,
            marginBottom: "0.75rem",
          }}
        >
          Your browser does not support audio playback.
        </audio>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={onDownload}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.4375rem 0.875rem",
              borderRadius: "99px",
              background: "#0CB001",
              color: "#fff",
              border: "none",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ↓ Download
          </button>
        </div>
      </div>

      <style>{`
        .hk-meditation-row:hover { border-color: rgba(255,255,255,0.14); }
        @media (max-width: 540px) {
          .hk-meditation-thumb {
            width: 72px !important;
            height: 72px !important;
            min-width: 72px !important;
          }
        }
      `}</style>
    </div>
  );
}
