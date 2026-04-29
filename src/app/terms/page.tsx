// src/app/terms/page.tsx
import { pageMeta } from "@/config/metadata";
export const metadata = pageMeta.terms;

import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the Humankind platform at app.humankind.center (the "Platform"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our Platform.

We reserve the right to update these Terms at any time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms. We will notify you of material changes via email or a notice on the Platform.`,
  },
  {
    title: "Eligibility & Account Registration",
    content: `You must be at least 13 years of age to use the Platform. Users between 13 and 18 require parental or guardian consent. By creating an account, you represent that you meet these requirements.

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at hello@humankind.center if you become aware of any unauthorized use of your account.

You may not create more than one account per person, transfer your account to another person, or use another person's account without their permission.`,
  },
  {
    title: "Membership & Payments",
    content: `Humankind offers several membership tiers including Free, Online Access ($11/month), and Full Membership ($77/month). Paid memberships are billed in advance on a monthly basis.

By subscribing to a paid plan, you authorize us to charge your payment method on a recurring basis until you cancel. You can cancel at any time through your account settings under Billing — your access continues until the end of the current billing period. We do not provide refunds for partial months.

We reserve the right to change membership pricing with 30 days notice. Continued use of a paid membership after a price change takes effect constitutes acceptance of the new price.

Event ticket purchases are generally non-refundable unless an event is cancelled by Humankind.`,
  },
  {
    title: "Acceptable Use",
    content: `You agree to use the Platform only for lawful purposes and in a manner that does not infringe the rights of others. You agree not to:

• Post, share, or transmit content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable
• Impersonate any person or entity, or misrepresent your affiliation with any person or entity
• Upload or distribute viruses, malware, or any other malicious code
• Attempt to gain unauthorized access to any part of the Platform or its related systems
• Use the Platform to collect or harvest personal information about other users without their consent
• Engage in any activity that disrupts, damages, or interferes with the Platform
• Use automated means to access or scrape the Platform without our express written permission`,
  },
  {
    title: "Content & Intellectual Property",
    content: `All content on the Platform — including videos, shows, images, text, graphics, logos, and software — is the property of Humankind or its content licensors and is protected by applicable intellectual property laws. Duplication, copying, or unauthorized reuse of this content is strictly prohibited.

User-generated content: By submitting content to the Platform (including profile information, comments, or posts), you grant Humankind a non-exclusive, royalty-free license to use, display, and distribute that content in connection with the Platform.

You represent that any content you submit does not infringe any third-party intellectual property rights and that you have all necessary rights to grant the license above.`,
  },
  {
    title: "Live Events & In-Person Attendance",
    content: `By attending events at our Sedona venue or other locations, you acknowledge and agree that:

• Photography and video recording may take place at events. By attending, you consent to being photographed or filmed and to the use of such materials in Humankind's marketing and media.
• You will comply with all venue rules and staff instructions
• You assume certain inherent risks associated with attending live events
• We reserve the right to refuse entry or remove any attendee who violates these Terms or our code of conduct

Event-specific terms may apply and will be communicated at the time of ticket purchase.`,
  },
  {
    title: "Streaming & Digital Content",
    content: `Access to live streams and the replay library is available to members on eligible membership tiers. You may not:

• Record, download, redistribute, or resell any streamed content
• Share your account credentials to allow others to access paid content
• Use screen recording software or any other means to capture streaming content

Streaming availability may be affected by geographic restrictions, technical issues, or content licensing. We do not guarantee uninterrupted access and are not liable for interruptions in streaming service.`,
  },
  {
    title: "Disclaimers",
    content: `The Platform and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

Content on the Platform, including educational content, talks, and workshops, is provided for informational and educational purposes only. It does not constitute medical, legal, financial, or professional advice. You should consult qualified professionals before making decisions based on any content you encounter on our Platform.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by law, Humankind and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or in connection with your use of the Platform.

Our total liability to you for any claims arising from these Terms or your use of the Platform shall not exceed the amount you paid to us in the 12 months preceding the claim.`,
  },
  {
    title: "Termination",
    content: `You may cancel your account at any time through your account settings. We may suspend or terminate your account at our discretion if we believe you have violated these Terms or for any other reason with or without notice.

Upon termination, your right to use the Platform ceases immediately. Provisions of these Terms that by their nature should survive termination will survive, including intellectual property rights, disclaimers, and limitations of liability.`,
  },
  {
    title: "Governing Law",
    content: `These Terms are governed by the laws of the State of Arizona, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Platform shall be resolved in the state or federal courts located in Yavapai County, Arizona.`,
  },
  {
    title: "Contact",
    content: `For questions about these Terms, please contact us:

Humankind Center
1730 W State Rte 89A Suite 7
Sedona, AZ 86336
Email: hello@humankind.center
Phone: (602) 622-8555`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: "#00031C", color: "#fff", minHeight: "100dvh", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>

      <MarketingNav />

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        <div style={{ marginBottom: "3.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0CB001", marginBottom: "1rem" }}>Legal</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", marginBottom: "1rem" }}>
            Terms of Use
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)" }}>
            Last updated: January 2026
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "1.25rem" }}>
            These Terms of Use govern your access to and use of the Humankind platform and services. Please read them carefully before using our platform.
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
            <Link href="https://app.humankind.center/ac/data-privacy-controls" style={{ color: "#0CB001", textDecoration: "none" }}>Your Privacy Controls</Link>
          </p>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}