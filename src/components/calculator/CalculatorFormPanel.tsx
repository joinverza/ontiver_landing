import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { RefObject } from "react";
import {
  calculatorFields,
  type CalculatorFieldKey,
  type CalculatorStatus,
} from "../../data/calculator";
import MagneticFillButton from "../ui/MagneticFillButton";
import CalculatingDots from "./CalculatingDots";
import CalculatorInputField from "./CalculatorInputField";
import DropOffSlider from "./DropOffSlider";

type CalculatorFormPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  values: Record<CalculatorFieldKey, string>;
  focusedField: CalculatorFieldKey | null;
  pulseField: CalculatorFieldKey | null;
  flashFields: boolean;
  dropOffRate: number;
  sliderColor: string;
  sliderPopKey: number;
  isDraggingSlider: boolean;
  status: CalculatorStatus;
  onFieldChange: (key: CalculatorFieldKey, value: string) => void;
  onFieldFocus: (key: CalculatorFieldKey) => void;
  onFieldBlur: () => void;
  onSliderChange: (value: number) => void;
  onSliderPointerDown: () => void;
  onSliderPointerUp: () => void;
  onClear: () => void;
  onCalculate: () => void;
};

export default function CalculatorFormPanel({
  panelRef,
  values,
  focusedField,
  pulseField,
  flashFields,
  dropOffRate,
  sliderColor,
  sliderPopKey,
  isDraggingSlider,
  status,
  onFieldChange,
  onFieldFocus,
  onFieldBlur,
  onSliderChange,
  onSliderPointerDown,
  onSliderPointerUp,
  onClear,
  onCalculate,
}: CalculatorFormPanelProps) {
  return (
    <div ref={panelRef} className="rounded-3xl bg-white px-6 py-6 md:px-8">
      <h3 className="pb-10 text-lg font-semibold text-black">
        Check KYC Savings
      </h3>

      <div className="space-y-5">
        {calculatorFields.slice(0, 2).map((field) => (
          <CalculatorInputField
            key={field.key}
            field={field}
            value={values[field.key]}
            focused={focusedField === field.key}
            hasValue={values[field.key].trim().length > 0}
            flashFields={flashFields}
            pulseField={pulseField}
            onChange={onFieldChange}
            onFocus={onFieldFocus}
            onBlur={onFieldBlur}
          />
        ))}

        <DropOffSlider
          dropOffRate={dropOffRate}
          sliderColor={sliderColor}
          sliderPopKey={sliderPopKey}
          isDraggingSlider={isDraggingSlider}
          onChange={onSliderChange}
          onPointerDown={onSliderPointerDown}
          onPointerUp={onSliderPointerUp}
        />

        {calculatorFields.slice(2).map((field) => (
          <CalculatorInputField
            key={field.key}
            field={field}
            value={values[field.key]}
            focused={focusedField === field.key}
            hasValue={values[field.key].trim().length > 0}
            flashFields={flashFields}
            pulseField={pulseField}
            onChange={onFieldChange}
            onFocus={onFieldFocus}
            onBlur={onFieldBlur}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-2 sm:grid-cols-[1fr_2fr]">
        <button
          className="kyc-calculator-action inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#BFC8D2] bg-white px-4 text-sm font-medium text-[#0A0B0D] transition-colors duration-200 hover:border-red-400/50 hover:text-red-600"
          type="button"
          onClick={onClear}
        >
          <RotateCcw size={16} />
          Clear Form
        </button>
        <motion.div className="kyc-calculator-action" whileTap={{ scale: 0.97 }}>
          <MagneticFillButton
            variant="green"
            className="h-12 w-full rounded-lg px-4 text-sm font-medium"
            onClick={onCalculate}
          >
            {status === "calculating" ? (
              <span className="inline-flex items-center">
                Calculating
                <CalculatingDots />
              </span>
            ) : (
              "Calculate KYC Savings"
            )}
          </MagneticFillButton>
        </motion.div>
      </div>
    </div>
  );
}
