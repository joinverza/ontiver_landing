import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { platformLayers } from "../../../data/platform";
import type { Audience } from "../../../lib/audience";
import ContextPhoto from "../../ui/ContextPhoto";
import { imagery } from "../../../data/imagery";

const individualCards = [
  { id: "requests", title: "Know who is asking", caption: "See exactly which organization is requesting your identity, and why, before you share anything.", to: "/identity" },
  { id: "evidence", title: "Send the right evidence", caption: "Submit only what's actually needed for the request — no extra documents, no guesswork.", to: "/how-it-works" },
  { id: "consent", title: "Choose what to share", caption: "Approve specific claims, not your whole profile. A request for your phone number doesn't need your full ID.", to: "/security" },
  { id: "status", title: "Follow your request", caption: "Track every request from submission to decision, so you're never left wondering what happened.", to: "/how-it-works" },
  { id: "proof", title: "Keep approved proofs", caption: "Once verified, hold a reusable proof you can present again — without repeating the whole process.", to: "/identity" },
  { id: "history", title: "See your sharing history", caption: "A complete, searchable record of who received what, when, and why.", to: "/security" },
];

export default function Modules({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const cards = enterprise ? platformLayers.map(layer => ({ id: layer.id, title: layer.title, caption: layer.description, to: `/enterprise/platform/${layer.id}` })) : individualCards;
  return <section id="features" className="section-space bg-white">
    <div className="site-container">
      <div data-scroll-reveal className="mb-8 max-w-[860px]"><p className="eyebrow">{enterprise ? "One configurable platform" : "Inside your Ontiver app"}</p><h2 className="section-heading mt-4">{enterprise ? "From evidence to an approved proof." : "Every request. Every proof. In your hands."}</h2></div>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div data-media-reveal><ContextPhoto image={enterprise ? imagery.candidateReview : imagery.studentAdmissions} /><p className="mt-3 text-meta text-[#526058]">{enterprise ? "Configure evidence and review around the people you onboard." : "From education credentials to your next application."}</p></div>
        <div className="divide-y divide-[#002d0e]/15">
        {cards.map(card => {
          return <Link key={card.id} to={card.to} className="group flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div><h3 className="text-card-title font-medium group-hover:text-[#007d21]">{card.title}</h3><p className="mt-1 text-body text-[#526058]">{card.caption}</p></div><ArrowUpRight size={22} className="mt-1 shrink-0 text-[#007d21]" aria-hidden="true" />
          </Link>;
        })}
        </div>
      </div>
    </div>
  </section>;
}
