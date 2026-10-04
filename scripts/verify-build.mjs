import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = JSON.parse(
  fs.readFileSync(path.join(root, "src/prerender/staticRoutes.json"), "utf8"),
);
const publishedPolicies = new Set(["/privacy", "/terms", "/cookies"]);
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
  assert.equal(
    (html.match(/<script\b[^>]*type="application\/ld\+json"/g) ?? []).length,
    1,
    `${route}: missing or duplicate structured data`,
  );
  assert.match(
    html.slice(html.indexOf('<div id="root"')),
    /<script\b[^>]*type="application\/ld\+json"/,
    `${route}: structured data must remain in the React tree for hydration`,
  );
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
  const photoTags = [...main.matchAll(/<img\b[^>]*\bsrc="(\/assets\/photos\/[^"]+)"[^>]*>/g)];
  const photoPaths = photoTags.map((match) => match[1]);
  assert.equal(
    new Set(photoPaths).size,
    photoPaths.length,
    `${route}: repeats a photograph within the page`,
  );
  for (const [tag, src] of photoTags) {
    assert(fs.existsSync(path.join(root, "dist", src)), `${route}: missing photo ${src}`);
    assert.match(tag, /\balt="[^"]+"/, `${route}: photo description missing for ${src}`);
    assert.match(tag, /\bwidth="\d+"/, `${route}: intrinsic photo width missing for ${src}`);
    assert.match(tag, /\bheight="\d+"/, `${route}: intrinsic photo height missing for ${src}`);
  }
  if (publishedPolicies.has(route))
    assert.doesNotMatch(html, /content="noindex/, `${route}: published policy must be indexable`);
}

const scripts = fs
  .readdirSync(path.join(root, "dist/assets"))
  .filter((file) => file.endsWith(".js"));
assert(
  scripts.length > 5,
  "Expected separate route chunks rather than one eager application bundle",
);
console.log(
  `Verified ${routes.length} complete prerendered routes, distinct local page photos, and ${scripts.length} JavaScript chunks.`,
);
