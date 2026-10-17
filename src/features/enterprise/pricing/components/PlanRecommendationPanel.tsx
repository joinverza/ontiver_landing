import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { PlanRecommendation } from "../data/plan";
import { DEVELOPER_SIGNUP_URL, type BillingCycle } from "../data/pricing";
import { getPricingInquiryUrl } from "../lib/pricing";
import { BusinessPhoto } from "../../../../shared/components/media/BusinessPhoto";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";

type Props = {
  recommendation: PlanRecommendation | null;
  billingCycle: BillingCycle;
  monthlyVerifications?: number;
  onViewPlan: () => void;
  onComparePlans: () => void;
};
const PlanRecommendationPanel = ({
  recommendation,
  billingCycle,
  monthlyVerifications,
  onViewPlan,
  onComparePlans,
}: Props) => {
  return (
    <div
      className="plan-guidance-panel flex min-w-0 flex-col rounded-2xl bg-[#edf5e7] p-6 sm:p-9"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">Plan guidance</p>
        <Layers3 size={24} className="shrink-0 text-accent" />
      </div>
      {recommendation ? (
        <div className="plan-guidance-result py-6">
          <h3 className="text-card-title font-medium">
            {recommendation.plan ? `We recommend ${recommendation.plan}` : "Let's talk"}
          </h3>
          <p className="mt-4 text-body text-[#526052]">{recommendation.reason}</p>
          {recommendation.estimate !== undefined ? (
            <p className="mt-5 text-sm text-[#526052]">
              Estimate on {billingCycle === "annual" ? "annual" : "monthly"} billing, before taxes.
              Your dashboard shows actual usage as it happens.
            </p>
          ) : null}
          {recommendation.plan === "Sandbox" ? (
            <a href={DEVELOPER_SIGNUP_URL} className="button-primary mt-6">
              Start free in Sandbox
              <ActionIcon size={17} />
            </a>
          ) : (
            <Link
              to={getPricingInquiryUrl(recommendation.plan, billingCycle, monthlyVerifications)}
              className="button-primary mt-6"
            >
              {recommendation.plan && recommendation.plan !== "Enterprise"
                ? `Get started with ${recommendation.plan}`
                : "Talk to sales"}
              <ActionIcon size={17} />
            </Link>
          )}
        </div>
      ) : (
        <div className="plan-guidance-result py-6">
          <div className="plan-guidance-preview mb-5 aspect-[16/9] overflow-hidden">
            <BusinessPhoto image={editorialPhotos.planGuidance} />
          </div>
          <h3 className="text-card-title font-medium">Find your fit.</h3>
          <p className="mt-3 text-body text-[#526052]">
            Enter your usage on the left to see the lowest-cost plan and an estimated monthly total.
          </p>
        </div>
      )}
      <div className="plan-guidance-actions mt-auto flex flex-wrap gap-5 pt-6">
        {recommendation?.plan && (
          <button
            type="button"
            onClick={onViewPlan}
            className="inline-flex min-h-11 items-center gap-2 text-body font-medium text-accent"
          >
            View {recommendation.plan}
            <ActionIcon size={17} />
          </button>
        )}
        <button
          type="button"
          onClick={onComparePlans}
          className="inline-flex min-h-11 items-center gap-2 text-body font-medium text-accent"
        >
          Compare plans
          <ActionIcon size={17} />
        </button>
      </div>
    </div>
  );
};

export default PlanRecommendationPanel;
