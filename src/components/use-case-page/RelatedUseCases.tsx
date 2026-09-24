import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { UseCasePageDetail } from "../../data/useCases";
import { getImageAlt, getImagePosition } from "../../data/imagery";

export default function RelatedUseCases({ items }: { items: UseCasePageDetail[] }) {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <div data-scroll-reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">Explore other workflows</p><h2 className="mt-5 text-section font-semibold tracking-[-0.035em]">Trust, across industries.</h2></div>
          <Link to="/enterprise#cases" className="inline-flex items-center gap-2 text-body font-medium text-[#007d21]">All use cases<ArrowUpRight size={18} /></Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <Link data-scroll-reveal key={item.id} to={`/enterprise/use-cases/${item.id}`} className="group block">
              <div className="overflow-hidden rounded-[24px] bg-[#edf5eb]"><img src={item.imageUrl} alt={getImageAlt(item.imageUrl)} loading="lazy" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: getImagePosition(item.imageUrl) }} /></div>
              <div className="mt-6 flex items-center justify-between gap-3"><h3 className="text-card-title font-semibold group-hover:text-[#007d21]">{item.heroTitle}</h3><ArrowUpRight size={21} className="shrink-0 text-[#007d21]" /></div>
              <p className="mt-3 text-body text-[#637060]">{item.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
