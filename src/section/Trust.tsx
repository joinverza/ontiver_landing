import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Text from "../components/base/Text";
import HoverEffect, { type HoverEffectItem } from "../components/ui/card-hover-effect";
import MagneticFillButton from "../components/ui/MagneticFillButton";
import SignalFlowBackground from "../components/ui/SignalFlowBackground";

const securityFeatures: HoverEffectItem[] = [
  {
    image: "./assets/atom.png",
    title: "Consent-Based Sharing",
    description: "All identity sharing requires user consent with full control and history.",
  },
  {
    image: "./assets/octagon.png",
    title: "Audit-Ready Records",
    description: "Every verification event is logged, timestamped, and exportable.",
  },
  {
    image: "./assets/cube2.png",
    title: "Secure API Access",
    description: "Business access is gated, permissioned, and monitored.",
  },
  {
    image: "./assets/binary.png",
    title: "Data Protection First",
    description:
      "Sensitive documents are handled with minimization principles. Not stored longer than needed.",
  },
];

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];
export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-bg-light px-6 py-24">
      <div className="absolute inset-0 z-0 opacity-45">
        <SignalFlowBackground />
      </div>
      <div className="relative z-10 mx-auto w-[min(100%,1040px)]">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <Text
            btext="Security & Trust"
            heading="Designed for sensitive identity data from day one."
            containerClassName="pb-12"
            badgeTextClassName="border border-black"
          />
        </motion.div>

        <HoverEffect items={securityFeatures} isInView={isInView} />

        <motion.div
          className="mx-auto mt-8 flex w-fit flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, ease: easeOut, delay: 1 }}
        >
          <MagneticFillButton
            variant="green"
            className="h-12 rounded-lg px-8 text-base font-medium"
          >
            Visit Security Page
          </MagneticFillButton>
          <MagneticFillButton
            variant="light"
            className="h-12 rounded-lg px-6 text-base font-medium"
          >
            Request Security Documentation
          </MagneticFillButton>
        </motion.div>
      </div>
    </section>
  );
}
