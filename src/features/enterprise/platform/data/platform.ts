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
  visualVariant: "sources" | "checks" | "workflow" | "intelligence" | "consent" | "proof";
  visualTitle: string;
  visualClaims: string[];
  capabilities: PlatformCapability[];
  workflow: PlatformCapability[];
  boundary: string;
  relatedIds: string[];
};

export const platformLayers: PlatformLayer[] = [
  {
    id: "identity-sources",
    title: "Identity sources",
    description:
      "Connect to trusted sources: NIN, BVN, phone, documents, biometrics, licenses, institutions, employers, referees.",
    icon: Fingerprint,
    headline: "Connect to the sources that matter.",
    overview: "The identity, contact, and institutional sources Ontiver can check against.",
    visualVariant: "sources",
    visualTitle: "Evidence for a verification request",
    visualClaims: ["NIN / BVN", "Phone", "Documents & licenses", "Employers & referees"],
    capabilities: [
      {
        title: "NIN/BVN",
        description: "Select NIN or BVN sources for the required identity checks.",
      },
      {
        title: "Phone",
        description: "Connect the phone information required by the request.",
      },
      {
        title: "Documents and biometrics",
        description: "Request the documents or biometric evidence needed for selected checks.",
      },
      {
        title: "Licenses and institutions",
        description: "Connect license and credential claims with the relevant issuing institution.",
      },
      {
        title: "Employers and referees",
        description: "Invite employers or referees to confirm requested claims.",
      },
    ],
    workflow: [
      {
        title: "Specify the sources",
        description: "A request specifies which sources are needed.",
      },
      {
        title: "Submit or authorize",
        description: "The user submits or authorizes access.",
      },
      {
        title: "Connect to the source",
        description: "Ontiver connects to the relevant source.",
      },
      {
        title: "Pass results to verification",
        description: "Results feed into the verification engine.",
      },
    ],
    boundary:
      "NIN/BVN are the initial focus. Additional sources are scoped by pilot, provider access, and market requirements.",
    relatedIds: [
      "verification-engine",
      "workflow-engine",
      "intelligence",
      "consent-and-privacy",
      "identity-proofs",
    ],
  },
  {
    id: "verification-engine",
    title: "Verification engine",
    description:
      "Run identity, document, face, liveness, certificate, employment, reference, and business checks — normalized into one result.",
    icon: ScanSearch,
    headline: "Run the checks. Get one normalized result.",
    overview: "Raw submitted evidence and source data into standardized, comparable results.",
    visualVariant: "checks",
    visualTitle: "Selected checks, connected results",
    visualClaims: ["Identity check", "Document check", "Face / liveness", "Reference confirmation"],
    capabilities: [
      {
        title: "Identity and document checks",
        description: "Check submitted identity and document evidence.",
      },
      {
        title: "Face and liveness",
        description: "Connect face and liveness checks to the request.",
      },
      {
        title: "Credentials and business checks",
        description: "Verify the credential or business claims required by the workflow.",
      },
      {
        title: "Normalized results",
        description: "Return standardized results for comparison and review.",
      },
    ],
    workflow: [
      {
        title: "Receive the evidence",
        description: "Evidence arrives from identity sources.",
      },
      {
        title: "Run selected checks",
        description: "Checks run through internal services and approved providers.",
      },
      {
        title: "Normalize the result",
        description: "Results are normalized into a single verification outcome.",
      },
    ],
    boundary:
      "Confirm the available checks during pilot scoping. Uncertain results need review; an upload alone does not establish authenticity.",
    relatedIds: [
      "identity-sources",
      "workflow-engine",
      "intelligence",
      "consent-and-privacy",
      "identity-proofs",
    ],
  },
  {
    id: "workflow-engine",
    title: "Workflow engine",
    description:
      "Connect checks to your business process: ordered steps, conditions, retries, approvals, manual review, expiry.",
    icon: GitBranch,
    headline: "Connect checks to how your business actually works.",
    overview: "Verification checks to your operational process — approvals, retries, expiry.",
    visualVariant: "workflow",
    visualTitle: "A configured onboarding workflow",
    visualClaims: ["Required checks", "Retry rules", "Reviewer approval", "Renewal date"],
    capabilities: [
      {
        title: "Templates and ordered steps",
        description: "Define templates with the required ordered checks.",
      },
      {
        title: "Conditions and retries",
        description: "Set conditions and retries for incomplete or ambiguous cases.",
      },
      {
        title: "Reviewer decisions",
        description: "Give authorized reviewers the evidence for their decisions.",
      },
      {
        title: "Expiry and renewal",
        description: "Track expiry and the steps required for renewal.",
      },
    ],
    workflow: [
      {
        title: "Define the template",
        description: "A workflow template defines the steps.",
      },
      {
        title: "Run the steps",
        description: "Each check runs in order or in parallel per your rules.",
      },
      {
        title: "Route exceptions",
        description: "Conditions route ambiguous cases to manual review.",
      },
      {
        title: "Record the decision",
        description: "The workflow completes with a decision.",
      },
    ],
    boundary: "Your organization sets the policies and remains responsible for its decisions.",
    relatedIds: [
      "identity-sources",
      "verification-engine",
      "intelligence",
      "consent-and-privacy",
      "identity-proofs",
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    description:
      "Explainable signals: OCR, tamper detection, cross-source consistency, duplicate detection, risk indicators.",
    icon: Sparkles,
    headline: "Signals you can actually explain.",
    overview: "Raw verification results to explainable risk and consistency signals.",
    visualVariant: "intelligence",
    visualTitle: "Signals for an authorized reviewer",
    visualClaims: ["OCR fields", "Name consistency", "Possible duplicate", "Document expiry"],
    capabilities: [
      {
        title: "Document OCR",
        description: "Extract relevant document information for analysis.",
      },
      {
        title: "Cross-source consistency",
        description: "Compare relevant fields across submitted evidence and sources.",
      },
      {
        title: "Duplicates and tamper signals",
        description: "Flag possible duplicates or tampering for review.",
      },
      {
        title: "Reasons and evidence",
        description: "Attach reasons and supporting evidence to each signal.",
      },
    ],
    workflow: [
      {
        title: "Analyze the evidence",
        description: "Verification results and documents are analyzed.",
      },
      {
        title: "Flag signals with reasons",
        description: "Inconsistencies, duplicates, or tamper signals are flagged with reasons.",
      },
      {
        title: "Give reviewers context",
        description:
          "Signals are attached to the case for reviewer context — never used to auto-decide alone.",
      },
    ],
    boundary:
      "Intelligence is a phased capability. Signals inform human review; a mismatch or duplicate is not proof of fraud.",
    relatedIds: [
      "identity-sources",
      "verification-engine",
      "workflow-engine",
      "consent-and-privacy",
      "identity-proofs",
    ],
  },
  {
    id: "consent-and-privacy",
    title: "Consent and privacy",
    description:
      "Control what's shared: purpose, scope, approval, decline, retention, revocation, sharing history.",
    icon: ShieldCheck,
    headline: "Nothing moves without approval.",
    overview: "Every request, evidence submission, and share to explicit user consent.",
    visualVariant: "consent",
    visualTitle: "Review a sharing request",
    visualClaims: ["Verified name", "Identity check status", "Proof validity"],
    capabilities: [
      {
        title: "Requester and purpose",
        description: "Explain who is requesting information and why.",
      },
      {
        title: "Selected claims",
        description: "Let users choose the claims they approve for sharing.",
      },
      {
        title: "Sharing history",
        description: "Record who received what, when, and for which purpose.",
      },
      {
        title: "Retention and revocation",
        description: "Connect access to retention rules and revocation controls.",
      },
    ],
    workflow: [
      {
        title: "State the purpose",
        description: "A request states its purpose.",
      },
      {
        title: "Ask for approval",
        description: "The user reviews and approves or declines.",
      },
      {
        title: "Share approved claims",
        description: "Only approved claims are shared.",
      },
      {
        title: "Record sharing history",
        description:
          "The event is logged to sharing history, with revocation available at any time.",
      },
    ],
    boundary: "Revocation limits future access; retention and legal duties may still apply.",
    relatedIds: [
      "identity-sources",
      "verification-engine",
      "workflow-engine",
      "intelligence",
      "identity-proofs",
    ],
  },
  {
    id: "identity-proofs",
    title: "Identity proofs",
    description:
      "Create reusable claims: proof creation, validation, expiration, revocation, selective disclosure.",
    icon: BadgeCheck,
    headline: "Verify once. Reuse where it's approved.",
    overview: "A completed, approved verification to a reusable, shareable proof.",
    visualVariant: "proof",
    visualTitle: "A reusable proof record",
    visualClaims: ["Identity confirmed", "Certificate checked", "Employment confirmed"],
    capabilities: [
      {
        title: "Proof creation",
        description: "Create a reusable proof containing approved claims.",
      },
      {
        title: "Dashboard/API validation",
        description: "Validate proof status through the dashboard or API.",
      },
      {
        title: "Expiry and revocation",
        description: "Check expiry and revocation before relying on a proof.",
      },
      {
        title: "Selective disclosure",
        description: "Share only the claims approved for the request.",
      },
    ],
    workflow: [
      {
        title: "Approve verification",
        description: "A verification is approved.",
      },
      {
        title: "Create the proof",
        description: "Ontiver creates a proof containing only the approved claims.",
      },
      {
        title: "Validate its status",
        description: "The proof can be validated by future requesters via dashboard or API.",
      },
      {
        title: "Approve each reuse",
        description: "The user approves or declines each reuse.",
      },
    ],
    boundary:
      "Reuse depends on supported integrations, proof validity, and the receiving business's requirements.",
    relatedIds: [
      "identity-sources",
      "verification-engine",
      "workflow-engine",
      "intelligence",
      "consent-and-privacy",
    ],
  },
];
