// Sentry's SDK is a large share of the entry bundle. It loads once the page is idle, so it never
// competes with the hero for bandwidth, and immediately if a render error needs reporting.
let loading: Promise<typeof import("./sentry")> | null = null;

export function loadSentry() {
  loading ??= import("./sentry").then((module) => {
    module.initializeBrowserSentry("landing");
    return module;
  });
  return loading;
}

export function deferSentry() {
  const start = () => void loadSentry().catch(() => undefined);
  if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 4000 });
  else setTimeout(start, 2500);
}

export function reportError(error: unknown) {
  void loadSentry()
    .then((module) => module.captureException(error))
    .catch(() => undefined);
}
