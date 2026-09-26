import { useMemo, useState, type FormEvent } from "react";
import { sendPricingInquiry, type PricingInquiryRequest } from "../../../../shared/lib/landingApi";
import { planOptions, type PlanKey, type EnterpriseInquiryValues } from "../inquiry.config";

export const useEnterpriseInquiry = (search: string) => {
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
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
  const initialVolume =
    /^\d+$/.test(volumeParam) && Number(volumeParam) <= 100000000
      ? String(Number(volumeParam))
      : "";
  const [values, setValues] = useState<EnterpriseInquiryValues>({
    planKey: initialPlan,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    monthlyVerifications: initialVolume,
    useCase: isSandboxRequest
      ? "Sandbox API and workflow testing"
      : isSecurityRequest
        ? "Request security documentation for our Ontiver evaluation."
        : "",
    complianceNeeds: isSecurityRequest
      ? "Please share the security and compliance documentation available for review."
      : "",
    timeline: "",
    meetingPreference: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const update = <K extends keyof EnterpriseInquiryValues>(
    key: K,
    value: EnterpriseInquiryValues[K],
  ) => {
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
      message:
        [
          billingContext ? `Preferred billing: ${billingContext}` : "",
          isSandboxRequest ? "Request type: Sandbox API and workflow testing access" : "",
          isSecurityRequest ? "Request type: Security documentation" : "",
        ]
          .filter(Boolean)
          .join("\n") || undefined,
    };

    try {
      await sendPricingInquiry(payload);
      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not submit your request. Please try again.",
      );
    }
  };

  return {
    values,
    status,
    error,
    update,
    submit,
    isSandboxRequest,
    isSecurityRequest,
    billingContext,
  };
};
