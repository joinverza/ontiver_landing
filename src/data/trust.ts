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
    metric: "100%",
    signal: "Consent required before every reuse.",
    description:
      "All identity sharing requires user consent with full control and history.",
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
    title: "Audit-Ready Records",
    eyebrow: "Compliance Ledger",
    metric: "24/7",
    signal: "Timestamped logs for every verification event.",
    description:
      "Every verification event is logged, timestamped, and exportable.",
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
    description: "Business access is gated, permissioned, and monitored.",
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
    signal: "Sensitive data is minimized by default.",
    description:
      "Sensitive documents are handled with minimization principles. Not stored longer than needed.",
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
