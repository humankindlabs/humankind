// src/app/blog/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

export const metadata: Metadata = {
  title: "Blog — Humankind",
  description:
    "Stories, insights, and updates from the humankind community. Conscious living, events, and the path of awakening.",
};

export default function BlogPage() {
  return (
    <div
      style={{
        background: "#00031C",
        color: "#fff",
        minHeight: "100dvh",
        fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
        overflowX: "hidden",
      }}
    >
      <MarketingNav />

      {/* Hero */}
      <section
        style={{
          padding: "5rem 2rem 2.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
          <p
            className="hk-eyebrow"
            style={{ color: "#0CB001", marginBottom: "1rem" }}
          >
            Stories & Insights
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
              color: "#fff",
            }}
          >
            The humankind blog
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Reflections from our Sedona center — events, conscious living, and
            the path of awakening.
          </p>
        </div>
      </section>

      {/* Soro embed */}
      <section style={{ padding: "2rem 2rem 5rem" }}>
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
          {/* Soro renders blog posts into this div */}
          <div id="soro-blog" />
          <Script
            src="https://app.trysoro.com/api/embed/d2632287-da04-4301-b808-04b2f8e186bd?theme=dark"
            strategy="afterInteractive"
          />
        </div>
      </section>

      <HomepageFooter />
      <style>{`
        .soro-blog { background: #00031C; }
        
      `}</style>
    </div>
  );
}
