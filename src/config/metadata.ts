// src/config/metadata.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central metadata config — edit here to update all page titles/descriptions.
// Pages import their entry directly: import { pageMeta } from "@/config/metadata"
// ─────────────────────────────────────────────────────────────────────────────

const SITE_NAME = "Humankind";
const SITE_URL  = "https://app.humankind.center";
const OG_IMAGE  = "/og-image.jpg";
const TWITTER   = "@athumankind";

// Shared base — merged into every page's openGraph
const baseOG = {
  siteName: SITE_NAME,
  type:     "website" as const,
  locale:   "en_US",
  images:   [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Conscious Community in Sedona` }],
};

const baseTwitter = {
  card:   "summary_large_image" as const,
  site:   TWITTER,
  images: [OG_IMAGE],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE METADATA — edit title / description here
// ─────────────────────────────────────────────────────────────────────────────
export const pageMeta = {

  // ── Public marketing pages ──
  home: {
    title: `${SITE_NAME} — Conscious Community in Sedona`,
    description: "Live events, conscious gatherings, and a global streaming community rooted in Sedona, AZ. Join seekers, creators, and explorers.",
    openGraph: { ...baseOG, url: SITE_URL },
    twitter: baseTwitter,
  },

  ourVision: {
    title: "Our Vision",
    description: "A bold vision to create a global network of decentralized centers that inspire personal growth, spiritual awakening, and community connection.",
    openGraph: { ...baseOG, url: `${SITE_URL}/our-vision` },
    twitter: baseTwitter,
  },

  whatIsHumankind: {
    title: "What Is Humankind?",
    description: "A living platform for consciousness, education, and community — a physical venue in Sedona, Arizona and a global digital media ecosystem.",
    openGraph: { ...baseOG, url: `${SITE_URL}/what-is-humankind` },
    twitter: baseTwitter,
  },

  privacy: {
    title: "Privacy Policy",
    description: "How Humankind collects, uses, and protects your personal information.",
    openGraph: { ...baseOG, url: `${SITE_URL}/privacy` },
    twitter: baseTwitter,
  },

  terms: {
    title: "Terms of Use",
    description: "The terms and conditions governing your use of the Humankind platform and services.",
    openGraph: { ...baseOG, url: `${SITE_URL}/terms` },
    twitter: baseTwitter,
  },

  // ── Auth pages ──
  login: {
    title: "Sign In",
    description: "Sign in to your Humankind account.",
    robots: { index: false, follow: false },
  },

  register: {
    title: "Join Free",
    description: "Create your free Humankind account and join our conscious community in Sedona.",
    openGraph: { ...baseOG, url: `${SITE_URL}/register` },
    twitter: baseTwitter,
  },

  // ── Dashboard / member pages (no indexing) ──
  dashboard: {
    title: "Dashboard",
    description: "Your Humankind member dashboard.",
    robots: { index: false, follow: false },
  },

  events: {
    title: "Events",
    description: "Browse upcoming conscious events, workshops, and gatherings at Humankind in Sedona.",
    robots: { index: false, follow: false },
  },

  live: {
    title: "Live Stream",
    description: "Watch Humankind live streams and replays.",
    robots: { index: false, follow: false },
  },

  memberships: {
    title: "Membership Plans",
    description: "Choose a Humankind membership — Free, Online Access ($11/mo), or Full Membership ($77/mo).",
    openGraph: { ...baseOG, url: `${SITE_URL}/memberships` },
    twitter: baseTwitter,
  },

  membershipSuccess: {
    title: "Welcome to Humankind!",
    description: "Your membership is now active.",
    robots: { index: false, follow: false },
  },

} as const;