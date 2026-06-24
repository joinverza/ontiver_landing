import React from "react";
import Text from "../components/base/Text";
import Input from "../components/base/Input";
import Button from "../components/base/Button";

const input = [
  {
    name: "Monthly production verifications",
    placeholder: "Enter input",
  },
  {
    name: "Monthly AML screens",
    placeholder: "Enter input",
  },
  {
    name: "Monthly API requests",
    placeholder: "Enter input",
  },
];
const plan = [
  {
    need: "Need audit logs?",
  },
  {
    need: "Need AML monitoring?",
  },
  {
    need: "Need SLA or dedicated onboarding?",
  },
  {
    need: "Testing only?",
  },
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

export default function Plan() {
  return (
    <div className="px-56 bg-bg-light">
      <Text btext="Find Your Ideal Plan" heading="Plan Recommendation Tool" />
      <div className="flex gap-4">
        <div className="w-[536px] py-6 px-8 bg-white rounded-3xl">
          <h2 className="text-semibold text-lg pb-14">Find Your Ideal Plan</h2>
          <div>
            {input.map((item) => {
              return (
                <Input
                  className="pb-5"
                  name={item.name}
                  placeholder={item.placeholder}
                />
              );
            })}
            <div>
              {plan.map((itinery) => {
                return (
                  <div className="flex justify-between gap-2">
                    <p>{itinery.need}</p>
                    <img src="./assets/toggle-on.svg" alt="toggle icon" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 mt-8">
            <Button
              text="Clear Form"
              className="w-1/3 text-[#0A0B0D] rounded-lg px-4 py-2 font-medium border-1 border-[#BFC8D2]"
            />
            <Button
              className="text-[#F8F9FA] rounded-lg px-4 py-2 font-medium bg-gradient-to-r from-dark-primary to-light-primary w-2/3"
              text="Check Best Plan"
            />
          </div>
        </div>
        <div className="bg-white rounded-3xl py-6 px-10 w-[438px]">
          <div className="py-33 px-16">
            <div className="w-[210px] h-[210px] border-3 border-dotted border-black/70 rounded-full">
              <div className="w-[153px] h-[153px] border-3 border-dotted rounded-full border-black/40 relative top-[25.8px] left-[26.2px]">
                <div className="w-[93px] h-[93px] border-3 border-dotted rounded-full border-black/10 relative top-[25.8px] left-[26.2px]">
                  {/* <img
                    className="relative top-[25.8px] left-[26.2px]"
                    src="./assets/load.svg"
                    alt="load-icon"
                  /> */}
                  <div className="relative top-[43.8px] left-[28.2px] flex gap-1">
                    {loading.map((load) => {
                      return (
                        <img
                          // className="relative top-[25.8px] left-[26.2px]"
                          src={load.image}
                          alt="load-icon"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* <img className="w-[210px] h-[210px]" src="./assets/Circles.svg" /> */}
            </div>
            <p className="text-center text-sm pt-15">Finding Ideal Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
