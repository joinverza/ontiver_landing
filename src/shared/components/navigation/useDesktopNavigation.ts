import { useCallback, useEffect, useRef, useState } from "react";

type MenuState = { routeKey: string; name: string | null };

export const useDesktopNavigation = (routeKey: string) => {
  const navRef = useRef<HTMLElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focusFrame = useRef<number | undefined>(undefined);
  const clickedMenu = useRef<string | null>(null);
  const [menu, setMenu] = useState<MenuState>({ routeKey, name: null });

  // Reset only menu state when a route changes; keep the audience pill mounted.
  if (menu.routeKey !== routeKey) setMenu({ routeKey, name: null });
  const openName = menu.routeKey === routeKey ? menu.name : null;

  const cancelPending = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    openTimer.current = undefined;
    closeTimer.current = undefined;
  }, []);

  const close = useCallback(() => {
    cancelPending();
    clickedMenu.current = null;
    setMenu({ routeKey, name: null });
  }, [cancelPending, routeKey]);

  useEffect(() => {
    clickedMenu.current = null;
    return () => {
      cancelPending();
      if (focusFrame.current !== undefined) cancelAnimationFrame(focusFrame.current);
    };
  }, [cancelPending, routeKey]);

  useEffect(() => {
    if (!openName) return;
    const closeOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [close, openName]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1250px)");
    const onResize = () => {
      if (!desktop.matches) close();
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, [close]);

  const enter = (name: string | null) => {
    cancelPending();
    clickedMenu.current = null;
    // Give the pointer time to cross another trigger on its way into the panel.
    if (openName && openName !== name) {
      openTimer.current = setTimeout(() => setMenu({ routeKey, name }), 180);
    } else setMenu({ routeKey, name });
  };

  const leave = (name: string) => {
    cancelPending();
    closeTimer.current = setTimeout(() => {
      setMenu((current) => (current.name === name ? { routeKey, name: null } : current));
    }, 220);
  };

  const toggle = (name: string) => {
    cancelPending();
    const next = openName === name && clickedMenu.current === name ? null : name;
    clickedMenu.current = next;
    setMenu({ routeKey, name: next });
  };

  const focusPanel = (name: string, panelId: string) => {
    cancelPending();
    setMenu({ routeKey, name });
    if (focusFrame.current !== undefined) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>(`#${panelId} a`)?.focus();
    });
  };

  const escape = () => {
    const trigger = navRef.current?.querySelector<HTMLButtonElement>(
      'button[aria-expanded="true"]',
    );
    close();
    trigger?.focus();
  };

  return { navRef, openName, cancelPending, close, enter, leave, toggle, focusPanel, escape };
};
