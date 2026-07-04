import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = JSON.parse(fs.readFileSync(path.join(root, "src/prerender/staticRoutes.json"), "utf8"));
const publicDir = path.join(root, "public");
const baseUrl = "https://ontiver.com";

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(({path: routePath}) => [
    "  <url>",
    `    <loc>${baseUrl}${routePath === "/" ? "/" : routePath}</loc>`,
    `    <changefreq>${routePath.startsWith("/blog/") ? "monthly" : "weekly"}</changefreq>`,
    `    <priority>${routePath === "/" ? "1.0" : routePath.startsWith("/blog/") ? "0.7" : "0.8"}</priority>`,
    "  </url>",
  ].join("\n")),
  "</urlset>",
  "",
].join("\n");

const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /portal/
Disallow: /developer/
Disallow: /cgi-bin/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);
