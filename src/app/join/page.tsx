// src/app/join/page.tsx
//
// The ad landing page (John 11/12, after angel.com: "a landing page for humankind like this page for our ads …
// a movement of a new lifestyle raising consciousness | mind - body - soul"; "airy, clean graphics (thumbnails
// from shows), not over wordy"; "once they enter the email it should commit them to the online membership").
// A wall of our live shows, conferences and events under the headline, the email box that opens the app's
// sign-up on Online Access (the Black Friday year while the sale runs), then pictures: live every week, the
// offer, the conferences, the center, mind · body · soul. Pictures, counts and the sale come from the app's
// /api/public/posters (the sale is the promo bar's, lib/promo-bar.ts there).
import type { Metadata } from "next";
import { JoinLanding, type JoinData } from "@/components/landing/join-landing";

const APP = "https://app.humankind.center";

export const metadata: Metadata = {
  title: "humankind — a new lifestyle, raising consciousness | mind · body · soul",
  description: "Live shows every week, conferences, a community and a place in Sedona. Online Access from $7 a month.",
  alternates: { canonical: "https://humankind.center/join" },
  openGraph: {
    title: "humankind — a new lifestyle, raising consciousness",
    description: "Live shows every week, conferences, a community and a place in Sedona.",
    url: "https://humankind.center/join",
    siteName: "humankind",
    images: [{ url: "/og-image.jpg" }],
  },
};

const EMPTY: JoinData = {
  replays: [], shows: [], conferences: [], events: [],
  counts: { members: 0, replays: 0, departments: 0 },
  sale: { open: false, label: "", code: "", until: "", monthPrice: 11, yearPrice: 111, yearAfter: 111, perMonth: 10, href: `${APP}/register?tier=online` },
};

async function getData(): Promise<JoinData> {
  try {
    const res = await fetch(`${APP}/api/public/posters`, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const d = await res.json();
    return {
      replays: Array.isArray(d.replays) ? d.replays : [],
      shows: Array.isArray(d.shows) ? d.shows : [],
      conferences: Array.isArray(d.conferences) ? d.conferences : [],
      events: Array.isArray(d.events) ? d.events : [],
      counts: d.counts ?? EMPTY.counts,
      sale: d.sale ?? EMPTY.sale,
    };
  } catch (err) {
    console.warn("[join] failed to load app data:", err);
    return EMPTY;
  }
}

export default async function JoinPage() {
  return <JoinLanding {...await getData()} />;
}
