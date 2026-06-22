// src/app/sms-policy/page.tsx
export const metadata = {
  title: "SMS Messaging Policy — Humankind",
  description:
    "How Humankind's SMS text-message program works: opt-in, message types, frequency, rates, and how to opt out. We never share mobile opt-in data with third parties for marketing.",
};

import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

const SECTIONS = [
  {
    title: "How You Opt In",
    content: `You opt in to receive SMS text messages from Humankind by entering your mobile phone number on our website and agreeing to receive messages. This happens at two points:

• When you create or update your Humankind account at app.humankind.center.
• When you book a stay through Humankind Stay at stay.humankind.center.

At the point you provide your number, we display the following disclosure: "By providing your phone number, you agree to receive SMS text messages from Humankind for account verification and booking/account notifications. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help." Providing your number and submitting the form constitutes your consent. Consent is not a condition of any purchase. We never purchase or obtain phone numbers from third parties.`,
  },
  {
    title: "What Messages You'll Receive",
    content: `We send two kinds of messages:

• Account verification — one-time passcodes to confirm your phone number or sign in securely (delivered via our verification service).
• Account, booking & event notifications — for example: booking confirmations, host and guest booking updates, check-in reminders, payout alerts, and reminders about events you've registered for.

We do not send marketing or promotional content via SMS on this program.`,
  },
  {
    title: "Message Frequency & Rates",
    content: `Message frequency varies based on your activity (for example, when you book a stay or an event you've signed up for is approaching). Message and data rates may apply, depending on your mobile carrier and plan. Humankind does not charge you for SMS messages.`,
  },
  {
    title: "How to Opt Out or Get Help",
    content: `You can opt out at any time by replying STOP to any message — you'll receive a confirmation and we'll stop sending SMS to that number. Reply HELP for help, or contact us at hello@humankind.center. Opting out of SMS does not affect transactional emails or in-app notifications that are necessary to operate your account. Carriers are not liable for delayed or undelivered messages.`,
  },
  {
    title: "Your Privacy",
    content: `No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information is shared only with the subcontractor that delivers the messages on our behalf (our SMS provider), solely to send the messages you've requested. Text-messaging opt-in data and consent are never shared with any third parties for any other purpose. For full details, see our Privacy Policy.`,
  },
];

export default function SmsPolicyPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>
      <MarketingNav />

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        <div style={{ marginBottom: "3.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0CB001", marginBottom: "1rem" }}>Legal</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1rem" }}>
            SMS Messaging Policy
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
            Last updated: June 2026
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "1.25rem" }}>
            This page explains how Humankind&apos;s SMS text-message program works — how you opt in, what we send, and how to opt out. By providing your mobile number and agreeing to receive messages, you consent to the terms below.
          </p>
        </div>

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
            <Link href="/privacy" style={{ color: "#0CB001", textDecoration: "none" }}>Privacy Policy</Link>
            {" · "}
            <Link href="/terms" style={{ color: "#0CB001", textDecoration: "none" }}>Terms of Use</Link>
          </p>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
