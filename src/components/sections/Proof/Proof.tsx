import { ArrowUpRight, BookOpen, Fingerprint, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { certificationProof, customerProof, isPublishedMetricResult, isPublishedProof, pilotMetrics, recognitionProof } from "../../../data/proof";
import type { Audience } from "../../../lib/audience";

export function PartnerStrip() {
  const partners = customerProof.filter(isPublishedProof);
  return (
    <section aria-label="Pilot partners" className="border-y border-[#002d0e]/10 bg-white py-7 sm:py-9">
      <div className="site-container">
        {partners.length ? <><p className="mb-6 text-center text-meta font-semibold uppercase tracking-widest text-[#002d0e]/60">Building reusable trust together</p><div tabIndex={0} aria-label="Customer logos; scroll horizontally to explore" className="flex snap-x items-center gap-12 overflow-x-auto pb-3">{partners.map(partner => <a key={partner.name} href={partner.href} className="flex min-w-40 shrink-0 snap-start justify-center"><img src={partner.logo} alt={partner.name} loading="lazy" className="h-10 max-w-40 object-contain" /></a>)}</div></> : <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"><span className="eyebrow shrink-0"><span className="size-2 rounded-full bg-[#007d21]" />Pilot programme</span><p className="max-w-[560px] text-sm leading-relaxed text-[#002d0e]/60">Preparing our first pilots. Partner announcements will appear here as collaborations are confirmed.</p><Link to="/enterprise/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">Explore a pilot<ArrowUpRight size={16} /></Link></div>}
      </div>
    </section>
  );
}

export function EvidenceCards({ audience }: { audience: Audience }) {
  const recognition = recognitionProof.filter(isPublishedProof);
  const items = [
    { label: "The platform", title: "One identity. More possibilities.", description: "Explore the layers behind verification, consent, and reusable proof.", href: "/enterprise#features", action: "Explore the platform", Icon: Fingerprint },
    { label: "Privacy & control", title: "Trust starts with your permission.", description: "See how purpose, consent, and controlled sharing shape Ontiver.", href: "/security", action: "Our approach to privacy", Icon: ShieldCheck },
    { label: "Identity explained", title: "Understand what you share.", description: "A practical introduction to identity proof and why reuse matters.", href: "/blogs/why-identity-verification-should-be-reusable", action: "Read the guide", Icon: BookOpen },
  ];
  return (
    <section aria-label={recognition.length ? "Independent recognition" : "Explore Ontiver"} className="section-space bg-[#f7f9f5]">
      <div className="site-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">A closer look</p><h2 className="section-heading mt-4">{audience === "enterprise" ? "Get to know your trust layer." : "A little clarity. A lot more control."}</h2></div></div>
        <div className="grid gap-5 md:grid-cols-3">{recognition.length ? recognition.map(item => <a href={item.evidenceUrl} key={item.name} className="surface-card flex flex-col items-start gap-7"><img src={item.logo} alt="" className="h-12 max-w-40 object-contain" /><h3 className="text-card-title font-semibold">{item.name}</h3><span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">Read the report<ArrowUpRight size={17} /></span></a>) : items.map(({ label, title, description, href, action, Icon }) => <Link data-scroll-reveal to={href} key={label} className="surface-card group flex flex-col items-start transition-colors hover:border-[#007d21]/40"><div className="flex w-full items-center justify-between gap-4"><span className="text-meta font-semibold uppercase tracking-widest text-[#002d0e]/60">{label}</span><Icon size={25} strokeWidth={1.5} className="text-[#007d21]" /></div><h3 className="mt-8 max-w-[260px] text-card-title font-semibold">{title}</h3><p className="mb-8 mt-3 text-body text-[#002d0e]/65">{description}</p><span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">{action}<ArrowUpRight size={16} /></span></Link>)}</div>
      </div>
    </section>
  );
}

export function CertificationStrip() {
  const certifications = certificationProof.filter(isPublishedProof);
  return (
    <section aria-label="Security documentation" className="border-y border-[#002d0e]/10 bg-white py-8">
      <div className="site-container">{certifications.length ? <div className="flex flex-wrap items-center justify-center gap-10">{certifications.map(item => <a href={item.evidenceUrl} key={item.name} aria-label={`View ${item.name} certification`}><img src={item.logo} alt={item.name} loading="lazy" className="h-14 max-w-36 object-contain" /></a>)}</div> : <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-[#007d21]" size={24} strokeWidth={1.5} /><div><p className="text-body font-semibold">Start with a closer look at our approach.</p><p className="mt-1 text-sm text-[#002d0e]/60">Review consent, data handling, and the questions to bring to a security review.</p></div></div><Link className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#007d21]" to="/security">Visit the trust centre<ArrowUpRight size={17} /></Link></div>}</div>
    </section>
  );
}

export function PilotResults() {
  return (
    <section id="pilot-results" className="section-space bg-[#edf5eb]">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="eyebrow">Pilot measurement</p><h2 className="section-heading mt-4 max-w-[540px]">Real progress deserves real proof.</h2></div><p className="max-w-[490px] text-subtitle text-[#002d0e]/65 lg:ml-auto">Ontiver is preparing its first pilots. These are the outcomes we plan to measure; results will be published after validation.</p></div>
        <dl className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">{pilotMetrics.map(metric => {
          const result = isPublishedMetricResult(metric.result) ? metric.result : null;
          return <div data-scroll-reveal key={metric.id} className="flex flex-col border-t border-[#002d0e]/20 pt-6"><dt className="text-card-title font-semibold">{metric.label}</dt><dd className="order-first mb-5 text-hero font-semibold text-[#007d21]">{result ? result.value : <span aria-label="Result pending">—</span>}</dd><dd className="mt-3 text-body text-[#002d0e]/65">{metric.description}</dd><dd className="mt-5 text-meta font-medium text-[#002d0e]/55">{result ? <a className="underline underline-offset-4" href={result.evidenceUrl}>{result.context}</a> : "Awaiting pilot results"}</dd></div>;
        })}</dl>
      </div>
    </section>
  );
}
