import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import StandalonePage from "../../../../shared/components/ui/StandalonePage";
import WorkflowVisual from "../../../../shared/components/ui/WorkflowVisual";

const requestChoices = [
  {
    title: "Consent and purpose",
    description: "Every request states its purpose plainly. You see why before you decide.",
  },
  {
    title: "Choose the claims",
    description: "Approve only the specific pieces of information a request actually needs.",
  },
  {
    title: "Approve the purpose",
    description:
      "Confirm you're comfortable with how your information will be used before anything is shared.",
  },
];

const proofDetails = [
  {
    title: "Status",
    description: "See at a glance whether your proof is active, pending, or needs renewal.",
  },
  {
    title: "Sources",
    description: "Know exactly which checks and sources contributed to your proof.",
  },
  {
    title: "Expiry",
    description: "Proofs aren't indefinite — see when yours needs to be refreshed.",
  },
  { title: "Revocation", description: "Revoke access to a shared proof at any time." },
];

const sharingDetails = [
  {
    title: "Who received claims",
    description: "A full list of every organization you've shared with.",
  },
  { title: "When", description: "Timestamped record of every share." },
  { title: "Why", description: "The stated purpose behind each request." },
];

const IndividualProductPage = () => {
  return (
    <StandalonePage
      eyebrow="Planned mobile experience"
      title={
        <>
          Your identity.
          <br />
          <span className="text-[#007d21]">Your control.</span>
        </>
      }
      description="A reusable proof of who you are — created once, shared only when you approve it."
      visual={<WorkflowVisual variant="mobile" title="Planned mobile app" compact />}
      primaryAction={{ label: "Join the Waitlist", to: "/waitlist" }}
      secondaryAction={{ label: "See how it works", to: "/how-it-works" }}
      finalTitle="Stay in control of your next request."
      finalVisual={<WorkflowVisual variant="proof" title="Planned proof status" compact />}
    >
      <section className="section-space">
        <div className="site-container">
          <h2 className="section-heading max-w-3xl" data-scroll-reveal>
            From request to reuse
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {requestChoices.map((choice) => (
              <article
                key={choice.title}
                className="border-t border-[#002d0e]/15 pt-5"
                data-scroll-reveal
              >
                <h3 className="text-card-title font-medium">{choice.title}</h3>
                <p className="mt-3 text-body text-[#526058]">{choice.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-[#f5f6f3]">
        <div className="site-container">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: "Approved proof", items: proofDetails },
              { title: "Sharing history", items: sharingDetails },
            ].map((group) => (
              <div key={group.title} data-scroll-reveal>
                <h2 className="text-section font-medium">{group.title}</h2>
                <div className="mt-5 divide-y divide-[#002d0e]/15 border-y border-[#002d0e]/15">
                  {group.items.map((item) => (
                    <details key={item.title} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-card-title font-medium [&::-webkit-details-marker]:hidden">
                        {item.title}
                        <span aria-hidden="true" className="text-[#007d21] group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-body text-[#526058]">{item.description}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-[#002d0e]/15 pt-6"
            data-scroll-reveal
          >
            <h2 className="text-card-title font-medium">Where it helps</h2>
            <Link
              to="/use-cases"
              className="inline-flex items-center gap-2 text-body font-semibold text-[#007d21]"
            >
              See Supported Platforms
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </StandalonePage>
  );
};

export default IndividualProductPage;
