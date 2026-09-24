import { problems } from "../../../data/problem";
import { individualProblems } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import AuroraBadge from "../../ui/AuroraBadge";

export default function Problem({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <div data-scroll-reveal className="mb-12 grid gap-5 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div><AuroraBadge>{enterprise ? "The Enterprise Problem" : "The Problem"}</AuroraBadge></div>
          <h2 className="section-heading max-w-[760px]">{enterprise ? "Identity operations should not slow down growth." : "Proving who you are should not feel this repetitive."}</h2>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {(enterprise ? problems : individualProblems).map((item, index) => (
            <article data-scroll-reveal key={item.title} className="overflow-hidden rounded-3xl bg-[#f7f7f7]">
              <div className="aspect-[1.7] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover">{item.illustration}</div>
              <div className="p-6 sm:p-8">
                <span className="text-meta font-semibold text-[#007d21]">0{index + 1}</span>
                <h3 className="mt-4 text-card-title font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-body text-[#002d0e]/65">{item.para}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
