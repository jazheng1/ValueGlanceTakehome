import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  trailingSlash: true, // Required for GitHub Pages
  images: {
    unoptimized: true, // Necessary for static export
  },
  basePath: "/ValueGlanceTakehome", // Replace with your repository name
};

module.exports = nextConfig;
export default nextConfig;