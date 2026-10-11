import { ArrowUpRight, Eye, ScanFace, ShieldCheck, SlidersHorizontal, Undo2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ScanFace,
    title: "Verify once",
    body: "Confirm who you are in the Ontiver app with your NIN or BVN and a quick selfie.",
  },
  {
    icon: UserCheck,
    title: "Get a request",
    body: "When a bank, employer or app needs proof, you see who is asking, what they need and why.",
  },
  {
    icon: ShieldCheck,
    title: "Approve what's shared",
    body: "Share only the details they need. They get a verified answer, not copies of your documents.",
  },
];

const controls = [
  { icon: Eye, title: "Nothing leaves without your approval", body: "Every request names the organisation and the reason before you decide." },
  { icon: SlidersHorizontal, title: "Only what's needed", body: "Confirm your phone number or address without handing over a full ID." },
  { icon: Undo2, title: "Change your mind any time", body: "See who received what and when, and withdraw access in a tap." },
];

/** The whole idea in three steps, then the three promises that make it safe. */
export const HowItWorks = () => (
  <section id="how-it-works" className="section-space bg-[#f4f6f1]" aria-labelledby="how-it-works-heading">
    <div className="site-container">
      <div data-scroll-reveal className="max-w-[720px]">
        <p className="eyebrow">How it works</p>
        <h2 id="how-it-works-heading" className="section-heading mt-4">
          Three steps. No more repeat paperwork.
        </h2>
      </div>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }, index) => (
          <li key={title} data-scroll-reveal className="rounded-[24px] bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f5dc] text-[#007d21]">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span className="text-meta font-semibold tabular-nums text-[#526058]" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-6 text-card-title font-semibold">{title}</h3>
            <p className="mt-2 text-body text-[#526058]">{body}</p>
          </li>
        ))}
      </ol>
      <Link to="/how-it-works" className="mt-8 inline-flex items-center gap-2 text-body font-medium">
        See the full journey
        <ArrowUpRight size={18} className="text-[#007d21]" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export const InYourControl = () => (
  <section id="security" className="section-space bg-white" aria-labelledby="control-heading">
    <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <div data-scroll-reveal>
        <p className="eyebrow">Privacy by design</p>
        <h2 id="control-heading" className="section-heading mt-4">
          You decide what leaves your hands.
        </h2>
        <p className="mt-5 max-w-[520px] text-body text-[#526058]">
          Ontiver is built around consent and data minimisation. Organisations receive the answer they need, and
          nothing more.
        </p>
        <Link to="/security" className="button-primary mt-8">
          How we protect your data
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <ul className="divide-y divide-[#002d0e]/12 border-y border-[#002d0e]/12">
        {controls.map(({ icon: Icon, title, body }) => (
          <li key={title} data-scroll-reveal className="flex gap-5 py-6">
            <Icon size={22} className="mt-0.5 shrink-0 text-[#007d21]" aria-hidden="true" />
            <div>
              <h3 className="text-card-title font-semibold">{title}</h3>
              <p className="mt-1.5 text-body text-[#526058]">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
