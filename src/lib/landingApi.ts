const apiBaseUrl = (
  import.meta.env.VITE_ONTIVER_API_BASE_URL || "https://api.ontiver.com"
).replace(/\/+$/, "");

const landingApiUrl = `${apiBaseUrl}/api/v1/banking/landing`;

type ApiErrorBody = {
  detail?: string | { message?: string };
  message?: string;
};

async function post<TBody extends object, TResult = void>(
  path: string,
  body: TBody
): Promise<TResult> {
  const response = await fetch(`${landingApiUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const payload = (await response.json().catch(() => undefined)) as
      | { data?: TResult }
      | undefined;
    return (payload?.data as TResult) ?? (undefined as TResult);
  }

  let errorBody: ApiErrorBody | undefined;
  try {
    errorBody = (await response.json()) as ApiErrorBody;
  } catch {
    // The fallback below covers non-JSON gateway and proxy responses.
  }

  const detail = errorBody?.detail;
  const message =
    typeof detail === "string"
      ? detail
      : detail?.message || errorBody?.message || "We could not submit your request. Please try again.";

  throw new Error(message);
}

export type DeletionCodeResponse = {
  message: string;
  email: string;
  devCode?: string;
};

export type DeletionConfirmationResponse = {
  requestId: string;
  status: string;
  message: string;
};

export function requestAccountDeletionCode(email: string) {
  return post<object, DeletionCodeResponse>("/account-deletion/request", {
    email: email.trim(),
    website: "",
  });
}

export function confirmAccountDeletion(email: string, code: string) {
  return post<object, DeletionConfirmationResponse>("/account-deletion/confirm", {
    email: email.trim(),
    code: code.trim(),
    website: "",
  });
}

export function joinWaitlist(email: string): Promise<void> {
  return post("/waitlist", {
    email: email.trim(),
    brand: "ontiver",
    website: "",
  });
}

export function subscribeToNewsletter(email: string): Promise<void> {
  return post("/newsletter", {
    email: email.trim(),
    brand: "ontiver",
    website: "",
  });
}

export type ContactRequest = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function sendContactRequest(request: ContactRequest): Promise<void> {
  return post("/contact", {
    ...request,
    name: request.name.trim(),
    email: request.email.trim(),
    subject: request.subject.trim(),
    message: request.message.trim(),
    brand: "ontiver",
    website: "",
  });
}

export type PricingInquiryRequest = {
  planKey: "launch" | "growth" | "compliance" | "enterprise";
  planName: "Launch" | "Growth" | "Compliance" | "Enterprise";
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  role?: string;
  country?: string;
  monthlyVerifications?: number;
  useCase: string;
  complianceNeeds?: string;
  timeline?: string;
  meetingPreference?: string;
  message?: string;
  website?: string;
};

export function sendPricingInquiry(
  request: PricingInquiryRequest
): Promise<void> {
  return post("/pricing-inquiry", {
    ...request,
    companyName: request.companyName.trim(),
    contactName: request.contactName.trim(),
    email: request.email.trim(),
    useCase: request.useCase.trim(),
    brand: "ontiver",
    website: request.website?.trim() || "",
  });
}
