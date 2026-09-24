import StandalonePage from "../components/ui/StandalonePage";
import { individualUseCaseCards } from "../data/audienceContent";
import { getImageAlt, getImagePosition } from "../data/imagery";

export default function IndividualUseCasesPage() {
  return (
    <StandalonePage
      eyebrow="Where it helps"
      title={<>Trusted identity.<br /><span className="text-[#007d21]">More of everyday life.</span></>}
      description="From a new opportunity to an everyday service, see where reusable proof could help on supported platforms."
      secondaryAction={{ label: "See how it works", to: "/how-it-works" }}
      finalTitle="Make room for what comes next."
    >
      <section className="section-space" aria-label="Individual use cases">
        <div className="site-container grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {individualUseCaseCards.map((card) => (
            <article key={card.id}>
              <div className="aspect-[1.3] overflow-hidden rounded-[28px] bg-[#edf5e7]">
                <img src={card.imageUrl} alt={getImageAlt(card.imageUrl)} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: getImagePosition(card.imageUrl) }} />
              </div>
              <h2 className="mt-6 text-card-title font-semibold">{card.title}</h2>
              <p className="mt-3 text-body text-[#526058]">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </StandalonePage>
  );
}
