import type { Direction } from "../components/ui/DirectionAwareHover";
import { imagery } from "./imagery";

export type UseCaseCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
  contentClassName?: string;
  cardClassName?: string;
  lineClassName: string;
  idle:
    | "fintech"
    | "lenders"
    | "marketplaces"
    | "platforms"
    | "schools"
    | "teams";
};

export type UseCasePageDetail = {
  id: string;
  eyebrow: string;
  accent: string;
  heroTitle: string;
  tagline: string;
  headline: string;
  intro: string;
  imageUrl: string;
  evaluationMeasures: Array<{
    label: string;
    description: string;
  }>;
  challenge: {
    label: string;
    heading: string;
    body: string;
    visualTitle: string;
  };
  workflow: Array<{ title: string; description: string }>;
  capabilities: Array<{ title: string; description: string }>;
  pilotFocus: {
    title: string;
    description: string;
  };
  outcomes: string[];
  cta: string;
};

export const directionOffsets: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -20 },
  right: { x: 20, y: 0 },
  bottom: { x: 0, y: 20 },
  left: { x: -20, y: 0 },
};

export const useCaseCards: UseCaseCard[] = [
  {
    id: "fintechs",
    title: "Fintechs",
    description: "Reduce KYC friction during onboarding.",
    imageUrl: imagery.individualHero.src,
    className:
      "col-[1/3] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "fintech",
  },
  {
    id: "digital-lenders",
    title: "Digital Lenders",
    description: "Verify borrowers before approval.",
    imageUrl: imagery.finance.src,
    className:
      "col-[3/5] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "lenders",
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Build trust across buyers, sellers, and vendors.",
    imageUrl: imagery.marketplace.src,
    className:
      "col-[5/7] row-[1/5] max-[1024px]:col-auto max-[1024px]:row-span-2 max-[640px]:row-auto",
    cardClassName: "min-h-[568px] max-[1024px]:min-h-[360px] max-[640px]:min-h-[210px]",
    contentClassName:
      "top-12 bottom-auto max-[640px]:top-auto max-[640px]:bottom-[30px]",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "marketplaces",
  },
  {
    id: "hr-platforms",
    title: "HR Platforms",
    description: "Verify candidates before onboarding.",
    imageUrl: imagery.work.src,
    className:
      "col-[1/5] row-[3/5] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "platforms",
  },
  {
    id: "schools",
    title: "Schools",
    description: "Verify students, applicants, and credential holders.",
    imageUrl: imagery.education.src,
    className:
      "col-[1/4] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "schools",
  },
  {
    id: "compliance-teams",
    title: "Compliance Teams",
    description: "Build a defensible verification workflow.",
    imageUrl: imagery.teamwork.src,
    className:
      "col-[4/7] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "teams",
  },
];

const pageWorkflow = [
  {
    title: "Capture the consent event",
    description:
      "Ask once, explain clearly, and attach a consent trail to every reusable identity record.",
  },
  {
    title: "Verify the identity packet",
    description:
      "Start with the identity checks agreed for the pilot. Confirm additional document, biometric, or screening coverage before including it.",
  },
  {
    title: "Reuse only with permission",
    description:
      "Let returning users approve reuse without repeating the same verification friction.",
  },
  {
    title: "Report every decision",
    description:
      "Review verification outcomes, consent events, and manual-review handoffs together. Agree evidence and export requirements for the pilot.",
  },
];

const pageCapabilities = [
  {
    title: "Reusable credentials",
    description:
      "Verified identity proofs can move across repeat journeys with explicit approval.",
  },
  {
    title: "Consent ledger",
    description:
      "Keep sharing and reuse decisions connected to the user's permission history.",
  },
  {
    title: "Risk orchestration",
    description:
      "Scope identity checks and review rules together, with additional screening subject to agreed provider coverage.",
  },
  {
    title: "Audit dashboards",
    description:
      "Review verification activity and define the reporting evidence your team needs to evaluate.",
  },
];

