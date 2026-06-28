import { motion } from "framer-motion";

type DropOffSliderProps = {
  dropOffRate: number;
  sliderColor: string;
  sliderPopKey: number;
  isDraggingSlider: boolean;
  onChange: (value: number) => void;
  onPointerDown: () => void;
  onPointerUp: () => void;
};

export default function DropOffSlider({
  dropOffRate,
  sliderColor,
  sliderPopKey,
  isDraggingSlider,
  onChange,
  onPointerDown,
  onPointerUp,
}: DropOffSliderProps) {
  return (
    <div className="kyc-calculator-field flex flex-col gap-4 pt-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-black/60">
          Onboarding Drop-Off Rate
        </label>
        <span className="text-xs font-semibold text-black/40">Live input</span>
      </div>

      <div className="relative pt-9">
        <motion.div
          key={sliderPopKey}
          className="absolute top-0 z-10 -translate-x-1/2 text-sm font-semibold"
          style={{ left: `${dropOffRate}%`, color: sliderColor }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.15 }}
        >
          {dropOffRate}%
          <span className="absolute left-1/2 top-7 h-8 border-l border-dashed border-[#009311]/20" />
        </motion.div>

        <div className="relative h-2 rounded-full bg-[#DFE6DE]">
          <div
            className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-[#009311]"
            style={{ width: `${dropOffRate}%` }}
          >
            <span className="absolute inset-y-0 left-0 w-1/2 animate-[kyc-slider-shimmer_3s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)]" />
          </div>
          <input
            aria-label="Onboarding Drop-Off Rate"
            type="range"
            min="0"
            max="100"
            value={dropOffRate}
            className="absolute inset-0 z-20 h-2 w-full cursor-pointer appearance-none bg-transparent opacity-0"
            onChange={(event) => onChange(Number(event.target.value))}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          <motion.span
            className="pointer-events-none absolute top-1/2 z-30 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#063B18]"
            style={{ left: `${dropOffRate}%` }}
            animate={{ scale: isDraggingSlider ? 1.2 : 1 }}
            transition={{
              duration: isDraggingSlider ? 0.15 : 0.2,
              ease: isDraggingSlider ? [0.34, 1.56, 0.64, 1] : "easeOut",
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
