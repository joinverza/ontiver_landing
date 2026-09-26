import * as Sentry from "@sentry/react";

const FILTERED = "[Filtered]";
const sensitiveKeyPattern = /(authorization|cookie|password|secret|token|api.?key|private.?key|client.?secret|otp|pin|bvn|nin|passport|document.?number|identity.?number|selfie|liveness|image|email|phone|address|full.?name|date.?of.?birth|tenant.?id|customer.?id|user.?id|verification.?id|request.?id|job.?id|proof.?id|credential.?id)/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const jwtPattern = /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g;
const bearerPattern = /\b(?:bearer|basic)\s+[A-Za-z0-9._~+/=-]+/gi;
const identityNumberPattern = /(^|\D)\d{11}(?!\d)/g;
const phonePattern = /(^|\W)(?:\+?234|0)[789]\d{9}(?!\d)/g;

type RuntimeEnvironment = Record<string, string | boolean | undefined>;

function runtimeEnvironment(): RuntimeEnvironment {
  return ((import.meta as ImportMeta & { env?: RuntimeEnvironment }).env ?? {});
}

function scrubText(value: string): string {
  return value
    .replace(emailPattern, FILTERED)
    .replace(jwtPattern, FILTERED)
    .replace(bearerPattern, FILTERED)
    .replace(identityNumberPattern, `$1${FILTERED}`)
    .replace(phonePattern, `$1${FILTERED}`);
}

function scrubValue<T>(value: T, key?: string, depth = 0): T {
  if (key && sensitiveKeyPattern.test(key)) return FILTERED as T;
  if (depth >= 8) return FILTERED as T;
  if (typeof value === "string") return scrubText(value) as T;
  if (Array.isArray(value)) {
    return value.map((item) => scrubValue(item, undefined, depth + 1)) as T;
  }
  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      output[childKey] = scrubValue(childValue, childKey, depth + 1);
    }
    return output as T;
  }
  return value;
}

function scrubEvent<T extends object>(event: T): T {
  const scrubbed = scrubValue(event) as T & {
    user?: unknown;
    request?: Record<string, unknown>;
  };
  delete scrubbed.user;
  const request = scrubbed.request;
  if (request) {
    delete request.data;
    delete request.cookies;
    delete request.query_string;
    if (typeof request.url === "string") {
      request.url = request.url.split("?", 1)[0].split("#", 1)[0];
    }
  }
  return scrubbed as T;
}

function traceTargets(env: RuntimeEnvironment): Array<string | RegExp> {
  const configured = String(env.VITE_SENTRY_TRACE_PROPAGATION_TARGETS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const origins = configured.length > 0
    ? configured
    : ["https://api.ontiver.com", "https://auth.ontiver.com"];
  return origins.map((origin) => {
    const escaped = origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`^${escaped}(?:/|$)`);
  });
}

function sampleRate(value: unknown, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(1, parsed));
}

export function initializeBrowserSentry(appSurface: string): boolean {
  const env = runtimeEnvironment();
  const dsn = String(env.VITE_SENTRY_DSN ?? "").trim();
  const enabled = Boolean(dsn) && String(env.VITE_SENTRY_ENABLED ?? "true") !== "false";

  Sentry.init({
    dsn: dsn || undefined,
    enabled,
    environment: String(env.VITE_SENTRY_ENVIRONMENT ?? env.MODE ?? "development"),
    sendDefaultPii: false,
    enableLogs: false,
    maxBreadcrumbs: 50,
    tracesSampleRate: sampleRate(env.VITE_SENTRY_TRACES_SAMPLE_RATE, 0.1),
    tracePropagationTargets: traceTargets(env),
    integrations: [Sentry.browserTracingIntegration()],
    beforeSend: (event) => scrubEvent(event),
    beforeSendTransaction: (event) => scrubEvent(event),
    beforeBreadcrumb: (breadcrumb) => {
      if (breadcrumb.category === "ui.click" || breadcrumb.category === "console") return null;
      return scrubValue(breadcrumb);
    },
  });

  if (enabled) Sentry.setTag("app_surface", appSurface);
  return enabled;
}

export const sentryPrivacy = {
  scrubText,
  scrubValue,
};
