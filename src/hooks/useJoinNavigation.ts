import { useCallback } from "react";
import { useLocation, useNavigate } from "../lib/router";

const JOIN_SECTION_ROUTES = new Set([
  "/",
  "/blog",
  "/blogs",
  "/resources",
  "/resources/blogs",
  "/contact",
]);

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function useJoinNavigation() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  return useCallback(() => {
    const normalizedPath = normalizePath(pathname);
    const pageHasJoinSection = JOIN_SECTION_ROUTES.has(normalizedPath);
    const targetPath = pageHasJoinSection ? normalizedPath : "/";

    if (pageHasJoinSection && hash === "#join") {
      document.getElementById("join")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate({ pathname: targetPath, hash: "#join" });
  }, [hash, navigate, pathname]);
}
