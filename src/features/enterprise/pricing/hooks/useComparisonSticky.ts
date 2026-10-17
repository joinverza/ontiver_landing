import { useEffect, useRef } from "react";

type GroupPosition = { row: HTMLTableRowElement; top: number; maxShift: number };

const clamp = (value: number, maximum: number) =>
  Math.min(Math.max(0, value), Math.max(0, maximum));

const setOffset = (element: HTMLElement, property: string, offset: number) => {
  const value = `${Math.round(offset * 100) / 100}px`;
  if (element.style.getPropertyValue(property) !== value)
    element.style.setProperty(property, value);
};

/** Pin table headers to the viewport without introducing a nested vertical scroller. */
export const useComparisonSticky = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table = tableRef.current;
    const head = table?.tHead;
    if (!table || !head) return;
    const navbar = document.querySelector<HTMLElement>("[data-ontiver-navbar]");
    let groups: GroupPosition[] = [];
    let inset = 0;
    let headHeight = 0;
    let tableHeight = 0;
    let frame = 0;
    let measureNeeded = true;
    let disposed = false;

    const measure = (tableTop: number) => {
      // Reserve the navbar's full height even when its chrome slides away:
      // the floating CTA still occupies that space above the Enterprise column.
      inset = navbar?.offsetHeight ?? 0;
      setOffset(head, "--comparison-navbar-inset", inset);
      headHeight = head.getBoundingClientRect().height;
      tableHeight = table.getBoundingClientRect().height;
      groups = Array.from(table.tBodies).flatMap((body) => {
        const row = body.rows[0];
        if (!row) return [];
        const bounds = body.getBoundingClientRect();
        return [{ row, top: bounds.top - tableTop, maxShift: bounds.height - row.offsetHeight }];
      });
      measureNeeded = false;
    };

    const update = () => {
      frame = 0;
      const tableTop = table.getBoundingClientRect().top;
      if (measureNeeded) measure(tableTop);
      const headerOffset = clamp(inset - tableTop, tableHeight - headHeight);
      setOffset(head, "--comparison-header-y", headerOffset);
      const pinned = String(headerOffset > 0);
      if (head.dataset.pinned !== pinned) head.dataset.pinned = pinned;
      // Each category is pushed away at the end of its own row group, so the
      // next category replaces it instead of accumulating a stack of headings.
      groups.forEach(({ row, top, maxShift }) => {
        setOffset(row, "--comparison-group-y", clamp(headerOffset + headHeight - top, maxShift));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measureNeeded = true;
      schedule();
    };
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(table);
    resizeObserver.observe(head);
    if (navbar) resizeObserver.observe(navbar);
    const contentObserver = new MutationObserver(remeasure);
    contentObserver.observe(table, { childList: true, subtree: true, characterData: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    void document.fonts.ready.then(() => {
      if (!disposed) remeasure();
    });
    update();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      contentObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      head.style.removeProperty("--comparison-header-y");
      head.style.removeProperty("--comparison-navbar-inset");
      delete head.dataset.pinned;
      groups.forEach(({ row }) => row.style.removeProperty("--comparison-group-y"));
    };
  }, []);

  return tableRef;
};
