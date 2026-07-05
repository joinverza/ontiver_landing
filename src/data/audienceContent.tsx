import type { ModuleCard } from "./modules";
import type { ProblemItem } from "./problem";
import type { SolutionStep } from "./solution";
import type { SecurityFeature } from "./trust";
import type { UseCaseCard } from "./useCases";

export const individualProblems: ProblemItem[] = [
  {
    title: "The same documents, again and again.",
    para: "Opening an account, applying for a service, or starting a new role should not mean rebuilding your identity from scratch.",
    illustration: (
      <img
        src="/assets/rep-prob.png"
        alt=""
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
  {
    title: "Your data moves without enough clarity.",
    para: "People deserve to know who is requesting their identity, what will be shared, and when access can be withdrawn.",
    illustration: (
      <img
        src="/assets/ont-prob.png"
        alt=""
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
  {
    title: "Verification delays real life.",
    para: "Slow checks can hold up accounts, applications, work, education, and other opportunities that should move quickly.",
    illustration: (
      <img
        src="/assets/ver-prob.png"
        alt=""
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
];

export const individualSolutionSteps: SolutionStep[] = [
  {
    icon: "/assets/verify.svg",
    title: "Verify once",
    para: "Complete a trusted identity check once instead of repeating the same upload every time.",
  },
  {
    icon: "/assets/proof.svg",
    title: "Keep your proof",
    para: "Your verified credentials stay connected to you in one secure identity record.",
  },
  {
    icon: "/assets/consent.svg",
    title: "Review requests",
    para: "See who is asking, what they need, and why before anything is shared.",
  },
  {
    icon: "/assets/share.svg",
    title: "Approve sharing",
    para: "Give clear permission for the exact credential a supported service needs.",
  },
  {
    icon: "/assets/reuse.svg",
    title: "Move forward",
    para: "Reuse trusted proof across supported services without starting over.",
  },
];

export const individualModuleCards: ModuleCard[] = [
  {
    id: "identity",
    title: "One Verified Identity",
    description: "Keep trusted identity proof connected to you, not scattered across forms.",
    imageUrl: "/assets/fingerprint.png",
    className:
      "col-[1/2] row-[1/3] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[220px] max-[640px]:col-span-full max-[640px]:min-h-[180px]",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: -60, y: 0 },
  },
  {
    id: "credentials",
    title: "Reusable Credentials",
    description: "Use verified proof again when a supported service requests it.",
    imageUrl: "/assets/portal.png",
    className:
      "col-[2/5] row-[1/2] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[210px] max-[640px]:col-span-full max-[640px]:min-h-[175px]",
    copyClassName: "top-[72px] bottom-auto left-5 max-w-[250px] sm:top-[100px] sm:left-7 sm:max-w-[284px]",
    titleClassName: "max-w-[16ch]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "top",
    entrance: { x: 40, y: -40 },
    visual: "check",
  },
  {
    id: "consent",
    title: "Consent Controls",
    description: "Approve, review, and understand every identity-sharing request.",
    imageUrl: "/assets/quadrant.png",
    className:
      "col-[2/3] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "top-[18px] bottom-auto left-5 max-w-[178px] sm:left-7",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: 0, y: 60 },
    visual: "share",
  },
  {
    id: "privacy",
    title: "Privacy by Default",
    description: "Share only the proof a service needs, with less unnecessary exposure.",
    imageUrl: "/assets/matrix.png",
    className:
      "col-[3/5] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "bottom-[26px] left-5 max-w-[194px] sm:bottom-[42px] sm:left-6",
    lineClassName: "-top-2 right-2.5 left-2.5 h-px",
    depth: "top",
    entrance: { x: 60, y: 0 },
    visual: "radar",
  },
  {
    id: "activity",
    title: "Activity History",
    description: "See verification and sharing activity in one clear history.",
    imageUrl: "/assets/chips.png",
    className:
      "col-[1/4] row-[3/4] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[210px] max-[640px]:col-span-full max-[640px]:min-h-[175px]",
    copyClassName: "bottom-6 left-5 max-w-[254px] sm:left-7 sm:bottom-7",
    titleClassName: "max-w-[16ch]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "bottom",
    entrance: { x: -40, y: 40 },
    visual: "dashboard",
  },
  {
    id: "control",
    title: "You Stay in Control",
    description: "Your permission remains central whenever trusted proof is reused.",
    imageUrl: "/assets/systems.png",
    className:
      "col-[4/5] row-[3/4] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "top-[16px] bottom-auto left-5 max-w-[245px] sm:left-[25px] sm:top-[18px]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "bottom",
    entrance: { x: 40, y: 40 },
  },
];

export const individualUseCaseCards: UseCaseCard[] = [
  {
    id: "banking",
    title: "Banking & Fintech",
    description: "Open and use financial services with less repeated verification.",
    imageUrl: "/assets/fintech.png",
    className: "col-[1/3] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "fintech",
  },
  {
    id: "lending",
    title: "Loans & Credit",
    description: "Reuse trusted proof when applying with supported lenders.",
    imageUrl: "/assets/lenders.png",
    className: "col-[3/5] row-[1/3] max-[1024px]:col-auto max-[1024px]:row-auto",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "lenders",
  },
  {
    id: "marketplaces",
    title: "Marketplaces",
    description: "Build confidence when buying, selling, or joining a platform.",
    imageUrl: "/assets/marketplaces.png",
    className:
      "col-[5/7] row-[1/5] max-[1024px]:col-auto max-[1024px]:row-span-2 max-[640px]:row-auto",
    cardClassName: "min-h-[568px] max-[1024px]:min-h-[360px] max-[640px]:min-h-[210px]",
    contentClassName: "top-12 bottom-auto max-[640px]:top-auto max-[640px]:bottom-[30px]",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "marketplaces",
  },
  {
    id: "work",
    title: "Work & Hiring",
    description: "Share verified identity during supported hiring and onboarding.",
    imageUrl: "/assets/platforms.png",
    className: "col-[1/5] row-[3/5] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName: "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "top-4 -right-2 bottom-4 w-px",
    idle: "platforms",
  },
  {
    id: "education",
    title: "Education",
    description: "Reuse trusted proof across supported admissions and credential journeys.",
    imageUrl: "/assets/schools.png",
    className: "col-[1/4] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName: "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "schools",
  },
  {
    id: "everyday",
    title: "Everyday Services",
    description: "Carry trusted identity into more of the services you use.",
    imageUrl: "/assets/teams.png",
    className: "col-[4/7] row-[5/7] max-[1024px]:col-span-full max-[1024px]:row-auto",
    cardClassName: "min-h-[252px] max-[640px]:min-h-[190px]",
    contentClassName: "top-1/2 bottom-auto -translate-y-1/2 max-[640px]:top-auto max-[640px]:bottom-[30px] max-[640px]:translate-y-0",
    lineClassName: "right-4 -bottom-2 left-4 h-px",
    idle: "teams",
  },
];

export const individualSecurityFeatures: SecurityFeature[] = [
  {
    image: "/assets/teams.png",
    title: "Permission before sharing",
    eyebrow: "Your consent",
    metric: "You",
    signal: "Your approval stays central.",
    description: "Review each request before a supported service receives trusted proof.",
    chips: ["Clear requests", "Approval", "History"],
    flow: ["Review", "Approve", "Share"],
    primaryAction: { label: "Join waitlist", href: "/#join" },
    secondaryAction: { label: "Read FAQ", href: "#faq" },
  },
  {
    image: "/assets/octagon.png",
    title: "A clear activity history",
    eyebrow: "Visibility",
    metric: "24/7",
    signal: "See how your identity is used.",
    description: "Keep verification and sharing activity together instead of guessing where your data went.",
    chips: ["Verification", "Sharing", "Status"],
    flow: ["Capture", "Review", "Remember"],
    primaryAction: { label: "Learn more", href: "/#features" },
    secondaryAction: { label: "Read FAQ", href: "#faq" },
  },
  {
    image: "/assets/matrix.png",
    title: "Less unnecessary exposure",
    eyebrow: "Privacy",
    metric: "Min",
    signal: "Share only what is needed.",
    description: "Reuse trusted proof without handing every service the same document bundle.",
    chips: ["Less data", "Purpose-led", "Protected"],
    flow: ["Request", "Limit", "Protect"],
    primaryAction: { label: "See how it works", href: "/#solution" },
    secondaryAction: { label: "Contact", href: "/contact" },
  },
  {
    image: "/assets/binary.png",
    title: "Trusted proof that moves with you",
    eyebrow: "Portability",
    metric: "1x",
    signal: "Verify once, reuse with consent.",
    description: "Move through supported services without rebuilding your identity each time.",
    chips: ["Portable proof", "Faster access", "Control"],
    flow: ["Verify", "Keep", "Reuse"],
    primaryAction: { label: "Join waitlist", href: "/#join" },
    secondaryAction: { label: "Contact", href: "/contact" },
  },
];
