import { ArrowUpRight, RotateCcw } from "lucide-react";
import { calculatorFields, type CalculatorFieldKey } from "../../data/calculator";
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

export default function CalculatorFormPanel({ values, dropOffRate, onFieldChange, onSliderChange, onClear, onCalculate }: CalculatorFormPanelProps) {
  return (
    <form className="rounded-[28px] border border-[#dde6dc] bg-[#f7faf5] p-6 sm:p-9" onSubmit={(event) => { event.preventDefault(); onCalculate(); }}>
      <h3 className="text-card-title font-semibold">Check KYC savings</h3>
      <div className="mt-8 space-y-6">
        {calculatorFields.slice(0, 2).map((field) => <CalculatorInputField key={field.key} field={field} value={values[field.key]} onChange={onFieldChange} />)}
        <DropOffSlider dropOffRate={dropOffRate} onChange={onSliderChange} />
        {calculatorFields.slice(2).map((field) => <CalculatorInputField key={field.key} field={field} value={values[field.key]} onChange={onFieldChange} />)}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="button-primary grow">Calculate savings<ArrowUpRight size={18} /></button>
        <button type="button" onClick={onClear} className="button-secondary"><RotateCcw size={16} />Clear</button>
      </div>
    </form>
  );
}
