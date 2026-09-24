import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollPageTo } from "../lib/scrollNavigation";

const JOIN_SECTION_ROUTES = new Set([
  "/",
  "/blog",
  "/blogs",
  "/resources/blogs",
  "/contact",
]);

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function useJoinNavigation() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const pendingFrame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(pendingFrame.current), [pathname, hash]);

  return useCallback(() => {
    cancelAnimationFrame(pendingFrame.current);
    const normalizedPath = normalizePath(pathname);
    const pageHasJoinSection = JOIN_SECTION_ROUTES.has(normalizedPath);
    const targetPath = pageHasJoinSection ? normalizedPath : "/";

    if (pageHasJoinSection && hash === "#join") {
      pendingFrame.current = requestAnimationFrame(() => scrollPageTo(document.getElementById("join"), { focus: true }));
      return;
    }

    navigate({ pathname: targetPath, hash: "#join" });
  }, [hash, navigate, pathname]);
}
