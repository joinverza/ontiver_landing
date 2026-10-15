const PlanToggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-5 py-3 text-left"
    >
      <span className="text-body text-[#526052]">{label}</span>
      <span aria-hidden="true" className="pill-switch-track">
        <span className="pill-switch-thumb" />
      </span>
    </button>
  );
};

export default PlanToggle;
import "../../../../shared/components/ui/sliding-pill.css";
