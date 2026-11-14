// src/app/hi/earn/page.tsx  (moved from /earn 11/14: John keeps every marketing page under /hi; /earn redirects here)
//
// The affiliate page for influencers (John 11/12: "tell them how simple it is to get set up — show the 3 levels
// Free, Online, Full — get them excited and to pick the level they want to start earning from"). The words and the
// calculator are in components/landing/earn-landing.tsx; the show pictures come from the app's /api/public/posters.
import type { Metadata } from "next";
import { EarnLanding } from "@/components/landing/earn-landing";
import type { Poster } from "@/components/landing/join-landing";

const APP = "https://app.humankind.center";

export const metadata: Metadata = {
  title: "Share humankind, get paid every month — the affiliate program",
  description: "Your link, your people. Earn 20%, 35% or 50% of every membership payment they make. Set up in a minute.",
  alternates: { canonical: "https://humankind.center/hi/earn" },
  openGraph: {
    title: "Share humankind. Get paid every month.",
    description: "Earn 20%, 35% or 50% of every membership payment your people make. Set up in a minute.",
    url: "https://humankind.center/hi/earn",
    siteName: "humankind",
    images: [{ url: "/og-image.jpg" }],
  },
};

async function getShows(): Promise<Poster[]> {
  try {
    const res = await fetch(`${APP}/api/public/posters`, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const d = await res.json();
    return Array.isArray(d.shows) ? d.shows : [];
  } catch (err) {
    console.warn("[earn] failed to load the show pictures:", err);
    return [];
  }
}

export default async function EarnPage() {
  return <EarnLanding shows={await getShows()} />;
}
