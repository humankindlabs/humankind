// src/components/homepage/sections/SectionFAQ.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    q: "What is Humankind?",
    a: "Humankind is a conscious community platform and physical venue based in Sedona, Arizona. We host weekly live events — from conferences and workshops to sound healings and conscious dance — and stream them globally for our online members.",
  },
  {
    q: "Do I need to be in Sedona to join?",
    a: "Not at all. Our Online Access membership gives you full access to live streams, replays, and member-only broadcasts from anywhere in the world. Many of our members tune in from across the US and internationally.",
  },
  {
    q: "What's included in the Free membership?",
    a: "Free members get access to public events, basic streaming, and a community profile. It's a great way to experience Humankind before upgrading to full access.",
  },
  {
    q: "How do the live streams work?",
    a: "Every Friday we go live with our weekly podcast and community stream. Members get full access via the app or browser — including live chat, replays, and member-only content. Full Membership and Online Access tiers include streaming.",
  },
  {
    q: "What types of events does Humankind host?",
    a: "We host conscious conferences (Odyssey, Stellar, Real Disclosure, Portal to Ascension), live music events, workshops, retreats, sound healings, film screenings, meditation sessions, and community gatherings.",
  },
  {
    q: "Can I cancel my membership at any time?",
    a: "Yes — all paid plans can be cancelled at any time from your billing settings. You retain access until the end of your current billing period.",
  },
];

export function SectionFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "start" }} className="hk-faq-grid">

        {/* Left */}
        <div style={{ position: "sticky", top: "2rem" }}>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", marginBottom: "1.25rem" }}>
            Frequently asked questions
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "2rem" }}>
            Have more questions? Reach out to us — we're happy to help.
          </p>
          <Link href="mailto:hello@humankind.center" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
            padding: "0.75rem 1.5rem", borderRadius: "99px",
            fontSize: "0.9375rem", fontWeight: 500, textDecoration: "none",
          }}>
            Contact Us →
          </Link>
        </div>

        {/* Right — accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              border: `1px solid ${open === i ? "rgba(12,176,1,0.25)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "1rem",
              background: open === i ? "rgba(12,176,1,0.04)" : "rgba(255,255,255,0.02)",
              overflow: "hidden",
              transition: "border-color 0.2s, background 0.2s",
            }}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "1rem", padding: "1.25rem 1.5rem",
                  background: "transparent", border: "none", cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(12,176,1,0.1)", border: "1px solid rgba(12,176,1,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: open === i ? "#0CB001" : "rgba(255,255,255,0.3)" }} />
                  </span>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.7)" }}>
                    {faq.q}
                  </span>
                </div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.25rem", fontWeight: 300, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 1.5rem 1.25rem 3.5rem" }}>
                  <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hk-faq-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hk-faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}