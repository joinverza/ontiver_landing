import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, RotateCcw, Share2 } from "lucide-react";
import Text from "../components/base/Text";
import MagneticFillButton from "../components/ui/MagneticFillButton";

gsap.registerPlugin(ScrollTrigger);

type FieldKey =
  | "monthlyVerifications"
  | "costPerVerification"
  | "averageRevenue"
  | "manualReviewLoss";

type CalculatorStatus = "idle" | "updating" | "calculating" | "result";

type CalculatorField = {
  key: FieldKey;
  label: string;
  placeholder: string;
  prefix?: string;
};

type SavingsResult = {
  monthlySavings: number;
  annualSavings: number;
  recoveryRate: number;
};

const calculatorFields: CalculatorField[] = [
  {
    key: "monthlyVerifications",
    label: "Monthly Verifications",
    placeholder: "1,000",
  },
  {
    key: "costPerVerification",
    label: "Cost Per Verification",
    placeholder: "150",
    prefix: "$",
  },
  {
    key: "averageRevenue",
    label: "Average Revenue Per User",
    placeholder: "150",
    prefix: "$",
  },
  {
    key: "manualReviewLoss",
    label: "Monthly Fraud / Manual Review Loss",
    placeholder: "150",
    prefix: "$",
  },
];

const initialValues: Record<FieldKey, string> = {
  monthlyVerifications: "",
  costPerVerification: "",
  averageRevenue: "",
  manualReviewLoss: "",
};

const ringRadius = 112;
const ringCircumference = 2 * Math.PI * ringRadius;

