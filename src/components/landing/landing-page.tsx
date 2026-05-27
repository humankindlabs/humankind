"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HomepageFooter } from "@/components/homepage/HomepageFooter";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import type { LandingPageConfig } from "@/config/landing-pages";
import { trackEvent } from "@/lib/analytics/client";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function platformLabel() {
  if (typeof navigator === "undefined") return "web";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "web";
}

function getStoreLink(platform: string) {
  if (platform === "ios") return "https://apps.apple.com/app/id6768877565";
  if (platform === "android") return "https://play.google.com/store/apps/details?id=center.humankind.app";
  return "https://app.humankind.center";
}

function trackLandingAction(page: LandingPageConfig, action: string, destination?: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  void trackEvent(
    "landing.cta_click",
    "marketing",
    {
      landing_page: page.analyticsKey,
      action,
      destination: destination ?? null,
      path: window.location.pathname,
      url: window.location.href,
      referrer: document.referrer || null,
      platform: platformLabel(),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    },
    "humankind.center"
  );
}

function PhonePreview({ page }: { page: LandingPageConfig }) {
  const [index, setIndex] = useState(0);
  const slide = page.slides[index] ?? page.slides[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % page.slides.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [page.slides.length]);

  return (
    <div className="hk-landing-phone" aria-label="humankind app preview">
      <div className="hk-landing-phone__notch" />
      <div className="hk-landing-phone__screen">
        <div className="hk-landing-phone__top">
          <img src="/humankind-1024x1024.png" alt="" />
          <span>humankind</span>
        </div>
        <div className="hk-landing-phone__card">
          <p>{slide.eyebrow}</p>
          <h2>{slide.title}</h2>
          <span>{slide.body}</span>
        </div>
        <div className="hk-landing-phone__list">
          {page.slides.map((item, itemIndex) => (
            <button
              key={item.label}
              type="button"
              className={itemIndex === index ? "is-active" : ""}
              onClick={() => setIndex(itemIndex)}
            >
              <span>{item.label}</span>
              <small>{item.eyebrow}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstallPrompt({ page }: { page: LandingPageConfig }) {
  const [dismissed, setDismissed] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const platform = useMemo(() => platformLabel(), []);
  const href = getStoreLink(platform);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (dismissed) return null;

  async function install() {
    trackLandingAction(page, "install_prompt", href);
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice.catch(() => null);
      setInstallPrompt(null);
      return;
    }
    window.location.href = href;
  }

  return (
    <div className="hk-landing-install" role="dialog" aria-label="Install humankind">
      <img src="/humankind-1024x1024.png" alt="" />
      <div>
        <strong>{page.installPrompt.title}</strong>
        <p>{page.installPrompt.body}</p>
        <div className="hk-landing-install__actions">
          <button type="button" onClick={install}>Install</button>
          <button type="button" onClick={() => setDismissed(true)}>Later</button>
        </div>
      </div>
    </div>
  );
}

export function LandingPage({ page }: { page: LandingPageConfig }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    void trackEvent(
      "landing.page_view",
      "marketing",
      {
        landing_page: page.analyticsKey,
        path: window.location.pathname,
        url: window.location.href,
        title: document.title,
        referrer: document.referrer || null,
        platform: platformLabel(),
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      },
      "humankind.center"
    );
  }, [page.analyticsKey]);

  return (
    <main className="hk-landing">
      <MarketingNav />
      <section className="hk-landing-hero">
        <div className="hk-landing-hero__copy">
          <p className="hk-landing-eyebrow">{page.eyebrow}</p>
          <h1>{page.headline}</h1>
          <p className="hk-landing-lede">{page.body}</p>
          <p className="hk-landing-note">{page.note}</p>
          <div className="hk-landing-actions">
            <Link className="hk-btn hk-btn-primary" href={page.primaryCta.href} onClick={() => trackLandingAction(page, "primary_cta", page.primaryCta.href)}>
              {page.primaryCta.label}
            </Link>
            <Link className="hk-btn hk-btn-secondary" href={page.secondaryCta.href} onClick={() => trackLandingAction(page, "secondary_cta", page.secondaryCta.href)}>
              {page.secondaryCta.label}
            </Link>
          </div>
          <div className="hk-landing-proof">
            {page.proof.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <PhonePreview page={page} />
      </section>

      <section className="hk-landing-sections">
        {page.sections.map((section) => (
          <article key={section.title} className="hk-landing-section">
            <div>
              <p className="hk-landing-eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <HomepageFooter />
      <InstallPrompt page={page} />
    </main>
  );
}
