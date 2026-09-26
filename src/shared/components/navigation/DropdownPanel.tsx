import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { imagery } from "../../data/imagery";
import type { NavItem, NavLink } from "../../data/navigation";
import type { Audience } from "../../lib/audience";

const platformDescriptions: Record<string, string> = {
  "/enterprise/platform/identity-sources": "NIN/BVN, documents, and trusted confirmations.",
  "/enterprise/platform/verification-engine": "Identity, document, face, and credential checks.",
  "/enterprise/platform/workflow-engine": "Ordered checks, retries, approvals, and expiry.",
  "/enterprise/platform/intelligence": "OCR, inconsistencies, and duplicate signals.",
  "/enterprise/platform/consent-and-privacy": "Purpose, approval, and sharing history.",
  "/enterprise/platform/identity-proofs": "Approved claims, validation, and controlled reuse.",
};

type DropdownLinkProps = { item: NavLink; onNavigate: () => void };

const DropdownLink = ({ item, onNavigate }: DropdownLinkProps) => {
  const className =
    "flex items-start gap-3 rounded-lg border border-[#002d0e]/15 px-4 py-3 transition-colors hover:border-[#007d21] hover:bg-[#f4f6f1] focus-visible:bg-[#f4f6f1]";
  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-body font-medium">{item.name}</span>
        <span className="mt-1.5 block text-sm leading-snug text-[#526058]">
          {platformDescriptions[item.to] ?? item.description}
        </span>
      </span>
      {item.external && <ArrowUpRight size={16} className="ml-auto shrink-0" aria-hidden="true" />}
    </>
  );

  return item.external ? (
    <a href={item.to} target="_blank" rel="noreferrer" className={className} onClick={onNavigate}>
      {content}
    </a>
  ) : (
    <Link to={item.to} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
};

type DropdownPanelProps = {
  id: string;
  item: NavItem;
  audience: Audience;
  open: boolean;
  onEnter: () => void;
  onNavigate: () => void;
};

const DropdownPanel = ({ id, item, audience, open, onEnter, onNavigate }: DropdownPanelProps) => {
  const enterprise = audience === "enterprise";
  const image = imagery.candidateReview;

  return (
    <div
      id={id}
      data-dropdown-panel
      data-nav-dropdown={open ? "" : undefined}
      data-open={open}
      data-lenis-prevent
      aria-hidden={!open}
      inert={!open}
      onMouseEnter={onEnter}
      className="nav-popup-panel absolute left-0 top-full max-h-[calc(100dvh-80px)] w-full overflow-y-auto border-b border-[#002d0e]/10 bg-white shadow-[0_20px_30px_rgba(0,45,14,.035)]"
    >
      <div className="site-container grid grid-cols-[.8fr_1.7fr_.85fr] gap-6 py-6">
        <div className="flex flex-col items-start justify-between rounded-lg bg-[#f4f6f1] p-5">
          <div>
            <p className="text-card-title font-medium">{item.name}</p>
            <p className="mt-3 text-sm text-[#526058]">{item.description}</p>
          </div>
          <Link
            to={item.to}
            onClick={onNavigate}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore {item.name.toLowerCase()}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div
          className={`grid content-start gap-2.5 ${(item.children?.length ?? 0) > 3 ? "grid-cols-2" : "grid-cols-1"}`}
        >
          {item.children?.map((child) => (
            <DropdownLink key={child.to} item={child} onNavigate={onNavigate} />
          ))}
        </div>
        <Link
          to={enterprise ? "/enterprise/resources" : "/resources"}
          onClick={onNavigate}
          className="group self-start"
        >
          <div className="image-card aspect-[1.65] overflow-hidden rounded-lg bg-[#edf5e7]">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: image.objectPosition }}
            />
            <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </div>
          <p className="mt-4 text-body font-medium">
            {enterprise ? "Plan your workflow." : "Understand requests and sharing."}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DropdownPanel;
