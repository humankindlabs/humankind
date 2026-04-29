// src/app/not-found.tsx
//
// Marketing site 404 page. Adapted from humankind-app's 404 — same look,
// but buttons go to the marketing homepage and the app dashboard instead
// of dashboard/events (which don't exist on humankind.center).

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--hk-bg, #00031C)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* 404 number */}
      <p
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          userSelect: "none",
          marginBottom: "0",
        }}
      >
        404
      </p>

      {/* Green dot separator */}
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#0CB001",
          margin: "1.5rem auto",
          boxShadow: "0 0 12px rgba(12,176,1,0.6)",
        }}
      />

      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#fff",
          marginBottom: "0.75rem",
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "rgba(255,255,255,0.45)",
          maxWidth: "420px",
          lineHeight: 1.6,
          marginBottom: "2.5rem",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "0.75rem",
            background: "#0CB001",
            color: "#fff",
            fontSize: "0.9375rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "opacity 0.15s ease",
          }}
        >
          Back to Home
        </Link>
        <a
          href="https://app.humankind.center/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.625rem 1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.9375rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.15s ease",
          }}
        >
          Go to App
        </a>
      </div>

      {/* Brand watermark */}
      <p
        style={{
          position: "absolute",
          bottom: "2rem",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Humankind
      </p>
    </div>
  );
}