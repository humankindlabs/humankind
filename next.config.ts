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
};

export default nextConfig;
