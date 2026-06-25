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
    <div className="w-full max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20 bg-bg-light">
      <Text
        btext="The Solution"
        heading="One verification. Trusted everywhere."
      />
      <div className="mt-10 max-w-5xl mx-auto flex flex-col gap-12">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 relative">
          {firstsolu.map((solu, idx) => {
            return (
              <div key={idx} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left flex-1 relative">
                <div className="flex flex-col items-center md:items-start w-full relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-white border-2 border-black/5 shadow-sm rounded-2xl mb-4 md:mb-6 mx-auto md:mx-0">
                    <img src={solu.image} alt={solu.title} className="w-8 h-8" />
                  </div>
                  <div className="w-full max-w-[250px] mx-auto md:mx-0">
                    <h6 className="font-semibold text-lg pb-2">{solu.title}</h6>
                    <p className="text-black/60 text-sm leading-relaxed">{solu.para}</p>
                  </div>
                </div>

                {solu.line && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] -z-10">
                    <img className="w-full opacity-50" src={solu.line} alt="" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Second Row */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-24 relative mt-4">
          {secondsolu.map((solu, idx) => {
            return (
              <div key={`second-${idx}`} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left flex-1 max-w-[300px] relative">
                <div className="flex flex-col items-center md:items-start w-full relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-white border-2 border-black/5 shadow-sm rounded-2xl mb-4 md:mb-6 mx-auto md:mx-0">
                    <img src={solu.image} alt={solu.title} className="w-8 h-8" />
                  </div>
                  <div className="w-full max-w-[270px] mx-auto md:mx-0">
                    <h6 className="font-semibold text-lg pb-2">{solu.title}</h6>
                    <p className="text-black/60 text-sm leading-relaxed">{solu.para}</p>
                  </div>
                </div>

                {solu.line && (
                  <div className="hidden md:block absolute top-8 left-[70%] w-[120%] -z-10">
                    <img className="w-full opacity-50" src={solu.line} alt="" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
