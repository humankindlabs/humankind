// src/app/join/page.tsx
//
// The ad landing page (John 11/12, after angel.com: "a landing page for humankind like this page for our ads …
// what humankind offers and how we are a movement of a new lifestyle raising consciousness | mind - body - soul").
// A wall of our own show pictures, the email box, the seven rooms (the app's lib/lifestyle/rooms.ts through its
// public feed), the three plans, the mind-body-soul movement, and the library. The pictures and the counts come
// from the app's /api/public/posters.
import type { Metadata } from "next";
import { JoinLanding, type Poster, type Room } from "@/components/landing/join-landing";

const APP = "https://app.humankind.center";

export const metadata: Metadata = {
  title: "humankind — a new lifestyle, raising consciousness | mind · body · soul",
  description: "Live shows, a community, a place in Sedona and a movement. Join humankind free and start today.",
  alternates: { canonical: "https://humankind.center/join" },
  openGraph: {
    title: "humankind — a new lifestyle, raising consciousness",
    description: "Live shows, a community, a place in Sedona and a movement. Join free and start today.",
    url: "https://humankind.center/join",
    siteName: "humankind",
    images: [{ url: "/og-image.jpg" }],
  },
};

async function getData(): Promise<{ posters: Poster[]; counts: { members: number; replays: number; departments: number }; rooms: Room[] }> {
  const out = { posters: [] as Poster[], counts: { members: 0, replays: 0, departments: 0 }, rooms: [] as Room[] };
  try {
    const [p, r] = await Promise.all([
      fetch(`${APP}/api/public/posters`, { next: { revalidate: 600 } }).then((x) => (x.ok ? x.json() : null)),
      fetch(`${APP}/api/public/lifestyle`, { next: { revalidate: 600 } }).then((x) => (x.ok ? x.json() : null)),
    ]);
    if (p && Array.isArray(p.posters)) { out.posters = p.posters; out.counts = p.counts ?? out.counts; }
    if (r && Array.isArray(r.rooms)) out.rooms = r.rooms;
  } catch (err) {
    console.warn("[join] failed to load app data:", err);
  }
  return out;
}

export default async function JoinPage() {
  const data = await getData();
  return <JoinLanding {...data} />;
}
