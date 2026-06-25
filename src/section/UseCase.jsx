import React from "react";
import Text from "../components/base/Text";

export default function UseCase() {
  return (
    <div className="py-15 px-31 bg-[#06160F]  text-white">
      <Text
        className="border-white"
        btext="Use Cases Routing"
        heading="Built for the teams that need verified trust most."
      />
      <div>
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="relative bg-[url('./assets/fintech.png')] bg-cover bg-center h-[299px] w-[394px] rounded-3xl">
                <div className="z-10 w-[212px] absolute left-[31px] top-[207px]">
                  <h5 className="font-medium text-xl pb-2">Fintechs</h5>
                  <p className="text-sm text-white/90">
                    Reduce KYC friction during onboarding.
                  </p>
                </div>

                <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/30"></div>
              </div>
              <div className="relative bg-[url('./assets/lenders.png')] bg-cover bg-center rounded-3xl h-[299px] w-[395px]">
                <div className="z-10 w-[205px] absolute left-[27px] top-[207px]">
                  <h5 className=" font-medium text-xl pb-2">Digital Lenders</h5>
                  <p className="text-sm text-white/90">
                    Verify borrowers before approval.
                  </p>
                </div>

                <div className="rounded-3xl absolute inset-0 bg-[##163A2A]/40"></div>
              </div>
            </div>
            <div className="relative bg-[url('./assets/platforms.png')] bg-cover bg-center h-[243px] w-[797px] rounded-3xl">
              <div className="z-10 w-[212px] absolute left-[31px] top-[138px]">
                <h5 className="font-medium text-xl pb-2">HR Platforms</h5>
                <p className="text-sm text-white/90">
                  Verify candidates before onboarding.
                </p>
              </div>
              <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/30"></div>
            </div>
          </div>
          <div className="relative bg-[url('./assets/marketplaces.png')] bg-cover bg-center h-[550px] w-[394px] rounded-3xl">
            <div className="z-10 absolute w-[212px] left-[35px] top-[43px]">
              <h5 className="font-medium text-xl pb-2">Marketplaces</h5>
              <p className="text-sm text-white/90">
                Build trust across buyers, sellers, and vendors.
              </p>
            </div>
            <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/20"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative bg-[url('./assets/schools.png')] bg-cover bg-center rounded-3xl h-[243px] w-[589px]">
            <div className="w-[212px] z-10 absolute left-[31px] top-[149px]">
              <h5 className="font-medium text-xl pb-2">Schools</h5>
              <p className="text-sm text-white/90">
                Verify students, applicants, and credential holders.
              </p>
            </div>
            <div className="rounded-3xl absolute inset-0 bg-[#012616]/40"></div>
          </div>
          <div className="relative bg-[url('./assets/teams.png')] bg-cover bg-center rounded-3xl  h-[243px] w-[589px]">
            <div className="z-10 w-[212px] absolute left-[31px] top-[149px]">
              <h5 className="font-medium text-xl pb-2">Compliance Teams</h5>
              <p className="text-sm text-white/90">
                Build a defensible verification workflow.{" "}
              </p>
            </div>
            <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

//
