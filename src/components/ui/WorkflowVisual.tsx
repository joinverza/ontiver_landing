import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BadgeCheck, Bell, Check, CircleCheck, Clock3, FileCheck2, FileText, Fingerprint, KeyRound, Layers3, ListChecks, LockKeyhole, ScanFace, ShieldCheck, Smartphone, UserRound } from "lucide-react";

export type WorkflowVisualVariant = "mobile" | "consent" | "review" | "proof" | "workflow" | "sources" | "checks" | "intelligence" | "history" | "developers";
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
  consent: { title: "You choose what to share", label: "Consent request" },
  review: { title: "Evidence for your decision", label: "Enterprise workspace" },
  proof: { title: "Carry your approved claims", label: "Proof wallet" },
  workflow: { title: "One connected workflow", label: "Workflow template" },
  sources: { title: "Start with the right evidence", label: "Identity sources" },
  checks: { title: "Checks with a clear result", label: "Verification" },
  intelligence: { title: "A signal. A reason. A review.", label: "Review context" },
  history: { title: "Every share has a record", label: "Sharing history" },
  developers: { title: "Connect your onboarding flow", label: "API & webhooks" },
};
const defaultSteps = ["Enterprise request", "User consent", "Evidence & checks", "Explainable signals", "Enterprise review", "Approved proof", "User-approved reuse"].map(title => ({ title }));

