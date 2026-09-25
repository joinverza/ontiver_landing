import type { EditorialImage } from "../../data/imagery";

export function BusinessPhoto({ image, className = "", priority = false }: { image: EditorialImage; className?: string; priority?: boolean }) {
  return <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" className={`h-full w-full object-cover ${className}`} style={{ objectPosition: image.objectPosition }} />;
}

export function PhotoMosaic({ images, priority = false }: { images: readonly EditorialImage[]; priority?: boolean }) {
  return (
    <div className="grid aspect-[1.04] min-w-0 grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
      {images.slice(0, 3).map((image, index) => <div key={image.src} data-scroll-reveal className={`min-h-0 overflow-hidden rounded-2xl ${index === 2 ? "col-span-2" : ""}`}><BusinessPhoto image={image} priority={priority && index < 2} /></div>)}
    </div>
  );
}
