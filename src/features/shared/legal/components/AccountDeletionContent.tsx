import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import DeletionPanel from "./DeletionPanel";

const AccountDeletionContent = () => (
  <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
    <div className="space-y-8">
      <section>
        <p className="eyebrow mb-3">Account &amp; data</p>
        <h2 className="text-card-title font-semibold tracking-[-0.02em]">Before you begin</h2>
        <p className="mt-4 text-body text-[#002d0e]/65">
          This form verifies your email and submits a deletion request. Keep the request reference
          so support can help you check its progress.
        </p>
      </section>
      <section className="border-t border-[#dde6dc] pt-8">
        <h2 className="text-card-title font-semibold tracking-[-0.02em]">Before confirming</h2>
        <p className="mt-4 text-body text-[#002d0e]/65">
          You are asking to permanently delete your account. Contact support if you need to clarify
          the scope of deletion, data retention, or the status of an existing request.
        </p>
      </section>
      <section className="border-t border-[#dde6dc] pt-8">
        <h2 className="text-card-title font-semibold tracking-[-0.02em]">What happens next</h2>
        <ol className="mt-5 space-y-4">
          {[
            "Request a code for your account email.",
            "Enter the six-digit code and confirm your deletion request.",
            "Save the request reference and any response shown.",
          ].map((item, index) => (
            <li key={item} className="flex gap-3 text-body text-[#002d0e]/65">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf5eb] text-meta font-semibold text-[#007d21]">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </section>
      <p className="flex flex-wrap items-center gap-2 border-t border-[#dde6dc] pt-6 text-sm text-[#002d0e]/55">
        <Mail size={16} aria-hidden="true" /> Need help?{" "}
        <Link className="font-semibold text-[#007d21] underline underline-offset-4" to="/support">
          Open support
        </Link>
      </p>
    </div>
    <DeletionPanel />
  </div>
);

export default AccountDeletionContent;
