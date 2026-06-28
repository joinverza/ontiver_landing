import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Text from "./base/Text";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQGroup = {
  group: string;
  items: FAQItem[];
};

type ActiveFAQ = {
  groupIndex: number;
  itemIndex: number;
} | null;

type PricingFAQProps = {
  variant?: "pricing" | "home";
};

const faqGroups: FAQGroup[] = [
  {
    group: "Pricing",
    items: [
      {
        question: "What counts as a verification?",
        answer:
          "A verification is one completed identity check in a production flow. Sandbox uses test responses, while Launch, Growth, Compliance, and Enterprise plans count completed production outcomes.",
      },
      {
        question: "Can I switch plans mid-month?",
        answer:
          "Yes. Teams can move from Launch to Growth or Compliance when volume increases, and Enterprise workflows can be scoped with sales when your needs change.",
      },
      {
        question: "Do you offer refunds or a money-back guarantee?",
        answer:
          "Sandbox is free for integration testing. Paid Launch, Growth, Compliance, and Enterprise subscriptions are reviewed with the team based on usage and onboarding status.",
      },
      {
        question: "What happens if I exceed my verification limit?",
        answer:
          "Your account keeps working. You can move to Growth, Compliance, or Enterprise, or apply an overage arrangement based on verification and compliance volume.",
      },
    ],
  },
  {
    group: "Identity & Compliance",
    items: [
      {
        question: "Is AML screening included in all plans?",
        answer:
          "Sandbox includes test AML responses. Launch can add AML screening, while Growth, Compliance, and Enterprise include broader risk and monitoring options.",
      },
      {
        question: "How does credential reuse work for my users?",
        answer:
          "A user can verify once, then consent to reuse trusted proof across supported workflows. Growth, Compliance, and Enterprise plans are built for higher-volume reuse.",
      },
      {
        question: "Are verifications stored securely and tied to the user?",
        answer:
          "Yes. Ontiver keeps identity proof tied to the user with consent-aware access, audit logs, and controls suited for Compliance and Enterprise teams.",
      },
      {
        question: "What identity documents does Ontiver support?",
        answer:
          "Ontiver supports common identity document and biometric workflows for African markets, with Enterprise coverage reviewed during onboarding for specialized documents.",
      },
    ],
  },
  {
    group: "Integration",
    items: [
      {
        question: "Do you offer a free trial beyond Sandbox?",
        answer:
          "Sandbox is the free testing environment. Teams that need live pilots can start with Launch, then upgrade to Growth, Compliance, or Enterprise as usage scales.",
      },
      {
        question: "How long does it take to integrate Ontiver?",
        answer:
          "Most teams can start in Sandbox quickly with the API documentation. Launch and Growth integrations are usually straightforward, while Enterprise timelines depend on workflow scope.",
      },
      {
        question: "Is there a sandbox environment for testing?",
        answer:
          "Yes. Sandbox is designed for test keys, sample responses, API trials, and developer validation before moving to Launch or a larger production plan.",
      },
      {
        question: "Do you provide webhooks and API documentation?",
        answer:
          "Yes. API documentation is available from Sandbox onward, with webhook-driven workflows supported for Launch, Growth, Compliance, and Enterprise integrations.",
      },
    ],
  },
];

const planNames = new Set(["Sandbox", "Launch", "Growth", "Compliance", "Enterprise"]);
const homeGroupOrder = ["Identity & Compliance", "Integration", "Pricing"];

const faqHeading = {
  pricing: {
    btext: "Frequently Asked Question",
    heading: "Pricing questions, clear answers.",
  },
  home: {
    btext: "Frequently Asked Question",
    heading: "Everything teams ask before trusting Ontiver.",
  },
};

function isSameFAQ(active: ActiveFAQ, groupIndex: number, itemIndex: number) {
  return active?.groupIndex === groupIndex && active.itemIndex === itemIndex;
}

