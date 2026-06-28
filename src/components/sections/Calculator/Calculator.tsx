import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalculatorFormPanel from "../../calculator/CalculatorFormPanel";
import CalculatorResultsPanel from "../../calculator/CalculatorResultsPanel";
import {
  calculatorFields,
  calculatorInitialValues,
  type CalculatorStatus,
  type CalculatorFieldKey,
  type SavingsResult,
} from "../../../data/calculator";
import { formatCurrency, mixColor, parseAmount } from "../../../lib/calculator";
import Text from "../../base/Text";

gsap.registerPlugin(ScrollTrigger);

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

  const [values, setValues] = useState<Record<CalculatorFieldKey, string>>(
    calculatorInitialValues
  );
  const [focusedField, setFocusedField] =
    useState<CalculatorFieldKey | null>(null);
  const [pulseField, setPulseField] = useState<CalculatorFieldKey | null>(null);
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

  const updateField = (key: CalculatorFieldKey, nextValue: string) => {
    setValues((current) => ({
      ...current,
      [key]: nextValue.replace(/[^\d.]/g, ""),
    }));
    setPulseField(key);
    window.setTimeout(() => setPulseField(null), 110);
    markUpdating();
  };

  const updateSlider = (value: number) => {
    setDropOffRate(value);
    setSliderTouched(true);
    setSliderPopKey((current) => current + 1);
    markUpdating();
  };

  const clearForm = () => {
    clearTimers();
    setFlashFields(true);
    setValues(calculatorInitialValues);
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
    <section ref={sectionRef} className="bg-[#f1f4ef] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-[min(100%,1080px)]">
        <Text
          btext="KYC Savings Calculator"
          heading="Calculate Your KYC Savings"
          containerClassName="pb-12"
          badgeTextClassName="border border-[#009311]/40! bg-[#f1f4ef]! text-[#005e19]!"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,536px)_minmax(0,1fr)]">
          <CalculatorFormPanel
            panelRef={leftPanelRef}
            values={values}
            focusedField={focusedField}
            pulseField={pulseField}
            flashFields={flashFields}
            dropOffRate={dropOffRate}
            sliderColor={sliderColor}
            sliderPopKey={sliderPopKey}
            isDraggingSlider={isDraggingSlider}
            status={status}
            onFieldChange={updateField}
            onFieldFocus={setFocusedField}
            onFieldBlur={() => setFocusedField(null)}
            onSliderChange={updateSlider}
            onSliderPointerDown={() => setIsDraggingSlider(true)}
            onSliderPointerUp={() => setIsDraggingSlider(false)}
            onClear={clearForm}
            onCalculate={calculateSavings}
          />

          <CalculatorResultsPanel
            panelRef={rightPanelRef}
            outerRingRef={outerRingRef}
            middleRingRef={middleRingRef}
            innerRingRef={innerRingRef}
            outerStrokeRef={outerStrokeRef}
            middleStrokeRef={middleStrokeRef}
            innerStrokeRef={innerStrokeRef}
            status={status}
            circleOpacity={circleOpacity}
            activeArcPercent={activeArcPercent}
            arcPulse={arcPulse}
            visibleMetrics={visibleMetrics}
            displayedResult={displayedResult}
            processingLabel={processingLabel}
            showResultActions={showResultActions}
            onShare={shareResults}
          />
        </div>
      </div>
    </section>
  );
}
