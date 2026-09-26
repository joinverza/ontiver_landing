import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import type { NavItem } from "../../data/navigation";
import type { Audience } from "../../lib/audience";
import DropdownPanel from "./DropdownPanel";
import { useDesktopNavigation } from "./useDesktopNavigation";

type DesktopNavigationProps = {
  audience: Audience;
  items: NavItem[];
  pathname: string;
  routeKey: string;
};

const DesktopNavigation = ({ audience, items, pathname, routeKey }: DesktopNavigationProps) => {
  const { navRef, openName, cancelPending, close, enter, leave, toggle, focusPanel, escape } =
    useDesktopNavigation(routeKey);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="hidden items-center gap-3 lgg:flex xl:gap-4"
      onKeyDown={(event) => {
        if (event.key === "Escape" && openName) {
          event.preventDefault();
          escape();
        }
      }}
    >
      {items.map((item) => {
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        const open = openName === item.name;
        const panelId = `nav-${item.name.toLowerCase().replaceAll(" ", "-")}`;
        const focusItemPanel = () => focusPanel(item.name, panelId);

        return (
          <div
            key={item.to}
            className="-my-4 py-4"
            onMouseEnter={() => enter(item.children ? item.name : null)}
            onMouseLeave={() => leave(item.name)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) close();
            }}
          >
            <div className="flex items-center">
              <Link
                to={item.to}
                aria-current={pathname === item.to ? "page" : undefined}
                onClick={close}
                onKeyDown={(event) => {
                  if (item.children && event.key === "ArrowDown") {
                    event.preventDefault();
                    focusItemPanel();
                  }
                }}
                className={`py-3 text-sm font-medium transition-colors hover:text-[#007d21] ${active || open ? "text-[#007d21]" : "text-[#002d0e]/75"}`}
              >
                {item.name}
              </Link>
              {item.children && (
                <button
                  type="button"
                  aria-label={`${item.name} links`}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(item.name)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      focusItemPanel();
                    }
                  }}
                  className="grid size-7 place-items-center rounded-full text-[#002d0e]/70 hover:bg-[#edf5e7]"
                >
                  <ChevronDown
                    size={14}
                    className={`nav-chevron ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            {item.children && (
              <DropdownPanel
                id={panelId}
                item={item}
                audience={audience}
                open={open}
                onEnter={cancelPending}
                onNavigate={close}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopNavigation;
