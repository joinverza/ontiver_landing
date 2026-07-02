import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import type { RefObject } from "react";
import type { CalculatorStatus, SavingsResult } from "../../data/calculator";
import { formatCurrency } from "../../lib/calculator";
import MagneticFillButton from "../ui/MagneticFillButton";

const ringRadius = 112;
const ringCircumference = 2 * Math.PI * ringRadius;

function DotWave({ fast = false }: { fast?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.span
          key={index}
          className="h-2.5 w-2.5 rounded-full bg-[#009311]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: fast ? 0.75 : 1.2,
            delay: index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

type CalculatorResultsPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  outerRingRef: RefObject<SVGGElement | null>;
  middleRingRef: RefObject<SVGGElement | null>;
  innerRingRef: RefObject<SVGGElement | null>;
  outerStrokeRef: RefObject<SVGCircleElement | null>;
  middleStrokeRef: RefObject<SVGCircleElement | null>;
  innerStrokeRef: RefObject<SVGCircleElement | null>;
  status: CalculatorStatus;
  circleOpacity: number;
  activeArcPercent: number;
  arcPulse: boolean;
  visibleMetrics: number;
  displayedResult: SavingsResult;
  processingLabel: string;
  showResultActions: boolean;
  onShare: () => void;
  onViewRecommendedPlan: () => void;
};

export default function CalculatorResultsPanel({
  panelRef,
  outerRingRef,
  middleRingRef,
  innerRingRef,
  outerStrokeRef,
  middleStrokeRef,
  innerStrokeRef,
  status,
  circleOpacity,
  activeArcPercent,
  arcPulse,
  visibleMetrics,
  displayedResult,
  processingLabel,
  showResultActions,
  onShare,
  onViewRecommendedPlan,
}: CalculatorResultsPanelProps) {
  return (
    <div ref={panelRef} className="rounded-3xl bg-white px-6 py-6 md:px-10">
      <div className="flex min-h-[360px] flex-col items-center justify-center sm:min-h-[470px]">
        <motion.div
          className="relative grid h-[min(72vw,315px)] w-[min(72vw,315px)] place-items-center"
          animate={{
            opacity: status === "calculating" ? 1 : circleOpacity,
            scale: 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <svg className="h-full w-full overflow-visible" viewBox="0 0 260 260">
            <g ref={outerRingRef}>
              <circle
                ref={outerStrokeRef}
                cx="130"
                cy="130"
                r={ringRadius}
                fill="none"
                stroke="#00291B"
                strokeDasharray="2 11"
                strokeLinecap="round"
                strokeOpacity="0.35"
                strokeWidth="3"
              />
            </g>
            <g ref={middleRingRef}>
              <circle
                ref={middleStrokeRef}
                cx="130"
                cy="130"
                r="83"
                fill="none"
                stroke="#009311"
                strokeDasharray="2 9"
                strokeLinecap="round"
                strokeOpacity="0.35"
                strokeWidth="3"
              />
            </g>
            <g ref={innerRingRef}>
              <circle
                ref={innerStrokeRef}
                cx="130"
                cy="130"
                r="51"
                fill="none"
                stroke="#00291B"
                strokeDasharray="2 8"
                strokeLinecap="round"
                strokeOpacity="0.35"
                strokeWidth="3"
              />
            </g>
            <motion.circle
              cx="130"
              cy="130"
              r={ringRadius}
              fill="none"
              stroke="#009311"
              strokeDasharray={ringCircumference}
              strokeDashoffset={
                ringCircumference - ringCircumference * (activeArcPercent / 100)
              }
              strokeLinecap="round"
              strokeWidth="4"
              style={{
                rotate: -90,
                transformOrigin: "130px 130px",
                transition: "stroke-dashoffset 500ms ease-out",
              }}
              animate={{ strokeOpacity: arcPulse ? [1, 0.4, 1] : 0.95 }}
              transition={{ duration: arcPulse ? 0.4 : 0.2 }}
            />
          </svg>

          <div className="absolute inset-0 grid place-items-center text-center">
            <DotWave fast={status === "calculating"} />
          </div>
        </motion.div>

        <AnimatePresence>
          {status === "result" ? (
            <motion.div
              key="results-under-circle"
              className="mt-2 grid w-full max-w-[360px] gap-3 text-center sm:grid-cols-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {visibleMetrics >= 1 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xs font-medium text-black/45">
                    {displayedResult.monthlyPlanCost === null
                      ? "Monthly Value"
                      : "Net Monthly Savings"}
                  </p>
                  <p className="text-xl font-bold text-[#009311]">
                    {formatCurrency(displayedResult.monthlySavings)}
                  </p>
                </motion.div>
              ) : null}
              {visibleMetrics >= 2 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xs font-medium text-black/45">
                    Annual Savings
                  </p>
                  <p className="text-xl font-bold text-[#009311]">
                    {formatCurrency(displayedResult.annualSavings)}
                  </p>
                </motion.div>
              ) : null}
              {visibleMetrics >= 3 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <p className="text-xs font-medium text-black/45">
                    Drop-off Recovery
                  </p>
                  <p className="text-xl font-bold text-[#009311]">
                    {Math.round(displayedResult.recoveryRate)}%
                  </p>
                </motion.div>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {status === "result" ? (
          <p className="mt-4 rounded-full bg-[#f1f4ef] px-4 py-2 text-xs font-semibold text-[#005e19]">
            Recommended: {displayedResult.recommendedPlan} ·{" "}
            {displayedResult.monthlyPlanCost === null
              ? "Custom pricing"
              : `${formatCurrency(displayedResult.monthlyPlanCost)}/month`}
          </p>
        ) : null}

        <div className="mt-5 min-h-8 text-center">
          <AnimatePresence mode="wait">
            {status === "result" ? (
              <motion.div
                key="done"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#009311]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                <motion.span
                  className="grid h-6 w-6 place-items-center rounded-full bg-[#009311] text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 13 }}
                >
                  <Check size={14} strokeWidth={3} />
                </motion.span>
                Savings calculated
              </motion.div>
            ) : (
              <motion.p
                key={status}
                className={`text-sm font-medium ${
                  status === "idle" ? "text-black/45" : "text-[#009311]"
                }`}
                animate={
                  status === "idle" ? { opacity: [0.5, 0.9, 0.5] } : { opacity: 1 }
                }
                transition={{
                  duration: status === "idle" ? 3 : 0.2,
                  repeat: status === "idle" ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                {status === "calculating"
                  ? processingLabel || "Calculating savings..."
                  : status === "updating"
                    ? "Updating inputs..."
                    : "Calculation Loading"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showResultActions ? (
            <motion.div
              className="mt-7 grid w-full gap-3 sm:grid-cols-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <MagneticFillButton
                variant="green"
                className="h-11 rounded-lg px-4 text-sm font-medium"
                onClick={onViewRecommendedPlan}
              >
                View Recommended Plan
              </MagneticFillButton>
              <motion.button
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#009311]/35 bg-white px-4 text-sm font-medium text-[#005e19] transition-colors duration-200 hover:bg-[#F8FFF8]"
                type="button"
                onClick={onShare}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
              >
                <Share2 size={16} />
                Share Results
              </motion.button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