function Status({ children, pending = false }: { children: ReactNode; pending?: boolean }) {
  return <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-meta ${pending ? "bg-[#fff0d1] text-[#76551b]" : "bg-[#e6f3df] text-[#20572d]"}`}><span className={`size-1.5 shrink-0 rounded-full ${pending ? "bg-[#aa7a21]" : "bg-[#338443]"}`} />{children}</span>;
}

export default function WorkflowVisual({ variant = "mobile", title, organization = "Example employer", purpose = "Candidate screening", claims, steps = defaultSteps, activeStep, compact = false, className = "" }: WorkflowVisualProps) {
  const heading = title ?? defaults[variant].title;
  const selectedClaims = claims?.length ? claims : ["Identity confirmed", "Certificate checked", "Employment confirmed"];
  const visibleClaims = selectedClaims.slice(0, compact ? 3 : 4);
  const displaySteps = compact ? steps.slice(0, 4) : steps;
  return <figure className={`workflow-visual ${compact ? "workflow-visual--compact" : ""} ${className}`} aria-label={`${heading}. Illustrative Ontiver ${defaults[variant].label.toLowerCase()}.`}>
    <div className="workflow-visual-heading"><span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-[#009311]" />{defaults[variant].label}</span><span className="text-[#617065]">Illustrative preview</span></div>
    <div className="workflow-visual-canvas">
      {(variant === "mobile" || variant === "consent") && <div className={`workflow-device ${compact ? "" : "max-w-[360px]"}`}>
        <div className="flex items-center justify-between border-b border-[#002d0e]/10 pb-4"><img src="/assets/logo.svg" alt="" className="h-6 w-auto" /><Bell size={19} className="text-[#52705b]" aria-hidden="true" /></div>
        {variant === "mobile" ? <>
          <div className="my-5 flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#edf5e7]"><UserRound size={23} /></span><div><p className="text-sm font-medium">Your identity profile</p><p className="mt-1 text-meta text-[#617065]">Requests, proofs & activity</p></div></div>
          <div className="rounded-2xl bg-[#002d0e] p-5 text-white"><div className="flex justify-between gap-3"><span className="text-sm">Identity proof</span><Fingerprint size={28} className="text-[#c7e6b5]" /></div><p className="mt-4 text-body font-medium">Approved claims.<br />Ready for your next request.</p><div className="mt-5"><Status>Example proof</Status></div></div>
          <div className="mt-5 rounded-xl border border-[#002d0e]/15 p-4"><div className="flex items-center gap-2 text-meta text-[#617065]"><Clock3 size={16} />New request · Due in 7 days</div><p className="mt-3 text-body font-medium">{purpose}</p><p className="mt-1 text-sm text-[#617065]">{organization}</p><div className="mt-4 flex items-center justify-between text-sm font-medium text-[#007d21]"><span>Review requested information</span><ArrowRight size={18} /></div></div>
          {!compact && <div className="mt-6 flex justify-between gap-3 border-t border-[#002d0e]/10 pt-4 text-meta text-[#617065]"><span>Home</span><span>Requests</span><span>Proof wallet</span></div>}
        </> : <>
          <div className="my-5"><p className="text-meta text-[#617065]">{organization} requests</p><p className="mt-2 text-card-title font-medium">{purpose}</p></div>
          <div className="flex items-center gap-2 border-y border-[#002d0e]/10 py-3 text-meta text-[#617065]"><Clock3 size={16} className="shrink-0" />Reply by the request deadline</div>
          <p className="mt-5 text-sm font-medium">Requested claims</p>
          <div className="mt-2 divide-y divide-[#002d0e]/10">{visibleClaims.map(claim => <div key={claim} className="flex items-center gap-3 py-3"><span className="grid size-5 shrink-0 place-items-center rounded bg-[#007d21] text-white"><Check size={14} /></span><span className="text-sm">{claim}</span></div>)}</div>
          <div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm font-medium"><span className="rounded-full border border-[#002d0e]/20 px-3 py-2.5">Decline</span><span className="rounded-full bg-[#002d0e] px-3 py-2.5 text-white">Approve selected</span></div>
          {!compact && <p className="mt-4 text-meta text-[#617065]">The purpose and selected claims stay in your sharing history.</p>}
        </>}
      </div>}

      {variant === "review" && <div className="workflow-workspace">
        <div className="flex items-start justify-between gap-3 border-b border-[#002d0e]/10 pb-5"><div><p className="text-meta text-[#617065]">Ontiver / Requests</p><p className="mt-2 text-card-title font-medium">{heading}</p></div><ListChecks size={25} className="shrink-0 text-[#007d21]" /></div>
        <div className={`mt-5 grid gap-5 ${compact ? "" : "xl:grid-cols-[1fr_.8fr]"}`}>
          <div><div className="flex items-center justify-between gap-2 text-sm"><span className="font-medium">{purpose}</span><Status pending>In review</Status></div><div className="mt-4 divide-y divide-[#002d0e]/10">{visibleClaims.map((claim, index) => <div key={claim} className="flex items-start gap-3 py-3.5"><FileCheck2 size={20} className="mt-0.5 shrink-0 text-[#007d21]" /><div className="min-w-0"><p className="text-sm font-medium">{claim}</p><p className="mt-1 text-meta text-[#617065]">{index === visibleClaims.length - 1 ? "Source response · Review required" : "Source response · Available"}</p></div></div>)}</div></div>
          {!compact && <div className="rounded-xl bg-[#f4f6f1] p-5"><p className="text-sm font-medium">Case activity</p><ol className="mt-4 space-y-4 text-meta text-[#617065]">{["Request sent", "Consent recorded", "Evidence submitted", "Checks returned"].map(item => <li key={item} className="flex items-center gap-2"><CircleCheck size={16} className="shrink-0 text-[#007d21]" />{item}</li>)}</ol><div className="mt-6 border-t border-[#002d0e]/10 pt-4"><p className="text-sm font-medium">The reviewer decides</p><p className="mt-2 text-meta text-[#617065]">Approve, reject, request information or escalate.</p></div></div>}
        </div><div className="mt-5 flex items-center gap-2 border-t border-[#002d0e]/10 pt-4 text-meta text-[#617065]"><ShieldCheck size={17} className="shrink-0" />Evidence, consent and decision history together</div>
      </div>}

      {variant === "proof" && <div className="workflow-workspace max-w-[460px]">
        <div className="flex justify-between gap-3"><div><p className="text-meta text-[#617065]">Ontiver proof wallet</p><p className="mt-3 text-card-title font-medium">{heading}</p></div><BadgeCheck size={40} className="shrink-0 text-[#007d21]" strokeWidth={1.3} /></div>
        <div className="mt-6 rounded-2xl bg-[#002d0e] p-5 text-white"><p className="text-meta text-[#c7e6b5]">Selected approved claims</p><div className="mt-3 space-y-3">{visibleClaims.map(claim => <p key={claim} className="flex items-center gap-3 text-sm"><Check size={17} className="shrink-0 text-[#c7e6b5]" />{claim}</p>)}</div></div>
        <div className="my-5 grid grid-cols-2 gap-4 text-meta"><div><p className="text-[#617065]">Validity</p><p className="mt-1 font-medium">Checked before reuse</p></div><div><p className="text-[#617065]">Sharing</p><p className="mt-1 font-medium">Your approval</p></div></div>
        <div className="flex items-center gap-2 border-t border-[#002d0e]/10 pt-4 text-meta text-[#617065]"><KeyRound size={17} className="shrink-0" />Expiry & revocation remain part of the proof</div>
      </div>}

      {variant === "workflow" && <div className="workflow-workspace">
        <div className="flex items-start justify-between gap-4"><div><p className="text-card-title font-medium">{heading}</p><p className="mt-2 text-meta text-[#617065]">{steps.length} connected stages · Configured for your process</p></div><Layers3 size={26} className="shrink-0 text-[#007d21]" /></div>
        <ol className={`mt-5 grid gap-x-5 ${compact ? "" : "sm:grid-cols-2"}`}>{displaySteps.map((step, index) => <li key={`${step.title}-${index}`} className={`flex items-center gap-3 border-b border-[#002d0e]/10 py-3 ${activeStep === index ? "text-[#007d21]" : ""}`}><span className={`grid size-8 shrink-0 place-items-center rounded-full text-meta ${activeStep === index ? "bg-[#007d21] text-white" : "bg-[#edf5e7]"}`}>{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium">{step.title}</span></li>)}</ol>
        {compact && steps.length > 4 && <p className="mt-4 text-meta text-[#617065]">+ {steps.length - 4} stages through review and follow-up</p>}
        {!compact && <div className="mt-5 rounded-xl bg-[#edf5e7] p-4"><p className="text-meta font-medium">Relevant evidence</p><p className="mt-2 text-sm text-[#526058]">{visibleClaims.join(" · ")}</p></div>}
      </div>}

      {(variant === "sources" || variant === "checks" || variant === "intelligence") && <div className="workflow-workspace max-w-[520px]">
        <div className="flex items-start justify-between gap-4"><p className="text-card-title font-medium">{heading}</p>{variant === "sources" ? <Fingerprint size={33} className="shrink-0 text-[#007d21]" /> : variant === "checks" ? <ScanFace size={33} className="shrink-0 text-[#007d21]" /> : <FileText size={33} className="shrink-0 text-[#007d21]" />}</div>
        <div className="mt-5 space-y-3">{(claims ?? (variant === "sources" ? ["NIN / BVN where appropriate", "Documents & biometrics", "Institutions & referees"] : variant === "checks" ? ["Identity & source match", "Document & face checks", "Certificate & reference checks"] : ["Name differs between records", "Possible duplicate submission", "Evidence needs clarification"])).slice(0, compact ? 3 : 4).map((claim, index) => <div key={claim} className="flex items-center gap-3 rounded-xl border border-[#002d0e]/10 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#edf5e7] text-meta">0{index + 1}</span><p className="text-sm font-medium">{claim}</p></div>)}</div>
        <div className="my-4 flex justify-center text-[#76977d]"><ArrowDown size={22} /></div><div className="rounded-xl bg-[#002d0e] p-4 text-center text-sm text-white">{variant === "sources" ? "Approved sources → Selected checks" : variant === "checks" ? "Normalized results → Enterprise review" : "Signal + reason → Human review"}</div>
        {!compact && <p className="mt-4 text-meta text-[#617065]">{variant === "intelligence" ? "A flag is a reason to review, not a finding of fraud." : "Checks and source availability are agreed for each workflow."}</p>}
      </div>}

      {variant === "history" && <div className="workflow-workspace max-w-[500px]">
        <div className="flex items-center justify-between gap-4"><p className="text-card-title font-medium">{heading}</p><Clock3 size={27} className="shrink-0 text-[#007d21]" /></div>
        <div className="mt-5 divide-y divide-[#002d0e]/10">{[{ name: "Example employer", purpose: "Candidate screening", status: "Selected claims shared" }, { name: "Example lender", purpose: "Borrower onboarding", status: "Awaiting your choice" }, { name: "Example marketplace", purpose: "Seller onboarding", status: "Access expired" }].slice(0, compact ? 2 : 3).map((item, index) => <div key={item.name} className="py-4"><div className="flex items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#edf5e7]"><LockKeyhole size={17} /></span><div><p className="text-sm font-medium">{item.name}</p><p className="mt-1 text-meta text-[#617065]">{item.purpose}</p></div></div><div className="mt-3"><Status pending={index === 1}>{item.status}</Status></div></div>)}</div>
        <p className="mt-4 text-meta text-[#617065]">Who received what, why, when and until when.</p>
      </div>}

      {variant === "developers" && <div className="workflow-workspace">
        <p className="text-card-title font-medium">{heading}</p><div className="mt-5 rounded-2xl bg-[#002d0e] p-5 text-white"><p className="text-meta text-[#c7e6b5]">Integration sequence</p><ol className="mt-4 space-y-4 text-sm">{["Create a purpose-based request", "User completes the consent flow", "Receive a signed status webhook", "Review results and audit events"].map((step, index) => <li key={step} className="flex gap-3"><span className="text-[#9fca89]">0{index + 1}</span>{step}</li>)}</ol></div><div className="mt-5 flex flex-wrap gap-2">{["API keys", "Sandbox", "Event logs"].map(item => <span key={item} className="rounded-full bg-[#edf5e7] px-3 py-2 text-meta">{item}</span>)}</div><p className="mt-4 text-meta text-[#617065]">Agree integration access and event contracts for your pilot.</p>
      </div>}
    </div>
    <figcaption className="workflow-visual-caption"><Smartphone size={15} className="shrink-0" aria-hidden="true" />{compact ? "Ontiver workflow concept" : "Product concept · Example information, not a live customer record"}</figcaption>
  </figure>;
}
