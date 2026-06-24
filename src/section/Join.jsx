import React from "react";
import Button from "../components/base/Button";

export default function Join() {
  return (
    <div className="text-white mx-50 px-57 py-16 my-8 rounded-3xl bg-[linear-gradient(to_right,#009311_0%,#002d0e_15%,#002d0e_30%,#002d0e_45%,#002d0e_60%,#002d0e_75%,#002d0e_90%,#009311_100%)]">
      <div className="flex flex-col gap-2 mb-8">
        <h4 className="rounded-3xl py-2 px-6 border-[0.5px] border-white w-fit mx-auto">
          Early Access
        </h4>
        <h2 className="font-medium text-2xl leading-[120%] mx-auto text-center">
          Be among the first to use reusable identity
        </h2>
        <p className="text-[#B2B2B2]">
          Join the waitlist for early access to Ontiver's personal identity
          wallet — verify once, control your data, and share with consent.
        </p>
      </div>

      <div>
        <input
          className="pt-4 pr-20 rounded-[56px] border-1 text-[#B2B2B2] mr-2 pb-5 pl-5 "
          placeholder="Enter your email address"
        />
        <Button
          text="Join Waitlist"
          className="fomt-medium py-3 px-15 text-lg rounded-3xl bg-gradient-to-r from-dark-primary to-light-primary"
        />
      </div>
    </div>
  );
}
