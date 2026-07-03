import LinkArrow from "../ui/LinkArrow";
import type { UseCasePageDetail } from "../../data/useCases";

type RelatedUseCasesProps = {
  items: UseCasePageDetail[];
};

export default function RelatedUseCases({ items }: RelatedUseCasesProps) {
  return (
    <section data-related-section className="px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-[min(100%,1120px)]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/40">
            Also built for
          </p>
          <LinkArrow href="/#cases" className="[--link-arrow-min-width:170px]">
            All cases
          </LinkArrow>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <article
              key={item.id}
              data-related-card
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#06160f]">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#009311]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight">
                  {item.heroTitle}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/55">
                  {item.tagline}
                </p>
                <LinkArrow
                  href={`/use-cases/${item.id}`}
                  className="mt-6 [--link-arrow-min-width:160px]"
                >
                  Explore
                </LinkArrow>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
