import { useSyncExternalStore } from "react";
import type { PricingCurrency } from "../data/pricing";

const STORAGE_KEY = "ontiver.pricingCurrency";
const listeners = new Set<() => void>();
let chosen: PricingCurrency | null = null;

/** The visitor's choice, else naira for browsers set to Nigeria, else US dollars. */
function currentCurrency(): PricingCurrency {
  if (chosen) return chosen;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "USD" || stored === "NGN") return stored;
  } catch {
    // Storage can be blocked; fall back to the browser's region.
  }
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  const languages = navigator.languages ?? [navigator.language];
  return zone === "Africa/Lagos" || languages.some((language) => /-NG$/i.test(language)) ? "NGN" : "USD";
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

function choose(next: PricingCurrency) {
  chosen = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not remembered; the choice still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

/**
 * The currency prices are shown in. The prerendered page is in US dollars; the visitor's own
 * currency applies as soon as the page hydrates, and a choice they make is remembered.
 */
export function usePricingCurrency(): [PricingCurrency, (currency: PricingCurrency) => void] {
  const currency = useSyncExternalStore(subscribe, currentCurrency, () => "USD" as const);
  return [currency, choose];
}
