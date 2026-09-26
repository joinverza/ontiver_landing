import { Fingerprint, KeyRound, ShieldCheck, WalletCards, ListChecks, Send } from "lucide-react";
import { MotionToggle } from "../../../../shared/components/motion/MotionSettings";
import type { Audience } from "../../../../shared/lib/audience";

const individualItems = [
  { title: "Verify once", icon: Fingerprint },
  { title: "Approve every share", icon: ShieldCheck },
  { title: "Stay in control", icon: KeyRound },
  { title: "Know who's asking", icon: Send },
  { title: "Keep your proof", icon: WalletCards },
];
const enterpriseItems = [
  { title: "Verify once, reuse everywhere", icon: Fingerprint },
  { title: "Consent-based sharing", icon: ShieldCheck },
  { title: "Audit-ready by design", icon: ListChecks },
  { title: "One platform, every workflow", icon: KeyRound },
];

const IdentityMarquee = ({ audience }: { audience: Audience }) => {
  const enterprise = audience === "enterprise";
  const items = enterprise ? enterpriseItems : individualItems;
  return (
    <section aria-label="The reusable identity journey" className="bg-white py-9 sm:py-12">
      <div className="site-container">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-meta text-[#526058]">
            {enterprise
              ? "Enterprise operations. User control. One connected journey."
              : "Your identity, shared on your terms."}
          </p>
          <MotionToggle className="text-[#526058]" />
        </div>
        <div className="trust-marquee">
          <div className="trust-marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="trust-marquee-set"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {items.map(({ title, icon: Icon }) => (
                  <span
                    key={title}
                    className="flex items-center gap-4 rounded-2xl bg-[#f4f6f1] px-8 py-5 text-card-title font-medium"
                  >
                    <Icon size={27} className="text-[#007d21]" aria-hidden="true" />
                    {title}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentityMarquee;
