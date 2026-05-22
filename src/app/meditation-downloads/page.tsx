// src/app/meditation-downloads/page.tsx
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { MeditationsList } from "@/components/meditations/MeditationsList";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Meditation Music",
  description:
    "Stream continuous meditation music from humankind, or download tracks for offline practice.",
};

const APP_URL = "https://app.humankind.center";

type Meditation = {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
};

async function getMeditations(): Promise<Meditation[]> {
  try {
    const res = await fetch(`${APP_URL}/api/public/meditations`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.meditations) ? data.meditations : [];
  } catch {
    return [];
  }
}

async function getCurrentUserEmail(): Promise<string | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.email ?? null;
  } catch {
    return null;
  }
}

export default async function MeditationDownloadsPage() {
  const [meditations, userEmail] = await Promise.all([
    getMeditations(),
    getCurrentUserEmail(),
  ]);

  return (
    <div
      style={{
        background: "#00031C",
        color: "#fff",
        minHeight: "100dvh",
        fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
        overflowX: "hidden",
      }}
    >
      <MarketingNav />

      <section
        style={{
          padding: "4.5rem 2rem 2rem",
          textAlign: "left",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(12,176,1,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "1320px", margin: "0 auto" }}>
          <p
            className="hk-eyebrow"
            style={{ color: "#0CB001", marginBottom: "1rem" }}
          >
            Audio library
          </p>
          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
              color: "#fff",
            }}
          >
            Meditation Music
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            Press the artwork to play, keep the bottom player open, and let the
            library continue into the next track. Downloads are available after
            sign-in or by joining the mailing list.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 2rem 6rem" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <MeditationsList
            meditations={meditations}
            userEmail={userEmail}
          />
        </div>
      </section>

      <HomepageFooter />
    </div>
  );
}
