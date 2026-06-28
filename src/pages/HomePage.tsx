import Hero from "../components/sections/Hero/Hero";
import Problem from "../components/sections/Problem/Problem";
import Solution from "../components/sections/Solution/Solution";
import Modules from "../components/sections/Modules/Modules";
import UseCase from "../components/sections/UseCase/UseCase";
import Trust from "../components/sections/Trust/Trust";
import PricingFAQ from "../components/faq";
import Join from "../components/sections/Join/Join";
import Footer from "../components/sections/Footer/Footer";

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
