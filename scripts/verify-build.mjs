import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = JSON.parse(
  fs.readFileSync(path.join(root, "src/prerender/staticRoutes.json"), "utf8"),
);
const pendingPolicies = new Set(["/privacy", "/terms", "/cookies"]);
routes.push({ path: "/pricing" });

for (const { path: route } of routes) {
  const file = path.join(root, "dist", route.slice(1), "index.html");
  const html = fs.readFileSync(file, "utf8");
  assert(html.includes(`data-prerendered-path="${route}"`), `${route}: hydration path missing`);
  assert.equal(
    (html.match(/<h1\b/g) ?? []).length,
    1,
    `${route}: missing or duplicate page heading`,
  );
  assert.equal(
    (html.match(/<main\b/g) ?? []).length,
    1,
    `${route}: missing or duplicate main landmark`,
  );
  assert.match(html, /<footer\b/, `${route}: missing footer`);
  assert.match(html, /id="main-content"/, `${route}: skip-link target missing`);
  assert.doesNotMatch(
    html,
    /Loading your page|Switched to client rendering|<!--\$!-->/,
    `${route}: published a Suspense fallback`,
  );
  assert.match(html, /rel="canonical"/, `${route}: canonical URL missing`);
  if (pendingPolicies.has(route))
    assert.match(
      html,
      /content="noindex, follow"/,
      `${route}: unpublished policy must remain noindex`,
    );
}

const scripts = fs
  .readdirSync(path.join(root, "dist/assets"))
  .filter((file) => file.endsWith(".js"));
assert(
  scripts.length > 5,
  "Expected separate route chunks rather than one eager application bundle",
);
console.log(
  `Verified ${routes.length} complete prerendered routes and ${scripts.length} JavaScript chunks.`,
);
