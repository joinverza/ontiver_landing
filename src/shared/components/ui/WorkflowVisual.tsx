import { ArrowUpRight } from "lucide-react";
import type { EditorialImage } from "../../data/imagery";
import EditorialCollage from "../media/EditorialCollage";
import { workflowVisualContent, type WorkflowVisualVariant } from "./workflowVisualContent";

export type { WorkflowVisualVariant } from "./workflowVisualContent";

type Step = { title: string; description?: string };

export type WorkflowVisualProps = {
  variant?: WorkflowVisualVariant;
  title?: string;
  organization?: string;
  purpose?: string;
  claims?: string[];
  steps?: Step[];
  activeStep?: number;
  compact?: boolean;
  className?: string;
  photo?: EditorialImage;
  detailPhoto?: EditorialImage;
  priority?: boolean;
};

const WorkflowVisual = ({
  variant = "mobile",
  title,
  organization,
  purpose,
  claims,
  steps,
  activeStep,
  compact = false,
  className = "",
  photo,
  detailPhoto,
  priority = false,
}: WorkflowVisualProps) => {
  const content = workflowVisualContent[variant];
  const isJourney = variant === "workflow" || variant === "developers" || variant === "history";
  const items =
    isJourney && steps?.length
      ? steps.map((step) => step.title)
      : claims?.length
        ? claims
        : content.items;
  const description =
    (variant === "mobile" || variant === "consent") && purpose ? purpose : content.description;

  return (
    <figure
      className={`editorial-workflow ${compact ? "editorial-workflow--compact" : ""} ${className}`}
    >
      <EditorialCollage
        image={photo ?? content.image}
        detailImage={detailPhoto}
        priority={priority}
      />
      <figcaption className="editorial-workflow-copy">
        <div className="editorial-workflow-heading">
          <div>
            <p className="editorial-kicker">{organization ?? content.label}</p>
            <h3 className="editorial-workflow-title">{title ?? content.title}</h3>
          </div>
          <ArrowUpRight size={24} aria-hidden="true" />
        </div>
        <p className="editorial-workflow-description">{description}</p>
        <ol
          className="editorial-workflow-details"
          aria-label={isJourney ? "Workflow stages" : "Key details"}
        >
          {items.map((item, index) => (
            <li key={`${item}-${index}`} data-active={activeStep === index || undefined}>
              {isJourney && (
                <span className="editorial-step-number">{String(index + 1).padStart(2, "0")}</span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
};

export default WorkflowVisual;
