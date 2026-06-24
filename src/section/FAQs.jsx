import React from "react";
import Text from "../components/base/Text";

const faqs = [
  {
    ques: "What does Ontiver do?",
    ans: "",
  },
  {
    ques: "How is this different from other KYC providers?",
    ans: "",
  },
  {
    ques: "Can developers test before speaking to sales?",
    ans: "",
  },
  {
    ques: "How does Ontiver protect sensitive identity data",
    ans: "",
  },
  {
    ques: "Does Ontiver work for individual users?",
    ans: "",
  },
];

export default function FAQs() {
  return (
    <div className="py-17 px-43 bg-bg-light">
      <Text
        btext="Frequently Asked Question"
        heading="Common questions, clear answers."
      />
      <div className="px-56 pt-16">
        {faqs.map((freq) => {
          return (
            <div className="flex justify-between mb-6">
              <p>{freq.ques}</p>
              <img
                className="bg-white rounded-xl px-[2px] py-[1px]"
                src="./assets/add.svg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
