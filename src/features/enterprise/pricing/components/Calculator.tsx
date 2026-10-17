import { useState } from "react";
import CalculatorFormPanel from "./CalculatorFormPanel";
import CalculatorResultsPanel from "./CalculatorResultsPanel";
import {
  calculatorInitialValues,
  type CalculatorFieldKey,
  type SavingsResult,
} from "../data/calculator";
import type { BillingCycle, PricingCatalog } from "../data/pricing";
import { calculateKycBaseline, formatCurrency, parseAmount } from "../lib/calculator";
import "./calculator-layout.css";

const Calculator = ({
  standalone = false,
  billingCycle = "monthly",
  catalog,
}: {
  standalone?: boolean;
  billingCycle?: BillingCycle;
  catalog?: PricingCatalog;
}) => {
  const [values, setValues] = useState<Record<CalculatorFieldKey, string>>(calculatorInitialValues);
  const [dropOffRate, setDropOffRate] = useState(0);
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const resetResult = () => {
    setResult(null);
    setShareMessage("");
  };
  const updateField = (key: CalculatorFieldKey, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    resetResult();
  };
  const clearForm = () => {
    setValues(calculatorInitialValues);
    setDropOffRate(0);
    resetResult();
  };
  const calculate = () => {
    setResult(
      calculateKycBaseline(
        parseAmount(values.monthlyVerifications),
        parseAmount(values.costPerVerification),
        dropOffRate,
        catalog,
        billingCycle,
      ),
    );
    setShareMessage("");
  };
  const shareResults = async () => {
    if (!result) return;
    const message =
      "Ontiver KYC baseline: current cost " +
      formatCurrency(result.currentKycCost, catalog?.currency) +
      "/month; " +
      result.lostUsers.toLocaleString() +
      " users lost at " +
      result.dropOffRate +
      "% drop-off." +
      (result.estimatedOntiverCost !== null && result.recommendedPlan
        ? " Estimated Ontiver cost on " +
          result.recommendedPlan +
          ": " +
          formatCurrency(result.estimatedOntiverCost, catalog?.currency) +
          "/month."
        : "");
    try {
      if (navigator.share) {
        await navigator.share({ title: "Ontiver KYC estimate", text: message });
        setShareMessage("Results shared.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        setShareMessage("Results copied to your clipboard.");
      } else setShareMessage(message);
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError"))
        setShareMessage("Unable to share automatically. You can copy the estimate above.");
    }
  };
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="savings-calculator"
      className={`${standalone ? "page-intro" : "section-space calculator-section"} bg-surface text-[#002d0e]`}
    >
      <div className="site-container">
        <div
          data-scroll-reveal
          className={standalone ? "page-hero-content" : "calculator-intro mb-8 max-w-[900px]"}
        >
          <p className="eyebrow">KYC savings calculator</p>
          <Heading
            className={`font-normal ${standalone ? "page-hero-heading text-page-hero" : "mt-5 text-section"}`}
          >
            See what reusable verification could save you.
          </Heading>
        </div>
        <div
          className={`equal-columns grid gap-6 lg:grid-cols-2 ${standalone ? "page-hero-media" : ""}`}
        >
          <CalculatorFormPanel
            currency={catalog?.currency ?? "USD"}
            values={values}
            dropOffRate={dropOffRate}
            onFieldChange={updateField}
            onSliderChange={(value) => {
              setDropOffRate(value);
              resetResult();
            }}
            onClear={clearForm}
            onCalculate={calculate}
          />
          <CalculatorResultsPanel
            currency={catalog?.currency ?? "USD"}
            result={result}
            billingCycle={billingCycle}
            shareMessage={shareMessage}
            onShare={() => void shareResults()}
          />
        </div>
        <p className="mt-6 max-w-[1000px] text-sm text-[#526058]">
          Estimates are based on the figures you enter and may vary by provider cost, usage,
          verification type, fraud profile, and integration quality.
        </p>
      </div>
    </section>
  );
};

export default Calculator;
