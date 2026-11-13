"use client";
// src/components/landing/join-landing.tsx — the /join ad landing page (see app/join/page.tsx).
// John 11/12: airy, clean graphics (thumbnails from shows), not wordy; the wall is past shows, conferences and
// live streams; the page sells Online Access ($11 a month, or the Black Friday year); the email box commits
// the visitor to Online Access.

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { trackEvent } from "@/lib/analytics/client";

const APP = "https://app.humankind.center";
const GREEN = "#0CB001";
const GOLD = "#F5C451";

export type Poster = { id: string; title: string; still: string };
export type Sale = { open: boolean; label: string; code: string; until: string; monthPrice: number; yearPrice: number; yearAfter: number; perMonth: number; href: string };
export type JoinData = { replays: Poster[]; shows: Poster[]; conferences: Poster[]; events: Poster[]; counts: { members: number; replays: number; departments: number }; sale: Sale };

/** an app link with this page's utm tags carried along */
function withUtm(href: string, extra: Record<string, string> = {}): string {
  const url = new URL(href);
  try {
    const here = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "aff"]) {
      const v = here.get(k);
      if (v) url.searchParams.set(k, v.slice(0, 120));
    }
  } catch { /* server */ }
  for (const [k, v] of Object.entries(extra)) url.searchParams.set(k, v);
  return url.toString();
}

/** the email box: it opens the app's sign-up on Online Access (the Black Friday year while the sale runs) */
function EmailStart({ sale, where }: { sale: Sale; where: string }) {
  const [email, setEmail] = useState("");
  const go = (e: FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    void trackEvent("landing.start", "marketing", { landing_page: "join", where, has_email: Boolean(clean), sale: sale.open }, "humankind.center");
    window.location.href = withUtm(sale.href, clean ? { email: clean } : {});
  };
  return (
    <form className="hk-join-form" onSubmit={go}>
      <input type="email" inputMode="email" autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
      <button type="submit">Join Online Access</button>
    </form>
  );
}

/** the line under every box: what the email signs you up for (John 11/12) */
function Commit({ sale }: { sale: Sale }) {
  return (
    <p className="hk-join-commit">
      {sale.open
        ? <>You&apos;re signing up for <b>Online Access</b>, ${sale.yearAfter} for the first year (that&apos;s ${sale.perMonth}/mo). Cancel any time.</>
        : <>You&apos;re signing up for <b>Online Access</b>, ${sale.monthPrice} a month. Cancel any time.</>}
    </p>
  );
}

function Grid({ items, cols = 4, max }: { items: Poster[]; cols?: number; max: number }) {
  return (
    <div className="hk-join-grid" style={{ ["--cols" as string]: cols }}>
      {items.slice(0, max).map((p) => <img key={p.id} src={p.still} alt={p.title} title={p.title} loading="lazy" />)}
    </div>
  );
}

