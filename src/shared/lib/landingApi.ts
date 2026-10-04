const apiBaseUrl = (import.meta.env.VITE_ONTIVER_API_BASE_URL || "https://api.ontiver.com").replace(
  /\/+$/,
  "",
);

// Website endpoints live on the public API surface (no credentials, CORS-limited to the website).
const landingApiUrl = `${apiBaseUrl}/api/v1/public`;

type ApiErrorBody = {
  detail?: string | { message?: string };
  message?: string;
  error?: { message?: string };
};

/** Images uploaded from the admin dashboard are served by the API host. */
export const resolveApiAssetUrl = (url: string) =>
  url.startsWith("/static/") ? `${apiBaseUrl}${url}` : url;

async function get<TResult>(path: string, init?: RequestInit): Promise<TResult> {
  const response = await fetch(`${landingApiUrl}${path}`, { ...init, headers: { Accept: "application/json", ...init?.headers } });
  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  const payload = (await response.json()) as { data: TResult };
  return payload.data;
}

async function post<TBody extends object, TResult = void>(
  path: string,
  body: TBody,
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
      { data?: TResult } | undefined;
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
      : detail?.message ||
        errorBody?.error?.message ||
        errorBody?.message ||
        "We could not submit your request. Please try again.";

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

export type PublicSupportMessage = {
  messageId: string;
  senderType: "user" | "admin" | "system";
  message: string;
  createdAt: string;
};

export type PublicSupportRequest = {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  website?: string;
};

export type PublicSupportSession = {
  requestId: string;
  accessToken: string;
  status: string;
  message?: string;
  createdAt: string;
};

export type PublicSupportConversation = {
  requestId: string;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  messages: PublicSupportMessage[];
};

export function createPublicSupportRequest(request: PublicSupportRequest) {
  return post<PublicSupportRequest, PublicSupportSession>("/support/requests", {
    ...request,
    name: request.name.trim(),
    email: request.email.trim(),
    topic: request.topic.trim(),
    subject: request.subject.trim(),
    message: request.message.trim(),
    website: request.website?.trim() || "",
  });
}

export async function getPublicSupportConversation(requestId: string, accessToken: string) {
  try {
    // The token travels in a header so it never appears in URLs, logs or browser history.
    return await get<PublicSupportConversation>(`/support/requests/${encodeURIComponent(requestId)}`, {
      headers: { "X-Support-Access-Token": accessToken },
    });
  } catch {
    throw new Error("We could not open this secure support conversation.");
  }
}

export function sendPublicSupportMessage(requestId: string, accessToken: string, message: string) {
  return post<object, { messageId: string; status: string; createdAt: string }>(
    `/support/requests/${encodeURIComponent(requestId)}/messages`,
    { accessToken, message: message.trim(), website: "" },
  );
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

export function sendPricingInquiry(request: PricingInquiryRequest): Promise<void> {
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

export type LandingContentSection = { heading: string; body: string[] };

/** A published Blog, Press or Careers entry managed from the admin dashboard. */
export type LandingContentEntry = {
  id: string;
  contentType: "blog" | "press" | "career";
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  source: string;
  dateLabel: string;
  readTime: string;
  imageUrl: string;
  externalUrl: string;
  featured: boolean;
  summary: string[];
  body: string[];
  sections: LandingContentSection[];
  metadata: { seoDescription?: string; imageAlt?: string } & Record<string, unknown>;
  publishedAt: string | null;
  updatedAt: string;
};

export function listPublishedContent(contentType: "blog" | "press" | "career", limit = 50) {
  return get<{ items: LandingContentEntry[]; total: number }>(`/content/${contentType}?limit=${limit}`);
}

export function getPublishedContent(contentType: "blog" | "press" | "career", slug: string) {
  return get<LandingContentEntry>(`/content/${contentType}/${encodeURIComponent(slug)}`);
}

export type PricingPlan = {
  id: "sandbox" | "launch" | "growth" | "compliance" | "enterprise";
  name: string;
  tagline: string;
  audience: string;
  monthly: number | null;
  annualMonthly: number | null;
  requiresContact: boolean;
  recommended: boolean;
  includedVerifications: number | null;
  overagePerVerification: number | null;
  apiRequests: number | null;
  amlScreens: number | null;
  amlScreenOverage: number | null;
  monitoringProfiles: number | null;
  monitoringOverage: number | null;
  teamSeats: number | null;
  uptimeTarget: string | null;
  support: string;
  onboarding: string;
  features: string[];
  addons: string[];
  cta: string;
  highlights: string[];
};

export type PricingCatalog = {
  currency: string;
  plans: PricingPlan[];
  features: { key: string; label: string; description: string }[];
  addons: {
    id: string;
    name: string;
    monthly: number | null;
    summary: string;
    availableOn: string[];
    includedScreens?: number;
    screenOverage?: number;
    includedProfiles?: number;
    profileOverage?: number;
  }[];
};

export function getPricingCatalog() {
  return get<PricingCatalog>("/pricing");
}
