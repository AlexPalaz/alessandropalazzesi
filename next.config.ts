import type { NextConfig } from "next";

// GitHub Pages serves the site from a sub-path (/alessandropalazzesi). The
// deploy workflow passes it in; local runs use the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // A fully static site: `npm run build` writes plain files to `out/`.
  output: "export",
  basePath,
  // /it/ and /en/ are folders with an index.html, which is what Pages serves.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
