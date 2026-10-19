import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { Link } from "react-router-dom";
import { platformLayers } from "../../../enterprise/platform/data/platform";
import type { Audience } from "../../../../shared/lib/audience";
import { SiteImage } from "../../../../shared/components/media/SiteImage";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import { imagery } from "../../../../shared/data/imagery";
import "./modules.css";

const individualCards = [
  {
    id: "requests",
    title: "Know who is asking",
    caption:
      "See exactly which organization is requesting your identity, and why, before you share anything.",
    to: "/identity",
  },
  {
    id: "evidence",
    title: "Send the right evidence",
    caption:
      "Submit only what's actually needed for the request — no extra documents, no guesswork.",
    to: "/how-it-works",
  },
  {
    id: "consent",
    title: "Choose what to share",
    caption:
      "Approve specific claims, not your whole profile. A request for your phone number doesn't need your full ID.",
    to: "/security",
  },
  {
    id: "status",
    title: "Follow your request",
    caption:
      "Track every request from submission to decision, so you're never left wondering what happened.",
    to: "/how-it-works",
  },
  {
    id: "proof",
    title: "Keep approved proofs",
    caption:
      "Once verified, hold a reusable proof you can present again — without repeating the whole process.",
    to: "/identity",
  },
  {
    id: "history",
    title: "See your sharing history",
    caption: "A complete, searchable record of who received what, when, and why.",
    to: "/security",
  },
];

const layerPhotos = [
  // Match each capability's action, rather than rotating general office scenes.
  [
    editorialPhotos.sourceNationalIdentity,
    editorialPhotos.sourcePhone,
    editorialPhotos.identity,
    editorialPhotos.sourceCredentials,
    editorialPhotos.sourceEmployment,
  ],
  [
    editorialPhotos.verification,
    editorialPhotos.identity,
    editorialPhotos.compliance,
    editorialPhotos.intelligence,
  ],
  [
    editorialPhotos.workflow,
    editorialPhotos.platformOverview,
    imagery.work,
    editorialPhotos.renewalPlanning,
  ],
  [
    editorialPhotos.howItWorks,
    editorialPhotos.verification,
    editorialPhotos.blogRisk,
    editorialPhotos.blogAudit,
  ],
  [
    editorialPhotos.blogConsent,
    editorialPhotos.consent,
    editorialPhotos.sharingHistory,
    editorialPhotos.securityControls,
  ],
  [
    editorialPhotos.proof,
    editorialPhotos.blogWebhooks,
    editorialPhotos.renewalPlanning,
    editorialPhotos.consent,
  ],
];

const individualPhotos = [
  editorialPhotos.personalPhone,
  editorialPhotos.howItWorks,
  editorialPhotos.consent,
  editorialPhotos.personalLaptop,
  editorialPhotos.proof,
  editorialPhotos.sharingHistory,
];

const useModuleLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const desktopTabsQuery = "(min-width: 1000px)";
const subscribeTabLayout = (callback: () => void) => {
  const query = window.matchMedia(desktopTabsQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getDesktopTabLayout = () => window.matchMedia(desktopTabsQuery).matches;
const getServerTabLayout = () => false;

const Modules = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const desktopTabs = useSyncExternalStore(
    subscribeTabLayout,
    getDesktopTabLayout,
    getServerTabLayout,
  );
  const id = useId();
  const groups = enterprise ? platformLayers : individualCards;
  const selected = activeTab % groups.length;

  useModuleLayoutEffect(() => {
    const list = tabListRef.current;
    if (!enterprise || !list) return;
    const measure = () => {
      const tab = tabRefs.current[selected];
      if (!tab || !tab.offsetWidth) return;
      list.style.setProperty("--module-pill-x", `${tab.offsetLeft}px`);
      list.style.setProperty("--module-pill-y", `${tab.offsetTop}px`);
      list.style.setProperty("--module-pill-width", `${tab.offsetWidth}px`);
      list.style.setProperty("--module-pill-height", `${tab.offsetHeight}px`);
      list.dataset.ready = "true";
      if (!desktopTabs) {
        const left = tab.offsetLeft;
        const right = left + tab.offsetWidth;
        if (left < list.scrollLeft) list.scrollTo({ left, behavior: "instant" });
        else if (right > list.scrollLeft + list.clientWidth) {
          list.scrollTo({ left: right - list.clientWidth, behavior: "instant" });
        }
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    tabRefs.current.forEach((tab) => tab && observer.observe(tab));
    return () => observer.disconnect();
  }, [enterprise, selected, desktopTabs]);

  const layer = platformLayers[selected];
  const cards = enterprise
    ? layer.capabilities.map((capability, index) => ({
        title: capability.title,
        caption: capability.description,
        to: `/enterprise/platform/${layer.id}`,
        image: layerPhotos[selected][index],
      }))
    : individualCards.map((card, index) => ({ ...card, image: individualPhotos[index] }));
  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key)
      ? 1
      : ["ArrowUp", "ArrowLeft"].includes(event.key)
        ? -1
        : 0;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? groups.length - 1
          : (index + direction + groups.length) % groups.length;
    if (!direction && !["Home", "End"].includes(event.key)) return;
    event.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };
  return (
    <section id="features" className="section-space module-showcase">
      <div className="site-container">
        <div data-scroll-reveal className="max-w-5xl">
          <p className="eyebrow !text-[#c7e6b5]">
            {enterprise ? "One configurable platform" : "Inside your Ontiver app"}
          </p>
          <h2 className="section-heading mt-4">
            {enterprise
              ? "From evidence to an approved proof."
              : "Every request. Every proof. In your hands."}
          </h2>
          <p className="mt-5 text-body text-white/75">
            {enterprise
              ? "Configure evidence and review around the people you onboard."
              : "From education credentials to your next application."}
          </p>
        </div>
        <div
          className={`module-showcase-layout mt-10 ${enterprise ? "" : "module-showcase-layout--single"}`}
        >
          {enterprise && (
            <div
              ref={tabListRef}
              className="module-tabs"
              role="tablist"
              aria-label="Platform layers"
              aria-orientation={desktopTabs ? "vertical" : "horizontal"}
            >
              <span className="module-tabs-indicator" aria-hidden="true" />
              {groups.map((group, index) => (
                <button
                  key={group.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`${id}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected === index}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => moveTab(event, index)}
                >
                  {group.title}
                  <ActionIcon size={20} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
          <div
            id={`${id}-panel`}
            role={enterprise ? "tabpanel" : undefined}
            aria-labelledby={enterprise ? `${id}-tab-${selected}` : undefined}
            className="module-panel"
          >
            {enterprise && (
              <p className="mb-7 max-w-3xl text-subtitle text-white/80">{layer.description}</p>
            )}
            <div className="module-feature-grid">
              {cards.map((card, index) => {
                return (
                  <Link key={card.title} to={card.to} className="module-feature">
                    <div className="module-feature-image" aria-hidden="true">
                      <SiteImage
                        src={card.image.src}
                        alt={card.image.alt}
                        width={card.image.width}
                        height={card.image.height}
                        reveal={false}
                        sizes="(min-width: 1000px) 36vw, (min-width: 640px) 50vw, 100vw"
                        style={{ objectPosition: card.image.objectPosition }}
                      />
                    </div>
                    <span className="module-feature-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="module-feature-copy">
                      <h3 className="text-card-title font-medium">{card.title}</h3>
                      <p className="mt-3 text-body text-white/80">{card.caption}</p>
                    </div>
                    <ActionIcon size={22} className="module-feature-arrow" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modules;
