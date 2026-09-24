import { BadgeCheck } from "lucide-react";
import { solutionSteps } from "../../../data/solution";
import { individualSolutionSteps } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import AuroraBadge from "../../ui/AuroraBadge";

export default function Solution({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const steps = enterprise ? solutionSteps : individualSolutionSteps;
  return (
    <section id="solution" className="section-space bg-[#f7f7f7]">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div data-scroll-reveal>
          <AuroraBadge>{enterprise ? "Enterprise Workflow" : "How Ontiver Works"}</AuroraBadge>
          <h2 className="section-heading mt-5 max-w-[510px]">{enterprise ? "From verification to reusable proof." : "Verify once. Use it with your permission."}</h2>
          <div className="relative mt-9 flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl bg-[#e3eddf] sm:min-h-[340px]">
            <img src="/assets/hero-phone.png" alt="Ontiver verified identity wallet" loading="lazy" className="h-[340px] w-full translate-y-9 object-contain sm:h-[390px]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 text-sm font-semibold shadow-sm"><BadgeCheck className="shrink-0 text-[#009311]" size={25} />{enterprise ? "Store Proof" : "Keep your proof"}<span className="ml-auto text-meta text-[#007d21]">{enterprise ? "Consent Share" : "Review requests"}</span></div>
          </div>
        </div>
        <ol className="divide-y divide-[#002d0e]/12">
          {steps.map((step, index) => (
            <li data-scroll-reveal key={step.title} className="flex gap-5 py-6 first:pt-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#002d0e]/15 text-sm font-semibold text-[#007d21]">0{index + 1}</span>
              <div><h3 className="text-card-title font-semibold">{step.title}</h3><p className="mt-2 max-w-[440px] text-body text-[#002d0e]/65">{step.para}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
