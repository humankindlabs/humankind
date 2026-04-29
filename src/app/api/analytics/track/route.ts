// src/app/api/analytics/track/route.ts
//
// Single endpoint for receiving analytics events from the client.
//
// Pipeline:
//   1. Parse and validate request body
//   2. Identify user (auth) and session
//   3. Hash IP (never store raw)
//   4. Detect device type from UA
//   5. Lookup user_tier for snapshot
//   6. Run event through validators against the registry
//   7. In strict mode + invalid: quarantine to analytics_unknown_events
//   8. In strict mode + valid OR loose mode: write to analytics_events
//   9. Fan out to all configured destinations
//
// CORS: marketing site at https://humankind.center can post events here too.
// Their events appear alongside app events in /admin/insights, tagged
// with source: "humankind.center" so you can filter by source.

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { validateEvent } from "@/lib/analytics/validators";
import { dispatch } from "@/lib/analytics/destinations";
import { getAnalyticsMode, getEnvironment, getIpSalt } from "@/lib/analytics/env";
import type { AnalyticsEventPayload, ValidatedEvent } from "@/lib/analytics/types";

export const dynamic = "force-dynamic";

// ── CORS ─────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  "https://humankind.center",
  "https://www.humankind.center",
  // Local dev for the marketing site
  "http://localhost:3000",
  "http://localhost:3001",
]);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  let payload: AnalyticsEventPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: cors });
  }

  // Basic shape check — even loose mode requires these
  if (!payload.event_name || typeof payload.event_name !== "string") {
    return NextResponse.json({ error: "event_name required" }, { status: 400, headers: cors });
  }
  if (!payload.event_category || typeof payload.event_category !== "string") {
    return NextResponse.json({ error: "event_category required" }, { status: 400, headers: cors });
  }
  if (!payload.properties || typeof payload.properties !== "object") {
    payload.properties = {};
  }

  // ── Identify user (best-effort, anonymous OK) ──────────────────────────
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userTier: string | undefined;
  if (user) {
    const admin = createSupabaseAdminClient();
    const { data: membership } = await admin
      .from("memberships")
      .select("tier")
      .eq("user_id", user.id)
      .maybeSingle();
    userTier = membership?.tier ?? "free";
  }

  // ── Request context ────────────────────────────────────────────────────
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const ip = getRequestIp(request);
  const ipHash = ip ? hashIp(ip) : undefined;
  const device = detectDevice(userAgent);
  const environment = getEnvironment();

  // ── Validate against registry ──────────────────────────────────────────
  const validation = validateEvent(payload);
  const mode = getAnalyticsMode();

  if (!validation.valid && mode === "loose") {
    console.warn(
      `[analytics] event "${payload.event_name}" failed validation in loose mode:`,
      validation,
    );
  }

  // ── Build the validated event for dispatch ─────────────────────────────
  const event: ValidatedEvent = {
    ...payload,
    user_id: user?.id,
    ip_hash: ipHash,
    user_agent: userAgent,
    device,
    user_tier: userTier,
    environment,
  };

  const effectiveValidation =
    !validation.valid && mode === "loose"
      ? { valid: true as const, spec: { category: payload.event_category as any, version: 1, description: "[unregistered]", properties: {} } }
      : validation;

  await dispatch(event, effectiveValidation);

  let eventId: string | null = null;
  if (effectiveValidation.valid) {
    const admin = createSupabaseAdminClient();
    const { data } = await admin
      .from("analytics_events")
      .select("id")
      .eq("event_name", payload.event_name)
      .eq("user_id", user?.id ?? null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    eventId = data?.id ?? null;
  }

  return NextResponse.json({ ok: true, event_id: eventId }, { headers: cors });
}

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────

function getRequestIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return null;
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip + getIpSalt()).digest("hex").slice(0, 32);
}

function detectDevice(ua?: string): string | undefined {
  if (!ua) return undefined;
  const lower = ua.toLowerCase();
  if (/mobi|android|iphone/.test(lower) && !/ipad|tablet/.test(lower)) return "mobile";
  if (/ipad|tablet/.test(lower)) return "tablet";
  return "desktop";
}
