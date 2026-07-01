import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import PageReveal from "../components/PageReveal";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-clip bg-bg-light">
      <PageReveal />
      <Navbar />
      <div data-page-shell className="relative">
        {children}
      </div>
    </div>
  );
}
