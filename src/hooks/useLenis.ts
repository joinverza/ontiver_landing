import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let frameId = 0;

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      window.removeEventListener('click', handleAnchorClick);
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
