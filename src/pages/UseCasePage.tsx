import { ArrowUpRight } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { RelatedUseCases, UseCaseCapabilities, UseCaseChallenge, UseCaseEvaluation, UseCaseFlow, UseCaseHero, UseCasePilotFocus } from "../components/use-case-page";
import { useCasePageDetails } from "../data/useCases";

export default function UseCasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = id ? useCasePageDetails[id] : undefined;
  if (!detail) return <Navigate to="/" replace />;
  const relatedItems = Object.values(useCasePageDetails).filter((item) => item.id !== detail.id);

  return (
    <main className="bg-white text-[#002d0e]">
      <UseCaseHero detail={detail} onBack={() => navigate(-1)} />
      <UseCaseEvaluation measures={detail.evaluationMeasures} />
      <UseCaseChallenge detail={detail} />
      <UseCaseFlow workflow={detail.workflow} />
      <UseCaseCapabilities capabilities={detail.capabilities} />
      <UseCasePilotFocus focus={detail.pilotFocus} />
      <RelatedUseCases items={relatedItems} />
      <section className="section-space bg-[#edf5eb]">
        <div data-scroll-reveal className="site-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="max-w-[740px] text-section font-semibold tracking-[-0.035em]">{detail.cta}</h2>
          <Link to="/enterprise/contact" className="button-primary shrink-0">Discuss a pilot<ArrowUpRight size={18} /></Link>
        </div>
      </section>
      <CurtainFooter audience="enterprise" />
    </main>
  );
}
