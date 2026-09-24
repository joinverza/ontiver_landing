export default function PlanToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange} className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-5 py-3 text-left">
      <span className="text-body text-[#526052]">{label}</span>
      <span aria-hidden="true" className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? "bg-[#009311]" : "bg-[#dce5d8]"}`}><span className={`absolute top-1 size-5 rounded-full bg-white transition-[left] ${checked ? "left-6" : "left-1"}`} /></span>
    </button>
  );
}
