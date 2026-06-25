import type { ReactNode } from "react";

type TextProps = {
  btext: ReactNode;
  heading: ReactNode;
  className?: string;
};

export default function Text({ btext, heading, className = "" }: TextProps) {
  return (
    <div className="flex flex-col gap-2 pb-15 w-full">
      <h4 className={`${className} rounded-3xl py-2 px-6 border-1 border-border w-fit mx-auto`}>{btext}</h4>
      <h2 className={`${className} w-full max-w-[500px] text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[120%] tracking-tight mx-auto text-center`}>{heading}</h2>
    </div>
  );
}