export const useCasePageDetails: Record<string, UseCasePageDetail> = {
  fintechs: {
    id: "fintechs",
    eyebrow: "Fintech",
    accent: "#22C55E",
    heroTitle: "Fintechs",
    tagline:
      "Reduce KYC friction and reuse verified trust across every return visit.",
    headline: "KYC should not restart every time a customer comes back.",
    intro:
      "Ontiver helps financial products verify once, store trusted proof, and reuse identity records only when the user consents.",
    imageUrl: imagery.individualHero.src,
    evaluationMeasures: [
      { label: "Verification turnaround", description: "Time from submission to a completed check." },
      { label: "Completion rate", description: "Completed and failed checks within the agreed pilot scope." },
      { label: "Repeat verification", description: "Returning journeys that still require another check." },
      { label: "Consent decisions", description: "Approved and declined requests to reuse identity proof." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Fintech teams lose users when verification feels like a wall.",
      body:
        "Customers expect bank-grade safety without starting from zero at every transfer, wallet, account upgrade, or lending flow. The harder it is to prove trust, the more teams lose good users to avoidable friction.",
      visualTitle: "Verification drop-off map",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Start with one onboarding journey.",
      description: "Agree a verification workflow, capture a baseline, and evaluate completion, turnaround, and consent before extending reuse across more journeys.",
    },
    outcomes: [
      "Reduce repeat KYC friction across returning users.",
      "Keep compliance evidence tied to each consent event.",
      "Launch new financial journeys without rebuilding identity checks.",
    ],
    cta: "Explore a focused fintech verification pilot.",
  },
  "digital-lenders": {
    id: "digital-lenders",
    eyebrow: "Digital Lending",
    accent: "#16A34A",
    heroTitle: "Digital Lenders",
    tagline:
      "Verify borrowers faster, control fraud exposure, and keep approval evidence clean.",
    headline: "Borrower checks need speed and defensible risk evidence.",
    intro:
      "Ontiver gives lending teams a consent-led identity layer for onboarding, repeat borrowing, and risk review.",
    imageUrl: imagery.finance.src,
    evaluationMeasures: [
      { label: "Manual-review rate", description: "Borrower checks that require a reviewer decision." },
      { label: "Verification volume", description: "Completed checks during the agreed pilot period." },
      { label: "Decision turnaround", description: "Time between a verification request and its outcome." },
      { label: "Consent coverage", description: "Reuse decisions with a recorded permission event." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Fast approvals can become risky when identity signals are scattered.",
      body:
        "Lenders need to move quickly without approving weak borrower profiles. When checks live in separate systems, risk teams lose the full picture and customers repeat the same steps.",
      visualTitle: "Borrower risk signal board",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Evaluate borrower checks before extending the flow.",
      description: "Scope a borrower-verification pilot around agreed identity checks, review handoffs, and outcome evidence. Compare turnaround and review rates with the starting baseline.",
    },
    outcomes: [
      "Combine verification, consent, and AML evidence in one borrower record.",
      "Reduce manual review with clearer pass/fail signals.",
      "Reuse verified identity for repeat loans with permission.",
    ],
    cta: "Scope a borrower-verification pilot with our team.",
  },
  marketplaces: {
    id: "marketplaces",
    eyebrow: "Marketplace",
    accent: "#0D9488",
    heroTitle: "Marketplaces",
    tagline:
      "Build trust between buyers, sellers, vendors, and operators before value moves.",
    headline: "Marketplaces need trust signals before transactions scale.",
    intro:
      "Ontiver helps marketplaces verify the people and businesses behind listings, payments, and high-trust interactions.",
    imageUrl: imagery.marketplace.src,
    evaluationMeasures: [
      { label: "Seller verification", description: "Completed identity checks in the chosen seller journey." },
      { label: "Review handoffs", description: "Requests that need an operations-team decision." },
      { label: "Time to integrate", description: "Time from test credentials to a successful verification." },
      { label: "Disclosure decisions", description: "Approved and declined proof-sharing requests." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Every marketplace grows faster than its trust operations.",
      body:
        "As more buyers and vendors join, trust teams need a way to verify participants without making every transaction feel heavy. Reusable proof keeps safety visible without slowing the marketplace.",
      visualTitle: "Seller trust investigation",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Begin with a defined seller-verification flow.",
      description: "Choose a participant group and an identity-check workflow. Evaluate completed checks, operational handoffs, and consent before expanding to more marketplace journeys.",
    },
    outcomes: [
      "Verify vendors, buyers, and operators with the same trust framework.",
      "Reuse approved records across repeat transactions.",
      "Give operations teams cleaner dispute and compliance evidence.",
    ],
    cta: "Discuss a marketplace identity pilot.",
  },
  "hr-platforms": {
    id: "hr-platforms",
    eyebrow: "HR Platform",
    accent: "#22C55E",
    heroTitle: "HR Platforms",
    tagline:
      "Verify candidates, workers, and contractors before onboarding bottlenecks appear.",
    headline: "Hiring should move quickly without weakening identity checks.",
    intro:
      "Ontiver supports worker verification, credential reuse, and audit-ready onboarding for modern HR teams.",
    imageUrl: imagery.work.src,
    evaluationMeasures: [
      { label: "Onboarding turnaround", description: "Time spent in the agreed worker-verification step." },
      { label: "Completed checks", description: "Candidate and worker verification outcomes." },
      { label: "Repeat requests", description: "Identity information requested again in repeat journeys." },
      { label: "Consent decisions", description: "Worker approval and denial of proof-sharing requests." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Worker onboarding breaks when identity evidence is rebuilt every time.",
      body:
        "Candidates, contractors, and internal teams repeat checks across roles, vendors, and regions. HR platforms need reusable records that still preserve user consent and compliance control.",
      visualTitle: "Workforce verification lane",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Focus on the identity step in onboarding.",
      description: "Evaluate candidate or worker verification within one hiring workflow. Define the permissions, review steps, and baseline measurements with the team before starting.",
    },
    outcomes: [
      "Cut duplicated identity checks across hiring journeys.",
      "Give workers control over verification reuse.",
      "Keep onboarding evidence ready for internal and external review.",
    ],
    cta: "Explore a candidate-verification pilot.",
  },
  schools: {
    id: "schools",
    eyebrow: "Education",
    accent: "#4ADE80",
    heroTitle: "Schools",
    tagline:
      "Verify applicants, students, and credential holders with records they can reuse.",
    headline: "Education workflows need identity proof that can follow the student.",
    intro:
      "Ontiver helps schools and credential platforms verify identities once and attach consent to every future reuse.",
    imageUrl: imagery.education.src,
    evaluationMeasures: [
      { label: "Completed checks", description: "Applicant identity checks within an agreed workflow." },
      { label: "Repeat collection", description: "Information requested again across supported journeys." },
      { label: "Review turnaround", description: "Time needed to resolve a verification request." },
      { label: "Consent coverage", description: "Proof-sharing decisions with a permission record." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Students keep proving the same identity to disconnected systems.",
      body:
        "Admissions, exams, certificates, and alumni services often ask for the same proof again and again. A reusable consent-led record keeps education workflows lighter and more trustworthy.",
      visualTitle: "Student credential proof",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Explore one student-verification journey.",
      description: "Discuss a scoped admissions or credential-holder workflow and confirm the supported identity checks. Define evidence and consent requirements before considering broader education use.",
    },
    outcomes: [
      "Verify students and credential holders once.",
      "Reuse identity proof for exams, records, and certificates with consent.",
      "Maintain defensible logs for academic and operational review.",
    ],
    cta: "Discuss an education verification workflow.",
  },
  "compliance-teams": {
    id: "compliance-teams",
    eyebrow: "Compliance",
    accent: "#15803D",
    heroTitle: "Compliance Teams",
    tagline:
      "Give compliance teams a living evidence layer for consent, verification, and reuse.",
    headline: "Compliance teams need evidence that survives product growth.",
    intro:
      "Ontiver turns identity events into a clear operational record for audits, reviews, and policy controls.",
    imageUrl: imagery.teamwork.src,
    evaluationMeasures: [
      { label: "Event traceability", description: "Sampled decisions with an associated event record." },
      { label: "Report completeness", description: "Evidence available against the agreed reporting scope." },
      { label: "Consent linkage", description: "Reuse decisions connected to recorded permission." },
      { label: "Review turnaround", description: "Time spent investigating an identity decision." },
    ],
    challenge: {
      label: "The Challenge",
      heading: "Identity controls become fragile when evidence is spread across tools.",
      body:
        "Compliance teams need to prove what happened, why it happened, who consented, and what was reused. Ontiver keeps those signals together as workflows scale.",
      visualTitle: "Compliance evidence vault",
    },
    workflow: pageWorkflow,
    capabilities: pageCapabilities,
    pilotFocus: {
      title: "Define the evidence your reviewers need.",
      description: "Agree a limited set of verification and consent events to evaluate. Review their traceability and reporting coverage before deciding on a broader compliance workflow.",
    },
    outcomes: [
      "Centralize consent, verification, and risk evidence.",
      "Export cleaner reports for internal and regulatory review.",
      "Keep policy controls connected to real customer events.",
    ],
    cta: "Scope an identity-evidence review with our team.",
  },
};
