import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";
import {
  sendPricingInquiry,
  type PricingInquiryRequest,
} from "../lib/landingApi";

const planOptions = {
  launch: "Launch",
  growth: "Growth",
  compliance: "Compliance",
  enterprise: "Enterprise",
} as const;

type PlanKey = keyof typeof planOptions;
type FormValues = {
  planKey: PlanKey;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  role: string;
  country: string;
  monthlyVerifications: string;
  useCase: string;
  complianceNeeds: string;
  timeline: string;
  meetingPreference: string;
  website: string;
};

const fieldClass =
  "mt-3 h-14 w-full rounded-[10px] border border-[#dde6dc] bg-white px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10";
const textareaClass = `${fieldClass} min-h-32 resize-y py-3.5`;

export default function EnterpriseContactPage() {
  const [searchParams] = useSearchParams();
  const initialPlan = useMemo<PlanKey>(() => {
    const plan = searchParams.get("plan")?.toLowerCase();
    return plan && plan in planOptions ? (plan as PlanKey) : "enterprise";
  }, [searchParams]);
  const requestKind = searchParams.get("request");
  const isSandboxRequest = requestKind === "sandbox";
  const isSecurityRequest = requestKind === "security-documentation";
  const billing = searchParams.get("billing");
  const billingContext = billing === "monthly" || billing === "annual" ? billing : null;
  const volumeParam = searchParams.get("monthlyVerifications") || "";
  const initialVolume = /^\d+$/.test(volumeParam) && Number(volumeParam) <= 100000000 ? String(Number(volumeParam)) : "";
  const [values, setValues] = useState<FormValues>({
    planKey: initialPlan,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    monthlyVerifications: initialVolume,
    useCase: isSandboxRequest ? "Sandbox API and workflow testing" : isSecurityRequest ? "Request security documentation for our Ontiver evaluation." : "",
    complianceNeeds: isSecurityRequest ? "Please share the security and compliance documentation available for review." : "",
    timeline: "",
    meetingPreference: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const payload: PricingInquiryRequest = {
      planKey: values.planKey,
      planName: planOptions[values.planKey],
      companyName: values.companyName,
      contactName: values.contactName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      country: values.country,
      monthlyVerifications: values.monthlyVerifications
        ? Number(values.monthlyVerifications)
        : undefined,
      useCase: values.useCase,
      complianceNeeds: values.complianceNeeds,
      timeline: values.timeline,
      meetingPreference: values.meetingPreference,
      website: values.website,
      message: [
        billingContext ? `Preferred billing: ${billingContext}` : "",
        isSandboxRequest ? "Request type: Sandbox API and workflow testing access" : "",
        isSecurityRequest ? "Request type: Security documentation" : "",
      ].filter(Boolean).join("\n") || undefined,
    };

    try {
      await sendPricingInquiry(payload);
      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not submit your request. Please try again."
      );
    }
  };

  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <div>
            <p className="eyebrow">Enterprise access</p>
            <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">
              Talk to the Ontiver team.
            </h1>
          </div>
          <p className="mt-7 max-w-[800px] text-subtitle text-[#526058]">
            Tell us who you need to verify, which checks matter, and who reviews the results.
            We will scope a pilot around consent, evidence, your dashboard or API integration, and measurable outcomes.
          </p>
        </div>
      </section>
      <section className="pb-20 lg:pb-32">
        <div className="site-container">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
            <aside className="order-2 min-w-0 text-[#002d0e]">
              <div data-scroll-reveal><ContextPhoto image={imagery.candidateReview} size="wide" /></div>
              <div className="mt-6 rounded-2xl bg-[#f5f6f3] p-6 sm:p-7">
              <div className="divide-y divide-[#002d0e]/15 text-body text-[#526058]">
                {[
                  "Confirm sources and checks",
                  "Define consent, reviewers, and evidence",
                  "Measure completion, review time, and reuse",
                ].map((item) => (
                  <span key={item} className="flex items-start gap-3 py-5">
                    <Check className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 border-t border-[#002d0e]/15 pt-5 text-meta text-[#526058]">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
                Please don't include sensitive documents or identification numbers in this form — we'll request evidence securely through the platform if needed.
              </div>
              </div>
              <Link to="/enterprise/support" className="mt-6 flex items-center justify-between gap-4 border-y border-[#dde6dc] py-5 text-body font-medium">Enterprise Support<ArrowUpRight size={20} aria-hidden="true" /></Link>
            </aside>

            <form
              onSubmit={submit}
              aria-busy={status === "sending"}
              className="order-1 min-w-0 bg-white"
            >
              <h2 className="text-card-title font-medium">Request enterprise access</h2>
              {isSandboxRequest ? <p className="mt-3 border-l-2 border-[#007d21] pl-4 text-body text-[#526058]">You're requesting sandbox access for API and workflow testing. The team will follow up with next steps.</p> : null}
              {isSecurityRequest ? <p className="mt-3 border-l-2 border-[#007d21] pl-4 text-body text-[#526058]">You're requesting security documentation. Add any requirements your team needs to review.</p> : null}
              {billingContext ? <p className="mt-3 text-body text-[#526058]">Preferred billing: <span className="font-medium capitalize">{billingContext}</span></p> : null}
              <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2 [&>label]:text-body [&>label]:font-medium">
                <label className="text-sm font-semibold">
                  Preferred plan
                  <select
                    className={fieldClass}
                    value={values.planKey}
                    onChange={(event) =>
                      update("planKey", event.target.value as PlanKey)
                    }
                  >
                    {Object.entries(planOptions).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold">
                  Company name *
                  <input
                    required
                    minLength={2}
                    className={fieldClass}
                    autoComplete="organization"
                    value={values.companyName}
                    onChange={(event) => update("companyName", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Contact name *
                  <input
                    required
                    minLength={2}
                    className={fieldClass}
                    autoComplete="name"
                    value={values.contactName}
                    onChange={(event) => update("contactName", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Email *
                  <input
                    required
                    type="email"
                    className={fieldClass}
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Phone
                  <input
                    className={fieldClass}
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(event) => update("phone", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Role
                  <input
                    className={fieldClass}
                    autoComplete="organization-title"
                    value={values.role}
                    onChange={(event) => update("role", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Country
                  <input
                    className={fieldClass}
                    autoComplete="country-name"
                    value={values.country}
                    onChange={(event) => update("country", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold">
                  Monthly verifications
                  <input
                    className={fieldClass}
                    type="number"
                    min="0"
                    max="100000000"
                    inputMode="numeric"
                    value={values.monthlyVerifications}
                    onChange={(event) =>
                      update("monthlyVerifications", event.target.value)
                    }
                  />
                </label>
                <label className="text-sm font-semibold">
                  Timeline
                  <select
                    className={fieldClass}
                    value={values.timeline}
                    onChange={(event) => update("timeline", event.target.value)}
                  >
                    <option value="">Select a timeline</option>
                    <option>Immediately</option>
                    <option>Within 30 days</option>
                    <option>Within 3 months</option>
                    <option>Researching options</option>
                  </select>
                </label>
                <label className="text-sm font-semibold">
                  Meeting preference
                  <select
                    className={fieldClass}
                    value={values.meetingPreference}
                    onChange={(event) =>
                      update("meetingPreference", event.target.value)
                    }
                  >
                    <option value="">Select a preference</option>
                    <option>Email first</option>
                    <option>15-minute discovery call</option>
                    <option>Technical demo</option>
                    <option>Security review</option>
                  </select>
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Use case *
                  <textarea
                    required
                    minLength={10}
                    className={textareaClass}
                    placeholder="For example: borrower onboarding with identity, phone, NIN/BVN where appropriate, consent, and lender review."
                    value={values.useCase}
                    onChange={(event) => update("useCase", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Compliance needs
                  <textarea
                    className={textareaClass}
                    placeholder="Required checks, reviewer roles, consent scope, retention, audit records, or security review."
                    value={values.complianceNeeds}
                    onChange={(event) =>
                      update("complianceNeeds", event.target.value)
                    }
                  />
                </label>
                <label className="sr-only" aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(event) => update("website", event.target.value)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="button-primary mt-8 w-full sm:w-auto"
              >
                {status === "sending"
                  ? "Submitting request..."
                  : status === "sent"
                    ? "Request received"
                    : "Request enterprise access"}
                {status === "sent" ? <Check className="size-4" aria-hidden="true" /> : <ArrowUpRight className="size-4" aria-hidden="true" />}
              </button>
              {status === "sent" ? (
                <p className="mt-4 text-body text-[#007d21]" role="status">
                  Thank you. The Ontiver team will review your request and follow up by email.
                </p>
              ) : null}
              {error ? (
                <p className="mt-4 text-body text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
      <CurtainFooter audience="enterprise" />
    </main>
  );
}
