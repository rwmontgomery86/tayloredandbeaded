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
      // The Edit moved to its own top-level page; the general collections
      // index was retired in favor of the shop.
      {
        source: "/collections/the-edit",
        destination: "/the-edit",
        permanent: true,
      },
      {
        source: "/collections/:slug*",
        destination: "/shop",
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
