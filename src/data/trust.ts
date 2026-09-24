import type { HoverEffectItem } from "../components/ui/card-hover-effect";

export type SecurityFeature = HoverEffectItem & {
  eyebrow: string;
  metric: string;
  signal: string;
  chips: string[];
  flow: string[];
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
};

export const securityFeatures: SecurityFeature[] = [
  {
    image: "./assets/teams.png",
    title: "Consent-Based Sharing",
    eyebrow: "User Permission Layer",
    metric: "Consent",
    signal: "Designed around user approval for reuse.",
    description:
      "Review the purpose and requested fields before approving supported identity-sharing workflows.",
    chips: ["Wallet approval", "Share limits", "Revocation"],
    flow: ["Request", "Approve", "Share"],
    primaryAction: {
      label: "Review",
      href: "/enterprise/contact",
    },
    secondaryAction: {
      label: "Read FAQ",
      href: "#faq",
    },
  },
  {
    image: "./assets/octagon.png",
    title: "Reviewable Records",
    eyebrow: "Compliance Ledger",
    metric: "History",
    signal: "Verification events and consent decisions in context.",
    description:
      "Define the event history, reporting, and export requirements to evaluate in a scoped pilot.",
    chips: ["Event logs", "Evidence trails", "Exports"],
    flow: ["Capture", "Sign", "Archive"],
    primaryAction: {
      label: "Request",
      href: "/enterprise/contact",
    },
    secondaryAction: {
      label: "Compare plans",
      href: "/enterprise/pricing",
    },
  },
  {
    image: "./assets/matrix.png",
    title: "Secure API Access",
    eyebrow: "Developer Gateway",
    metric: "API",
    signal: "Permissioned access for trusted business systems.",
    description: "Scoped access and monitoring are part of the proposed integration controls, with readiness reviewed during pilot scoping.",
    chips: ["Scoped keys", "Webhooks", "Monitoring"],
    flow: ["Authenticate", "Authorize", "Monitor"],
    primaryAction: {
      label: "Access",
      href: "https://docs.ontiver.com/",
    },
    secondaryAction: {
      label: "Access",
      href: "/enterprise/contact",
    },
  },
  {
    image: "./assets/binary.png",
    title: "Data Protection First",
    eyebrow: "Privacy Controls",
    metric: "Min",
    signal: "Designed to limit unnecessary data exposure.",
    description:
      "Scope the required identity fields and review retention and handling controls before a pilot begins.",
    chips: ["Data minimization", "Retention rules", "Secure handling"],
    flow: ["Collect less", "Protect", "Expire"],
    primaryAction: {
      label: "Explore",
      href: "/enterprise/contact",
    },
    secondaryAction: {
      label: "Explore",
      href: "/enterprise#cases",
    },
  },
];
