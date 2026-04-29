// src/components/tracking-scripts.tsx
//
// Loads Google Analytics 4 + Meta Pixel from env vars.
// Mirrors the app's TrackingScripts behavior, but reads from public env vars
// since the marketing site doesn't have admin DB access.
//
// Set these in Vercel env vars (and .env.local for local dev):
//   NEXT_PUBLIC_GA4_MEASUREMENT_ID  (e.g. "G-XXXXXXXXXX")
//   NEXT_PUBLIC_GOOGLE_ADS_ID       (e.g. "AW-XXXXXXXXX") — optional
//   NEXT_PUBLIC_FB_PIXEL_ID         (e.g. "1234567890")    — optional
//
// Get current values from the app's settings table (key=ga4_measurement_id, etc.)

import Script from "next/script";

export function TrackingScripts() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
  const gAds = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const fbPixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID?.trim();

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
    </>
  );
}
