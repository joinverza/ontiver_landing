import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBadge from "../components/ui/AuroraBadge";
import {
  VerifyIcon,
  ScreenIcon,
  StoreProofIcon,
  ConsentShareIcon,
  ReuseIcon,
} from "../components/ui/SolutionIcons";

gsap.registerPlugin(ScrollTrigger);

const firstsolu = [
  {
    icon: VerifyIcon,
    title: "Verify",
    para: ["User submits identity documents through", "a business's Ontiver-powered flow."],
  },
  {
    icon: ScreenIcon,
    title: "Screen",
    para: ["Ontiver runs AML checks, sanctions", "screening, and risk assessment automatically."],
  },
  {
    icon: StoreProofIcon,
    title: "Store Proof",
    para: ["A verified identity proof is created and", "stored securely — tied to the user, not just the business."],
  },
];

const secondsolu = [
  {
    icon: ConsentShareIcon,
    title: "Consent Share",
    para: ["When another business needs to verify the same user,", "the user approves with a single consent action."],
  },
  {
    icon: ReuseIcon,
    title: "Reuse",
    para: ["The new business gets trusted verification proof instantly.", "No repeat document uploads. No delay."],
  },
];



const SolutionItem = ({ item }: { item: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Setup SVG paths for drawing
      const paths = el.querySelectorAll(".icon-stroke");
      gsap.set(paths, { strokeDasharray: 100, strokeDashoffset: 100 });

      // Identify idle target and setup specific infinite animation
      const title = item.title;
      let idleTarget: any = null;
      let idleVars: any = {};

      if (title === "Verify") {
        idleTarget = el.querySelector(".icon-checkmark");
        idleVars = { opacity: 0.3, duration: 1, yoyo: true, repeat: -1, ease: "sine.inOut" };
      } else if (title === "Screen") {
        idleTarget = el.querySelector(".icon-spinner");
        idleVars = { rotationZ: 360, duration: 3, repeat: -1, ease: "none" };
      } else if (title === "Store Proof") {
        idleTarget = el.querySelector(".icon-shimmer");
        idleVars = { x: 20, opacity: 1, duration: 4, repeat: -1, ease: "power1.inOut" };
      } else if (title === "Consent Share") {
        idleTarget = el.querySelector(".icon-plane");
        idleVars = { y: -3, duration: 1.25, yoyo: true, repeat: -1, ease: "sine.inOut" };
      } else if (title === "Reuse") {
        idleTarget = el.querySelector(".icon-arrows");
        idleVars = { rotationZ: 360, duration: 4, repeat: -1, ease: "none" };
      }

      if (idleTarget) {
        idleTweenRef.current = gsap.to(idleTarget, { ...idleVars, paused: true });
      }
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    const iconBox = containerRef.current.querySelector(".icon-box");
    gsap.to(iconBox, { scale: 1.08, duration: 0.15, ease: "power2.out" });
    if (idleTweenRef.current) {
      gsap.to(idleTweenRef.current, { timeScale: 2, duration: 0.2 });
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const iconBox = containerRef.current.querySelector(".icon-box");
    gsap.to(iconBox, { scale: 1, duration: 0.25, ease: "power2.out" });
    if (idleTweenRef.current) {
      gsap.to(idleTweenRef.current, { timeScale: 1, duration: 0.25 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`solution-item flex flex-col md:flex-row items-center md:items-start text-center md:text-left flex-1 relative group cursor-default`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center md:items-start w-full relative z-10">
        <div
          className="icon-box relative w-16 h-16 flex items-center justify-center bg-white border-2 border-black/5 shadow-sm rounded-2xl mb-4 md:mb-6 mx-auto md:mx-0"
          style={{ transform: "translateY(-20px)", opacity: 0 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-[#009311]/20 blur-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <Icon className="w-8 h-8 relative z-10 text-[#009311]" />
        </div>
        <div className="w-full max-w-[270px] mx-auto md:mx-0 text-container">
          <h6
            className="font-semibold text-lg pb-2 transition-colors duration-150 group-hover:text-[#009311] relative inline-block item-title"
            style={{ transform: "translateY(10px)", opacity: 0 }}
          >
            {item.title}
            <span className="absolute bottom-1.5 left-0 w-0 h-[1.5px] bg-[#009311] transition-all duration-200 group-hover:w-full" />
          </h6>
          <div className="text-black/60 text-sm leading-relaxed item-desc">
            {item.para.map((line: string, i: number) => (
              <span
                key={i}
                className="desc-line block"
                style={{ transform: "translateY(10px)", opacity: 0 }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingLeftRef = useRef<HTMLSpanElement>(null);
  const headingRightRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Depth Scroll Parallax
      gsap.to(bgRef.current, {
        y: "-12%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(row1Ref.current, {
        y: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(row2Ref.current, {
        y: "-4%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Master Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // 15% visible
          once: true,
        },
      });

      // 1. Badge & Heading
      tl.to(badgeRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
      tl.to(
        headingLeftRef.current,
        { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "+=0.2"
      );
      tl.to(
        headingRightRef.current,
        { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "<"
      );
      tl.to(
        underlineRef.current,
        { width: "100%", duration: 0.3, ease: "power2.inOut" },
        "+=0.0"
      );
      tl.to(
        underlineRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.inOut" },
        "+=1" // fade out after 1 sec
      );

      // 2. Chain Reaction Items
      const items = sectionRef.current?.querySelectorAll(".solution-item");
      if (items) {
        items.forEach((item, index) => {
          // Calculate start time based on row stagger
          let startTime = "+=0";
          if (index === 0) startTime = "+=0";
          else if (index === 1 || index === 2) startTime = "+=0.22";
          else if (index === 3) startTime = "+=0.3"; // Row break pause
          else if (index === 4) startTime = "+=0.22";

          const iconBox = item.querySelector(".icon-box");
          const strokes = item.querySelectorAll(".icon-stroke");
          const title = item.querySelector(".item-title");
          const descLines = item.querySelectorAll(".desc-line");

          const itemTl = gsap.timeline();
          
          // Layer 1: Icon box drop
          itemTl.to(iconBox, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.56)", // cubic-bezier(0.34, 1.56, 0.64, 1) approx
          });

          // Layer 2: Icon stroke draw
          if (strokes.length > 0) {
            // Draw path length
            itemTl.to(
              strokes,
              { strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" },
              "+=0.1"
            );
            // Transition color from green to black
            itemTl.to(
              strokes,
              { color: "#000000", duration: 0.2, ease: "power1.inOut" },
              "-=0.1"
            );
          }

          // Layer 3: Text cascade
          itemTl.to(
            title,
            { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
            "-=0.15"
          );
          if (descLines.length > 0) {
            itemTl.to(
              descLines,
              { y: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: "power2.out" },
              "+=0.08"
            );
          }

          // Start idle loop after entrance finishes
          itemTl.add(() => {
            // This triggers the idle tween inside the child component implicitly, but since we scoped the child's idle tween independently, we can't easily start it from here without refs.
            // The item component will handle its own idle tween
          });

          tl.add(itemTl, startTime);
        });
      }

      // 3. Dividers
      const v1 = sectionRef.current?.querySelector(".v-div-1");
      const v2 = sectionRef.current?.querySelector(".v-div-2");
      const v3 = sectionRef.current?.querySelector(".v-div-3");
      const h1 = sectionRef.current?.querySelector(".h-div-1");

      if (v1 && v2 && v3 && h1) {
        // Draw V1 when item 1 (index 1) starts
        tl.to(v1, { scaleY: 1, duration: 0.4, ease: "power2.inOut", backgroundColor: "#009311" }, 1.2);
        tl.to(v1, { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.3 }, "+=0.1");

        // Draw V2 when item 2 (index 2) starts
        tl.to(v2, { scaleY: 1, duration: 0.4, ease: "power2.inOut", backgroundColor: "#009311" }, 1.4);
        tl.to(v2, { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.3 }, "+=0.1");

        // Draw H1 after row 1 finishes
        tl.to(h1, { scaleX: 1, duration: 0.4, ease: "power2.inOut", backgroundColor: "#009311" }, 1.8);
        tl.to(h1, { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.3 }, "+=0.1");

        // Draw V3 when item 4 (index 4) starts
        tl.to(v3, { scaleY: 1, duration: 0.4, ease: "power2.inOut", backgroundColor: "#009311" }, 2.3);
        tl.to(v3, { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.3 }, "+=0.1");
      }

      // Shimmer effect
      const shimmerContainer = sectionRef.current?.querySelector(".heading-split-container");
      if (shimmerContainer) {
        const shimmer = () => {
          gsap.fromTo(
            shimmerContainer,
            { backgroundPosition: "-200% 0" },
            {
              backgroundPosition: "200% 0",
              duration: 0.6,
              ease: "none",
              onComplete: () => {
                gsap.delayedCall(10, shimmer);
              },
            }
          );
        };
        gsap.delayedCall(5, shimmer);
      }
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-bg-light overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20">
        <div className="flex flex-col gap-2 pb-15 w-full relative z-20 items-center">
          <div ref={badgeRef} style={{ scale: 0.85, opacity: 0 }}>
            <AuroraBadge>The Solution</AuroraBadge>
          </div>

          <h2
            className="heading-split-container text-balance text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[120%] tracking-tight mx-auto text-center flex flex-wrap justify-center gap-x-2"
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0%, currentColor 45%, #009311 50%, currentColor 55%, currentColor 100%)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "inherit",
              backgroundPosition: "-200% 0",
            }}
          >
            <span
              ref={headingLeftRef}
              className="inline-block"
              style={{ transform: "translateX(-30px)", opacity: 0 }}
            >
              One verification.
            </span>
            <span
              ref={headingRightRef}
              className="relative inline-block"
              style={{ transform: "translateX(30px)", opacity: 0 }}
            >
              Trusted everywhere.
              <span
                ref={underlineRef}
                className="absolute bottom-0 left-0 h-[3px] bg-[#009311] rounded-full"
                style={{ width: "0%" }}
              />
            </span>
          </h2>
        </div>

        <div className="mt-10 max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 relative">
          {/* Horizontal Divider */}
          <div
            className="h-div-1 hidden md:block absolute top-[50%] left-0 right-0 h-[1px] bg-black/5 origin-center z-0"
            style={{ transform: "scaleX(0)" }}
          />

          {/* First Row */}
          <div
            ref={row1Ref}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 relative z-10"
          >
            {/* Vertical dividers */}
            <div
              className="v-div-1 hidden md:block absolute top-[-10%] bottom-[-10%] left-[33.33%] w-[1px] bg-black/5 origin-center z-0"
              style={{ transform: "scaleY(0)" }}
            />
            <div
              className="v-div-2 hidden md:block absolute top-[-10%] bottom-[-10%] left-[66.66%] w-[1px] bg-black/5 origin-center z-0"
              style={{ transform: "scaleY(0)" }}
            />

            {firstsolu.map((solu, idx) => (
              <SolutionItem key={`first-${idx}`} item={solu} />
            ))}
          </div>

          {/* Second Row */}
          <div
            ref={row2Ref}
            className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 md:gap-32 relative z-10"
          >
            <div
              className="v-div-3 hidden md:block absolute top-[-10%] bottom-[-10%] left-[50%] w-[1px] bg-black/5 origin-center z-0"
              style={{ transform: "scaleY(0)" }}
            />

            {secondsolu.map((solu, idx) => (
              <SolutionItem key={`second-${idx}`} item={solu} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
