import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactField from "../components/contact/ContactField";
import DotLoader from "../components/contact/DotLoader";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { sendContactRequest } from "../lib/landingApi";
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
  const navigate = useNavigate();
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
    <main className="bg-[#f7f7f7] text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <button
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#002d0e]/65 transition-colors hover:text-[#009311]"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 max-w-[12ch] text-page-hero font-semibold">
                {contactHeading}
              </h1>
            </div>
            <p className="max-w-lg text-subtitle text-[#526058] lg:pb-2">
              Ask about early access, privacy, credential reuse, or anything else you need to understand about Ontiver.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid overflow-hidden rounded-[28px] border border-[#dde6dc] bg-white lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="relative flex flex-col overflow-hidden bg-[#002d0e] p-7 text-white sm:p-10 lg:p-12">
              <div className="relative z-10">
                <span className="mb-8 grid size-14 place-items-center rounded-2xl border border-white/20 bg-white/5">
                  <MessageCircle className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-section font-semibold">Contact Information</h2>
                <p className="mt-4 max-w-sm text-body text-white/65">
                  We are here for individual questions and support.
                </p>
                <div className="mt-10 divide-y divide-white/15">
                  {contactRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-4 py-5">
                      <img src={row.icon} alt="" className="mt-1 size-5 shrink-0 brightness-0 invert" />
                      {row.label.includes("@") ? (
                        <a className="text-body text-white underline-offset-4 hover:underline" href={`mailto:${row.label}`}>
                          {row.label}
                        </a>
                      ) : (
                        <p className="text-body text-white/75">{row.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 mt-12 flex gap-3 lg:mt-auto lg:pt-16">
                {contactSocialIcons.map((social) => (
                  <a
                    key={social.label}
                    className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    aria-label={social.label}
                    href={social.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img src={social.icon} alt="" className="size-4 brightness-0 invert" />
                  </a>
                ))}
              </div>
              <div className="pointer-events-none absolute -bottom-28 -right-28 size-80 rounded-full border-[48px] border-white/[0.035]" aria-hidden="true" />
            </aside>

            <form
              className="min-w-0 p-7 sm:p-10 lg:p-12"
              aria-busy={sendState === "sending"}
              onSubmit={(event) => {
                event.preventDefault();
                void submitRequest();
              }}
            >
              <p className="eyebrow">Start a conversation</p>
              <div className="mt-8 grid gap-x-6 gap-y-6 md:grid-cols-2">
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
