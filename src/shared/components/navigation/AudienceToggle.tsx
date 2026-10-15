import { useLocation, useNavigate } from "react-router-dom";
import { getAudienceFromPath, getAudienceSwitchPath, type Audience } from "../../lib/audience";
import SlidingPill from "../ui/SlidingPill";

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
    <SlidingPill
      label="Choose website audience"
      value={activeAudience}
      onChange={selectAudience}
      options={audiences.map((audience) => ({
        value: audience,
        label: audience === "individual" ? "Individuals" : "Enterprise",
      }))}
      tone="soft"
      size={compact ? "compact" : "regular"}
      className={`audience-toggle ${className}`}
    />
  );
};

export default AudienceToggle;
