import type { ReactNode } from "react";
import Navbar from "../navigation/Navbar";
import { useLenis } from "../../hooks/useLenis";
import { MotionSettings } from "../motion/MotionSettings";

const PageLayout = ({ children }: { children: ReactNode }) => {
  useLenis();
  return (
    <MotionSettings>
      <div className="relative overflow-clip bg-white">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <div data-page-shell className="relative">
          {children}
        </div>
      </div>
    </MotionSettings>
  );
};

export default PageLayout;
