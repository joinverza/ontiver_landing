export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  summary: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<string, LegalDocument> = {
  "/privacy": {
    title: "Privacy Policy",
    summary:
      "Our privacy policy is awaiting qualified legal review. The sections below show what the reviewed document will cover.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: ["Entity and contact details awaiting confirmation."],
      },
      {
        heading: "Information we process",
        paragraphs: ["Information categories and processing details awaiting review."],
      },
      {
        heading: "Verification providers",
        paragraphs: [
          "Provider relationships and verification processing details awaiting confirmation.",
        ],
      },
      {
        heading: "Why we use information",
        paragraphs: ["Purposes and applicable legal bases awaiting review."],
      },
      {
        heading: "Sharing and international processing",
        paragraphs: ["Recipients, processing locations, and safeguards awaiting review."],
      },
      {
        heading: "Retention and security",
        paragraphs: ["Retention periods and security disclosures awaiting review."],
      },
      {
        heading: "Your choices and rights",
        paragraphs: ["Applicable choices, rights, and request procedures awaiting review."],
      },
      {
        heading: "Contact and changes",
        paragraphs: ["Policy contact details and update procedures awaiting review."],
      },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    summary:
      "Our terms are awaiting qualified legal review. These headings are a document outline, not published terms.",
    sections: [
      {
        heading: "Agreement and eligibility",
        paragraphs: ["Contracting entity and eligibility requirements awaiting review."],
      },
      {
        heading: "Accounts and sign-in",
        paragraphs: ["Account responsibilities and sign-in terms awaiting review."],
      },
      {
        heading: "Verification and credentials",
        paragraphs: ["Verification scope and credential terms awaiting review."],
      },
      {
        heading: "Acceptable use",
        paragraphs: ["Acceptable-use requirements awaiting review."],
      },
      {
        heading: "Availability and third parties",
        paragraphs: ["Service availability and third-party terms awaiting review."],
      },
      {
        heading: "Fees, ownership, and feedback",
        paragraphs: ["Commercial and intellectual-property terms awaiting review."],
      },
      {
        heading: "Liability and termination",
        paragraphs: ["Liability and termination provisions awaiting review."],
      },
      {
        heading: "Governing law and contact",
        paragraphs: ["Applicable law, dispute procedures, and contact details awaiting review."],
      },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    summary:
      "Our cookie policy is awaiting a confirmed storage inventory and qualified legal review.",
    sections: [
      {
        heading: "What we use",
        paragraphs: ["Cookies and similar browser storage awaiting inventory confirmation."],
      },
      {
        heading: "Cookie categories",
        paragraphs: ["Categories, purposes, providers, and durations awaiting review."],
      },
      {
        heading: "Managing choices",
        paragraphs: ["Available controls and their effects awaiting review."],
      },
      {
        heading: "Contact",
        paragraphs: ["Policy contact information awaiting review."],
      },
    ],
  },
};

export const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
  ["Cookie Policy", "/cookies"],
  ["Account Deletion", "/account-deletion"],
  ["Legal Centre", "/legal"],
];
