import type { UseCasePageDetail } from "../data/useCases";

const UseCaseCapabilities = ({ detail }: { detail: UseCasePageDetail }) => {
  return (
    <section className="section-space">
      <div className="site-container grid gap-9 lg:grid-cols-2 lg:gap-16">
        <div data-scroll-reveal className="min-w-0">
          <p className="eyebrow">Typical verified claims</p>
          <h2 className="mt-4 text-section font-normal">Relevant evidence.</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {detail.claims.map((claim) => (
              <li
                key={claim}
                className="max-w-full rounded-full border border-[#cfddc9] px-4 py-2 text-sm [overflow-wrap:anywhere]"
              >
                {claim}
              </li>
            ))}
          </ul>
        </div>
        <div data-scroll-reveal className="min-w-0 border-l-2 border-[#007d21] pl-6">
          <p className="eyebrow">Decision boundary</p>
          <h2 className="mt-4 text-section font-normal">Who decides.</h2>
          <p className="mt-6 text-subtitle text-[#526058]">{detail.boundary}</p>
        </div>
      </div>
    </section>
  );
};

export default UseCaseCapabilities;
