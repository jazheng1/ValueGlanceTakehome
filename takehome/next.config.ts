import type { NextConfig } from "next";

const nextConfig = {
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    basePath: "/ValueGlanceTakehome",
  }),
};

module.exports = nextConfig;