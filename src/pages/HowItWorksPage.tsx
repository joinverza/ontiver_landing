import StandalonePage from "../components/ui/StandalonePage";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";

const steps = [
  { title: "Review and consent", description: "See the request, the requester, and the purpose." },
  { title: "Add the evidence", description: "Submit only what's asked for." },
  { title: "Invite someone to confirm", description: "Some requests need a referee, employer, or institution to confirm a claim — invite them directly from the app." },
  { title: "Follow the review", description: "Track progress as the request is checked." },
  { title: "Keep approved proof", description: "Once approved, your proof is yours to reuse." },
  { title: "Approve its next use", description: "Reuse the same proof for a future request, with your approval each time." },
];

export default function HowItWorksPage() {
  return (
    <StandalonePage
      eyebrow="The planned user journey"
      title={<>A request arrives.<br /><span className="text-[#007d21]">You stay in control.</span></>}
      description="From an organization's invitation to approved proof, the mobile app is designed to keep your evidence, choices and request status together."
      visual={<ContextPhoto image={imagery.mobileApplication} priority />}
      primaryAction={{ label: "Take the First Step", to: "/waitlist" }}
      secondaryAction={{ label: "Explore your identity", to: "/identity" }}
      finalTitle="Take the first step."
    >
      <section className="section-space bg-[#f5f6f3]">
        <div className="site-container">
          <h2 className="section-heading max-w-[760px]" data-scroll-reveal>One request. A clear next step.</h2>
          <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="min-w-0" data-scroll-reveal>
              <ContextPhoto image={imagery.candidateReview} size="wide" />
            </div>
            <ol className="divide-y divide-[#d5dfd2]">
              {steps.map((step, index) => (
                <li key={step.title} data-scroll-reveal><details open={index === 0} className="py-4"><summary className="cursor-pointer text-card-title font-medium"><span className="mr-3 text-sm text-[#007d21]">{String(index + 1).padStart(2, "0")}</span>{step.title}</summary><p className="mt-3 text-body text-[#526058]">{step.description}</p></details></li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </StandalonePage>
  );
}
