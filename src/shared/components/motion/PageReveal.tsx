import { useLayoutEffect } from "react";
import { useMotionSettings } from "./MotionSettings";
import { observePageReveals } from "../../lib/pageRevealRuntime";

const PageReveal = () => {
  const { paused, reduced } = useMotionSettings();
  useLayoutEffect(() => {
    const shell = document.querySelector<HTMLElement>("[data-page-shell]");
    if (!shell) return;
    if (paused || reduced) {
      shell
        .querySelectorAll(".ontiver-reveal")
        .forEach((element) => element.classList.add("ontiver-reveal-visible"));
      return;
    }
    return observePageReveals(shell);
  }, [paused, reduced]);
  return null;
};

export default PageReveal;
