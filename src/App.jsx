import React from "react";
import Navbar from "./components/inc/Navbar";
import Hero from "./section/Hero";
import Problem from "./section/Problem";
import Solution from "./section/Solution";
import Price from "./section/Price";
import Plan from "./section/Plan";
import Calculator from "./section/Calculator";

export default function App() {
  return (
    <div className="mt-10">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Price />
      <Plan />
      <Calculator />
    </div>
  );
}
