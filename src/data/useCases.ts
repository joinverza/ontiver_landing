import type { Direction } from "../components/ui/DirectionAwareHover";

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
  stats: Array<{
    value: number;
    display: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
  challenge: {
    label: string;
    heading: string;
    body: string;
    visualTitle: string;
  };
  workflow: Array<{ title: string; description: string }>;
  capabilities: Array<{ title: string; description: string }>;
  quote: {
    text: string;
    attribution: string;
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

export const breathingDepthConfigs = [
  { rotateX: 2.2, rotateY: -1.4, duration: 5.5 },
  { rotateX: -1.8, rotateY: 1.2, duration: 6.2 },
  { rotateX: 1.5, rotateY: 2.0, duration: 4.8 },
  { rotateX: -2.4, rotateY: -1.1, duration: 7.0 },
  { rotateX: 1.9, rotateY: 1.6, duration: 5.2 },
  { rotateX: -1.3, rotateY: -2.2, duration: 6.7 },
];

export const useCaseCards: UseCaseCard[] = [
  {
    id: "fintechs",
    title: "Fintechs",
    description: "Reduce KYC friction during onboarding.",
    imageUrl: "/assets/use-cases/fintechs.svg",
    className:
      "col-[1/3] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "fintech",
  },
  {
    id: "digital-lenders",
    title: "Digital Lenders",
    description: "Verify borrowers before approval.",
    imageUrl: "/assets/use-cases/lenders.svg",
    className:
      "col-[3/5] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "lenders",
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Build trust across buyers, sellers, and vendors.",
    imageUrl: "/assets/use-cases/marketplaces.svg",
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
    imageUrl: "/assets/use-cases/hr-platforms.svg",
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
    imageUrl: "/assets/use-cases/schools.svg",
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
    imageUrl: "/assets/21.svg",
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
      "Run document, biometric, watchlist, and risk checks through one controlled workflow.",
  },
  {
    title: "Reuse only with permission",
    description:
      "Let returning users approve reuse without repeating the same verification friction.",
  },
  {
    title: "Report every decision",
    description:
      "Keep teams audit-ready with immutable logs, exports, and operational dashboards.",
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
      "Every share, reuse, revocation, and exception is stored as evidence.",
  },
  {
    title: "Risk orchestration",
    description:
      "Combine KYC, AML, sanctions, and custom checks without scattered vendors.",
  },
  {
    title: "Audit dashboards",
    description:
      "Turn verification activity into reports compliance and operations can trust.",
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
    imageUrl: "/assets/use-cases/fintechs.svg",
    stats: [
      { value: 3, display: "3x", label: "faster KYC", suffix: "x" },
      { value: 98, display: "98%", label: "pass rate visibility", suffix: "%" },
      { value: 0, display: "0", label: "repeat re-verifications" },
      { value: 24, display: "24/7", label: "audit access", suffix: "/7" },
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
    quote: {
      text: "Reusable identity changed verification from a blocker into a trust layer we can build around.",
      attribution: "Product Lead, African Fintech Network",
    },
    outcomes: [
      "Reduce repeat KYC friction across returning users.",
      "Keep compliance evidence tied to each consent event.",
      "Launch new financial journeys without rebuilding identity checks.",
    ],
    cta: "Ready to eliminate re-verification costs?",
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
    imageUrl: "/assets/use-cases/lenders.svg",
    stats: [
      { value: 60, display: "60%", label: "less manual review", suffix: "%" },
      { value: 4, display: "4", label: "checks in one flow" },
      { value: 2, display: "2min", label: "median verification", suffix: "min" },
      { value: 100, display: "100%", label: "consent history", suffix: "%" },
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
    quote: {
      text: "The strongest improvement was not just speed. It was knowing why every borrower passed or failed.",
      attribution: "Risk Operations Manager, Digital Credit Platform",
    },
    outcomes: [
      "Combine verification, consent, and AML evidence in one borrower record.",
      "Reduce manual review with clearer pass/fail signals.",
      "Reuse verified identity for repeat loans with permission.",
    ],
    cta: "Ready to verify borrowers without slowing approvals?",
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
    imageUrl: "/assets/use-cases/marketplaces.svg",
    stats: [
      { value: 2, display: "2-sided", label: "trust coverage", suffix: "-sided" },
      { value: 40, display: "40%", label: "fewer disputes", suffix: "%" },
      { value: 1, display: "1", label: "reusable trust profile" },
      { value: 100, display: "100%", label: "permission-led sharing", suffix: "%" },
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
    quote: {
      text: "We could finally separate high-trust users from risky activity without punishing everyone with the same friction.",
      attribution: "Marketplace Operations Lead",
    },
    outcomes: [
      "Verify vendors, buyers, and operators with the same trust framework.",
      "Reuse approved records across repeat transactions.",
      "Give operations teams cleaner dispute and compliance evidence.",
    ],
    cta: "Ready to make marketplace trust reusable?",
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
    imageUrl: "/assets/use-cases/hr-platforms.svg",
    stats: [
      { value: 48, display: "48hr", label: "faster onboarding", suffix: "hr" },
      { value: 1, display: "1", label: "verified worker profile" },
      { value: 75, display: "75%", label: "less repeated data entry", suffix: "%" },
      { value: 100, display: "100%", label: "consent trail", suffix: "%" },
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
    quote: {
      text: "Ontiver made verified worker data portable without taking control away from the person.",
      attribution: "People Operations Director",
    },
    outcomes: [
      "Cut duplicated identity checks across hiring journeys.",
      "Give workers control over verification reuse.",
      "Keep onboarding evidence ready for internal and external review.",
    ],
    cta: "Ready to hire verified workers in hours, not days?",
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
    imageUrl: "/assets/use-cases/schools.svg",
    stats: [
      { value: 1, display: "1", label: "student trust record" },
      { value: 80, display: "80%", label: "less duplicate collection", suffix: "%" },
      { value: 3, display: "3", label: "credential workflows" },
      { value: 100, display: "100%", label: "auditable consent", suffix: "%" },
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
    quote: {
      text: "The identity record became part of the student journey, not another form they had to fight through.",
      attribution: "Registrar, Digital Learning Institution",
    },
    outcomes: [
      "Verify students and credential holders once.",
      "Reuse identity proof for exams, records, and certificates with consent.",
      "Maintain defensible logs for academic and operational review.",
    ],
    cta: "Ready to make student identity reusable?",
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
    imageUrl: "/assets/teams.png",
    stats: [
      { value: 100, display: "100%", label: "event traceability", suffix: "%" },
      { value: 5, display: "5", label: "export-ready reports" },
      { value: 0, display: "0", label: "orphaned consent events" },
      { value: 24, display: "24/7", label: "review access", suffix: "/7" },
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
    quote: {
      text: "The audit conversation changed because every identity decision had context, consent, and a timeline.",
      attribution: "Head of Compliance, Regulated Platform",
    },
    outcomes: [
      "Centralize consent, verification, and risk evidence.",
      "Export cleaner reports for internal and regulatory review.",
      "Keep policy controls connected to real customer events.",
    ],
    cta: "Ready to make compliance evidence easier to trust?",
  },
};
