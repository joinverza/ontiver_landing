import type { ComponentType } from "react";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { getSeoMeta } from "../app/seo/metadata";

type RenderInput = {
  path: string;
  Component: ComponentType;
};

export async function renderRoute({ path, Component }: RenderInput) {
  const helmetContext: { helmet?: HelmetServerState | null } = {};
  const previous = (HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM;
  (HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = false;
  try {
    // Start piping only when every lazy route has resolved. Starting a readable
    // stream earlier can buffer the fallback and its client replacement script.
    let bodyHtml = await new Promise<string>((resolve, reject) => {
      const output = new PassThrough();
      let html = "";
      let renderError: unknown;
      output.setEncoding("utf8");
      output.on("data", (chunk: string) => {
        html += chunk;
      });
      output.once("end", () => resolve(html));
      output.once("error", reject);
      const timeout = setTimeout(() => {
        abort();
        reject(new Error(`Prerender timed out: ${path}`));
      }, 30000);
      const { pipe, abort } = renderToPipeableStream(
        <HelmetProvider context={helmetContext}>
          <MemoryRouter initialEntries={[path]}>
            <Component />
          </MemoryRouter>
        </HelmetProvider>,
        {
          // Static documents must inline complete boundaries of any size.
          progressiveChunkSize: Number.POSITIVE_INFINITY,
          onAllReady: () => {
            clearTimeout(timeout);
            if (renderError) reject(renderError);
            else pipe(output);
          },
          onError: (error) => {
            renderError = error;
          },
          onShellError: (error) => {
            clearTimeout(timeout);
            reject(error);
          },
        },
      );
    });
    const meta = getSeoMeta(path);
    const canonical = `https://ontiver.com${meta.canonicalPath === "/" ? "" : meta.canonicalPath}`;
    const escape = (value: string) =>
      value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
    const headHtml = [
      `<title data-rh="true">${escape(meta.title)}</title>`,
      `<meta data-rh="true" name="description" content="${escape(meta.description)}">`,
      `<meta data-rh="true" name="robots" content="${meta.noIndex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}">`,
      `<link data-rh="true" rel="canonical" href="${canonical}">`,
      `<meta data-rh="true" property="og:title" content="${escape(meta.title)}">`,
      `<meta data-rh="true" property="og:description" content="${escape(meta.description)}">`,
      `<meta data-rh="true" property="og:type" content="${meta.type}">`,
      `<meta data-rh="true" property="og:url" content="${canonical}">`,
      `<meta data-rh="true" property="og:image" content="${meta.image}">`,
      '<meta data-rh="true" property="og:site_name" content="Ontiver">',
      '<meta data-rh="true" property="og:locale" content="en_US">',
      '<meta data-rh="true" name="twitter:card" content="summary_large_image">',
      `<meta data-rh="true" name="twitter:title" content="${escape(meta.title)}">`,
      `<meta data-rh="true" name="twitter:description" content="${escape(meta.description)}">`,
      `<meta data-rh="true" name="twitter:image" content="${meta.image}">`,
      `<script data-rh="true" type="application/ld+json">${JSON.stringify(meta.structuredData).replaceAll("<", "\\u003c")}</script>`,
    ].join("\n");
    for (const pattern of DEFAULT_HEAD_PATTERNS) bodyHtml = bodyHtml.replace(pattern, "");
    return { bodyHtml, headHtml, path };
  } finally {
    (HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = previous;
  }
}

const DEFAULT_HEAD_PATTERNS = [
  /<title>[^<]*<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
  /<meta\s+name="robots"[^>]*>/i,
  /<link\s+rel="canonical"[^>]*>/i,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
];

export function injectIntoTemplate(
  template: string,
  parts: { headHtml: string; bodyHtml: string; path: string },
) {
  let html = template;
  for (const pattern of DEFAULT_HEAD_PATTERNS) html = html.replace(pattern, "");
  html = html.replace("</head>", `${parts.headHtml}\n</head>`);
  return html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered-path="${encodeURI(parts.path)}">${parts.bodyHtml}</div>`,
  );
}
