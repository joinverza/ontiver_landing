import React from "react";

export default function Text({ btext, heading, className }) {
  return (
    <div className="flex flex-col gap-2 pb-15">
      <h4 className="rounded-3xl py-2 px-6 border-1 border-border w-fit mx-auto">
        {btext}
      </h4>
      <h2
        className={className}
        className="w-[431px] text-2xl leading-[120%] mx-auto text-center"
      >
        {heading}
      </h2>
    </div>
  );
}
