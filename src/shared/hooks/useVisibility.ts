import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeToVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

const getVisibility = () => !document.hidden;
const getServerVisibility = () => false;

export const useDocumentVisible = () =>
  useSyncExternalStore(subscribeToVisibility, getVisibility, getServerVisibility);

export const useInViewport = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};
