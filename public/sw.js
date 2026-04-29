// public/sw.js
// 
// Service worker for humankind PWA.
//
// What it does today:
//   - Registers and activates immediately (claims existing tabs)
//   - Skips waiting on update so new versions take effect quickly
//   - Provides offline fallback for navigation requests (shows offline page)
//   - Does NOT aggressively cache app shell — Next.js handles that via
//     standard HTTP caching, and we don't want a stale UI
//
// What it will support later:
//   - Push notifications (push event handler stub below)
//   - Background sync (if needed)
//
// Versioning: bump CACHE_VERSION when we change SW logic so old SW gets replaced.

const CACHE_VERSION = "v1";
const OFFLINE_CACHE = `humankind-offline-${CACHE_VERSION}`;

// Resources that should be available offline
const OFFLINE_URLS = [
  "/offline.html",
  "/icons/icon-192.png",
];

// Install: cache offline assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches, claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("humankind-") && k !== OFFLINE_CACHE)
            .map((k) => caches.delete(k))
        )
      ),
      self.clients.claim(),
    ])
  );
});

// Fetch: network-first for navigation, fall back to offline page if offline
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle navigation requests (HTML page loads)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/offline.html").then((r) => r || new Response("Offline", { status: 503 }))
      )
    );
  }
  // For all other requests (API, JS, CSS, images), let the browser handle it normally
});

// ────────────────────────────────────────────────────────────────────────
// Push notification stubs — wired up later
// ────────────────────────────────────────────────────────────────────────

self.addEventListener("push", (event) => {
  // Will be implemented in the push notifications batch
  if (!event.data) return;
  
  try {
    const payload = event.data.json();
    event.waitUntil(
      self.registration.showNotification(payload.title || "humankind", {
        body: payload.body || "",
        icon: payload.icon || "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        tag: payload.tag,
        data: payload.data || {},
      })
    );
  } catch {
    // ignore malformed push payloads
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      // If a tab is already open, focus it
      for (const client of clients) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open new tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
