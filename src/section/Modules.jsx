import React from "react";
import Text from "../components/base/Text";

// const modules = [
//   {
//     image: "./assets/fingerprint.png",
//     title: "Identity Verification",
//     para: "Supports document, biometric, and MFA verification with audit logs.",
//     classname: "h-[512px] w-[349px]",
//     col: 1,
//     row: 1,
//     rspan: 2,
//     cspan: 1,
//   },
//   {
//     image: "./assets/portal.png",
//     title: "Reusable Credentials",
//     para: "Verified identity is stored as portable proof for returning users.",
//     extra: "./assets/portal.png",
//     classname: "h-[243px] w-[832px]",
//     col: 2,
//     row: 1,
//     rspan: 1,
//     cspan: 2,
//   },
//   {
//     image: "./assets/quadrant.png",
//     title: "Consent Management",
//     para: "All identity sharing requires user consent with full control and history.",
//     extra: "./assets/portal.png",
//     classname: "h-[261px] w-[412px]",
//     col: 2,
//     row: 2,
//     // rspan: 1,
//     // cspan: 1,
//   },
//   {
//     image: "./assets/matrix.png",
//     title: "AML & Risk Checks",
//     para: "Built-in AML, PEP, sanctions, and watchlist screening.",
//     extra: "./assets/portal.png",
//     classname: "h-[261px] w-[412px]",
//     col: 3,
//     row: 2,
//     // rspan: 1,
//     // cspan: 1,
//   },
//   {
//     image: "./assets/chips.png",
//     title: "Business Dashboard",
//     para: "Central dashboard for verification logs, consent, and compliance reports.",
//     classname: "h-[243px] w-[832px]",
//     col: 1,
//     row: 3,
//     // rspan: 1,
//     // cspan: 2,
//   },
//   {
//     image: "./assets/systems.png",
//     title: "Developer API",
//     para: "Sandbox, API, and webhooks for easy integration and testing.",
//     extra: "./assets/portal.png",
//     classname: "w-[349px] h-[243px]",
//     col: 3,
//     row: 3,
//     // rspan: 1,
//     // cspan: 1,
//   },
// ];

export default function Modules() {
  return (
    <div className="py-15 px-31 bg-bg-light">
      <Text
        btext="Product Modules"
        heading="Everything your identity workflow needs."
      />
      <div className=" text-white">
        <div className="flex gap-2 mb-2">
          <div className="relative bg-[url('./assets/fingerprint.png')] bg-cover bg-center h-[512px] w-[349px] rounded-3xl">
            <div className="absolute left-[31px] top-[393px]">
              <h5 className="font-medium text-xl pb-2">
                Identity Verification
              </h5>
              <p className="text-sm text-white/90">
                Supports document, biometric, and MFA verification with audit
                logs.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative bg-[url('./assets/portal.png')] bg-cover bg-center h-[243px] w-[832px] rounded-3xl">
              <div className="w-[273px] absolute left-[28px] top-[136px]">
                <h5 className="font-medium text-xl pb-2">
                  Reusable Credentials
                </h5>
                <p className="text-sm text-white/90">
                  Verified identity is stored as portable proof for returning
                  users.
                </p>
              </div>
              <img
                className=" absolute left-[563px] -top-[8px]"
                src="./assets/check.png"
                alt="check-image"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative bg-[url('./assets/quadrant.png')] bg-cover bg-center h-[261px] w-[412px] rounded-3xl">
                <div className="z-10 w-[167px] absolute left-[28px] top-[26px]">
                  <h5 className="font-medium text-xl pb-2">
                    Consent Management
                  </h5>
                  <p className="text-sm text-white/90">
                    All identity sharing requires user consent with full control
                    and history.
                  </p>
                </div>

                <img
                  className=" absolute left-[97px] -top-[10px]"
                  src="./assets/share.png"
                  alt="share-image"
                />
                <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-light-[#05150E]/0"></div>
              </div>
              <div className="relative bg-[url('./assets/matrix.png')] bg-cover bg-center rounded-3xl h-[261px] w-[412px]">
                <div className="z-10 w-[148px] absolute left-[24px] top-[120px]">
                  <h5 className=" font-medium text-xl pb-2">
                    AML & Risk Checks
                  </h5>
                  <p className="text-sm text-white/90">
                    Built-in AML, PEP, sanctions, and watchlist screening.
                  </p>
                </div>
                <img
                  className=" absolute left-[155px] -top-[17px]"
                  src="./assets/radar.png"
                  alt="radar-image"
                />
                <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-light-[#05150E]/0"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative bg-[url('./assets/chips.png')] bg-cover bg-center rounded-3xl h-[243px] w-[832px]">
            <div className="w-[212px] absolute left-[31px] top-[129px]">
              <h5 className="font-medium text-xl pb-2">Business Dashboard</h5>
              <p className="text-sm text-white/90">
                Central dashboard for verification logs, consent, and compliance
                reports.
              </p>
            </div>
          </div>
          <div className="relative bg-[url('./assets/systems.png')] bg-cover bg-center rounded-3xl w-[349px] h-[243px]">
            <div className="z-10 w-[281px] absolute left-[25px] top-[21px]">
              <h5 className="font-medium text-xl pb-2">Developer API</h5>
              <p className="text-sm text-white/90">
                Sandbox, API, and webhooks for easy integration and testing.
              </p>
            </div>
            <img
              className="rotate-[0.14deg] absolute left-[140.11px] top-[126.11px]"
              src="./assets/code.png"
              alt="code-image"
            />
            <img
              className="rotate-[-6.25deg] absolute left-[288.51px] top-[183.51px]"
              src="./assets/code.png"
              alt="code-image"
            />
            <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-light-[#05150E]/0"></div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 grid-rows-3">
        {modules.map((mode) => {
          return (
            <div
              className={`bg-cover bg-center rounded-3xl ${mode.classname} row-start-${mode.row} col-start-${mode.col} `}
              style={{ backgroundImage: `url(${mode.image})` }}
            >
              <h5>{mode.title}</h5>
              <p>{mode.para}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
