import type { ComponentProps } from "react";
import responsivePhotos from "../../data/responsivePhotos.json";

type SiteImageProps = Omit<
  ComponentProps<"img">,
  "srcSet" | "sizes" | "loading" | "decoding" | "fetchPriority"
> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
};

const responsiveWidths: Record<string, readonly number[]> = responsivePhotos;

export const SiteImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(min-width: 2400px) 2400px, 100vw",
  reveal = true,
  ...props
}: SiteImageProps) => {
  const widths = responsiveWidths[src];
  const srcSet = widths
    ? [
        ...widths.map(
          (size) =>
            `${src.replace("/assets/photos/", "/assets/photos/responsive/").replace(/\.webp$/, `-${size}.webp`)} ${size}w`,
        ),
        `${src} ${width}w`,
      ].join(", ")
    : undefined;

  return (
    <img
      {...props}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? `${priority ? "" : "auto, "}${sizes}` : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      data-media-reveal={reveal ? "" : undefined}
    />
  );
};
