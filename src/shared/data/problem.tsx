import type { ReactNode } from "react";

export type ProblemItem = {
  title: string;
  para: string;
  illustration: ReactNode;
};

export const problems: ProblemItem[] = [
  {
    title: "Repeated verification costs pile up.",
    para: "Businesses re-verify the same users across platforms, paying for checks that should only happen once.",
    illustration: (
      <img
        src="./assets/rep-prob.png"
        alt="rep-image"
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
  {
    title: "Onboarding friction kills conversion.",
    para: "Every extra document upload is a door users close. Drop-off during KYC is the hidden cost no one tracks.",
    illustration: (
      <img
        src="./assets/ont-prob.png"
        alt="ont-image"
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
  {
    title: "Compliance proof is fragmented.",
    para: "When regulators ask for an audit trail, businesses scramble across disconnected records and incomplete logs.",
    illustration: (
      <img
        src="./assets/ver-prob.png"
        alt="ver-image"
        className="h-full w-full bg-black/5 object-cover"
      />
    ),
  },
];
