import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Footer from "../components/sections/Footer/Footer";
import { BusinessPhoto } from "../components/business/BusinessPhoto";
import { platformImages } from "../components/business/businessImages";
import { platformLayers } from "../data/platform";

export default function PlatformPage() {
  const { id } = useParams();
  const layer = platformLayers.find((item) => item.id === id);
  if (!layer) return <Navigate to="/enterprise/platform" replace />;
  const relatedLayers = platformLayers.filter((item) => layer.relatedIds.includes(item.id));

  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <Link to="/enterprise/platform" className="mb-8 inline-flex items-center gap-2 text-sm text-[#526058] hover:text-[#007d21]">
            <ArrowLeft size={16} aria-hidden="true" /> Explore the platform
          </Link>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div data-scroll-reveal className="min-w-0">
              <p className="eyebrow">Ontiver {layer.title}</p>
              <h1 className="mt-5 text-page-hero font-normal [overflow-wrap:anywhere]">{layer.headline}</h1>
              <p className="mt-6 max-w-xl text-subtitle text-[#526058]">{layer.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/enterprise/contact" className="button-primary">See This Layer in a Demo <ArrowUpRight size={17} aria-hidden="true" /></Link>
                <a href="#capabilities" className="button-secondary">Explore capabilities</a>
              </div>
            </div>
            <div data-scroll-reveal className="h-[260px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]"><BusinessPhoto image={platformImages[layer.id]} priority /></div>
          </div>
        </div>
      </section>

      <nav aria-label="Platform layers" className="border-y border-[#e2e9df] bg-white">
        <div className="site-container flex flex-wrap gap-x-6 gap-y-1 py-5">
          {platformLayers.map((item) => (
            <Link key={item.id} to={`/enterprise/platform/${item.id}`} aria-current={item.id === layer.id ? "page" : undefined} className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${item.id === layer.id ? "bg-[#edf5eb] text-[#007d21]" : "text-[#526058] hover:bg-[#f7f9f6] hover:text-[#007d21]"}`}>
              {item.title}
            </Link>
          ))}
        </div>
      </nav>

      <section id="capabilities" className="section-space scroll-mt-28">
        <div className="site-container grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <div data-scroll-reveal>
            <p className="eyebrow">The building blocks</p>
            <h2 className="section-heading mt-5">What this layer<br />connects.</h2>
            <p className="mt-6 text-body text-[#526058]">{layer.overview}</p>
          </div>
          <div data-scroll-reveal className="border-t border-[#dde6dc]">
              {layer.capabilities.map((capability) => (
                <details key={capability.title} className="group border-b border-[#dde6dc] py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-card-title font-medium [&::-webkit-details-marker]:hidden">{capability.title}<Plus size={20} className="shrink-0 text-[#007d21] transition-transform group-open:rotate-45" aria-hidden="true" /></summary>
                  <p className="pt-4 text-body text-[#526058]">{capability.description}</p>
                </details>
              ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f7f8f5]">
        <div className="site-container">
          <h2 data-scroll-reveal className="section-heading max-w-3xl">How it comes together.</h2>
          <ol className={`mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 ${layer.workflow.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {layer.workflow.map((step, index) => <li data-scroll-reveal key={step.title} className="min-w-0 border-t border-[#cfdacb] pt-4"><span className="text-meta font-medium text-[#007d21]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 text-card-title font-medium">{step.title}</h3><p className="mt-3 text-body text-[#526058]">{step.description}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div data-scroll-reveal className="flex flex-wrap items-end justify-between gap-6 rounded-2xl bg-[#002d0e] p-6 text-white sm:p-9">
            <h2 className="section-heading max-w-[730px]">Build your verification journey.</h2><Link to="/enterprise/contact" className="button-primary !border-white !bg-white !text-[#002d0e] hover:!bg-[#edf5e7]">See This Layer in a Demo <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <nav aria-label="Related platform layers" className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            {relatedLayers.map((item) => <Link key={item.id} to={`/enterprise/platform/${item.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">{item.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
            <Link to="/enterprise/security" className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Security and trust<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </nav>
        </div>
      </section>
      <Footer audience="enterprise" />
    </main>
  );
}
