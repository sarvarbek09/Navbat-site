import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Development cache: max 200 MB, 14 days expiry
      config.cache = {
        type: "filesystem",
        maxMemoryGenerations: 1,
        memoryCacheUnaffected: false,
        compression: "gzip",
        store: "pack",
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
