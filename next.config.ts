import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isStaticExport = process.env.STATIC_EXPORT === "true" || isGithubActions;

// When building for GitHub Pages (https://<username>.github.io/<repo>/),
// basePath is required unless a custom domain is configured.
const repoName = "adhiraj-portfolio";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        basePath: basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
