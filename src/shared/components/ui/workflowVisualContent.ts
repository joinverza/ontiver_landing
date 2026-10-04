import { imagery, type EditorialImage } from "../../data/imagery";
import { editorialPhotos } from "../../data/editorialPhotos";

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

type VisualContent = {
  title: string;
  label: string;
  description: string;
  image: EditorialImage;
  items: string[];
};

export const workflowVisualContent: Record<WorkflowVisualVariant, VisualContent> = {
  mobile: {
    title: "Your identity, ready for the next step.",
    label: "Your everyday identity",
    description: "Understand the request before choosing what to share.",
    image: imagery.everydayPhone,
    items: ["Know the purpose", "Choose the claims", "Review your sharing history"],
  },
  consent: {
    title: "You choose what to share.",
    label: "Purpose and permission",
    description: "Each request has a purpose. Each share starts with your approval.",
    image: editorialPhotos.consent,
    items: ["Who is asking", "Why it is needed", "How long access lasts"],
  },
  review: {
    title: "Evidence for a human decision.",
    label: "Authorized review",
    description: "Connect the relevant evidence, consent, and context for your reviewer.",
    image: imagery.candidateReview,
    items: ["Source results", "Consent scope", "Decision record"],
  },
  proof: {
    title: "Carry your approved claims.",
    label: "Reusable identity proof",
    description: "Reuse an approved claim when a new request has your consent.",
    image: editorialPhotos.proof,
    items: ["Proof status", "Sources", "Expiry and revocation"],
  },
  workflow: {
    title: "One connected workflow.",
    label: "From request to review",
    description: "Shape the checks and review steps around your operational process.",
    image: editorialPhotos.workflow,
    items: ["Request and consent", "Evidence and checks", "Review and approved reuse"],
  },
  sources: {
    title: "Start with the right evidence.",
    label: "Connected sources",
    description: "Choose the sources this request needs, with access scoped to the purpose.",
    image: editorialPhotos.identitySources,
    items: ["NIN / BVN where appropriate", "Phone", "Documents", "Institutions and referees"],
  },
  checks: {
    title: "Selected checks. Clear results.",
    label: "Verification in context",
    description: "Bring selected checks into a normalized result for enterprise review.",
    image: editorialPhotos.verification,
    items: ["Identity and source match", "Document checks", "Credential confirmation"],
  },
  intelligence: {
    title: "A signal. A reason. A review.",
    label: "Explainable context",
    description: "Give reviewers reasons to investigate, with people responsible for decisions.",
    image: editorialPhotos.intelligence,
    items: ["Cross-source consistency", "Possible duplicates", "Evidence needing clarification"],
  },
  history: {
    title: "Every share has a record.",
    label: "Your sharing history",
    description: "See who received which claims, for what purpose, and until when.",
    image: editorialPhotos.sharingHistory,
    items: ["Request received", "Purpose reviewed", "Claims approved", "Access expires"],
  },
  developers: {
    title: "Connect your onboarding flow.",
    label: "Built around your product",
    description: "Agree API access, sandbox scope, and event contracts for your pilot.",
    image: imagery.developer,
    items: ["Create request", "Collect consent", "Receive status", "Review evidence"],
  },
};
