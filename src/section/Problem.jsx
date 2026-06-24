import React from "react";
import Text from "../components/base/Text";

const problems = [
  {
    image: "./assets/rep-prob.png",
    alt: "rep-image",
    title: "Repeated verification costs pile up.",
    para: "Businesses re-verify the same users across platforms, paying for checks that should only happen once.",
  },
  {
    image: "./assets/ont-prob.png",
    alt: "ont-image",
    title: "Onboarding friction kills conversion.",
    para: "Every extra document upload is a door users close. Drop-off during KYC is the hidden cost no one tracks.",
  },
  {
    image: "./assets/ver-prob.png",
    alt: "ver-image",
    title: "Compliance proof is fragmented.",
    para: "When regulators ask for an audit trail, businesses scramble across disconnected records and incomplete logs.",
  },
];

export default function Problem() {
  return (
    <div className="mx-auto py-10 bg-bg-light">
      <Text
        btext="The Problem"
        heading="Why building digital products still feels harder than it should."
      />
      <div className="flex gap-6 px-33">
        {problems.map((prob) => {
          return (
            <div className="p-5 rounded-3xl bg-white">
              <img src={prob.image} alt={prob.alt} />
              <div className="pt-3">
                <h6 className="text-green font-semibold">{prob.title}</h6>
                <p className="text-sm text-black/80">{prob.para}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
