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
