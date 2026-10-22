import { useLayoutEffect } from "react";
import { useMotionSettings } from "./MotionSettings";
import { observePageReveals } from "../../lib/pageRevealRuntime";
import { useInitialLoading } from "../loaders/InitialLoader";

const PageReveal = () => {
  const { paused, reduced } = useMotionSettings();
  const initialLoading = useInitialLoading();
  useLayoutEffect(() => {
    if (initialLoading) return;
    const shell = document.querySelector<HTMLElement>("[data-page-shell]");
    if (!shell) return;
    if (paused || reduced) {
      shell
        .querySelectorAll(".ontiver-reveal")
        .forEach((element) => element.classList.add("ontiver-reveal-visible"));
      return;
    }
    return observePageReveals(shell);
  }, [paused, reduced, initialLoading]);
  return null;
};

export default PageReveal;
