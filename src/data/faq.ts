export type FAQItem = {
  question: string;
  answer: string;
  link?: { label: string; to: string };
};

export type FAQGroup = { group: string; items: FAQItem[] };

export const faqGroups: FAQGroup[] = [
  {
    group: "Pricing",
    items: [
      { question: "How is pricing calculated?", answer: "Our pricing model and plan allowances are being finalized. Contact the team to discuss your volume and requirements.", link: { label: "Discuss pricing", to: "/enterprise/contact" } },
      { question: "Can I change plans later?", answer: "Yes — you can move between plans as your verification volume changes." },
      { question: "Is there a free trial or sandbox?", answer: "Yes — Sandbox is designed for testing before you commit to a paid plan.", link: { label: "Request Sandbox access", to: "/enterprise/contact?request=sandbox" } },
    ],
  },
  {
    group: "Identity & Compliance",
    items: [
      { question: "Is Ontiver a KYC provider or a reusable identity layer?", answer: "Ontiver orchestrates verification through trusted providers and turns the result into a reusable, consent-based proof — it's infrastructure, not a single-purpose KYC tool." },
      { question: "Does Ontiver store raw identity documents?", answer: "Ontiver is designed to minimize raw document storage and to return verified claims and proofs rather than documents wherever possible." },
      { question: "How does the user control identity sharing?", answer: "Every enterprise request requires explicit user consent before any evidence is shared, and users can review or revoke access at any time." },
      { question: "How do I request security or compliance documentation?", answer: "Tell us which security controls, evidence, or compliance requirements your team needs to review.", link: { label: "Request security documentation", to: "/enterprise/security#request-docs" } },
    ],
  },
  {
    group: "Integration",
    items: [
      { question: "Can businesses integrate Ontiver through API?", answer: "Yes — API and dashboard access are both available, with sandbox testing before production.", link: { label: "Start Sandbox", to: "/enterprise/contact?request=sandbox" } },
      { question: "What industries can Ontiver support?", answer: "Financial services, HR, logistics, marketplaces, and more — see the full industry directory.", link: { label: "Explore industry workflows", to: "/enterprise/use-cases" } },
    ],
  },
];

export const planNames = new Set(["Sandbox", "Launch", "Growth", "Compliance", "Enterprise"]);
export const homeGroupOrder = ["Identity & Compliance", "Integration", "Pricing"];

export const individualFaqGroups: FAQGroup[] = [
  {
    group: "Your Identity",
    items: [
      { question: "What is Ontiver?", answer: "Ontiver helps you verify your identity once and create a reusable proof you can share with supported businesses, with your approval each time." },
      { question: "Where can I use Ontiver?", answer: "With supported businesses and platforms. As more partners integrate Ontiver, your proof becomes useful in more places." },
      { question: "Is Ontiver free for individuals?", answer: "Individual pricing has not been announced. We'll share the details before launch." },
    ],
  },
  {
    group: "Privacy & Access",
    items: [
      { question: "Do businesses see my full documents?", answer: "No. Ontiver is designed to share only the specific claims a business needs for a specific purpose — not your raw documents." },
      { question: "Can I control who uses my proof?", answer: "Yes. Nothing is shared without your explicit approval, and you can see a full history of every share." },
      { question: "What happens if I decline a request?", answer: "The requesting business is notified that you declined, and no information is shared. Declining doesn't affect your identity proof status." },
    ],
  },
];

export const faqHeading = {
  pricing: { btext: "Frequently asked questions", heading: "Pricing questions, clear answers." },
  enterprise: { btext: "Frequently asked questions", heading: "What enterprise teams ask before integrating Ontiver." },
  individual: { btext: "Questions from individuals", heading: "Understand how your reusable identity works." },
};
