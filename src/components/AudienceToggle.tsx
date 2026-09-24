import { useLocation, useNavigate } from "react-router-dom";
import {
  getAudienceFromPath,
  getAudienceSwitchPath,
  type Audience,
} from "../lib/audience";

type AudienceToggleProps = {
  className?: string;
  compact?: boolean;
};

export default function AudienceToggle({
  className = "",
  compact = false,
}: AudienceToggleProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeAudience = getAudienceFromPath(pathname);

  const selectAudience = (audience: Audience) => {
    if (audience === activeAudience) return;
    navigate(getAudienceSwitchPath(pathname, audience));
  };

  return (
    <div
      className={`inline-grid grid-cols-2 rounded-full border border-[#0a2818]/10 bg-[#f1f5ef] p-1 ${className}`}
      role="group"
      aria-label="Choose website audience"
    >
      {(["individual", "enterprise"] as Audience[]).map((audience) => {
        const selected = audience === activeAudience;
        const label = audience === "individual" ? "Individuals" : "Enterprise";

        return (
          <button
            key={audience}
            type="button"
            aria-pressed={selected}
            onClick={() => selectAudience(audience)}
            className={`cursor-pointer rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009311] focus-visible:ring-offset-2 ${
              compact ? "px-3 py-2 text-meta" : "px-4 py-2 text-sm sm:px-5"
            } ${
              selected
                ? "bg-white text-[#007d21] shadow-sm"
                : "text-[#244438] hover:bg-[#e8f5ea] hover:text-[#006f1b]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
