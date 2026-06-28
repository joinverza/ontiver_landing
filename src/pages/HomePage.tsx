import Hero from "../section/Hero";
import Problem from "../section/Problem";
import Solution from "../section/Solution";
import Modules from "../section/Modules";
import UseCase from "../section/UseCase";
import Trust from "../section/Trust";
import PricingFAQ from "../components/faq";
import Join from "../section/Join";
import Footer from "../section/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Modules />
      <UseCase />
      {/* <Price /> */}
      {/* <Calculator /> */}
      <Trust />
      <PricingFAQ variant="home" />
      <Join />
      <Footer />
    </>
  );
}
