import Hero from "../components/sections/Hero/Hero";
import Problem from "../components/sections/Problem/Problem";
import Solution from "../components/sections/Solution/Solution";
import Modules from "../components/sections/Modules/Modules";
import UseCase from "../components/sections/UseCase/UseCase";
import PricingFAQ from "../components/faq";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import TrustHorizontalTransition from "../components/sections/TrustHorizontalTransition/TrustHorizontalTransition";

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
      <TrustHorizontalTransition />
      <PricingFAQ variant="home" />
      <CurtainFooter />
    </>
  );
}
