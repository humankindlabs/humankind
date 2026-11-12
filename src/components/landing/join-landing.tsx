"use client";
// src/components/landing/join-landing.tsx — the /join ad landing page (see app/join/page.tsx).

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { trackEvent } from "@/lib/analytics/client";

const APP = "https://app.humankind.center";
const GREEN = "#0CB001";

export type Poster = { id: string; title: string; still: string };
export type Room = { key: string; title: string; question: string; body: string; step: { label: string; href: string; line: string } };

const PLANS = [
  { tier: "free", title: "Free", price: "$0", per: "", line: "Join the community and start watching.", features: ["Free replays and public live streams", "Profile, messages and Ask humankind", "Your wallet and the card on every event ticket", "Your own link: earn 20% on members you bring"] },
  { tier: "online", title: "Online Access", price: "$11", per: "/month", year: "or $111 a year", line: "Everything, from anywhere in the world.", popular: true, features: ["Every livestream and the full replay library", "Member-only streams and live chat", "Watch on Fire TV, Google TV and Roku", "Earn 35% for 12 months"] },
  { tier: "full", title: "Full Membership", price: "$77", per: "/month", line: "Our in-person community in Sedona, plus everything online.", features: ["In-person access to events at the Sedona venue", "A vote in community decisions", "Stay: 7% off and no service fee", "Earn 50% for life"] },
];

const MOVEMENT = [
  { word: "Mind", line: "Real-world information from people who have lived it. Disclosure, health, consciousness, Human Design, the future of money and technology. Live, every week." },
  { word: "Body", line: "Dance, breathwork, sound, ceremony and music at the center in Sedona, and a place to stay when you come. Awakening is lived through the body, not only read about." },
  { word: "Soul", line: "A community that decides together, builds together and shares what it earns. Departments, governance, your own link and your own wallet. Nobody owns you here." },
];

/** the app link with this page's utm tags carried along (the forwarder does the same for plain links) */
function appLink(path: string, extra: Record<string, string> = {}): string {
  const url = new URL(path, APP);
  try {
    const here = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "aff", "promo"]) {
      const v = here.get(k);
      if (v) url.searchParams.set(k, v.slice(0, 120));
    }
  } catch { /* server */ }
  for (const [k, v] of Object.entries(extra)) url.searchParams.set(k, v);
  return url.toString();
}

function EmailStart({ where }: { where: string }) {
  const [email, setEmail] = useState("");
  const go = (e: FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    void trackEvent("landing.start", "marketing", { landing_page: "join", where, has_email: Boolean(clean) }, "humankind.center");
    window.location.href = appLink("/register", { tier: "free", ...(clean ? { email: clean } : {}) });
  };
  return (
    <form className="hk-join-form" onSubmit={go}>
      <input type="email" inputMode="email" autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
      <button type="submit">Get started</button>
    </form>
  );
}

