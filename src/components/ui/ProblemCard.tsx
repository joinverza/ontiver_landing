import { type PointerEvent, type ReactNode } from "react";

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
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--tx", `${(0.5 - x) * 8}px`);
    card.style.setProperty("--ty", `${(0.5 - y) * 8}px`);
    card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;

    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--tx", "0px");
    card.style.setProperty("--ty", "0px");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      className="problem-card-shell relative flex flex-col p-1 pb-8 gap-2 rounded-2xl bg-white border border-black/5 overflow-hidden shadow-xl"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* <div className="problem-card-aura" /> */}
      <div className="problem-card-border" />
      <div className="problem-card-noise" />

      <div className="problem-card-visual relative z-20 w-full aspect-square rounded-xl overflow-hidden shadow-sm">
        <div className="problem-card-illustration">{illustration}</div>
        {/* <div className="problem-card-scan" /> */}
        <div className="problem-card-target" />
        {/* <div className="problem-card-corner problem-card-corner-tl" /> */}
        {/* <div className="problem-card-corner problem-card-corner-tr" /> */}
        {/* <div className="problem-card-corner problem-card-corner-bl" /> */}
        {/* <div className="problem-card-corner problem-card-corner-br" /> */}
        <div className="problem-card-data problem-card-data-one" />
        <div className="problem-card-data problem-card-data-two" />
        <div className="problem-card-data problem-card-data-three" />
      </div>

      <div className="problem-card-copy relative z-10 px-4 mt-2 h-32">
        <h6 className="problem-card-title text-green font-semibold text-xl mb-2">
          {title}
        </h6>
        <p className="text-sm text-black/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
