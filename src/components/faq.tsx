import { useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  faqGroups,
  faqHeading,
  homeGroupOrder,
  planNames,
  type FAQGroup,
  type FAQItem,
} from "../data/faq";
import Text from "./base/Text";

gsap.registerPlugin(ScrollTrigger);

type ActiveFAQ = {
  groupIndex: number;
  itemIndex: number;
} | null;

type PricingFAQProps = {
  variant?: "pricing" | "home";
};

function isSameFAQ(active: ActiveFAQ, groupIndex: number, itemIndex: number) {
  return active?.groupIndex === groupIndex && active.itemIndex === itemIndex;
}

function AnswerWords({ answer }: { answer: string }) {
  const words = useMemo(() => answer.split(/(\s+)/), [answer]);

  return (
    <p className="max-w-[640px] pb-5 pt-1 text-sm leading-[1.7] text-[#6B7280]">
      {words.map((word, index) => {
        if (word.trim() === "") {
          return <span key={index}>{word}</span>;
        }

        const cleanWord = word.replace(/[^\w&]/g, "");
        const isPlanName = planNames.has(cleanWord);

        return (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className={`inline-block ${
                isPlanName ? "font-semibold text-[#009311]" : ""
              }`}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.2,
                delay: Math.min(index * 0.015, 0.32),
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}

function QuestionWords({ question }: { question: string }) {
  const words = useMemo(() => question.split(/(\s+)/), [question]);

  return (
    <span className="block">
      {words.map((word, index) => {
        if (word.trim() === "") {
          return <span key={index}>{word}</span>;
        }

        return (
          <span
            key={`${word}-${index}`}
            className="faq-question-word inline-block overflow-hidden align-bottom"
          >
            <span className="inline-block">{word}</span>
          </span>
        );
      })}
    </span>
  );
}

function DashedLineFrame() {
  const lineEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
  const commonPath = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    exit: { pathLength: 0, opacity: 0 },
    transition: { duration: 0.4, ease: lineEase },
  };
  const runnerPath = {
    initial: { pathLength: 0, opacity: 0, strokeDashoffset: 24 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1, 0],
      strokeDashoffset: [24, 0, -24],
    },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: lineEase, delay: 0.08 },
  };

  return (
    <motion.div
      className="pointer-events-none absolute -inset-y-3 inset-x-0 z-0 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-3 left-0 h-px w-full"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <motion.path
          d="M100 0.5 H0"
          stroke="var(--faq-dashed-color)"
          strokeWidth="1"
          strokeDasharray="4 5"
          {...commonPath}
        />
        <motion.path
          d="M100 0.5 H0"
          stroke="#70ff8a"
          strokeWidth="1.5"
          strokeDasharray="10 90"
          {...runnerPath}
        />
      </svg>
      <svg
        className="absolute left-0 top-0 h-full w-px"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.path
          d="M0.5 100 V0"
          stroke="var(--faq-dashed-color)"
          strokeWidth="1"
          strokeDasharray="4 5"
          {...commonPath}
        />
        <motion.path
          d="M0.5 100 V0"
          stroke="#70ff8a"
          strokeWidth="1.5"
          strokeDasharray="10 90"
          {...runnerPath}
        />
      </svg>
      <svg
        className="absolute right-0 top-0 h-full w-px"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.path
          d="M0.5 0 V100"
          stroke="var(--faq-dashed-color)"
          strokeWidth="1"
          strokeDasharray="4 5"
          {...commonPath}
        />
        <motion.path
          d="M0.5 0 V100"
          stroke="#70ff8a"
          strokeWidth="1.5"
          strokeDasharray="10 90"
          {...runnerPath}
        />
      </svg>
    </motion.div>
  );
}

function FAQRow({
  item,
  groupIndex,
  itemIndex,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  groupIndex: number;
  itemIndex: number;
  isOpen: boolean;
  onToggle: (groupIndex: number, itemIndex: number) => void;
}) {
  return (
    <div
      data-faq-row
      className="relative z-[2] px-0 sm:px-4"
    >
      <span
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(to_right,transparent,rgba(0,147,17,0.14)_12%,rgba(0,147,17,0.14)_88%,transparent)] [background-size:8px_1px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      />
      <div
        className={`relative z-[2] overflow-visible rounded-lg px-5 transition-colors duration-300 ${
          isOpen ? "bg-white/70" : "hover:bg-white/45"
        }`}
        style={
          { "--faq-dashed-color": "rgba(34,197,94,0.45)" } as CSSProperties
        }
      >
        <AnimatePresence>{isOpen ? <DashedLineFrame /> : null}</AnimatePresence>
        <button
          data-faq-question
          className="group relative z-[2] block w-full cursor-pointer py-5 pr-12 text-left"
          type="button"
          onClick={() => onToggle(groupIndex, itemIndex)}
        >
          <span
            className={`block text-base transition-[color,font-weight] duration-200 ${
              isOpen
                ? "font-semibold text-black"
                : "font-medium text-[#111827] group-hover:text-black"
            }`}
          >
            <QuestionWords question={item.question} />
          </span>
          <span
            className={`absolute right-0 top-1/2 shrink-0 text-2xl leading-none transition-[color,transform] duration-300 ${
              isOpen
                ? "-translate-y-1/2 rotate-45 text-[#009311]"
                : "-translate-y-1/2 rotate-0 text-black/35 group-hover:text-[#009311]"
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              className="relative z-[2] overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.2 },
              }}
            >
              <AnswerWords answer={item.answer} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PricingFAQ({ variant = "pricing" }: PricingFAQProps) {
  const [activeFAQ, setActiveFAQ] = useState<ActiveFAQ>(null);
  const rootRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const orderedGroups = useMemo(() => {
    if (variant === "pricing") return faqGroups;

    return homeGroupOrder
      .map((groupName) => faqGroups.find((group) => group.group === groupName))
      .filter((group): group is FAQGroup => Boolean(group));
  }, [variant]);
  const heading = faqHeading[variant];

  useGSAP(
    () => {
      const root = rootRef.current;
      const leftPanel = leftPanelRef.current;
      const accordionPanel = accordionRef.current;

      if (!root || !leftPanel || !accordionPanel) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const badge = leftPanel.querySelector<HTMLElement>(".faq-heading-badge");
      const headingWords = gsap.utils.toArray<HTMLElement>(
        leftPanel.querySelectorAll(".faq-heading-text .heading-word"),
      );
      const groupLabels = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-faq-group-label]"),
      );
      const faqRows = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-faq-row]"),
      );
      const questionWords = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".faq-question-word > span"),
      );
      const rightRevealItems = [...groupLabels, ...faqRows];

      gsap.set(rightRevealItems, {
        opacity: 0,
        y: 24,
        filter: "blur(8px)",
      });
      gsap.set(questionWords, { opacity: 0, y: 12 });

      const faqTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      faqTl
        .fromTo(
          badge,
          { opacity: 0, scale: 0.88, y: -12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
        )
        .fromTo(
          headingWords,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.04,
          },
          "-=0.2",
        )
        .fromTo(
          accordionPanel,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.55, ease: "power2.out" },
          "-=0.3",
        );

      const rightRevealTimelines = rightRevealItems.map((item) => {
        const words = gsap.utils.toArray<HTMLElement>(
          item.querySelectorAll(".faq-question-word > span"),
        );
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            end: "top 58%",
            toggleActions: "play none none reverse",
          },
        });

        timeline.to(item, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        });

        if (words.length) {
          timeline.to(
            words,
            {
              opacity: 1,
              y: 0,
              duration: 0.36,
              ease: "power2.out",
              stagger: 0.012,
            },
            "-=0.34",
          );
        }

        return timeline;
      });

      return () => {
        faqTl.kill();
        rightRevealTimelines.forEach((timeline) => timeline.kill());
        gsap.set([...rightRevealItems, ...questionWords], {
          clearProps: "opacity,transform,filter",
        });
      };
    },
    { scope: rootRef, dependencies: [variant] },
  );

  const handleToggle = (groupIndex: number, itemIndex: number) => {
    setActiveFAQ((current) =>
      isSameFAQ(current, groupIndex, itemIndex)
        ? null
        : { groupIndex, itemIndex },
    );
  };

  return (
    <section
      id="faq"
      ref={rootRef}
      data-section-reveal="off"
      className="relative z-[1] bg-[#f1f4ef] px-5 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.58fr)] lg:gap-[5%]">
        <div
          ref={leftPanelRef}
          data-faq-left-panel
          className="relative z-[2] h-fit lg:sticky lg:top-[35vh] lg:-translate-y-1/2 lg:self-start pt-0 lg:pt-64"
        >
          <div data-faq-heading-block>
            <Text
              btext={heading.btext}
              heading={heading.heading}
              animate={false}
              containerClassName="items-start pb-0"
              badgeTextClassName="border border-black"
              badgeWrapperClassName="faq-heading-badge !mx-0"
              headingClassName="faq-heading-text !mx-0 max-w-[12ch] !text-left text-[clamp(3rem,3.8vw,2.8rem)] font-medium leading-[1.2]! tracking-wide"
            />
          </div>
        </div>

              {/* <div className="relative z-2 flex h-fit w-full lg:sticky lg:top-[35vh] lg:-translate-y-1/2 lg:self-start pt-0 lg:pt-64">
                <Text
                  btext="Security & Trust"
                  heading="Designed for sensitive identity data."
                  animate={false}
                  containerClassName="items-start gap-5 pb-0"
                  badgeWrapperClassName="!mx-0 self-start text-start"
                  badgeTextClassName="border border-black/25 bg-white/70 text-[#009311]"
                  headingClassName="!mx-0 max-w-[9ch] !text-left text-[clamp(3rem,3.8vw,4.8rem)] font-medium leading-[1.2]! tracking-wide"
                />
                <LinkArrow
                  href="/contact"
                  className="mt-12 w-fit"
                >
                  Request documentation
                </LinkArrow>
              </div> */}

        <div
          ref={accordionRef}
          data-faq-accordion
          className="relative z-[2] grid w-full max-w-[720px] justify-self-end gap-12"
        >
          {orderedGroups.map((group, groupIndex) => (
            <div key={group.group} className="grid gap-3">
              <div
                data-faq-group-label
                className="relative z-[3] mb-3 flex items-center gap-3 border-l-[3px] border-[#009311] pl-3 text-[13px] font-semibold uppercase tracking-widest text-[#009311]"
              >
                <span>{group.group}</span>
                <span className="text-[11px] text-[#009311]/45">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative z-[2] grid">
                <span
                  className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-[linear-gradient(to_bottom,rgba(0,147,17,0.16)_50%,transparent_0)] bg-[length:1px_8px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute bottom-0 right-0 top-0 w-px bg-[linear-gradient(to_bottom,rgba(0,147,17,0.16)_50%,transparent_0)] bg-[length:1px_8px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
                  aria-hidden="true"
                />
                {group.items.map((item, itemIndex) => (
                  <FAQRow
                    key={item.question}
                    item={item}
                    groupIndex={groupIndex}
                    itemIndex={itemIndex}
                    isOpen={isSameFAQ(activeFAQ, groupIndex, itemIndex)}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
