import { ArrowUpRight, ChartNoAxesCombined, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { SavingsResult } from "../data/calculator";
import type { BillingCycle } from "../data/pricing";
import { formatCurrency } from "../lib/calculator";
import { getPricingInquiryUrl } from "../lib/pricing";
import { BusinessPhoto } from "../../../../shared/components/media/BusinessPhoto";
import { imagery } from "../../../../shared/data/imagery";

type Props = {
  result: SavingsResult | null;
  billingCycle: BillingCycle;
  shareMessage: string;
  onShare: () => void;
};
const CalculatorResultsPanel = ({ result, billingCycle, shareMessage, onShare }: Props) => {
  return (
    <div
      className="flex min-w-0 flex-col self-start rounded-2xl bg-[#002d0e] p-5 text-white sm:p-7"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-meta font-semibold uppercase tracking-[0.16em] text-[#b8e5a7]">
          Your KYC estimate
        </p>
        <ChartNoAxesCombined size={24} className="shrink-0 text-[#b8e5a7]" />
      </div>
      {result ? (
        <>
          <dl className="mt-6 divide-y divide-white/15">
            <div className="pb-5">
              <dt className="text-body text-white/70">Current KYC cost</dt>
              <dd className="mt-3 text-section font-medium [overflow-wrap:anywhere]">
                {formatCurrency(result.currentKycCost)}
                <span className="ml-2 text-body font-normal">/ month</span>
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-body text-white/70">Estimated Ontiver cost</dt>
              <dd className="mt-2 text-body font-medium">Pending a confirmed quote</dd>
            </div>
            <div className="py-4">
              <dt className="text-body text-white/70">Direct savings</dt>
              <dd className="mt-2 text-body font-medium">Pending confirmed Ontiver costs</dd>
            </div>
            <div className="py-4">
              <dt className="text-body text-white/70">Lost users from drop-off</dt>
              <dd className="mt-2 text-card-title font-medium">
                {result.lostUsers.toLocaleString()}
                <span className="ml-2 text-sm font-normal text-white/70">
                  at {result.dropOffRate}%
                </span>
              </dd>
            </div>
            <div className="py-4">
              <dt className="text-body text-white/70">Recommended plan</dt>
              <dd className="mt-2 text-body font-medium">Pending workflow and volume review</dd>
            </div>
          </dl>
          <p className="mt-2 text-sm text-white/65">
            This baseline does not assume a recovery rate or a reduction in verification costs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              to={getPricingInquiryUrl(null, billingCycle, result.monthlyVerifications)}
              className="button-primary !bg-[#c7edb3] !text-[#002d0e]"
            >
              Get a cost estimate
              <ArrowUpRight size={17} />
            </Link>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex min-h-11 items-center gap-2 text-body text-white/80"
            >
              <Share2 size={17} />
              Share results
            </button>
          </div>
          {shareMessage && <p className="mt-4 text-sm text-[#c7edb3]">{shareMessage}</p>}
        </>
      ) : (
        <div className="py-6">
          <div className="mb-5 h-[160px] overflow-hidden rounded-xl sm:h-[200px]">
            <BusinessPhoto image={imagery.finance} />
          </div>
          <h3 className="text-card-title font-medium">Start with your current costs.</h3>
          <p className="mt-4 text-body text-white/70">
            Enter your figures to calculate a baseline. Ontiver cost and direct savings need a
            confirmed quote.
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorResultsPanel;
