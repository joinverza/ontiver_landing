import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { problems } from "../../../data/problem";
import Text from "../../base/Text";
import ProblemCard from "../../ui/ProblemCard";
import SignalFlowBackground from "../../ui/SignalFlowBackground";


gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("deckSpread", "M0,0 C0.4,0 0.2,1 1,1");

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        gridRef.current,
        { opacity: 1 }, // Dummy animation so timeline isn't empty before mm.add
        { opacity: 1, duration: 0.1 }
      );

      mm.add("(min-width: 768px)", () => {
        const cards = Array.from(
          gridRef.current?.querySelectorAll(".problem-card-wrapper") || []
        ) as HTMLElement[];

        if (cards.length !== 3) return;

        const [card1, card2, card3] = cards;
        const line = sectionRef.current?.querySelector(".connecting-line");
        const nodes = sectionRef.current?.querySelectorAll(".connecting-node");

        card1.style.zIndex = "5";
        card2.style.zIndex = "10";
        card3.style.zIndex = "5";
        card1.style.transformOrigin = "right center";
        card3.style.transformOrigin = "left center";

        const r1 = card1.getBoundingClientRect();
        const r2 = card2.getBoundingClientRect();
        const r3 = card3.getBoundingClientRect();

        const dx1 = r2.left - r1.left;
        const dx3 = r2.left - r3.left;

        gsap.set(card1, { x: dx1, y: 80, opacity: 0, rotationZ: 0 });
        gsap.set(card2, { x: 0, y: 80, opacity: 0, rotationZ: 0 });
        gsap.set(card3, { x: dx3, y: 80, opacity: 0, rotationZ: 0 });
        if (nodes?.length) gsap.set(nodes, { opacity: 0 });
        if (line) gsap.set(line, { strokeDashoffset: 1 });

        tl.to(
          [card1, card2, card3],
          {
            y: 0,
            opacity: (index) => (index === 1 ? 1 : 0.88),
            duration: 0.4,
            ease: "power3.out",
          },
          "+=0.2"
        );

        tl.to(
          [card1, card3],
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "deckSpread",
          },
          "+=0.1"
        );

        tl.to(
          card1,
          {
            rotationZ: -4,
            duration: 0.2,
            ease: "power2.out",
          },
          "+=0"
        );

        tl.to(
          card3,
          {
            rotationZ: 4,
            duration: 0.2,
            ease: "power2.out",
          },
          "<"
        );

        if (line) {
          tl.to(
            line,
            {
              strokeDashoffset: 0,
              duration: 0.5,
              ease: "power1.inOut",
            },
            "+=0"
          );
        }

        if (nodes?.length) {
          tl.to(
            nodes,
            {
              opacity: 1,
              duration: 0.2,
              stagger: 0.09,
              ease: "power1.out",
            },
            "<0.18"
          );
        }
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gridRef.current?.querySelectorAll(".problem-card-wrapper");
        if (!cards?.length) return;

        gsap.set(cards, { y: 40, opacity: 0, rotationZ: 0, x: 0 });
        tl.to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.2,
          },
          "+=0.2"
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-bg-light overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <SignalFlowBackground />  
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-20 pb-32 px-6 md:px-10 lg:px-20">
        <div className="flex flex-col gap-2 w-full relative z-20">
          <Text 
            btext="The Problem" 
            heading="Why building digital products still feels harder than it should." 
          />
        </div>

        <div className="relative z-10">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
          >
            {problems.map((prob) => (
              <div
                key={prob.title}
                className="problem-card-wrapper relative will-change-transform"
                style={{ opacity: 0 }}
              >
                <ProblemCard
                  illustration={prob.illustration}
                  title={prob.title}
                  description={prob.para}
                />
              </div>
            ))}
          </div>

          <div className="absolute left-[16.666%] right-[16.666%] bottom-12 h-20 translate-y-full z-0 hidden md:block pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,0 L 25,15 L 75,15 L 100,0"
                fill="none"
                stroke="#009311"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
                className="connecting-line"
              />
              <path
                d="M 24,12 L 26,18 M 74,18 L 76,12"
                fill="none"
                stroke="#009311"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="connecting-node opacity-0"
              />
              <circle
                cx="25"
                cy="15"
                r="1.5"
                fill="#009311"
                className="connecting-node opacity-0"
              />
              <path
                d="M 50,12 L 53,15 L 50,18 L 47,15 Z"
                fill="#009311"
                className="connecting-node opacity-0"
              />
              <circle
                cx="75"
                cy="15"
                r="1.5"
                fill="#009311"
                className="connecting-node opacity-0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
