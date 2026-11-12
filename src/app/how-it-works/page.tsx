// src/app/how-it-works/page.tsx
//
// How humankind works: the seven rooms, one question each (John 11/12: "humankind is more than just a platform,
// it is a lifestyle"). The words come from the app (its lib/lifestyle/rooms.ts, read through
// /api/public/lifestyle, the one place); FALLBACK is a copy for when the app cannot be reached.
import type { Metadata } from "next";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { MarketingNav } from "@/components/marketing/marketing-nav";

const APP = "https://app.humankind.center";
const GREEN = "#0CB001";

type Room = {
  key: string;
  title: string;
  question: string;
  body: string;
  step: { label: string; href: string; line: string };
  video: { url: string; still: string } | null;
};

const FALLBACK_PROMISE = "humankind is a lifestyle: as the world changes we work on ourselves, and we work together.";

const FALLBACK: Room[] = [
  { key: "media", title: "Media", question: "What's true, and who do I learn it from?", body: "Live shows every week from the room in Sedona, and a library of replays you can watch on your phone, the web or your TV. Real-world information from people who have lived it: disclosure, health, consciousness, Human Design, crypto, the future of technology. Not one path, many voices, and you decide what lands.", step: { label: "See what's on this week", href: `${APP}/media`, line: "Open the live guide and pick one show to watch this week." }, video: null },
  { key: "departments", title: "Departments", question: "Where do I belong and build?", body: "A department is a live-stream community around one subject: it has its own show, its own posts and reels, and the people who care about that subject. Departments are how humankind builds structure without a hierarchy. Follow the ones that fit you, and what they do lands in your feed.", step: { label: "Browse the departments", href: `${APP}/departments`, line: "Follow two departments. Their shows and posts start reaching you." }, video: null },
  { key: "social", title: "Social", question: "Who do I know here?", body: "Your profile, your feed, messages and comments. Follow the people you meet at the center or in the chat of a live show, and keep the conversation going after the stream ends. Your departments feed you what they are doing; your bell tells you when someone answers you. This room is still being built, and it grows with the people in it.", step: { label: "Open your profile", href: `${APP}/human`, line: "Put a picture on your profile and follow three people you have met." }, video: null },
  { key: "gov", title: "Gov", question: "How do we decide together?", body: "Decisions about the community are made by the community. A proposal is written down and anchored on the Hedera ledger, members vote with their own anonymous Humankind key, and the result is public and cannot be edited after the fact. It is how we communicate on the decisions that affect all of us.", step: { label: "See the proposals", href: `${APP}/gov`, line: "Read the open proposals and cast one vote." }, video: null },
  { key: "wallet", title: "Wallet", question: "Where are my things safe?", body: "A secure place of your own: a vault for files and records, the collectable card that comes with every event ticket, and assets you hold and manage yourself. Nobody at humankind can move what is in it. You can also pay for your membership from it in crypto.", step: { label: "Set up your wallet", href: "https://wallet.humankind.center/", line: "Set up your wallet once. Your next ticket's card lands in it." }, video: null },
  { key: "stay", title: "Stay", question: "Where do I sleep when I come?", body: "Places to stay in Sedona from members and hosts, for when you come to an event, a weekend or a season. Full members get 7% off and pay no service fee. Hosts are part of the community, so you arrive among people, not into a hotel.", step: { label: "Browse stays", href: "https://stay.humankind.center/", line: "Pick an event on the calendar and look at the stays around it." }, video: null },
  { key: "earn", title: "Earn", question: "How does being here pay me back?", body: "Every member has a link. Each person who joins through it earns you a share of their membership, which pays your own bill first and then pays you. The cards that come with tickets can be traded with other members. Being part of humankind is not only something you pay for; it is something you can be paid for.", step: { label: "Get your link", href: `${APP}/ac/affiliate-program`, line: "Copy your link and send it to one friend who would like it here." }, video: null },
];

export const metadata: Metadata = {
  title: "How humankind works — more than a platform, a lifestyle",
  description: FALLBACK_PROMISE,
};

