import type { ReactNode } from "react";
import Navbar from "../navigation/Navbar";
import { useLenis } from "../../hooks/useLenis";
import { MotionSettings } from "../motion/MotionSettings";
import InitialLoader from "../loaders/InitialLoader";

const PageLayout = ({ children }: { children: ReactNode }) => {
  useLenis();
  return (
    <InitialLoader>
      <MotionSettings>
        <div className="relative overflow-clip bg-surface">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Navbar />
          <div data-page-shell className="relative">
            {children}
          </div>
        </div>
      </MotionSettings>
    </InitialLoader>
  );
};

export default PageLayout;
