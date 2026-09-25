import type { Direction } from "../components/ui/DirectionAwareHover";

export type IndustryCategory = "Finance" | "People and work" | "Operations and commerce" | "Public and community" | "Cross-industry";
export type UseCasePageDetail = {
  id: string;
  section: number | null;
  category: IndustryCategory;
  title: string;
  heroTitle: string;
  eyebrow: string;
  tagline: string;
  purpose: string;
  journey: string;
  workflow: Array<{ title: string; description?: string }>;
  claims: string[];
  boundary: string;
  priority: boolean;
  imageUrl: string;
  evaluationMeasures: Array<{ label: string; description: string }>;
  pilotFocus: { title: string; description: string };
  cta: string;
  pilotCta: string;
  pilotPath: string;
};

export type UseCaseCard = {
  id: string; title: string; description: string; imageUrl: string; className: string;
  contentClassName?: string; cardClassName?: string; lineClassName: string;
  idle: "fintech" | "lenders" | "marketplaces" | "platforms" | "schools" | "teams";
};

export const directionOffsets: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -20 }, right: { x: 20, y: 0 }, bottom: { x: 0, y: 20 }, left: { x: -20, y: 0 },
};

type IndustryTemplate = Pick<UseCasePageDetail, "id" | "section" | "category" | "title" | "heroTitle" | "tagline" | "purpose" | "journey" | "boundary" | "pilotCta" | "pilotPath"> & {
  stages: string; claimList: string; priority?: boolean;
};

