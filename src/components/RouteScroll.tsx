import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cancelScrollMomentum, getHashTarget, scrollPageTo } from "../lib/scrollNavigation";

export default function RouteScroll() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPage = useRef<{ page: string; key: string } | null>(null);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useEffect(() => {
    const page = location.pathname + location.search;
    const samePage = previousPage.current?.page === page && previousPage.current.key !== location.key;
    previousPage.current = { page, key: location.key };
    cancelScrollMomentum();

    // Let route content mount and an outgoing menu release its body lock.
    const frame = requestAnimationFrame(() => {
      const target = getHashTarget(location.hash);
      if (target) scrollPageTo(target, { immediate: !samePage, focus: true });
      else if (!location.hash || !samePage) scrollPageTo(0, { immediate: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash, location.key]);

  useEffect(() => {
    let anchorFrame = 0;
    const handleAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.composedPath().find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
      const target = getHashTarget(url.hash);
      if (!target) return;

      // Keep React Router's location and native anchor links in agreement.
      event.preventDefault();
      cancelAnimationFrame(anchorFrame);
      if (window.location.hash !== url.hash) {
        navigate({ pathname: url.pathname, search: url.search, hash: url.hash });
      } else {
        anchorFrame = requestAnimationFrame(() => scrollPageTo(target, { focus: true }));
      }
    };
    document.addEventListener("click", handleAnchor, true);
    return () => {
      cancelAnimationFrame(anchorFrame);
      document.removeEventListener("click", handleAnchor, true);
    };
  }, [navigate]);

  return null;
}
