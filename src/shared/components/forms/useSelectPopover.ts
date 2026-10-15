import { useLayoutEffect, type RefObject } from "react";

/** Keep a portalled menu next to its field, including inside scrolling forms. */
export const useSelectPopover = (
  open: boolean,
  trigger: RefObject<HTMLButtonElement | null>,
  menu: RefObject<HTMLDivElement | null>,
  close: () => void,
) => {
  useLayoutEffect(() => {
    if (!open) return;
    const button = trigger.current;
    const popup = menu.current;
    if (!button || !popup) return;

    const position = () => {
      const box = button.getBoundingClientRect();
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop ?? 0;
      const left = viewport?.offsetLeft ?? 0;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const below = top + height - box.bottom - 14;
      const above = box.top - top - 14;
      if (box.bottom < top || box.top > top + height) {
        close();
        return;
      }
      const upward = below < 240 && above > below;
      const popupWidth = Math.min(Math.max(box.width, 200), width - 16);
      popup.style.setProperty(
        "left",
        `${Math.max(left + 8, Math.min(box.left, left + width - popupWidth - 8))}px`,
      );
      popup.style.setProperty("top", `${upward ? box.top - 6 : box.bottom + 6}px`);
      popup.style.setProperty("width", `${popupWidth}px`);
      popup.style.setProperty(
        "max-height",
        `${Math.max(64, Math.min(320, upward ? above : below))}px`,
      );
      popup.setAttribute("data-side", upward ? "top" : "bottom");
      popup.setAttribute("data-positioned", "true");
    };
    const dismiss = (event: Event) => {
      const target = event.target;
      if (target instanceof Node && !button.contains(target) && !popup.contains(target)) close();
    };
    const reposition = (event: Event) => {
      if (event.target instanceof Node && popup.contains(event.target)) return;
      position();
    };
    position();
    const resize = new ResizeObserver(position);
    resize.observe(button);
    document.addEventListener("pointerdown", dismiss, true);
    document.addEventListener("focusin", dismiss);
    document.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", position);
    window.visualViewport?.addEventListener("resize", position);
    window.visualViewport?.addEventListener("scroll", position);
    return () => {
      resize.disconnect();
      document.removeEventListener("pointerdown", dismiss, true);
      document.removeEventListener("focusin", dismiss);
      document.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", position);
      window.visualViewport?.removeEventListener("resize", position);
      window.visualViewport?.removeEventListener("scroll", position);
    };
  }, [open, trigger, menu, close]);
};
