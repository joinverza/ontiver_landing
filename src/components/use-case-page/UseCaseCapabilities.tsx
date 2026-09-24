import { Fingerprint, FileCheck2, ScanFace, ShieldCheck } from "lucide-react";
import type { UseCasePageDetail } from "../../data/useCases";

const icons = [Fingerprint, ShieldCheck, ScanFace, FileCheck2];

export default function UseCaseCapabilities({ capabilities }: { capabilities: UseCasePageDetail["capabilities"] }) {
  return (
    <section className="section-space bg-white">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-scroll-reveal>
          <p className="eyebrow">Capabilities to scope</p>
          <h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">The controls that make reuse safe.</h2>
          <p className="mt-6 text-body text-[#637060]">Review which capabilities fit the proposed workflow. Provider coverage and release readiness are confirmed during scoping.</p>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {capabilities.map((capability, index) => {
            const Icon = icons[index % icons.length];
            return <article data-scroll-reveal key={capability.title} className="border-b border-[#e4ebe0] pb-8"><span className="grid size-12 place-items-center rounded-2xl bg-[#edf5eb] text-[#007d21]"><Icon size={23} strokeWidth={1.6} /></span><h3 className="mt-6 text-card-title font-semibold">{capability.title}</h3><p className="mt-3 text-body text-[#637060]">{capability.description}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}
