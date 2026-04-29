// src/app/our-vision/page.tsx
import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.ourVision;

import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { MarketingNav } from "@/components/marketing/marketing-nav";

const MARQUEE = ["Our Vision", "Global Network", "Conscious Centers", "Sedona", "Transformation", "Community"];

const SPLITS = [
  {
    eyebrow: "Dome Centers",
    title: "Innovative spaces designed for conscious connection",
    body: "Humankind centers will feature modern dome structures built to support learning, healing, and community experiences. Each location is designed with flexible spaces for workshops, private sessions, live events, and global broadcasting. With scalable designs and immersive environments, these centers will become hubs for conscious transformation — blending advanced technology with meaningful human connection.",
    image: "/our-vision/the-domes.jpg",
    imageRight: false,
  },
  {
    eyebrow: "Decentralized Governance",
    title: "Community-driven decision making",
    body: "Humankind is building a decentralized governance model that empowers the community to help shape the future. Through blockchain-based participation, members can contribute to decisions around growth, programming, and expansion. This transparent and collaborative approach ensures that Humankind evolves through collective wisdom, shared vision, and community alignment.",
    image: "/our-vision/decentralized-governance_001.jpg",
    imageRight: true,
  },

];

export default function OurVisionPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)", overflowX: "hidden" }}>

      <MarketingNav />

      {/* ── Hero — HeroD pattern ── */}
      <div style={{ position: "relative", background: "#00031C", paddingTop: "5rem", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 50% -10%, rgba(12,176,1,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "80px", left: "6%", width: "20px", height: "20px", background: "rgba(12,176,1,0.3)", borderRadius: "5px", transform: "rotate(45deg)", animation: "hk-spin-slow 10s linear infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "100px", right: "6%", width: "14px", height: "14px", borderRadius: "50%", background: "rgba(12,176,1,0.4)", animation: "hk-blink 2s infinite" }} />

        <div style={{ position: "relative", zIndex: 1, margin: "0 2rem 3rem", borderRadius: "1.5rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "hk-float-in 0.9s cubic-bezier(0.22,1,0.36,1) forwards", opacity: 0, minHeight: "480px" }}>
          <img src="/images/homepage/ai/img-3.jpg" alt="Our Vision" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.65)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(12,176,1,0.08) 0%, transparent 70%)" }} />

          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "480px", padding: "5rem 2rem", textAlign: "center" }}>
            <span style={{ display: "inline-block", padding: "0.375rem 1rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", marginBottom: "1.5rem" }}>
              Humankind · Our Vision
            </span>
            <h1 style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1.25rem", maxWidth: "960px" }}>
              Building a world of<br />conscious communities
            </h1>
            <p style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "800px", marginBottom: "2.5rem" }}>
              At the heart of Humankind lies a bold vision: to create a global network of decentralized centers that inspire personal growth, spiritual awakening, and community connection. Guided by principles of inclusivity, innovation, and empowerment, Humankind is building a future where individuals and communities thrive together.
            </p>
            <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", background: "#0CB001", color: "#fff", padding: "0.9375rem 2.5rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 40px rgba(12,176,1,0.4)" }}>
              Join the Movement →
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ background: "rgba(0,3,28,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "1.25rem 0" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", width: "max-content", animation: "hk-marquee-seamless 20s linear infinite", willChange: "transform" }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 800, color: "rgba(255,255,255,0.1)", fontFamily: "var(--hk-font-brand)", letterSpacing: "-0.02em", padding: "0 2rem", whiteSpace: "nowrap" }}>
                {item}<span style={{ color: "rgba(12,176,1,0.25)", marginLeft: "2rem" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature Split sections ── */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "7rem" }}>
          {SPLITS.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="hk-split-section">
              <div style={{ order: row.imageRight ? 2 : 1, position: "relative" }}>
                <div style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
                  <img src={row.image} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,3,28,0.25)", borderRadius: "1.5rem" }} />
                </div>
                <div style={{ position: "absolute", inset: "-16px", borderRadius: "2rem", background: "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)", zIndex: -1, filter: "blur(20px)" }} />
              </div>
              <div style={{ order: row.imageRight ? 1 : 2, maxWidth: "480px" }}>
                <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0CB001", background: "rgba(12,176,1,0.1)", marginBottom: "1.25rem" }}>
                  {row.eyebrow}
                </span>
                <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem", color: "#fff" }}>
                  {row.title}
                </h2>
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
                  {row.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Our Centers Will Do */}
      <section style={{ padding: "6rem 2rem", background: "rgba(12,176,1,0.04)", borderTop: "1px solid rgba(12,176,1,0.1)", borderBottom: "1px solid rgba(12,176,1,0.08)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>What Each Center Will Do</p>
            <h2 style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Hubs for conscious transformation
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🌐", title: "Foster Community Bonds", desc: "Bridging local and global communities — connecting people across cultures, disciplines, and perspectives." },
              { icon: "✨", title: "Transformative Experiences", desc: "Providing access to in-person and online experiences that inspire growth, healing, and higher awareness." },
              { icon: "🏛️", title: "Decentralized Governance", desc: "Serving as models for sustainable, community-owned spaces that prioritize people over profit." },
              { icon: "📡", title: "Live Streaming & Media", desc: "Broadcasting conscious content globally so anyone, anywhere can participate in the movement." },
              { icon: "🎓", title: "Education & Workshops", desc: "Classrooms and studios for workshops, private sessions, and collaborative learning projects." },
              { icon: "🎤", title: "Events & Conferences", desc: "Auditoriums for conferences, live events, and multi-camera online broadcasting — in Sedona and beyond." },
            ].map((item) => (
              <div key={item.title} style={{ padding: "1.75rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1.25rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "28% 72% 50% 50% / 26% 20% 80% 74%", background: "rgba(12,176,1,0.08)", border: "1px solid rgba(12,176,1,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.25rem" }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section style={{ padding: "7rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(12,176,1,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
          <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "1rem" }}>Be Part of the Movement</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem", color: "#fff" }}>
            Let's create a brighter<br />future, together
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
            We invite supporters, visionaries, and community builders to join us in making this dream a reality. Build innovative spaces that inspire growth and healing. Empower communities worldwide.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="https://app.humankind.center/register" style={{ display: "inline-flex", alignItems: "center", background: "#0CB001", color: "#fff", padding: "0.9375rem 2.5rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 36px rgba(12,176,1,0.3)" }}>
              Join for Free →
            </Link>
            <Link href="/what-is-humankind" style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "0.9375rem 1.75rem", borderRadius: "99px", fontSize: "1rem", fontWeight: 500, textDecoration: "none" }}>
              What Is Humankind?
            </Link>
          </div>
        </div>
      </section>

      <HomepageFooter />

      <style>{`
        @keyframes hk-float-in {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 768px) {
          .hk-split-section { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hk-split-section > * { order: unset !important; }
        }
      `}</style>
    </div>
  );
}