function AnswerWords({ answer }: { answer: string }) {
  const words = useMemo(() => answer.split(/(\s+)/), [answer]);

  return (
    <p className="max-w-[760px] pb-5 pt-1 text-sm leading-[1.7] text-[#6B7280]">
      {words.map((word, index) => {
        if (word.trim() === "") {
          return <span key={index}>{word}</span>;
        }

        const cleanWord = word.replace(/[^\w&]/g, "");
        const isPlanName = planNames.has(cleanWord);

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${isPlanName ? "font-semibold text-[#009311]" : ""}`}
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
    animate: { pathLength: [0, 1], opacity: [0, 1, 0], strokeDashoffset: [24, 0, -24] },
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
        style={{ maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)" }}
      >
        <motion.path d="M100 0.5 H0" stroke="var(--faq-dashed-color)" strokeWidth="1" strokeDasharray="4 5" {...commonPath} />
        <motion.path d="M100 0.5 H0" stroke="#70ff8a" strokeWidth="1.5" strokeDasharray="10 90" {...runnerPath} />
      </svg>
      <svg
        className="absolute top-0 left-0 h-full w-px"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}
      >
        <motion.path d="M0.5 100 V0" stroke="var(--faq-dashed-color)" strokeWidth="1" strokeDasharray="4 5" {...commonPath} />
        <motion.path d="M0.5 100 V0" stroke="#70ff8a" strokeWidth="1.5" strokeDasharray="10 90" {...runnerPath} />
      </svg>
      <svg
        className="absolute top-0 right-0 h-full w-px"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}
      >
        <motion.path d="M0.5 0 V100" stroke="var(--faq-dashed-color)" strokeWidth="1" strokeDasharray="4 5" {...commonPath} />
        <motion.path d="M0.5 0 V100" stroke="#70ff8a" strokeWidth="1.5" strokeDasharray="10 90" {...runnerPath} />
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
  entranceIndex,
}: {
  item: FAQItem;
  groupIndex: number;
  itemIndex: number;
  isOpen: boolean;
  onToggle: (groupIndex: number, itemIndex: number) => void;
  entranceIndex: number;
}) {
  return (
    <motion.div
      className="relative px-6 max-[640px]:px-3"
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: entranceIndex * 0.03 }}
    >
      <span
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-[linear-gradient(to_right,transparent,rgba(0,147,17,0.14)_12%,rgba(0,147,17,0.14)_88%,transparent)] [background-size:8px_1px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 overflow-visible rounded-lg px-5 transition-colors duration-300 ${
          isOpen ? "bg-white/70" : "hover:bg-white/45"
        }`}
        style={{ "--faq-dashed-color": "rgba(34,197,94,0.45)" } as CSSProperties}
      >
        <AnimatePresence>{isOpen ? <DashedLineFrame /> : null}</AnimatePresence>
        <button
          className="group relative z-10 flex w-full items-center justify-between gap-6 py-5 text-left"
          type="button"
          onClick={() => onToggle(groupIndex, itemIndex)}
        >
          <span
            className={`text-base transition-[color,font-weight] duration-200 ${
              isOpen ? "font-semibold text-black" : "font-medium text-[#111827] group-hover:text-black"
            }`}
          >
            {item.question}
          </span>
          <span
            className={`shrink-0 text-2xl leading-none transition-colors duration-200 ${
              isOpen ? "text-[#009311]" : "text-black/35 group-hover:text-[#009311]"
            }`}
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease, color 0.2s ease",
            }}
            aria-hidden="true"
          >
            +
          </span>
        </button>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              className="relative z-10 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], opacity: { duration: 0.2 } }}
            >
              <AnswerWords answer={item.answer} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PricingFAQ({ variant = "pricing" }: PricingFAQProps) {
  const [activeFAQ, setActiveFAQ] = useState<ActiveFAQ>(null);
  const [pulsedGroups, setPulsedGroups] = useState<Set<number>>(() => new Set());
  const rootRef = useRef<HTMLElement>(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.18 });
  const orderedGroups = useMemo(() => {
    if (variant === "pricing") return faqGroups;

    return homeGroupOrder
      .map((groupName) => faqGroups.find((group) => group.group === groupName))
      .filter((group): group is FAQGroup => Boolean(group));
  }, [variant]);
  const heading = faqHeading[variant];

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setActiveFAQ(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const handleToggle = (groupIndex: number, itemIndex: number) => {
    setActiveFAQ((current) => (isSameFAQ(current, groupIndex, itemIndex) ? null : { groupIndex, itemIndex }));

    setPulsedGroups((current) => {
      if (current.has(groupIndex)) return current;
      const next = new Set(current);
      next.add(groupIndex);
      return next;
    });
  };

  let entranceIndex = 0;

  return (
    <section ref={rootRef} className="bg-bg-light px-6 py-24">
      <div className="mx-auto w-[min(100%,1040px)]">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pb-12"
        >
          <Text
            btext={heading.btext}
            heading={heading.heading}
            containerClassName="pb-0"
            badgeTextClassName="border border-black"
          />
        </motion.div>

        <div className="grid gap-12">
          {orderedGroups.map((group, groupIndex) => {
            const titleEntranceIndex = entranceIndex++;

            return (
              <div key={group.group} className="grid gap-4">
                <motion.h3
                  animate={pulsedGroups.has(groupIndex) ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                  initial={{ y: 12, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: pulsedGroups.has(groupIndex) ? 0.3 : 0.4,
                    ease: "easeOut",
                    delay: pulsedGroups.has(groupIndex) ? 0 : titleEntranceIndex * 0.03,
                  }}
                  className="border-l-2 border-[#009311] pl-3 text-[13px] font-semibold uppercase tracking-widest text-[#009311]"
                >
                  {group.group}
                </motion.h3>
                <div className="relative grid">
                  <span
                    className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-[linear-gradient(to_bottom,rgba(0,147,17,0.16)_50%,transparent_0)] bg-[length:1px_8px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-[linear-gradient(to_bottom,rgba(0,147,17,0.16)_50%,transparent_0)] bg-[length:1px_8px] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
                    aria-hidden="true"
                  />
                  {group.items.map((item, itemIndex) => {
                    const rowEntranceIndex = entranceIndex++;

                    return (
                      <FAQRow
                        key={item.question}
                        item={item}
                        groupIndex={groupIndex}
                        itemIndex={itemIndex}
                        isOpen={isSameFAQ(activeFAQ, groupIndex, itemIndex)}
                        onToggle={handleToggle}
                        entranceIndex={rowEntranceIndex}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
