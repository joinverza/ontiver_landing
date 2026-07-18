import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "../components/Navbar";
import PageReveal from "../components/PageReveal";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="always">
    <div className="relative overflow-clip bg-bg-light">
      <PageReveal />
      <Navbar />
      <div data-page-shell className="relative">
        {children}
      </div>
    </div>
    </MotionConfig>
  );
}
