import { ReactNode } from "react";

interface AuroraBadgeProps {
  children: ReactNode;
  className?: string;
  spanClassName?: string;
}

export default function AuroraBadge({
  children,
  className = "",
  spanClassName = "",
}: AuroraBadgeProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden group ${className}`}
    >
      {/* The spinning conic gradient border */}
      <div
        className="absolute z-0 w-[400%] aspect-square top-1/2 left-1/2 origin-center animate-aurora-spin group-hover:animate-aurora-spin-fast"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, transparent 75%, #009311 95%, transparent 100%)",
        }}
      />  

      {/* The inner background */}
      <div className="relative z-10 backdrop-blur-sm rounded-full h-full w-full flex items-center justify-center overflow-hidden">
        {/* The synced inner glow */}
        <div
          className="absolute z-0 w-[400%] aspect-square top-1/2 left-1/2 origin-center animate-aurora-spin group-hover:animate-aurora-spin-fast opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(0,147,17,0.25) 0%, transparent 20%)",
          }}
        />

        {/* The Text */}
        <span className={`relative z-20 rounded-full bg-[#f1f4ef] px-5 py-1.5 text-meta font-semibold tracking-wide text-[#005e19] ${spanClassName}`}>
          {children}
        </span>
      </div>
    </div>
  );
}
