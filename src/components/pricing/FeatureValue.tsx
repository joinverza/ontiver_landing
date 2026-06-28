import { Check, Minus } from "lucide-react";
import type { ComparisonValue } from "../../data/pricing";

export default function FeatureValue({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-light-primary" />;
  }

  if (value === false) {
    return <Minus className="mx-auto size-4 text-black/25" />;
  }

  return <span>{value}</span>;
}
