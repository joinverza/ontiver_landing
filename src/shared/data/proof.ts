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
    result: null,
  },
  {
    id: "time",
    label: "Time to verification",
    description: "The time from a user's first step to a completed verification.",
    result: null,
  },
  {
    id: "reuse",
    label: "Proof reuse",
    description: "How often verified proof is reused with the user's permission.",
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
