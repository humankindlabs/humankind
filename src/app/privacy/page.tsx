// src/app/privacy/page.tsx
import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.privacy;

import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";


const SECTIONS = [
  {
    title: "Information We Collect",
    content: `When you create an account or use our platform, we collect information you provide directly to us, including your name, email address, password, and optional profile details such as phone number, birthdate, location, and social media links. If you provide a mobile number and opt in, we use it to send account-verification codes and transactional SMS notifications.

When you book or host through Humankind Stay, we collect booking information such as stay dates, guest counts, listing and property details, pricing, and the payout and tax details hosts provide to set up payments.

We also collect information automatically when you use our services, including usage data, device information, IP address, browser type, pages visited, and interactions with our content — including on our connected-TV applications. If you make a purchase, we process payment information through our third-party payment processor (Stripe) — we do not store your full card details on our servers.

For in-person events, we may collect check-in data associated with your account.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information including purchase confirmations
• Send community announcements, event reminders, and updates (with your consent)
• Personalize your experience and deliver relevant content and recommendations
• Monitor and analyze usage patterns to improve our platform
• Detect, prevent, and address technical issues and fraudulent activity
• Comply with legal obligations

We will not sell your personal information to third parties for their marketing purposes.`,
  },
  {
    title: "SMS / Text Messaging",
    content: `If you provide your mobile number and opt in, we use it to send you SMS text messages for account verification (one-time passcodes) and transactional notifications (such as booking and account updates). SMS is delivered through our messaging provider, Twilio, which processes your number solely to deliver these messages on our behalf.

No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing with subcontractors that provide support services, such as our SMS provider, is permitted solely to deliver the messages you have requested. Text-messaging originator opt-in data and consent are not shared with any third parties for any other purpose.

You can opt out of SMS at any time by replying STOP to any message; reply HELP for help. Message frequency varies, and message and data rates may apply. Opting out of SMS does not affect transactional emails or in-app notifications that are necessary to operate your account.`,
  },
  {
    title: "Humankind Stay (Hosts & Guests)",
    content: `When you use Humankind Stay, we process booking information to facilitate the stay between hosts and guests. To complete a booking, we share the information necessary to coordinate it between the relevant host and guest — for example, names, booking details, and contact information needed for the stay.

Host payouts are processed through Stripe Connect. Payout, identity, and tax information that hosts provide during Stripe onboarding is collected and handled by Stripe under its own terms; we receive only limited status information (such as whether payouts are enabled) and do not store hosts' full bank details.`,
  },
  {
    title: "Sharing of Information",
    content: `We may share your information in the following circumstances:

• With service providers who assist us in operating our platform — including Supabase (data storage), Stripe and Stripe Connect (payments and host payouts), Twilio (SMS delivery), and email service providers (notifications)
• Between hosts and guests, the information necessary to coordinate a Humankind Stay booking
• With event co-producers when you register for a specific event, limited to what is necessary for event coordination
• If required by law, regulation, or legal process
• To protect the rights, property, or safety of Humankind, our users, or others
• With your consent or at your direction

We require all third-party service providers to maintain appropriate security measures and restrict their use of your information to the purposes for which we share it. As noted above, mobile opt-in information and SMS consent are never shared with third parties for marketing or promotional purposes.`,
  },
  {
    title: "Data Retention",
    content: `We retain your account data while your account is active. Activity and usage logs are retained for 90 days. Payment and transaction records are retained for 7 years as required by applicable law.

You may request deletion of your account and associated data at any time through your account settings under Data & Privacy Controls. Note that some information may be retained as required by law or for legitimate business purposes such as fraud prevention.`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to operate our platform, remember your preferences, and understand how you use our services. These include:

• Essential cookies required for the platform to function
• Analytics cookies to understand usage patterns (via Google Analytics)
• Session cookies to keep you logged in

You can control cookie settings through your browser. Disabling certain cookies may affect the functionality of our platform.`,
  },
  {
    title: "Your Rights & Choices",
    content: `You have the right to:

• Access, correct, or update your personal information through your account settings
• Download a copy of your data (available in Account → Data & Privacy Controls)
• Request deletion of your account and associated data
• Opt out of marketing communications at any time by unsubscribing from emails or adjusting your notification preferences
• Opt out of SMS text messages at any time by replying STOP to any message
• Object to or restrict certain processing of your information

To exercise any of these rights, you can use the controls in your account settings or contact us at hello@humankind.center.`,
  },
  {
    title: "Children's Privacy",
    content: `Our platform is generally intended for individuals 13 years of age and older. We offer a Kids membership tier for members 13 and under, which requires guardian approval and has additional content restrictions.

We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe we have inadvertently collected information from a child under 13, please contact us immediately at hello@humankind.center.`,
  },
  {
    title: "Security",
    content: `We implement industry-standard security measures to protect your personal information, including encrypted data transmission (HTTPS/TLS), secure authentication, and access controls.

While we take reasonable precautions, no system is completely secure. We cannot guarantee the absolute security of your information and encourage you to use a strong, unique password for your account.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and, where appropriate, sending you an email notification. Your continued use of our platform after changes become effective constitutes your acceptance of the revised policy.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

Humankind Center
1730 W State Rte 89A Suite 7
Sedona, AZ 86336
Email: hello@humankind.center
Phone: (602) 622-8555`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>

      <MarketingNav />

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0CB001", marginBottom: "1rem" }}>Legal</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
            Last updated: June 2026
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "1.25rem" }}>
            Humankind Center ("Humankind," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our platform and services — including app.humankind.center, humankind.center, the Humankind Stay booking platform at stay.humankind.center, our connected-TV applications, and our email and SMS communications.
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
            <Link href="https://app.humankind.center/ac/data-privacy-controls" style={{ color: "#0CB001", textDecoration: "none" }}>Your Privacy Controls</Link>
          </p>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}