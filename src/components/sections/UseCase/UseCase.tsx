import { useCaseCards } from "../../../data/useCases";
import { individualUseCaseCards } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import Text from "../../base/Text";
import UseCaseCardItem from "../../use-case/UseCaseCardItem";

export default function UseCase({ audience }: { audience: Audience }) {
  const cards =
    audience === "enterprise" ? useCaseCards : individualUseCaseCards;

  return (
    <section
      id="cases"
      className="relative isolate flex justify-center overflow-hidden bg-bg-light text-white max-[640px]:py-[68px]"
    >
      <div className="relative isolate w-full min-w-0 overflow-hidden rounded-t-[28px] bg-[#06160f] px-[clamp(18px,5vw,80px)] py-[clamp(76px,9vw,118px)] [background-image:radial-gradient(circle_at_50%_42%,rgba(0,147,17,0.08),transparent_28%)] sm:rounded-t-[36px] lg:rounded-t-[48px] max-[640px]:px-[18px] max-[640px]:py-[68px]">
        <div
          className="pointer-events-none absolute -bottom-[25%] -left-[10%] -right-[10%] -top-[10%] z-0 origin-center [background-image:linear-gradient(rgba(34,197,94,0.065)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(34,197,94,0.055)_0.5px,transparent_0.5px)] [background-size:60px_60px] [transform:perspective(800px)_rotateX(55deg)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_56%,rgba(1,11,7,0.9)_0%,rgba(1,11,7,0.56)_38%,transparent_78%)]"
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto w-[min(100%,1180px)]">
          <Text
            containerClassName="pb-[clamp(36px,5vw,54px)]"
            badgeTextClassName="border border-light-primary/60! bg-[#06160f]/85! text-[#eaffef]!"
            color="white"
            btext={audience === "enterprise" ? "Enterprise Use Cases" : "Where It Helps"}
            heading={
              audience === "enterprise"
                ? "Built for the teams that need verified trust most."
                : "Use trusted identity across more of everyday life."
            }
            animate={false}
          />

          <div className="relative grid auto-rows-[minmax(128px,auto)] grid-cols-6 gap-4 max-[1024px]:grid-cols-2 max-[1024px]:auto-rows-auto max-[640px]:grid-cols-1 max-[640px]:gap-3.5">
            {cards.map((card) => (
              <UseCaseCardItem
                key={card.id}
                card={card}
                linkTo={
                  audience === "enterprise"
                    ? `/enterprise/use-cases/${card.id}`
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
