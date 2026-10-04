// Publish only with supporting evidence and explicit permission to name the organization.
// Empty arrays deliberately keep proposed partnerships and certifications off the site.
export type PublishedProof = {
  name: string;
  logo: string;
  href: string;
  evidenceUrl: string;
  approvedForPublication: boolean;
};

export type PilotMetric = {
  id: string;
  label: string;
  description: string;
  // How Ontiver measures it today: a product fact, not a pilot result.
  measuredBy: {
    value: string;
    detail: string;
  };
  result: {
    value: string;
    context: string;
    evidenceUrl: string;
    approvedForPublication: boolean;
  } | null;
};

export const customerProof: PublishedProof[] = [];
export const recognitionProof: PublishedProof[] = [];
export const certificationProof: PublishedProof[] = [];

export type RegulatoryCredential = {
  id: string;
  issuer: string;
  logo: string;
  title: string;
  detail: string;
  reference?: string;
  issued: string;
  evidence: { label: string; href: string; external?: boolean };
};

// Worded exactly as the issuing documents state; keep in step with the certificates.
export const regulatoryCredentials: RegulatoryCredential[] = [
  {
    id: "ndpc",
    issuer: "Nigeria Data Protection Commission",
    logo: "/assets/certifications/ndpc-logo.png",
    title: "Registered data controller and processor of major importance",
    detail:
      "Qynara Technologies Limited, which operates Ontiver, is registered under Section 44 of the Nigeria Data Protection Act 2023.",
    reference: "Registration ID NDPC/DCP/14404",
    issued: "Registered 7 September 2026",
    evidence: {
      label: "View certificate",
      href: "/assets/certifications/ndpc-certificate-of-registration.pdf",
      external: true,
    },
  },
  {
    id: "nimc",
    issuer: "National Identity Management Commission",
    logo: "/assets/certifications/nimc-logo.png",
    title: "Approved NINAuth Enterprise",
    detail:
      "NIMC has approved Qynara Technologies Limited to operate as an Enterprise under the NINAuth Verification service, with NIN checks routed through a licensed NIMC verification partner.",
    issued: "Approved 14 July 2026",
    evidence: {
      label: "Request the approval letter",
      href: "/enterprise/contact?request=security-documentation",
    },
  },
];

export const pilotMetrics: PilotMetric[] = [
  {
    id: "completion",
    label: "Verification completion",
    description: "The share of invited users who complete their verification journey.",
    measuredBy: {
      value: "5 stages",
      detail:
        "Every request is tracked live from invited, in progress and awaiting review to verified or closed.",
    },
    result: null,
  },
  {
    id: "time",
    label: "Time to verification",
    description: "The time from a user's first step to a completed verification.",
    measuredBy: {
      value: "Timestamped",
      detail:
        "Each request records when it was created, consented, each check completed and when it was reviewed.",
    },
    result: null,
  },
  {
    id: "reuse",
    label: "Proof reuse",
    description: "How often verified proof is reused with the user's permission.",
    measuredBy: {
      value: "Consent first",
      detail:
        "A proof is shared only after the person approves the request, and every share is recorded.",
    },
    result: null,
  },
];

export function isPublishedProof(proof: PublishedProof) {
  return (
    proof.approvedForPublication &&
    [proof.name, proof.evidenceUrl, proof.logo, proof.href].every(
      (value) => value.trim().length > 0,
    )
  );
}

export function isPublishedMetricResult(
  result: PilotMetric["result"],
): result is NonNullable<PilotMetric["result"]> {
  return Boolean(
    result?.approvedForPublication &&
    [result.value, result.context, result.evidenceUrl].every((value) => value.trim().length > 0),
  );
}
