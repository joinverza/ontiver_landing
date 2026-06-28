export type SolutionStep = {
  icon: string;
  title: string;
  para: string;
};

export const solutionSteps: SolutionStep[] = [
  {
    icon: "./assets/verify.svg",
    title: "Verify",
    para: "User submits identity documents through a business's Ontiver-powered flow.",
  },
  {
    icon: "./assets/screen.svg",
    title: "Screen",
    para: "Ontiver runs AML checks, sanctions screening, and risk assessment automatically.",
  },
  {
    icon: "./assets/proof.svg",
    title: "Store Proof",
    para: "A verified identity proof is created and stored securely - tied to the user, not just the business.",
  },
  {
    icon: "./assets/consent.svg",
    title: "Consent Share",
    para: "When another business needs to verify the same user, the user approves with a single consent action.",
  },
  {
    icon: "./assets/reuse.svg",
    title: "Reuse",
    para: "The new business gets trusted verification proof instantly. No repeat document uploads. No delay.",
  },
];

export const orbitalStarts = [
  { x: -74, y: -58, rotation: -25 },
  { x: 0, y: -68, rotation: 15 },
  { x: 74, y: -58, rotation: 25 },
  { x: -64, y: -56, rotation: -22 },
  { x: 64, y: -56, rotation: 22 },
];

export const solutionCellClasses = [
  "col-[1/3] row-[1/2]",
  "col-[3/5] row-[1/2]",
  "col-[5/7] row-[1/2]",
  "col-[1/4] row-[2/3]",
  "col-[4/7] row-[2/3]",
];
