import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Code2,
  Fingerprint,
  KeyRound,
  Layers3,
  LockKeyhole,
  ScanFace,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";

export type WorkflowVisualVariant =
  | "mobile"
  | "consent"
  | "review"
  | "proof"
  | "workflow"
  | "sources"
  | "checks"
  | "intelligence"
  | "history"
  | "developers";

type Step = { title: string; description?: string };
export type WorkflowVisualProps = {
  variant?: WorkflowVisualVariant;
  title?: string;
  organization?: string;
  purpose?: string;
  claims?: string[];
  steps?: Step[];
  activeStep?: number;
  compact?: boolean;
  className?: string;
};

const defaults: Record<WorkflowVisualVariant, { title: string; label: string }> = {
  mobile: { title: "Your identity wallet", label: "User app" },
  consent: { title: "You choose what to share", label: "Consent" },
  review: { title: "Evidence for human review", label: "Decision path" },
  proof: { title: "Carry your approved claims", label: "Proof" },
  workflow: { title: "One connected workflow", label: "Journey map" },
  sources: { title: "Start with the right evidence", label: "Source map" },
  checks: { title: "Checks with a clear result", label: "Verification path" },
  intelligence: { title: "A signal. A reason. A review.", label: "Review context" },
  history: { title: "Every share has a record", label: "Sharing lifecycle" },
  developers: { title: "Connect your onboarding flow", label: "Integration path" },
};

const defaultSteps: Step[] = [
  { title: "Enterprise request" },
  { title: "User consent" },
  { title: "Evidence and checks" },
  { title: "Explainable signals" },
  { title: "Enterprise review" },
  { title: "Approved proof" },
  { title: "User-approved reuse" },
];

