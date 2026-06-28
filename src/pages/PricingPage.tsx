import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PricingFAQ from "../components/faq";
import PlanComparisonTable from "../components/pricing/PlanComparisonTable";
import PricingCard from "../components/pricing/PricingCard";
import PricingHero from "../components/pricing/PricingHero";
import Calculator from "../components/sections/Calculator/Calculator";
import Footer from "../components/sections/Footer/Footer";
import PlanSection from "../components/sections/Plan/Plan";
import { formatPrice } from "../lib/pricing";
import { pricingPlans, type BillingCycle } from "../data/pricing";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const saveBadgeRef = useRef<HTMLSpanElement>(null);

  const setBilling = (next: BillingCycle) => {
    if (next === billingCycle) return;
    const root = pageRef.current;
    if (!root) {
      setBillingCycle(next);
      return;
    }

    root.querySelectorAll<HTMLElement>(".pricing-price").forEach((priceEl) => {
      if (priceEl.dataset.custom === "true") return;

      const from = Number(priceEl.textContent?.replace(/[$,]/g, "") || 0);
      const to = Number(next === "annual" ? priceEl.dataset.annual : priceEl.dataset.monthly);
      const counter = { val: from };

      gsap.to(counter, {
        val: to,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          priceEl.textContent = formatPrice(counter.val);
        },
      });
    });

    if (next === "annual" && saveBadgeRef.current) {
      gsap.fromTo(
        saveBadgeRef.current,
        { scale: 0.82, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" }
      );
    }

    setBillingCycle(next);
  };

  useGSAP(
    () => {
      const cardsRoot = cardsRef.current;
      const table = tableRef.current;
      if (!cardsRoot || !table) return;

      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      const growthCard = cards.find((card) => card.dataset.highlighted === "true");
      const orderedCards = [...cards.filter((card) => card !== growthCard), growthCard].filter(Boolean) as HTMLElement[];
      const priceEls = gsap.utils.toArray<HTMLElement>(".pricing-price");
      const hoverCleanups: Array<() => void> = [];

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(".pricing-feature", { opacity: 0, yPercent: 100 });

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRoot,
          start: "top 75%",
          once: true,
        },
      });

      cardTl.to(orderedCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });

      if (growthCard) {
        cardTl.fromTo(
          growthCard.querySelector(".growth-ring"),
          { scale: 1, opacity: 0.5 },
          { scale: 1.04, opacity: 0, duration: 0.8, ease: "power2.out" },
          ">-0.1"
        );
      }

      cards.forEach((card) => {
        cardTl.to(
          card.querySelectorAll(".pricing-feature"),
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
          },
          "<0.2"
        );

        card.querySelectorAll<HTMLElement>(".feature-count").forEach((el) => {
          const target = Number(el.dataset.value || 0);
          const counter = { val: 0 };
          cardTl.to(
            counter,
            {
              val: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(counter.val).toLocaleString();
              },
            },
            "<"
          );
        });
      });

      const priceBreathing = gsap.to(priceEls, {
        opacity: 0.85,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
        ease: "sine.inOut",
      });

      cards.forEach((card) => {
        const isGrowth = card.dataset.highlighted === "true";
        const ctaText = card.querySelector(".pricing-cta-text");
        const price = card.querySelector(".pricing-price");

        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            borderColor: isGrowth ? "rgba(0,147,17,0.45)" : "rgba(0,147,17,0.3)",
            boxShadow: isGrowth ? "0 0 0 1.5px rgba(0,147,17,0.32)" : "none",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(price, { opacity: 1, duration: 0.12, overwrite: "auto" });
          gsap.to(ctaText, { x: 2, duration: 0.15, ease: "power2.out" });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            borderColor: isGrowth ? "rgba(0,147,17,0.4)" : "rgba(0,41,27,0.15)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(ctaText, { x: 0, duration: 0.15, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      gsap.fromTo(
        table,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: table,
            start: "top 82%",
            once: true,
          },
        }
      );

      table.querySelectorAll<HTMLElement>("[data-comparison-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
            onComplete: () => {
              gsap.fromTo(
                row.querySelectorAll("[data-comparison-check]"),
                { scale: 0 },
                { scale: 1, duration: 0.32, ease: "back.out(2)", stagger: 0.03 }
              );
            },
          }
        );
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
        priceBreathing.kill();
      };
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="bg-bg-light text-black">
      <main>
        <PricingHero
          billingCycle={billingCycle}
          saveBadgeRef={saveBadgeRef}
          onBillingChange={setBilling}
        />

        <section ref={cardsRef} className="px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-[1440px] snap-x grid-flow-col auto-cols-[minmax(min(88vw,330px),1fr)] gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:auto-cols-[calc((100%-32px)/3)] lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible lg:pb-0 xl:gap-5">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </section>

        <PlanSection />

        <PlanComparisonTable tableRef={tableRef} />

        <Calculator />
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
}
