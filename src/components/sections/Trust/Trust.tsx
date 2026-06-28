import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Text from "../../base/Text";
import { securityFeatures } from "../../../data/trust";
import HoverEffect from "../../ui/card-hover-effect";
import MagneticFillButton from "../../ui/MagneticFillButton";
import SignalFlowBackground from "../../ui/SignalFlowBackground";

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];
export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-bg-light px-5 py-16 sm:px-6 sm:py-24">
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
            className="h-12 w-full rounded-lg px-6 text-sm font-medium sm:w-auto sm:px-8 sm:text-base"
          >
            Visit Security Page
          </MagneticFillButton>
          <MagneticFillButton
            variant="light"
            className="h-12 w-full rounded-lg px-5 text-sm font-medium sm:w-auto sm:px-6 sm:text-base"
          >
            Request Security Documentation
          </MagneticFillButton>
        </motion.div>
      </div>
    </section>
  );
}
