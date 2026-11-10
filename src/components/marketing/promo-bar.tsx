// src/components/marketing/promo-bar.tsx
//
// The bar above the nav (John 11/9: angel.com's "EARLY BLACK FRIDAY SALE · Join for as low as $7/mo" bar, "and I
// want to use this banner to promote our upcoming events"). The sale message and the next events take turns,
// one at a time, a few seconds each. Laid out like Angel's: the label at the left, the words in the middle,
// the button at the right, the X at the far right; on a phone the three stack. The words live in config/promo.ts.

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { PROMO_BAR } from "@/config/promo";

type Event = { id: string; title: string; starts_at: string | null };
type Slide = { label: string; message: string; strong?: string; cta: string; href: string; sale: boolean };

const KEY = "hk-promo-bar-closed";

// closed-for-this-visit lives in sessionStorage; read through a store so the server renders nothing and the
// browser decides after hydration (no flash for a visitor who closed it)
const listeners = new Set<() => void>();
const closedStore = {
  subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; },
  get() { try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; } },
  server() { return true; },
  close() { try { sessionStorage.setItem(KEY, "1"); } catch { /* fine */ } listeners.forEach((fn) => fn()); },
};

function phoenixToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

function when(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Phoenix" });
}

export function PromoBar({ events }: { events: Event[] }) {
  const closed = useSyncExternalStore(closedStore.subscribe, closedStore.get, closedStore.server);
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  const today = phoenixToday();
  const sale = PROMO_BAR.active && today >= PROMO_BAR.from && today <= PROMO_BAR.until;
  const slides: Slide[] = [
    ...(sale ? [{ label: PROMO_BAR.label, message: PROMO_BAR.message, strong: PROMO_BAR.strong, cta: PROMO_BAR.cta, href: PROMO_BAR.href, sale: true }] : []),
    ...events.slice(0, PROMO_BAR.events).map((e) => ({
      label: "Upcoming",
      message: e.title,
      strong: e.starts_at ? when(e.starts_at) : undefined,
      cta: "Get tickets",
      href: `https://app.humankind.center/events/${e.id}`,
      sale: false,
    })),
  ];

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setI((n) => (n + 1) % slides.length); setFade(true); }, 350);
    }, PROMO_BAR.everySeconds * 1000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (closed || slides.length === 0) return null;
  const s = slides[i % slides.length];

  // the sale's message with its price in gold ("$7/mo"), as Angel's bar does; an event's date after its name
  const words = s.sale
    ? (s.strong && s.message.includes(s.strong)
        ? (() => { const [a, b] = s.message.split(s.strong); return <>{a}<strong style={{ color: "#f2c35b", fontWeight: 700 }}>{s.strong}</strong>{b}</>; })()
        : <strong style={{ fontWeight: 700 }}>{s.message}</strong>)
    : <>{s.message}{s.strong ? <span style={{ color: "rgba(255,255,255,0.7)" }}> · {s.strong}</span> : null}</>;

  return (
    <div
      className="hk-promo-bar"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
        alignItems: "center",
        gap: "1rem",
        padding: "0.6875rem 3.25rem 0.6875rem 1.5rem",
        background: s.sale
          ? "linear-gradient(90deg, #060a08 0%, #0f3d22 50%, #060a08 100%)"
          : "linear-gradient(90deg, #04071f 0%, #0c1240 50%, #04071f 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        fontSize: "0.9375rem",
        minHeight: "46px",
        opacity: fade ? 1 : 0,
        transition: "opacity 0.35s, background 0.35s",
      }}
    >
      {/* left: the label */}
      <span className="hk-promo-label" style={{ justifySelf: "start", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.8125rem", color: s.sale ? "#f2c35b" : "#4ade80", whiteSpace: "nowrap" }}>
        {s.label}
      </span>
      {/* middle: the words */}
      <span className="hk-promo-words" style={{ justifySelf: "center", textAlign: "center", color: "rgba(255,255,255,0.95)", lineHeight: 1.35 }}>
        {words}
      </span>
      {/* right: the button */}
      <a
        href={s.href}
        className="hk-promo-cta"
        style={{
          justifySelf: "end", display: "inline-flex", alignItems: "center", padding: "0.4375rem 1rem", borderRadius: "8px",
          background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff",
          fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        {s.cta}
      </a>
      <button
        type="button"
        aria-label="Close"
        onClick={() => closedStore.close()}
        style={{
          position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
          width: 30, height: 30, borderRadius: 15, border: "none", background: "transparent", color: "rgba(255,255,255,0.75)",
          fontSize: "1.375rem", lineHeight: 1, cursor: "pointer",
        }}
      >
        ×
      </button>
      <style>{`
        @media (max-width: 760px) {
          .hk-promo-bar { grid-template-columns: 1fr !important; gap: 0.375rem !important; padding: 0.75rem 2.75rem 0.75rem 1rem !important; text-align: center; }
          .hk-promo-label, .hk-promo-words, .hk-promo-cta { justify-self: center !important; }
          .hk-promo-words { font-size: 0.875rem; }
          .hk-promo-cta { margin-top: 0.25rem; }
        }
      `}</style>
    </div>
  );
}
