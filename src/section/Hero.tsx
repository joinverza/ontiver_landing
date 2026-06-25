import React from "react";

export default function Hero() {
  return (
    <div className="relative w-full min-h-[95vh] bg-bg-light overflow-hidden flex items-center pt-32 pb-10">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Diagonal Marquee Strips (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-end pb-20">
        <div className="relative w-full h-[600px]">
          {/* Top Strip */}
          <div className="absolute w-[150%] h-[40px] bg-[#e8f3ec] border-y border-[#cce4d6] -rotate-6 top-[60%] -left-[10%] flex items-center opacity-80 shadow-sm">
            <div className="flex gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite] text-xs font-medium text-[#163c1d]/60 uppercase tracking-wider">
              {Array(10).fill(0).map((_, i) => (
                <React.Fragment key={`top-${i}`}>
                  <span className="flex items-center gap-2">
                    <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Consent-first data sharing
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    AML & KYC Infrastructure
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Sandbox available now
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Bottom Strip */}
          <div className="absolute w-[150%] h-[40px] bg-[#89c79f] border-y border-[#6bb585] -rotate-6 top-[75%] -left-[10%] flex items-center opacity-90 shadow-sm">
            <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite_reverse] text-xs font-medium text-[#002d0e]/80 uppercase tracking-wider">
              {Array(10).fill(0).map((_, i) => (
                <React.Fragment key={`bot-${i}`}>
                  <span className="flex items-center gap-2">
                    <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Consent-first data sharing
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    AML & KYC Infrastructure
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Sandbox available now
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 z-10 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="w-full lg:w-[50%] flex flex-col items-start pt-10 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-black/10 bg-white mb-8 shadow-sm">
            <span className="text-black text-[10px]">♦</span>
            <span className="text-black/80 font-medium text-sm">Digital Identity Infrastructure for Africa</span>
            <span className="text-black text-[10px]">♦</span>
          </div>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-black mb-6">
            Verify Once.<br />
            Reuse <span className="text-[#009311]">Trust</span><br />
            <span className="text-[#009311]">Everywhere.</span>
          </h1>

          <p className="text-lg text-black/60 font-normal max-w-[500px] leading-relaxed mb-10">
            Ontiver helps businesses verify identity, manage consent, run AML checks, and let users reuse trusted credentials across supported workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-[#005e19] hover:bg-[#004a14] text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg">
              Join Waitlist
            </button>
            <button className="bg-white border border-[#009311]/30 hover:border-[#009311] text-[#009311] px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              className="w-full h-full object-contain object-center lg:object-right drop-shadow-2xl z-10 scale-[1.15] lg:scale-[1.25] origin-center lg:origin-right"
            />
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}

