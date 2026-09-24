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
      { title: "Local identity inputs", description: "Plan NIN, BVN, and other supported identity inputs." },
      { title: "Documents and biometrics", description: "Collect the documents or biometrics your workflow requires." },
      { title: "Institutional evidence", description: "Request certificates, licenses, and institutional confirmations." },
      { title: "References and context", description: "Invite authorized referees to confirm relevant claims." },
    ],
    workflow: [
      { title: "Define the purpose", description: "Choose the information the workflow needs." },
      { title: "Confirm source availability", description: "Check the relevant market and provider requirements." },
      { title: "Request consent and evidence", description: "Explain the request before collecting the required inputs." },
      { title: "Pass inputs to verification", description: "Connect the evidence to the selected checks." },
    ],
    boundary: "Source availability depends on provider access and market requirements.",
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
      { title: "Identity and documents", description: "Connect each check to its evidence and consent." },
      { title: "Face and liveness", description: "Add face or liveness checks where providers support them." },
      { title: "People and organizations", description: "Plan employment, reference, certificate, and business checks." },
      { title: "Consistent results", description: "Keep outcomes and exceptions in one reviewable record." },
    ],
    workflow: [
      { title: "Select the checks", description: "Match verification steps to the purpose of the request." },
      { title: "Run through supported sources", description: "Use the agreed services and approved providers." },
      { title: "Organize the outcomes", description: "Keep results and evidence connected to the request." },
      { title: "Review exceptions", description: "Give authorized teams the context for their decision." },
    ],
    boundary: "Checks vary by provider and market; your team makes the final decision.",
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
      { title: "Ordered steps", description: "Connect consent, evidence, checks, and review in sequence." },
      { title: "Conditions and retries", description: "Set the next step for incomplete or unsuccessful checks." },
      { title: "Human review", description: "Route exceptions and evidence to authorized reviewers." },
      { title: "Renewal and expiry", description: "Plan when proof expires or needs a fresh check." },
    ],
    workflow: [
      { title: "Configure the journey", description: "Set the steps, policies, and reviewer roles." },
      { title: "Invite the person", description: "Present the purpose and required information." },
      { title: "Run and review", description: "Follow the selected checks and review paths." },
      { title: "Record the outcome", description: "Connect the decision to its evidence and next steps." },
    ],
    boundary: "Your organization sets the policies and remains responsible for its decisions.",
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
      { title: "Document understanding", description: "Extract and organize information from submitted evidence." },
      { title: "Consistency signals", description: "Surface discrepancies across relevant inputs." },
      { title: "Tamper and duplicate signals", description: "Flag possible changes or duplicates for review." },
      { title: "Explainable indicators", description: "Connect each signal to its supporting evidence." },
    ],
    workflow: [
      { title: "Read the evidence", description: "Organize the relevant information from each input." },
      { title: "Compare details", description: "Look for consistency and possible duplication." },
      { title: "Surface the reasons", description: "Bring indicators and supporting context together." },
      { title: "Let reviewers decide", description: "Ask for more information or escalate when needed." },
    ],
    boundary: "Signals inform authorized review; they are not proof of fraud.",
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
      { title: "Purpose and scope", description: "Show who is asking, what they need, and why." },
      { title: "Approve or decline", description: "Let the person decide before proof is shared." },
      { title: "Sharing history", description: "Keep requests and approved sharing visible." },
      { title: "Retention and revocation", description: "Define access duration and relevant retention rules." },
    ],
    workflow: [
      { title: "Explain the request", description: "Show who is asking, what they need, and why." },
      { title: "Ask for a decision", description: "Let the person approve or decline the request." },
      { title: "Share within scope", description: "Limit sharing to the approved claims and purpose." },
      { title: "Keep the activity visible", description: "Record sharing and the relevant access controls." },
    ],
    boundary: "Revocation limits future access; retention and legal duties may still apply.",
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
      { title: "Approved claims", description: "Create proofs from verified and reviewed claims." },
      { title: "Proof validation", description: "Check proof status before relying on it." },
      { title: "Expiry and revocation", description: "Set validity periods and account for revocation." },
      { title: "Selective disclosure", description: "Share only the approved claims a request needs." },
    ],
    workflow: [
      { title: "Complete verification", description: "Run the required checks and review their outcomes." },
      { title: "Create the proof", description: "Package the approved claims and validity conditions." },
      { title: "Approve a new request", description: "Let the person decide what a supported business can access." },
      { title: "Validate before relying", description: "Check the proof's status and fit for the new purpose." },
    ],
    boundary: "Reuse depends on supported integrations, proof validity, and the receiving business's requirements.",
    relatedIds: ["consent-and-privacy", "workflow-engine"],
  },
];
