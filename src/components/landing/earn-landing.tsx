"use client";
// src/components/landing/earn-landing.tsx — the affiliate page for influencers (see app/hi/earn/page.tsx).
// John 11/12: "market to influencers — tell them how simple it is to get set up — show the 3 levels Free, Online,
// Full — get them excited and to pick the level they want to start earning from". Same look as /join: airy,
// pictures, few words. The numbers are the program's (app lib/affiliate-attribution.ts: Free 20% for 6 paid
// months, Online 35% for 12, Full 50% for life), and the terms page has the rest.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { trackEvent } from "@/lib/analytics/client";
import type { Poster } from "./join-landing";

const APP = "https://app.humankind.center";
const GREEN = "#0CB001";
const GOLD = "#F5C451";
const FULL_PRICE = 77;
const ONLINE_PRICE = 11;

type Level = { key: "free" | "online" | "full"; name: string; price: string; rate: number; months: number | null; line: string; cta: string };
const LEVELS: Level[] = [
  { key: "free", name: "Free Member", price: "$0", rate: 0.2, months: 6, line: "Start today, no card. Earn on each person's first six paid months.", cta: "Start free" },
  { key: "online", name: "Online Access", price: "$11/mo", rate: 0.35, months: 12, line: "Every stream and the library for you, and a year of earnings per person.", cta: "Start with Online Access" },
  { key: "full", name: "Full Membership", price: "$77/mo", rate: 0.5, months: null, line: "Half of every payment, for as long as they stay. Two Full referrals and your own membership is paid.", cta: "Start with Full Membership" },
];

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

