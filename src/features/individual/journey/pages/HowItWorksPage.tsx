import StandalonePage from "../../../../shared/components/ui/StandalonePage";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { ImageTimeline } from "../../../../shared/components/media/ImageTimeline";

const steps = [
  {
    title: "Review and consent",
    description: "See the request, the requester, and the purpose.",
    image: editorialPhotos.consent,
  },
  {
    title: "Add the evidence",
    description: "Submit only what's asked for.",
    image: editorialPhotos.howItWorks,
  },
  {
    title: "Invite someone to confirm",
    description:
      "Some requests need a referee, employer, or institution to confirm a claim — invite them directly from the app.",
    image: imagery.work,
  },
  {
    title: "Follow the review",
    description: "Track progress as the request is checked.",
    image: editorialPhotos.requestProgress,
  },
  {
    title: "Keep approved proof",
    description: "Once approved, your proof is yours to reuse.",
    image: editorialPhotos.proof,
  },
  {
    title: "Approve its next use",
    description: "Reuse the same proof for a future request, with your approval each time.",
    image: editorialPhotos.personalPhone,
  },
];

const HowItWorksPage = () => {
  return (
    <StandalonePage
      eyebrow="The planned user journey"
      title={
        <>
          A request arrives.
          <br />
          <span className="text-accent">You stay in control.</span>
        </>
      }
      description="From an organization's invitation to approved proof, the mobile app is designed to keep your evidence, choices and request status together."
      visual={
        <ContextPhoto
          image={imagery.individualHero}
          priority
          sizes="(min-width: 1024px) 47vw, 100vw"
        />
      }
      primaryAction={{ label: "Take the First Step", to: "/waitlist" }}
      secondaryAction={{ label: "Explore your identity", to: "/identity" }}
      finalTitle="Take the first step."
      finalImage={imagery.cityPortrait}
    >
      <section className="section-space bg-surface" aria-labelledby="journey-steps-heading">
        <div className="site-container">
          <h2 id="journey-steps-heading" className="section-heading" data-scroll-reveal>
            One request. A clear next step.
          </h2>
          <ImageTimeline steps={steps} labelledBy="journey-steps-heading" className="mt-10" />
        </div>
      </section>
    </StandalonePage>
  );
};

export default HowItWorksPage;
