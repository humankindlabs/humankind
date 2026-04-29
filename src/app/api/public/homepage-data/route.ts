// src/app/api/public/homepage-data/route.ts
//
// Public homepage data feed for the marketing site (humankind.center).
// Returns: { events: [...], broadcast: {...} }
//
// CORS-allowed for humankind.center (and localhost during dev).
// Bypasses RLS via the admin client — but only returns whitelisted public
// fields, never any sensitive user data.

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ── CORS ─────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  "https://humankind.center",
  "https://www.humankind.center",
  "http://localhost:3000",
  "http://localhost:3001",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

// ── Handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  try {
    const admin = createSupabaseAdminClient();

    // Fetch events + broadcast settings + first queue item in parallel
    const [eventsR, settingsR, queueR] = await Promise.all([
      admin
        .from("events")
        .select("id, title, starts_at, image_url, venue_name, price_label")
        .eq("sync_status", "active")
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(3),
      admin
        .from("settings")
        .select("key, value")
        .in("key", ["broadcast_enabled", "active_livestream_id"]),
      admin
        .from("broadcast_queue")
        .select("video_id, thumbnail, title")
        .eq("content_type", "content")
        .order("sort_order", { ascending: true })
        .limit(1),
    ]);

    const events = eventsR.data ?? [];

    const settingsMap = Object.fromEntries(
      (settingsR.data ?? []).map((s) => [s.key, s.value])
    );
    const firstVideo = queueR.data?.[0] ?? null;

    const broadcast = {
      enabled: settingsMap.broadcast_enabled !== "false",
      isLive: !!settingsMap.active_livestream_id,
      thumbnail: firstVideo?.thumbnail ?? null,
      videoId: firstVideo?.video_id ?? null,
      nowPlaying: firstVideo?.title ?? "Humankind Broadcast",
    };

    return NextResponse.json(
      { events, broadcast },
      {
        headers: {
          ...cors,
          "Cache-Control": "public, max-age=60, s-maxage=60",
        },
      }
    );
  } catch (err) {
    console.error("[homepage-data]", err);
    return NextResponse.json(
      {
        events: [],
        broadcast: {
          enabled: true,
          isLive: false,
          thumbnail: null,
          videoId: null,
          nowPlaying: "Humankind Broadcast",
        },
      },
      { status: 200, headers: cors }
    );
  }
}
