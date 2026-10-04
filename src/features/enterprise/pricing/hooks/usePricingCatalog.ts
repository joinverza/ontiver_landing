import { useEffect, useState } from "react";
import { getPricingCatalog } from "../../../../shared/lib/landingApi";
import { bundledCatalog, type PricingCatalog } from "../data/pricing";

/** Renders the bundled snapshot immediately, then the live catalog if it has changed. */
export const usePricingCatalog = (): PricingCatalog => {
  const [catalog, setCatalog] = useState(bundledCatalog);
  useEffect(() => {
    let active = true;
    getPricingCatalog()
      .then((live) => {
        if (active && live?.plans?.length) setCatalog(live);
      })
      .catch(() => {
        // The snapshot already matches the catalog at build time.
      });
    return () => {
      active = false;
    };
  }, []);
  return catalog;
};
