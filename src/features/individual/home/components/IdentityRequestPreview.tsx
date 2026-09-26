import { Clock3 } from "lucide-react";
import { imagery } from "../../../../shared/data/imagery";

const IdentityRequestPreview = () => (
  <figure className="identity-request-preview relative isolate overflow-hidden rounded-[24px] bg-[#edf5eb] px-5 py-6 sm:px-8">
    <img
      src={imagery.mobileApplication.src}
      alt=""
      width={imagery.mobileApplication.width}
      height={imagery.mobileApplication.height}
      fetchPriority="high"
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      style={{ objectPosition: imagery.mobileApplication.objectPosition }}
    />
    <div className="absolute inset-0 -z-10 bg-[#e8f2e4]/80" />
    <div className="request-device mx-auto max-w-[310px] rounded-[30px] border-[5px] border-[#002d0e] bg-white p-5 shadow-xl">
      <div aria-hidden="true" className="mx-auto mb-5 h-1 w-12 rounded-full bg-[#002d0e]/20" />
      <img src="/assets/logo.svg" alt="Ontiver" className="h-5 w-auto" />
      <div className="mt-5 flex items-center gap-2 text-meta text-[#76551b]">
        <Clock3 size={16} aria-hidden="true" />
        Pending request
      </div>
      <p className="mt-3 text-card-title font-medium">You choose what to share.</p>
      <dl className="mt-4 space-y-3 text-meta">
        <div>
          <dt className="text-[#526058]">Who is asking</dt>
          <dd className="mt-1 font-medium">Example employer</dd>
        </div>
        <div>
          <dt className="text-[#526058]">Purpose</dt>
          <dd className="mt-1 font-medium">Confirm your identity for a new role</dd>
        </div>
        <div>
          <dt className="text-[#526058]">Requested claims</dt>
          <dd className="mt-1 font-medium">Name · Identity proof status</dd>
        </div>
      </dl>
      <div className="mt-5 rounded-full bg-[#002d0e] px-4 py-3 text-center text-meta font-semibold text-white">
        Review request
      </div>
    </div>
    <figcaption className="mt-4 text-center text-meta text-[#002d0e]">
      Planned app preview · Example request
    </figcaption>
  </figure>
);

export default IdentityRequestPreview;
