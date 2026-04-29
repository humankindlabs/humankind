// src/config/site.ts
//
// Site-wide config for the marketing site. Edit here when URLs change.

export const SITE = {
  name: "humankind",
  url: "https://humankind.center",
  appUrl: "https://app.humankind.center",
  description:
    "A conscious community for live events, streams, and connection — based in Sedona, AZ.",
};

// Marketing nav links shown across all pages
export const MARKETING_NAV_LINKS = [
  { label: "Our Vision", href: "/our-vision" },
  { label: "What is humankind", href: "/what-is-humankind" },
] as const;

// Footer links grouped by section
export const FOOTER_LINKS = {
  product: [
    { label: "Sign in", href: `${SITE.appUrl}/login` },
    { label: "Sign up", href: `${SITE.appUrl}/signup` },
    { label: "Membership", href: `${SITE.appUrl}/memberships` },
  ],
  company: [
    { label: "Our Vision", href: "/our-vision" },
    { label: "What is humankind", href: "/what-is-humankind" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
