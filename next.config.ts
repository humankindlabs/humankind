import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "f.vimeocdn.com" },
      { protocol: "https", hostname: "files.stripe.com" },
      { protocol: "https", hostname: "humankind.center" },
      { protocol: "https", hostname: "app.humankind.center" },
    ],
  },


async redirects() {
    return [
      // Pages migrated to marketing site (humankind.center)
      {
        source: "/events",
        destination: "https://app.humankind.center/events",
        permanent: true,
      },
      {
        source: "/tv",
        destination: "https://app.humankind.center/media",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "https://humankind.center/what-is-humankind",
        permanent: true,
      },
      {
        source: "/terms-of-use",
        destination: "https://humankind.center/terms",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "https://app.humankind.center/register",
        permanent: true,
      },
      // Auth lives on the app subdomain — bounce these off the marketing root.
      {
        source: "/register",
        destination: "https://app.humankind.center/register",
        permanent: false,
      },
      {
        source: "/login",
        destination: "https://app.humankind.center/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
