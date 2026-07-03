import Odometer from "../ui/Odometer";
import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseStatsStripProps = {
  accent: string;
  stats: UseCasePageDetail["stats"];
};

export default function UseCaseStatsStrip({
  accent,
  stats,
}: UseCaseStatsStripProps) {
  return (
    <section
      data-stats-strip
      className="border-t bg-white px-5 py-8 sm:px-6"
      style={{ borderColor: accent }}
    >
      <div className="mx-auto grid w-[min(100%,1120px)] gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <article
            key={stat.label}
            data-stat-card
            className={`px-0 py-5 sm:px-6 ${
              index > 0
                ? "border-t border-black/10 sm:border-l sm:border-t-0"
                : ""
            }`}
          >
            <p
              data-stat-value
              className="flex items-baseline text-4xl font-semibold text-[#06160f]"
            >
              {stat.prefix ? <span>{stat.prefix}</span> : null}
              <Odometer value={stat.value} />
              {stat.suffix ? <span>{stat.suffix}</span> : null}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
