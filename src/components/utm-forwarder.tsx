"use client";
import { useEffect } from "react";

const KEY = "hk_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/**
 * Marketing site → app attribution bridge. localStorage doesn't cross domains,
 * so we stash first-touch UTMs AND the original external referrer (Google,
 * Facebook, …) here and append them to any outbound app.humankind.center link
 * the visitor clicks (referrer travels as ?hk_ref=). The app then persists
 * them onto the account at signup — so a member who found humankind.center
 * via a Google search shows as Google search, not "ref: humankind.center".
 */
export function UtmForwarder() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) found[k] = v.slice(0, 120);
      }
      const ref = document.referrer;
      if (ref && !ref.includes(window.location.hostname)) {
        found.hk_ref = ref.slice(0, 300);
      }
      if (Object.keys(found).length && !window.sessionStorage.getItem(KEY)) {
        window.sessionStorage.setItem(KEY, JSON.stringify(found));
      }
    } catch { /* storage unavailable */ }

    const decorate = (e: MouseEvent) => {
      try {
        const a = (e.target as HTMLElement | null)?.closest?.("a");
        if (!a?.href || !a.href.includes("app.humankind.center")) return;
        const raw = window.sessionStorage.getItem(KEY);
        if (!raw) return;
        const utm = JSON.parse(raw) as Record<string, string>;
        const url = new URL(a.href);
        for (const [k, v] of Object.entries(utm)) {
          if (!url.searchParams.has(k)) url.searchParams.set(k, v);
        }
        a.href = url.toString();
      } catch { /* leave link untouched */ }
    };
    document.addEventListener("click", decorate, true);
    return () => document.removeEventListener("click", decorate, true);
  }, []);
  return null;
}
