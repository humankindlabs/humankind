// src/components/tracking-scripts.tsx
//
// Loads Google Analytics 4 + Meta Pixel from env vars.
// Mirrors the app's TrackingScripts behavior, but reads from public env vars
// since the marketing site doesn't have admin DB access.
//
// Set these in Vercel env vars (and .env.local for local dev):
//   NEXT_PUBLIC_GA4_MEASUREMENT_ID  (e.g. "G-XXXXXXXXXX")
//   NEXT_PUBLIC_GOOGLE_ADS_ID       (e.g. "AW-XXXXXXXXX") — optional
//   NEXT_PUBLIC_VIBE_PIXEL_ID       (e.g. "AM4uvC")       — optional, defaults to prod pixel
//   NEXT_PUBLIC_FB_PIXEL_ID         (e.g. "1234567890")    — optional
//
// Get current values from the app's settings table (key=ga4_measurement_id, etc.)

import Script from "next/script";

export function TrackingScripts() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  const gAds = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const fbPixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID?.trim();
  // Pixel IDs are public (they ship in page source), so a hardcoded default is safe.
  const vibePixel = (process.env.NEXT_PUBLIC_VIBE_PIXEL_ID ?? "AM4uvC").trim();
  const oaiPixel = (process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID ?? "AgvVnbBb92iZRzPVr4VYQZ").trim();

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4}');
            ${gAds ? `gtag('config', '${gAds}');` : ""}
          `}</Script>
        </>
      )}

      {/* Meta Pixel */}
      {fbPixel && (
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${fbPixel}');
          fbq('track', 'PageView');
        `}</Script>
      )}

      {/* Vibe.co Pixel */}
      {vibePixel && (
        <Script id="vibe-pixel" strategy="afterInteractive">{`
          !function(v,i,b,e,c,o){if(!v[c]){var s=v[c]=function(){s.process?s.process.apply(s,arguments):s.queue.push(arguments)};s.queue=[],s.b=1*new Date;var t=i.createElement(b);t.async=!0,t.src=e;var n=i.getElementsByTagName(b)[0];n.parentNode.insertBefore(t,n)}}(window,document,"script","https://s.vibe.co/vbpx.js","vbpx");
          vbpx('init', '${vibePixel}');
          vbpx('event', 'page_view');
        `}</Script>
      )}

      {/* OpenAI (ChatGPT Ads) Pixel */}
      {oaiPixel && (
        <Script id="oai-pixel" strategy="afterInteractive">{`
          !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
          oaiq("init",{pixelId:"${oaiPixel}"});
        `}</Script>
      )}
    </>
  );
}
