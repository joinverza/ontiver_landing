import { problems } from "../../../data/problem";
import { individualProblems } from "../../../data/audienceContent";
import type { Audience } from "../../../lib/audience";
import Text from "../../base/Text";
import ProblemCard from "../../ui/ProblemCard";
import SignalFlowBackground from "../../ui/SignalFlowBackground";

export default function Problem({ audience }: { audience: Audience }) {
  return (
    <div
      data-scroll-reveal
      className="relative w-full overflow-hidden bg-bg-light"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <SignalFlowBackground />  
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-20 pb-32 px-6 md:px-10 lg:px-20">
        <div className="flex flex-col gap-2 w-full relative z-20">
          <Text 
            btext={audience === "enterprise" ? "The Enterprise Problem" : "The Problem"}
            heading={
              audience === "enterprise"
                ? "Identity operations should not slow down growth."
                : "Proving who you are should not feel this repetitive."
            }
            animate={false}
          />
        </div>

        <div className="relative z-10">
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {(audience === "enterprise" ? problems : individualProblems).map((prob) => (
              <div
                key={prob.title}
                className="problem-card-wrapper relative"
              >
                <ProblemCard
                  illustration={prob.illustration}
                  title={prob.title}
                  description={prob.para}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
