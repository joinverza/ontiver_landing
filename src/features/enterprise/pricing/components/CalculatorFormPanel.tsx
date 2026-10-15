import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { RotateCcw } from "lucide-react";
import { calculatorFields, type CalculatorFieldKey } from "../data/calculator";
import CalculatorInputField from "./CalculatorInputField";
import DropOffSlider from "./DropOffSlider";

type CalculatorFormPanelProps = {
  currency: string;
  values: Record<CalculatorFieldKey, string>;
  dropOffRate: number;
  onFieldChange: (key: CalculatorFieldKey, value: string) => void;
  onSliderChange: (value: number) => void;
  onClear: () => void;
  onCalculate: () => void;
};

const CalculatorFormPanel = ({
  currency,
  values,
  dropOffRate,
  onFieldChange,
  onSliderChange,
  onClear,
  onCalculate,
}: CalculatorFormPanelProps) => {
  return (
    <form
      className="flex min-w-0 flex-col rounded-2xl border border-[#dde6dc] bg-surface-muted p-6 sm:p-9"
      onSubmit={(event) => {
        event.preventDefault();
        onCalculate();
      }}
    >
      <h3 className="text-card-title font-semibold">Your current verification figures</h3>
      <div className="mt-8 space-y-6">
        {calculatorFields.map((field) => (
          <CalculatorInputField
            key={field.key}
            field={
              field.prefix
                ? {
                    ...field,
                    label: field.label.replace("(USD)", `(${currency})`),
                    prefix: currency === "NGN" ? "₦" : "$",
                  }
                : field
            }
            value={values[field.key]}
            onChange={onFieldChange}
          />
        ))}
        <DropOffSlider dropOffRate={dropOffRate} onChange={onSliderChange} />
      </div>
      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
        <button type="submit" className="button-primary grow">
          Calculate estimate
          <ActionIcon size={18} />
        </button>
        <button type="button" onClick={onClear} className="button-secondary">
          <RotateCcw size={16} />
          Clear
        </button>
      </div>
    </form>
  );
};

export default CalculatorFormPanel;
