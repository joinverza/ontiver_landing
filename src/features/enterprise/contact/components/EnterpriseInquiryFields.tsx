import { planOptions, type PlanKey, type EnterpriseInquiryValues } from "../inquiry.config";

const fieldClass =
  "mt-3 h-14 w-full rounded-[10px] border border-[#dde6dc] bg-white px-4 text-body font-normal text-[#002d0e] outline-none transition-colors placeholder:text-[#647365]/65 focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10";
const textareaClass = `${fieldClass} min-h-32 resize-y py-3.5`;

type EnterpriseInquiryFieldsProps = {
  values: EnterpriseInquiryValues;
  update: <K extends keyof EnterpriseInquiryValues>(
    key: K,
    value: EnterpriseInquiryValues[K],
  ) => void;
};

export const EnterpriseInquiryFields = ({ values, update }: EnterpriseInquiryFieldsProps) => (
  <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2 [&>label]:text-body [&>label]:font-medium">
    <label className="text-sm font-semibold">
      Preferred plan
      <select
        className={fieldClass}
        value={values.planKey}
        onChange={(event) => update("planKey", event.target.value as PlanKey)}
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
        onChange={(event) => update("monthlyVerifications", event.target.value)}
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
        onChange={(event) => update("meetingPreference", event.target.value)}
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
        onChange={(event) => update("complianceNeeds", event.target.value)}
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
);
