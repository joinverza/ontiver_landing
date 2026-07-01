import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  planInitialToggles,
  planInitialValues,
  planInputFields,
  planToggleItems,
  type PlanFieldKey,
  type PlanInputField,
  type PlanToggleKey,
} from "../../../data/plan";
import Text from "../../base/Text";
import MagneticFillButton from "../../ui/MagneticFillButton";
import PlanOrbitPanel, {
  type PlanResultState,
} from "../../plan/PlanOrbitPanel";
import PlanToggle from "../../plan/PlanToggle";

const panelEase: [number, number, number, number] = [0.2, 0, 0, 1];

function parseNumber(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatNumber(value: string) {
  const number = parseNumber(value);
  return number ? number.toLocaleString() : "";
}

function fieldProgress(field: PlanInputField, value: string) {
  return Math.min(100, (parseNumber(value) / field.threshold) * 100);
}

type PlanProps = {
  onViewPlan?: () => void;
  onComparePlans?: () => void;
};

export default function Plan({ onViewPlan, onComparePlans }: PlanProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [values, setValues] =
    useState<Record<PlanFieldKey, string>>(planInitialValues);
  const [focusedField, setFocusedField] = useState<PlanFieldKey | null>(null);
  const [flashFields, setFlashFields] = useState(false);
  const [toggles, setToggles] =
    useState<Record<PlanToggleKey, boolean>>(planInitialToggles);
  const [status, setStatus] = useState<PlanResultState>("idle");
  const [calculationMessage, setCalculationMessage] = useState("Checking verifications...");
  const [resultPlan, setResultPlan] = useState("Growth");

  const filledInputCount = planInputFields.filter((field) => parseNumber(values[field.key]) > 0).length;
  const toggledCount = Object.values(toggles).filter(Boolean).length;
  const progress =
    ((filledInputCount + toggledCount) /
      (planInputFields.length + planToggleItems.length)) *
    100;

  useEffect(() => {
    if (status !== "analysing") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const recommended = useMemo(() => {
    const verifications = parseNumber(values.verifications);
    const aml = parseNumber(values.amlScreens);
    const api = parseNumber(values.apiRequests);

    if (toggles.testingOnly && verifications === 0 && aml === 0 && api === 0) {
      return {
        plan: "Sandbox",
        reason: "Best fit for integration testing before production volume.",
      };
    }
    if (toggles.sla || verifications > 3000 || api > 100000) {
      return {
        plan: "Enterprise",
        reason: "Best fit for custom volume, SLAs, and dedicated onboarding.",
      };
    }
    if (toggles.auditLogs || toggles.amlMonitoring || aml > 500 || verifications > 1000) {
      return {
        plan: "Compliance",
        reason: "Best fit for audit-ready workflows and risk coverage.",
      };
    }
    if (verifications > 500 || aml > 0 || api > 5000) {
      return {
        plan: "Growth",
        reason: "Best fit for your verification volume and AML requirements.",
      };
    }
    return {
      plan: "Launch",
      reason: "Best fit for early production pilots and small compliance teams.",
    };
  }, [toggles, values]);

  const updateValue = (key: PlanFieldKey, value: string) => {
    const sanitizedValue = value.replace(/[^\d]/g, "");
    const hasInput = planInputFields.some((field) =>
      parseNumber(field.key === key ? sanitizedValue : values[field.key])
    );
    setStatus((current) =>
      current === "calculating" ? current : hasInput ? "analysing" : "idle"
    );
    setValues((current) => ({ ...current, [key]: sanitizedValue }));
  };

  const clearForm = () => {
    setFlashFields(true);
    setValues(planInitialValues);
    planToggleItems.forEach((item, index) => {
      window.setTimeout(() => {
        setToggles((current) => ({ ...current, [item.key]: false }));
      }, index * 30);
    });
    setStatus("idle");
    window.setTimeout(() => setFlashFields(false), 220);
  };

  const checkBestPlan = () => {
    setStatus("calculating");
    setResultPlan(recommended.plan);
    const messages = ["Checking verifications...", "Evaluating AML needs...", "Matching plan..."];
    messages.forEach((message, index) => {
      window.setTimeout(() => setCalculationMessage(message), index * 450);
    });
    window.setTimeout(() => {
      setResultPlan(recommended.plan);
      setStatus("result");
    }, 1800);
  };

  return (
    <section ref={sectionRef} className="bg-[#f1f4ef] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-[min(100%,1050px)]">
        <Text
          btext="Find Your Ideal Plan"
          heading="Plan Recommendation Tool"
          containerClassName="pb-12"
          badgeTextClassName="border border-black"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,536px)_minmax(0,1fr)]">
          <motion.div
            ref={leftPanelRef}
            className="rounded-3xl bg-white px-6 py-6 md:px-8"
            initial={{ opacity: 0, x: -32, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: panelEase }}
          >
            <div className="overflow-hidden pb-10">
              <motion.h2
                className="text-lg font-semibold text-black"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Find Your Ideal Plan
              </motion.h2>
            </div>

            <div className="space-y-5">
              {planInputFields.map((field, index) => {
                const focused = focusedField === field.key;
                const value = values[field.key];
                const progressWidth = fieldProgress(field, value);

                return (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.6 + index * 0.06 }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      className={`text-sm font-medium transition-colors duration-150 ${
                        focused ? "text-[#009311]" : "text-black/65"
                      }`}
                    >
                      {field.label}
                    </label>
                    <input
                      inputMode="numeric"
                      className={`rounded-lg border px-3 py-4 text-sm text-black outline-none transition-[border-color,box-shadow,background-color] duration-200 ${
                        focused
                          ? "border-[#009311]/60 [box-shadow:0_0_0_3px_rgba(34,197,94,0.08)]"
                          : "border-[#E1E1E1]"
                      } ${flashFields ? "bg-red-500/[0.06]" : "bg-white"}`}
                      placeholder={field.placeholder}
                      value={focused ? value : formatNumber(value)}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                    />
                    <span className="h-px w-full overflow-hidden rounded-full bg-black/5">
                      <span
                        className="block h-full rounded-full bg-[#009311] transition-[width,opacity] duration-300 ease-out"
                        style={{
                          width: `${progressWidth}%`,
                          opacity: 0.28 + (progressWidth / 100) * 0.72,
                        }}
                      />
                    </span>
                  </motion.div>
                );
              })}

              <div className="space-y-1 pt-2">
                {planToggleItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.78 + (planInputFields.length + index) * 0.06 }}
                  >
                    <PlanToggle
                      label={item.label}
                      checked={toggles[item.key]}
                      onChange={() =>
                        setToggles((current) => ({ ...current, [item.key]: !current[item.key] }))
                      }
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-col gap-2 pt-4 sm:flex-row"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.25, ease: "easeOut", delay: 1.15 }}
              >
                <button
                  type="button"
                  onClick={clearForm}
                  className="h-11 w-full rounded-lg border border-[#BFC8D2] px-4 text-sm font-medium text-[#0A0B0D] transition-colors hover:bg-black/[0.03] sm:w-1/3"
                >
                  Clear Form
                </button>
                <motion.div className="w-full sm:w-2/3" whileTap={{ scale: 0.97 }} transition={{ duration: 0.08 }}>
                  <MagneticFillButton
                    variant="green"
                    className="h-11 w-full rounded-lg px-4 text-sm font-medium"
                    onClick={checkBestPlan}
                  >
                    Check Best Plan
                  </MagneticFillButton>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="min-h-[420px] rounded-3xl bg-white sm:min-h-[560px]"
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: panelEase, delay: 0.1 }}
          >
            <PlanOrbitPanel
              progress={progress}
              filledInputCount={filledInputCount}
              status={status}
              resultPlan={resultPlan}
              reason={recommended.reason}
              calculationMessage={calculationMessage}
              onViewPlan={
                onViewPlan ??
                (() =>
                  document.getElementById("pricing-plans")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }))
              }
              onComparePlans={
                onComparePlans ??
                (() =>
                  document.getElementById("plan-comparison")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }))
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
