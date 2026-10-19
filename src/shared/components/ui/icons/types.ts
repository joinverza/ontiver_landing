import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from "react";

export type IconProps = ComponentPropsWithoutRef<"svg"> & {
  size?: number | string;
};

export type OntiverIcon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