const money = (x: number) => `$${x.toLocaleString("en-US", { minimumFractionDigits: x % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
const duration = (m: number | null) => (m === null ? "for life" : `for ${m} months`);

export function EarnLanding({ shows }: { shows: Poster[] }) {
  const [full, setFull] = useState(5);
  const [online, setOnline] = useState(20);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    void trackEvent("landing.page_view", "marketing", {
      landing_page: "earn", path: window.location.pathname, url: window.location.href, referrer: document.referrer || null,
      utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"),
    }, "humankind.center");
  }, []);

  const monthly = useMemo(() => LEVELS.map((l) => ({ key: l.key, amount: (full * FULL_PRICE + online * ONLINE_PRICE) * l.rate })), [full, online]);
  const pick = (level: Level) => {
    void trackEvent("landing.plan", "marketing", { landing_page: "earn", tier: level.key }, "humankind.center");
    window.location.href = withUtm(`${APP}/register?tier=${level.key}`, { utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") ?? "earn" });
  };

  return (
    <main className="hk-earn">
      <style>{`
        .hk-earn { background:#00031C; color:#fff; min-height:100dvh; overflow-x:hidden; font-family: var(--font-geist-sans, system-ui, sans-serif); }
        .hk-earn-top { display:flex; align-items:center; justify-content:space-between; padding:1.1rem 1.5rem; }
        .hk-earn-top a { color:#fff; text-decoration:none; }
        .hk-earn-top .brand { font-size:1.4rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-earn-top .signin { font-size:0.85rem; font-weight:600; padding:0.5rem 1rem; border:1px solid rgba(255,255,255,0.25); border-radius:999px; }
        .hk-earn-hero { text-align:center; padding: 5rem 1.5rem 3rem; max-width: 760px; margin: 0 auto; }
        .hk-earn-kicker { font-size:0.78rem; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${GREEN}; margin:0 0 1rem; }
        .hk-earn-h1 { font-size: clamp(2.4rem, 7vw, 4.6rem); font-weight:800; letter-spacing:-0.03em; line-height:1.0; margin:0; }
        .hk-earn-h1 b { color:${GOLD}; }
        .hk-earn-lead { margin: 1.4rem auto 0; max-width: 560px; font-size: clamp(1.05rem, 2vw, 1.25rem); color: rgba(255,255,255,0.75); line-height:1.6; }
        .hk-earn-btn { display:inline-block; margin-top: 2rem; padding: 1rem 2.2rem; border-radius: 999px; background:${GREEN}; color:#fff; font-weight:800; font-size:1rem; text-decoration:none; box-shadow: 0 0 40px rgba(12,176,1,0.35); border:0; cursor:pointer; }
        .hk-earn-sub { margin: 1rem 0 0; font-size:0.85rem; color: rgba(255,255,255,0.45); }
        .hk-earn-sub a { color: rgba(255,255,255,0.75); }
        .hk-earn-strip { display:flex; gap:12px; width:max-content; padding: 1rem 0 0; animation: hk-earn-drift 80s linear infinite; }
        .hk-earn-strip img { width: 300px; aspect-ratio:16/9; object-fit:cover; border-radius:14px; flex:none; background:#0d1117; }
        .hk-earn-stripwrap { overflow:hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        @keyframes hk-earn-drift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hk-earn-sec { padding: 6rem 1.5rem; }
        .hk-earn-wrap { max-width: 1080px; margin: 0 auto; }
        .hk-earn-h2 { font-size: clamp(1.8rem, 4vw, 2.7rem); font-weight:800; letter-spacing:-0.025em; line-height:1.1; margin:0; text-align:center; }
        .hk-earn-p { text-align:center; max-width: 560px; margin: 1rem auto 0; color: rgba(255,255,255,0.6); line-height:1.7; font-size:1.05rem; }
        .hk-earn-steps { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
        .hk-earn-step { padding: 2rem 1.6rem; border-radius: 20px; border:1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.025); }
        .hk-earn-step .n { font-size:0.8rem; font-weight:800; letter-spacing:0.14em; color:${GREEN}; }
        .hk-earn-step h3 { margin: 0.6rem 0 0; font-size:1.3rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-earn-step p { margin: 0.6rem 0 0; color: rgba(255,255,255,0.62); line-height:1.6; font-size:0.98rem; }
        .hk-earn-step code { display:inline-block; margin-top:0.8rem; padding:0.4rem 0.7rem; border-radius:8px; background: rgba(0,0,0,0.45); border:1px solid rgba(255,255,255,0.12); font-size:0.85rem; color:#fff; }
        .hk-earn-levels { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 3.5rem; align-items:stretch; }
        .hk-earn-level { position:relative; padding: 2.2rem 1.8rem; border-radius: 24px; border:1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); display:flex; flex-direction:column; text-align:center; }
        .hk-earn-level.best { border-color: rgba(245,196,81,0.55); background: linear-gradient(180deg, rgba(245,196,81,0.10), rgba(245,196,81,0.02)); }
        .hk-earn-level .badge { position:absolute; top:-0.85rem; left:50%; transform:translateX(-50%); padding:0.35rem 0.9rem; border-radius:999px; background:${GOLD}; color:#00031C; font-size:0.7rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; }
        .hk-earn-level h3 { margin:0; font-size:1.05rem; font-weight:700; color: rgba(255,255,255,0.8); }
        .hk-earn-level .price { margin: 0.3rem 0 0; font-size:0.95rem; color: rgba(255,255,255,0.5); }
        .hk-earn-level .rate { margin: 1.2rem 0 0; font-size: 3.6rem; font-weight:800; letter-spacing:-0.04em; line-height:1; }
        .hk-earn-level .rate small { display:block; font-size:0.95rem; font-weight:600; color: rgba(255,255,255,0.6); letter-spacing:0; margin-top:0.4rem; }
        .hk-earn-level .per { margin: 1.4rem 0 0; padding: 0.9rem; border-radius: 14px; background: rgba(0,0,0,0.35); font-size:0.9rem; color: rgba(255,255,255,0.75); line-height:1.5; }
        .hk-earn-level .per b { color:#fff; font-size:1.15rem; display:block; }
        .hk-earn-level p.l { margin: 1rem 0 0; color: rgba(255,255,255,0.6); font-size:0.92rem; line-height:1.55; flex:1; }
        .hk-earn-level button { margin-top: 1.5rem; padding: 0.95rem 1.2rem; border-radius: 12px; border:1px solid rgba(255,255,255,0.25); background: transparent; color:#fff; font-weight:800; font-size:0.95rem; cursor:pointer; }
        .hk-earn-level.best button { background:${GREEN}; border-color:${GREEN}; box-shadow: 0 0 36px rgba(12,176,1,0.35); }
        .hk-earn-calc { max-width: 760px; margin: 3.5rem auto 0; padding: 2.4rem 2rem; border-radius: 24px; border:1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); }
        .hk-earn-calc label { display:block; font-size:0.9rem; color: rgba(255,255,255,0.7); margin-top: 1.4rem; }
        .hk-earn-calc label b { color:#fff; font-size:1.05rem; }
        .hk-earn-calc input[type=range] { width:100%; margin-top: 0.6rem; accent-color: ${GREEN}; }
        .hk-earn-out { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; text-align:center; }
        .hk-earn-out div { padding: 1.2rem 0.6rem; border-radius: 16px; background: rgba(0,0,0,0.35); }
        .hk-earn-out span { display:block; font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color: rgba(255,255,255,0.5); }
        .hk-earn-out strong { display:block; margin-top:0.4rem; font-size:1.7rem; font-weight:800; letter-spacing:-0.03em; }
        .hk-earn-out .best strong { color:${GOLD}; }
        .hk-earn-note { margin: 1.2rem 0 0; text-align:center; font-size:0.82rem; color: rgba(255,255,255,0.45); line-height:1.6; }
        .hk-earn-fine { max-width: 760px; margin: 0 auto; display:grid; grid-template-columns: repeat(2, 1fr); gap: 1rem 2.5rem; }
        .hk-earn-fine p { margin:0; font-size:0.95rem; color: rgba(255,255,255,0.65); line-height:1.6; padding-left: 1.4rem; position:relative; }
        .hk-earn-fine p::before { content:"✓"; position:absolute; left:0; color:${GREEN}; font-weight:800; }
        .hk-earn-cta { text-align:center; padding: 5rem 1.5rem 6rem; background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(12,176,1,0.18), transparent 70%); }
        @media (max-width: 820px) {
          .hk-earn-steps, .hk-earn-levels, .hk-earn-out, .hk-earn-fine { grid-template-columns: 1fr; }
          .hk-earn-levels { gap: 2rem; }
          .hk-earn-sec { padding: 4rem 1.25rem; }
          .hk-earn-hero { padding-top: 3.5rem; }
          .hk-earn-strip img { width: 200px; }
          .hk-earn-calc { padding: 1.8rem 1.25rem; }
        }
      `}</style>

      <div className="hk-earn-top">
        <Link href="/" className="brand">humankind</Link>
        <a href={`${APP}/login`} className="signin">Sign in</a>
      </div>

      <section className="hk-earn-hero">
        <p className="hk-earn-kicker">The humankind affiliate program</p>
        <h1 className="hk-earn-h1">Share humankind.<br />Get paid <b>every month.</b></h1>
        <p className="hk-earn-lead">Your link, your people. Up to half of every membership payment they ever make. Set up in a minute.</p>
        <a className="hk-earn-btn" href="#levels">Pick your level</a>
        <p className="hk-earn-sub">Already a member? <a href={`${APP}/ac/affiliate-program`}>Open your Affiliate tab</a></p>
      </section>

      {shows.length >= 6 ? (
        <div className="hk-earn-stripwrap" aria-hidden="true">
          <div className="hk-earn-strip">
            {[...shows, ...shows].slice(0, 24).map((p, i) => <img key={`${p.id}-${i}`} src={p.still} alt="" loading={i < 6 ? "eager" : "lazy"} />)}
          </div>
        </div>
      ) : null}

      {/* set-up in three steps */}
      <section className="hk-earn-sec">
        <div className="hk-earn-wrap">
          <h2 className="hk-earn-h2">Three steps. One minute.</h2>
          <p className="hk-earn-p">No application, no approval wait, no tracking pixels. Your name is your link.</p>
          <div className="hk-earn-steps">
            <div className="hk-earn-step"><div className="n">01</div><h3>Create your account</h3><p>Free, Online or Full. Any level earns from day one.</p></div>
            <div className="hk-earn-step"><div className="n">02</div><h3>Pick your name</h3><p>Profile → Affiliate. Type a name and your link is live.</p><code>app.humankind.center/go/yourname</code></div>
            <div className="hk-earn-step"><div className="n">03</div><h3>Share it</h3><p>Bio, stories, newsletter, a text. Everyone who joins through it is yours, permanently.</p></div>
          </div>
        </div>
      </section>

      {/* the three levels */}
      <section className="hk-earn-sec" id="levels" style={{ paddingTop: 0 }}>
        <div className="hk-earn-wrap">
          <h2 className="hk-earn-h2">Pick the level you earn from.</h2>
          <p className="hk-earn-p">Your rate follows your own membership. Upgrade any time and your next commissions move up with you.</p>
          <div className="hk-earn-levels">
            {LEVELS.map((l) => (
              <div key={l.key} className={`hk-earn-level${l.key === "full" ? " best" : ""}`}>
                {l.key === "full" ? <span className="badge">Earns the most</span> : null}
                <h3>{l.name}</h3>
                <div className="price">{l.price}</div>
                <div className="rate">{Math.round(l.rate * 100)}%<small>of every payment, {duration(l.months)}</small></div>
                <div className="per"><b>{money(FULL_PRICE * l.rate)} a month</b>per Full Member you bring in<br /><b>{money(ONLINE_PRICE * l.rate)} a month</b>per Online member</div>
                <p className="l">{l.line}</p>
                <button type="button" onClick={() => pick(l)}>{l.cta} →</button>
              </div>
            ))}
          </div>

          {/* the calculator */}
          <div className="hk-earn-calc">
            <h3 style={{ margin: 0, textAlign: "center", fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>What would your audience bring in?</h3>
            <label><b>{full}</b> Full Members join through your link
              <input type="range" min={0} max={100} value={full} onChange={(e) => setFull(Number(e.target.value))} aria-label="Full Members" /></label>
            <label><b>{online}</b> Online members join through your link
              <input type="range" min={0} max={500} step={5} value={online} onChange={(e) => setOnline(Number(e.target.value))} aria-label="Online members" /></label>
            <div className="hk-earn-out">
              {LEVELS.map((l) => { const m = monthly.find((x) => x.key === l.key)!.amount; return (
                <div key={l.key} className={l.key === "full" ? "best" : ""}><span>as a {l.name}</span><strong>{money(Math.round(m))}<small style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>/mo</small></strong></div>
              ); })}
            </div>
            <p className="hk-earn-note">Every month those members pay, for the duration of your level. Your own membership is covered out of it first; the rest is cash.</p>
          </div>
        </div>
      </section>

      {/* the fine print, short */}
      <section className="hk-earn-sec" style={{ paddingTop: 0 }}>
        <div className="hk-earn-fine">
          <p>Paid on every successful payment, monthly or annual, for the duration of your level.</p>
          <p>Your own membership bill is paid first. Two Full referrals and a Full Membership is free.</p>
          <p>Cash out $50 or more to PayPal from your dashboard, any time.</p>
          <p>Referrals stay yours. They have 90 days to go paid; after that they earn for the full duration.</p>
          <p>Bigger audience? Influencer and partner terms by arrangement: <a href="mailto:hello@humankind.center" style={{ color: "#fff" }}>hello@humankind.center</a>.</p>
          <p>The full terms are at <Link href="/affiliate-program" style={{ color: "#fff" }}>humankind.center/affiliate-program</Link>.</p>
        </div>
      </section>

      <section className="hk-earn-cta">
        <h2 className="hk-earn-h2">Start earning this week.</h2>
        <p className="hk-earn-p">Pick a level, pick a name, share the link.</p>
        <button type="button" className="hk-earn-btn" onClick={() => pick(LEVELS[2])}>Start with Full Membership →</button>
        <p className="hk-earn-sub"><a href="#levels">Or start free</a></p>
      </section>

      <HomepageFooter />
    </main>
  );
}
