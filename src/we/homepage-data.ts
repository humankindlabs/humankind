const APP_URL = "https://app.humankind.center";

export type HomepageEvent = {
  id: string;
  title: string;
  starts_at: string | null;
  image_url: string | null;
  venue_name: string | null;
  price_label: string | null;
};

export type HomepageBroadcast = {
  enabled: boolean;
  isLive: boolean;
  thumbnail: string | null;
  videoId: string | null;
  nowPlaying: string;
};

const EMPTY_BROADCAST: HomepageBroadcast = {
  enabled: true,
  isLive: false,
  thumbnail: null,
  videoId: null,
  nowPlaying: "Humankind Broadcast",
};

export async function getHomepageData(): Promise<{
  events: HomepageEvent[];
  broadcast: HomepageBroadcast;
}> {
  try {
    const res = await fetch(`${APP_URL}/api/public/homepage-data`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`status ${res.status}`);

    const data = await res.json();
    return {
      events: Array.isArray(data.events) ? data.events : [],
      broadcast: data.broadcast ?? EMPTY_BROADCAST,
    };
  } catch (err) {
    console.warn("[geo-pages] failed to load app data:", err);
    return { events: [], broadcast: EMPTY_BROADCAST };
  }
}
