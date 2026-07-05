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
          "A verification is one completed identity check in a production flow. Sandbox uses test responses, while Launch, Growth, Compliance, and Enterprise plans count completed production outcomes.",
      },
      {
        question: "Can I switch plans mid-month?",
        answer:
          "Yes. Teams can move from Launch to Growth or Compliance when volume increases, and Enterprise workflows can be scoped with sales when your needs change.",
      },
      {
        question: "Do you offer refunds or a money-back guarantee?",
        answer:
          "Sandbox is free for integration testing. Paid Launch, Growth, Compliance, and Enterprise subscriptions are reviewed with the team based on usage and onboarding status.",
      },
      {
        question: "What happens if I exceed my verification limit?",
        answer:
          "Your account keeps working. You can move to Growth, Compliance, or Enterprise, or apply an overage arrangement based on verification and compliance volume.",
      },
    ],
  },
  {
    group: "Identity & Compliance",
    items: [
      {
        question: "Is AML screening included in all plans?",
        answer:
          "Sandbox includes test AML responses. Launch can add AML screening, while Growth, Compliance, and Enterprise include broader risk and monitoring options.",
      },
      {
        question: "How does credential reuse work for my users?",
        answer:
          "A user can verify once, then consent to reuse trusted proof across supported workflows. Growth, Compliance, and Enterprise plans are built for higher-volume reuse.",
      },
      {
        question: "Are verifications stored securely and tied to the user?",
        answer:
          "Yes. Ontiver keeps identity proof tied to the user with consent-aware access, audit logs, and controls suited for Compliance and Enterprise teams.",
      },
      {
        question: "What identity documents does Ontiver support?",
        answer:
          "Ontiver supports common identity document and biometric workflows for African markets, with Enterprise coverage reviewed during onboarding for specialized documents.",
      },
    ],
  },
  {
    group: "Integration",
    items: [
      {
        question: "Do you offer a free trial beyond Sandbox?",
        answer:
          "Sandbox is the free testing environment. Teams that need live pilots can start with Launch, then upgrade to Growth, Compliance, or Enterprise as usage scales.",
      },
      {
        question: "How long does it take to integrate Ontiver?",
        answer:
          "Most teams can start in Sandbox quickly with the API documentation. Launch and Growth integrations are usually straightforward, while Enterprise timelines depend on workflow scope.",
      },
      {
        question: "Is there a sandbox environment for testing?",
        answer:
          "Yes. Sandbox is designed for test keys, sample responses, API trials, and developer validation before moving to Launch or a larger production plan.",
      },
      {
        question: "Do you provide webhooks and API documentation?",
        answer:
          "Yes. API documentation is available from Sandbox onward, with webhook-driven workflows supported for Launch, Growth, Compliance, and Enterprise integrations.",
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
          "It means completing a trusted identity check once, then using the resulting proof again in supported journeys instead of uploading the same documents every time.",
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
