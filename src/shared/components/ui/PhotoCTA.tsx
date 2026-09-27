import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { imagery, type EditorialImage } from "../../data/imagery";

const PhotoCTA = ({
  title,
  label,
  to,
  image,
  visual,
}: {
  title: string;
  label: string;
  to: string;
  image?: EditorialImage;
  visual?: ReactNode;
}) => {
  const photo = image ?? imagery.work;
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="site-container">
        <div
          data-media-reveal
          className={`relative overflow-hidden rounded-[24px] bg-[#002d0e] ${visual ? "grid items-stretch lg:grid-cols-[1.05fr_.95fr]" : ""}`}
        >
          {!visual && (
            <>
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: photo.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#002d0e]/95 via-[#002d0e]/85 to-[#002d0e]/20" />
            </>
          )}
          <div className="relative max-w-[850px] p-6 text-white sm:p-10">
            <h2 className="section-heading">{title}</h2>
            <Link
              to={to}
              className="button-primary mt-6 !bg-white !text-[#002d0e] hover:!bg-[#e1ecd9]"
            >
              {label}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          {visual ? <div className="min-w-0 bg-[#edf5eb] p-4 sm:p-6">{visual}</div> : null}
        </div>
      </div>
    </section>
  );
};

export default PhotoCTA;
