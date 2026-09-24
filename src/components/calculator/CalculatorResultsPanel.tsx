import { ArrowUpRight, ChartNoAxesCombined, Check, Share2 } from "lucide-react";
import type { SavingsResult } from "../../data/calculator";
import { formatCurrency } from "../../lib/calculator";

type CalculatorResultsPanelProps = { result: SavingsResult | null; shareMessage: string; onShare: () => void; onViewRecommendedPlan: () => void };

export default function CalculatorResultsPanel({ result, shareMessage, onShare, onViewRecommendedPlan }: CalculatorResultsPanelProps) {
  return (
    <div className="flex min-h-[430px] flex-col rounded-[28px] bg-[#002d0e] p-6 text-white sm:p-9" aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between gap-4"><p className="text-meta font-semibold uppercase tracking-[0.16em] text-[#b8e5a7]">Your potential savings</p><ChartNoAxesCombined size={24} className="text-[#b8e5a7]" strokeWidth={1.5} /></div>
      {result ? (
        <>
          <div className="py-10"><p className="text-body text-white/65">{result.monthlyPlanCost === null ? "Monthly value" : "Net monthly savings"}</p><p className="mt-4 break-words text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.05em]">{formatCurrency(result.monthlySavings)}</p></div>
          <div className="grid grid-cols-2 gap-6 border-y border-white/15 py-7"><div><p className="text-meta text-white/60">Annual savings</p><p className="mt-3 break-words text-card-title font-semibold text-[#c7edb3]">{formatCurrency(result.annualSavings)}</p></div><div><p className="text-meta text-white/60">Drop-off recovery</p><p className="mt-3 text-card-title font-semibold text-[#c7edb3]">{result.recoveryRate}%</p></div></div>
          <div className="py-7"><p className="inline-flex items-center gap-2 text-body font-semibold"><Check size={17} className="text-[#b8e5a7]" />Recommended: {result.recommendedPlan}</p><p className="mt-2 text-body text-white/60">{result.monthlyPlanCost === null ? "Custom pricing" : `${formatCurrency(result.monthlyPlanCost)}/month`}</p></div>
          <div className="mt-auto flex flex-wrap items-center gap-5 pt-4"><button type="button" onClick={onViewRecommendedPlan} className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[#c7edb3] px-6 text-body font-medium text-[#002d0e] hover:bg-white">View recommended plan<ArrowUpRight size={17} /></button><button type="button" onClick={onShare} className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-body text-white/80 hover:text-white"><Share2 size={17} />Share results</button></div>
          {shareMessage ? <p className="mt-5 text-body text-[#c7edb3]">{shareMessage}</p> : null}
        </>
      ) : (
        <div className="flex flex-1 flex-col justify-center py-12">
          <div aria-hidden="true" className="mb-10 flex h-28 items-end gap-3"><span className="h-[25%] w-12 rounded-t-lg bg-[#c7edb3]/20" /><span className="h-[42%] w-12 rounded-t-lg bg-[#c7edb3]/35" /><span className="h-[65%] w-12 rounded-t-lg bg-[#c7edb3]/60" /><span className="h-full w-12 rounded-t-lg bg-[#c7edb3]" /></div>
          <h3 className="max-w-[360px] text-section font-semibold tracking-[-0.035em]">Less repetition.<br />More possibility.</h3>
          <p className="mt-5 max-w-[360px] text-body text-white/65">Add your current verification costs to see your savings estimate and recommended plan.</p>
        </div>
      )}
    </div>
  );
}
