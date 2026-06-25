import { useState } from "react";

type InputProps = {
  name: string;
  placeholder: string;
  className?: string;
};

export default function Input({ name, placeholder, className = "" }: InputProps) {
  const [calc, setCalc] = useState("");

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-black/80">{name}</label>
      <input
        className="border-1 border-[#E1E1E1] rounded-lg px-3 py-5 text-xs text-black/30"
        onChange={(e) => setCalc(e.target.value)}
        placeholder={placeholder}
        value={calc}
      />
    </div>
  );
}
