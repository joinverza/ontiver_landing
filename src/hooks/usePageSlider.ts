import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.stacked-section');

      sections.forEach((section, index) => {
        // Skip the last section since nothing covers it
        if (index === sections.length - 1) return;

        const nextSection = sections[index + 1];

        // Animate the current section as the NEXT section scrolls up to cover it
        gsap.to(section, {
          scale: 0.95,
          opacity: 0.5,
          filter: 'brightness(0.5)',
          ease: 'none',
          scrollTrigger: {
            trigger: nextSection,
            start: 'top bottom', // When the top of the next section hits the bottom of the viewport
            end: 'top top',      // When the top of the next section hits the top of the viewport
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
