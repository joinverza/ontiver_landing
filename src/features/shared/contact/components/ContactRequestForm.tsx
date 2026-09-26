import { ArrowUpRight, Check } from "lucide-react";
import { contactFields } from "../data/contact";
import { useContactRequest } from "../hooks/useContactRequest";
import { ContactField } from "./ContactField";
import { DotLoader } from "./DotLoader";

export const ContactRequestForm = () => {
  const { values, missingFields, sendState, submitError, setFieldValue, submitRequest } =
    useContactRequest();

  return (
    <form
      className="order-1 min-w-0 bg-white [&_input]:min-h-14 [&_label>span:first-child]:text-body [&_textarea]:min-h-52"
      aria-busy={sendState === "sending"}
      onSubmit={(event) => {
        event.preventDefault();
        void submitRequest();
      }}
    >
      <h2 className="text-card-title font-medium">Start a conversation</h2>
      <div className="mt-7 grid gap-x-6 gap-y-6 md:grid-cols-2">
        {contactFields.map((field) => (
          <ContactField
            key={field.key}
            field={field}
            value={values[field.key]}
            missing={missingFields.has(field.key)}
            onChange={(event) => setFieldValue(field.key, event.target.value)}
          />
        ))}
      </div>

      <div className="mt-8 border-t border-[#dde6dc] pt-7">
        <button
          className="button-primary w-full sm:w-auto"
          type="submit"
          disabled={sendState === "sending" || sendState === "sent"}
        >
          {sendState === "sending" ? (
            <span className="inline-flex items-center">
              Sending <DotLoader />
            </span>
          ) : sendState === "sent" ? (
            <>
              <Check size={18} aria-hidden="true" /> Request Sent!
            </>
          ) : (
            <>
              Submit Request <ArrowUpRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
        {sendState === "sent" ? (
          <p className="mt-4 text-body text-[#007d21]" role="status">
            Request Sent!
          </p>
        ) : null}
        {submitError ? (
          <p className="mt-4 text-body text-red-700" role="alert">
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  );
};
