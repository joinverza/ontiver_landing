import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactField from "../components/contact/ContactField";
import DotLoader from "../components/contact/DotLoader";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { sendContactRequest } from "../lib/landingApi";
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
    <main className="bg-white text-[#002d0e]">
      <section className="page-intro">
        <div className="site-container">
          <button
            className="mb-9 inline-flex items-center gap-2 text-body font-medium text-[#002d0e]/65 transition-colors hover:text-[#009311]"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
          <div className="max-w-[1060px]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-5 text-page-hero font-bold">
                {contactHeading}
              </h1>
            </div>
            <p className="mt-7 max-w-[760px] text-subtitle text-[#526058]">
              Ask about early access, privacy, credential reuse, or anything else you need to understand about Ontiver.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <aside className="flex flex-col overflow-hidden rounded-[28px] bg-[#edf5eb] text-[#002d0e]">
              <img
                src={imagery.teamwork.src}
                alt={imagery.teamwork.alt}
                width={imagery.teamwork.width}
                height={imagery.teamwork.height}
                loading="lazy"
                className="aspect-[16/7] w-full object-cover"
                style={{ objectPosition: imagery.teamwork.objectPosition }}
              />
              <div className="p-7 sm:p-10">
              <div>
                <h2 className="text-section font-bold">Contact Information</h2>
                <p className="mt-5 max-w-md text-body text-[#526058]">
                  We are here for individual questions and support.
                </p>
                <div className="mt-10 divide-y divide-[#002d0e]/15">
                  {contactRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-4 py-5">
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
              <div className="mt-9 flex gap-3">
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
            </aside>

            <form
              className="min-w-0 rounded-[28px] border border-[#dde6dc] bg-white p-7 sm:p-10 [&_input]:min-h-14 [&_label>span:first-child]:text-body [&_textarea]:min-h-44"
              aria-busy={sendState === "sending"}
              onSubmit={(event) => {
                event.preventDefault();
                void submitRequest();
              }}
            >
              <p className="eyebrow">Start a conversation</p>
              <div className="mt-9 grid gap-x-6 gap-y-7 md:grid-cols-2">
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
