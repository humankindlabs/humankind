// src/config/ab.ts
// ─────────────────────────────────────────────────────────────────────────────
// Humankind Homepage A/B Configuration
// hero: swap "A" | "B" | "C" | "D" to change the hero variant
// sections: 5 total — 3 always live + 2 rotating slots
// ─────────────────────────────────────────────────────────────────────────────

export const ab = {
  // Hero variant — rotate to test which converts best
  // A = circles + gradient  B = split + scrolling images
  // C = SVG rings + CTA     D = full bleed image + marquee words
  hero: "A" as "A" | "B" | "C" | "D",

  // 5 sections total:
  // • events, liveCTA, pricing — always live (never remove)
  // • 2 rotating slots — swap from options below to A/B test
  //
  // Options: stats | featureCards | featureSplit | feature2x2
  //          imageGrid | marqueeStrip | testimonials | faq | communityCTA
  sections: [
    "events",        // ← always live
    "liveCTA",       // ← always live
    "pricing",       // ← always live
    "testimonials",  // ← rotating slot 1
    "communityCTA",  // ← rotating slot 2
  ] as SectionKey[],
};

export type HeroKey = "A" | "B" | "C" | "D";
export type SectionKey =
  | "stats"
  | "featureCards"
  | "featureSplit"
  | "feature2x2"
  | "imageGrid"
  | "events"
  | "liveCTA"
  | "marqueeStrip"
  | "testimonials"
  | "pricing"
  | "faq"
  | "communityCTA";