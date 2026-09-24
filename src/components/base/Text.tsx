import type { ReactNode } from "react";
import AuroraBadge from "../ui/AuroraBadge";

type TextProps = {
  btext: ReactNode;
  heading: string;
  className?: string;
  badgeClassName?: string;
  badgeTextClassName?: string;
  badgeWrapperClassName?: string;
  headingClassName?: string;
  containerClassName?: string;
  color?: string;
  animate?: boolean;
};

export default function Text({ btext, heading, className = "", badgeClassName = "", badgeTextClassName = "", badgeWrapperClassName = "", headingClassName = "", containerClassName = "", color, animate = true }: TextProps) {
  return <div data-scroll-reveal={animate || undefined} className={`flex w-full flex-col gap-5 pb-12 ${containerClassName}`}>
    {btext ? <div className={`mx-auto w-fit ${badgeWrapperClassName}`}><AuroraBadge className={badgeClassName} spanClassName={badgeTextClassName}>{btext}</AuroraBadge></div> : null}
    <h2 style={color ? { color } : undefined} className={`section-heading mx-auto max-w-[720px] text-center ${className} ${headingClassName}`}>{heading}</h2>
  </div>;
}
