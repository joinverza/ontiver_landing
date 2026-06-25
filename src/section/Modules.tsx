import Text from "../components/base/Text";

export default function Modules() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20 bg-bg-light">
      <Text
        btext="Product Modules"
        heading="Everything your identity workflow needs."
      />
      
      {/* Bento Grid */}
      <div className="text-white flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch mt-10">
        {/* Left Column (Tall) */}
        <div className="relative bg-[url('/assets/fingerprint.png')] bg-cover bg-center h-[512px] w-full md:w-[349px] rounded-3xl shrink-0 overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <h5 className="font-medium text-xl pb-2">
              Identity Verification
            </h5>
            <p className="text-sm text-white/90 leading-relaxed">
              Supports document, biometric, and MFA verification with audit logs.
            </p>
          </div>
        </div>

        {/* Right Columns Container */}
        <div className="flex flex-col gap-4 w-full md:w-[832px]">
          {/* Top Wide */}
          <div className="relative bg-[url('/assets/portal.png')] bg-cover bg-center h-[243px] w-full rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="w-[273px] absolute left-[28px] top-[100px] md:top-[120px] z-10">
              <h5 className="font-medium text-xl pb-2">
                Reusable Credentials
              </h5>
              <p className="text-sm text-white/90 leading-relaxed">
                Verified identity is stored as portable proof for returning users.
              </p>
            </div>
            <img
              className="absolute right-0 top-0 h-full object-cover md:object-contain opacity-50 md:opacity-100"
              src="./assets/check.png"
              alt="check-image"
            />
          </div>

          {/* Bottom Two */}
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="relative bg-[url('/assets/quadrant.png')] bg-cover bg-center h-[253px] w-full md:w-1/2 rounded-3xl overflow-hidden group">
              <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
              <div className="z-10 w-[200px] absolute left-[28px] top-[26px]">
                <h5 className="font-medium text-xl pb-2">
                  Consent Management
                </h5>
                <p className="text-sm text-white/90 leading-relaxed">
                  All identity sharing requires user consent with full control and history.
                </p>
              </div>
              <img
                className="absolute right-[-20px] top-[-10px] opacity-70"
                src="./assets/share.png"
                alt="share-image"
              />
            </div>

            <div className="relative bg-[url('/assets/matrix.png')] bg-cover bg-center rounded-3xl h-[253px] w-full md:w-1/2 overflow-hidden group">
              <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
              <div className="z-10 w-[200px] absolute left-[24px] bottom-[26px]">
                <h5 className="font-medium text-xl pb-2">
                  AML & Risk Checks
                </h5>
                <p className="text-sm text-white/90 leading-relaxed">
                  Built-in AML, PEP, sanctions, and watchlist screening.
                </p>
              </div>
              <img
                className="absolute right-[-20px] top-[-17px] opacity-60"
                src="./assets/radar.png"
                alt="radar-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="text-white flex flex-col md:flex-row gap-4 justify-center items-center md:items-stretch mt-4">
        <div className="relative bg-[url('/assets/chips.png')] bg-cover bg-center rounded-3xl h-[243px] w-full md:w-[832px] overflow-hidden group">
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
          <div className="w-[250px] absolute left-[31px] top-[100px] md:top-[120px] z-10">
            <h5 className="font-medium text-xl pb-2">Business Dashboard</h5>
            <p className="text-sm text-white/90 leading-relaxed">
              Central dashboard for verification logs, consent, and compliance reports.
            </p>
          </div>
        </div>
        
        <div className="relative bg-[url('/assets/systems.png')] bg-cover bg-center rounded-3xl w-full md:w-[349px] h-[243px] overflow-hidden group shrink-0">
          <div className="rounded-3xl absolute inset-0 bg-gradient-to-r from-[#05150E] to-[#05150E]/80 group-hover:to-[#05150E]/60 transition-colors"></div>
          <div className="z-10 w-[281px] absolute left-[25px] top-[21px]">
            <h5 className="font-medium text-xl pb-2">Developer API</h5>
            <p className="text-sm text-white/90 leading-relaxed">
              Sandbox, API, and webhooks for easy integration and testing.
            </p>
          </div>
          <img
            className="absolute right-[50px] bottom-[30px] opacity-40 mix-blend-screen"
            src="./assets/code.png"
            alt="code-image"
          />
        </div>
      </div>
    </div>
  );
}
