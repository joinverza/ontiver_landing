import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Text from "../components/base/Text";
import MagneticFillButton from "../components/ui/MagneticFillButton";

type FieldKey = "verifications" | "amlScreens" | "apiRequests";
type ToggleKey = "auditLogs" | "amlMonitoring" | "sla" | "testingOnly";
type ResultState = "idle" | "analysing" | "calculating" | "result";

type InputField = {
  key: FieldKey;
  label: string;
  placeholder: string;
  threshold: number;
};

type ToggleItem = {
  key: ToggleKey;
  label: string;
};

const inputFields: InputField[] = [
  {
    key: "verifications",
    label: "Monthly production verifications",
    placeholder: "Enter volume",
    threshold: 3000,
  },
  {
    key: "amlScreens",
    label: "Monthly AML screens",
    placeholder: "Enter AML screens",
    threshold: 500,
  },
  {
    key: "apiRequests",
    label: "Monthly API requests",
    placeholder: "Enter API requests",
    threshold: 100000,
  },
];

const toggleItems: ToggleItem[] = [
  { key: "auditLogs", label: "Need audit logs?" },
  { key: "amlMonitoring", label: "Need AML monitoring?" },
  { key: "sla", label: "Need SLA or dedicated onboarding?" },
  { key: "testingOnly", label: "Testing only?" },
];

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];
const panelEase: [number, number, number, number] = [0.2, 0, 0, 1];

function parseNumber(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatNumber(value: string) {
  const number = parseNumber(value);
  return number ? number.toLocaleString() : "";
}

function fieldProgress(field: InputField, value: string) {
  return Math.min(100, (parseNumber(value) / field.threshold) * 100);
}

function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    const timers = Array.from(text).map((_, index) =>
      window.setTimeout(() => {
        setVisibleText(text.slice(0, index + 1));
      }, index * 40)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [text]);

  return <span className={className}>{visibleText}</span>;
}

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

function PlanToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="plan-toggle-row group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[rgba(34,197,94,0.03)]"
    >
      <span className="text-sm font-medium text-black/78">{label}</span>
      <span
        className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
          checked ? "bg-[#009311]" : "bg-[#D9DFD9]"
        }`}
      >
        <motion.span
          className="absolute top-1 size-5 rounded-full bg-white"
          animate={{ x: checked ? 22 : 4 }}
          transition={{
            duration: checked ? 0.25 : 0.2,
            ease: checked ? [0.34, 1.56, 0.64, 1] : easeOut,
          }}
        />
        <AnimatePresence>
          {checked ? (
            <motion.span
              className="absolute top-1 right-1 size-5 rounded-full border border-[#70ff8a]"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
      </span>
    </button>
  );
}

function OrbitPanel({
  progress,
  filledInputCount,
  status,
  resultPlan,
  reason,
  calculationMessage,
}: {
  progress: number;
  filledInputCount: number;
  status: ResultState;
  resultPlan: string;
  reason: string;
  calculationMessage: string;
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
          animate={status === "result" ? { scale: [0.5, 1.2], opacity: [0.25, 0] } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <svg className="size-full" viewBox="0 0 240 240" aria-hidden="true">
          <g className={fast ? "animate-[plan-orbit-cw_2s_linear_infinite]" : "animate-[plan-orbit-cw_18s_linear_infinite]"} style={{ transformOrigin: "120px 120px" }}>
            <circle cx="120" cy="120" r="96" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="3" strokeDasharray="2 12" opacity={circleOpacity} />
          </g>
          <g className={fast ? "animate-[plan-orbit-ccw_1.5s_linear_infinite]" : "animate-[plan-orbit-ccw_12s_linear_infinite]"} style={{ transformOrigin: "120px 120px" }}>
            <circle cx="120" cy="120" r="70" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="3" strokeDasharray="2 10" opacity={circleOpacity} />
          </g>
          <g className={fast ? "animate-[plan-orbit-cw_1s_linear_infinite]" : "animate-[plan-orbit-cw_7s_linear_infinite]"} style={{ transformOrigin: "120px 120px" }}>
            <circle cx="120" cy="120" r="43" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="3" strokeDasharray="2 8" opacity={circleOpacity} />
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
              <TypewriterText text={resultPlan} className="text-3xl font-bold text-[#009311]" />
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
            <TypewriterText text={calculationMessage} className="text-sm font-semibold text-[#009311]" />
          ) : status === "analysing" ? (
            <TypewriterText text="Analysing inputs..." className="text-sm font-semibold text-[#009311]" />
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
            <MagneticFillButton variant="green" className="h-10 rounded-lg px-5 text-sm font-medium">
              View {resultPlan}
            </MagneticFillButton>
            <MagneticFillButton variant="light" className="h-10 rounded-lg px-5 text-sm font-medium">
              Compare Plans
            </MagneticFillButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Plan() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [values, setValues] = useState<Record<FieldKey, string>>({
    verifications: "",
    amlScreens: "",
    apiRequests: "",
  });
  const [focusedField, setFocusedField] = useState<FieldKey | null>(null);
  const [flashFields, setFlashFields] = useState(false);
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    auditLogs: false,
    amlMonitoring: false,
    sla: false,
    testingOnly: false,
  });
  const [status, setStatus] = useState<ResultState>("idle");
  const [calculationMessage, setCalculationMessage] = useState("Checking verifications...");
  const [resultPlan, setResultPlan] = useState("Growth");

  const filledInputCount = inputFields.filter((field) => parseNumber(values[field.key]) > 0).length;
  const toggledCount = Object.values(toggles).filter(Boolean).length;
  const progress = ((filledInputCount + toggledCount) / (inputFields.length + toggleItems.length)) * 100;

  useEffect(() => {
    if (filledInputCount === 0 || status === "calculating" || status === "result") return;
    setStatus("analysing");
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [values, filledInputCount, status]);

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

  const updateValue = (key: FieldKey, value: string) => {
    setStatus((current) => (current === "result" ? "analysing" : current));
    setValues((current) => ({ ...current, [key]: value.replace(/[^\d]/g, "") }));
  };

  const clearForm = () => {
    setFlashFields(true);
    setValues({ verifications: "", amlScreens: "", apiRequests: "" });
    toggleItems.forEach((item, index) => {
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
    <section ref={sectionRef} className="bg-[#f1f4ef] px-6 py-24">
      <div className="mx-auto w-[min(100%,1050px)]">
        <Text
          btext="Find Your Ideal Plan"
          heading="Plan Recommendation Tool"
          containerClassName="pb-12"
          badgeTextClassName="border border-black"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,536px)_minmax(360px,1fr)]">
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
              {inputFields.map((field, index) => {
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
                {toggleItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.78 + (inputFields.length + index) * 0.06 }}
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
                className="flex gap-2 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.25, ease: "easeOut", delay: 1.15 }}
              >
                <button
                  type="button"
                  onClick={clearForm}
                  className="h-11 w-1/3 rounded-lg border border-[#BFC8D2] px-4 text-sm font-medium text-[#0A0B0D] transition-colors hover:bg-black/[0.03]"
                >
                  Clear Form
                </button>
                <motion.div className="w-2/3" whileTap={{ scale: 0.97 }} transition={{ duration: 0.08 }}>
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
            className="min-h-[560px] rounded-3xl bg-white"
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: panelEase, delay: 0.1 }}
          >
            <OrbitPanel
              progress={progress}
              filledInputCount={filledInputCount}
              status={status}
              resultPlan={resultPlan}
              reason={recommended.reason}
              calculationMessage={calculationMessage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