// Source: Ontiver Content — Enterprise Division (latest approved content brief).
// Section references preserve the original industry-document mapping.
const industryTemplates: IndustryTemplate[] = [
  {
    id: "digital-lenders", section: 4, category: "Finance", priority: true,
    title: "Digital lenders", heroTitle: "Digital lenders",
    tagline: "Verify borrowers before you take on identity and fraud risk.",
    purpose: "Borrower onboarding, KYC, fraud prevention, and loan application support.",
    stages: "Borrower → identity → phone → NIN/BVN where appropriate → documents → face/liveness → consistency/risk → review → verified profile → lender decision",
    journey: "The lender creates a request. The borrower receives it in the mobile app, consents, and submits evidence. Ontiver runs the selected checks; the lender reviews the dashboard and makes the credit decision. Proof and the audit trail record the verification journey.",
    claimList: "Identity|phone|NIN/BVN result|documents|face result|consent|risk signals",
    boundary: "Ontiver provides evidence and signals — the lender makes the lending decision.",
    pilotCta: "Book a Lending Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "fintechs", section: 5, category: "Finance", priority: true,
    title: "Banking and fintech", heroTitle: "Banking and fintech",
    tagline: "Onboard customers without repeating KYC/KYB from scratch.",
    purpose: "Customer onboarding, KYC/KYB, account creation, and repeat verification.",
    stages: "Customer invitation → identity → government ID → face/liveness where required → address/documents → risk review → account decision → reusable proof",
    journey: "The institution creates a workflow. The customer consents in the app and selected checks run. A compliance officer reviews exceptions; the institution opens or declines the account. An approved proof can support future products.",
    claimList: "Identity attributes|source references|consent|review outcomes|audit trail",
    boundary: "Institution-specific regulatory, retention, and access rules apply — Ontiver adapts to them, not the reverse.",
    pilotCta: "Book a Fintech Demo",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "hr-platforms", section: 6, category: "People and work", priority: true,
    title: "Recruitment and HR", heroTitle: "Recruitment and HR",
    tagline: "Verify candidates and workers before onboarding — without building the identity layer yourself.",
    purpose: "Candidate screening, certificate verification, employment history, references, onboarding, workforce compliance.",
    stages: "Candidate → identity → certificates → previous employment → referees → address/eligibility → review → employee profile → renewal",
    journey: "HR sends a request. The candidate completes a mobile profile and uploads certificates and employment evidence; referees receive separate requests. Ontiver checks the evidence. HR reviews and approves, and selected claims can become a workforce proof.",
    claimList: "Identity|education|employment|references|licenses|consent|expiry dates",
    boundary: "AI flags inconsistencies; HR makes hiring decisions.",
    pilotCta: "Book an HR Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "logistics-delivery", section: 7, category: "Operations and commerce", priority: true,
    title: "Logistics and delivery", heroTitle: "Logistics and delivery",
    tagline: "Know that the person receiving access to your platform is the person they claim to be.",
    purpose: "Driver/rider onboarding, license and vehicle checks, contractor verification, continuous compliance.",
    stages: "Worker → identity → face/liveness → license → vehicle documents → reference → emergency contact → review → activation → expiry monitoring",
    journey: "An operations manager creates a request. The worker submits identity, license, vehicle, and reference information. Ontiver checks the evidence; operations reviews and activates the worker. Renewal alerts support the ongoing workflow.",
    claimList: "Identity|license|vehicle linkage|reference|emergency contact|renewal status",
    boundary: "A duplicate vehicle or mismatch is a review signal, not automatic fraud.",
    pilotCta: "Book a Logistics Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "marketplaces", section: 8, category: "Operations and commerce", priority: true,
    title: "Marketplaces and sellers", heroTitle: "Marketplaces and sellers",
    tagline: "Add identity verification to high-risk sellers and users without building verification infrastructure.",
    purpose: "Seller onboarding, merchant verification, payout ownership, duplicate-account detection.",
    stages: "Seller applies → identity/business → phone → documents → bank/payout → address → risk checks → approval → periodic review",
    journey: "The marketplace sends a request. The seller consents and submits information. Ontiver checks documents and ownership evidence; the marketplace reviews the application. Selected approved claims form a seller proof.",
    claimList: "Identity|business registration|address|payout ownership|documents|risk signals",
    boundary: "Identity verification is separate from product quality and marketplace performance.",
    pilotCta: "Explore Marketplace Verification",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "manufacturing-industrial", section: 9, category: "Operations and commerce",
    title: "Manufacturing, FMCG, and industrial", heroTitle: "Manufacturing, FMCG, and industrial",
    tagline: "Verify the people and partners your operation depends on.",
    purpose: "Employees, contractors, suppliers, distributors, agents, and site access.",
    stages: "Role workflow → invitation → identity → documents → certificates → references → vehicle/site checks → approval → access profile → renewal",
    journey: "A manager creates a request. The person submits identity and operational documents; referees or employers confirm claims. The enterprise reviews the evidence, and an approved person can receive a workforce or partner proof.",
    claimList: "Identity|certificates|employment/supplier evidence|vehicle documents|training|consent",
    boundary: "Your authorized reviewer makes the operational decision.",
    pilotCta: "Discuss an Industrial Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "construction-property-services", section: 10, category: "Operations and commerce", priority: true,
    title: "Construction and contractors", heroTitle: "Construction and contractors",
    tagline: "Verify contractors, licenses, and site access before day one.",
    purpose: "Contractor, artisan, site access, licenses, insurance, project workforce.",
    stages: "Contractor → identity → trade certificate → project history → references → insurance → vehicle/equipment → approval → site assignment → renewal",
    journey: "The project manager sends a request. The contractor uploads evidence and references confirm their claims. The enterprise reviews the submission; approved contractors receive project approval and renewal reminders.",
    claimList: "Identity|trade qualifications|insurance|references|project history",
    boundary: "Safety and project decisions remain with the construction company.",
    pilotCta: "Book a Construction Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "healthcare-workforce", section: 11, category: "People and work",
    title: "Healthcare workforce", heroTitle: "Healthcare workforce",
    tagline: "Verify clinical credentials with the privacy controls the role demands.",
    purpose: "Clinician, caregiver, lab, pharmacy, and contractor credentials.",
    stages: "Professional → identity → license → qualification → institution confirmation → employment/reference → training → review → authorization → renewal",
    journey: "The hospital requests verification. The professional consents and uploads credentials; institutions and referees confirm claims. The compliance team reviews the evidence, grants access where approved, and monitors expiry.",
    claimList: "Identity|license|qualification|institution confirmation|training|consent",
    boundary: "Heightened privacy, access, retention, and legal controls apply.",
    pilotCta: "Discuss a Healthcare Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "schools", section: 12, category: "People and work",
    title: "Education and EdTech", heroTitle: "Education and EdTech",
    tagline: "Verify applicants, students, and credential holders more securely.",
    purpose: "Student admission, certificate verification, staff credentials, scholarships, alumni proofs.",
    stages: "Applicant → identity → academic records → certificate → institution confirmation → review → admission/student proof",
    journey: "The school sends a request. The applicant submits identity and academic records. Ontiver checks the evidence; the admissions team reviews the case. Approved academic claims can become a proof.",
    claimList: "Identity|certificates|enrollment|academic claims|consent",
    boundary: "For minors, guardian and age-appropriate consent controls apply.",
    pilotCta: "Discuss an Education Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "insurance", section: 13, category: "Finance",
    title: "Insurance", heroTitle: "Insurance",
    tagline: "Confirm identity behind every policy and every claim.",
    purpose: "Policyholder onboarding, claims identity, beneficiaries, agents, and fraud signals.",
    stages: "Customer/claimant → identity → policy details → supporting documents → relationship proof → consistency → review → policy/claim decision",
    journey: "The insurer requests evidence. The customer consents and submits the requested information. Ontiver runs the selected checks; the claims or underwriting team reviews the results and records its decision.",
    claimList: "Identity|policy evidence|documents|relationship proofs|consent",
    boundary: "Ontiver supplies evidence and signals, not claim decisions.",
    pilotCta: "Discuss an Insurance Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "real-estate", section: 14, category: "Operations and commerce",
    title: "Real estate", heroTitle: "Real estate",
    tagline: "Verify every party in a transaction, not just one.",
    purpose: "Tenant, landlord, buyer, seller, agent, and property-service verification.",
    stages: "Party → identity → address → income evidence where relevant → ownership/authority docs → references → review → transaction profile",
    journey: "The agent sends a request. The party submits documents and relevant parties confirm claims. The enterprise reviews the evidence and selected proofs can be shared with permission.",
    claimList: "Identity|address|ownership/authority|income evidence|references",
    boundary: "Title and ownership decisions require authorized professionals and official records.",
    pilotCta: "Discuss a Real Estate Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "travel-hospitality", section: 15, category: "Operations and commerce",
    title: "Travel and hospitality", heroTitle: "Travel and hospitality",
    tagline: "Verify guests and staff with only the data the purpose requires.",
    purpose: "Guest identity, staff/contractor onboarding, guides, travel documents.",
    stages: "Guest/worker → identity → travel document → booking/role → license where relevant → review → confirmation → expiry",
    journey: "The hotel or operator requests information. The user submits only what is required. Ontiver checks the selected evidence; the enterprise reviews and confirms the booking or role.",
    claimList: "Identity|travel document validity|booking linkage|licenses|consent",
    boundary: "Collect only data required by purpose and jurisdiction.",
    pilotCta: "Discuss a Travel Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "telecoms-digital-services", section: 16, category: "Operations and commerce",
    title: "Telecoms and digital services", heroTitle: "Telecoms and digital services",
    tagline: "Verify customers and agents without exposing unrestricted raw data.",
    purpose: "Customer/agent onboarding, account recovery, field-agent verification.",
    stages: "Customer/agent → identity → phone → ID where required → face/liveness → address/documents → review → activation",
    journey: "The telecom creates a request. The user completes the mobile flow. Ontiver verifies the selected evidence; the enterprise reviews it before activation or recovery proceeds.",
    claimList: "Identity|phone ownership signals|agent documents|consent",
    boundary: "Prefer results and proofs over unrestricted raw data.",
    pilotCta: "Discuss a Telecoms Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "crypto-web3", section: 17, category: "Finance",
    title: "Crypto and Web3", heroTitle: "Crypto and Web3",
    tagline: "Plug African identity verification into your onboarding flow.",
    purpose: "User/business onboarding, wallet access, partner verification, and compliance.",
    stages: "User/business → identity/KYB → documents → AML/sanctions providers where authorized → face/liveness → review → approval → proof",
    journey: "The platform requests verification. The user or business consents, and Ontiver orchestrates the selected checks. Compliance reviews the results; the platform decides access.",
    claimList: "Identity|business data|documents|consent|provider results|risk signals",
    boundary: "Requires strong regulatory, AML, sanctions, custody, and data governance — confirm jurisdictional requirements before pilot scoping.",
    pilotCta: "Discuss a Compliance Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "government-public-programs", section: 18, category: "Public and community",
    title: "Government and public programs", heroTitle: "Government and public programs",
    tagline: "Verify beneficiaries and staff without becoming a government authority.",
    purpose: "Beneficiary registration, grants, permits, staff/contractor checks.",
    stages: "Applicant → identity → eligibility evidence → duplicate checks → review → approval → program profile",
    journey: "The agency creates a request. The applicant uses the app or an assisted channel. Ontiver checks the evidence; authorized officials review it and record the program status.",
    claimList: "Identity|eligibility evidence|consent|review history",
    boundary: "Ontiver supports the process — it is not the government authority of record.",
    pilotCta: "Discuss a Public Program Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "ngos-humanitarian-aid", section: 19, category: "Public and community",
    title: "NGOs and humanitarian aid", heroTitle: "NGOs and humanitarian aid",
    tagline: "Verify beneficiaries responsibly, including those without standard documents.",
    purpose: "Beneficiary identity, duplicate detection, volunteers, distribution accountability.",
    stages: "Beneficiary → identity or alternative ID → program evidence → duplicate checks → consent → eligibility review → assistance profile",
    journey: "The NGO registers a beneficiary. A field worker or the user submits evidence. Ontiver checks duplicates and consistency; staff review the case and record assistance status.",
    claimList: "Identity/alternative identity|household/program data|consent|audit trail",
    boundary: "Support vulnerable users and alternative identification methods.",
    pilotCta: "Discuss an NGO Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "agriculture-agribusiness", section: 20, category: "Public and community",
    title: "Agriculture and agribusiness", heroTitle: "Agriculture and agribusiness",
    tagline: "Verify farmers, cooperatives, and suppliers before repeat transactions.",
    purpose: "Farmer, cooperative, supplier, agent, and financing-support onboarding.",
    stages: "Farmer/partner → identity → farm/cooperative → land/supplier docs → references → payout details → review → profile → update",
    journey: "The agribusiness requests information. The user submits identity and operational details. Evidence is checked and the enterprise reviews approval; the profile can support repeat transactions.",
    claimList: "Identity|cooperative/farm/supplier evidence|payout ownership|references",
    boundary: "Identity proof is not proof of land ownership, yield, or creditworthiness.",
    pilotCta: "Discuss an Agribusiness Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "energy-utilities", section: 21, category: "Operations and commerce",
    title: "Energy and utilities", heroTitle: "Energy and utilities",
    tagline: "Verify the technicians and contractors in the field.",
    purpose: "Customer onboarding, technicians, contractors, agents, service requests.",
    stages: "Customer/technician → identity → address → service documents → license → references → review → activation → renewal",
    journey: "The utility sends a request. The customer or worker completes the mobile flow. Ontiver checks the selected evidence; the enterprise reviews it before service or field access is activated.",
    claimList: "Identity|address|license|contractor evidence|consent",
    boundary: "Identity proof is separate from technical inspection and safety decisions.",
    pilotCta: "Discuss an Energy Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "b2b-vendors", section: 22, category: "Operations and commerce",
    title: "B2B vendors and professional services", heroTitle: "B2B vendors and professional services",
    tagline: "Verify every vendor before they're in your systems.",
    purpose: "Consultants, agencies, freelancers, suppliers, corporate partners.",
    stages: "Vendor → identity/KYB → certificates → references → payout ownership → registration/tax docs → review → activation",
    journey: "Procurement sends a request. The vendor completes the flow. Ontiver verifies selected evidence; procurement reviews the results and approved claims can become a vendor proof.",
    claimList: "Identity|business registration|credentials|references|payout ownership",
    boundary: "Role-based access applies across procurement, finance, and compliance.",
    pilotCta: "Discuss a Vendor Verification Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "security-services", section: 23, category: "People and work",
    title: "Security services", heroTitle: "Security services",
    tagline: "Deploy verified guards, with recurring checks built in.",
    purpose: "Guard onboarding, licenses, training, references, deployment, recurring checks.",
    stages: "Guard → identity → face/liveness → license → training → previous employer → references → review → deployment → renewal",
    journey: "The security company requests verification. The guard submits evidence and the compliance team reviews it. An approved guard is assigned; expiry alerts support recurring review.",
    claimList: "Identity|license|training|employment|references|consent",
    boundary: "Sensitive data requires strict access and legal review.",
    pilotCta: "Discuss a Security Services Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "creators-talent", section: 24, category: "People and work",
    title: "Creators, freelancers, and talent platforms", heroTitle: "Creators, freelancers, and talent platforms",
    tagline: "Verify identity once — reuse it across every gig.",
    purpose: "Creator/freelancer identity, credentials, references, payout protection.",
    stages: "Creator → identity → phone/email → portfolio/credentials → references → payout ownership → review → profile → reuse",
    journey: "The platform requests verification. The creator submits claims and Ontiver verifies selected evidence. The platform reviews it; approved claims can form a verified profile or proof.",
    claimList: "Identity|credentials|references|payout ownership|consent",
    boundary: "Verified identity does not automatically prove skill or quality.",
    pilotCta: "Discuss a Talent Platform Pilot",
    pilotPath: "/enterprise/contact",
  },
  {
    id: "compliance-teams", section: null, category: "Cross-industry",
    title: "Compliance teams", heroTitle: "Compliance teams",
    tagline: "Give your compliance team an auditable identity layer, not another spreadsheet.",
    purpose: "Cross-industry support for teams that need auditable verification workflows regardless of sector.",
    stages: "Request → Consent → Verify → Review → Proof → Reuse",
    journey: "The organization defines roles, policies, and a workflow. The user sees the purpose and requested information, then approves or declines. Authorized reviewers inspect results, evidence, reasons, and the audit trail before the organization decides. Only approved claims enter a reusable proof.",
    claimList: "Varies by configured workflow",
    boundary: "Ontiver provides evidence and audit trail; your compliance team retains the decision.",
    pilotCta: "Request Compliance Documentation",
    pilotPath: "/enterprise/security",
  },
];

