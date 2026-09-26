import { useLocation, useNavigate } from "react-router-dom";
import { getAudienceFromPath, getAudienceSwitchPath, type Audience } from "../../lib/audience";
import "./navigation-motion.css";

type AudienceToggleProps = {
  className?: string;
  compact?: boolean;
};

const audiences: Audience[] = ["individual", "enterprise"];

const AudienceToggle = ({ className = "", compact = false }: AudienceToggleProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeAudience = getAudienceFromPath(pathname);

  const selectAudience = (audience: Audience) => {
    if (audience !== activeAudience) {
      navigate(getAudienceSwitchPath(pathname, audience));
    }
  };

  return (
    <div
      className={`audience-toggle inline-grid grid-cols-2 rounded-full border border-[#0a2818]/15 bg-white p-1 ${className}`}
      data-audience={activeAudience}
      role="group"
      aria-label="Choose website audience"
    >
      <span className="audience-toggle-indicator" aria-hidden="true" />
      {audiences.map((audience) => (
        <button
          key={audience}
          type="button"
          aria-pressed={audience === activeAudience}
          onClick={() => selectAudience(audience)}
          className={`audience-toggle-button relative cursor-pointer rounded-full font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009311] focus-visible:ring-offset-2 ${compact ? "px-3 py-2 text-meta" : "px-4 py-2 text-sm sm:px-5"}`}
        >
          {audience === "individual" ? "Individuals" : "Enterprise"}
        </button>
      ))}
    </div>
  );
};

export default AudienceToggle;
