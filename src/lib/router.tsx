/* eslint-disable react-refresh/only-export-components */
import {
  Redirect,
  Route as WouterRoute,
  Router,
  Switch,
  useLocation as useWouterLocation,
  useParams,
} from "wouter";
import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";

type NavigateOptions = {
  replace?: boolean;
};

type NavigationTarget =
  | string
  | number
  | {
      pathname?: string;
      search?: string;
      hash?: string;
    };

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  replace?: boolean;
};

export function Link({
  to,
  replace = false,
  onClick,
  target,
  ...props
}: LinkProps) {
  const navigate = useNavigate();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      target === "_blank"
    ) {
      return;
    }
    event.preventDefault();
    navigate(to, { replace });
  };
  return (
    <a href={to} target={target} onClick={handleClick} {...props} />
  );
}

export function useLocation() {
  const [pathname, navigate] = useWouterLocation();
  const hash = typeof window === "undefined" ? "" : window.location.hash;
  return {
    pathname,
    hash,
    key: `${pathname}${hash}`,
    navigate,
  };
}

export function useNavigate() {
  const [, navigate] = useWouterLocation();
  return (to: NavigationTarget, options?: NavigateOptions) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    const destination =
      typeof to === "string"
        ? to
        : `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
    navigate(destination || "/", options);
  };
}

export function useSearchParams(): [URLSearchParams] {
  const { pathname } = useLocation();
  const search =
    typeof window === "undefined"
      ? pathname.includes("?")
        ? pathname.slice(pathname.indexOf("?"))
        : ""
      : window.location.search;
  return [new URLSearchParams(search)];
}

export function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  return <Redirect to={to} replace={replace} />;
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function MemoryRouter({
  children,
  initialEntries = ["/"],
}: {
  children: ReactNode;
  initialEntries?: string[];
}) {
  const entry = initialEntries[0] ?? "/";
  const url = new URL(entry, "https://ontiver.local");
  return (
    <Router ssrPath={url.pathname} ssrSearch={url.search}>
      {children}
    </Router>
  );
}

export function Routes({ children }: { children: ReactNode }) {
  return <Switch>{children}</Switch>;
}

export function Route({
  path,
  element,
}: {
  path: string;
  element: ReactNode;
}) {
  return <WouterRoute path={path}>{element}</WouterRoute>;
}

export { useParams };
