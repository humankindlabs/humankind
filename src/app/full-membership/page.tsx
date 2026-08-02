// humankind.center/full-membership — Full membership landing page, designed
// on the WebAI template patterns (fly-in reveals, staggered hero image grid,
// showcase strip, testimonials, pricing, platform logo reveal) in humankind's
// skin. All imagery is real event footage/art from the network.
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { Reveal } from "@/components/marketing/reveal";

const APP_URL = "https://app.humankind.center";
const MONTAGE = "https://jikugigedrzlnwbtgxyo.supabase.co/storage/v1/object/public/news/assets/hero-montage.mp4";

// Real event art (our own Vimeo thumbnails)
const IMG_SOUNDBATH = "https://i.vimeocdn.com/video/2176040177-39c36fc9ec29281c073f0e9f10f6d31803cdc0388bdec5df36f1334d2ca261a4-d_1920x1080?&r=pad&region=us";
const IMG_ELEVATE = "https://i.vimeocdn.com/video/2176088108-03fc7bc19257ab7fe901164094ce441275c1e0b695fd97d4a1c75e4207b073eb-d_1920x1080?&r=pad&region=us";
const IMG_HARP = "https://i.vimeocdn.com/video/2173104729-bb61c6e5d6295ea73d9b890c1199cfc1bb7fd9d7914137a32fcab4f0fb2889eb-d_1920x1080?&r=pad&region=us";
const IMG_COSMIC = "https://i.vimeocdn.com/video/2185361102-5d8b621a3cdecc15b538fc60de24bf75da6b94794b3fac6f5e0448303f66458d-d_1920x1080?&r=pad&region=us";
const IMG_UPVIBE = "https://i.vimeocdn.com/video/2184367764-e08de3d7e210dd4ec8c18677727f661ff6c2fb8aa067795c282b4d9d78923c74-d_1920x1080?&r=pad&region=us";
const IMG_HOPE = "https://i.vimeocdn.com/video/2185361502-69897b657379b6c71a6192f08ca88abbfba6c4cd886da0bffda69f1c42c7d4c1-d_1920x1080?&r=pad&region=us";
const IMG_GRAND = "https://i.vimeocdn.com/video/2183193057-02f392e53cb03227f73f00160aec1449d775d9393eb2b6b7de51684d5e80e962-d_1920x1080?&r=pad&region=us";

export const metadata: Metadata = {
  title: "Full Membership — humankind | Sedona's Consciousness Community",
  description:
    "Become a Full member of humankind — every in-person event at Sedona's consciousness community plus all online content. Conferences, ecstatic dance, sound baths, workshops, comedy, and national acts.",
  alternates: { canonical: "https://humankind.center/full-membership" },
};

const heading: React.CSSProperties = {
  fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "#fff",
  margin: 0,
};

const body: React.CSSProperties = {
  marginTop: "1rem",
  fontSize: "1.05rem",
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.72)",
};

const ctaBtn: React.CSSProperties = {
  display: "inline-block",
  background: "#0CB001",
  color: "#fff",
  padding: "0.9rem 2.25rem",
  borderRadius: "99px",
  fontSize: "1rem",
  fontWeight: 700,
  textDecoration: "none",
};

const ghostBtn: React.CSSProperties = {
  display: "inline-block",
  border: "1px solid rgba(255,255,255,0.25)",
  color: "#fff",
  padding: "0.9rem 2.25rem",
  borderRadius: "99px",
  fontSize: "1rem",
  fontWeight: 600,
  textDecoration: "none",
};

const gridImg: React.CSSProperties = {
  width: "233px",
  maxWidth: "100%",
  height: "278px",
  objectFit: "cover",
  borderRadius: "14px",
  display: "block",
};

