import { editorialPhotos } from "./editorialPhotos";
import { imagery, type EditorialImage } from "./imagery";

export type SolutionStep = {
  icon: string;
  title: string;
  para: string;
  image: EditorialImage;
};

export const solutionSteps: SolutionStep[] = [
  {
    icon: "./assets/verify.svg",
    title: "Create the request",
    para: "Choose the person or business, the workflow, and what you need.",
    image: editorialPhotos.workflow,
  },
  {
    icon: "./assets/screen.svg",
    title: "Get the user's consent",
    para: "They see who's asking, why, and what's required.",
    image: editorialPhotos.consent,
  },
  {
    icon: "./assets/proof.svg",
    title: "Verify the evidence",
    para: "Ontiver runs the selected checks through internal services and approved providers.",
    image: editorialPhotos.verification,
  },
  {
    icon: "./assets/consent.svg",
    title: "Explain the signals",
    para: "Intelligence flags consistency, fraud, or review signals with reasons attached.",
    image: editorialPhotos.intelligence,
  },
  {
    icon: "./assets/reuse.svg",
    title: "Review and decide",
    para: "Your reviewer inspects results, evidence, and the audit trail, then approves, rejects, or escalates.",
    image: imagery.candidateReview,
  },
  {
    icon: "/assets/proof.svg",
    title: "Create an approved proof",
    para: "A reusable proof is created containing only the approved claims.",
    image: editorialPhotos.proof,
  },
  {
    icon: "/assets/reuse.svg",
    title: "Let the user control reuse",
    para: "They decide whether to approve future requests using the same proof.",
    image: editorialPhotos.sharingHistory,
  },
];

export const solutionCellClasses = [
  "col-[1/3] row-[1/2]",
  "col-[3/5] row-[1/2]",
  "col-[5/7] row-[1/2]",
  "col-[1/4] row-[2/3]",
  "col-[4/7] row-[2/3]",
];