export function JoinLanding({ replays, shows, conferences, events, counts, sale }: JoinData) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    void trackEvent("landing.page_view", "marketing", {
      landing_page: "join", path: window.location.pathname, url: window.location.href, referrer: document.referrer || null,
      utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"), sale: sale.open,
    }, "humankind.center");
  }, [sale.open]);

  // the wall: shows, conferences and events take turns, so every row has all three kinds
  // one picture per show (a show's poster and its replays share a picture; John 11/13: Reality Shift sat twice side by side)
  const mix: Poster[] = [];
  const seen = new Set<string>();
  const keyOf = (p: Poster) => [p.still, p.title.toLowerCase().replace(/\s*(\||:|#|with|ep\.?\s*\d).*$/, "").trim()];
  const pools = [shows, conferences, events, replays];
  for (let i = 0; mix.length < 30 && i < 30; i++) for (const pool of pools) {
    const p = pool[i];
    if (!p) continue;
    const keys = keyOf(p);
    if (keys.some((k) => seen.has(k))) continue;
    keys.forEach((k) => seen.add(k));
    mix.push(p);
  }
  const rows = [mix.slice(0, 10), mix.slice(10, 20), mix.slice(20, 30)].filter((r) => r.length >= 4);
  const n = (x: number) => x.toLocaleString("en-US");
  const money = (x: number) => (Number.isInteger(x) ? `$${x}` : `$${x.toFixed(2)}`);

  return (
    <main className="hk-join">
      <style>{`
        .hk-join { background:#00031C; color:#fff; min-height:100dvh; overflow-x:hidden; font-family: var(--font-geist-sans, system-ui, sans-serif); }
        .hk-join-top { position:absolute; top:0; left:0; right:0; z-index:5; display:flex; align-items:center; justify-content:space-between; padding:1.1rem 1.5rem; }
        .hk-join-top a { color:#fff; text-decoration:none; }
        .hk-join-top .brand { font-size:1.4rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-join-top .signin { font-size:0.85rem; font-weight:600; padding:0.5rem 1rem; border:1px solid rgba(255,255,255,0.25); border-radius:999px; }
        .hk-join-hero { position:relative; min-height:100dvh; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; text-align:center; padding: 0 1.5rem 4rem; overflow:hidden; }
        .hk-join-wall { position:absolute; inset:0; display:flex; flex-direction:column; gap:12px; padding-top:1rem; transform: rotate(-4deg) scale(1.15); pointer-events:none; }
        .hk-join-row { display:flex; gap:12px; width:max-content; animation: hk-join-drift 70s linear infinite; }
        .hk-join-row:nth-child(2) { animation-duration: 90s; animation-direction: reverse; }
        .hk-join-row:nth-child(3) { animation-duration: 110s; }
        .hk-join-row img { width: 240px; aspect-ratio:16/9; object-fit:cover; border-radius:12px; flex:none; background:#0d1117; }
        @keyframes hk-join-drift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hk-join-fade { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,3,28,0.25) 0%, rgba(0,3,28,0.6) 36%, rgba(0,3,28,0.96) 62%, #00031C 72%); }
        .hk-join-copy { position:relative; z-index:2; max-width: 640px; }
        .hk-join-kicker { font-size:0.78rem; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${GREEN}; margin:0 0 1rem; }
        .hk-join-h1 { font-size: clamp(2.3rem, 7vw, 4.4rem); font-weight:800; letter-spacing:-0.03em; line-height:1.0; margin:0; }
        .hk-join-mbs { margin: 1rem 0 0; font-size: clamp(0.95rem, 2.2vw, 1.2rem); font-weight:700; color:#76ff7a; letter-spacing: 0.26em; text-transform: uppercase; }
        .hk-join-deal { margin: 1.4rem auto 0; font-size: clamp(1rem, 1.8vw, 1.2rem); color: rgba(255,255,255,0.85); line-height:1.5; }
        .hk-join-deal b { color:${GOLD}; font-weight:800; }
        .hk-join-form { display:flex; gap:0.6rem; width:100%; max-width:520px; margin: 1.5rem auto 0; }
        .hk-join-form input { flex:1; min-width:0; padding: 1rem 1.15rem; border-radius: 12px; border:1px solid rgba(255,255,255,0.22); background: rgba(0,0,0,0.5); color:#fff; font-size:1rem; }
        .hk-join-form input::placeholder { color: rgba(255,255,255,0.45); }
        .hk-join-form button { padding: 1rem 1.6rem; border-radius: 12px; border:0; background:${GREEN}; color:#fff; font-weight:800; font-size:1rem; cursor:pointer; white-space:nowrap; box-shadow: 0 0 36px rgba(12,176,1,0.35); }
        .hk-join-commit { margin: 0.8rem auto 0; max-width: 520px; font-size:0.85rem; color: rgba(255,255,255,0.6); line-height:1.5; }
        .hk-join-commit b { color:#fff; font-weight:700; }
        .hk-join-sub { margin: 0.6rem 0 0; font-size:0.8rem; color: rgba(255,255,255,0.45); }
        .hk-join-ways { display:grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 760px; margin: 1.6rem auto 0; }
        .hk-join-way { padding: 1.4rem 1.4rem; border-radius: 18px; border:1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.025); display:flex; flex-direction:column; }
        .hk-join-way h4 { margin:0; font-size:1rem; font-weight:700; color: rgba(255,255,255,0.85); }
        .hk-join-way .p { margin: 0.35rem 0 0; font-size:1.6rem; font-weight:800; letter-spacing:-0.03em; }
        .hk-join-way .p small { font-size:0.9rem; font-weight:600; color: rgba(255,255,255,0.5); letter-spacing:0; }
        .hk-join-way p.l { margin: 0.6rem 0 0; font-size:0.9rem; color: rgba(255,255,255,0.6); line-height:1.55; flex:1; }
        .hk-join-way a { display:inline-block; margin-top: 1rem; font-size:0.9rem; font-weight:700; color:${GREEN}; text-decoration:none; }
        .hk-join-sub a { color: rgba(255,255,255,0.7); }
        .hk-join-proof { display:flex; gap:2.2rem; justify-content:center; margin: 2rem 0 0; flex-wrap:wrap; }
        .hk-join-proof strong { display:block; font-size:1.5rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-join-proof span { font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color: rgba(255,255,255,0.45); }
        .hk-join-sec { padding: 6rem 1.5rem; }
        .hk-join-wrap { max-width: 1080px; margin: 0 auto; }
        .hk-join-h2 { font-size: clamp(1.8rem, 4vw, 2.7rem); font-weight:800; letter-spacing:-0.025em; line-height:1.1; margin:0; text-align:center; }
        .hk-join-p { text-align:center; max-width: 560px; margin: 1rem auto 0; color: rgba(255,255,255,0.6); line-height:1.7; font-size:1.05rem; }
        .hk-join-grid { display:grid; grid-template-columns: repeat(var(--cols, 4), 1fr); gap: 1rem; margin-top: 3rem; }
        .hk-join-grid img { width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:14px; background:#0d1117; box-shadow: 0 20px 50px rgba(0,0,0,0.45); }
        .hk-join-offer { max-width: 560px; margin: 3rem auto 0; padding: 2.4rem 2rem; border-radius: 24px; border:1px solid rgba(245,196,81,0.45); background: linear-gradient(180deg, rgba(245,196,81,0.10), rgba(245,196,81,0.02)); text-align:center; position:relative; }
        .hk-join-offer .badge { position:absolute; top:-0.85rem; left:50%; transform:translateX(-50%); padding:0.35rem 0.9rem; border-radius:999px; background:${GOLD}; color:#00031C; font-size:0.72rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; }
        .hk-join-offer h3 { margin:0; font-size:1.1rem; font-weight:700; color: rgba(255,255,255,0.8); }
        .hk-join-offer .price { margin: 0.6rem 0 0; font-size: 3.4rem; font-weight:800; letter-spacing:-0.04em; line-height:1; }
        .hk-join-offer .price small { font-size:1.1rem; font-weight:600; color: rgba(255,255,255,0.55); letter-spacing:0; }
        .hk-join-offer .was { margin: 0.6rem 0 0; color: rgba(255,255,255,0.6); font-size:0.95rem; }
        .hk-join-offer .was s { color: rgba(255,255,255,0.35); }
        .hk-join-offer ul { list-style:none; padding:0; margin: 1.6rem auto 0; display:flex; flex-direction:column; gap:0.55rem; max-width: 360px; text-align:left; }
        .hk-join-offer li { display:flex; gap:0.6rem; font-size:0.95rem; color: rgba(255,255,255,0.8); line-height:1.5; }
        .hk-join-offer li::before { content:"✓"; color:${GREEN}; font-weight:800; flex:none; }
        .hk-join-offer .hk-join-form { margin-top: 1.8rem; }
        .hk-join-other { margin: 1.2rem 0 0; font-size:0.85rem; color: rgba(255,255,255,0.45); }
        .hk-join-other a { color: rgba(255,255,255,0.75); }
        .hk-join-mbs3 { display:grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; margin-top: 3.5rem; text-align:center; }
        .hk-join-mbs3 h3 { margin:0; font-size:2rem; font-weight:800; letter-spacing:-0.03em; color:#fff; }
        .hk-join-mbs3 p { margin: 0.6rem 0 0; color: rgba(255,255,255,0.6); line-height:1.65; font-size:0.98rem; }
        .hk-join-mark { width:72px; height:72px; border-radius:18px; margin: 0 auto 1.6rem; display:block; }
        .hk-join-cta { text-align:center; padding: 5rem 1.5rem 6rem; background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(12,176,1,0.18), transparent 70%); }
        @media (max-width: 760px) {
          .hk-join-grid { grid-template-columns: repeat(2, 1fr); gap: 0.7rem; margin-top: 2rem; }
          .hk-join-mbs3 { grid-template-columns: 1fr; gap: 2rem; }
          .hk-join-sec { padding: 4rem 1.25rem; }
          .hk-join-form { flex-direction:column; }
          .hk-join-row img { width: 160px; border-radius:10px; }
          .hk-join-hero { padding-bottom: 3rem; }
          .hk-join-offer { padding: 2rem 1.25rem; }
          .hk-join-ways { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hk-join-top">
        <Link href="/" className="brand">humankind</Link>
        <a href={`${APP}/login`} className="signin">Sign in</a>
      </div>

      {/* hero over the wall: live shows, conferences, events at the center, replays */}
      <section className="hk-join-hero">
        <div className="hk-join-wall" aria-hidden="true">
          {rows.map((row, i) => (
            <div key={i} className="hk-join-row">
              {[...row, ...row].map((p, j) => <img key={`${p.id}-${j}`} src={p.still} alt="" loading={i === 0 ? "eager" : "lazy"} />)}
            </div>
          ))}
        </div>
        <div className="hk-join-fade" aria-hidden="true" />
        <div className="hk-join-copy">
          <p className="hk-join-kicker">this is humankind</p>
          <h1 className="hk-join-h1">A new lifestyle.<br />Raising consciousness.</h1>
          <p className="hk-join-mbs">mind · body · soul</p>
          <p className="hk-join-deal">
            {sale.open
              ? <>{sale.label}: Online Access for <b>{money(sale.perMonth)}/mo</b>, billed annually. Every live stream, the full library, your TV.</>
              : <>Online Access is <b>${sale.monthPrice} a month</b>. Every live stream, the full library, your TV.</>}
          </p>
          <EmailStart sale={sale} where="hero" />
          <Commit sale={sale} />
          <p className="hk-join-sub">Already a member? <a href={`${APP}/login`}>Sign in</a></p>
          {counts.members > 0 ? (
            <div className="hk-join-proof">
              <div><strong>{n(counts.members)}</strong><span>members</span></div>
              <div><strong>{n(counts.replays)}</strong><span>shows</span></div>
              <div><strong>live</strong><span>every week</span></div>
            </div>
          ) : null}
        </div>
      </section>

      {/* live every week */}
      {shows.length >= 4 ? (
        <section className="hk-join-sec">
          <div className="hk-join-wrap">
            <h2 className="hk-join-h2">Live every week.</h2>
            <p className="hk-join-p">Shows from the room in Sedona, live and in the chat, then in the library.</p>
            <Grid items={shows} max={12} />
          </div>
        </section>
      ) : null}

      {/* the offer */}
      <section className="hk-join-sec" style={{ paddingTop: "2rem" }}>
        <div className="hk-join-wrap">
          <h2 className="hk-join-h2">Everything, from anywhere.</h2>
          <p className="hk-join-p">Your membership keeps the shows live and the room in Sedona open.</p>
          <div className="hk-join-offer">
            <span className="badge">{sale.open ? sale.label : "Most popular"}</span>
            <h3>Online Access{sale.open ? ", one year" : ""}</h3>
            {sale.open ? (
              <>
                <p className="price">{money(sale.perMonth)}<small>/mo</small></p>
                <p className="was"><s>${sale.yearPrice}</s> {money(sale.yearAfter)} for the first year, billed once</p>
              </>
            ) : (
              <>
                <p className="price">${sale.monthPrice}<small>/mo</small></p>
                <p className="was">or ${sale.yearPrice} a year</p>
              </>
            )}
            <ul>
              <li>Every live stream and the full replay library</li>
              <li>Member-only streams and live chat</li>
              <li>Watch on your phone, the web, Fire TV, Google TV and Roku</li>
              <li>Your wallet, your own link, and a share of what you bring in</li>
            </ul>
            <EmailStart sale={sale} where="offer" />
            <Commit sale={sale} />
            {sale.open ? <p className="hk-join-other"><a href={`${APP}/register?tier=online`}>Or $11 a month, billed monthly</a></p> : null}
          </div>

          <div className="hk-join-ways">
            <div className="hk-join-way">
              <h4>Free Member</h4>
              <p className="p">$0</p>
              <p className="l">The free replays and public live streams, your profile and messages, your wallet, and your own link that earns 20% on members you bring.</p>
              <a href={`${APP}/register?tier=free`} onClick={(e) => { e.preventDefault(); void trackEvent("landing.plan", "marketing", { landing_page: "join", tier: "free" }, "humankind.center"); window.location.href = withUtm(`${APP}/register`, { tier: "free" }); }}>Start free →</a>
            </div>
            <div className="hk-join-way">
              <h4>Full Membership</h4>
              <p className="p">$77<small>/mo</small></p>
              <p className="l">Everything online, plus in-person access to events at the Sedona venue, a vote in community decisions, 7% off stays, and 50% on members you bring, for life.</p>
              <a href={`${APP}/register?tier=full`} onClick={(e) => { e.preventDefault(); void trackEvent("landing.plan", "marketing", { landing_page: "join", tier: "full" }, "humankind.center"); window.location.href = withUtm(`${APP}/register`, { tier: "full" }); }}>Choose Full Membership →</a>
            </div>
          </div>
        </div>
      </section>

      {/* conferences */}
      {conferences.length >= 3 ? (
        <section className="hk-join-sec" style={{ paddingTop: "2rem" }}>
          <div className="hk-join-wrap">
            <h2 className="hk-join-h2">The conferences.</h2>
            <p className="hk-join-p">Every talk, recorded and in the library the same week.</p>
            <Grid items={conferences} cols={3} max={12} />
          </div>
        </section>
      ) : null}

      {/* at the center */}
      {events.length >= 4 ? (
        <section className="hk-join-sec" style={{ paddingTop: "2rem" }}>
          <div className="hk-join-wrap">
            <h2 className="hk-join-h2">At the center in Sedona.</h2>
            <p className="hk-join-p">Music, dance, meditation, sound and ceremony. Come when you can; watch when you can&apos;t.</p>
            <Grid items={events} max={8} />
          </div>
        </section>
      ) : null}

      {/* the movement */}
      <section className="hk-join-sec" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="hk-join-wrap">
          <img className="hk-join-mark" src="/humankind-1024x1024.png" alt="" />
          <h2 className="hk-join-h2">More than a platform. A lifestyle.</h2>
          <p className="hk-join-p">As the world changes, we work on ourselves, and we work together.</p>
          <div className="hk-join-mbs3">
            <div><h3>Mind</h3><p>Real-world information from people who have lived it. Live, every week.</p></div>
            <div><h3>Body</h3><p>Dance, breathwork, sound and ceremony at the center, and a place to stay when you come.</p></div>
            <div><h3>Soul</h3><p>A community that decides together, builds together and shares what it earns.</p></div>
          </div>
          <p className="hk-join-p" style={{ marginTop: "2.5rem" }}><Link href="/how-it-works" style={{ color: GREEN, fontWeight: 700, textDecoration: "none" }}>How humankind works →</Link></p>
        </div>
      </section>

      <section className="hk-join-cta">
        <h2 className="hk-join-h2">Join the movement.</h2>
        <p className="hk-join-p">{sale.open ? `${sale.label} ends ${new Date(sale.until + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric" })}.` : "It takes a minute."}</p>
        <div style={{ maxWidth: 520, margin: "0 auto" }}><EmailStart sale={sale} where="bottom" /><Commit sale={sale} /></div>
      </section>

      <HomepageFooter />
    </main>
  );
}
