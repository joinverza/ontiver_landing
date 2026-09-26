import { ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../../../../shared/components/layout/Footer";
import {
  RelatedUseCases,
  UseCaseCapabilities,
  UseCaseChallenge,
  UseCaseFlow,
  UseCaseHero,
  UseCasePilotFocus,
} from "../components/index";
import { priorityUseCases, useCasePageDetails } from "../data/useCases";

const UseCasePage = () => {
  const { id } = useParams();
  const detail = id ? useCasePageDetails[id] : undefined;
  if (!detail) return <Navigate to="/enterprise/use-cases" replace />;
  const relatedItems = [
    ...Object.values(useCasePageDetails).filter((item) => item.category === detail.category),
    ...priorityUseCases,
  ].filter(
    (item, index, items) =>
      item.id !== detail.id && items.findIndex((other) => other.id === item.id) === index,
  );

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <UseCaseHero detail={detail} />
      <UseCaseChallenge detail={detail} />
      <UseCaseFlow workflow={detail.workflow} />
      <UseCaseCapabilities detail={detail} />
      <UseCasePilotFocus focus={detail.pilotFocus} measures={detail.evaluationMeasures} />
      <RelatedUseCases items={relatedItems} />
      <section className="section-space bg-[#002d0e] text-white">
        <div
          data-scroll-reveal
          className="site-container flex flex-wrap items-end justify-between gap-8"
        >
          <h2 className="max-w-[730px] text-section font-normal">{detail.cta}</h2>
          <Link
            to={detail.pilotPath}
            className="button-primary !border-white !bg-white !text-[#002d0e]"
          >
            {detail.pilotCta}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <Footer audience="enterprise" />
    </main>
  );
};

export default UseCasePage;
