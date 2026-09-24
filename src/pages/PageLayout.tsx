import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageReveal from "../components/PageReveal";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <MotionConfig reducedMotion="always">
    <div className="relative overflow-clip bg-white">
      <PageReveal />
      <Navbar key={pathname} />
      <div data-page-shell className="relative">
        {children}
      </div>
    </div>
    </MotionConfig>
  );
}
