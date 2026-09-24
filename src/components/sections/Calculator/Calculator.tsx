import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalculatorFormPanel from "../../calculator/CalculatorFormPanel";
import CalculatorResultsPanel from "../../calculator/CalculatorResultsPanel";
import { calculatorFields, calculatorInitialValues, type CalculatorFieldKey, type SavingsResult } from "../../../data/calculator";
import { formatCurrency, parseAmount } from "../../../lib/calculator";
import { getRecommendedPricingPlan } from "../../../lib/pricing";
import { scrollPageTo } from "../../../lib/scrollNavigation";

export default function Calculator({ standalone = false }: { standalone?: boolean }) {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<CalculatorFieldKey, string>>(calculatorInitialValues);
  const [dropOffRate, setDropOffRate] = useState(50);
  const [sliderTouched, setSliderTouched] = useState(false);
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [shareMessage, setShareMessage] = useState("");

  const updateField = (key: CalculatorFieldKey, value: string) => {
    setValues((current) => ({ ...current, [key]: value.replace(/[^\d.]/g, "") }));
    setResult(null);
    setShareMessage("");
  };

  const clearForm = () => {
    setValues(calculatorInitialValues);
    setDropOffRate(50);
    setSliderTouched(false);
    setResult(null);
    setShareMessage("");
  };

  const calculateSavings = () => {
    const monthlyVerifications = parseAmount(values.monthlyVerifications);
    const costPerVerification = parseAmount(values.costPerVerification);
    const averageRevenue = parseAmount(values.averageRevenue);
    const manualReviewLoss = parseAmount(values.manualReviewLoss);
    const filledCount = calculatorFields.filter((field) => values[field.key].trim()).length + (sliderTouched ? 1 : 0);
    const recommendedPlan = getRecommendedPricingPlan(monthlyVerifications);
    const recoveredUsers = monthlyVerifications * (dropOffRate / 100) * 0.22;
    const verificationSavings = monthlyVerifications * costPerVerification * 0.28;
    const revenueRecovery = recoveredUsers * averageRevenue;
    const lossRecovery = manualReviewLoss * 0.45;
    const monthlySavings = Math.max(0, verificationSavings + revenueRecovery + lossRecovery - (recommendedPlan.monthly ?? 0));
    setResult({
      monthlySavings,
      annualSavings: monthlySavings * 12,
      recoveryRate: Math.min(94, Math.round(18 + dropOffRate * 0.52 + filledCount * 4)),
      recommendedPlan: recommendedPlan.name,
      monthlyPlanCost: recommendedPlan.monthly,
    });
    setShareMessage("");
  };

  const shareResults = async () => {
    if (!result) return;
    const message = `Ontiver KYC savings estimate on the ${result.recommendedPlan} plan: ${formatCurrency(result.monthlySavings)}/month, ${formatCurrency(result.annualSavings)}/year.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Ontiver KYC Savings", text: message });
        setShareMessage("Results shared.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        setShareMessage("Results copied to your clipboard.");
      } else {
        setShareMessage(message);
      }
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) setShareMessage("Unable to share automatically. You can copy the estimate above.");
    }
  };

  const viewRecommendedPlan = () => {
    if (!result) return;
    const card = document.querySelector<HTMLElement>(`[data-plan="${result.recommendedPlan.toLowerCase()}"]`);
    if (card) {
      scrollPageTo(card);
    } else {
      navigate("/enterprise/pricing#pricing-plans");
    }
  };

  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="savings-calculator" className={`${standalone ? "page-intro" : "section-space"} bg-white text-[#002d0e]`}>
      <div className="site-container">
        <div data-scroll-reveal className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div><p className="eyebrow">KYC savings calculator</p><Heading className={`mt-5 font-semibold tracking-[-0.035em] ${standalone ? "text-page-hero" : "text-section"}`}>Calculate your KYC savings.</Heading></div>
          <p className="max-w-[460px] text-subtitle text-[#637060]">See what reusable verification could mean for your costs, customer onboarding, and bottom line.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <CalculatorFormPanel values={values} dropOffRate={dropOffRate} onFieldChange={updateField} onSliderChange={(value) => { setDropOffRate(value); setSliderTouched(true); setResult(null); setShareMessage(""); }} onClear={clearForm} onCalculate={calculateSavings} />
          <CalculatorResultsPanel result={result} shareMessage={shareMessage} onShare={() => void shareResults()} onViewRecommendedPlan={viewRecommendedPlan} />
        </div>
      </div>
    </section>
  );
}
