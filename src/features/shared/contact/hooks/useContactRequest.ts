import { useState } from "react";
import { contactFields, contactInitialValues, type ContactFormField } from "../data/contact";
import { sendContactRequest } from "../../../../shared/lib/landingApi";

type SendState = "idle" | "sending" | "sent" | "error";

export const useContactRequest = () => {
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
          : "We could not send your request. Please try again.",
      );
    }
  };

  return { values, missingFields, sendState, submitError, setFieldValue, submitRequest };
};
