// src/lib/analytics/client.ts
//
// Marketing-site analytics client.
//
// POSTs events to the app's existing /api/analytics/track endpoint
// (cross-origin, so the app must allow humankind.center via CORS).
//
// Same session ID format + event shape as the app, so events from the
// marketing site appear naturally in /admin/insights alongside app events.

const SESSION_KEY = "hk_analytics_session_id";
const APP_TRACK_URL = "https://app.humankind.center/api/analytics/track";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server";
  let id: string | null = null;
  try {
    id = window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    try {
      window.sessionStorage.setItem(SESSION_KEY, id);
    } catch {
      // ignore (some incognito modes block sessionStorage)
    }
  }
  return id;
}

/**
 * Send an analytics event. Fire-and-forget — never throws to the caller.
 */
export async function trackEvent(
  eventName: string,
  category: string,
  properties: Record<string, unknown>,
  source?: string
): Promise<void> {
  const payload = {
    event_name: eventName,
    event_category: category,
    properties,
    source,
    session_id: getOrCreateSessionId(),
  };

  try {
    await fetch(APP_TRACK_URL, {
      method: "POST",
      mode: "cors",
      credentials: "include", // send cookies — lets the app identify logged-in user if cookie shared
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (err) {
    console.warn("[analytics] track error:", err);
  }
}

/**
 * Convenience: track a page_view event with current page metadata.
 */
export function trackPageView(extras: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  trackEvent(
    "page.view",
    "navigation",
    {
      path: window.location.pathname,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || null,
      site: "marketing",
      ...extras,
    },
    "humankind.center"
  );
}
