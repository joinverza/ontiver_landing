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
        <div data-scroll-reveal className="site-container grid gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <p className="text-meta font-semibold uppercase text-[#c7e6b5]">Focused pilot</p>
            <h2 className="mt-3 max-w-[730px] text-section font-normal">{detail.cta}</h2>
            <p className="mt-4 max-w-2xl text-body text-white/75">{detail.purpose}</p>
            <Link
              to={detail.pilotPath}
              className="button-primary mt-6 !border-white !bg-white !text-[#002d0e]"
            >
              {detail.pilotCta}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="border-t border-white/20 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="text-card-title font-medium">A practical starting point</h3>
            <dl className="mt-5 grid grid-cols-3 gap-4">
              {[
                { label: "Duration", value: "30 days" },
                { label: "Scope", value: "50–200 cases" },
                { label: "Ownership", value: "One lead" },
              ].map((item) => (
                <div key={item.label} className="border-t border-white/20 pt-3">
                  <dt className="text-meta text-white/65">{item.label}</dt>
                  <dd className="mt-2 text-sm font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-white/75">{detail.boundary}</p>
          </div>
        </div>
      </section>
      <Footer audience="enterprise" />
    </main>
  );
};

export default UseCasePage;
