import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  darkSection: React.ReactNode;
}

export default function TrionnTransitionWrapper({ darkSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const strips = gsap.utils.toArray('.transition-strip') as HTMLElement[];
    
    // We create a scrub animation for the strips moving up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom", // The container is taller than 100vh
        scrub: 1.5, // Smooth scrub
      }
    });

    // Setup initial positions below the screen
    gsap.set(strips, { y: window.innerHeight });

    // Animate strips from below the screen to their respective natural positions
    // We use a stagger to make them come up slightly offset from each other
    tl.to(strips, { 
      y: 0, 
      ease: "power2.out",
      stagger: 0.1 // The bottom ones follow the top ones
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[250vh]">
      {/* Sticky container that holds the screen while we scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">
        
        {/* The Dark Section (Hero) is rendered here */}
        <div className="absolute inset-0 w-full h-full">
          {darkSection}
        </div>

        {/* The strips that slide up to cover it */}
        <div className="absolute inset-0 w-full h-full z-50 pointer-events-none">
          <div className="transition-strip absolute top-0 w-full h-[25.5vh] bg-[#fdfdfd] overflow-hidden flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
            <h1 className="text-[10vw] font-black text-black/5 whitespace-nowrap absolute left-[-5%] uppercase">Innovate + Impact + Inspire</h1>
          </div>
          <div className="transition-strip absolute top-[25vh] w-full h-[25.5vh] bg-[#fdfdfd] overflow-hidden flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
            <h1 className="text-[10vw] font-black text-black/5 whitespace-nowrap absolute right-[-5%] uppercase">Verify + Reuse + Trust</h1>
          </div>
          <div className="transition-strip absolute top-[50vh] w-full h-[25.5vh] bg-[#fdfdfd] overflow-hidden flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
            <h1 className="text-[10vw] font-black text-black/5 whitespace-nowrap absolute left-[-15%] uppercase">Digital + Identity + Fast</h1>
          </div>
          <div className="transition-strip absolute top-[75vh] w-full h-[25.5vh] bg-[#fdfdfd] overflow-hidden flex items-center shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
            <h1 className="text-[10vw] font-black text-black/5 whitespace-nowrap absolute right-[-15%] uppercase">Seamless + Experience + Secure</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
