// src/components/marketing/video-modal.tsx
"use client";
import { useState, useEffect } from "react";

const VIDEO_ID = "8qRCOHzsoZY";

export function VideoModal() {
  const [open, setOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Trigger button — styled to match hero secondary buttons */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", padding: "0.875rem 1.5rem",
          borderRadius: "99px", fontSize: "1rem", fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <span style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #fff", marginLeft: "2px" }} />
        </span>
        Watch Video
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,3,28,0.92)",
            backdropFilter: "blur(16px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "900px",
              borderRadius: "1.25rem", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: "-44px", right: 0,
                background: "transparent", border: "none",
                color: "rgba(255,255,255,0.6)", fontSize: "0.9375rem",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem",
                fontWeight: 500,
              }}
            >
              ✕ Close
            </button>

            {/* 16:9 YouTube embed */}
            <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Humankind — Watch Video"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}