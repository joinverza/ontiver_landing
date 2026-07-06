import { useMemo, useState, type FormEvent } from "react";
import { Check, ShieldCheck } from "lucide-react";
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
  "mt-2 h-12 w-full rounded-xl border border-[#0a2818]/15 bg-white px-4 text-sm text-[#06160f] outline-none transition focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/15";
const textareaClass = `${fieldClass} h-28 resize-y py-3`;

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
    <main className="overflow-hidden bg-[#f1f4ef] text-[#06160f]">
      <section className="relative px-5 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:90px_90px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#008e22]">
                Enterprise access
              </p>
              <h1 className="mt-5 max-w-[10ch] text-[clamp(2.8rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-tight">
                Map your identity operation with Ontiver.
              </h1>
              <p className="mt-6 max-w-[560px] text-base leading-7 text-[#526058] sm:text-lg">
                Tell us about your verification volume, compliance requirements,
                and rollout timeline. We will recommend the right plan and
                integration path.
              </p>
              <div className="mt-9 grid gap-3 text-sm text-[#34473d]">
                {[
                  "Identity verification and reusable credentials",
                  "AML, sanctions, PEP, and risk orchestration",
                  "Consent evidence, reporting, and audit exports",
                  "Sandbox support and production onboarding",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-[#009311]" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#009311]/15 bg-white/65 p-4 text-sm text-[#526058]">
                <ShieldCheck className="size-6 shrink-0 text-[#009311]" />
                Do not include passwords, API keys, or identity documents.
              </div>
            </div>

            <form
              onSubmit={submit}
              className="relative rounded-[28px] border border-[#0a2818]/10 bg-white/90 p-5 shadow-[0_28px_80px_rgba(5,38,21,0.09)] backdrop-blur sm:p-8 lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
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
                className="mt-7 inline-flex h-13 w-full cursor-pointer items-center justify-center rounded-xl bg-[#007d21] px-7 text-sm font-bold text-white transition hover:bg-[#00651b] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {status === "sending"
                  ? "Submitting request..."
                  : status === "sent"
                    ? "Request received"
                    : "Request enterprise access"}
              </button>
              {status === "sent" ? (
                <p className="mt-4 text-sm font-medium text-[#007d21]" role="status">
                  Thank you. The Ontiver team will review your request and follow up by email.
                </p>
              ) : null}
              {error ? (
                <p className="mt-4 text-sm text-red-600" role="alert">
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
