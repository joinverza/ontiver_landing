import React from "react";
import Text from "../components/base/Text";

const firstsolu = [
  {
    image: "./assets/verify.svg",
    title: "Verify",
    para: "User submits identity documents through a business's Ontiver-powered flow.",
    line: "./assets/line.svg",
  },
  {
    image: "./assets/screen.svg",
    title: "Screen",
    para: "Ontiver runs AML checks, sanctions screening, and risk assessment automatically.",
    line: "./assets/line.svg",
  },
  {
    image: "./assets/proof.svg",
    title: "Store Proof",
    para: "A verified identity proof is created and stored securely — tied to the user, not just the business.",
  },
];

const secondsolu = [
  {
    image: "./assets/consent.svg",
    title: "Consent Share",
    para: "When another business needs to verify the same user, the user approves with a single consent action.",
    line: "./assets/line.svg",
  },
  {
    image: "./assets/reuse.svg",
    title: "Reuse",
    para: "The new business gets trusted verification proof instantly. No repeat document uploads. No delay.",
  },
];

export default function Solution() {
  return (
    <div className="py-21 px-50 bg-bg-light">
      <Text
        btext="The Solution"
        heading="One verification. Trusted everywhere."
      />
      <div>
        <div className="flex mb-15">
          {firstsolu.map((solu) => {
            return (
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="w-fit mx-auto border-3 border-white rounded-lg pb-2">
                    <img src={solu.image} />
                  </div>
                  <div className="w-[252px]">
                    <h6 className="font-semibold text-lg pb-2">{solu.title}</h6>
                    <p className="text-black/90 leading-[120%]">{solu.para}</p>
                  </div>
                </div>

                <img className="px-12" src={solu.line} />
              </div>
            );
          })}
        </div>
        <div className="flex px-34">
          {secondsolu.map((solu) => {
            return (
              <div className="flex justify-between">
                <div className="text-center flex flex-col justify-between">
                  <div className="w-fit mx-auto border-3 border-white rounded-lg">
                    <img src={solu.image} />
                  </div>
                  <div className="w-[270px]">
                    <h6 className="font-semibold text-lg pb-2">{solu.title}</h6>
                    <p className="text-black/90 leading-[120%]">{solu.para}</p>
                  </div>
                </div>

                <img className="px-25" src={solu.line} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
