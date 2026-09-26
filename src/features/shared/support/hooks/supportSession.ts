import type { PublicSupportSession } from "../../../../shared/lib/landingApi";

export const SUPPORT_STORAGE_KEY = "ontiver.publicSupportSession";

export const readStoredSession = (): PublicSupportSession | null => {
  if (typeof window === "undefined") return null;
  try {
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const shared = fragment.get("support");
    if (shared) {
      const separator = shared.indexOf(":");
      if (separator > 0) {
        const session: PublicSupportSession = {
          requestId: shared.slice(0, separator),
          accessToken: shared.slice(separator + 1),
          status: "open",
          createdAt: new Date().toISOString(),
        };
        window.localStorage.setItem(SUPPORT_STORAGE_KEY, JSON.stringify(session));
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
        return session;
      }
    }
    const stored = window.localStorage.getItem(SUPPORT_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PublicSupportSession) : null;
  } catch {
    return null;
  }
};
