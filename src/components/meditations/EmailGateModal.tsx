// src/components/meditations/EmailGateModal.tsx
"use client";

import { useState, useEffect } from "react";

const APP_URL = "https://app.humankind.center";

type Meditation = {
  id: string;
  title: string;
};

export function EmailGateModal({
  meditation,
  onClose,
  onSuccess,
}: {
  meditation: Meditation;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${APP_URL}/api/public/newsletter-subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          source: "meditation-download",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error || "Could not subscribe. Please try again.");
        setBusy(false);
        return;
      }
      onSuccess();
    } catch {
      setErrorMsg("Could not subscribe. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#020520",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.25rem",
          padding: "2rem",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.875rem",
            right: "0.875rem",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.25rem 0.5rem",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <p
          className="hk-eyebrow"
          style={{ color: "#0CB001", marginBottom: "0.75rem" }}
        >
          Almost there
        </p>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Get your meditation
        </h2>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
            marginTop: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          Drop your email and we&apos;ll start your download — plus we&apos;ll send
          you new meditations as they release.
        </p>

        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            disabled={busy}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={busy}
            autoFocus
            style={inputStyle}
          />
          <button
            type="submit"
            disabled={busy || !email}
            style={{
              padding: "0.75rem 1.25rem",
              background: "#0CB001",
              color: "#fff",
              border: "none",
              borderRadius: "99px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              cursor: busy ? "wait" : "pointer",
              opacity: busy || !email ? 0.6 : 1,
              transition: "opacity 0.15s",
              fontFamily: "inherit",
            }}
          >
            {busy ? "Subscribing…" : `Get "${meditation.title}"`}
          </button>

          {errorMsg && (
            <p style={{ fontSize: "0.8125rem", color: "#f87171", margin: 0 }}>
              {errorMsg}
            </p>
          )}

          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: "0.25rem",
              textAlign: "center",
            }}
          >
            Already a member?{" "}
            <a
              href={`${APP_URL}/login`}
              style={{ color: "#0CB001", textDecoration: "none" }}
            >
              Sign in
            </a>{" "}
            to download without sharing again.
          </p>
        </form>
      </div>
    </div>
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