export function JoinLanding({ posters, counts, rooms }: { posters: Poster[]; counts: { members: number; replays: number; departments: number }; rooms: Room[] }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    void trackEvent("landing.page_view", "marketing", {
      landing_page: "join", path: window.location.pathname, url: window.location.href, referrer: document.referrer || null,
      utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"),
    }, "humankind.center");
  }, []);

  const wall = posters.length ? posters : [];
  const rows = [wall.slice(0, 8), wall.slice(8, 16), wall.slice(16, 24)].filter((r) => r.length);
  const n = (x: number) => x.toLocaleString("en-US");

  return (
    <main className="hk-join">
      <style>{`
        .hk-join { background:#00031C; color:#fff; min-height:100dvh; overflow-x:hidden; font-family: var(--font-geist-sans, system-ui, sans-serif); }
        .hk-join-top { position:absolute; top:0; left:0; right:0; z-index:5; display:flex; align-items:center; justify-content:space-between; padding:1rem 1.25rem; }
        .hk-join-top a { color:#fff; text-decoration:none; }
        .hk-join-top .brand { font-size:1.35rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-join-top .signin { font-size:0.85rem; font-weight:600; padding:0.5rem 1rem; border:1px solid rgba(255,255,255,0.25); border-radius:999px; }
        .hk-join-hero { position:relative; min-height:100dvh; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; text-align:center; padding: 0 1.25rem 3.5rem; overflow:hidden; }
        .hk-join-wall { position:absolute; inset:0; display:flex; flex-direction:column; gap:10px; padding-top:1rem; transform: rotate(-4deg) scale(1.15); opacity:0.55; pointer-events:none; }
        .hk-join-row { display:flex; gap:10px; width:max-content; animation: hk-join-drift 60s linear infinite; }
        .hk-join-row:nth-child(2) { animation-duration: 75s; animation-direction: reverse; }
        .hk-join-row:nth-child(3) { animation-duration: 90s; }
        .hk-join-row img { width: 220px; aspect-ratio:16/9; object-fit:cover; border-radius:10px; flex:none; background:#0d1117; }
        @keyframes hk-join-drift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .hk-join-fade { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,3,28,0.3) 0%, rgba(0,3,28,0.72) 38%, #00031C 74%); }
        .hk-join-copy { position:relative; z-index:2; max-width: 680px; }
        .hk-join-kicker { font-size:0.78rem; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:${GREEN}; margin:0 0 0.9rem; }
        .hk-join-h1 { font-size: clamp(2.2rem, 7vw, 4.2rem); font-weight:800; letter-spacing:-0.03em; line-height:1.0; margin:0; }
        .hk-join-mbs { margin: 0.9rem 0 0; font-size: clamp(1rem, 2.4vw, 1.3rem); font-weight:700; color:#76ff7a; letter-spacing: 0.22em; text-transform: uppercase; }
        .hk-join-lede { margin: 1.1rem auto 0; max-width: 560px; color: rgba(255,255,255,0.72); font-size: clamp(0.98rem, 1.6vw, 1.12rem); line-height:1.65; }
        .hk-join-form { display:flex; gap:0.6rem; width:100%; max-width:520px; margin: 1.6rem auto 0; }
        .hk-join-form input { flex:1; min-width:0; padding: 0.95rem 1.1rem; border-radius: 12px; border:1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.45); color:#fff; font-size:1rem; }
        .hk-join-form input::placeholder { color: rgba(255,255,255,0.45); }
        .hk-join-form button { padding: 0.95rem 1.5rem; border-radius: 12px; border:0; background:${GREEN}; color:#fff; font-weight:800; font-size:1rem; cursor:pointer; white-space:nowrap; box-shadow: 0 0 36px rgba(12,176,1,0.35); }
        .hk-join-sub { margin: 0.8rem 0 0; font-size:0.82rem; color: rgba(255,255,255,0.5); }
        .hk-join-sub a { color: rgba(255,255,255,0.75); }
        .hk-join-proof { display:flex; gap:1.6rem; justify-content:center; margin: 1.6rem 0 0; flex-wrap:wrap; }
        .hk-join-proof div { text-align:center; }
        .hk-join-proof strong { display:block; font-size:1.4rem; font-weight:800; letter-spacing:-0.02em; }
        .hk-join-proof span { font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase; color: rgba(255,255,255,0.5); }
        .hk-join-sec { padding: 4.5rem 1.25rem; }
        .hk-join-wrap { max-width: 1040px; margin: 0 auto; }
        .hk-join-h2 { font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight:800; letter-spacing:-0.025em; line-height:1.1; margin:0; text-align:center; }
        .hk-join-p { text-align:center; max-width: 620px; margin: 0.9rem auto 0; color: rgba(255,255,255,0.6); line-height:1.7; }
        .hk-join-rooms { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.9rem; margin-top: 2.4rem; }
        .hk-join-room { padding: 1.3rem 1.25rem; border-radius: 16px; border:1px solid rgba(255,255,255,0.09); background: rgba(255,255,255,0.025); display:flex; flex-direction:column; }
        .hk-join-room .t { font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:${GREEN}; }
        .hk-join-room h3 { margin: 0.45rem 0 0; font-size:1.15rem; font-weight:800; letter-spacing:-0.02em; line-height:1.2; }
        .hk-join-room p { margin: 0.6rem 0 0; color: rgba(255,255,255,0.6); font-size:0.93rem; line-height:1.65; flex:1; }
        .hk-join-plans { display:grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 1rem; margin-top: 2.4rem; align-items:stretch; }
        .hk-join-plan { position:relative; padding: 1.6rem 1.4rem; border-radius: 18px; border:1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.025); display:flex; flex-direction:column; }
        .hk-join-plan.pop { border-color: ${GREEN}; background: rgba(12,176,1,0.07); box-shadow: 0 0 60px rgba(12,176,1,0.12); }
        .hk-join-plan .badge { position:absolute; top:-0.8rem; left:1.4rem; padding:0.3rem 0.8rem; border-radius:999px; background:${GREEN}; color:#fff; font-size:0.72rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; }
        .hk-join-plan h3 { margin:0; font-size:1.05rem; font-weight:700; color: rgba(255,255,255,0.8); }
        .hk-join-plan .price { margin: 0.5rem 0 0; font-size:2.4rem; font-weight:800; letter-spacing:-0.03em; line-height:1; }
        .hk-join-plan .price small { font-size:1rem; font-weight:600; color: rgba(255,255,255,0.55); letter-spacing:0; }
        .hk-join-plan .year { margin: 0.3rem 0 0; font-size:0.82rem; color:#76ff7a; font-weight:600; }
        .hk-join-plan .line { margin: 0.8rem 0 0; color: rgba(255,255,255,0.6); font-size:0.92rem; line-height:1.55; }
        .hk-join-plan ul { list-style:none; padding:0; margin: 1.1rem 0 1.4rem; display:flex; flex-direction:column; gap:0.5rem; flex:1; }
        .hk-join-plan li { display:flex; gap:0.6rem; font-size:0.9rem; color: rgba(255,255,255,0.75); line-height:1.5; }
        .hk-join-plan li::before { content:"✓"; color:${GREEN}; font-weight:800; flex:none; }
        .hk-join-plan a { display:block; text-align:center; padding: 0.85rem 1rem; border-radius: 999px; font-weight:800; text-decoration:none; color:#fff; border:1px solid rgba(255,255,255,0.25); }
        .hk-join-plan.pop a { background:${GREEN}; border-color:${GREEN}; }
        .hk-join-mbs3 { display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; margin-top: 2.4rem; }
        .hk-join-mbs3 div { padding: 1.6rem 1.4rem; border-radius: 18px; background: linear-gradient(180deg, rgba(12,176,1,0.10), rgba(12,176,1,0.02)); border:1px solid rgba(12,176,1,0.22); }
        .hk-join-mbs3 h3 { margin:0; font-size:1.9rem; font-weight:800; letter-spacing:-0.03em; color:#fff; }
        .hk-join-mbs3 p { margin: 0.7rem 0 0; color: rgba(255,255,255,0.65); line-height:1.7; font-size:0.95rem; }
        .hk-join-lib { display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap:0.7rem; margin-top: 2rem; }
        .hk-join-lib img { width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:10px; background:#0d1117; }
        .hk-join-cta { text-align:center; padding: 4rem 1.25rem 5rem; background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(12,176,1,0.18), transparent 70%); }
        .hk-join-btn { display:inline-block; margin-top:1.4rem; padding: 1rem 2.4rem; border-radius:999px; background:${GREEN}; color:#fff; font-weight:800; text-decoration:none; font-size:1.05rem; box-shadow: 0 0 40px rgba(12,176,1,0.4); }
        @media (max-width: 560px) {
          .hk-join-form { flex-direction:column; }
          .hk-join-row img { width: 150px; }
          .hk-join-hero { padding-bottom: 2.5rem; }
          .hk-join-sec { padding: 3.2rem 1rem; }
        }
      `}</style>

      <div className="hk-join-top">
        <Link href="/" className="brand">humankind</Link>
        <a href={`${APP}/login`} className="signin">Sign in</a>
      </div>

      {/* hero over the wall of our own shows */}
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
          <p className="hk-join-lede">
            Live shows every week, a community that decides together, a place in Sedona to come to, and a movement you can be part of from anywhere. Start free.
          </p>
          <EmailStart where="hero" />
          <p className="hk-join-sub">Free to join. No card. Cancel a paid plan any time. Already a member? <a href={`${APP}/login`}>Sign in</a></p>
          {counts.members > 0 ? (
            <div className="hk-join-proof">
              <div><strong>{n(counts.members)}</strong><span>members</span></div>
              <div><strong>{n(counts.replays)}</strong><span>shows to watch</span></div>
              <div><strong>live</strong><span>every week</span></div>
            </div>
          ) : null}
        </div>
      </section>

      {/* what humankind offers: the seven rooms */}
      {rooms.length ? (
        <section className="hk-join-sec">
          <div className="hk-join-wrap">
            <p className="hk-join-kicker" style={{ textAlign: "center" }}>What humankind offers</p>
            <h2 className="hk-join-h2">More than a platform. Seven rooms of one life.</h2>
            <p className="hk-join-p">Each room answers a question you already have. Everything we build fits in one of them.</p>
            <div className="hk-join-rooms">
              {rooms.map((r) => (
                <div key={r.key} className="hk-join-room">
                  <span className="t">{r.title}</span>
                  <h3>{r.question}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
            <p className="hk-join-p" style={{ marginTop: "1.6rem" }}><Link href="/how-it-works" style={{ color: GREEN, fontWeight: 700, textDecoration: "none" }}>How humankind works, room by room →</Link></p>
          </div>
        </section>
      ) : null}

      {/* the movement */}
      <section className="hk-join-sec" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="hk-join-wrap">
          <p className="hk-join-kicker" style={{ textAlign: "center" }}>A movement, not a product</p>
          <h2 className="hk-join-h2">As the world changes, we work on ourselves,<br />and we work together.</h2>
          <p className="hk-join-p">humankind is a lifestyle. Not one path or one belief, but a way of living that takes the mind, the body and the soul seriously, with people who are doing the same.</p>
          <div className="hk-join-mbs3">
            {MOVEMENT.map((m) => (
              <div key={m.word}><h3>{m.word}</h3><p>{m.line}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* plans */}
      <section className="hk-join-sec" id="plans">
        <div className="hk-join-wrap">
          <p className="hk-join-kicker" style={{ textAlign: "center" }}>Choose your plan</p>
          <h2 className="hk-join-h2">Start free. Go further when you are ready.</h2>
          <p className="hk-join-p">Your membership is what keeps the shows live, the room in Sedona open and the community independent.</p>
          <div className="hk-join-plans">
            {PLANS.map((p) => (
              <div key={p.tier} className={`hk-join-plan${p.popular ? " pop" : ""}`}>
                {p.popular ? <span className="badge">Most popular</span> : null}
                <h3>{p.title}</h3>
                <p className="price">{p.price}<small>{p.per}</small></p>
                {p.year ? <p className="year">{p.year}</p> : null}
                <p className="line">{p.line}</p>
                <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href={`${APP}/register?tier=${p.tier}`} onClick={(e) => { e.preventDefault(); void trackEvent("landing.plan", "marketing", { landing_page: "join", tier: p.tier }, "humankind.center"); window.location.href = appLink("/register", { tier: p.tier }); }}>
                  {p.tier === "free" ? "Join free" : `Choose ${p.title}`}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the library */}
      {wall.length >= 6 ? (
        <section className="hk-join-sec" style={{ paddingTop: 0 }}>
          <div className="hk-join-wrap">
            <p className="hk-join-kicker" style={{ textAlign: "center" }}>The library</p>
            <h2 className="hk-join-h2">New shows every week, from the room in Sedona.</h2>
            <p className="hk-join-p">Replays of every live show, on your phone, the web and your TV. Free members watch the free ones; Online Access opens everything.</p>
            <div className="hk-join-lib">
              {wall.slice(0, 12).map((p) => <img key={p.id} src={p.still} alt={p.title} loading="lazy" title={p.title} />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="hk-join-cta">
        <h2 className="hk-join-h2">Join the movement.</h2>
        <p className="hk-join-p">It takes a minute. Over your first two weeks we show you one room at a time.</p>
        <div style={{ maxWidth: 520, margin: "0 auto" }}><EmailStart where="bottom" /></div>
      </section>

      <HomepageFooter />
    </main>
  );
}
