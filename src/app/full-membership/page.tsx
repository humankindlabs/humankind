// humankind.center/full-membership — straight landing page for the Full
// membership: the humankind overview + mission, what happens here, and the
// online fallback offer at the bottom. Deliberately linear — one story,
// one scroll, two CTAs.
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

const APP_URL = "https://app.humankind.center";

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

export default function FullMembershipPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", overflowX: "hidden" }}>
      <MarketingNav />

      {/* ── Hero: knockout wordmark — a montage of real humankind events
             (concert, sound bath, podcast, show intro, gathering) plays
             INSIDE the letters. Inline SVG mask so the page font applies. ── */}
      <section style={{ padding: "3.5rem 1.5rem 4rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0CB001" }}>
          Full Membership
        </p>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "1.5rem auto 0", overflow: "hidden" }}>
          <video
            autoPlay muted loop playsInline preload="metadata"
            src="https://jikugigedrzlnwbtgxyo.supabase.co/storage/v1/object/public/news/assets/hero-montage.mp4"
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
                {/* overdraw past the viewBox so no video hairline survives at the edges */}
                <rect x="-20" y="-20" width="1320" height="460" fill="#fff" />
                <text
                  x="640" y="210"
                  textAnchor="middle"
                  dominantBaseline="central"
                  textLength="1280"
                  lengthAdjust="spacing"
                  fill="#000"
                  style={{ fontFamily: "var(--font-geist-sans, system-ui, sans-serif)", fontWeight: 800, fontSize: "272px", letterSpacing: "-0.02em" }}
                >
                  humankind
                </text>
              </mask>
            </defs>
            <rect x="-20" y="-20" width="1320" height="460" fill="#00031C" mask="url(#hk-knockout)" />
          </svg>
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>humankind</span>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <h1 style={{ ...heading, fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)", marginTop: "2rem" }}>
            A community for raising human consciousness
          </h1>
          <p style={{ ...body, fontSize: "1.15rem", maxWidth: "640px", margin: "1.25rem auto 0" }}>
            humankind is a place for people to experience this process together — and without judgement.
            A living community in Sedona where consciousness, celebration, and self-governance meet.
          </p>
          <div style={{ marginTop: "2.25rem", display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`${APP_URL}/memberships`} style={ctaBtn}>Become a Full Member</a>
            <a href="#whats-here" style={ghostBtn}>What happens here</a>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h2 style={heading}>The mission</h2>
          <p style={body}>
            Everything at humankind serves one purpose: <strong style={{ color: "#fff" }}>raising people&apos;s
            consciousness</strong>. Not as a slogan — as a daily practice, held in community. Breathwork before
            a dance night. A sound bath after a conference talk. A conversation that goes somewhere real,
            with people who came for the same reason you did.
          </p>
          <p style={body}>
            We practice <strong style={{ color: "#fff" }}>self-governance</strong> — members propose, deliberate,
            and vote on the direction of the community through our own blockchain-anchored governance system.
            This isn&apos;t a venue you visit; it&apos;s a community you help steer.
          </p>
          <p style={body}>
            And Sedona is only the beginning. The vision is <strong style={{ color: "#fff" }}>humankind centers
            around the world</strong> — physical homes for conscious community on every continent, connected by
            one network, one membership, one mission.
          </p>
        </div>
      </section>

      {/* ── What happens here ── */}
      <section id="whats-here" style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{ ...heading, textAlign: "center" }}>What happens at humankind</h2>
          <p style={{ ...body, textAlign: "center", maxWidth: "640px", margin: "1rem auto 0" }}>
            The calendar never sits still — and Full members walk into all of it.
          </p>
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
            ].map(([icon, title, text]) => (
              <div
                key={title as string}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "1.5rem 1.4rem",
                }}
              >
                <div style={{ fontSize: "1.7rem" }}>{icon}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0.7rem 0 0" }}>{title}</h3>
                <p style={{ marginTop: "0.5rem", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full membership ── */}
      <section style={{ padding: "3.5rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={heading}>Full membership: all of it</h2>
          <p style={{ ...body, maxWidth: "620px", margin: "1rem auto 0" }}>
            Full members get access to <strong style={{ color: "#fff" }}>every humankind in-person event</strong> —
            the conferences, the dance nights, the sound baths, the workshops, the comedy, the national
            acts — <strong style={{ color: "#fff" }}>plus all online content</strong>: every live stream and
            every replay, on the web, your phone, and your TV.
          </p>
          <p style={{ ...body, maxWidth: "620px", margin: "1rem auto 0" }}>
            Come as often as you want. Bring your practice. Find your people.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a href={`${APP_URL}/memberships`} style={ctaBtn}>Become a Full Member</a>
          </div>
        </div>
      </section>

      {/* ── Online fallback ── */}
      <section style={{ padding: "3.5rem 1.5rem 5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div
          style={{
            maxWidth: "760px", margin: "0 auto", textAlign: "center",
            background: "rgba(12,176,1,0.05)", border: "1px solid rgba(12,176,1,0.25)",
            borderRadius: "20px", padding: "2.5rem 1.75rem",
          }}
        >
          <h2 style={{ ...heading, fontSize: "1.5rem" }}>Not in Sedona (yet)?</h2>
          <p style={{ ...body, maxWidth: "560px", margin: "0.9rem auto 0" }}>
            If full in-person event access isn&apos;t going to work for you, we have our online access —
            the <strong style={{ color: "#fff" }}>Online membership is $11 a month</strong> for every live
            stream, every replay, and all member-only content, wherever you are.
          </p>
          <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`${APP_URL}/memberships`} style={ctaBtn}>Become an Online Member</a>
            <a href={`${APP_URL}/memberships`} style={ghostBtn}>Become a Full Member</a>
          </div>
        </div>
      </section>

      <HomepageFooter />
    </div>
  );
}
