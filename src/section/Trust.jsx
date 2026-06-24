import React from "react";
import Text from "../components/base/Text";
import Button from "../components/base/Button";

const security = [
  {
    image: "./assets/atom.png",
    title: "Consent-Based Sharing",
    para: "All identity sharing requires user consent with full control and history.",
    row: 1,
    col: 1,
  },
  {
    image: "./assets/octagon.png",
    title: "Audit-Ready Records",
    para: "Every verification event is logged, timestamped, and exportable.",
    row: 1,
    col: 2,
  },
  {
    image: "./assets/cube.png",
    title: "Secure API Access",
    para: "Business access is gated, permissioned, and monitored.",
    row: 2,
    col: 1,
  },
  {
    image: "./assets/binary.png",
    title: "Data Protection First",
    para: "Sensitive documents are handled with minimization principles. Not stored longer than needed.",
    row: 2,
    col: 2,
  },
];

export default function Trust() {
  return (
    <div className="bg-bg-light px-55 py-20">
      <Text
        btext="Security & Trust"
        heading="Designed for sensitive identity data from day one."
      />
      <div className="grid grid-cols-2 grid-row-2 gap-8">
        {security.map((secure, index) => {
          return (
            <div>
              {index === 2 ? (
                <div className="rounded-3xl p-4 bg-white">
                  <div className="relative">
                    <img className="w-full" src={secure.image} />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="w-[404px]">
                    <h6 className="font-medium text-xl">{secure.title}</h6>
                    <p className="text-sm">{secure.para}</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl p-4 bg-white">
                  <img className="rounded-lg mb-3" src={secure.image} />
                  <div className="w-[404px]">
                    <h6 className="font-medium text-xl">{secure.title}</h6>
                    <p className="text-sm">{secure.para}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex mt-8 gap-4 mx-auto w-[623px]">
        <Button
          className="text-white font-medium rounded-lg text-lg py-3 px-15 bg-gradient-to-r from-dark-primary to-light-primary"
          text="Visit Security Page"
        />
        <Button
          className="border-[0.5px] rounded-lg font-medium text-lg border-[#00291B] py-3 px-4"
          text="Request Security Documentation"
        />
      </div>
    </div>
  );
}

{
  /* <div className="rounded-3xl p-4 bg-white">
              <img
                className={`${index === 2 && "opacity-80"} rounded-lg mb-3`}
                src={secure.image}
              />
              <div className="w-[404px]">
                <h6 className="font-medium text-xl">{secure.title}</h6>
                <p className="text-sm">{secure.para}</p>
              </div>
            </div> */
}
