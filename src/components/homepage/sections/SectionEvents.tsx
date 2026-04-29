// src/components/homepage/sections/SectionEvents.tsx
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  starts_at: string | null;
  image_url: string | null;
  venue_name: string | null;
  price_label: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export function SectionEvents({ events }: { events: Event[] }) {
  return (
    <section style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="hk-eyebrow" style={{ color: "#0CB001", marginBottom: "0.75rem" }}>Upcoming</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Events & Experiences
            </h2>
          </div>
          <Link href="https://app.humankind.center/events" style={{ fontSize: "0.9375rem", color: "#0CB001", textDecoration: "none", fontWeight: 500 }}>
            View all events →
          </Link>
        </div>

        {events.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {events.map((event) => (
              <Link key={event.id} href={`https://app.humankind.center/events/${event.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1.5rem", overflow: "hidden", transition: "border-color 0.2s, background 0.2s" }} className="hk-event-hover">
                  <div style={{ height: "200px", background: "rgba(12,176,1,0.05)" }}>
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.12)", fontSize: "0.875rem" }}>No image</div>
                    )}
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    {event.starts_at && <p style={{ fontSize: "0.75rem", color: "#0CB001", fontWeight: 600, marginBottom: "0.5rem" }}>{formatDate(event.starts_at)}</p>}
                    <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.375rem" }}>{event.title}</p>
                    {event.venue_name && <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>{event.venue_name}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="hk-empty-state"><p>No upcoming events yet — check back soon.</p></div>
        )}
      </div>

      <style>{`
        .hk-event-hover:hover { border-color: rgba(255,255,255,0.12) !important; background: rgba(255,255,255,0.04) !important; }
      `}</style>
    </section>
  );
}