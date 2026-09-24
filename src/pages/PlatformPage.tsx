import { ArrowLeft, ArrowUpRight, CircleCheck, ShieldCheck } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/sections/Footer/Footer";
import { platformLayers } from "../data/platform";

export default function PlatformPage() {
  const { id } = useParams();
  const layer = platformLayers.find((item) => item.id === id);
  if (!layer) return <Navigate to="/enterprise#features" replace />;
  const Icon = layer.icon;
  const relatedLayers = platformLayers.filter((item) => layer.relatedIds.includes(item.id));

  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <Link to="/enterprise#features" className="mb-9 inline-flex items-center gap-2 text-sm font-medium text-[#526058] hover:text-[#007d21]">
            <ArrowLeft size={16} aria-hidden="true" /> Explore the platform
          </Link>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="eyebrow"><Icon size={16} aria-hidden="true" /> {layer.title}</p>
              <h1 className="mt-5 max-w-[15ch] text-page-hero font-semibold">{layer.headline}</h1>
              <p className="mt-6 max-w-xl text-subtitle text-[#526058]">{layer.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/enterprise/contact" className="button-primary">Request a demo <ArrowUpRight size={17} aria-hidden="true" /></Link>
                <a href="#capabilities" className="button-secondary">Explore capabilities</a>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#d8e4d5] bg-white p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-3 border-b border-[#e2e9df] pb-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf5eb] text-[#007d21]"><Icon size={21} aria-hidden="true" /></span>
                <div>
                  <p className="text-meta font-semibold uppercase tracking-[0.08em] text-[#526058]">Workflow outline</p>
                  <p className="mt-1 text-body font-semibold">How this layer works</p>
                </div>
              </div>
              <ol>
                {layer.workflow.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
                    {index < layer.workflow.length - 1 ? <span className="absolute bottom-0 left-[17px] top-9 w-px bg-[#d8e4d5]" aria-hidden="true" /> : null}
                    <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-[#d8e4d5] bg-[#f7f9f6] text-meta font-semibold text-[#007d21]">{index + 1}</span>
                    <div className="pt-1"><h2 className="text-body font-semibold">{step.title}</h2><p className="mt-1 text-sm leading-relaxed text-[#526058]">{step.description}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Platform layers" className="border-b border-[#e2e9df] bg-white">
        <div className="site-container flex flex-wrap gap-x-6 gap-y-1 py-5">
          {platformLayers.map((item) => (
            <Link key={item.id} to={`/enterprise/platform/${item.id}`} aria-current={item.id === layer.id ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${item.id === layer.id ? "bg-[#edf5eb] text-[#007d21]" : "text-[#526058] hover:bg-[#f7f9f6] hover:text-[#007d21]"}`}>
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <section id="capabilities" className="section-space">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-20">
            <div><p className="eyebrow">The building blocks</p><h2 className="section-heading mt-4 max-w-lg">{layer.title}, connected to your workflow.</h2></div>
            <p className="text-subtitle text-[#526058] lg:pt-9">{layer.overview}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {layer.capabilities.map((capability) => (
              <article key={capability.title} className="surface-card">
                <CircleCheck className="mb-6 size-6 text-[#007d21]" aria-hidden="true" />
                <h3 className="text-card-title font-semibold">{capability.title}</h3>
                <p className="mt-3 max-w-lg text-body text-[#526058]">{capability.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[#f7f9f6] p-6 sm:p-7">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
            <p className="text-body text-[#526058]">{layer.boundary}</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f7f9f6]">
        <div className="site-container">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">One connected platform</p><h2 className="section-heading mt-4">Keep building.</h2></div>
            <Link to="/security" className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Our approach to trust <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {relatedLayers.map((item) => {
              const RelatedIcon = item.icon;
              return <Link key={item.id} to={`/enterprise/platform/${item.id}`} className="surface-card group block transition-colors hover:border-[#9bbb99]"><RelatedIcon className="mb-7 size-7 text-[#007d21]" aria-hidden="true" /><div className="flex items-start justify-between gap-5"><h3 className="text-card-title font-semibold">{item.title}</h3><ArrowUpRight size={22} className="shrink-0 text-[#007d21]" aria-hidden="true" /></div><p className="mt-3 text-body text-[#526058]">{item.description}</p></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[28px] bg-[#002d0e] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div><h2 className="section-heading max-w-xl">Build the right verification journey.</h2><p className="mt-4 max-w-xl text-subtitle text-white/75">Map your sources, checks, and review process with the Ontiver team.</p></div>
            <Link to="/enterprise/contact" className="button-primary shrink-0 !border-white !bg-white !text-[#002d0e] hover:!bg-[#edf5eb]">Request a demo <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <Footer audience="enterprise" />
    </main>
  );
}