const pilotMeasures = [
  {
    "label": "Completion rate",
    "description": "The proportion of invited cases that complete the scoped workflow."
  },
  {
    "label": "Completion time",
    "description": "Time from request creation to a completed verification workflow."
  },
  {
    "label": "Manual review rate",
    "description": "The proportion of cases that need an authorized reviewer."
  },
  {
    "label": "Flagged cases",
    "description": "Cases flagged for additional review and the reasons recorded."
  },
  {
    "label": "Time saved",
    "description": "Operational time compared with the agreed starting baseline."
  },
  {
    "label": "User satisfaction",
    "description": "Feedback from the people completing the pilot workflow."
  }
];

export const useCasePageDetails: Record<string, UseCasePageDetail> = Object.fromEntries(
  industryTemplates.map(({ stages, claimList, ...template }) => [template.id, {
    ...template,
    priority: template.priority ?? false,
    eyebrow: template.category === "Cross-industry" ? "Cross-industry review" : "Industry workflow",
    workflow: stages.split(" → ").map((title) => ({ title })),
    claims: claimList.split("|"),
    imageUrl: "/assets/ontiver-enterprise.png",
    evaluationMeasures: pilotMeasures,
    pilotFocus: {
      title: "Start with a focused pilot.",
      description: "Most engagements begin as a 30-day identity workflow pilot: one enterprise, 50–200 cases, one workflow, one accountable owner. Scope includes invitation, consent, mobile completion, selected checks, dashboard review, and a final report.",
    },
    cta: "Start with a focused pilot.",
  }]),
);

export const industryUseCases = Object.values(useCasePageDetails).filter((item) => item.section !== null);
export const priorityUseCases = ["digital-lenders", "fintechs", "hr-platforms", "logistics-delivery", "marketplaces", "construction-property-services"].map((id) => useCasePageDetails[id]);

// A focused homepage selection; the industry directory includes every template.
export const useCaseCards: UseCaseCard[] = priorityUseCases.map((detail, index) => ({
  id: detail.id, title: detail.heroTitle, description: detail.tagline, imageUrl: detail.imageUrl,
  className: "", lineClassName: "",
  idle: (["lenders", "fintech", "platforms", "teams", "marketplaces", "teams"] as const)[index],
}));
