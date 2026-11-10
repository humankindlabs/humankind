// src/components/homepage/sections/SectionTickets.tsx
//
// "Get your tickets and NFT" (John 11/9, after angel.com's free-tickets block): the words on the left; on the
// right the event's TICKET, drawn here (its art, a notch, a tear line, a barcode), with the collectable card
// that comes with it leaning beside it. Only events that come with a card are shown, and they take turns
// (John: "Heart Coherence active now · Elforia next · Metamorphosis after … do a rotate"). Nothing is cut off.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TICKETS } from "@/config/promo";

type Event = { id: string; title: string; starts_at: string | null; image_url: string | null; venue_name?: string | null; nft?: boolean; card_image?: string | null };

function when(iso: string | null, long = false): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", long
    ? { weekday: "long", month: "long", day: "numeric", timeZone: "America/Phoenix" }
    : { month: "short", day: "numeric", year: "numeric", timeZone: "America/Phoenix" });
}

/** the ticket: the event's art over a tear line, "ADMIT ONE", the date, a barcode — drawn in CSS */
function Ticket({ ev }: { ev: Event }) {
  const notch = "radial-gradient(circle at 0 50%, transparent 11px, #f6f1e6 11.5px) left / 50% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 11px, #f6f1e6 11.5px) right / 50% 100% no-repeat";
  return (
    <div className="hk-ticket" style={{ width: 230, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.55)", background: "#f6f1e6", color: "#111", display: "flex", flexDirection: "column" }}>
      <div className="hk-ticket-art" style={{ position: "relative", height: 210, background: "#0b1020" }}>
        {ev.image_url
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={ev.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg, #0CB001, #063a10)" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)" }} />
        <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, color: "#fff" }}>
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.18em", fontWeight: 800, opacity: 0.85 }}>EVENT TICKET</p>
          <p style={{ fontSize: "0.9375rem", fontWeight: 800, lineHeight: 1.15, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ev.title}</p>
        </div>
      </div>
      {/* the tear line with its notches */}
      <div style={{ height: 24, background: notch, position: "relative" }}>
        <div style={{ position: "absolute", left: 18, right: 18, top: 11, borderTop: "2px dashed rgba(0,0,0,0.25)" }} />
      </div>
      <div style={{ padding: "2px 16px 14px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: "0.625rem", letterSpacing: "0.16em", fontWeight: 800, color: "#0a7a00" }}>ADMIT ONE</p>
          <p style={{ fontSize: "0.8125rem", fontWeight: 700, marginTop: 2 }}>{when(ev.starts_at)}</p>
          <p style={{ fontSize: "0.6875rem", color: "rgba(0,0,0,0.55)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.venue_name || "at humankind · Sedona, AZ"}</p>
        </div>
        {/* a barcode */}
        <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 34, flexShrink: 0 }} aria-hidden>
          {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1].map((w, n) => (
            <span key={n} style={{ width: w, height: "100%", background: "#111", opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionTickets({ events }: { events: Event[] }) {
  // the events that come with a card, the next one first (the rotation's order: Heart Coherence, ELFORIA, Metamorphosis…)
  const shows = events.filter((e) => e.nft);
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    if (shows.length < 2) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setI((n) => (n + 1) % shows.length); setFade(true); }, 400);
    }, TICKETS.everySeconds * 1000);
    return () => clearInterval(t);
  }, [shows.length]);

  const ev = shows[i % Math.max(1, shows.length)] ?? null;
  const href = ev ? `https://app.humankind.center/events/${ev.id}` : TICKETS.fallbackHref;
  const cta = ev ? TICKETS.featuredCta(ev.title) : TICKETS.fallbackCta;

  return (
    <section style={{ padding: "clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 2rem)" }}>
      <div
        className="hk-home-split hk-tickets-grid"
        style={{
          maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", alignItems: "center", gap: "clamp(2rem, 5vw, 4rem)",
          padding: "clamp(1.5rem, 4vw, 3rem)", borderRadius: "1.75rem",
          background: "linear-gradient(135deg, rgba(12,176,1,0.08), rgba(255,255,255,0.02) 60%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>{TICKETS.eyebrow}</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
            {TICKETS.title}
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "1rem" }}>{TICKETS.body}</p>
          <div style={{ minHeight: "3.25rem", opacity: fade ? 1 : 0, transition: "opacity 0.4s" }}>
            {ev ? (
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
                <span style={{ color: "#0CB001", fontWeight: 700 }}>{i % Math.max(1, shows.length) === 0 ? "On sale now: " : "Coming up: "}</span>
                {ev.title}{ev.starts_at ? ` · ${when(ev.starts_at, true)}` : ""}
              </p>
            ) : (
              <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>The next event with a card is announced soon.</p>
            )}
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href={href} className="hk-btn hk-btn-primary hk-btn-lg" style={{ borderRadius: "99px" }}>{cta}</a>
            <Link href={TICKETS.secondary.href} style={{ fontSize: "0.9375rem", color: "#0CB001", textDecoration: "none", fontWeight: 500 }}>
              {TICKETS.secondary.label} →
            </Link>
          </div>
          {shows.length > 1 && (
            <div style={{ display: "flex", gap: 6, marginTop: "1.5rem" }} aria-hidden>
              {shows.map((_, n) => (
                <span key={n} onClick={() => { setI(n); setFade(true); }} style={{ width: n === i ? 22 : 8, height: 8, borderRadius: 4, background: n === i ? "#0CB001" : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "width 0.3s" }} />
              ))}
            </div>
          )}
        </div>

        {/* the ticket and its card, side by side, whole */}
        <div className="hk-ticket-pair" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, padding: "1rem 0", opacity: fade ? 1 : 0, transition: "opacity 0.4s" }} aria-hidden>
          {ev ? (
            <>
              <div style={{ transform: "rotate(-6deg) translateX(12px)", zIndex: 2 }}><Ticket ev={ev} /></div>
              {ev.card_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ev.card_image} alt="" className="hk-ticket-card" style={{ width: 215, borderRadius: 14, boxShadow: "0 24px 60px rgba(0,0,0,0.55)", transform: "rotate(7deg) translateX(-12px) translateY(18px)", zIndex: 1 }} />
              ) : (
                <div className="hk-ticket-card" style={{ width: 215, aspectRatio: "5 / 7", borderRadius: 14, background: "linear-gradient(160deg, #1b2347, #0b1020)", border: "1px solid rgba(255,255,255,0.12)", transform: "rotate(7deg) translateX(-12px) translateY(18px)" }} />
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
              {TICKETS.cards.map((src, n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" style={{ width: 140, borderRadius: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.5)", transform: `rotate(${(n - 1) * 6}deg)` }} />
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .hk-tickets-grid { grid-template-columns: 1fr !important; }
          .hk-ticket-pair { min-height: 0 !important; }
        }
        @media (max-width: 480px) {
          .hk-ticket { width: 168px !important; }
          .hk-ticket-art { height: 150px !important; }
          .hk-ticket-card { width: 150px !important; }
        }
      `}</style>
    </section>
  );
}
