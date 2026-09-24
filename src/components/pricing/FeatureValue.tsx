import { Check, Minus } from "lucide-react";
import type { ComparisonValue } from "../../data/pricing";

export default function FeatureValue({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return <Check aria-label="Included" role="img" className="mx-auto size-4 text-light-primary" />;
  }

  if (value === false) {
    return <Minus aria-label="Not included" role="img" className="mx-auto size-4 text-black/25" />;
  }

  return <span>{value}</span>;
}
