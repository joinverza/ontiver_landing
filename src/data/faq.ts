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

export const faqHeading = {
  pricing: {
    btext: "Frequently Asked Question",
    heading: "Pricing questions, clear answers.",
  },
  home: {
    btext: "Frequently Asked Question",
    heading: "Everything teams ask before trusting Ontiver.",
  },
};
