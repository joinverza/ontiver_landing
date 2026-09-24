import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
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
  "mt-3 h-14 w-full rounded-xl border border-[#dde6dc] bg-[#f7f9f6] px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10";
const textareaClass = `${fieldClass} min-h-32 resize-y py-3.5`;

export default function EnterpriseContactPage() {
  const [searchParams] = useSearchParams();
  const initialPlan = useMemo<PlanKey>(() => {
    const plan = searchParams.get("plan")?.toLowerCase();
    return plan && plan in planOptions ? (plan as PlanKey) : "enterprise";
  }, [searchParams]);
  const [values, setValues] = useState<FormValues>({
    planKey: initialPlan,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    monthlyVerifications: "",
    useCase: "",
    complianceNeeds: "",
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
            <h1 className="mt-5 max-w-[1100px] text-page-hero font-bold">
              Map your identity operation with Ontiver.
            </h1>
          </div>
          <p className="mt-7 max-w-[800px] text-subtitle text-[#526058]">
            Tell us about your verification volume, compliance requirements,
            and rollout timeline. We will discuss pilot availability, a suitable plan,
            and the scope of your integration.
          </p>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container">
          <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div className="overflow-hidden rounded-[28px] bg-[#edf5eb] p-7 text-[#002d0e] sm:p-9">
              <span className="mb-8 grid size-14 place-items-center rounded-2xl bg-white text-[#007d21]">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <h2 className="text-section font-bold">Plan your integration.</h2>
              <p className="mt-5 text-body text-[#526058]">Agree the checks and rollout scope for your pilot.</p>
              <div className="mt-8 divide-y divide-[#002d0e]/15 text-body text-[#526058]">
                {[
                  "Verification and reusable proof",
                  "Risk checks and consent records",
                  "Integration and rollout planning",
                ].map((item) => (
                  <span key={item} className="flex items-start gap-3 py-5">
                    <Check className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-start gap-3 border-t border-[#002d0e]/15 pt-6 text-body text-[#526058]">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-[#007d21]" aria-hidden="true" />
                Do not include passwords, API keys, or identity documents.
              </div>
            </div>

            <form
              onSubmit={submit}
              aria-busy={status === "sending"}
              className="min-w-0 rounded-[28px] border border-[#dde6dc] bg-white p-7 sm:p-10"
            >
              <p className="eyebrow">Let's work together</p>
              <h2 className="mt-3 text-card-title font-semibold">Request enterprise access</h2>
              <div className="mt-9 grid gap-x-5 gap-y-7 sm:grid-cols-2 [&>label]:text-body">
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
                  Work email *
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
                  Rollout timeline
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
                    placeholder="Describe the customer journey or identity workflow you need to support."
                    value={values.useCase}
                    onChange={(event) => update("useCase", event.target.value)}
                  />
                </label>
                <label className="text-sm font-semibold sm:col-span-2">
                  Compliance and risk requirements
                  <textarea
                    className={textareaClass}
                    placeholder="AML screening, monitoring, audit exports, data residency, or security review."
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
                className="button-primary mt-8 w-full"
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
