import { useLocation, useNavigate } from "../lib/router";
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
      className={`inline-grid grid-cols-2 rounded-full border border-[#0a2818]/15 bg-white/75 p-1 shadow-sm backdrop-blur-md ${className}`}
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
              compact ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-xs sm:px-5 sm:text-sm"
            } ${
              selected
                ? "bg-gradient-to-r from-dark-primary to-light-primary text-white shadow-[0_5px_14px_rgba(0,147,17,0.24)]"
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
