export type SolutionStep = {
  icon: string;
  title: string;
  para: string;
};

export const solutionSteps: SolutionStep[] = [
  {
    icon: "./assets/verify.svg",
    title: "Verify",
    para: "The user reviews the request and submits the information required by the agreed verification workflow.",
  },
  {
    icon: "./assets/screen.svg",
    title: "Screen",
    para: "The selected checks run through the workflow's verification providers, with exceptions available for review.",
  },
  {
    icon: "./assets/proof.svg",
    title: "Store Proof",
    para: "Approved verification claims form the basis of an identity proof connected to the user.",
  },
  {
    icon: "./assets/consent.svg",
    title: "Consent Share",
    para: "When a supported business requests proof, the user can review the purpose and approve or decline sharing.",
  },
  {
    icon: "./assets/reuse.svg",
    title: "Reuse",
    para: "The receiving business checks the proof's status and suitability, reducing repeated uploads where its requirements allow.",
  },
];

export const solutionCellClasses = [
  "col-[1/3] row-[1/2]",
  "col-[3/5] row-[1/2]",
  "col-[5/7] row-[1/2]",
  "col-[1/4] row-[2/3]",
  "col-[4/7] row-[2/3]",
];
