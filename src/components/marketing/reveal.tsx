// AOS-style fly-in wrapper (the WebAI template's data-aos effects, without the
// dependency): children start offset+transparent and ease in when they enter
// the viewport. direction mirrors AOS names: "right" = fade-right (flies in
// from the left), "left" = fade-left, "up" = fade-up, "zoom" = zoom-out.
"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "zoom";
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden: Record<string, string> = {
    up: "translateY(44px)",
    right: "translateX(-56px)",
    left: "translateX(56px)",
    zoom: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : hidden[direction],
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