const WorkflowVisual = ({
  variant = "mobile",
  title,
  organization = "Requesting organization",
  purpose = "Identity verification",
  claims,
  steps = defaultSteps,
  activeStep,
  compact = false,
  className = "",
}: WorkflowVisualProps) => {
  const heading = title ?? defaults[variant].title;
  const selectedClaims = claims?.length
    ? claims
    : ["Identity attributes", "Credential status", "Consent record"];
  const visibleClaims = selectedClaims.slice(0, compact ? 4 : 6);
  const sourceItems =
    claims ??
    (variant === "sources"
      ? ["NIN / BVN where appropriate", "Phone", "Documents and biometrics", "Institutions and referees"]
      : variant === "checks"
        ? ["Identity and source match", "Document and face checks", "Certificate checks", "Reference confirmation"]
        : ["Cross-source inconsistency", "Possible duplicate", "Evidence needs clarification"]);

  return (
    <figure
      className={`workflow-visual ${compact ? "workflow-visual--compact" : ""} ${className}`}
      aria-label={`${heading}. Illustrative Ontiver ${defaults[variant].label.toLowerCase()}.`}
    >
      <div className="workflow-visual-heading">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#009311]" />
          {defaults[variant].label}
        </span>
        <span className="text-[#617065]">Concept diagram</span>
      </div>
      <div className="workflow-visual-canvas">
        {variant === "workflow" && (
          <div className="workflow-diagram">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-card-title font-medium">{heading}</h3>
                <p className="mt-2 text-meta text-[#617065]">
                  {steps.length} connected stages, configured around the request
                </p>
              </div>
              <Layers3 size={27} className="shrink-0 text-[#007d21]" />
            </div>
            <ol className="workflow-stage-grid mt-5">
              {steps.map((step, index) => (
                <li key={`${step.title}-${index}`} className="workflow-stage-item">
                  <span
                    className={
                      activeStep === index
                        ? "workflow-stage-number is-active"
                        : "workflow-stage-number"
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 break-words text-sm font-medium">{step.title}</span>
                </li>
              ))}
            </ol>
            {visibleClaims.length > 0 && (
              <p className="mt-5 border-t border-[#d9e2d5] pt-4 text-meta text-[#617065]">
                Scoped evidence: {visibleClaims.join(" / ")}
              </p>
            )}
          </div>
        )}
        {(variant === "sources" || variant === "checks" || variant === "intelligence") && (
          <div className="workflow-diagram">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-card-title font-medium">{heading}</h3>
                <p className="mt-2 text-meta text-[#617065]">
                  {variant === "sources"
                    ? "Choose only the evidence this request needs."
                    : variant === "checks"
                      ? "Selected checks return a normalized result."
                      : "Signals give reviewers context, not an automatic decision."}
                </p>
              </div>
              {variant === "sources" ? (
                <Fingerprint size={32} className="shrink-0 text-[#007d21]" />
              ) : variant === "checks" ? (
                <ScanFace size={32} className="shrink-0 text-[#007d21]" />
              ) : (
                <ShieldCheck size={32} className="shrink-0 text-[#007d21]" />
              )}
            </div>
            <ol className="workflow-source-grid mt-5">
              {sourceItems.slice(0, compact ? 4 : 6).map((item, index) => (
                <li key={item} className="workflow-source-item">
                  <span className="workflow-source-number">0{index + 1}</span>
                  <span className="min-w-0 break-words text-sm font-medium">{item}</span>
                </li>
              ))}
            </ol>
            <div className="workflow-source-next">
              <span>
                {variant === "sources"
                  ? "Selected checks"
                  : variant === "checks"
                    ? "Normalized result"
                    : "Reasoned signal"}
              </span>
              <ArrowRight size={18} aria-hidden="true" />
              <span>{variant === "intelligence" ? "Human review" : "Enterprise decision"}</span>
            </div>
          </div>
        )}
        {variant === "review" && (
          <div className="workflow-diagram">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-card-title font-medium">{heading}</h3>
                <p className="mt-2 text-meta text-[#617065]">Evidence supports a human decision</p>
              </div>
              <ShieldCheck size={27} className="shrink-0 text-[#007d21]" />
            </div>
            <div className="workflow-review-grid mt-5">
              <div>
                <p className="text-meta font-semibold uppercase text-[#617065]">Review context</p>
                <ol className="mt-3">
                  {visibleClaims.map((claim, index) => (
                    <li key={claim} className="workflow-review-item">
                      <span className="text-meta text-[#007d21]">0{index + 1}</span>
                      <span className="min-w-0 break-words text-sm font-medium">{claim}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <ArrowRight className="workflow-review-arrow" aria-hidden="true" />
              <div className="workflow-review-outcome">
                <p className="text-body font-semibold">Authorized reviewer</p>
                <p className="mt-2 text-sm text-[#526058]">
                  Approve, request information, reject, or escalate.
                </p>
              </div>
            </div>
            <p className="mt-5 border-t border-[#d9e2d5] pt-4 text-meta text-[#617065]">
              {purpose || "The organization remains responsible for its decision."}
            </p>
          </div>
        )}
        {(variant === "mobile" || variant === "consent") && (
          <div className="workflow-consent-map">
            <div className="workflow-consent-context">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e1eed9] text-[#20572d]">
                  <UserRound size={21} />
                </span>
                <div className="min-w-0">
                  <p className="text-meta text-[#617065]">{organization}</p>
                  <h3 className="mt-1 text-body font-semibold">{heading}</h3>
                </div>
              </div>
              <div className="mt-5 border-l-2 border-[#8db878] pl-4">
                <p className="text-meta font-semibold uppercase text-[#617065]">Purpose</p>
                <p className="mt-1 break-words text-sm font-medium">{purpose}</p>
              </div>
            </div>
            <div>
              <p className="text-meta font-semibold uppercase text-[#617065]">Requested claims</p>
              <ul className="workflow-consent-claims mt-3">
                {visibleClaims.map((claim, index) => (
                  <li key={claim}>
                    <span className="workflow-consent-marker">
                      {variant === "consent" && index === 0 ? <Check size={13} /> : null}
                    </span>
                    <span className="min-w-0 break-words text-sm">{claim}</span>
                    {variant === "consent" && index === 0 ? (
                      <span className="ml-auto text-meta text-[#007d21]">Selected</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="workflow-consent-outcome">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <LockKeyhole size={16} aria-hidden="true" /> Your decision
              </span>
              <ArrowRight size={18} aria-hidden="true" />
              <span className="text-sm font-semibold">Approve selected claims</span>
            </div>
          </div>
        )}
        {variant === "proof" && (
          <div className="workflow-diagram">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-meta text-[#617065]">Planned proof concept</p>
                <h3 className="mt-2 text-card-title font-medium">{heading}</h3>
              </div>
              <BadgeCheck size={36} className="shrink-0 text-[#007d21]" strokeWidth={1.3} />
            </div>
            <div className="workflow-proof-claims mt-5">
              {visibleClaims.map((claim) => (
                <p key={claim} className="flex items-center gap-3 text-sm font-medium">
                  <Check size={17} className="shrink-0 text-[#007d21]" /> {claim}
                </p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#d9e2d5] pt-4 text-meta text-[#617065]">
              <span className="inline-flex items-center gap-2"><Clock3 size={15} /> Expiry</span>
              <span className="inline-flex items-center gap-2"><KeyRound size={15} /> Revocation</span>
            </div>
          </div>
        )}
        {variant === "history" && (
          <div className="workflow-diagram">
            <h3 className="text-card-title font-medium">{heading}</h3>
            <ol className="workflow-history-list mt-5">
              {["Request received", "Purpose reviewed", "Claims approved", "Access expires"].map(
                (step, index) => (
                  <li key={step} className="workflow-history-item">
                    <span className="workflow-stage-number">0{index + 1}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </li>
                ),
              )}
            </ol>
            <p className="mt-5 border-t border-[#d9e2d5] pt-4 text-meta text-[#617065]">
              Who received what, why, when, and until when.
            </p>
          </div>
        )}
        {variant === "developers" && (
          <div className="workflow-diagram">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-card-title font-medium">{heading}</h3>
              <Code2 size={25} className="shrink-0 text-[#007d21]" />
            </div>
            <ol className="workflow-stage-grid mt-5">
              {["Create request", "Collect consent", "Receive status", "Review evidence"].map(
                (step, index) => (
                  <li key={step} className="workflow-stage-item">
                    <span className="workflow-stage-number">0{index + 1}</span>
                    <span className="min-w-0 break-words text-sm font-medium">{step}</span>
                  </li>
                ),
              )}
            </ol>
            <p className="mt-5 border-t border-[#d9e2d5] pt-4 text-meta text-[#617065]">
              API access, sandbox scope, and event contracts are agreed for each pilot.
            </p>
          </div>
        )}
      </div>
      <figcaption className="workflow-visual-caption">
        <Smartphone size={15} className="shrink-0" aria-hidden="true" />
        Illustrative concept. No live customer or verification data.
      </figcaption>
    </figure>
  );
};

export default WorkflowVisual;