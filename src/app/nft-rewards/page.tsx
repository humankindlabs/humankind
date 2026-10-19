// src/app/nft-rewards/page.tsx — the NFT Rewards program: what a humankind card is, how you get one, the sets and
// the rewards, laid out like the Affiliate Program page.
import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.nftRewards;

import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

const SECTIONS = [
  {
    title: "What a Humankind Card Is",
    content: `Every ticket to a Humankind event that has cards switched on comes with one collectable playing card. The card is yours: it lives in your Humankind wallet, you can show it, trade it or keep it, and nobody can take it away or make another one like it.

Each event has its own deck of 52 cards plus Jokers, drawn in the event's own style. The suits belong to the event. CIRCO BIZARRO's suits are Big Tops, Flames, Masks and Hoops; the headlining DJs are the Aces. Every suit also stands for a classic suit (Spades, Hearts, Diamonds, Clubs), so cards from different events collect together into one game.

Your ticket number decides your card. Nobody, not even Humankind, chooses who gets which card: the deck is shuffled by a seed fixed before the first ticket sells, and ticket number one is always a foil.`,
  },
  {
    title: "What Makes a Card Special",
    content: `• One of a kind. A card is an NFT, a token on the Hedera public ledger. There is exactly one of each card per deck, and the ledger proves who holds it.
• Sealed. When ticket sales end, the deck is sealed on the ledger. No more cards from that event can ever be made. If 40 tickets sold, 14 cards of that deck will never exist.
• Rarity. Most cards are standard. About one in ten is gold. One in fifty is foil, with a prismatic frame. Ticket number one is always foil.
• The attendance seal. When your ticket is scanned at the door, your card is stamped ATTENDED with the date. The seal is part of the card itself and stays with it forever, whoever holds it next. A card from someone who was in the room is a different object from one that was not.
• Wrapped. A card arrives wrapped: everyone, you included, sees only the deck's back until you unwrap it in your wallet. You can keep it wrapped and trade it as a mystery. Once unwrapped, it stays unwrapped.
• No cost to you. No crypto to buy, no gas fees, no exchange. Your Humankind wallet is created with your account and the card is delivered into it.`,
  },
  {
    title: "How to Get Cards",
    content: `• Buy a ticket on Humankind to an event with cards. The card lands in your wallet, wrapped, as soon as the ticket is yours.
• Bought on Eventbrite? Your ticket still comes with a card. You will receive an email with a claim link; create a free Humankind account (or sign in) and the card is delivered to your wallet.
• Trade with other members. Send a card to anyone from your wallet (Collection → the card → Send). Swaps and sales between members are arranged between you today; an offers board is coming.
• Attend. Scanning in at the door earns the attendance seal, which some sets require.`,
  },
  {
    title: "Sets and Rewards",
    content: `A set is a group of cards that, held together in your wallet, unlocks a reward. Claiming a reward does not use up your cards: they stay yours, and the same card can count toward more than one set. Each reward is claimed once per member, per set, per deck.

The sets:
• Pair — two cards of the same rank from one deck
• Attended three — three attended cards from any three events
• Flush — five cards of one suit from one deck
• Four of a kind — the same rank in all four suits of one deck
• Full suit — all thirteen cards of one suit from one deck
• Royal — Ace, King, Queen, Jack and Ten of one suit from one deck
• Deck — all 52 cards of one deck
• Lotus — one attended card from every event in a year

The rewards are coming soon. Each set's reward is announced here and in your wallet before it can be claimed; your progress toward every set counts from your first card. Gold and foil cards count like any other card in a set.`,
  },
  {
    title: "Claiming a Reward",
    content: `Open your wallet's Collection and the Sets & rewards panel. Each set shows a progress bar; once a set's reward is announced and the set is complete, a Claim button appears. Claiming gives you a code in the form HK-XXXX-XXXX and rings your bell. Show the code at the venue, or scan it at the door kiosk, and the host hands over the reward and marks it fulfilled.

Humankind may ask for identification before handing over a reward of value, may set a time limit on claims for a given event, and may void a claim obtained by fraud, duplicate accounts or a disputed ticket.`,
  },
  {
    title: "Showing Your Cards",
    content: `Your cards appear in your wallet's Collection and in a card strip on your Humankind profile, open or folded as you like. Every card has a public page with its own link; the card is the picture in the link preview, so a card can be shared anywhere. Wrapped cards show the deck's back on their public page until they are unwrapped.`,
  },
  {
    title: "Where the Cards Live",
    content: `Humankind cards are minted on Hedera, a public ledger chosen for its low cost and energy use. Your wallet at wallet.humankind.center holds them; you can see the token and serial of every card you own, and anyone can verify it on a public Hedera explorer. Humankind holds the keys for your wallet on your behalf so you never need to manage seed phrases or pay fees.

Images and metadata of every card are kept by Humankind and pinned to the ledger record. A card's picture never changes except for the attendance seal and the unwrap.`,
  },
  {
    title: "Fair Play and Changes",
    content: `A card is tied to a real ticket. If a ticket is refunded, disputed or found to be fraudulent, Humankind may void the card and any claim made with it. Cards may not be used to misrepresent Humankind, an artist or an event.

Humankind may add sets and rewards, retire a reward for future decks, or change how rewards are handed over. A reward already claimed is honoured. The current program is always at this address; the rules are part of the Humankind Terms of Use.`,
  },
];

export default function NftRewardsPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>

      <MarketingNav />

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0CB001", marginBottom: "1rem" }}>Program Details</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1rem" }}>
            NFT Rewards
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
            Last updated: October 2026
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "1.25rem" }}>
            Every ticket to a Humankind event comes with a collectable playing card, drawn in the event&apos;s own style and one of a kind on the ledger. Collect them across events, trade them with other members, complete sets and claim real rewards at the venue. No crypto to buy, nothing to install: the card lands in the Humankind wallet that comes with your account.
          </p>
          <p style={{ fontSize: "0.9375rem", marginTop: "1.25rem" }}>
            <Link href="https://wallet.humankind.center/collection" style={{ color: "#0CB001", textDecoration: "none", fontWeight: 700 }}>Open your Collection →</Link>
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {SECTIONS.map((s, i) => (
            <div key={i}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0CB001", background: "rgba(12,176,1,0.1)", border: "1px solid rgba(12,176,1,0.2)", borderRadius: "0.375rem", padding: "0.125rem 0.5rem", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              <div style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem", padding: "1.5rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem" }}>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)" }}>
            See also:{" "}
            <Link href="/terms" style={{ color: "#0CB001", textDecoration: "none" }}>Terms of Use</Link>
            {" · "}
            <Link href="/affiliate-program" style={{ color: "#0CB001", textDecoration: "none" }}>Affiliate Program</Link>
            {" · "}
            <Link href="https://wallet.humankind.center/collection" style={{ color: "#0CB001", textDecoration: "none" }}>Your Collection</Link>
          </p>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
