import { useId } from "react";

export default function DropOffSlider({ dropOffRate, onChange }: { dropOffRate: number; onChange: (value: number) => void }) {
  const id = useId();
  return (
    <div className="py-2">
      <div className="mb-5 flex items-center justify-between gap-4"><label htmlFor={id} className="text-body font-medium text-[#526052]">Onboarding drop-off rate</label><output htmlFor={id} className="text-body font-semibold text-[#007d21]">{dropOffRate}%</output></div>
      <input id={id} type="range" min="0" max="100" value={dropOffRate} onChange={(event) => onChange(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-[#009311]" />
      <div className="mt-3 flex justify-between text-meta text-[#637060]"><span>0%</span><span>100%</span></div>
    </div>
  );
}
