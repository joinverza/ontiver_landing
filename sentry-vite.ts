import { sentryVitePlugin } from "@sentry/vite-plugin";
import type { PluginOption } from "vite";

interface SentryViteSettings {
  appSurface: string;
  outputDirectory?: string;
}

export interface SentryViteConfiguration {
  plugins: PluginOption[];
  sourceMap: false | "hidden";
}

export function createSentryViteConfiguration({
  appSurface,
  outputDirectory = "dist",
}: SentryViteSettings): SentryViteConfiguration {
  const uploadEnabled = String(process.env.SENTRY_UPLOAD_ENABLED ?? "false").toLowerCase() === "true";
  if (!uploadEnabled) return { plugins: [], sourceMap: false };

  const organization = String(process.env.SENTRY_ORG ?? "").trim();
  const project = String(process.env.SENTRY_PROJECT ?? "").trim();
  const authToken = String(process.env.SENTRY_AUTH_TOKEN ?? "").trim();
  const release = String(process.env.SENTRY_RELEASE ?? process.env.RENDER_GIT_COMMIT ?? "").trim();
  const missing = [
    ["SENTRY_ORG", organization],
    ["SENTRY_PROJECT", project],
    ["SENTRY_AUTH_TOKEN", authToken],
    ["SENTRY_RELEASE or RENDER_GIT_COMMIT", release],
  ].filter(([, value]) => !value).map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Sentry source-map upload is enabled for ${appSurface}, but ${missing.join(", ")} is missing.`);
  }

  return {
    sourceMap: "hidden",
    plugins: [
      sentryVitePlugin({
        org: organization,
        project,
        authToken,
        telemetry: false,
        release: { name: release },
        sourcemaps: {
          filesToDeleteAfterUpload: [`${outputDirectory}/**/*.map`],
        },
      }),
    ],
  };
}
