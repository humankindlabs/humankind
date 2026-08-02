// "The best of humankind" showcase with a LIGHTBOX: click any tile to open a
// fullscreen gallery (YouTube embeds, mp4 videos, images) with prev/next and
// keyboard navigation.
"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryItem =
  | { type: "youtube"; id: string; thumb: string; label?: string }
  | { type: "video"; src: string; thumb?: string; label?: string }
  | { type: "image"; src: string; label?: string };

export function ShowcaseGallery({ items }: { items: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const step = useCallback((dir: -1 | 1) => {
    setOpenIdx((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, step]);

  const tileStyle: React.CSSProperties = {
    width: "100%", height: "210px", objectFit: "cover", display: "block",
    cursor: "pointer", transition: "transform 0.6s",
  };

  function thumbFor(item: GalleryItem): string {
    if (item.type === "youtube") return item.thumb;
    if (item.type === "video") return item.thumb ?? "";
    return item.src;
  }

  const current = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <div className="hk-fm-showcase" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", borderRadius: "16px", overflow: "hidden" }}>
        {items.map((item, i) => (
          <button key={i} type="button" onClick={() => setOpenIdx(i)}
                  aria-label={item.label ?? "Open media"}
                  style={{ position: "relative", padding: 0, border: "none", background: "none", gridColumn: i === 0 || i === items.length - 1 ? "span 2" : undefined }}>
            {item.type === "video" && !item.thumb ? (
              <video autoPlay muted loop playsInline preload="metadata" src={item.src} style={tileStyle} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbFor(item)} alt={item.label ?? ""} loading="lazy" style={tileStyle} className="hk-fm-shot" />
            )}
            {(item.type === "youtube" || item.type === "video") && (
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <span style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(0,3,28,0.72)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem", paddingLeft: "4px" }}>▶</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Media viewer"
             onClick={(e) => { if (e.target === e.currentTarget) setOpenIdx(null); }}
             style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,3,28,0.92)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <button type="button" aria-label="Close" onClick={() => setOpenIdx(null)}
                  style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "1.8rem", cursor: "pointer", lineHeight: 1, zIndex: 2 }}>✕</button>
          <button type="button" aria-label="Previous" onClick={() => step(-1)}
                  style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.3rem", zIndex: 2 }}>‹</button>
          <button type="button" aria-label="Next" onClick={() => step(1)}
                  style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.3rem", zIndex: 2 }}>›</button>

          <div style={{ width: "min(1100px, 100%)", aspectRatio: "16/9", maxHeight: "82vh" }}>
            {current.type === "youtube" ? (
              <iframe
                key={`yt-${openIdx}`}
                src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`}
                title={current.label ?? "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px", background: "#000" }}
              />
            ) : current.type === "video" ? (
              <video key={`v-${openIdx}`} src={current.src} controls autoPlay playsInline
                     style={{ width: "100%", height: "100%", borderRadius: "12px", background: "#000" }} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.src} alt={current.label ?? ""}
                   style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "12px" }} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
