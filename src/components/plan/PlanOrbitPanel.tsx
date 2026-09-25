import { ArrowUpRight, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { PlanRecommendation } from "../../data/plan";
import type { BillingCycle } from "../../data/pricing";
import { getPricingInquiryUrl } from "../../lib/pricing";
import { BusinessPhoto } from "../business/BusinessPhoto";
import { imagery } from "../../data/imagery";

type Props = { recommendation: PlanRecommendation | null; billingCycle: BillingCycle; monthlyVerifications?: number; onViewPlan: () => void; onComparePlans: () => void };
export default function PlanOrbitPanel({ recommendation, billingCycle, monthlyVerifications, onViewPlan, onComparePlans }: Props) {
  return <div className="flex flex-col self-start rounded-2xl bg-[#edf5e7] p-5 sm:p-7" aria-live="polite" aria-atomic="true">
    <div className="flex items-center justify-between gap-4"><p className="eyebrow">Plan guidance</p><Layers3 size={24} className="shrink-0 text-[#007d21]" /></div>
    {recommendation ? <div className="py-6"><h3 className="text-card-title font-medium">{recommendation.plan ? recommendation.plan + " to discuss" : "Recommendation pending"}</h3><p className="mt-4 text-body text-[#526052]">{recommendation.reason}</p><p className="mt-5 text-sm text-[#526052]">{billingCycle === "annual" ? "Annual" : "Monthly"} pricing requires a confirmed quote.</p><Link to={getPricingInquiryUrl(recommendation.plan, billingCycle, monthlyVerifications)} className="button-primary mt-6">Request a quote<ArrowUpRight size={17} /></Link></div> : <div className="py-6"><div className="mb-5 h-[160px] overflow-hidden rounded-xl sm:h-[200px]"><BusinessPhoto image={imagery.merchantOrders} /></div><h3 className="text-card-title font-medium">Find your fit.</h3><p className="mt-3 text-body text-[#526052]">Share expected usage and the controls you need. Final scope and pricing are confirmed by the team.</p></div>}
    <div className="flex flex-wrap gap-5">{recommendation?.plan && <button type="button" onClick={onViewPlan} className="inline-flex min-h-11 items-center gap-2 text-body font-medium text-[#007d21]">View {recommendation.plan}<ArrowUpRight size={17} /></button>}<button type="button" onClick={onComparePlans} className="inline-flex min-h-11 items-center gap-2 text-body font-medium text-[#007d21]">Compare plans<ArrowUpRight size={17} /></button></div>
  </div>;
}
