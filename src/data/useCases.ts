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
  headline: string;
  intro: string;
  imageUrl: string;
  stats: Array<{ value: string; label: string }>;
  workflow: Array<{ title: string; description: string }>;
  outcomes: string[];
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
    imageUrl: "./assets/fintech.png",
    className:
      "col-[1/3] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "fintech",
  },
  {
    id: "lenders",
    title: "Digital Lenders",
    description: "Verify borrowers before approval.",
    imageUrl: "./assets/lenders.png",
    className:
      "col-[3/5] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "lenders",
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Build trust across buyers, sellers, and vendors.",
    imageUrl: "./assets/marketplaces.png",
    className:
      "col-[5/7] row-[1/5] max-[1024px]:col-auto max-[1024px]:row-span-2 max-[640px]:row-auto",
    cardClassName: "min-h-[568px] max-[1024px]:min-h-[360px] max-[640px]:min-h-[210px]",
    contentClassName:
      "top-12 bottom-auto max-[640px]:top-auto max-[640px]:bottom-[30px]",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "marketplaces",
  },
  {
    id: "platforms",
    title: "HR Platforms",
    description: "Verify candidates before onboarding.",
    imageUrl: "./assets/platforms.png",
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
    imageUrl: "./assets/schools.png",
    className:
      "col-[1/4] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "schools",
  },
  {
    id: "teams",
    title: "Compliance Teams",
    description: "Build a defensible verification workflow.",
    imageUrl: "./assets/teams.png",
    className:
      "col-[4/7] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName:
      "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "teams",
  },
];

const workflowDefaults = [
  {
    title: "Collect only what matters",
    description:
      "Start with the minimum identity signals needed for the workflow.",
  },
  {
    title: "Verify and store the record",
    description:
      "Create a reusable verification event with consent and audit history.",
  },
  {
    title: "Reuse with permission",
    description:
      "Let users approve future checks without repeating the same friction.",
  },
];

export const useCasePageDetails: Record<string, UseCasePageDetail> =
  useCaseCards.reduce(
    (details, card) => {
      details[card.id] = {
        id: card.id,
        eyebrow: card.title,
        headline: `${card.title} identity workflows that feel faster and safer.`,
        intro: `${card.description} Ontiver helps teams verify once, reuse trusted records, and keep every consent event attached to the customer journey.`,
        imageUrl: card.imageUrl,
        stats: [
          { value: "1x", label: "Reusable verification record" },
          { value: "100%", label: "Consent-led data sharing" },
          { value: "24/7", label: "Audit-ready activity history" },
        ],
        workflow: workflowDefaults,
        outcomes: [
          "Lower repeat KYC friction across returning users.",
          "Cleaner compliance evidence for audits and internal reviews.",
          "A permission-first identity layer that scales with product growth.",
        ],
      };

      return details;
    },
    {} as Record<string, UseCasePageDetail>,
  );
