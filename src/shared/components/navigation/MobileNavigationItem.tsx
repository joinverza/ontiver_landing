import ActionIcon from "../ui/ActionIcon";
import { Link } from "react-router-dom";
import { isNavigationLinkActive, type NavItem } from "../../data/navigation";

type MobileNavigationItemProps = {
  item: NavItem;
  pathname: string;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

const MobileNavigationItem = ({
  item,
  pathname,
  active,
  expanded,
  onToggle,
  onNavigate,
}: MobileNavigationItemProps) => {
  const id = `mobile-${item.name.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4">
        <Link
          to={item.to}
          aria-current={pathname === item.to ? "page" : active ? "location" : undefined}
          data-active={active}
          onClick={onNavigate}
          className="mobile-navigation-link flex-1 py-2 text-card-title font-semibold"
        >
          {item.name}
        </Link>
        {item.children ? (
          <button
            type="button"
            aria-label={`${item.name} links`}
            aria-expanded={expanded}
            aria-controls={id}
            onClick={onToggle}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-[#002d0e]/15"
          >
            <ActionIcon
              direction="down"
              size={19}
              className={`nav-chevron ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        ) : (
          <ActionIcon size={22} aria-hidden="true" />
        )}
      </div>
      {item.children && (
        <div
          id={id}
          inert={!expanded}
          aria-hidden={!expanded}
          data-expanded={expanded}
          className="nav-accordion"
        >
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-1 rounded-2xl bg-surface px-2 pb-5">
              {item.children.map((child) => {
                const Icon = child.icon;
                const content = (
                  <>
                    {Icon && <Icon size={20} className="shrink-0 text-accent" aria-hidden="true" />}
                    <span>{child.name}</span>
                    {child.external && (
                      <ActionIcon size={15} className="ml-auto shrink-0" aria-hidden="true" />
                    )}
                  </>
                );
                const className =
                  "flex items-center gap-3 rounded-xl p-3 text-body hover:bg-[#edf5e7]";
                return child.external ? (
                  <a
                    key={child.to}
                    href={child.to}
                    target="_blank"
                    rel="noreferrer"
                    onClick={onNavigate}
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={child.to}
                    to={child.to}
                    aria-current={
                      pathname === child.to
                        ? "page"
                        : isNavigationLinkActive(child, pathname)
                          ? "location"
                          : undefined
                    }
                    data-active={isNavigationLinkActive(child, pathname)}
                    onClick={onNavigate}
                    className={className}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigationItem;
