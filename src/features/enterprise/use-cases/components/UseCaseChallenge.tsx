import type { UseCasePageDetail } from "../data/useCases";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { industryContextImages } from "../../../../shared/components/media/businessImages";

const UseCaseChallenge = ({ detail }: { detail: UseCasePageDetail }) => {
  const contextImage = industryContextImages[detail.id];
  const heading = (
    <>
      <p className="eyebrow">The purpose</p>
      <h2 className="mt-4 text-section font-normal">A workflow for your operation.</h2>
    </>
  );
  return (
    <section className="section-space">
      <div
        className={`site-container ${contextImage ? "story-split" : "grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"}`}
      >
        {contextImage ? (
          <div className="story-split-media">
            <div data-media-reveal>
              <ContextPhoto image={contextImage} />
            </div>
          </div>
        ) : (
          <div data-scroll-reveal>{heading}</div>
        )}
        <div data-scroll-reveal className={contextImage ? "story-split-content" : undefined}>
          {contextImage && heading}
          <p className={`${contextImage ? "mt-6 " : ""}text-subtitle text-[#526058]`}>
            {detail.purpose}
          </p>
          <div className="mt-6 border-t border-[#d6dfd1] pt-5">
            <h3 className="text-card-title font-medium">The people behind the process</h3>
            <p className="mt-3 text-body text-[#526058]">{detail.journey}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseChallenge;
