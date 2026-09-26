import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  certificationProof,
  customerProof,
  isPublishedMetricResult,
  isPublishedProof,
  pilotMetrics,
  recognitionProof,
} from "../../../../shared/data/proof";
import type { Audience } from "../../../../shared/lib/audience";

export const PartnerStrip = ({ audience = "enterprise" }: { audience?: Audience }) => {
  const partners = customerProof.filter(isPublishedProof);
  return (
    <section
      aria-label="Pilot partners"
      className="border-y border-[#002d0e]/10 bg-white py-7 sm:py-9"
    >
      <div className="site-container">
        {partners.length ? (
          <>
            <p className="mb-6 text-center text-meta font-semibold uppercase tracking-widest text-[#002d0e]/60">
              Building reusable trust together
            </p>
            <div
              tabIndex={0}
              aria-label="Customer logos; scroll horizontally to explore"
              className="flex snap-x items-center gap-12 overflow-x-auto pb-3"
            >
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  className="flex min-w-40 shrink-0 snap-start justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="h-10 max-w-40 object-contain"
                  />
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-[790px]">
              <p className="eyebrow">
                <span className="size-2 rounded-full bg-[#007d21]" />
                Preparing our first pilots
              </p>
              <p className="mt-3 text-body text-[#526058]">
                We're building Ontiver's first partner workflows now. Join the waitlist to be
                notified as supported businesses go live.
              </p>
            </div>
            <Link
              to={audience === "enterprise" ? "/enterprise/contact" : "/waitlist"}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold"
            >
              {audience === "enterprise" ? "Explore a pilot" : "Join the Waitlist"}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export const EvidenceCards = ({ audience }: { audience: Audience }) => {
  const recognition = recognitionProof.filter(isPublishedProof);
  if (!recognition.length) return null;
  return (
    <section aria-label="Independent recognition" className="section-space bg-[#f7f9f5]">
      <div className="site-container">
        <div className="mb-9">
          <p className="eyebrow">Independent recognition</p>
          <h2 className="section-heading mt-4">
            {audience === "enterprise" ? "Trust, backed by evidence." : "Trusted by early partners"}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {recognition.map((item) => (
            <a
              href={item.evidenceUrl}
              key={item.name}
              className="surface-card flex flex-col items-start gap-6"
            >
              <img src={item.logo} alt="" className="h-12 max-w-40 object-contain" />
              <h3 className="text-card-title font-semibold">{item.name}</h3>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
                Read the report
                <ArrowUpRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CertificationStrip = () => {
  const certifications = certificationProof.filter(isPublishedProof);
  if (!certifications.length) return null;
  return (
    <section
      aria-label="Security documentation"
      className="border-y border-[#002d0e]/10 bg-white py-8"
    >
      <div className="site-container flex flex-wrap items-center justify-center gap-10">
        {certifications.map((item) => (
          <a href={item.evidenceUrl} key={item.name} aria-label={`View ${item.name} certification`}>
            <img
              src={item.logo}
              alt={item.name}
              loading="lazy"
              className="h-14 max-w-36 object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export const PilotResults = () => {
  return (
    <section id="pilot-results" className="bg-[#edf5eb] py-12 sm:py-16">
      <div className="site-container">
        <p className="eyebrow">Pilot results</p>
        <h2 className="section-heading mt-4">How Ontiver performs</h2>
        <p className="mt-3 text-body text-[#526058]">Results coming soon.</p>
        <dl className="mt-6 grid gap-7 sm:grid-cols-3 sm:gap-10">
          {pilotMetrics.map((metric) => {
            const result = isPublishedMetricResult(metric.result) ? metric.result : null;
            return (
              <div
                data-scroll-reveal
                key={metric.id}
                className="flex flex-col border-t border-[#002d0e]/20 pt-4"
              >
                <dt className="text-card-title font-semibold">{metric.label}</dt>
                <dd className="order-first mb-2 text-section font-semibold text-[#007d21]">
                  {result ? result.value : <span aria-label="Result pending">—</span>}
                </dd>
                <dd className="mt-2 text-meta font-medium text-[#002d0e]/55">
                  {result ? (
                    <a className="underline underline-offset-4" href={result.evidenceUrl}>
                      {result.context}
                    </a>
                  ) : (
                    "Results pending"
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
