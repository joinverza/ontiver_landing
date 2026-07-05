import Hero from "../components/sections/Hero/Hero";
import Problem from "../components/sections/Problem/Problem";
import Solution from "../components/sections/Solution/Solution";
import Modules from "../components/sections/Modules/Modules";
import UseCase from "../components/sections/UseCase/UseCase";
import PricingFAQ from "../components/faq";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import TrustHorizontalTransition from "../components/sections/TrustHorizontalTransition/TrustHorizontalTransition";
import type { Audience } from "../lib/audience";

export default function HomePage({ audience }: { audience: Audience }) {
  return (
    <>
      <Hero audience={audience} />
      <Problem audience={audience} />
      <Solution audience={audience} />
      <Modules audience={audience} />
      <UseCase audience={audience} />
      <TrustHorizontalTransition audience={audience} />
      <PricingFAQ variant={audience === "enterprise" ? "enterprise" : "individual"} />
      <CurtainFooter audience={audience} />
    </>
  );
}
