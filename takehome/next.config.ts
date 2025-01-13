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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self';
              connect-src 'self' https://financialmodelingprep.com;
              style-src 'self' 'unsafe-inline';
              font-src 'self';
              img-src 'self' data:;
            `.replace(/\s{2,}/g, " ").trim(), // Minify the header value
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
