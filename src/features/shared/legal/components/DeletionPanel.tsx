import { useState, type FormEvent } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import {
  confirmAccountDeletion,
  requestAccountDeletionCode,
} from "../../../../shared/lib/landingApi";

const DeletionPanel = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "confirm" | "done">("request");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy || (step === "confirm" && !confirmed)) return;
    setBusy(true);
    setError("");
    try {
      if (step === "request") {
        const result = await requestAccountDeletionCode(email);
        setMessage(
          result?.message ||
            "If this email is eligible, a six-digit verification code will be sent. Enter it below to continue.",
        );
        setStep("confirm");
      } else {
        const result = await confirmAccountDeletion(email, code);
        if (!result?.requestId)
          throw new Error(
            "We could not confirm a request reference. Please contact support before trying again.",
          );
        setMessage(
          `${result.message || "Your deletion request has been received."} Reference: ${result.requestId}`,
        );
        setStep("done");
      }
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not submit this request.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "done") {
    return (
      <div
        role="status"
        className="h-fit rounded-[24px] border border-[#c7dfc4] bg-[#edf5eb] p-6 sm:p-8"
      >
        <CheckCircle2 className="mb-5 h-8 w-8 text-[#009311]" aria-hidden="true" />
        <h3 className="text-card-title font-semibold text-[#002d0e]">Deletion request received</h3>
        <p className="mt-3 text-body text-[#002d0e]/65">{message}</p>
        <p className="mt-3 text-body text-[#002d0e]/65">
          This acknowledges your request; it does not confirm that account deletion has finished. If
          you did not make this request, contact support immediately.
        </p>
        <Link
          to="/support"
          className="mt-5 inline-flex text-body font-medium text-[#007d21] underline underline-offset-4"
        >
          Contact support
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="h-fit rounded-[24px] bg-[#edf5eb] p-6 sm:p-8">
      <ShieldCheck className="h-7 w-7 text-[#007d21]" aria-hidden="true" />
      <p className="eyebrow mt-5">Step {step === "request" ? "01" : "02"} / 02</p>
      <h2 className="mt-3 text-card-title font-semibold tracking-[-0.02em] text-[#002d0e]">
        {step === "request" ? "Verify your email" : "Enter your verification code"}
      </h2>
      <p className="mt-3 text-body text-[#002d0e]/65">
        {step === "request" ? "Enter your email to start the account deletion process." : message}
      </p>
      {step === "request" && (
        <p className="mt-3 text-meta text-[#002d0e]/55">
          A six-digit code is sent only if the email is eligible.
        </p>
      )}
      <label className="mt-6 block text-sm font-medium" htmlFor="deletion-email">
        Account email
      </label>
      <input
        id="deletion-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        disabled={step === "confirm"}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10 disabled:bg-white/60 disabled:text-[#002d0e]/50"
      />
      {step === "confirm" && (
        <>
          <label className="mt-5 block text-sm font-medium" htmlFor="deletion-code">
            Six-digit code
          </label>
          <input
            id="deletion-code"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            className="mt-2 min-h-12 w-full rounded-xl border border-[#dde6dc] bg-white px-4 text-body tracking-[.35em] outline-none focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10"
          />
          <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              required
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#009311]"
            />
            <span>
              I want to request permanent account deletion. I understand that submitting this
              request does not confirm completion.
            </span>
          </label>
        </>
      )}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="button-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60"
      >
        {busy
          ? "Submitting..."
          : step === "request"
            ? "Send verification code"
            : "Confirm deletion request"}
      </button>
      {step === "confirm" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setStep("request");
            setCode("");
            setConfirmed(false);
            setMessage("");
            setError("");
          }}
          className="mt-4 text-sm font-medium text-[#007d21] underline underline-offset-4"
        >
          Use another email or request a new code
        </button>
      )}
    </form>
  );
};

export default DeletionPanel;
