import { imagery } from "../../../../shared/data/imagery";

const IdentityRequestPreview = () => (
  <figure className="identity-request-preview relative isolate aspect-[1.08] min-h-[330px] overflow-hidden rounded-[24px] bg-[#edf5eb] sm:aspect-[1.12] lg:min-h-[480px]">
    <img
      src={imagery.individualHero.src}
      alt={imagery.individualHero.alt}
      width={imagery.individualHero.width}
      height={imagery.individualHero.height}
      fetchPriority="high"
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      style={{ objectPosition: imagery.individualHero.objectPosition }}
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#002d0e]/90 via-[#002d0e]/10 to-transparent" />
    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
      <p className="text-meta font-semibold uppercase text-[#d7ebc8]">Consent-first identity</p>
      <h2 className="mt-3 max-w-[15ch] text-card-title font-medium sm:text-section">
        You choose what to share.
      </h2>
      <p className="mt-2 max-w-md text-sm text-white/85 sm:text-body">
        Review each request, understand its purpose, and approve only the claims you choose.
      </p>
    </figcaption>
  </figure>
);

export default IdentityRequestPreview;
