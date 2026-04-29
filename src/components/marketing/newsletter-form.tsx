// src/components/marketing/newsletter-form.tsx
//
// Client-side newsletter signup form. POSTs to humankind-app's
// /api/public/newsletter-subscribe endpoint (CORS-allowed).

"use client";

import { useState } from "react";

const APP_URL = "https://app.humankind.center";

export function NewsletterForm({
  source = "marketing-site",
}: {
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${APP_URL}/api/public/newsletter-subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Subscription failed. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch {
      setErrorMsg("Subscription failed. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          padding: "2rem",
          background: "rgba(12,176,1,0.06)",
          border: "1px solid rgba(12,176,1,0.25)",
          borderRadius: "1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          Welcome to the community 🌿
        </p>
        <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)" }}>
          You&apos;ll start receiving updates on events, streams, and Sedona happenings.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <input
        type="text"
        placeholder="First name (optional)"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
        disabled={status === "loading"}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        required
        disabled={status === "loading"}
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={status === "loading" || !email}
        style={{
          padding: "0.875rem 1.5rem",
          background: "#0CB001",
          color: "#fff",
          border: "none",
          borderRadius: "99px",
          fontSize: "1rem",
          fontWeight: 700,
          cursor: status === "loading" ? "wait" : "pointer",
          opacity: status === "loading" || !email ? 0.6 : 1,
          transition: "opacity 0.15s",
          fontFamily: "inherit",
        }}
      >
        {status === "loading" ? "Subscribing…" : "Join Newsletter"}
      </button>

      {status === "error" && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "#f87171",
            marginTop: "0.25rem",
          }}
        >
          {errorMsg}
        </p>
      )}

      <p
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.4)",
          marginTop: "0.25rem",
        }}
      >
        We respect your inbox. Unsubscribe anytime.
      </p>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.875rem 1rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.75rem",
  color: "#fff",
  fontSize: "0.9375rem",
  fontFamily: "inherit",
  outline: "none",
};