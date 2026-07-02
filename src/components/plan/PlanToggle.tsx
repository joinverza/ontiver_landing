import { AnimatePresence, motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function PlanToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="plan-toggle-row group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-[rgba(34,197,94,0.03)]"
    >
      <span className="text-sm font-medium text-black/78">{label}</span>
      <span
        className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
          checked ? "bg-[#009311]" : "bg-[#D9DFD9]"
        }`}
      >
        <motion.span
          className="absolute top-1 size-5 rounded-full bg-white"
          animate={{ x: checked ? 22 : 4 }}
          transition={{
            duration: checked ? 0.25 : 0.2,
            ease: checked ? [0.34, 1.56, 0.64, 1] : easeOut,
          }}
        />
        <AnimatePresence>
          {checked ? (
            <motion.span
              className="absolute right-1 top-1 size-5 rounded-full border border-[#70ff8a]"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
      </span>
    </button>
  );
}
