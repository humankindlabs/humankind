// src/app/what-is-humankind/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "What Is Humankind? — Conscious Community in Sedona",
  description: "Humankind is a living platform for consciousness, education, and community — a physical venue in Sedona, Arizona and a global digital media ecosystem.",
};

const MARQUEE = ["Education", "Embodied Experience", "Community & Culture", "Consciousness", "Sedona", "Sovereignty"];

const PILLARS = [
  {
    eyebrow: "Pillar 01",
    title: "Education & Awareness",
    intro: "We provide access to knowledge, insight, and lived experience that empower individuals to think critically, feel deeply, and act consciously.",
    bullets: [
      "Disclosure & expanded awareness",
      "Personal sovereignty & consciousness education",
      "AI, crypto, and future technologies",
      "Human Design & self-mastery systems",
      "Health, chakra systems, and embodied intelligence",
    ],
    outro: "Our educational offerings come through talks, workshops, panels, conferences, and media — bridging inner development with outer-world understanding.",
    image: "/what-is-humankind/education-awareness.jpg",
    imageRight: false,
  },
  {
    eyebrow: "Pillar 02",
    title: "Embodied Experience",
    intro: "Awakening is not just intellectual — it is lived through the body. Humankind offers immersive experiences that support nervous system regulation, creative expression, and embodied presence, including:",
    bullets: [
      "Yoga & meditation",
      "Dance & music experiences",
      "Sound healing & ritual",
      "Fitness of life practices that integrate body, mind, and spirit",
    ],
    outro: "These experiences help participants move from information into integration — where insight becomes lived wisdom.",
    image: "/what-is-humankind/embodied-experience.jpg",
    imageRight: true,
  },
  {
    eyebrow: "Pillar 03",
    title: "Community & Culture",
    intro: "Humankind is a meeting ground for local and global voices — artists, educators, seekers, innovators, and community builders. Through:",
    bullets: [
      "Live events, retreats, and conferences",
      "Ongoing classes and gatherings",
      "Livestreams, shows, and podcasts",
      "Media that reflects what's actually happening now",
    ],
    outro: "We cultivate a culture of authenticity, curiosity, respect, and connection — where people are encouraged to engage with the world consciously and collaboratively.",
    image: "/what-is-humankind/community-culture.jpg",
    imageRight: false,
  },
];

