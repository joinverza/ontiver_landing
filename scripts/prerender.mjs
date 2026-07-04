#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createServer} from "vite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const templatePath = path.join(DIST, "index.html");

async function main() {
  if (!fs.existsSync(templatePath)) throw new Error("dist/index.html not found");
  const template = fs.readFileSync(templatePath, "utf8");
  const vite = await createServer({
    root: ROOT,
    mode: "production",
    server: {middlewareMode: true, hmr: false, watch: null},
    optimizeDeps: {noDiscovery: true},
    appType: "custom",
    logLevel: "warn",
  });

  let written = 0;
  try {
    const {prerenderRoutes} = await vite.ssrLoadModule("/src/prerender/routes.tsx");
    const {renderRoute, injectIntoTemplate} = await vite.ssrLoadModule("/src/prerender/render.tsx");
    for (const route of prerenderRoutes) {
      try {
        const rendered = renderRoute(route);
        writeRoute(injectIntoTemplate(template, rendered), route.path);
        written += 1;
      } catch (error) {
        console.warn(`prerender skipped ${route.path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  } finally {
    await vite.close();
  }
  console.log(`prerendered ${written} routes`);
  if (written !== 18) throw new Error(`expected 18 routes, wrote ${written}`);
}

function writeRoute(html, routePath) {
  const relative = routePath === "/" ? "index.html" : path.join(routePath.slice(1), "index.html");
  const output = path.join(DIST, relative);
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, html, "utf8");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`prerender failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
