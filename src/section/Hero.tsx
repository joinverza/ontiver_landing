import { useEffect, useRef, useState } from "react";
import Button from "../components/base/Button";
// import SquigglyText from "../components/ui/SquigglyText";

const marqueeItems = (
  <>
    <span className="inline-flex items-center gap-2">
      <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      Consent-first data sharing
    </span>
    <span className="inline-flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      AML & KYC Infrastructure
    </span>
    <span className="inline-flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      Sandbox available now
    </span>
  </>
);

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const topStripRef = useRef<HTMLDivElement>(null);
  const botStripRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Parallax badges - move them based on scroll position
      if (badge1Ref.current) {
        badge1Ref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      if (badge2Ref.current) {
        badge2Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (badge3Ref.current) {
        badge3Ref.current.style.transform = `translateY(${scrollY * 0.22}px)`;
      }

      // Scroll-based strip offset (layered on top of CSS auto-scroll)
      if (topStripRef.current) {
        topStripRef.current.style.marginLeft = `${-scrollY * 0.3}px`;
      }
      if (botStripRef.current) {
        botStripRef.current.style.marginLeft = `${scrollY * 0.3}px`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#f1f4ef] overflow-hidden flex items-center pt-9 pb-16">
      {/* Initial Minimal Header (Only visible at top) */}
      <div className={`absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-[100] transition-all duration-300 ${isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <img src="./assets/logo.svg" alt="logo" className="h-6 md:h-8" />
        <Button
          className="bg-gradient-to-r from-[#002D0E] to-[#009311] hover:opacity-90 text-white py-3.5 px-8 rounded-xl font-medium text-md transition-colors shadow-md"
          text="Join Waitlist"
        />
      </div>

      {/* Animated Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] animate-grid-move"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      ></div>

      {/* Diagonal Marquee Strips (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-end pb-16">
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Top Strip (Rotated Down) */}
          <div className="absolute w-[150%] h-[40px] bg-[#EBEBEB] border-y border-[#cce4d6] rotate-4 top-[45%] md:top-[88%] flex items-center shadow-sm z-10">
            <div ref={topStripRef} className="flex gap-8 whitespace-nowrap text-xs font-medium text-black uppercase tracking-wider animate-marquee-left">
              {Array(10).fill(0).map((_, i) => (
                <div key={`top-${i}`} className="flex gap-8">
                  {marqueeItems}
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Strip (Rotated Up) */}
          <div className="absolute w-[150%] h-[40px] bg-[#0F8A5F66] border-y border-[#6bb585] -rotate-4 top-[55%] md:top-[95%] flex items-center shadow-sm">
            <div ref={botStripRef} className="flex gap-8 whitespace-nowrap text-xs font-medium text-black uppercase tracking-wider animate-marquee-right">
              {Array(10).fill(0).map((_, i) => (
                <div key={`bot-${i}`} className="flex gap-8">
                  {marqueeItems}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="w-full lg:w-[50%] flex flex-col items-start max-lg:pt-8 lg:pb-10">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#395D54] mb-8">
            <span className="text-black text-[15px]">♦</span>
            <span className="text-black/80 font-medium text-sm">Digital Identity Infrastructure for Africa</span>
            <span className="text-black text-[15px]">♦</span>
          </div>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-black mb-6">
            Verify Once.<br />
            Reuse{" "}
            <span className="text-[#007D21]">
              Trust 
              <br />
              Everywhere.
            </span>
            {/* <SquigglyText className="text-[#007D21]" scale={[4, 6]}> */}
            {/* </SquigglyText> */}
            {/* <br /> */}
            {/* <SquigglyText className="text-[#007D21]" scale={[4, 6]}> */}
              
            {/* </SquigglyText> */}
          </h1>

          <p className="text-lg text-black font-normal max-w-[500px] leading-relaxed mb-10">
            Ontiver helps businesses verify identity, manage consent, run AML checks, and let users reuse trusted credentials across supported workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto h-10">
            <button className="bg-gradient-to-r from-[#002D0E] to-[#009311] hover:opacity-90 text-white px-16 rounded-xl font-medium transition-colors shadow-sm">
              Join Waitlist
            </button>
            <button className="bg-white border border-[#009311] hover:bg-[#009311]/5 text-[#009311] px-8 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Watch Overview
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[50%] relative mt-20 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[700px] aspect-square lg:aspect-auto lg:h-[750px] flex items-center justify-center">
            <img 
              src="./assets/hero-phone.png" 
              alt="Ontiver Identity App on Phone over Glowing Rock" 
              className="w-full h-full object-contain object-center lg:object-right drop-shadow-2xl z-10 scale-[1.15] lg:scale-[1.32] origin-center lg:origin-right translate-x-12 lg:translate-x-44 mt-44"
            />

            {/* Floating Badges */}
            <div ref={badge1Ref} className="absolute top-[20%] left-[-10%] hidden md:flex items-center gap-3 backdrop-blur-md border border-[#009311]/30 px-6 py-3.5 rounded-3xl z-20 cursor-default will-change-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">Education</span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">Connected</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

            <div ref={badge2Ref} className="absolute top-[40%] left-[12%] hidden md:flex items-center gap-3 backdrop-blur-md border border-[#009311]/30 px-6 py-3.5 rounded-3xl z-20 cursor-default will-change-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <rect x="4" y="10" width="4" height="10"/>
                <rect x="10" y="10" width="4" height="10"/>
                <rect x="16" y="10" width="4" height="10"/>
                <path d="M2 22h20M2 10h20M12 2L2 10h20z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">Bank</span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">Connected</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

            <div ref={badge3Ref} className="absolute bottom-[28%] left-[-8%] hidden md:flex items-center gap-3 backdrop-blur-md border border-[#009311]/30 px-6 py-3.5 rounded-3xl z-20 cursor-default will-change-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <rect x="4" y="10" width="4" height="10"/>
                <rect x="10" y="10" width="4" height="10"/>
                <rect x="16" y="10" width="4" height="10"/>
                <path d="M2 22h20M2 10h20M12 2L2 10h20z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">Fintech</span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">Connected</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
