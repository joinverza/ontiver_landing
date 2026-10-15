import ActionIcon from "./ui/ActionIcon";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { faqGroups, individualFaqGroups } from "../data/faq";
import AuroraBadge from "./ui/AuroraBadge";
import SlidingPill from "./ui/SlidingPill";
import "./faq.css";

type PricingFAQProps = { variant?: "pricing" | "enterprise" | "individual" };

const PricingFAQ = ({ variant = "pricing" }: PricingFAQProps) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const instanceId = useId();
  const groups =
    variant === "individual"
      ? individualFaqGroups
      : faqGroups.filter((group) =>
          variant === "enterprise" ? group.group !== "Pricing" : group.group === "Pricing",
        );
  const currentGroup = groups[selectedGroup] ?? groups[0];
  const items = currentGroup.items;
  const heading = {
    pricing: "Pricing, explained.",
    enterprise: "Before you integrate.",
    individual: "Get to know Ontiver.",
  }[variant];
  return (
    <section
      id="faq"
      className="section-space faq-section"
      aria-labelledby={`${instanceId}-heading`}
    >
      <div className="site-container faq-layout">
        <div className="faq-introduction">
          <div data-scroll-reveal>
            <AuroraBadge>Frequently asked questions</AuroraBadge>
            <h2 id={`${instanceId}-heading`} className="section-heading mt-5">
              {heading}
            </h2>
            <Link
              to={variant === "individual" ? "/support" : "/enterprise/support"}
              className="faq-support-link mt-8"
            >
              Contact support
              <ActionIcon size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="faq-content">
          <SlidingPill
            label="Question categories"
            value={selectedGroup}
            onChange={(index) => {
              setSelectedGroup(index);
              setOpenQuestion(null);
            }}
            options={groups.map((group, index) => ({ value: index, label: group.group }))}
            layout="wrap"
            size="compact"
            className="mb-6"
          />
          <div className="faq-list">
            {items.map((item, index) => {
              const questionKey = `${currentGroup.group}-${item.question}`;
              const expanded = openQuestion === questionKey;
              const questionId = `${instanceId}-question-${index}`;
              const answerId = `${instanceId}-answer-${index}`;
              return (
                <article key={questionKey} className="faq-item" data-open={expanded || undefined}>
                  <h3>
                    <button
                      id={questionId}
                      type="button"
                      className="faq-question"
                      aria-expanded={expanded}
                      aria-controls={answerId}
                      onClick={() => setOpenQuestion(expanded ? null : questionKey)}
                    >
                      <span className="faq-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                      <span className="faq-mark" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={answerId}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!expanded}
                    inert={!expanded}
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer-copy">
                        <p className="text-body">{item.answer}</p>
                        {item.link &&
                          (/^https?:/.test(item.link.to) ? (
                            <a href={item.link.to} className="faq-answer-link">
                              {item.link.label}
                              <ActionIcon size={17} aria-hidden="true" />
                            </a>
                          ) : (
                            <Link to={item.link.to} className="faq-answer-link">
                              {item.link.label}
                              <ActionIcon size={17} aria-hidden="true" />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
