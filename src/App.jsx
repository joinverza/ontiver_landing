import React from "react";
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

export default function App() {
  return (
    <div className="mt-10">
      <Navbar />
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
    </div>
  );
}
