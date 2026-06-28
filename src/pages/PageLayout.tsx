import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-clip bg-bg-light">
      <Navbar />
      {children}
    </div>
  );
}
