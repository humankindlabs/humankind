import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { SectionCommunityCTA } from "@/components/homepage/sections/SectionCommunityCTA";
import { SectionEvents } from "@/components/homepage/sections/SectionEvents";
import { SectionLiveCTA } from "@/components/homepage/sections/SectionLiveCTA";
import { SectionPricing } from "@/components/homepage/sections/SectionPricing";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import type { LandingPageConfig } from "@/config/landing-pages";
import type { HomepageBroadcast, HomepageEvent } from "@/we/homepage-data";

const SITE_URL = "https://humankind.center";
const APP_URL = "https://app.humankind.center";

type GeoPageProps = {
  page: LandingPageConfig;
  events: HomepageEvent[];
  broadcast: HomepageBroadcast;
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function buildSchemas(page: LandingPageConfig) {
  const geo = page.geo;
  if (!geo) return [];

  const canonical = `${SITE_URL}/hi/${page.slug}`;
  const place = {
    "@type": "Place",
    name: "humankind",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1730 W State Route 89A, Suite 7",
      addressLocality: "Sedona",
      addressRegion: "AZ",
      postalCode: "86336",
      addressCountry: "US",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "humankind",
    url: SITE_URL,
    logo: `${SITE_URL}/humankind-1024x1024.png`,
    description: "humankind is a Sedona-based conscious community center, event venue, live broadcast network, and digital community platform.",
    address: place.address,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "humankind",
    url: SITE_URL,
    image: `${SITE_URL}${geo.image ?? "/og-image.jpg"}`,
    description: page.metaDescription,
    address: place.address,
    areaServed: ["Sedona", "Arizona", "Online"],
    priceRange: "$$",
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: geo.h1,
    description: geo.aiSummary,
    url: canonical,
    dateModified: "2026-05-27",
    author: { "@type": "Organization", name: "humankind" },
    publisher: { "@type": "Organization", name: "humankind", logo: `${SITE_URL}/humankind-1024x1024.png` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: geo.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const topicSchema =
    geo.schemaType === "Event"
      ? {
          "@context": "https://schema.org",
          "@type": "EventSeries",
          name: geo.h1,
          description: geo.aiSummary,
          url: canonical,
          eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
          location: place,
          organizer: { "@type": "Organization", name: "humankind", url: SITE_URL },
        }
      : geo.schemaType === "Service"
        ? {
            "@context": "https://schema.org",
            "@type": "Service",
            name: geo.h1,
            description: geo.aiSummary,
            provider: { "@type": "LocalBusiness", name: "humankind", url: SITE_URL, address: place.address },
            areaServed: ["Sedona", "Arizona", "Online"],
          }
        : null;

  const video =
    geo.includeLiveNetwork
      ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "humankind 24/7 Consciousness Network",
          description: "Humankind's live broadcast network shares conscious events, shows, replays, talks, and community programming.",
          thumbnailUrl: [`${SITE_URL}/og-image.jpg`],
          uploadDate: "2026-05-27",
          embedUrl: `${APP_URL}/media/live-broadcast`,
        }
      : null;

  return [organization, localBusiness, article, faq, topicSchema, video].filter(Boolean);
}

function HeroArtwork({ page }: { page: LandingPageConfig }) {
  const image = page.geo?.image ?? "/og-image.jpg";

  return (
    <div className="hk-geo-hero-art" aria-hidden="true">
      <div className="hk-geo-hero-art__frame">
        <img src={image} alt="" />
        <div className="hk-geo-hero-art__overlay">
          <img src="/humankind-1024x1024.png" alt="" />
          <span>{page.geo?.category ?? "humankind"}</span>
        </div>
      </div>
    </div>
  );
}

function RelatedLinks({ page }: { page: LandingPageConfig }) {
  const links = page.geo?.relatedLinks ?? [];
  return (
    <section className="hk-geo-related" aria-label="Related humankind pages">
      <p className="hk-landing-eyebrow">Explore related guides</p>
      <div>
        <Link href="/what-is-humankind">What is humankind?</Link>
        <Link href="/our-vision">Our vision</Link>
        <Link href={`${APP_URL}/events`}>Upcoming events</Link>
        <Link href={`${APP_URL}/media`}>Watch humankind</Link>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContentBlock({
  eyebrow,
  title,
  body,
  points,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}) {
  return (
    <section className="hk-geo-content">
      <div>
        <p className="hk-landing-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

function Faq({ page }: { page: LandingPageConfig }) {
  const faq = page.geo?.faq ?? [];
  return (
    <section className="hk-geo-faq">
      <div className="hk-geo-section-head">
        <p className="hk-landing-eyebrow">Frequently asked questions</p>
        <h2>{page.geo?.h1} FAQ</h2>
      </div>
      <div className="hk-geo-faq__list">
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function GeoLandingPage({ page, events, broadcast }: GeoPageProps) {
  const geo = page.geo;
  if (!geo) return null;
  const schemas = buildSchemas(page);

  return (
    <main className="hk-geo-page">
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <MarketingNav />

      <section className="hk-geo-hero">
        <div>
          <p className="hk-landing-eyebrow">{page.eyebrow}</p>
          <h1>{geo.h1}</h1>
          <p className="hk-geo-summary">{geo.aiSummary}</p>
          <div className="hk-geo-actions">
            <Link className="hk-btn hk-btn-primary" href={page.primaryCta.href}>
              {page.primaryCta.label}
            </Link>
            <Link className="hk-btn hk-btn-secondary" href={page.secondaryCta.href}>
              {page.secondaryCta.label}
            </Link>
          </div>
        </div>
        <HeroArtwork page={page} />
      </section>

      <section className="hk-geo-intro">
        {geo.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <SectionEvents events={events} />

      <ContentBlock {...geo.partTwo} />
      <ContentBlock {...geo.partThree} />

      <RelatedLinks page={page} />

      {geo.includeLiveNetwork && <SectionLiveCTA broadcast={broadcast} />}

      <SectionPricing />
      <Faq page={page} />
      <SectionCommunityCTA />
      <HomepageFooter />
    </main>
  );
}
