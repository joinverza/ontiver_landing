import Text from "../components/base/Text";
import Button from "../components/base/Button";

const pricing = [
  {
    package: "Sandbox",
    price: "0",
    details: "Teams testing API flows before production.",
    button: "Start Sandbox",
    className: "bg-[#FDFFFD]",
    list: [
      "Test Environment",
      "Docs",
      "Sandbox keys",
      "Sample responses",
      "No production checks",
    ],
  },
  {
    package: "Launch",
    price: "199",
    details: "Early production pilots and small compliance teams.",
    button: "Start Launch",
    className: "bg-[#FBFFFB]",
    list: [
      "500 verifications",
      "5,000 API requests",
      "Optional AML add-on",
      "Basic dashboard",
      "Email support.",
    ],
  },
  {
    package: "Growth",
    price: "499",
    details: "Growing fintechs, lenders, marketplaces, schools. Popular plan.",
    button: "Choose Growth",
    className: "bg-[#F8FFF8]",
    list: [
      "1,000 verifications",
      "50,000 API requests",
      "250 AML screens",
      "Basic reporting",
      "Email support.",
    ],
  },
  {
    package: "Compliance",
    price: "999",
    details: "Regulated teams needing proof, audit, and risk coverage.",
    button: "Choose Compliance",
    className: "bg-[#F5FFF5]",
    list: [
      "3,000 verifications",
      "100,000 API requests",
      "500 AML screens",
      "1,000 monitoring profiles",
      "Audit logs",
      "Compliance export",
      "Priority support",
    ],
  },
  {
    package: "Enterprise",
    price: "",
    details: "High-volume teams with custom workflows and SLAs.",
    button: "Contact Sales",
    className: "bg-[#FDFFFD]",
    list: [
      "Custom volume",
      "Dedicated onboarding",
      "SLA",
      "Compliance review",
      "Security review",
      "Account manager",
    ],
  },
];

export default function Price() {
  return (
    <div id="pricing" className="px-29 py-24 bg-bg-light">
      <Text
        btext="Identity Infrastructure That Pays for Itself"
        heading="Pay for Trust. Not Repeated Verification."
      />
      <div className="flex gap-[2px]">
        {pricing.map((price, index) => {
          return (
            <div className={`${price.className} p-5 rounded-lg`}>
              <div>
                <h3
                  className={`text-lg ${index === 1 ? "bg-gradient-to-r from-dark-primary to-light-primary bg-clip-text text-transparent" : index === 2 ? "text-[#00291B] : text-black" : "text-black"}`}
                >
                  {price.package}
                </h3>
                <h2 className="text-2xl my-4">
                  ${price.price}
                  <span className="text-base">/mo</span>
                </h2>
                <p className="text-sm">{price.details}</p>
                <Button
                  className={`mt-9 border-[0.5px] border-[00291b]/50 py-3 px-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.1)] ${index === 1 ? "text-white bg-gradient-to-r from-dark-primary to-light-primary" : "bg-[#FAFAFA]"}`}
                  text={price.button}
                />
              </div>
              <hr className="my-4 border-[0.8px] border-black/70" />
              <div className="pb-6">
                {price.list.map((item) => {
                  return (
                    <div className="flex gap-2 text-sm">
                      <img src="./assets/tick.svg" alt="tick-icon" />
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
