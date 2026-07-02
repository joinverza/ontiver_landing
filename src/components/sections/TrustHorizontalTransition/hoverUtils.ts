import type { PointerEvent } from "react";

export const updateHoverVars = (event: PointerEvent<HTMLElement>) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  target.style.setProperty("--mx", `${x * 100}%`);
  target.style.setProperty("--my", `${y * 100}%`);
  target.style.setProperty("--tx", `${(0.5 - x) * 8}px`);
  target.style.setProperty("--ty", `${(0.5 - y) * 8}px`);
};

export const resetHoverVars = (event: PointerEvent<HTMLElement>) => {
  const target = event.currentTarget;

  target.style.setProperty("--mx", "50%");
  target.style.setProperty("--my", "50%");
  target.style.setProperty("--tx", "0px");
  target.style.setProperty("--ty", "0px");
};
