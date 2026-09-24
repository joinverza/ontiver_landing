import {
  BadgeCheck,
  Fingerprint,
  GitBranch,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type PlatformCapability = {
  title: string;
  description: string;
};

export type PlatformLayer = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  headline: string;
  overview: string;
  capabilities: PlatformCapability[];
  workflow: PlatformCapability[];
  boundary: string;
  relatedIds: string[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "identity-sources",
    title: "Identity sources",
    description: "Connect the evidence your verification journey needs.",
    icon: Fingerprint,
    headline: "Start with the right sources.",
    overview: "An identity journey can draw on documents, approved providers, institutions, and people who can confirm a claim. Ontiver brings these inputs into a defined verification workflow, with a clear purpose for each request.",
    capabilities: [
      { title: "Local identity inputs", description: "Plan NIN, BVN, phone, and other identity checks around the sources appropriate to your market and use case." },
      { title: "Documents and biometrics", description: "Include documents, face capture, or liveness inputs where the selected workflow requires them." },
      { title: "Institutional evidence", description: "Build requests around certificates, licenses, and confirmations from relevant institutions or employers." },
      { title: "References and context", description: "Invite referees and other authorized parties to confirm the claims needed for a review." },
    ],
    workflow: [
      { title: "Define the purpose", description: "Choose the information the workflow needs." },
      { title: "Confirm source availability", description: "Check the relevant market and provider requirements." },
      { title: "Request consent and evidence", description: "Explain the request before collecting the required inputs." },
      { title: "Pass inputs to verification", description: "Connect the evidence to the selected checks." },
    ],
    boundary: "NIN, BVN, document, biometric, and institutional workflows depend on provider access, market availability, and applicable requirements. Ontiver is not a government authority of record.",
    relatedIds: ["verification-engine", "consent-and-privacy"],
  },
  {
    id: "verification-engine",
    title: "Verification engine",
    description: "Bring selected checks into one consistent review flow.",
    icon: ScanSearch,
    headline: "Make evidence easier to review.",
    overview: "Different sources produce different results. Ontiver's verification layer is designed to organize selected identity, document, and business checks so teams can review their outcomes in the context of a single request.",
    capabilities: [
      { title: "Identity and documents", description: "Connect identity and document checks to the evidence and consent recorded for a request." },
      { title: "Face and liveness", description: "Include face matching or liveness checks where they are appropriate and supported by the selected provider." },
      { title: "People and organizations", description: "Shape workflows around employment, certificates, references, and business verification requirements." },
      { title: "Consistent results", description: "Bring provider outcomes, supporting evidence, and exceptions into a reviewable record." },
    ],
    workflow: [
      { title: "Select the checks", description: "Match verification steps to the purpose of the request." },
      { title: "Run through supported sources", description: "Use the agreed services and approved providers." },
      { title: "Organize the outcomes", description: "Keep results and evidence connected to the request." },
      { title: "Review exceptions", description: "Give authorized teams the context for their decision." },
    ],
    boundary: "Check availability and the evidence returned vary by provider, market, and workflow. A verification result supports a review; it does not replace the organization's decision or obligations.",
    relatedIds: ["identity-sources", "intelligence"],
  },
  {
    id: "workflow-engine",
    title: "Workflow engine",
    description: "Connect checks, consent, and review to your process.",
    icon: GitBranch,
    headline: "Give every check a next step.",
    overview: "Verification is one part of onboarding, hiring, access, or renewal. Ontiver's workflow layer connects the sequence around it: what to request, when to run checks, which exceptions need review, and how to record the outcome.",
    capabilities: [
      { title: "Ordered steps", description: "Define the journey from invitation and consent to evidence, checks, and review." },
      { title: "Conditions and retries", description: "Account for missing information, check outcomes, and the steps needed to continue a request." },
      { title: "Human review", description: "Route exceptions and approvals to authorized reviewers, with evidence and context together." },
      { title: "Renewal and expiry", description: "Include expiry, renewal, and reverification requirements in the process from the start." },
    ],
    workflow: [
      { title: "Configure the journey", description: "Set the steps, policies, and reviewer roles." },
      { title: "Invite the person", description: "Present the purpose and required information." },
      { title: "Run and review", description: "Follow the selected checks and review paths." },
      { title: "Record the outcome", description: "Connect the decision to its evidence and next steps." },
    ],
    boundary: "Each organization defines its own policies, authorized reviewers, and decision criteria. Ontiver connects the process and evidence; the organization remains responsible for its decisions.",
    relatedIds: ["verification-engine", "identity-proofs"],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description: "Turn evidence into signals your reviewers can explain.",
    icon: Sparkles,
    headline: "More context. Clearer review.",
    overview: "A mismatch needs context. Ontiver's intelligence layer is designed to surface consistency issues and risk indicators alongside the evidence behind them, helping reviewers ask better questions before deciding what happens next.",
    capabilities: [
      { title: "Document understanding", description: "Use OCR and extracted information to organize the contents of submitted evidence." },
      { title: "Consistency signals", description: "Compare relevant details across inputs and bring discrepancies into the review." },
      { title: "Tamper and duplicate signals", description: "Surface possible document changes or repeated information for further investigation." },
      { title: "Explainable indicators", description: "Keep signals connected to supporting evidence so teams can inspect their context." },
    ],
    workflow: [
      { title: "Read the evidence", description: "Organize the relevant information from each input." },
      { title: "Compare details", description: "Look for consistency and possible duplication." },
      { title: "Surface the reasons", description: "Bring indicators and supporting context together." },
      { title: "Let reviewers decide", description: "Ask for more information or escalate when needed." },
    ],
    boundary: "A mismatch, duplicate, or risk indicator is a reason to review, not proof of fraud. Decisions stay with authorized people and the organization's policies.",
    relatedIds: ["verification-engine", "workflow-engine"],
  },
  {
    id: "consent-and-privacy",
    title: "Consent and privacy",
    description: "Make the purpose, scope, and choice clear before sharing.",
    icon: ShieldCheck,
    headline: "Put people in the sharing decision.",
    overview: "People should understand who is requesting their information, why it is needed, and what will be shared. Ontiver's consent layer is designed around those choices, with purpose-based requests and a record of sharing activity.",
    capabilities: [
      { title: "Purpose and scope", description: "Explain the organization, reason, and specific information involved in a request." },
      { title: "Approve or decline", description: "Build a clear consent decision into proof sharing with supported businesses." },
      { title: "Sharing history", description: "Keep a record of requests and approved sharing so activity can be understood later." },
      { title: "Retention and revocation", description: "Plan access duration, revocation, and retention around the purpose and applicable requirements." },
    ],
    workflow: [
      { title: "Explain the request", description: "Show who is asking, what they need, and why." },
      { title: "Ask for a decision", description: "Let the person approve or decline the request." },
      { title: "Share within scope", description: "Limit sharing to the approved claims and purpose." },
      { title: "Keep the activity visible", description: "Record sharing and the relevant access controls." },
    ],
    boundary: "Revoking sharing controls future access under the supported workflow. Retention and any legal obligations are explained in the applicable privacy terms; revocation does not erase every record already lawfully processed.",
    relatedIds: ["identity-proofs", "workflow-engine"],
  },
  {
    id: "identity-proofs",
    title: "Identity proofs",
    description: "Make approved claims reusable on supported platforms.",
    icon: BadgeCheck,
    headline: "Carry proof, not repeated paperwork.",
    overview: "After successful verification and review, selected claims can form a reusable identity proof. Ontiver is designed to let a supported business confirm the relevant proof, with the person's approval, instead of restarting every part of the journey.",
    capabilities: [
      { title: "Approved claims", description: "Create proofs from the claims approved by the relevant verification and review process." },
      { title: "Proof validation", description: "Connect a proof to its verification status and the conditions for relying on it." },
      { title: "Expiry and revocation", description: "Include validity periods and revocation so reuse does not imply a claim remains valid forever." },
      { title: "Selective disclosure", description: "Share relevant approved claims for a specific request, with less repeated document exposure." },
    ],
    workflow: [
      { title: "Complete verification", description: "Run the required checks and review their outcomes." },
      { title: "Create the proof", description: "Package the approved claims and validity conditions." },
      { title: "Approve a new request", description: "Let the person decide what a supported business can access." },
      { title: "Validate before relying", description: "Check the proof's status and fit for the new purpose." },
    ],
    boundary: "Proof reuse depends on supported integrations, the receiving organization's requirements, and the proof's validity. It does not imply universal acceptance or replace every verification step.",
    relatedIds: ["consent-and-privacy", "workflow-engine"],
  },
];
