import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/shop",
        has: [{ type: "query", key: "category", value: "anklets" }],
        destination: "/shop?category=all",
        permanent: true,
      },
      // Retired anklet product pages: preserve old links instead of 404ing.
      {
        source: "/shop/seashore-anklet",
        destination: "/shop?category=all",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