function parseAmount(value: string) {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function mixColor(value: number) {
  const progress = value / 100;
  const gray = [107, 114, 128];
  const green = [0, 147, 17];
  const channel = (index: number) =>
    Math.round(gray[index] + (green[index] - gray[index]) * progress);

  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

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

function CalculatingDots() {
  return (
    <span className="inline-flex w-6 justify-start">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 0.8,
            delay: index * 0.16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export default function Calculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGGElement>(null);
  const middleRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);
  const outerStrokeRef = useRef<SVGCircleElement>(null);
  const middleStrokeRef = useRef<SVGCircleElement>(null);
  const innerStrokeRef = useRef<SVGCircleElement>(null);
  const rotationsRef = useRef<gsap.core.Tween[]>([]);
  const timersRef = useRef<number[]>([]);
  const statusResetTimerRef = useRef<number | null>(null);

  const [values, setValues] = useState<Record<FieldKey, string>>(initialValues);
  const [focusedField, setFocusedField] = useState<FieldKey | null>(null);
  const [pulseField, setPulseField] = useState<FieldKey | null>(null);
  const [dropOffRate, setDropOffRate] = useState(50);
  const [sliderTouched, setSliderTouched] = useState(false);
  const [sliderPopKey, setSliderPopKey] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [flashFields, setFlashFields] = useState(false);
  const [status, setStatus] = useState<CalculatorStatus>("idle");
  const [processingLabel, setProcessingLabel] = useState("");
  const [arcOverride, setArcOverride] = useState<number | null>(null);
  const [arcPulse, setArcPulse] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState(0);
  const [showResultActions, setShowResultActions] = useState(false);
  const [displayedResult, setDisplayedResult] = useState<SavingsResult>({
    monthlySavings: 0,
    annualSavings: 0,
    recoveryRate: 0,
  });

  const filledCount = useMemo(() => {
    const filledFields = calculatorFields.filter((field) => values[field.key].trim()).length;
    return filledFields + (sliderTouched ? 1 : 0);
  }, [sliderTouched, values]);

  const completionPercent = filledCount * 20;
  const activeArcPercent = arcOverride ?? completionPercent;
  const circleOpacity = 0.35 + (filledCount / 5) * 0.55;
  const speedScale = 1 + (filledCount / 5) * 0.4;
  const sliderColor = mixColor(dropOffRate);

  const result = useMemo<SavingsResult>(() => {
    const monthlyVerifications = parseAmount(values.monthlyVerifications);
    const costPerVerification = parseAmount(values.costPerVerification);
    const averageRevenue = parseAmount(values.averageRevenue);
    const manualReviewLoss = parseAmount(values.manualReviewLoss);
    const recoveredUsers = monthlyVerifications * (dropOffRate / 100) * 0.22;
    const verificationSavings = monthlyVerifications * costPerVerification * 0.28;
    const revenueRecovery = recoveredUsers * averageRevenue;
    const lossRecovery = manualReviewLoss * 0.45;
    const monthlySavings = verificationSavings + revenueRecovery + lossRecovery;

    return {
      monthlySavings,
      annualSavings: monthlySavings * 12,
      recoveryRate: Math.min(94, Math.round(18 + dropOffRate * 0.52 + filledCount * 4)),
    };
  }, [dropOffRate, filledCount, values]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    if (statusResetTimerRef.current) {
      window.clearTimeout(statusResetTimerRef.current);
      statusResetTimerRef.current = null;
    }
  };

  const markUpdating = () => {
    if (status === "calculating") return;
    clearTimers();
    setStatus("updating");
    setProcessingLabel("");
    setArcOverride(null);
    setArcPulse(false);
    setVisibleMetrics(0);
    setShowResultActions(false);
    statusResetTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 1500);
  };

  const updateField = (key: FieldKey, nextValue: string) => {
    setValues((current) => ({
      ...current,
      [key]: nextValue.replace(/[^\d.]/g, ""),
    }));
    setPulseField(key);
    window.setTimeout(() => setPulseField(null), 110);
    markUpdating();
  };

  const updateSlider = (event: ChangeEvent<HTMLInputElement>) => {
    setDropOffRate(Number(event.target.value));
    setSliderTouched(true);
    setSliderPopKey((current) => current + 1);
    markUpdating();
  };

  const clearForm = () => {
    clearTimers();
    setFlashFields(true);
    setValues(initialValues);
    setFocusedField(null);
    setDropOffRate(50);
    setSliderTouched(false);
    setSliderPopKey((current) => current + 1);
    setStatus("idle");
    setProcessingLabel("");
    setArcOverride(null);
    setArcPulse(false);
    setVisibleMetrics(0);
    setShowResultActions(false);
    setDisplayedResult({ monthlySavings: 0, annualSavings: 0, recoveryRate: 0 });
    rotationsRef.current.forEach((rotation) => {
      gsap.to(rotation, { timeScale: 1, duration: 0.4, ease: "power3.out" });
    });
    window.setTimeout(() => setFlashFields(false), 220);
  };

  const calculateSavings = () => {
    clearTimers();
    setStatus("calculating");
    setProcessingLabel("");
    setArcOverride(100);
    setArcPulse(false);
    setVisibleMetrics(0);
    setShowResultActions(false);
    setDisplayedResult({ monthlySavings: 0, annualSavings: 0, recoveryRate: 0 });

    rotationsRef.current.forEach((rotation) => {
      gsap.to(rotation, { timeScale: 3, duration: 0.4, ease: "power2.out" });
    });

    const label = "Calculating savings...";
    Array.from(label).forEach((_, index) => {
      timersRef.current.push(
        window.setTimeout(() => {
          setProcessingLabel(label.slice(0, index + 1));
        }, index * 18)
      );
    });

    timersRef.current.push(
      window.setTimeout(() => {
        rotationsRef.current.forEach((rotation) => {
          gsap.to(rotation, { timeScale: speedScale, duration: 0.5, ease: "power3.out" });
        });
        setArcPulse(true);
        timersRef.current.push(window.setTimeout(() => setArcPulse(false), 420));
      }, 1500)
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setStatus("result");
      }, 2000)
    );
  };

  const shareResults = () => {
    const message = `Ontiver KYC savings estimate: ${formatCurrency(
      result.monthlySavings
    )}/month, ${formatCurrency(result.annualSavings)}/year.`;

    if (navigator.share) {
      void navigator.share({ title: "Ontiver KYC Savings", text: message });
      return;
    }

    void navigator.clipboard?.writeText(message);
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !leftPanelRef.current || !rightPanelRef.current) return;

      const fields = gsap.utils.toArray<HTMLElement>(".kyc-calculator-field");
      const actions = gsap.utils.toArray<HTMLElement>(".kyc-calculator-action");

      gsap.set(leftPanelRef.current, { opacity: 0, x: -36, scale: 0.97 });
      gsap.set(rightPanelRef.current, { opacity: 0, x: 36, scale: 0.97 });
      gsap.set(fields, { opacity: 0, y: 10 });
      gsap.set(actions, { opacity: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      timeline
        .to(leftPanelRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.5,
        })
        .to(
          rightPanelRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "<"
        )
        .to(fields, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.07,
          ease: "power2.out",
        })
        .to(
          actions,
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.08,
            ease: "power2.out",
          },
          "+=0.08"
        );

      return () => timeline.kill();
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (
        !outerRingRef.current ||
        !middleRingRef.current ||
        !innerRingRef.current ||
        !outerStrokeRef.current ||
        !middleStrokeRef.current ||
        !innerStrokeRef.current
      ) {
        return;
      }

      const rotations = [
        gsap.to(outerRingRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          svgOrigin: "130 130",
          duration: 20,
          repeat: -1,
          ease: "none",
        }),
        gsap.to(middleRingRef.current, {
          rotation: -360,
          transformOrigin: "50% 50%",
          svgOrigin: "130 130",
          duration: 13,
          repeat: -1,
          ease: "none",
        }),
        gsap.to(innerRingRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          svgOrigin: "130 130",
          duration: 8,
          repeat: -1,
          ease: "none",
        }),
      ];

      const pulses = [
        gsap.to(outerStrokeRef.current, {
          strokeOpacity: 0.75,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
        gsap.to(middleStrokeRef.current, {
          strokeOpacity: 0.75,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
        gsap.to(innerStrokeRef.current, {
          strokeOpacity: 0.75,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
      ];

      rotationsRef.current = rotations;

      return () => {
        rotations.forEach((rotation) => rotation.kill());
        pulses.forEach((pulse) => pulse.kill());
      };
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (status === "calculating") return;
    rotationsRef.current.forEach((rotation) => {
      gsap.to(rotation, { timeScale: speedScale, duration: 0.4, ease: "power2.out" });
    });
  }, [speedScale, status]);

  useEffect(() => {
    if (status !== "result") return;

    const counters = {
      monthlySavings: 0,
      annualSavings: 0,
      recoveryRate: 0,
    };

    const timeline = gsap.timeline({
      onComplete: () => setShowResultActions(true),
    });

    timeline
      .call(() => setVisibleMetrics(1))
      .to(counters, {
        monthlySavings: result.monthlySavings,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => setDisplayedResult({ ...counters }),
      })
      .to({}, { duration: 0.2 })
      .call(() => setVisibleMetrics(2))
      .to(counters, {
        annualSavings: result.annualSavings,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => setDisplayedResult({ ...counters }),
      })
      .to({}, { duration: 0.2 })
      .call(() => setVisibleMetrics(3))
      .to(counters, {
        recoveryRate: result.recoveryRate,
        duration: 0.65,
        ease: "power2.out",
        onUpdate: () => setDisplayedResult({ ...counters }),
      });

    return () => {
      timeline.kill();
    };
  }, [result, status]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f1f4ef] px-6 py-24">
      <div className="mx-auto w-[min(100%,1080px)]">
        <Text
          btext="KYC Savings Calculator"
          heading="Calculate Your KYC Savings"
          containerClassName="pb-12"
          badgeTextClassName="border border-[#009311]/40! bg-[#f1f4ef]! text-[#005e19]!"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,536px)_minmax(360px,1fr)]">
          <div ref={leftPanelRef} className="rounded-3xl bg-white px-6 py-6 md:px-8">
            <h3 className="pb-10 text-lg font-semibold text-black">Check KYC Savings</h3>

            <div className="space-y-5">
              {calculatorFields.slice(0, 2).map((field) => {
                const focused = focusedField === field.key;
                const hasValue = values[field.key].trim().length > 0;

                return (
                  <div key={field.key} className="kyc-calculator-field flex flex-col gap-2">
                    <label
                      className={`text-sm font-medium transition-colors duration-150 ${
                        focused || hasValue ? "text-[#009311]" : "text-black/55"
                      }`}
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      {field.prefix ? (
                        <span
                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold transition-colors duration-150 ${
                            focused || hasValue ? "text-[#009311]" : "text-black/35"
                          }`}
                        >
                          {field.prefix}
                        </span>
                      ) : null}
                      <motion.input
                        inputMode="numeric"
                        className={`h-12 w-full rounded-lg border bg-white px-4 text-sm text-black outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-black/30 ${
                          field.prefix ? "pl-8" : ""
                        } ${
                          focused
                            ? "border-[#009311]/60 [box-shadow:0_0_0_3px_rgba(34,197,94,0.08)]"
                            : hasValue
                              ? "border-[#009311]/25"
                              : "border-[#DDE5DD]"
                        } ${flashFields ? "bg-red-500/[0.05]" : ""}`}
                        placeholder={field.placeholder}
                        value={values[field.key]}
                        animate={{ scale: pulseField === field.key ? [1, 1.01, 1] : 1 }}
                        transition={{ duration: 0.1 }}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        onFocus={() => setFocusedField(field.key)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="kyc-calculator-field flex flex-col gap-4 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-black/60">
                    Onboarding Drop-Off Rate
                  </label>
                  <span className="text-xs font-semibold text-black/40">Live input</span>
                </div>

                <div className="relative pt-9">
                  <motion.div
                    key={sliderPopKey}
                    className="absolute top-0 z-10 -translate-x-1/2 text-sm font-semibold"
                    style={{ left: `${dropOffRate}%`, color: sliderColor }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.15 }}
                  >
                    {dropOffRate}%
                    <span className="absolute left-1/2 top-7 h-8 border-l border-dashed border-[#009311]/20" />
                  </motion.div>

                  <div className="relative h-2 rounded-full bg-[#DFE6DE]">
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[#009311]"
                      style={{ width: `${dropOffRate}%` }}
                    >
                      <span className="absolute inset-y-0 left-0 w-1/2 animate-[kyc-slider-shimmer_3s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]" />
                    </div>
                    <input
                      aria-label="Onboarding Drop-Off Rate"
                      type="range"
                      min="0"
                      max="100"
                      value={dropOffRate}
                      className="absolute inset-0 z-20 h-2 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                      onChange={updateSlider}
                      onPointerDown={() => setIsDraggingSlider(true)}
                      onPointerUp={() => setIsDraggingSlider(false)}
                      onPointerCancel={() => setIsDraggingSlider(false)}
                    />
                    <motion.span
                      className="pointer-events-none absolute top-1/2 z-30 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#063B18]"
                      style={{ left: `${dropOffRate}%` }}
                      animate={{ scale: isDraggingSlider ? 1.2 : 1 }}
                      transition={{
                        duration: isDraggingSlider ? 0.15 : 0.2,
                        ease: isDraggingSlider ? [0.34, 1.56, 0.64, 1] : "easeOut",
                      }}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    </motion.span>
                  </div>
                </div>
              </div>

              {calculatorFields.slice(2).map((field) => {
                const focused = focusedField === field.key;
                const hasValue = values[field.key].trim().length > 0;

                return (
                  <div key={field.key} className="kyc-calculator-field flex flex-col gap-2">
                    <label
                      className={`text-sm font-medium transition-colors duration-150 ${
                        focused || hasValue ? "text-[#009311]" : "text-black/55"
                      }`}
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      {field.prefix ? (
                        <span
                          className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold transition-colors duration-150 ${
                            focused || hasValue ? "text-[#009311]" : "text-black/35"
                          }`}
                        >
                          {field.prefix}
                        </span>
                      ) : null}
                      <motion.input
                        inputMode="numeric"
                        className={`h-12 w-full rounded-lg border bg-white px-4 pl-8 text-sm text-black outline-none transition-[background-color,border-color,box-shadow] duration-200 placeholder:text-black/30 ${
                          focused
                            ? "border-[#009311]/60 [box-shadow:0_0_0_3px_rgba(34,197,94,0.08)]"
                            : hasValue
                              ? "border-[#009311]/25"
                              : "border-[#DDE5DD]"
                        } ${flashFields ? "bg-red-500/[0.05]" : ""}`}
                        placeholder={field.placeholder}
                        value={values[field.key]}
                        animate={{ scale: pulseField === field.key ? [1, 1.01, 1] : 1 }}
                        transition={{ duration: 0.1 }}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        onFocus={() => setFocusedField(field.key)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-[1fr_2fr]">
              <button
                className="kyc-calculator-action inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#BFC8D2] bg-white px-4 text-sm font-medium text-[#0A0B0D] transition-colors duration-200 hover:border-red-400/50 hover:text-red-600"
                type="button"
                onClick={clearForm}
              >
                <RotateCcw size={16} />
                Clear Form
              </button>
              <motion.div className="kyc-calculator-action" whileTap={{ scale: 0.97 }}>
                <MagneticFillButton
                  variant="green"
                  className="h-12 w-full rounded-lg px-4 text-sm font-medium"
                  onClick={calculateSavings}
                >
                  {status === "calculating" ? (
                    <span className="inline-flex items-center">
                      Calculating
                      <CalculatingDots />
                    </span>
                  ) : (
                    "Calculate KYC Savings"
                  )}
                </MagneticFillButton>
              </motion.div>
            </div>
          </div>

          <div ref={rightPanelRef} className="rounded-3xl bg-white px-6 py-6 md:px-10">
            <div className="flex min-h-[470px] flex-col items-center justify-center">
              <motion.div
                className="relative grid h-[315px] w-[315px] place-items-center"
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
                        <p className="text-xs font-medium text-black/45">Monthly Savings</p>
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
                        <p className="text-xs font-medium text-black/45">Annual Savings</p>
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
                        <p className="text-xs font-medium text-black/45">Drop-off Recovery</p>
                        <p className="text-xl font-bold text-[#009311]">
                          {Math.round(displayedResult.recoveryRate)}%
                        </p>
                      </motion.div>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>

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
                      animate={status === "idle" ? { opacity: [0.5, 0.9, 0.5] } : { opacity: 1 }}
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
                    >
                      View Recommended Plan
                    </MagneticFillButton>
                    <motion.button
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#009311]/35 bg-white px-4 text-sm font-medium text-[#005e19] transition-colors duration-200 hover:bg-[#F8FFF8]"
                      type="button"
                      onClick={shareResults}
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
        </div>
      </div>
    </section>
  );
}
