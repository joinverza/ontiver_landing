import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import ContactField from "../components/contact/ContactField";
import DotLoader from "../components/contact/DotLoader";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { sendContactRequest } from "../lib/landingApi";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";
import {
  contactFields,
  contactHeading,
  contactInitialValues,
  contactRows,
  contactSocialIcons,
  type ContactFormField,
} from "../data/contact";

type SendState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [values, setValues] = useState(contactInitialValues);
  const [missingFields, setMissingFields] = useState<Set<ContactFormField>>(new Set());
  const [sendState, setSendState] = useState<SendState>("idle");
  const [submitError, setSubmitError] = useState("");

  const setFieldValue = (field: ContactFormField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setMissingFields((current) => {
      if (!current.has(field)) return current;
      const next = new Set(current);
      next.delete(field);
      return next;
    });
    if (sendState === "sent" || sendState === "error") setSendState("idle");
  };

  const submitRequest = async () => {
    if (sendState === "sending" || sendState === "sent") return;
    const missing = contactFields
      .map((field) => field.key)
      .filter((field) => !values[field].trim());

    if (missing.length) {
      setMissingFields(new Set(missing));
      return;
    }

    setSendState("sending");
    setSubmitError("");
    try {
      await sendContactRequest({
        name: values.firstName,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      setSendState("sent");
    } catch (error) {
      setSendState("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please try again."
      );
    }
  };

  return (
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <div className="max-w-[1060px]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 text-page-hero font-medium">
                {contactHeading}
              </h1>
            </div>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
              Ask about early access, verification requests, your proof wallet, or how consent and sharing work.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="site-container">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
            <aside className="order-2 min-w-0 text-[#002d0e]">
              <div data-scroll-reveal><ContextPhoto image={imagery.mobileApplication} size="wide" /></div>
              <div className="mt-6 rounded-2xl bg-[#f5f6f3] p-6 sm:p-7">
              <div>
                <h2 className="text-card-title font-medium">Before you send</h2>
                <div className="mt-4 divide-y divide-[#002d0e]/10">
                  {contactRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-4 py-4">
                      <img src={row.icon} alt="" className="mt-1 size-5 shrink-0 brightness-0" />
                      {row.label.includes("@") ? (
                        <a className="break-all text-body text-[#002d0e] underline-offset-4 hover:underline" href={`mailto:${row.label}`}>
                          {row.label}
                        </a>
                      ) : (
                        <p className="text-body text-[#526058]">{row.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                {contactSocialIcons.map((social) => (
                  <a
                    key={social.label}
                    className="grid size-12 place-items-center rounded-full border border-[#002d0e]/20 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d21]"
                    aria-label={social.label}
                    href={social.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={social.icon} alt="" className="size-5 brightness-0" />
                  </a>
                ))}
              </div>
              </div>
              <Link to="/support" className="mt-6 flex items-center justify-between gap-4 border-y border-[#dde6dc] py-5 text-body font-medium">Continue an existing support request<ArrowUpRight size={20} aria-hidden="true" /></Link>
            </aside>

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
                    <span className="inline-flex items-center">Sending <DotLoader /></span>
                  ) : sendState === "sent" ? (
                    <><Check size={18} aria-hidden="true" /> Request Sent!</>
                  ) : (
                    <>Submit Request <ArrowUpRight size={18} aria-hidden="true" /></>
                  )}
                </button>
                {sendState === "sent" ? (
                  <p className="mt-4 text-body text-[#007d21]" role="status">Request Sent!</p>
                ) : null}
                {submitError ? (
                  <p className="mt-4 text-body text-red-700" role="alert">{submitError}</p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </section>
      <CurtainFooter />
    </main>
  );
}
