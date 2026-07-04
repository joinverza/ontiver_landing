import App from "../App";
import staticRoutes from "./staticRoutes.json";

export type PrerenderRoute = {
  path: string;
  Component: typeof App;
};

export const prerenderRoutes: PrerenderRoute[] = staticRoutes.map(({path}) => ({
  path,
  Component: App,
}));
