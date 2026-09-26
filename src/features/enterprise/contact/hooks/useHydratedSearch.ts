import { useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";

const subscribe = () => () => {};
const getServerSnapshot = () => "";

export const useHydratedSearch = () => {
  const { search } = useLocation();
  // Static HTML is generated without query parameters. React uses this same
  // empty snapshot for hydration, then reads the router's current search.
  return useSyncExternalStore(subscribe, () => search, getServerSnapshot);
};
