import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageReveal from "../components/PageReveal";
import { useLenis } from "../hooks/useLenis";
import { MotionSettings } from "../components/MotionSettings";

export default function PageLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useLenis();
  return (
    <MotionSettings><MotionConfig reducedMotion="user">
    <div className="relative overflow-clip bg-white">
      <PageReveal />
      <Navbar key={pathname} />
      <div data-page-shell className="relative">
        {children}
      </div>
    </div>
    </MotionConfig></MotionSettings>
  );
}
