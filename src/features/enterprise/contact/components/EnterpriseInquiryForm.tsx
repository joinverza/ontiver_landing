import { ArrowUpRight, Check } from "lucide-react";
import { useEnterpriseInquiry } from "../hooks/useEnterpriseInquiry";
import { useHydratedSearch } from "../hooks/useHydratedSearch";
import { EnterpriseInquiryFields } from "./EnterpriseInquiryFields";

const EnterpriseInquiryFormContent = ({ search }: { search: string }) => {
  const {
    values,
    status,
    error,
    update,
    submit,
    isSandboxRequest,
    isSecurityRequest,
    billingContext,
  } = useEnterpriseInquiry(search);

  return (
    <form onSubmit={submit} aria-busy={status === "sending"} className="order-1 min-w-0 bg-white">
      <h2 className="text-card-title font-medium">Request enterprise access</h2>
      {isSandboxRequest ? (
        <p className="mt-3 border-l-2 border-[#007d21] pl-4 text-body text-[#526058]">
          You're requesting sandbox access for API and workflow testing. The team will follow up
          with next steps.
        </p>
      ) : null}
      {isSecurityRequest ? (
        <p className="mt-3 border-l-2 border-[#007d21] pl-4 text-body text-[#526058]">
          You're requesting security documentation. Add any requirements your team needs to review.
        </p>
      ) : null}
      {billingContext ? (
        <p className="mt-3 text-body text-[#526058]">
          Preferred billing: <span className="font-medium capitalize">{billingContext}</span>
        </p>
      ) : null}
      <EnterpriseInquiryFields values={values} update={update} />

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
        {status === "sent" ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <ArrowUpRight className="size-4" aria-hidden="true" />
        )}
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
  );
};

export const EnterpriseInquiryForm = () => {
  const search = useHydratedSearch();
  return <EnterpriseInquiryFormContent key={search} search={search} />;
};
