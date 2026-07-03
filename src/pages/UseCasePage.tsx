import { useMemo, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import Text from "../components/base/Text";
import LinkArrow from "../components/ui/LinkArrow";
import MagneticFillButton from "../components/ui/MagneticFillButton";
import { useCasePageDetails } from "../data/useCases";

gsap.registerPlugin(ScrollTrigger);

export default function UseCasePage() {
  const rootRef = useRef<HTMLElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = id ? useCasePageDetails[id] : undefined;

  const relatedItems = useMemo(
    () =>
      detail
        ? Object.values(useCasePageDetails).filter((item) => item.id !== detail.id)
        : [],
    [detail],
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heroItems = gsap.utils.toArray<HTMLElement>("[data-usecase-hero]");
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-usecase-reveal]");

      gsap.fromTo(
        heroItems,
        { opacity: 0, y: 34, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      revealItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: index * 0.015,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [id] },
  );

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <main ref={rootRef} className="bg-bg-light text-[#06160f]">
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-70 [background-image:linear-gradient(rgba(0,147,17,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,147,17,0.045)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto grid w-[min(100%,1180px)] gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div data-usecase-hero>
            <p className="mb-4 w-fit rounded-full border border-[#009311]/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#009311]">
              {detail.eyebrow}
            </p>
            <h1 className="max-w-[10ch] text-5xl font-semibold leading-[0.98] tracking-normal text-[#06160f] sm:text-6xl lg:text-7xl">
              {detail.headline}
            </h1>
            <p className="mt-5 max-w-[560px] text-sm leading-relaxed text-black/60 sm:text-base">
              {detail.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticFillButton
                variant="green"
                className="h-12 rounded-lg px-6 text-sm font-semibold"
                onClick={() => navigate("/#join")}
              >
                Join Waitlist
              </MagneticFillButton>
              <LinkArrow href="/pricing" className="[--link-arrow-min-width:180px]">
                View plans
              </LinkArrow>
            </div>
          </div>

          <div
            data-usecase-hero
            className="group relative overflow-hidden rounded-3xl border border-[#009311]/15 bg-[#f4f8f5] p-2 shadow-[0_24px_70px_rgba(0,41,27,0.12)]"
          >
            <div className="aspect-[16/11] overflow-hidden rounded-[20px]">
              <img
                src={detail.imageUrl}
                alt={detail.eyebrow}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid w-[min(100%,1080px)] gap-4 sm:grid-cols-3">
          {detail.stats.map((stat) => (
            <article
              key={stat.label}
              data-usecase-reveal
              className="rounded-2xl border border-[#009311]/15 bg-white p-5"
            >
              <p className="text-4xl font-semibold text-[#009311]">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/55">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-18">
        <div className="mx-auto grid w-[min(100%,1080px)] gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div data-usecase-reveal>
            <Text
              btext="Workflow"
              heading="A consent-first path from onboarding to reuse."
              animate={false}
              containerClassName="items-start pb-0 text-left"
              badgeWrapperClassName="!mx-0"
              badgeTextClassName="border border-black/20"
              headingClassName="!mx-0 !text-left"
            />
          </div>
          <div className="grid gap-3">
            {detail.workflow.map((step, index) => (
              <article
                key={step.title}
                data-usecase-reveal
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#009311]">
                  Step {index + 1}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-[#06160f]">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-black/55">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div
          data-usecase-reveal
          className="mx-auto grid w-[min(100%,1080px)] gap-8 rounded-3xl bg-[#06160f] p-6 text-white sm:p-8 lg:grid-cols-[0.8fr_1fr]"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
              Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              Built to keep trust moving.
            </h2>
          </div>
          <div className="grid gap-3">
            {detail.outcomes.map((outcome) => (
              <p
                key={outcome}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75"
              >
                {outcome}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 sm:px-6 sm:pb-24">
        <div className="mx-auto w-[min(100%,1080px)]">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[#06160f]">
              Related use cases
            </h2>
            <LinkArrow href="/#cases" className="[--link-arrow-min-width:170px]">
              All cases
            </LinkArrow>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedItems.slice(0, 3).map((item) => (
              <article
                key={item.id}
                data-usecase-reveal
                className="rounded-2xl border border-[#009311]/15 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#009311]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-[#06160f]">
                  {item.headline}
                </h3>
                <LinkArrow
                  href={`/use-cases/${item.id}`}
                  className="mt-6 [--link-arrow-min-width:180px]"
                >
                  Explore
                </LinkArrow>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CurtainFooter />
    </main>
  );
}