async function getRooms(): Promise<{ promise: string; rooms: Room[] }> {
  try {
    const res = await fetch(`${APP}/api/public/lifestyle`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.rooms) && data.rooms.length) return { promise: data.promise || FALLBACK_PROMISE, rooms: data.rooms };
  } catch (err) {
    console.warn("[how-it-works] failed to load the rooms from the app:", err);
  }
  return { promise: FALLBACK_PROMISE, rooms: FALLBACK };
}

export default async function HowItWorksPage() {
  const { promise, rooms } = await getRooms();

  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)", overflowX: "hidden" }}>
      <style>{`
        .hk-how-wrap { max-width: 780px; margin: 0 auto; padding: 5rem 1.5rem 6rem; }
        .hk-how-room { display:grid; grid-template-columns: 56px 1fr; gap: 1rem; padding: 2.25rem 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .hk-how-num { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: ${GREEN}; padding-top: 0.5rem; }
        .hk-how-q { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; color: #fff; margin: 0; }
        .hk-how-title { display:inline-block; margin-top: 0.6rem; padding: 0.2rem 0.7rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${GREEN}; background: rgba(12,176,1,0.12); }
        .hk-how-body { margin: 1rem 0 0; font-size: 1.0625rem; line-height: 1.8; color: rgba(255,255,255,0.58); }
        .hk-how-step { margin-top: 1.1rem; padding: 0.9rem 1.1rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:space-between; gap: 1rem; flex-wrap: wrap; }
        .hk-how-step p { margin:0; font-size: 0.93rem; color: rgba(255,255,255,0.85); }
        .hk-how-step a { font-size: 0.88rem; font-weight: 700; color: ${GREEN}; text-decoration: none; white-space: nowrap; }
        .hk-how-video { margin-top: 1rem; display:block; border-radius: 14px; overflow:hidden; border: 1px solid rgba(255,255,255,0.1); }
        .hk-how-video img { display:block; width:100%; aspect-ratio: 16/9; object-fit: cover; }
        @media (max-width: 520px) {
          .hk-how-wrap { padding: 3rem 1rem 4rem; }
          .hk-how-room { grid-template-columns: 1fr; gap: 0.4rem; padding: 1.75rem 0; }
          .hk-how-q { font-size: 1.35rem; }
        }
      `}</style>

      <MarketingNav />

      <div className="hk-how-wrap">
        <p className="hk-eyebrow" style={{ color: GREEN, margin: 0 }}>How humankind works</p>
        <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0.75rem 0 0", color: "#fff" }}>
          More than a platform.<br />A lifestyle.
        </h1>
        <p style={{ marginTop: "1.25rem", fontSize: "1.125rem", lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
          {promise} Everything here is one of seven rooms, and each room answers a question you already have.
        </p>

        <div style={{ marginTop: "3rem" }}>
          {rooms.map((r, i) => (
            <section key={r.key} id={r.key} className="hk-how-room">
              <div className="hk-how-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h2 className="hk-how-q">{r.question}</h2>
                <span className="hk-how-title">{r.title}</span>
                <p className="hk-how-body">{r.body}</p>
                {r.video ? (
                  <a className="hk-how-video" href={r.video.url} target="_blank" rel="noopener noreferrer">
                    <img src={r.video.still} alt={`${r.title}: John in 60 seconds`} />
                  </a>
                ) : null}
                <div className="hk-how-step">
                  <p>{r.step.line}</p>
                  <a href={r.step.href}>{r.step.label} →</a>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: "3.5rem", padding: "2.5rem 1.5rem", borderRadius: "1.5rem", border: "1px solid rgba(12,176,1,0.3)", background: "rgba(12,176,1,0.06)", textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>Start with a free account.</p>
          <p style={{ margin: "0.6rem 0 1.5rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            It takes a minute. Over your first two weeks we send one email per room, with one thing to do in each.
          </p>
          <Link href={`${APP}/signup`} style={{ display: "inline-flex", alignItems: "center", background: GREEN, color: "#fff", padding: "0.9375rem 2.5rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 40px rgba(12,176,1,0.4)" }}>
            Join humankind →
          </Link>
        </div>
      </div>

      <HomepageFooter />
    </div>
  );
}
