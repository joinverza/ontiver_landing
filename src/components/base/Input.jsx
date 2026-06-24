import React, { useState } from "react";

export default function Input({ name, placeholder, className }) {
  const [calc, setCalc] = useState("");

  //   function handleCalc(e) {
  //     setCalc(e.target.value);
  //     console.log(calc);
  //   }
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
