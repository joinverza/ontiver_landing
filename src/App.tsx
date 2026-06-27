import type { ReactNode } from "react";
import Blog from "./Blog";
import Navbar from "./components/inc/Navbar";
import Hero from "./section/Hero";
import Problem from "./section/Problem";
import Solution from "./section/Solution";
import Price from "./section/Price";
import Plan from "./section/Plan";
import Calculator from "./section/Calculator";
import Trust from "./section/Trust";
import FAQs from "./section/FAQs";
import Join from "./section/Join";
import Footer from "./section/Footer";
import Modules from "./section/Modules";
import UseCase from "./section/UseCase";
import Contact from "./section/Contact";
import { useLenis } from "./hooks/useLenis";

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-bg-light overflow-clip">
      <Navbar />
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Modules />
      <UseCase />
      <Price />
      <Plan />
      <Calculator />
      <Trust />
      <FAQs />
      <Join />
      <Footer />
    </>
  );
}

export default function App() {
  useLenis();

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const isBlogPage = pathname === "/blog" || pathname === "/blogs";
  const isContactPage = pathname === "/contact";
  const isCalculatorPage = pathname === "/calculator";

  return (
    <PageShell>
      {isBlogPage ? (
        <Blog />
      ) : isContactPage ? (
        <main className="pt-32">
          <Contact />
          <Footer />
        </main>
      ) : isCalculatorPage ? (
        <main className="pt-32">
          <Calculator />
          <Footer />
        </main>
      ) : (
        <HomePage />
      )}
    </PageShell>
  );
}
