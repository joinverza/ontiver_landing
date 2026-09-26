import { ArrowUpRight, History, KeyRound, LockKeyhole, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../../shared/components/layout/Footer";
import WorkflowVisual from "../../../../shared/components/ui/WorkflowVisual";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { imagery } from "../../../../shared/data/imagery";
import type { Audience } from "../../../../shared/lib/audience";

const reviewAreas = [
  {
    icon: LockKeyhole,
    title: "Evidence and sources",
    copy: "Verification requests, results, and source references are recorded for review.",
    individualCopy:
      "Businesses see only verified results and approved claims, not raw documents by default.",
  },
  {
    icon: KeyRound,
    title: "Access and approvals",
    copy: "Every access event is logged and traceable to a request and approval.",
    individualCopy: "Every business request is logged and tied to your explicit approval.",
  },
  {
    icon: History,
    title: "Logs and monitoring",
    copy: "Minimized audit entries: actor, purpose, tenant, event class.",
    individualCopy: "Activity is logged for a clear record on both sides.",
  },
  {
    icon: SlidersHorizontal,
    title: "Retention and lifecycle",
    copy: "Clear retention rules rather than indefinite storage.",
    individualCopy: "Your data isn't held indefinitely — retention follows clear rules.",
  },
];

const individualControls = [
  {
    title: "Know the request",
    copy: "See who's asking, what for, and by when, before anything happens.",
  },
  {
    title: "Choose the claims",
    copy: "Approve specific pieces of information, not blanket access.",
  },
  { title: "Review access", copy: "See a full history of what you've shared and with whom." },
];

const enterpriseControls = [
  {
    title: "Purpose and consent",
    copy: "Every request states its purpose; nothing proceeds without the user's approval.",
  },
  {
    title: "Relevant evidence",
    copy: "Reviewers see only the evidence tied to the specific request.",
  },
  {
    title: "Controlled access",
    copy: "Role-based dashboard and API access, scoped to what each team member needs.",
  },
];

const SecurityPage = ({ audience = "individual" }: { audience?: Audience }) => {
  const isEnterprise = audience === "enterprise";
  const controls = isEnterprise ? enterpriseControls : individualControls;

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="min-w-0" data-scroll-reveal>
            <p className="eyebrow">Security and trust</p>
            <h1 className="mt-5 max-w-[16ch] text-page-hero font-semibold">
              {isEnterprise
                ? "Built for sensitive identity workflows."
                : "Security and privacy by design."}
            </h1>
            <p className="mt-6 max-w-xl text-subtitle text-[#526058]">
              {isEnterprise
                ? "Ontiver is designed around secure verification, consent-based sharing, auditability, and data-protection-first architecture."
                : "Ontiver is built to reduce how often your sensitive documents are handled, and to keep you in control of every share."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {isEnterprise ? (
                <a href="#request-docs" className="button-primary">
                  Request Security Documentation
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ) : (
                <Link to="/privacy" className="button-primary">
                  Read the Privacy Policy
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              )}
              <Link to={isEnterprise ? "/privacy" : "/support"} className="button-secondary">
                {isEnterprise ? "Read the Privacy Policy" : "Contact Support"}
              </Link>
            </div>
          </div>
          <div className="min-w-0" data-scroll-reveal>
            {isEnterprise ? (
              <WorkflowVisual
                compact
                variant="review"
                title="Evidence for human review"
                claims={["Source results", "Consent scope", "Decision and audit trail"]}
              />
            ) : (
              <ContextPhoto image={imagery.mobileApplication} priority />
            )}
          </div>
        </div>
      </section>

      <section id="your-controls" className="section-space scroll-mt-20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0" data-scroll-reveal>
            {isEnterprise ? (
              <ContextPhoto image={imagery.candidateReview} size="wide" />
            ) : (
              <WorkflowVisual
                compact
                variant="consent"
                title="You choose what to share"
                claims={["Name", "Identity proof status"]}
              />
            )}
          </div>
          <div>
            <div data-scroll-reveal>
              <p className="eyebrow">Designed controls</p>
              <h2 className="section-heading mt-4">Purpose. Permission. A clear record.</h2>
            </div>
            <div className="mt-8 divide-y divide-[#d9e2d5]">
              {controls.map(({ title, copy }) => (
                <article key={title} className="py-5 first:pt-0" data-scroll-reveal>
                  <h3 className="text-card-title font-semibold">{title}</h3>
                  <p className="mt-2 text-body text-[#526058]">{copy}</p>
                </article>
              ))}
            </div>
            <Link
              to={isEnterprise ? "/enterprise/contact?request=security-documentation" : "/waitlist"}
              className="mt-4 inline-flex items-center gap-3 text-body font-semibold text-[#007d21]"
            >
              {isEnterprise ? "Request security documentation" : "Join the user waitlist"}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="compliance" className="section-space scroll-mt-20 bg-[#edf5eb]">
        <div className="site-container">
          <div
            className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-end"
            data-scroll-reveal
          >
            <div className="max-w-[710px]">
              <p className="eyebrow">Enterprise security review</p>
              <h2 className="section-heading mt-4">
                {isEnterprise
                  ? "Define the controls before rollout."
                  : "A clear record on both sides."}
              </h2>
              <p className="mt-5 text-body text-[#526058]">
                {isEnterprise
                  ? "Confirm implementation and provider responsibilities for your pilot."
                  : "See how businesses handle evidence, access, and sharing records."}
              </p>
            </div>
            {isEnterprise && (
              <Link
                to="/enterprise/contact?request=security-documentation"
                className="button-primary shrink-0"
              >
                Request a security review <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {reviewAreas.map(({ icon: Icon, title, copy, individualCopy }) => (
              <article key={title} className="border-t border-[#cbdac5] pt-6" data-scroll-reveal>
                <Icon className="mb-5 size-7 text-[#007d21]" aria-hidden="true" />
                <h3 className="text-card-title font-semibold">{title}</h3>
                <p className="mt-3 text-body text-[#526058]">
                  {isEnterprise ? copy : individualCopy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request-docs" className="scroll-mt-24 py-12 sm:py-16">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div data-scroll-reveal>
            <h2 className="section-heading">
              {isEnterprise ? "Review the details with your team." : "Questions about your data?"}
            </h2>
            {isEnterprise && (
              <p className="mt-4 text-body text-[#526058]">
                Use our enterprise request form to tell us which security and compliance
                documentation you need.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end" data-scroll-reveal>
            <Link
              to={isEnterprise ? "/enterprise/contact?request=security-documentation" : "/privacy"}
              className="button-primary"
            >
              {isEnterprise ? "Request Security Documentation" : "Read the Privacy Policy"}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link to={isEnterprise ? "/privacy" : "/support"} className="button-secondary">
              {isEnterprise ? "Read the Privacy Policy" : "Contact Support"}
            </Link>
          </div>
        </div>
      </section>
      <Footer audience={audience} />
    </main>
  );
};

export default SecurityPage;
