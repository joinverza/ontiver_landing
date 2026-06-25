import Text from "../components/base/Text";

export default function UseCase() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20 text-white">
      <Text
        className="border-white"
        btext="Use Cases Routing"
        heading="Built for the teams that need verified trust most."
      />
      <div className="mt-10 flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative bg-[url('/assets/fintech.png')] bg-cover bg-center h-[299px] flex-1 rounded-3xl overflow-hidden group">
                <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/40 group-hover:bg-[#163A2A]/20 transition-colors duration-500"></div>
                <div className="z-10 w-full max-w-[212px] absolute left-8 bottom-12">
                  <h5 className="font-medium text-xl pb-2">Fintechs</h5>
                  <p className="text-sm text-white/90">
                    Reduce KYC friction during onboarding.
                  </p>
                </div>
              </div>
              <div className="relative bg-[url('/assets/lenders.png')] bg-cover bg-center h-[299px] flex-1 rounded-3xl overflow-hidden group">
                <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/50 group-hover:bg-[#163A2A]/30 transition-colors duration-500"></div>
                <div className="z-10 w-full max-w-[205px] absolute left-8 bottom-12">
                  <h5 className="font-medium text-xl pb-2">Digital Lenders</h5>
                  <p className="text-sm text-white/90">
                    Verify borrowers before approval.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative bg-[url('/assets/platforms.png')] bg-cover bg-center h-[243px] w-full rounded-3xl overflow-hidden group">
              <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/40 group-hover:bg-[#163A2A]/20 transition-colors duration-500"></div>
              <div className="z-10 w-full max-w-[212px] absolute left-8 top-1/2 -translate-y-1/2">
                <h5 className="font-medium text-xl pb-2">HR Platforms</h5>
                <p className="text-sm text-white/90">
                  Verify candidates before onboarding.
                </p>
              </div>
            </div>
          </div>
          <div className="relative bg-[url('/assets/marketplaces.png')] bg-cover bg-center h-[300px] lg:h-auto w-full lg:w-[394px] shrink-0 rounded-3xl overflow-hidden group">
            <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/30 group-hover:bg-[#163A2A]/10 transition-colors duration-500"></div>
            <div className="z-10 absolute w-full max-w-[212px] left-8 top-12">
              <h5 className="font-medium text-xl pb-2">Marketplaces</h5>
              <p className="text-sm text-white/90">
                Build trust across buyers, sellers, and vendors.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative bg-[url('/assets/schools.png')] bg-cover bg-center h-[243px] flex-1 rounded-3xl overflow-hidden group">
            <div className="rounded-3xl absolute inset-0 bg-[#012616]/50 group-hover:bg-[#012616]/30 transition-colors duration-500"></div>
            <div className="w-full max-w-[212px] z-10 absolute left-8 top-1/2 -translate-y-1/2">
              <h5 className="font-medium text-xl pb-2">Schools</h5>
              <p className="text-sm text-white/90">
                Verify students, applicants, and credential holders.
              </p>
            </div>
          </div>
          <div className="relative bg-[url('/assets/teams.png')] bg-cover bg-center h-[243px] flex-1 rounded-3xl overflow-hidden group">
            <div className="rounded-3xl absolute inset-0 bg-[#163A2A]/40 group-hover:bg-[#163A2A]/20 transition-colors duration-500"></div>
            <div className="z-10 w-full max-w-[212px] absolute left-8 top-1/2 -translate-y-1/2">
              <h5 className="font-medium text-xl pb-2">Compliance Teams</h5>
              <p className="text-sm text-white/90">
                Build a defensible verification workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

