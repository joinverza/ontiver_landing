import type { UseCasePageDetail } from "../../data/useCases";

export default function UseCaseChallenge({ detail }: { detail: UseCasePageDetail }) {
  return (
    <section className="section-space">
      <div className="site-container grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-scroll-reveal><p className="eyebrow">The purpose</p><h2 className="mt-4 text-section font-normal">A workflow for your operation.</h2></div>
        <div data-scroll-reveal><p className="text-subtitle text-[#526058]">{detail.purpose}</p></div>
      </div>
    </section>
  );
}
