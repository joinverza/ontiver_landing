import Text from "../base/Text";
import HoverEffect, { type HoverEffectItem } from "../ui/card-hover-effect";
import type { UseCasePageDetail } from "../../data/useCases";

const capabilityImages = [
  "/assets/fingerprint.png",
  "/assets/consent.svg",
  "/assets/radar.png",
  "/assets/systems.png",
];

type UseCaseCapabilitiesProps = {
  capabilities: UseCasePageDetail["capabilities"];
};

export default function UseCaseCapabilities({
  capabilities,
}: UseCaseCapabilitiesProps) {
  const capabilityCards: HoverEffectItem[] = capabilities.map(
    (capability, index) => ({
      title: capability.title,
      description: capability.description,
      image: capabilityImages[index % capabilityImages.length],
    }),
  );

  return (
    <section
      className="overflow-hidden px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-[min(100%,1120px)]">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Text
              btext="Key capabilities"
              heading="The controls that make reuse safe."
              animate={false}
              containerClassName="items-start gap-4 pb-0"
              badgeWrapperClassName="mx-0"
              badgeTextClassName="border border-black/20 text-[var(--usecase-accent)]"
              headingClassName="mx-0 max-w-[640px] text-left text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
            />
          </div>
        </div>
        <HoverEffect
          items={capabilityCards}
          className="[&_[data-hover-card]>div]:border-black/10 [&_[data-hover-card]>div]:shadow-none"
        />
      </div>
    </section>
  );
}
