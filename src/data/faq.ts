export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  group: string;
  items: FAQItem[];
};

export const faqGroups: FAQGroup[] = [
  {
    group: "Pricing",
    items: [
      {
        question: "What counts as a verification?",
        answer:
          "The listed production-plan allowances refer to completed identity checks. Sandbox is intended for test responses. Confirm the billing definition and live workflow scope with our team before a pilot starts.",
      },
      {
        question: "Can I switch plans mid-month?",
        answer:
          "Talk to our team about changing your planned volume or requirements. Upgrade timing, billing adjustments, and feature availability are confirmed in your agreed service terms.",
      },
      {
        question: "Do you offer refunds or a money-back guarantee?",
        answer:
          "Sandbox is listed as a free testing plan. Confirm any paid-plan cancellation, refund, and trial terms with our team before committing; this page does not promise a money-back guarantee.",
      },
      {
        question: "What happens if I exceed my verification limit?",
        answer:
          "Discuss additional volume with our team before reaching the agreed limit. Any overage arrangement, plan change, and service-continuity terms must be confirmed for your account.",
      },
    ],
  },
  {
    group: "Identity & Compliance",
    items: [
      {
        question: "Is AML screening included in all plans?",
        answer:
          "The listed plans describe intended screening allocations and add-ons. Live AML and monitoring availability depends on the agreed workflow, provider coverage, and release readiness; confirm these during pilot scoping.",
      },
      {
        question: "How does credential reuse work for my users?",
        answer:
          "The intended flow lets a user approve reuse of an existing proof where the receiving service accepts it. Expiry, the requested checks, or that service's requirements may call for a new verification.",
      },
      {
        question: "Are verifications stored securely and tied to the user?",
        answer:
          "Ontiver is designed around user-linked proof, consent-aware access, and minimized identity data. Review the relevant access, retention, and production-readiness evidence with our team when scoping a pilot.",
      },
      {
        question: "What identity documents does Ontiver support?",
        answer:
          "The initial verification focus is Nigeria's NIN and BVN rails. Confirm live provider availability and the checks required for your workflow with our team. Additional document, biometric, or country coverage is not implied.",
      },
    ],
  },
  {
    group: "Integration",
    items: [
      {
        question: "Do you offer a free trial beyond Sandbox?",
        answer:
          "Sandbox is the proposed free testing plan. Contact our team to agree whether a live pilot is available, which workflows it covers, and any applicable commercial terms.",
      },
      {
        question: "How long does it take to integrate Ontiver?",
        answer:
          "Integration time depends on the agreed checks, your application, and provider readiness. Use the API documentation to plan the work, then agree pilot milestones with our team. We have not published measured integration times yet.",
      },
      {
        question: "Is there a sandbox environment for testing?",
        answer:
          "Sandbox is designed for test keys, sample responses, and developer validation. Review the documentation and request access to confirm the currently available testing scope before planning a production integration.",
      },
      {
        question: "Do you provide webhooks and API documentation?",
        answer:
          "API documentation is available through our developer site. Agree webhook events, delivery testing, and production access as part of your pilot integration scope.",
      },
    ],
  },
];

export const planNames = new Set([
  "Sandbox",
  "Launch",
  "Growth",
  "Compliance",
  "Enterprise",
]);

export const homeGroupOrder = [
  "Identity & Compliance",
  "Integration",
  "Pricing",
];

export const individualFaqGroups: FAQGroup[] = [
  {
    group: "Your Identity",
    items: [
      {
        question: "What does verify once mean?",
        answer:
          "It means reusing an existing identity proof where a participating service accepts it. A new check may still be needed when proof expires or a service has different requirements.",
      },
      {
        question: "Does Ontiver share my identity automatically?",
        answer:
          "No. Reuse is consent-led. You review the request and approve the trusted proof a supported service needs.",
      },
      {
        question: "Can I see where my identity was used?",
        answer:
          "Ontiver is designed to keep verification and sharing activity together so you have a clearer history of requests and approvals.",
      },
    ],
  },
  {
    group: "Privacy & Access",
    items: [
      {
        question: "Do I have to send every document again?",
        answer:
          "Not when a supported service can accept your reusable trusted proof. The goal is to reduce repeated uploads while preserving the assurance the service needs.",
      },
      {
        question: "Who controls permission to reuse my credentials?",
        answer:
          "You do. Consent is part of the reuse flow, so a supported business must request access before trusted proof is shared.",
      },
      {
        question: "Where will I be able to use Ontiver?",
        answer:
          "Ontiver is being built for supported finance, lending, marketplace, work, and education journeys. Availability will expand as more businesses integrate.",
      },
    ],
  },
  {
    group: "Early Access",
    items: [
      {
        question: "How can I try Ontiver?",
        answer:
          "Join the individual waitlist to receive private beta invitations, product updates, and launch information.",
      },
      {
        question: "Is joining the waitlist free?",
        answer:
          "Yes. Joining the waitlist is free and does not commit you to a paid plan.",
      },
    ],
  },
];

export const faqHeading = {
  pricing: {
    btext: "Frequently Asked Question",
    heading: "Pricing questions, clear answers.",
  },
  enterprise: {
    btext: "Frequently Asked Question",
    heading: "What enterprise teams ask before integrating Ontiver.",
  },
  individual: {
    btext: "Questions from Individuals",
    heading: "Understand how your reusable identity works.",
  },
};
