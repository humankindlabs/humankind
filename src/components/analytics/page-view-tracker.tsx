// src/components/analytics/page-view-tracker.tsx
//
// Client component that fires a page_view event when the route changes.
// Mounted once in the root layout. Fire-and-forget — never blocks UI.

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/client";

export function PageViewTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    // Wait one tick so document.title reflects the current page
    const t = setTimeout(() => trackPageView(), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search?.toString()]);

  return null;
}
