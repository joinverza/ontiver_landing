import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { imagery, type EditorialImage } from "../../data/imagery";
import { BusinessPhoto } from "../media/BusinessPhoto";

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
    <section className="section-space bg-white">
      <div className="site-container">
        <div
          data-media-reveal
          className="grid items-stretch overflow-hidden rounded-[24px] bg-[#002d0e] lg:grid-cols-[1.05fr_.95fr]"
        >
          <div className="self-center p-6 text-white sm:p-10">
            <p className="text-meta font-semibold uppercase tracking-wider text-[#c7e6b5]">
              Your next step
            </p>
            <h2 className="section-heading mt-3">{title}</h2>
            <p className="mt-4 max-w-lg text-body text-white/75">
              {to.startsWith("/enterprise")
                ? "Bring one onboarding challenge. Together, we can map the evidence, consent, and review steps for a focused pilot."
                : "Get updates on the planned identity wallet, where every request starts with your choice about what to share."}
            </p>
            <Link
              to={to}
              className="button-primary mt-6 !bg-white !text-[#002d0e] hover:!bg-[#e1ecd9]"
            >
              {label}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          {visual ? (
            <div className="min-w-0 bg-[#edf5eb] p-4 sm:p-6">{visual}</div>
          ) : (
            <div className="relative min-h-[240px] overflow-hidden max-lg:aspect-[16/10]">
              <BusinessPhoto image={photo} className="absolute inset-0" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoCTA;