export default function WhatIsHumankindPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)", overflowX: "hidden" }}>

      <MarketingNav />

      {/* ── Hero ── */}
      <div style={{ position: "relative", background: "#00031C", paddingTop: "5rem", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(12,176,1,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "90px", right: "8%", width: "18px", height: "18px", background: "rgba(12,176,1,0.3)", borderRadius: "4px", transform: "rotate(45deg)", animation: "hk-spin-slow 12s linear infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "80px", left: "7%", width: "12px", height: "12px", borderRadius: "50%", background: "rgba(12,176,1,0.35)", animation: "hk-blink 2.5s infinite" }} />

        <div style={{ position: "relative", zIndex: 1, margin: "0 2rem 3rem", borderRadius: "1.5rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "hk-float-in 0.9s cubic-bezier(0.22,1,0.36,1) forwards", opacity: 0, minHeight: "480px" }}>
          <img src="/what-is-humankind/header.jpg" alt="What Is Humankind" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.68)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(12,176,1,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "480px", padding: "5rem 2rem", textAlign: "center" }}>
            <span style={{ display: "inline-block", padding: "0.375rem 1rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", marginBottom: "1.5rem" }}>
              Consciousness · Education · Community
            </span>
            <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1.25rem", maxWidth: "800px" }}>
              What Is Humankind?
            </h1>
            <p style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "640px", marginBottom: "2.5rem" }}>
              At its heart, Humankind supports personal sovereignty, collective awakening, and real-world connection. Through events, conversations, and shared experiences, we create opportunities for growth, discovery, and community.
            </p>
            <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", background: "#0CB001", color: "#fff", padding: "0.9375rem 2.5rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 40px rgba(12,176,1,0.4)" }}>
              Become a Member →
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ background: "rgba(0,3,28,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "1.25rem 0" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", width: "max-content", animation: "hk-marquee-seamless 22s linear infinite", willChange: "transform" }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 800, color: "rgba(255,255,255,0.1)", fontFamily: "var(--hk-font-brand)", letterSpacing: "-0.02em", padding: "0 2rem", whiteSpace: "nowrap" }}>
                {item}<span style={{ color: "rgba(12,176,1,0.25)", marginLeft: "2rem" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>A Living Platform</p>
          <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.5rem", color: "#fff" }}>
            A Living Platform for Consciousness,<br />Education & Community
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            Humankind is a living platform for consciousness, education, and community. We exist as both a <strong style={{ color: "#fff" }}>physical venue in Sedona, Arizona</strong> and a <strong style={{ color: "#fff" }}>digital media ecosystem</strong>, designed to support personal sovereignty, collective awakening, and real-world connection.
          </p>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
            As the world rapidly changes, Humankind serves as a grounding point — where ancient wisdom, modern insight, embodied practice, and future-focused conversations converge. We are not here to offer one path, one belief system, or one experience. We are here to hold space for many.
          </p>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
            Humankind is a container for exploration, learning, expression, and integration — bringing people together across disciplines, cultures, and perspectives to remember what it means to be fully human.
          </p>
        </div>
      </section>

      {/* Three Pillars — FeatureSplit 40/60 */}
      <section style={{ padding: "2rem 2rem 6rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", padding: "4rem 0 5rem" }}>
            <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>The Three Pillars</p>
            <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Humankind is not one thing.<br />It is a container built upon three core pillars.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            {PILLARS.map((row, i) => (
              <div key={i} className="hk-pillar-row">

                {/* Image — 40% on desktop, square on mobile, tall on desktop */}
                <div className="hk-pillar-image" style={{ order: row.imageRight ? 2 : 1 }}>
                  <div style={{ borderRadius: "1.5rem", overflow: "hidden", position: "relative" }}>
                    <img
                      src={row.image}
                      alt={row.title}
                      className="hk-pillar-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.2)", borderRadius: "1.5rem" }} />
                  </div>
                  <div style={{ position: "absolute", inset: "-16px", borderRadius: "2rem", background: "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)", zIndex: -1, filter: "blur(20px)" }} />
                </div>

                {/* Content — 60% on desktop */}
                <div className="hk-pillar-content" style={{ order: row.imageRight ? 1 : 2 }}>
                  <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0CB001", background: "rgba(12,176,1,0.1)", marginBottom: "1rem" }}>
                    {row.eyebrow}
                  </span>
                  <h2 style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
                    {row.title}
                  </h2>
                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                    {row.intro}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {row.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", alignItems: "flex-start" }}>
                        <span style={{ color: "#0CB001", flexShrink: 0, marginTop: "0.125rem" }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontStyle: "italic" }}>
                    {row.outro}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Humankind 3.0 */}
      <section style={{ padding: "6rem 2rem", background: "rgba(12,176,1,0.04)", borderTop: "1px solid rgba(12,176,1,0.1)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Humankind 3.0</p>
            <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Sovereignty & Integration
            </h2>
          </div>

          <div className="hk-30-grid">
            <div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Humankind 3.0 reflects a cultural and conscious shift already underway — away from external authority and fragmented systems, and toward embodied awareness, nervous system regulation, and personal sovereignty.
              </p>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                This transition emphasizes:
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {[
                  "Inner authority over imposed structures",
                  "Embodied consciousness, not belief alone",
                  "Conscious use of technology and media",
                  "Decentralized systems for communication, value, and governance",
                  "Community over hierarchy",
                  "Integration of science and spirituality",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.75rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", alignItems: "flex-start" }}>
                    <span style={{ color: "#0CB001", flexShrink: 0, marginTop: "0.125rem" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Humankind exists to support individuals and communities through this evolutionary moment — offering education, experience, and connection that help people live with greater clarity, coherence, and responsibility.
              </p>
              <p style={{ fontSize: "1.0625rem", fontStyle: "italic", color: "rgba(255,255,255,0.4)", borderLeft: "2px solid rgba(12,176,1,0.3)", paddingLeft: "1.25rem", lineHeight: 1.7 }}>
                "Who am I, and how do I live in coherence with others?"
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "🧠", title: "Consciousness Education", desc: "Disclosure, expanded awareness, and personal sovereignty" },
                { icon: "💻", title: "Future Technology", desc: "AI, crypto, and decentralized systems for the new earth" },
                { icon: "🌿", title: "Embodied Practices", desc: "Yoga, sound healing, breathwork, and somatic integration" },
                { icon: "🤝", title: "Community Over Hierarchy", desc: "Collaborative, decentralized, and human-centered governance" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.375rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>{item.title}</p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "7rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(12,176,1,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Ready to Join?</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "#fff" }}>
            Be part of<br />something real
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            Join a growing community already experiencing conscious events, weekly streams, and genuine connection — rooted in Sedona, reaching the world.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", background: "#0CB001", color: "#fff", padding: "0.9375rem 2.5rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 36px rgba(12,176,1,0.3)" }}>
              Join for Free →
            </Link>
            <Link href="https://app.humankind.center/memberships" style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "0.9375rem 1.75rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 500, textDecoration: "none" }}>
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>

      <HomepageFooter />
    </div>
  );
}