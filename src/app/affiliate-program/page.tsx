// src/app/affiliate-program/page.tsx — the Affiliate Program terms, laid out like the Privacy Policy.
import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.affiliateProgram;

import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

const SECTIONS = [
  {
    title: "Who Can Join",
    content: `Any active Humankind member may take part in the Affiliate Program: Free Members, Online Members and Full Members. You join by choosing an affiliate name in your account (Profile → Affiliate). That name becomes your referral link (app.humankind.center/go/yourname) and your referral code.

Affiliate names may not contain protected brand names or reserved terms. Humankind keeps the list of reserved names and may decline a name.`,
  },
  {
    title: "Member Referral Levels",
    content: `Your commission rate and how long you earn follow your own current membership:

• Free Member — 20% of each qualifying payment, for the referred member's first 6 paid membership payments
• Online Member — 35% of each qualifying payment, for the first 12 paid membership payments
• Full Member — 50% of each qualifying payment, for as long as the referred member keeps paying and you keep an eligible membership

Examples, for a referred Full Member paying $77 a month: a Free Member affiliate earns $15.40 per paid month; an Online Member affiliate earns $26.95; a Full Member affiliate earns $38.50.`,
  },
  {
    title: "When Your Membership Changes",
    content: `Your referrals stay attached to you when you change plans. Future commissions follow your current membership level: upgrade from Online to Full and the next qualifying payments earn 50% for life; move from Full to Online and they earn 35% under the Online rules; move to Free and they earn 20% under the Free rules.

Commissions already finalized are never recalculated. If you earned 20% as a Free Member yesterday and upgrade to Full today, yesterday's commission stays at 20% and the next qualifying payment earns 50%.

If your affiliate account is suspended, or you no longer hold an eligible Humankind membership, commissions stop. Your referral relationships are kept, and if you return to an eligible membership, future commissions resume at your then-current level. Nothing is paid retroactively for the time in between.`,
  },
  {
    title: "Referral Attribution",
    content: `A person is attached to you when they create their account through your referral link or code, through an invite you send them from Messages, or when a Humankind administrator attaches them to you. The relationship is stored permanently unless removed by an administrator.

A free signup alone earns $0. The referred member has 90 days from their signup to make their first paid upgrade. If they do, you earn on that payment and on their later payments according to your level and its duration. If their first paid upgrade comes after 90 days, no commission is earned on them.`,
  },
  {
    title: "Qualifying Payments and Commission",
    content: `Commissionable membership products: Full Membership ($77/month), Online Membership ($11/month) and Online Annual Membership ($111/year). Prices may change; commission is always calculated on the amount actually paid.

Commission = the successful membership payment × your commission percentage. Only successful, completed payments earn commission. Nothing is earned on failed or declined payments, free memberships, $0 trial amounts, fully refunded payments or chargebacks. If a payment that earned a commission is later refunded or charged back, the related commission is reversed; if some of it was already applied to your membership, the adjustment is recorded on your balance. Every commission, credit, reversal and payout is kept as a record.`,
  },
  {
    title: "Your Own Membership Is Paid First",
    content: `Approved commissions are applied to your own Humankind membership bill before anything becomes cash. Each billing period, commissions cover your membership up to its price; whatever remains after your membership is covered becomes your available balance, which rolls over with no expiration.

Example: a Full Member with two active referred Full Members earns $38.50 from each, $77 in all, and pays $0 out of pocket for their $77 membership. With $192.50 of commission in a period, $77 covers the membership and $115.50 remains available.`,
  },
  {
    title: "Commission Status and Cash-Out",
    content: `A commission is Pending from the moment the referred member's payment succeeds, is Approved after a short hold for refunds (7 days), and is then either Applied to Membership or Available, and finally Paid when cashed out. A commission can also be Reversed (refund, chargeback or administrative review) or Cancelled. No commission is ever counted both as membership credit and as a cash withdrawal.

Available balance of $50 or more can be cashed out to PayPal from your affiliate dashboard. Humankind may ask for identity or tax information before paying out where the law requires it.`,
  },
  {
    title: "Influencer, Partner and Custom Levels",
    content: `Humankind may place an affiliate on an Influencer level (30% by default), a Partner level (50% by default) or a Custom level (10% to 90%), each with a commission duration set by Humankind, from the first payment only up to lifetime. These levels follow their own agreement and not the member-referral rules above. Humankind may change, start or end such an arrangement with notice.`,
  },
  {
    title: "Fair Use",
    content: `You may not earn commission on your own membership, your own accounts, duplicate accounts you control, or transactions Humankind identifies as self-referrals or fraud. You may not use paid advertising that bids on Humankind's name, misrepresent Humankind, or send unsolicited bulk messages with your link. Humankind may remove a referral attribution, reverse a commission, suspend an affiliate account, disable payouts, and keep internal notes on an account, at its discretion and with notice where practical.`,
  },
  {
    title: "Changes to the Program",
    content: `Humankind may change the program's rates, durations, products or rules. Changes apply to future qualifying payments only; commissions already finalized are not recalculated. The current terms are always at this address, and material changes are announced to affiliates by email or in the app.`,
  },
];

export default function AffiliateProgramPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>

      <MarketingNav />

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0CB001", marginBottom: "1rem" }}>Program Terms</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1rem" }}>
            Affiliate Program
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
            Last updated: October 2026
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "1.25rem" }}>
            Humankind members earn a share of the membership payments of the people they bring to Humankind. Your rate and how long you earn follow your own membership, your earnings pay your own membership first, and what is left is yours. These are the terms of the program; they are part of the Humankind Terms of Use.
          </p>
          <p style={{ fontSize: "0.9375rem", marginTop: "1.25rem" }}>
            <Link href="https://app.humankind.center/ac/affiliate-program" style={{ color: "#0CB001", textDecoration: "none", fontWeight: 700 }}>Activate your affiliate account →</Link>
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
            <Link href="/privacy" style={{ color: "#0CB001", textDecoration: "none" }}>Privacy Policy</Link>
            {" · "}
            <Link href="https://app.humankind.center/ac/affiliate-program" style={{ color: "#0CB001", textDecoration: "none" }}>Your affiliate dashboard</Link>
          </p>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
