import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import {
  Eye,
  ScanFace,
  ShieldCheck,
  SlidersHorizontal,
  Undo2,
  UserCheck,
} from "../../../../shared/components/ui/icons";
import { Link } from "react-router-dom";
import { ImageTimeline } from "../../../../shared/components/media/ImageTimeline";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import "../../../../shared/components/ui/promise-cards.css";
import "./individual-home-sections.css";

const steps = [
  {
    icon: ScanFace,
    title: "Verify once",
    description: "Confirm who you are in the Ontiver app with your NIN or BVN and a quick selfie.",
    image: editorialPhotos.identity,
  },
  {
    icon: UserCheck,
    title: "Get a request",
    description:
      "When a bank, employer or app needs proof, you see who is asking, what they need and why.",
    image: editorialPhotos.consent,
  },
  {
    icon: ShieldCheck,
    title: "Approve what's shared",
    description:
      "Share only the details they need. They get a verified answer, not copies of your documents.",
    image: editorialPhotos.proof,
  },
];

const controls = [
  {
    icon: Eye,
    title: "Nothing leaves without your approval",
    body: "Every request names the organisation and the reason before you decide.",
  },
  {
    icon: SlidersHorizontal,
    title: "Only what's needed",
    body: "Confirm your phone number or address without handing over a full ID.",
  },
  {
    icon: Undo2,
    title: "Change your mind any time",
    body: "See who received what and when, and withdraw access in a tap.",
  },
];

/** The whole idea in three steps, then the three promises that make it safe. */
export const HowItWorks = () => (
  <section
    id="how-it-works"
    className="section-space individual-steps-section bg-surface"
    aria-labelledby="how-it-works-heading"
  >
    <div className="site-container">
      <div data-scroll-reveal className="max-w-[720px]">
        <p className="eyebrow">How it works</p>
        <h2 id="how-it-works-heading" className="section-heading mt-4">
          Three steps. No more repeat paperwork.
        </h2>
      </div>
      <ImageTimeline steps={steps} labelledBy="how-it-works-heading" className="mt-10" />
      <Link
        to="/how-it-works"
        className="mt-8 inline-flex items-center gap-2 text-body font-medium"
      >
        See the full journey
        <ActionIcon size={18} className="text-accent" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export const InYourControl = () => (
  <section
    id="security"
    className="section-space individual-control-section bg-surface"
    aria-labelledby="control-heading"
  >
    <div className="site-container">
      <div className="promise-grid">
        <div data-scroll-reveal className="promise-card promise-card-introduction">
          <p className="eyebrow">Privacy by design</p>
          <h2 id="control-heading" className="section-heading mt-4">
            You decide what leaves your hands.
          </h2>
          <p className="mt-5 max-w-[520px] text-body text-[#526058]">
            Ontiver is built around consent and data minimisation. Organisations receive the answer
            they need, and nothing more.
          </p>
          <Link to="/security" className="button-primary mt-7">
            How we protect your data
            <ActionIcon size={17} aria-hidden="true" />
          </Link>
        </div>
        {controls.map(({ icon: Icon, title, body }) => (
          <article key={title} data-scroll-reveal className="promise-card">
            <Icon className="promise-card-icon" aria-hidden="true" />
            <h3 className="text-card-title font-medium">{title}</h3>
            <p className="promise-card-description text-body">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
