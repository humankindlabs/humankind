// src/config/promo.ts
// ─────────────────────────────────────────────────────────────────────────────
// The promo bar at the top of the homepage (John 11/9, from angel.com's Black Friday bar): one sale message, and
// the upcoming events take turns with it. Edit the words and dates here; the register link carries the plan, the
// yearly billing and the promo code, so the app does the rest.
//
// The tickets section under the hero: which event is the featured ticket (first match on the title; the next
// event when nothing matches) and the collectable-card pictures fanned beside the words.
// ─────────────────────────────────────────────────────────────────────────────

const APP_URL = "https://app.humankind.center";

export const PROMO_BAR = {
  // OFF until John confirms the deal and the BLACKFRIDAY code exists under Admin → Promo codes; the events still take turns
  active: false,
  /** shown from … until (Phoenix dates, inclusive); outside the window only the events take turns */
  from: "2026-11-09",
  until: "2026-12-01",
  label: "Early Black Friday Sale",
  message: "Online Access for as low as $7/mo, billed annually",
  cta: "Join Online",
  // the yearly plan with the sale's promo code applied at checkout (the code is made under Admin → Promo codes)
  href: `${APP_URL}/register?tier=online&billing=year&promo=BLACKFRIDAY`,
  /** seconds each message stays before the next one slides in */
  everySeconds: 6,
  /** how many upcoming events join the rotation */
  events: 3,
};

export const TICKETS = {
  eyebrow: "Tickets & collectable cards",
  title: "Get Your Tickets. Every Ticket Comes With a Card.",
  body:
    "Every event ticket at humankind comes with a collectable card for your humankind wallet — one of a deck drawn for the night. " +
    "Collect the suits, trade with other members and unlock rewards.",
  /** the event the big button is for: first upcoming event whose title matches; else the next event */
  featured: /elforia/i,
  // a short name goes on the button ("Get ELFORIA tickets"); a long one would not fit
  featuredCta: (title: string) => (title.length <= 20 ? `Get ${title} tickets` : "Get tickets"),
  fallbackCta: "See upcoming events",
  fallbackHref: `${APP_URL}/events`,
  secondary: { label: "How the cards work", href: "/nft-rewards" },
  /** the cards fanned beside the words (public/images/tickets) */
  cards: ["/images/tickets/elforia-santa.webp", "/images/tickets/elforia-snowblob.webp", "/images/tickets/elforia-frostelf.webp"],
};
