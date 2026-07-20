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
      className="group relative isolate mx-auto flex w-full flex-col gap-2 overflow-hidden rounded-[20px] border border-black/5 bg-white p-0.5 transition-[transform,border-color,box-shadow,background-color] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [--anim-speed:1] [--mx:50%] [--my:50%] [--rx:0deg] [--ry:0deg] [--tx:0px] [--ty:0px] [transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))_translateY(0)_scale(1)] hover:border-light-primary hover:bg-[#fbfffb] hover:[--anim-speed:1.85] hover:[transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))_translateY(-10px)_scale(1.018)] max-[640px]:w-[min(82vw,550px)]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] bg-[conic-gradient(from_var(--problem-border-angle,0deg),transparent,rgba(0,147,17,0.85),rgba(0,45,14,0.2),transparent_38%)] p-px opacity-0 transition-opacity duration-[220ms] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude] group-hover:animate-[problem-border-spin_1.6s_linear_infinite] group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] bg-[linear-gradient(90deg,rgba(0,147,17,0.08)_1px,transparent_1px),linear-gradient(rgba(0,147,17,0.08)_1px,transparent_1px)] bg-[size:18px_18px] opacity-0 mix-blend-multiply transition-opacity duration-[260ms] group-hover:animate-[problem-grid-slide_1.2s_linear_infinite] group-hover:opacity-30" />
      <div className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_30px_rgba(0,147,17,0.2)] rounded-[inherit]" />

      <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white">
        <div className="relative z-[1] aspect-[16/8.8] w-full overflow-hidden bg-[#08110c] [transform:translateZ(24px)] sm:aspect-[16/10] md:aspect-square">
          <div className="h-full w-full scale-100 saturate-100 transition-[filter,transform] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[filter:saturate(1.18)_contrast(1.08)_brightness(1.04)] group-hover:[transform:scale(1.075)_translate3d(var(--tx),var(--ty),0)]">{illustration}</div>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--mx)_var(--my),transparent_0_38px,rgba(0,147,17,0.42)_39px_40px,transparent_41px),linear-gradient(90deg,transparent_calc(var(--mx)_-_0.5px),rgba(0,147,17,0.45)_var(--mx),transparent_calc(var(--mx)_+_0.5px)),linear-gradient(0deg,transparent_calc(var(--my)_-_0.5px),rgba(0,147,17,0.45)_var(--my),transparent_calc(var(--my)_+_0.5px))] group-hover:animate-[problem-target-pulse_1.4s_ease-in-out_infinite] group-hover:opacity-100" />
          <div className="pointer-events-none absolute top-[24%] left-[18px] h-0.5 w-[42px] rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute top-1/2 left-[18px] h-0.5 w-16 rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite] group-hover:[animation-delay:0.18s]" />
          <div className="pointer-events-none absolute top-[76%] left-[18px] h-0.5 w-[34px] rounded-full bg-[linear-gradient(90deg,#009311,transparent)] opacity-0 group-hover:animate-[problem-data-travel_1.05s_ease-in-out_infinite] group-hover:[animation-delay:0.36s]" />
        </div>

        <div className="relative min-h-[116px] bg-white px-3 pb-4 pt-3 sm:min-h-40 sm:pt-4 md:min-h-44">
          <h6 className="mb-1.5 text-card-title font-semibold text-green transition-[color,text-shadow] duration-[220ms] group-hover:text-dark-primary group-hover:[text-shadow:0_0_16px_rgba(0,147,17,0.18)] sm:mb-2">
            {title}
          </h6>
          <p className="text-body text-black/90">{description}</p>
        </div>
      </div>
    </div>
  );
}
