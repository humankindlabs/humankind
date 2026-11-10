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
  // ON (John 11/9: "$7/mo works"); the register link locks the yearly plan and carries the code
  active: true,
  /** shown from … until (Phoenix dates, inclusive); outside the window only the events take turns */
  from: "2026-11-09",
  until: "2026-12-01",
  label: "Early Black Friday Sale",
  message: "Join Online Access for as low as $7/mo, billed annually",
  /** the part of the message drawn in gold */
  strong: "$7/mo",
  cta: "Join Online",
  // the yearly plan, the year only, with the sale's promo code applied at checkout (the code is made under Admin → Promo codes)
  href: `${APP_URL}/register?tier=online&billing=year&only=year&promo=BLACKFRIDAY`,
  /** seconds each message stays before the next one slides in */
  everySeconds: 6,
  /** how many upcoming events join the rotation */
  events: 3,
};

export const TICKETS = {
  eyebrow: "Tickets & collectable cards",
  title: "Get Your Tickets. Every Ticket Comes With a Card.",
  body:
    "Buy a ticket and a collectable card comes with it — one of a deck drawn for that night, minted to your humankind wallet. " +
    "Collect the suits, trade with other members and unlock rewards.",
  /** seconds each event stays before the next one with a card takes its turn */
  everySeconds: 7,
  // a short name goes on the button ("Get ELFORIA tickets"); a long one would not fit
  featuredCta: (title: string) => (title.length <= 20 ? `Get ${title} tickets` : "Get tickets"),
  fallbackCta: "See upcoming events",
  fallbackHref: `${APP_URL}/events`,
  secondary: { label: "How the cards work", href: "/nft-rewards" },
  /** the cards shown when no event with a card is on sale yet (public/images/tickets) */
  cards: ["/images/tickets/elforia-santa.webp", "/images/tickets/elforia-snowblob.webp", "/images/tickets/elforia-frostelf.webp"],
};
