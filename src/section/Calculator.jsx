import React, { useState } from "react";
import Text from "../components/base/Text";
import Input from "../components/base/Input";
import Button from "../components/base/Button";

const verification = [
  { name: "Monthly Verifications", placeholder: "1000" },
  { name: "Cost Per Verification", placeholder: "$150" },
];
const costing = [
  { name: "Average Revenue Per User", placeholder: "$150" },
  { name: "Monthly Fraud / Manual Review Loss", placeholder: "$150" },
];
const loading = [
  {
    image: "./assets/load.svg",
  },
  {
    image: "./assets/load.svg",
  },
  {
    image: "./assets/load.svg",
  },
  {
    image: "./assets/load.svg",
  },
];

export default function Calculator() {
  const [value, setValue] = useState(50);
  return (
    <div className="px-56 bg-bg-light">
      <Text
        btext="KYC Savings Calculator"
        heading="Calculate Your KYC Savings"
      />
      <div className="flex gap-4">
        <div className="w-[536px] py-6 px-8 bg-white rounded-3xl">
          <h2 className="text-semibold text-lg pb-14">Check KYC Savings</h2>
          <div>
            {verification.map((verify) => {
              return (
                <Input
                  className="pb-2"
                  name={verify.name}
                  placeholder={verify.placeholder}
                />
              );
            })}
          </div>
          <div className="relative w-full max-w-lg">
            <label>Onboarding Drop-off Rate</label>
            <div className="-top-10  -translate-x-1/2">
              <div className="relative " style={{ left: `${value}%` }}>
                <span
                  className=" h-[50px] flex items-center justify-center text-sm font-medium"
                  style={{ left: `${value}%` }}
                >
                  <p className="bg-[url('./assets/range.svg')] w-[70px]  pl-5 bg-no-repeat bg-center pt-2 pb-4">
                    {value}%
                  </p>
                </span>
              </div>
            </div>

            <input
              className="w-full slider"
              type="range"
              min="0"
              max="100"
              value={value}
              style={{
                background: `linear-gradient(to right, #007D21 0%, #007D21 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`,
              }}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            {costing.map((cost) => {
              return (
                <Input
                  className="pb-2"
                  name={cost.name}
                  placeholder={cost.placeholder}
                />
              );
            })}
          </div>
          <div className="flex gap-2 mt-8">
            <Button
              text="Clear Form"
              className="w-1/3 text-[#0A0B0D] rounded-lg px-4 py-2 font-medium border-1 border-[#BFC8D2]"
            />
            <Button
              className="text-[#F8F9FA] rounded-lg px-4 py-2 font-medium bg-gradient-to-r from-dark-primary to-light-primary w-2/3"
              text="Calculate KYC Savings"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl py-6 px-10 w-[438px]">
          <div className="py-33 px-16">
            <div className="w-[210px] h-[210px] border-3 border-dotted border-black/70 rounded-full">
              <div className="w-[153px] h-[153px] border-3 border-dotted rounded-full border-black/40 relative top-[25.8px] left-[26.2px]">
                <div className="w-[93px] h-[93px] border-3 border-dotted rounded-full border-black/10 relative top-[25.8px] left-[26.2px]">
                  <div className="relative top-[43.8px] left-[28.2px] flex gap-1">
                    {loading.map((load) => {
                      return <img src={load.image} alt="load-icon" />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm pt-15">Calculation Loading</p>
          </div>
        </div>
      </div>
    </div>
  );
}
