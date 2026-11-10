// src/components/homepage/sections/SectionTickets.tsx
//
// "Get your tickets and NFT" (John 11/9, after angel.com's free-tickets block): the words on the left, the
// collectable cards fanned on the right like Angel's tickets, one big button to the featured event's ticket page
// (ELFORIA first; the next event when there is no match). What it says lives in config/promo.ts.

import Link from "next/link";
import { TICKETS } from "@/config/promo";

type Event = { id: string; title: string; starts_at: string | null };

function when(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/Phoenix" });
}

export function SectionTickets({ events }: { events: Event[] }) {
  const featured = events.find((e) => TICKETS.featured.test(e.title)) ?? events[0] ?? null;
  const href = featured ? `https://app.humankind.center/events/${featured.id}` : TICKETS.fallbackHref;
  const cta = featured ? TICKETS.featuredCta(featured.title) : TICKETS.fallbackCta;
  // the three cards fan out from the middle one
  const fan = [-14, 0, 14];

  return (
    <section style={{ padding: "clamp(3rem, 7vw, 5rem) clamp(1rem, 4vw, 2rem)" }}>
      <div
        className="hk-home-split hk-tickets-grid"
        style={{
          maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 1fr", alignItems: "center", gap: "clamp(2rem, 5vw, 4rem)",
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
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: featured ? "1rem" : "2rem" }}>{TICKETS.body}</p>
          {featured && (
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.85)", marginBottom: "2rem" }}>
              <span style={{ color: "#0CB001", fontWeight: 700 }}>Next up: </span>
              {featured.title}{featured.starts_at ? ` · ${when(featured.starts_at)}` : ""}
            </p>
          )}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href={href} className="hk-btn hk-btn-primary hk-btn-lg" style={{ borderRadius: "99px" }}>{cta}</a>
            <Link href={TICKETS.secondary.href} style={{ fontSize: "0.9375rem", color: "#0CB001", textDecoration: "none", fontWeight: 500 }}>
              {TICKETS.secondary.label} →
            </Link>
          </div>
        </div>

        {/* the cards, fanned */}
        <div style={{ position: "relative", height: "clamp(280px, 34vw, 420px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", minWidth: 0 }} aria-hidden>
          {TICKETS.cards.map((src, n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="hk-ticket-card"
              style={{
                position: "absolute",
                width: "clamp(140px, 15vw, 210px)",
                borderRadius: "14px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                transform: `translateX(${(n - 1) * 52}%) rotate(${fan[n]}deg) translateY(${Math.abs(n - 1) * 10}px)`,
                transformOrigin: "50% 100%",
                zIndex: n === 1 ? 2 : 1,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .hk-tickets-grid { grid-template-columns: 1fr !important; }
          .hk-tickets-grid > div:last-child { height: 300px !important; }
          .hk-ticket-card { width: 128px !important; }
        }
      `}</style>
    </section>
  );
}
