// src/components/marketing/promo-bar.tsx
//
// The bar above the nav (John 11/9: angel.com's "EARLY BLACK FRIDAY SALE · Join for as low as $7/mo" bar, "and I
// want to use this banner to promote our upcoming events"). The sale message and the next events take turns,
// one at a time, a few seconds each; the X closes it for the visit. The words live in config/promo.ts.

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { PROMO_BAR } from "@/config/promo";

type Event = { id: string; title: string; starts_at: string | null };
type Slide = { label: string; message: string; cta: string; href: string };

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
    ...(sale ? [{ label: PROMO_BAR.label, message: PROMO_BAR.message, cta: PROMO_BAR.cta, href: PROMO_BAR.href }] : []),
    ...events.slice(0, PROMO_BAR.events).map((e) => ({
      label: "Upcoming",
      message: `${e.title}${e.starts_at ? ` · ${when(e.starts_at)}` : ""}`,
      cta: "Get tickets",
      href: `https://app.humankind.center/events/${e.id}`,
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
  const isSale = sale && i % slides.length === 0;

  return (
    <div
      className="hk-promo-bar"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "0.625rem 3rem 0.625rem 1.25rem",
        background: isSale
          ? "linear-gradient(90deg, #0b1a10 0%, #0f3d22 50%, #0b1a10 100%)"
          : "linear-gradient(90deg, #04071f 0%, #0c1240 50%, #04071f 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        fontSize: "0.9375rem",
        minHeight: "44px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap", opacity: fade ? 1 : 0, transition: "opacity 0.35s" }}
      >
        <span style={{ fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem", color: isSale ? "#f2c35b" : "#4ade80", whiteSpace: "nowrap" }}>
          {s.label}
        </span>
        <span style={{ color: "rgba(255,255,255,0.92)" }}>
          {isSale ? <strong style={{ fontWeight: 700 }}>{s.message}</strong> : s.message}
        </span>
        <a
          href={s.href}
          style={{
            display: "inline-flex", alignItems: "center", padding: "0.375rem 0.875rem", borderRadius: "99px",
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff",
            fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
          }}
        >
          {s.cta}
        </a>
      </div>
      {slides.length > 1 && (
        <div className="hk-promo-dots" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "5px" }} aria-hidden>
          {slides.map((_, n) => (
            <span key={n} style={{ width: 5, height: 5, borderRadius: 3, background: n === i % slides.length ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      )}
      <button
        type="button"
        aria-label="Close"
        onClick={() => closedStore.close()}
        style={{
          position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
          width: 30, height: 30, borderRadius: 15, border: "none", background: "transparent", color: "rgba(255,255,255,0.7)",
          fontSize: "1.25rem", lineHeight: 1, cursor: "pointer",
        }}
      >
        ×
      </button>
      <style>{`
        @media (max-width: 640px) {
          .hk-promo-bar { font-size: 0.8125rem; padding-left: 0.75rem; }
          .hk-promo-bar > div:first-child { gap: 0.5rem 0.75rem; }
          .hk-promo-dots { display: none !important; }
        }
      `}</style>
    </div>
  );
}
