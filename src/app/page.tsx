// src/app/page.tsx
//
// Marketing homepage. Pulls the hero variant + section sequence from
// src/config/ab.ts so you can rotate variants for A/B testing.
//
// Pulls upcoming events from Supabase to feed the SectionEvents component.

import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.home;

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { MobileSplash } from "@/components/marketing/mobile-splash";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { ab } from "@/config/ab";

import { HeroA } from "@/components/homepage/heroes/HeroA";
import { HeroB } from "@/components/homepage/heroes/HeroB";
import { HeroC } from "@/components/homepage/heroes/HeroC";
import { HeroD } from "@/components/homepage/heroes/HeroD";

import { SectionStatsBar }     from "@/components/homepage/sections/SectionStatsBar";
import { SectionFeatureCards } from "@/components/homepage/sections/SectionFeatureCards";
import { SectionFeatureSplit } from "@/components/homepage/sections/SectionFeatureSplit";
import { SectionFeature2x2 }   from "@/components/homepage/sections/SectionFeature2x2";
import { SectionImageGrid }    from "@/components/homepage/sections/SectionImageGrid";
import { SectionMarqueeStrip } from "@/components/homepage/sections/SectionMarqueeStrip";
import { SectionTestimonials } from "@/components/homepage/sections/SectionTestimonials";
import { SectionFAQ }          from "@/components/homepage/sections/SectionFAQ";
import { SectionEvents }       from "@/components/homepage/sections/SectionEvents";
import { SectionLiveCTA }      from "@/components/homepage/sections/SectionLiveCTA";
import { SectionPricing }      from "@/components/homepage/sections/SectionPricing";
import { SectionCommunityCTA } from "@/components/homepage/sections/SectionCommunityCTA";

async function getUpcomingEvents() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("events")
      .select("id, title, starts_at, image_url, venue_name, price_label")
      .eq("sync_status", "active")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

const HEROES = { A: HeroA, B: HeroB, C: HeroC, D: HeroD };

export default async function HomePage() {
  // Note: marketing site does NOT redirect logged-in users away from the homepage.
  // Logged-in users see the marketing site like everyone else, with the nav showing
  // "Hi, [name] · Go to app →" in the upper right.

  const events = await getUpcomingEvents();
  const Hero = HEROES[ab.hero] ?? HeroA;

  function renderSection(key: string) {
    switch (key) {
      case "stats":         return <SectionStatsBar key={key} />;
      case "featureCards":  return <SectionFeatureCards key={key} />;
      case "featureSplit":  return <SectionFeatureSplit key={key} />;
      case "feature2x2":    return <SectionFeature2x2 key={key} />;
      case "imageGrid":     return <SectionImageGrid key={key} />;
      case "marqueeStrip":  return <SectionMarqueeStrip key={key} />;
      case "testimonials":  return <SectionTestimonials key={key} />;
      case "faq":           return <SectionFAQ key={key} />;
      case "events":        return <SectionEvents key={key} events={events} />;
      case "liveCTA":       return <SectionLiveCTA key={key} />;
      case "pricing":       return <SectionPricing key={key} />;
      case "communityCTA":  return <SectionCommunityCTA key={key} />;
      default:              return null;
    }
  }

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
      {/* Mobile splash */}
      <MobileSplash />

      {/* Universal nav */}
      <MarketingNav />

      {/* Homepage content (hidden on mobile via CSS below) */}
      <div id="homepage-content">
        <Hero />
        {ab.sections.map((key) => renderSection(key))}
        <HomepageFooter />
      </div>

      <style>{`
        .hk-home-split { grid-template-columns: 1fr 1fr; }
        @media (max-width: 1023px) {
          .hk-home-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) {
          #homepage-content { display: none; }
          .hk-marketing-nav { display: none !important; }
        }
        @media (min-width: 1024px) {
          .hk-mobile-splash { display: none !important; }
        }
      `}</style>
    </div>
  );
}
