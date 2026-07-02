export type ModuleCard = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
  copyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  shadeClassName?: string;
  lineClassName: string;
  depth: "top" | "bottom";
  entrance: { x: number; y: number };
  visual?: "check" | "share" | "radar" | "dashboard" | "code";
};

export const moduleCards: ModuleCard[] = [
  {
    id: "identity",
    title: "Identity Verification",
    description:
      "Supports document, biometric, and MFA verification with audit logs.",
    imageUrl: "./assets/fingerprint.png",
    className:
      "col-[1/2] row-[1/3] max-[900px]:col-span-full max-[900px]:row-auto max-[900px]:min-h-[220px] max-[640px]:col-span-full max-[640px]:min-h-[180px]",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: -60, y: 0 },
  },
  {
    id: "credentials",
    title: "Reusable Credentials",
    description:
      "Verified identity is stored as portable proof for returning users.",
    imageUrl: "./assets/portal.png",
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
    title: "Consent Management",
    description:
      "All identity sharing requires user consent with full control and history.",
    imageUrl: "./assets/quadrant.png",
    className:
      "col-[2/3] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "top-[18px] bottom-auto left-5 max-w-[178px] sm:left-7",
    lineClassName: "top-2.5 -right-2 bottom-2.5 w-px",
    depth: "top",
    entrance: { x: 0, y: 60 },
    visual: "share",
  },
  {
    id: "aml",
    title: "AML & Risk Checks",
    description: "Built-in AML, PEP, sanctions, and watchlist screening.",
    imageUrl: "./assets/matrix.png",
    className:
      "col-[3/5] row-[2/3] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "bottom-[26px] left-5 max-w-[194px] sm:bottom-[42px] sm:left-6",
    lineClassName: "-top-2 right-2.5 left-2.5 h-px",
    depth: "top",
    entrance: { x: 60, y: 0 },
    visual: "radar",
  },
  {
    id: "dashboard",
    title: "Business Dashboard",
    description:
      "Central dashboard for verification logs, consent, and compliance reports.",
    imageUrl: "./assets/chips.png",
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
    id: "api",
    title: "Developer API",
    description: "Sandbox, API, and webhooks for easy integration and testing.",
    imageUrl: "./assets/systems.png",
    className:
      "col-[4/5] row-[3/4] max-[900px]:col-auto max-[900px]:row-auto max-[900px]:min-h-[185px] max-[640px]:col-span-full max-[640px]:min-h-[170px]",
    copyClassName: "top-[16px] bottom-auto left-5 max-w-[245px] sm:left-[25px] sm:top-[18px]",
    lineClassName: "right-2.5 -bottom-2 left-2.5 h-px",
    depth: "bottom",
    entrance: { x: 40, y: 40 },
    visual: "code",
  },
];
