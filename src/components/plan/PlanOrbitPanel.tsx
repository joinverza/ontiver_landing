import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import MagneticFillButton from "../ui/MagneticFillButton";
import TypewriterText from "./TypewriterText";

export type PlanResultState = "idle" | "analysing" | "calculating" | "result";

function LoadingDots() {
  return (
    <span className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-2 rounded-full bg-[#009311] animate-[plan-dot-wave_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${dot * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function PlanOrbitPanel({
  progress,
  filledInputCount,
  status,
  resultPlan,
  reason,
  calculationMessage,
  onViewPlan,
  onComparePlans,
}: {
  progress: number;
  filledInputCount: number;
  status: PlanResultState;
  resultPlan: string;
  reason: string;
  calculationMessage: string;
  onViewPlan: () => void;
  onComparePlans: () => void;
}) {
  const circleOpacity = [0.4, 0.55, 0.7, 0.85][filledInputCount] ?? 0.4;
  const circumference = 2 * Math.PI * 96;
  const dashOffset = circumference - (progress / 100) * circumference;
  const fast = status === "calculating";

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
      <div className="relative flex size-[260px] items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,147,17,0.2)_0%,transparent_62%)]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={
            status === "result"
              ? { scale: [0.5, 1.2], opacity: [0.25, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <svg className="size-full" viewBox="0 0 240 240" aria-hidden="true">
          <g
            className={
              fast
                ? "animate-[plan-orbit-cw_2s_linear_infinite]"
                : "animate-[plan-orbit-cw_18s_linear_infinite]"
            }
            style={{ transformOrigin: "120px 120px" }}
          >
            <circle
              cx="120"
              cy="120"
              r="96"
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="3"
              strokeDasharray="2 12"
              opacity={circleOpacity}
            />
          </g>
          <g
            className={
              fast
                ? "animate-[plan-orbit-ccw_1.5s_linear_infinite]"
                : "animate-[plan-orbit-ccw_12s_linear_infinite]"
            }
            style={{ transformOrigin: "120px 120px" }}
          >
            <circle
              cx="120"
              cy="120"
              r="70"
              fill="none"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="3"
              strokeDasharray="2 10"
              opacity={circleOpacity}
            />
          </g>
          <g
            className={
              fast
                ? "animate-[plan-orbit-cw_1s_linear_infinite]"
                : "animate-[plan-orbit-cw_7s_linear_infinite]"
            }
            style={{ transformOrigin: "120px 120px" }}
          >
            <circle
              cx="120"
              cy="120"
              r="43"
              fill="none"
              stroke="rgba(0,0,0,0.14)"
              strokeWidth="3"
              strokeDasharray="2 8"
              opacity={circleOpacity}
            />
          </g>
          <circle
            cx="120"
            cy="120"
            r="96"
            fill="none"
            stroke="#009311"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="-rotate-90 origin-center transition-[stroke-dashoffset,opacity] duration-500 ease-out"
            opacity={progress > 0 ? 1 : 0}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          {status === "result" ? (
            <>
              <TypewriterText
                text={resultPlan}
                className="text-3xl font-bold text-[#009311]"
              />
              <motion.p
                className="mt-2 text-xs leading-relaxed text-black/55"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.32 }}
              >
                {reason}
              </motion.p>
            </>
          ) : status === "calculating" ? (
            <TypewriterText
              text={calculationMessage}
              className="text-sm font-semibold text-[#009311]"
            />
          ) : status === "analysing" ? (
            <TypewriterText
              text="Analysing inputs..."
              className="text-sm font-semibold text-[#009311]"
            />
          ) : (
            <LoadingDots />
          )}
        </div>
      </div>

      <div className="mt-6 min-h-[42px]">
        {status === "result" ? (
          <motion.div
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#009311]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "backOut" }}
          >
            <Check className="size-4" />
            Ideal plan found
          </motion.div>
        ) : (
          <motion.p
            className="text-sm text-black/60 animate-[plan-label-breathe_3s_ease-in-out_infinite]"
            animate={{ opacity: status === "analysing" ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Finding Ideal Plan
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {status === "result" ? (
          <motion.div
            className="mt-4 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
          >
            <MagneticFillButton
              variant="green"
              className="h-10 rounded-lg px-5 text-sm font-medium"
              onClick={onViewPlan}
            >
              View {resultPlan}
            </MagneticFillButton>
            <MagneticFillButton
              variant="light"
              className="h-10 rounded-lg px-5 text-sm font-medium"
              onClick={onComparePlans}
            >
              Compare Plans
            </MagneticFillButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
