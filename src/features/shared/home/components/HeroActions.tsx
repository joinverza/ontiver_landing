import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { Link } from "react-router-dom";
import type { Audience } from "../../../../shared/lib/audience";

const HeroActions = ({
  audience,
  light = false,
  centered = false,
}: {
  audience: Audience;
  light?: boolean;
  centered?: boolean;
}) => {
  const primary = `button-primary ${light ? "button-on-dark" : ""}`;
  const secondary = `button-secondary ${light ? "button-quiet-on-dark" : ""}`;
  return (
    <div
      className={`hero-actions flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      {audience === "enterprise" ? (
        <>
          <Link to="/enterprise/contact" className={primary}>
            Get a Demo
            <ActionIcon size={17} />
          </Link>
          <Link to="/enterprise/platform" className={secondary}>
            Explore Platform
            <ActionIcon size={17} aria-hidden="true" />
          </Link>
        </>
      ) : (
        <>
          <Link to="/waitlist" className={primary}>
            Join the Waitlist
            <ActionIcon size={17} />
          </Link>
          <Link to="/how-it-works" className={secondary}>
            See How It Works
            <ActionIcon size={17} aria-hidden="true" />
          </Link>
        </>
      )}
    </div>
  );
};

export default HeroActions;
