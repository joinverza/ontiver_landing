import type { CSSProperties } from "react";
import "./article-social.css";

type PlatformIconProps = {
  label: string;
  href: string;
  icon: string;
  showLabel?: boolean;
};

const PlatformIcon = ({ label, href, icon, showLabel = false }: PlatformIconProps) => {
  return (
    <a
      className={`article-social-link${showLabel ? " article-social-link--labelled" : ""}`}
      aria-label={label}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span
        className="article-social-mark"
        style={{ "--platform-icon": `url("${icon}")` } as CSSProperties}
        aria-hidden="true"
      />
      {showLabel && <span className="article-social-label">{label}</span>}
    </a>
  );
};

export default PlatformIcon;
