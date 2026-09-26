import { ArrowUpRight, RotateCcw } from "lucide-react";
import { calculatorFields, type CalculatorFieldKey } from "../data/calculator";
import CalculatorInputField from "./CalculatorInputField";
import DropOffSlider from "./DropOffSlider";

type CalculatorFormPanelProps = {
  values: Record<CalculatorFieldKey, string>;
  dropOffRate: number;
  onFieldChange: (key: CalculatorFieldKey, value: string) => void;
  onSliderChange: (value: number) => void;
  onClear: () => void;
  onCalculate: () => void;
};

const CalculatorFormPanel = ({
  values,
  dropOffRate,
  onFieldChange,
  onSliderChange,
  onClear,
  onCalculate,
}: CalculatorFormPanelProps) => {
  return (
    <form
      className="rounded-2xl border border-[#dde6dc] bg-[#f7f8f5] p-6 sm:p-9"
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
            field={field}
            value={values[field.key]}
            onChange={onFieldChange}
          />
        ))}
        <DropOffSlider dropOffRate={dropOffRate} onChange={onSliderChange} />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="button-primary grow">
          Calculate estimate
          <ArrowUpRight size={18} />
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
