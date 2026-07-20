import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MagneticFillButton from "../../ui/MagneticFillButton";
import { useJoinNavigation } from "../../../hooks/useJoinNavigation";
import type { Audience } from "../../../lib/audience";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function MarqueeItems({ audience }: { audience: Audience }) {
  const isEnterprise = audience === "enterprise";
  return (
  <>
    <span className="inline-flex items-center gap-2">
      <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      {isEnterprise ? "Consent-led identity sharing" : "You approve every share"}
    </span>
    <span className="inline-flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      {isEnterprise ? "AML & KYC infrastructure" : "Reusable trusted credentials"}
    </span>
    <span className="inline-flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
      {isEnterprise ? "Sandbox available now" : "Less repeated verification"}
    </span>
  </>
  );
}

export default function Hero({ audience }: { audience: Audience }) {
  const goToJoin = useJoinNavigation();
  const navigate = useNavigate();
  const isEnterprise = audience === "enterprise";
  const primaryAction = () =>
    isEnterprise ? navigate("/enterprise/contact") : goToJoin();
  const containerRef = useRef<HTMLDivElement>(null);
  const topStripRef = useRef<HTMLDivElement>(null);
  const botStripRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroParagraphRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Hero entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Badge — scale out from left
    tl.fromTo(
      heroBadgeRef.current,
      { x: -40, opacity: 0, scale: 0.85 },
      { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    // Heading — split into words, each scales out from left staggered
    if (heroHeadingRef.current) {
      const headingEl = heroHeadingRef.current;
      // Wrap each text node word in a span while preserving child elements
      const walker = document.createTreeWalker(headingEl, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        if (node.textContent && node.textContent.trim()) textNodes.push(node);
      }
      textNodes.forEach((tn) => {
        const words = tn.textContent!.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((w) => {
          if (w.trim() === "") {
            frag.appendChild(document.createTextNode(w));
          } else {
            const wrapper = document.createElement("span");
            wrapper.className = "inline-block";
            const inner = document.createElement("span");
            inner.className = "hero-word inline-block";
            inner.style.transform = "translateX(-30px) scale(0.8)";
            inner.style.opacity = "0";
            inner.textContent = w;
            wrapper.appendChild(inner);
            frag.appendChild(wrapper);
          }
        });
        tn.parentNode!.replaceChild(frag, tn);
      });

      const wordEls = headingEl.querySelectorAll(".hero-word");
      tl.to(
        wordEls,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.3"
      );
    }

    // Paragraph — scale out from left
    tl.fromTo(
      heroParagraphRef.current,
      { x: -30, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    // Buttons — staggered scale out from left
    if (heroButtonsRef.current) {
      const buttons = heroButtonsRef.current.children;
      tl.fromTo(
        buttons,
        { x: -25, opacity: 0, scale: 0.85 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.2"
      );
    }

    // Hero image — fade and scale in
    tl.fromTo(
      heroImageRef.current,
      { x: 60, opacity: 0, scale: 0.92 },
      { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: containerRef });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

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

  const scrollToSolution = () => {
    document.getElementById("solution")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#f1f4ef] pb-12 pt-[112px] sm:pb-16 md:pt-9">
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
                  <MarqueeItems audience={audience} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Strip (Rotated Up) */}
          <div className="absolute w-[150%] h-[40px] bg-[#0F8A5F66] border-y border-[#6bb585] -rotate-4 top-[55%] md:top-[95%] flex items-center shadow-sm">
            <div ref={botStripRef} className="flex gap-8 whitespace-nowrap text-xs font-medium text-black uppercase tracking-wider animate-marquee-right">
              {Array(10).fill(0).map((_, i) => (
                <div key={`bot-${i}`} className="flex gap-8">
                  <MarqueeItems audience={audience} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between px-5 sm:px-6 md:px-12 ${isEnterprise ? "xl:flex-row xl:px-20" : "lg:flex-row lg:px-20"}`}>
        
        {/* Left Content */}
        <div className={`flex w-full flex-col items-start pt-0 md:pt-8 ${isEnterprise ? "xl:w-[46%] xl:pb-10" : "lg:w-[50%] lg:pb-10"}`}>
          <div ref={heroBadgeRef} className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#395D54] px-4 py-1.5 sm:mb-8 sm:px-5" style={{ opacity: 0 }}>
            <span className="text-black text-[15px]">♦</span>
            <span className="text-black/80 font-medium text-sm">
              {isEnterprise
                ? "Enterprise Identity Infrastructure for Africa"
                : "Your reusable digital identity"}
            </span>
            <span className="text-black text-[15px]">♦</span>
          </div>

          <h1
            ref={heroHeadingRef}
            className="mb-5 text-hero font-bold tracking-normal text-black sm:mb-6"
          >
            {isEnterprise ? (
              <>
                Verify customers.<br />
                <span className="text-[#007D21]">
                  Reuse trust
                  <br />
                  across workflows.
                </span>
              </>
            ) : (
              <>
                Your identity.<br />
                <span className="text-[#007D21]">
                  Verified once.
                  <br />
                  Ready when you are.
                </span>
              </>
            )}
          </h1>

          <p ref={heroParagraphRef} className="mb-8 max-w-[500px] text-subtitle font-normal text-black sm:mb-10" style={{ opacity: 0 }}>
            {isEnterprise
              ? "Ontiver gives product, compliance, and operations teams one layer for identity verification, AML screening, consent, reusable proofs, and audit-ready records."
              : "Verify once, keep control of your trusted credentials, and approve reuse across supported services without uploading the same documents again."}
          </p>

          <div ref={heroButtonsRef} className="flex w-full flex-col gap-3 sm:h-12 sm:w-auto sm:flex-row sm:gap-4">
            <MagneticFillButton
              variant="green"
              className="h-12 rounded-xl px-8 text-base sm:px-14 sm:text-[17px]"
              onClick={primaryAction}
            >
              {isEnterprise ? "Request Enterprise Access" : "Join Waitlist"}
            </MagneticFillButton>
            <MagneticFillButton
              variant="light"
              className="h-12 rounded-xl px-6"
              onClick={
                isEnterprise
                  ? () => navigate("/enterprise/pricing")
                  : scrollToSolution
              }
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              {isEnterprise ? "View Pricing" : "See How It Works"}
            </MagneticFillButton>
          </div>
        </div>

        {/* Right Image */}
        <div ref={heroImageRef} className={`relative mt-10 flex w-full justify-center ${isEnterprise ? "xl:mt-0 xl:w-[54%] xl:justify-end" : "lg:mt-0 lg:w-[50%] lg:justify-end"}`} style={{ opacity: 0 }}>
          <div className={`relative flex aspect-square w-full items-center justify-center ${isEnterprise ? "max-w-[500px] sm:max-w-[650px] xl:aspect-auto xl:h-[750px] xl:max-w-[820px]" : "max-w-[440px] sm:max-w-[560px] lg:aspect-auto lg:h-[750px] lg:max-w-[700px]"}`}>
            <img 
              src={isEnterprise ? "/assets/ontiver-enterprise.png" : "/assets/hero-phone.png"}
              alt={
                isEnterprise
                  ? "Ontiver enterprise dashboard displayed on a laptop"
                  : "Ontiver identity app displayed on a phone"
              }
              className={`z-10 h-full w-full origin-center object-contain object-center drop-shadow-2xl ${
                isEnterprise
                  ? "scale-[1.1] sm:scale-[1.18] xl:translate-x-10 xl:scale-[1.28] xl:origin-right"
                  : "sm:scale-[1.06] lg:mt-44 lg:translate-x-44 lg:scale-[1.32] lg:origin-right lg:object-right"
              }`}
            />

            {/* Floating Badges */}
            <div ref={badge1Ref} className={`absolute top-[20%] z-20 hidden cursor-default items-center gap-3 rounded-3xl border border-[#009311]/30 px-6 py-3.5 backdrop-blur-md will-change-transform ${isEnterprise ? "left-0 xl:-left-[26%] xl:flex" : "left-[10%] md:flex"}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">
                  {isEnterprise ? "Identity API" : "Education"}
                </span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">
                  {isEnterprise ? "Live" : "Connected"}
                </span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

            <div ref={badge2Ref} className={`absolute top-[40%] z-20 hidden cursor-default items-center gap-3 rounded-3xl border border-[#009311]/30 px-6 py-3.5 backdrop-blur-md will-change-transform ${isEnterprise ? "left-[4%] xl:-left-[20%] xl:flex" : "left-[24%] md:flex"}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <rect x="4" y="10" width="4" height="10"/>
                <rect x="10" y="10" width="4" height="10"/>
                <rect x="16" y="10" width="4" height="10"/>
                <path d="M2 22h20M2 10h20M12 2L2 10h20z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">
                  {isEnterprise ? "AML Screening" : "Bank"}
                </span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">
                  {isEnterprise ? "Monitored" : "Connected"}
                </span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009311" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

            <div ref={badge3Ref} className={`absolute bottom-[28%] z-20 hidden cursor-default items-center gap-3 rounded-3xl border border-[#009311]/30 px-6 py-3.5 backdrop-blur-md will-change-transform ${isEnterprise ? "left-0 xl:-left-[24%] xl:flex" : "left-[12%] md:flex"}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <rect x="4" y="10" width="4" height="10"/>
                <rect x="10" y="10" width="4" height="10"/>
                <rect x="16" y="10" width="4" height="10"/>
                <path d="M2 22h20M2 10h20M12 2L2 10h20z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-black text-sm font-medium leading-tight">
                  {isEnterprise ? "Audit Logs" : "Fintech"}
                </span>
                <span className="text-[#009311] text-[10px] font-medium leading-tight">
                  {isEnterprise ? "Ready" : "Connected"}
                </span>
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