export default function FullMembershipPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", overflowX: "hidden" }}>
      <MarketingNav />

      {/* ── Knockout hero: montage of real events plays inside the wordmark ── */}
      <section style={{ padding: "2rem 1.5rem 0", textAlign: "center" }}>
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}>
          <video
            autoPlay muted loop playsInline preload="metadata"
            src={MONTAGE}
            style={{ display: "block", width: "100%", height: "100%", aspectRatio: "1280/420", objectFit: "cover" }}
          />
          <svg
            viewBox="0 0 1280 420"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: "absolute", inset: "-1px", width: "calc(100% + 2px)", height: "calc(100% + 2px)" }}
          >
            <defs>
              <mask id="hk-knockout">
                <rect x="-20" y="-20" width="1320" height="460" fill="#fff" />
                <text
                  x="640" y="210"
                  textAnchor="middle"
                  dominantBaseline="central"
                  textLength="1280"
                  lengthAdjust="spacing"
                  fill="#000"
                  style={{ fontFamily: "'Mont', var(--font-geist-sans, system-ui, sans-serif)", fontWeight: 900, fontSize: "262px", letterSpacing: "-0.01em" }}
                >
                  humankind
                </text>
              </mask>
            </defs>
            <rect x="-20" y="-20" width="1320" height="460" fill="#00031C" mask="url(#hk-knockout)" />
          </svg>
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>humankind</span>
        </div>

      </section>

      {/* ── Mission: text left, staggered 4-image grid right (template hero) ── */}
      <section style={{ padding: "3.5rem 1.5rem" }}>
        <div className="hk-fm-hero" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)", gap: "3rem", alignItems: "center" }}>
          <Reveal direction="right">
            <div style={{ display: "flex", gap: "1.1rem", justifyContent: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", paddingTop: "2.5rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_SOUNDBATH} alt="Sound bath at humankind" loading="lazy" style={gridImg} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_HARP} alt="Immersive harp rave" loading="lazy" style={gridImg} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", paddingBottom: "2.5rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_ELEVATE} alt="ELEVATE dance night" loading="lazy" style={gridImg} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_COSMIC} alt="Cosmic-Kind live show" loading="lazy" style={gridImg} />
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <h1 style={{ ...heading, fontSize: "clamp(2rem, 4.4vw, 3.2rem)" }}>
              A community for <span style={{ background: "linear-gradient(90deg, #0CB001, #7fe07a)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>raising human consciousness</span>
            </h1>
            <p style={{ ...body, fontSize: "1.1rem", maxWidth: "560px" }}>
              humankind is a place for people to experience this process together — and without judgement.
              A living community in Sedona where consciousness, celebration, and self-governance meet.
            </p>
            <p style={{ ...body, maxWidth: "560px" }}>
              We practice <strong style={{ color: "#fff" }}>self-governance</strong> — members propose, deliberate,
              and vote on the community&apos;s direction through our own blockchain-anchored governance. And Sedona
              is only the beginning: the vision is <strong style={{ color: "#fff" }}>humankind centers around the
              world</strong>, connected by one network, one membership, one mission.
            </p>
            <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <a href={`${APP_URL}/memberships`} style={ctaBtn}>Become a Full Member</a>
              <a href="#access" style={ghostBtn}>Choose your access ↓</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The Best showcase: video + images strip ── */}
      <section style={{ padding: "3rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal direction="zoom">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "end", justifyContent: "space-between", gap: "1rem", marginBottom: "1.75rem" }}>
              <div>
                <h2 style={heading}>The best of humankind</h2>
                <p style={{ ...body, marginTop: "0.5rem", fontSize: "0.95rem" }}>Real nights, real people — straight from the room.</p>
              </div>
              <a href={`${APP_URL}/media`} style={{ ...ghostBtn, padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}>Watch the network →</a>
            </div>
            <div className="hk-fm-showcase" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", borderRadius: "16px", overflow: "hidden" }}>
              <video autoPlay muted loop playsInline preload="metadata" src={MONTAGE}
                     className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block", gridColumn: "span 2" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_UPVIBE} alt="The Up Vibe podcast" loading="lazy" className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_HOPE} alt="HOPE with TEETH live" loading="lazy" className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_GRAND} alt="Grand Rising gathering" loading="lazy" className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_ELEVATE} alt="Dance night" loading="lazy" className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_SOUNDBATH} alt="Sound healing" loading="lazy" className="hk-fm-shot" style={{ width: "100%", height: "210px", objectFit: "cover", display: "block", gridColumn: "span 2" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── What happens here ── */}
      <section id="whats-here" style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal direction="up">
            <h2 style={{ ...heading, textAlign: "center" }}>What happens at humankind</h2>
            <p style={{ ...body, textAlign: "center", maxWidth: "640px", margin: "1rem auto 0" }}>
              The calendar never sits still — and Full members walk into all of it.
            </p>
          </Reveal>
          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.1rem",
            }}
          >
            {[
              ["🎤", "Conferences", "Transformational gatherings with leading voices in consciousness — multi-day events you'll think about for years."],
              ["💃", "Dance events", "Ecstatic dance and conscious dance nights — Sedona's best floor for moving energy, all ages welcome."],
              ["🎶", "Sound baths", "Immersive sound healing sessions that reset the nervous system and open the room."],
              ["🛠️", "Workshops", "Breathwork, meditation, healing modalities, and hands-on practice with skilled facilitators."],
              ["😂", "Comedy events", "Conscious community laughs hard too — live comedy nights on our stage."],
              ["⭐", "National acts", "National touring acts have played this room — and we're always booking new ones."],
            ].map(([icon, title, text], i) => (
              <Reveal key={title as string} direction="up" delay={i * 90}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "1.5rem 1.4rem",
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: "1.7rem" }}>{icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0.7rem 0 0" }}>{title}</h3>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)" }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Our Members Say ── */}
      <section style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal direction="up">
            <h2 style={{ ...heading, textAlign: "center" }}>What our members say</h2>
          </Reveal>
          <div style={{ marginTop: "2.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.1rem" }}>
            {[
              ["This is the first place where I can be fully myself — no explaining, no judgement. I walked in for a sound bath and found my people.", "Full member · Sedona"],
              ["I'm two hours away, so the live streams are my lifeline. Watching the Thursday shows every week feels like being in the room.", "Online member · Phoenix"],
              ["Every week there's something that stretches me — breathwork one night, a national act the next. My membership pays for itself twice over.", "Full member · Verde Valley"],
            ].map(([quote, who], i) => (
              <Reveal key={who as string} direction="up" delay={i * 110}>
                <figure style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.6rem 1.5rem", margin: 0, height: "100%" }}>
                  <div style={{ color: "#0CB001", fontSize: "1.3rem", lineHeight: 1 }}>★★★★★</div>
                  <blockquote style={{ margin: "0.9rem 0 0", fontSize: "0.98rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)" }}>
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption style={{ marginTop: "1rem", fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>{who}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose your access level ── */}
      <section id="access" style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <Reveal direction="up">
            <h2 style={{ ...heading, textAlign: "center" }}>Choose your access level</h2>
            <p style={{ ...body, textAlign: "center", maxWidth: "560px", margin: "1rem auto 0" }}>
              Two ways in — in the room, or on every screen you own.
            </p>
          </Reveal>
          <div style={{ marginTop: "2.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", alignItems: "stretch" }}>
            <Reveal direction="right">
              <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "2rem 1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>Online</p>
                <p style={{ margin: "0.75rem 0 0", fontSize: "2.4rem", fontWeight: 800, color: "#fff" }}>$11<span style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}> / month</span></p>
                <ul style={{ margin: "1.25rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)" }}>
                  <li>✓ Every live stream, live</li>
                  <li>✓ Full replay + series library</li>
                  <li>✓ Member-only content</li>
                  <li>✓ Watch on web, phone, and TV</li>
                </ul>
                <p style={{ ...body, fontSize: "0.85rem", marginTop: "1rem", color: "rgba(255,255,255,0.5)" }}>
                  If full in-person access isn&apos;t going to work for you, this is your seat in the room — from anywhere.
                </p>
                <div style={{ marginTop: "auto", paddingTop: "1.25rem" }}>
                  <a href={`${APP_URL}/memberships`} style={{ ...ghostBtn, display: "block", textAlign: "center" }}>Become an Online Member</a>
                </div>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div style={{ border: "1px solid rgba(12,176,1,0.5)", background: "rgba(12,176,1,0.06)", borderRadius: "20px", padding: "2rem 1.75rem", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                <span style={{ position: "absolute", top: "-0.8rem", right: "1.5rem", background: "#0CB001", color: "#fff", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0.3rem 0.9rem", borderRadius: "99px" }}>Most complete</span>
                <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0CB001" }}>Full</p>
                <p style={{ margin: "0.75rem 0 0", fontSize: "2.4rem", fontWeight: 800, color: "#fff" }}>$77<span style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}> / month</span></p>
                <ul style={{ margin: "1.25rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)" }}>
                  <li>✓ Every humankind in-person event</li>
                  <li>✓ Conferences, dance nights, sound baths, comedy, national acts</li>
                  <li>✓ Everything in Online included</li>
                  <li>✓ A voice in community governance</li>
                </ul>
                <div style={{ marginTop: "auto", paddingTop: "1.25rem" }}>
                  <a href={`${APP_URL}/memberships`} style={{ ...ctaBtn, display: "block", textAlign: "center" }}>Become a Full Member</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Always on. Always streaming. + platform logo reveal ── */}
      <section style={{ padding: "3.5rem 1.5rem 5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="up">
            <h2 style={heading}>Always on. Always streaming.</h2>
            <p style={{ ...body, maxWidth: "560px", margin: "1rem auto 0" }}>
              The humankind network lives on every screen in your house.
            </p>
          </Reveal>
          <Reveal direction="zoom" delay={150}>
            <div style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              {["Roku", "Fire TV", "Google TV", "Google Play", "iOS & Web"].map((p) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 1.9rem", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "1.05rem", fontWeight: 800, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#0CB001", display: "inline-block" }} />
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hk-fm-hero { grid-template-columns: 1fr !important; }
          .hk-fm-showcase { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <HomepageFooter />
    </div>
  );
}
