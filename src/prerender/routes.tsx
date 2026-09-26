import App from "../app/App";
import staticRoutes from "./staticRoutes.json";

export type PrerenderRoute = {
  path: string;
  Component: typeof App;
};

// The pricing alias renders directly but is deliberately absent from the sitemap.
export const prerenderRoutes: PrerenderRoute[] = [...staticRoutes, { path: "/pricing" }].map(
  ({ path }) => ({
    path,
    Component: App,
  }),
);
