import { type ReactNode } from "react";

interface ProblemCardProps {
  children?: ReactNode;
  illustration: ReactNode;
  title: string;
  description: string;
}

export default function ProblemCard({
  illustration,
  title,
  description,
}: ProblemCardProps) {
  return (
    <div className="problem-card-shell relative p-4 rounded-3xl bg-white border border-black/5 overflow-hidden">
      {/* Illustration area */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">
        {illustration}
      </div>

      {/* Text */}
      <div>
        <h6 className="text-green font-semibold text-lg mb-2">{title}</h6>
        <p className="text-sm text-black/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
