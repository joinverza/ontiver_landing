import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { faqGroups, individualFaqGroups } from "../data/faq";
import AuroraBadge from "./ui/AuroraBadge";

type PricingFAQProps = { variant?: "pricing" | "enterprise" | "individual" };

export default function PricingFAQ({ variant = "pricing" }: PricingFAQProps) {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const groups = variant === "individual"
    ? individualFaqGroups.filter((group) => group.group !== "Privacy & Access")
    : faqGroups.filter((group) => group.group === "Integration" || group.group === (variant === "enterprise" ? "Identity & Compliance" : "Pricing"));
  const currentGroup = groups[selectedGroup] ?? groups[0];
  const items = currentGroup.items.filter((_, index) => currentGroup.group === "Identity & Compliance" ? index !== 0 : currentGroup.group === "Integration" ? index !== 0 : currentGroup.group === "Pricing" ? index !== 2 : true).slice(0, 3);
  const heading = { pricing: "Pricing, explained.", enterprise: "Before you integrate.", individual: "Get to know Ontiver." }[variant];
  return (
    <section id="faq" className="section-space bg-[#f7f7f7]">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div data-scroll-reveal>
          <AuroraBadge>Frequently asked questions</AuroraBadge>
          <h2 className="section-heading mt-5">{heading}</h2>
          <Link to="/support" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]">Contact support<ArrowUpRight size={17} /></Link>
        </div>
        <div>
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Question categories">
            {groups.map((group, index) => <button key={group.group} type="button" aria-pressed={index === selectedGroup} onClick={() => setSelectedGroup(index)} className={`min-h-10 rounded-full border px-4 py-2 text-meta font-semibold transition-colors ${index === selectedGroup ? "border-[#002d0e] bg-[#002d0e] text-white" : "border-[#002d0e]/15 bg-white text-[#002d0e]/70 hover:border-[#007d21]"}`}>{group.group}</button>)}
          </div>
          <div className="divide-y divide-[#002d0e]/15 border-y border-[#002d0e]/15">
            {items.map((item) => <details key={currentGroup.group + item.question} name={`faq-${variant}`} className="group py-5">
              <summary className="flex list-none items-center justify-between gap-5 text-body font-semibold [&::-webkit-details-marker]:hidden">{item.question}<Plus size={19} className="shrink-0 transition-transform group-open:rotate-45" /></summary>
              <p className="pt-4 pr-6 text-body text-[#002d0e]/65">{item.answer}</p>
            </details>)}
          </div>
        </div>
      </div>
    </section>
  );
}
