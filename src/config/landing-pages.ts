export type LandingSlide = {
  label: string;
  eyebrow: string;
  title: string;
  body: string;
};

export type LandingSection = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export type LandingPageConfig = {
  slug: string;
  analyticsKey: string;
  metaTitle: string;
  metaDescription: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  body: string;
  note: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  installPrompt: {
    title: string;
    body: string;
  };
  slides: LandingSlide[];
  sections: LandingSection[];
  proof: Array<{ value: string; label: string }>;
};

const APP_URL = "https://app.humankind.center";

export const landingPages: LandingPageConfig[] = [
  {
    slug: "app",
    analyticsKey: "hi_app",
    metaTitle: "humankind app",
    metaDescription: "Join humankind for live streams, events, departments, community updates, and member experiences.",
    navLabel: "humankind",
    eyebrow: "Live events, shows, and community",
    headline: "Open humankind wherever you are.",
    body: "Watch live broadcasts, follow departments, join events, save shows, and stay connected to the Sedona community from one calm app experience.",
    note: "Create a free account first. Upgrade only when a membership experience is right for you.",
    primaryCta: {
      label: "Create free account",
      href: `${APP_URL}/register?source=hi_app`,
    },
    secondaryCta: {
      label: "Explore media",
      href: `${APP_URL}/media?source=hi_app`,
    },
    installPrompt: {
      title: "humankind",
      body: "Install the app for faster access to live streams, event reminders, and community updates.",
    },
    slides: [
      {
        label: "Media",
        eyebrow: "Live now",
        title: "Watch live streams and replays",
        body: "Follow the shows you care about and get notified when they go live.",
      },
      {
        label: "Departments",
        eyebrow: "Community voice",
        title: "Follow departments",
        body: "Departments organize communication, proposals, events, and shared interests.",
      },
      {
        label: "Profile",
        eyebrow: "Your library",
        title: "Save your place",
        body: "Continue watching, manage notifications, and keep your community activity together.",
      },
    ],
    sections: [
      {
        eyebrow: "One place to begin",
        title: "Follow the parts of humankind that matter to you.",
        body: "Departments help the community stay organized. Follow the ones you care about to receive posts, livestreams, events, and proposal updates.",
        points: ["Live streams and replays", "Department posts and proposals", "Events and reminders", "Personal library and watchlist"],
      },
      {
        eyebrow: "Built for return visits",
        title: "A simple path from discovering something to staying connected.",
        body: "Marketing campaigns can send people here, then track whether they create an account, install the app, follow a department, or return for a show.",
        points: ["Campaign source tracking", "App signup attribution", "Install prompt", "Klaviyo-ready lifecycle signals"],
      },
    ],
    proof: [
      { value: "24/7", label: "broadcast channel" },
      { value: "free", label: "account start" },
      { value: "live", label: "events and shows" },
    ],
  },
  {
    slug: "creator-collab",
    analyticsKey: "hi_creator_collab",
    metaTitle: "humankind creator collab",
    metaDescription: "Partner with humankind as an influencer, creator, show host, or community connector.",
    navLabel: "humankind partners",
    eyebrow: "Creator and partner program",
    headline: "Bring your audience into a living community.",
    body: "humankind gives creators, show hosts, and community partners a home for live events, departments, affiliate referrals, and ongoing member connection.",
    note: "Affiliate access is available for online and full members.",
    primaryCta: {
      label: "Join as a partner",
      href: `${APP_URL}/register?source=hi_creator_collab&intent=affiliate`,
    },
    secondaryCta: {
      label: "See humankind",
      href: `${APP_URL}/media?source=hi_creator_collab`,
    },
    installPrompt: {
      title: "humankind partners",
      body: "Install humankind to keep events, referrals, departments, and shows close at hand.",
    },
    slides: [
      {
        label: "Affiliate",
        eyebrow: "Referral tracking",
        title: "Share your humankind link",
        body: "Invite people into humankind and keep your referrals connected to your account.",
      },
      {
        label: "Shows",
        eyebrow: "Live programming",
        title: "Build around real shows",
        body: "Use live streams, replays, and departments to keep people coming back.",
      },
      {
        label: "Events",
        eyebrow: "In-person connection",
        title: "Turn attention into attendance",
        body: "Promote events, workshops, livestreams, and community experiences.",
      },
    ],
    sections: [
      {
        eyebrow: "Why partner",
        title: "Creators need more than a post. They need a place people can return to.",
        body: "A humankind partner can send their audience to shows, events, departments, and community conversations instead of a one-time link.",
        points: ["Affiliate referrals", "Show and event promotion", "Department communities", "Campaign performance tracking"],
      },
      {
        eyebrow: "How it grows",
        title: "Every campaign can become a measurable relationship.",
        body: "Track the landing page, app signup, department follow, event interest, and membership path so your campaigns get sharper over time.",
        points: ["UTM-aware links", "Klaviyo segmentation", "Member lifecycle campaigns", "Admin page monitoring"],
      },
    ],
    proof: [
      { value: "10-20%", label: "affiliate tiers" },
      { value: "shows", label: "live and replay" },
      { value: "events", label: "online and local" },
    ],
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug) ?? null;
}
