// src/app/page.tsx
//
// Marketing homepage. Fetches events + broadcast data from the app's
// public API endpoint (server-to-server, no CORS issue) and passes them
// down to the section components as props.

import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.home;

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

const APP_URL = "https://app.humankind.center";

type EventRow = {
  id: string;
  title: string;
  starts_at: string | null;
  image_url: string | null;
  venue_name: string | null;
  price_label: string | null;
};

type Broadcast = {
  enabled: boolean;
  isLive: boolean;
  thumbnail: string | null;
  videoId: string | null;
  nowPlaying: string;
};

const EMPTY_BROADCAST: Broadcast = {
  enabled: true,
  isLive: false,
  thumbnail: null,
  videoId: null,
  nowPlaying: "Humankind Broadcast",
};

async function getHomepageData(): Promise<{ events: EventRow[]; broadcast: Broadcast }> {
  try {
    const res = await fetch(`${APP_URL}/api/public/homepage-data`, {
      // Revalidate every 60 seconds — fresh enough for events + live broadcast
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    return {
      events: Array.isArray(data.events) ? data.events : [],
      broadcast: data.broadcast ?? EMPTY_BROADCAST,
    };
  } catch (err) {
    console.warn("[homepage] failed to load app data:", err);
    return { events: [], broadcast: EMPTY_BROADCAST };
  }
}

const HEROES = { A: HeroA, B: HeroB, C: HeroC, D: HeroD };

export default async function HomePage() {
  const { events, broadcast } = await getHomepageData();
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
      case "liveCTA":       return <SectionLiveCTA key={key} broadcast={broadcast} />;
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
      <MarketingNav />

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
        // @media (max-width: 1023px) {
        //   #homepage-content { display: none; }
        //   .hk-marketing-nav { display: none !important; }
        }
        @media (min-width: 1024px) {
          .hk-mobile-splash { display: none !important; }
        }
      `}</style>
    </div>
  );
}
