const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Building Next.js static export for GitHub Pages...");
execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "true" },
});

// Ensure .nojekyll exists in out/ so GitHub Pages doesn't ignore _next folder
const outDir = path.join(__dirname, "..", "out");
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
  console.log("✓ Created out/.nojekyll (prevents GitHub Pages from ignoring _next folder)");
}
