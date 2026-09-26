import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCaseCards } from "../../../enterprise/use-cases/data/useCases";
import { individualUseCaseCards } from "../../../../shared/data/audienceContent";
import type { Audience } from "../../../../shared/lib/audience";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";
import { industryImages } from "../../../../shared/components/media/businessImages";
import { useMotionSettings } from "../../../../shared/components/motion/MotionSettings";

const individualIndustry: Record<string, string> = {
  banking: "fintechs",
  lending: "digital-lenders",
  marketplaces: "marketplaces",
  work: "hr-platforms",
  education: "schools",
  everyday: "logistics-delivery",
};

const UseCase = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  const cards = enterprise ? useCaseCards : individualUseCaseCards;
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const { reduced, paused } = useMotionSettings();
  const updateEdges = () => {
    const element = rail.current;
    if (!element) return;
    const start = element.scrollLeft <= 2;
    const end = element.scrollLeft >= element.scrollWidth - element.clientWidth - 2;
    setEdges((current) =>
      current.start === start && current.end === end ? current : { start, end },
    );
  };
  useEffect(() => {
    const observer = new ResizeObserver(updateEdges);
    if (rail.current) observer.observe(rail.current);
    return () => observer.disconnect();
  }, []);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const width = element.firstElementChild?.getBoundingClientRect().width ?? 320;
    element.scrollBy({
      left: direction * (width + 24),
      behavior: reduced || paused ? "instant" : "smooth",
    });
  };
  return (
    <section id="cases" className="section-space bg-[#f4f6f1]">
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-7">
          <div className="max-w-[790px]">
            <p className="eyebrow">{enterprise ? "Industry workflows" : "Where it helps"}</p>
            <h2 className="section-heading mt-4">
              {enterprise
                ? "Different operations. One verification platform."
                : "A job. An account. Your next application."}
            </h2>
            <p className="mt-5 max-w-[680px] text-subtitle text-[#526058]">
              {enterprise
                ? "Borrowers, candidates, riders, contractors and sellers need different evidence. Configure the checks and review steps around the decision your team makes."
                : "See the identity, credentials and documents each request may need. You decide what to share; the receiving organization reviews your application."}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous use cases"
              onClick={() => move(-1)}
              disabled={edges.start}
              className="grid size-13 place-items-center rounded-full border border-[#002d0e]/35 disabled:opacity-30"
            >
              <ArrowLeft size={23} />
            </button>
            <button
              type="button"
              aria-label="Next use cases"
              onClick={() => move(1)}
              disabled={edges.end}
              className="grid size-13 place-items-center rounded-full bg-[#002d0e] text-white disabled:opacity-30"
            >
              <ArrowRight size={23} />
            </button>
          </div>
        </div>
        <div
          ref={rail}
          onScroll={updateEdges}
          role="region"
          aria-roledescription="carousel"
          aria-label="Use cases"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.target === event.currentTarget &&
              ["ArrowLeft", "ArrowRight"].includes(event.key)
            ) {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 [scrollbar-width:thin]"
        >
          {cards.map((card) => {
            const photo =
              industryImages[enterprise ? card.id : individualIndustry[card.id]] ??
              imagery.candidateReview;
            const content = (
              <>
                <ContextPhoto image={photo} size="card" />
                <h3 className="mt-4 flex items-start justify-between gap-3 text-card-title font-medium">
                  {card.title}
                  {enterprise && <ArrowUpRight size={22} className="mt-1 shrink-0" />}
                </h3>
                <p className="mt-2 text-body text-[#526058]">{card.description}</p>
              </>
            );
            const className = "w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[29%]";
            return enterprise ? (
              <Link key={card.id} to={`/enterprise/use-cases/${card.id}`} className={className}>
                {content}
              </Link>
            ) : (
              <article key={card.id} className={className}>
                {content}
              </article>
            );
          })}
        </div>
        <Link
          to={enterprise ? "/enterprise/use-cases" : "/use-cases"}
          className="mt-7 inline-flex items-center gap-2 text-body font-medium"
        >
          {enterprise ? "Explore all industry workflows" : "Explore these journeys"}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default UseCase;
