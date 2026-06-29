export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string };

export type BlogArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  views: number;
  shares: number;
  category: string;
  body: BlogBodyBlock[];
};

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: "why-identity-verification-should-be-reusable",
    title: "Why Identity Verification Should Be Reusable",
    excerpt:
      "Identity should not restart every time a user joins a new platform. Reusable verification lowers friction, reduces cost, and improves trust.",
    image: "/assets/blog-man.png",
    date: "May 20, 2026",
    author: "James Weick",
    readTime: "6 min read",
    views: 1600,
    shares: 996,
    category: "Identity",
    body: [
      {
        type: "paragraph",
        text:
          "Most digital products still ask users to prove the same facts again and again. A person verifies their document for a lender, repeats the process for a marketplace, then starts over for a workplace tool. Each restart adds friction, cost, and a new moment where the user can abandon the journey.",
      },
      {
        type: "paragraph",
        text:
          "Reusable identity changes that pattern. Once a trusted verification exists, businesses can ask for permission to reuse the proof instead of asking the user to repeat the entire workflow. The result is faster onboarding without lowering the standard of assurance.",
      },
      {
        type: "quote",
        text:
          "Reusable identity is not about storing more data. It is about carrying forward trusted proof with consent, context, and auditability.",
      },
      {
        type: "paragraph",
        text:
          "For compliance teams, reusable credentials also create a cleaner audit story. Every reuse event can be tied to user consent, the relying party, the verification source, and the decision rules applied at the time.",
      },
      {
        type: "paragraph",
        text:
          "The strongest systems make reuse selective. A bank may need a different risk posture than a gig platform, and a high-value transaction may require a fresh check. Reuse works best when it is paired with policy controls, monitoring, and clear expiry rules.",
      },
    ],
  },
  {
    id: 2,
    slug: "cutting-kyc-costs-without-cutting-assurance",
    title: "Cutting KYC Costs Without Cutting Assurance",
    excerpt:
      "A practical guide to lowering verification spend while preserving the risk checks, consent trails, and audit evidence compliance teams need.",
    image: "/assets/fintech.png",
    date: "June 4, 2026",
    author: "Amara Cole",
    readTime: "5 min read",
    views: 1280,
    shares: 712,
    category: "KYC",
    body: [
      {
        type: "paragraph",
        text:
          "KYC costs rise quietly. A product team adds new regions, a compliance team adds AML screening, support handles edge cases, and the finance team sees verification spend grow faster than customer activation.",
      },
      {
        type: "paragraph",
        text:
          "The first optimization is visibility. Teams need to separate document checks, biometric checks, AML screens, retries, abandoned flows, and manual reviews. Without that split, the largest savings opportunities stay hidden.",
      },
      {
        type: "paragraph",
        text:
          "Reusable credentials reduce repeat checks, but savings also come from better orchestration. A returning low-risk user should not always follow the same path as a new high-risk user.",
      },
      {
        type: "quote",
        text:
          "The best KYC cost strategy is not fewer checks. It is the right check at the right moment for the right level of risk.",
      },
    ],
  },
  {
    id: 3,
    slug: "aml-screening-for-product-teams",
    title: "AML Screening for Product Teams",
    excerpt:
      "What builders need to know about watchlists, ongoing monitoring, match resolution, and how AML checks fit into user onboarding.",
    image: "/assets/radar.png",
    date: "June 9, 2026",
    author: "Nora Adeyemi",
    readTime: "7 min read",
    views: 980,
    shares: 403,
    category: "AML",
    body: [
      {
        type: "paragraph",
        text:
          "AML screening is often treated as a back-office concern, but product choices shape how well those controls work. The flow, timing, retry logic, and review paths all influence how many users finish onboarding and how many alerts become operational work.",
      },
      {
        type: "paragraph",
        text:
          "A good product integration makes screening visible enough for operators and invisible enough for legitimate users. That means clear states, reliable webhooks, and a consistent record of why a decision was made.",
      },
      {
        type: "paragraph",
        text:
          "The highest-impact improvement is match quality. False positives slow teams down, while missed matches increase exposure. Product teams should track both as part of onboarding health.",
      },
    ],
  },
  {
    id: 4,
    slug: "building-consent-into-identity-flows",
    title: "Building Consent Into Identity Flows",
    excerpt:
      "Consent is more than a checkbox. It is a product layer that should be understandable, revocable, and tied to every reuse event.",
    image: "/assets/consent.svg",
    date: "June 14, 2026",
    author: "Tomi Fraser",
    readTime: "4 min read",
    views: 1420,
    shares: 621,
    category: "Consent",
    body: [
      {
        type: "paragraph",
        text:
          "Consent becomes fragile when it is hidden inside dense legal copy. Users need to understand what is being shared, who receives it, and why it matters to the action they are taking.",
      },
      {
        type: "paragraph",
        text:
          "In reusable identity systems, consent also needs memory. A user may approve reuse today, revoke it later, or approve one relying party while rejecting another.",
      },
      {
        type: "quote",
        text:
          "Clear consent makes identity reuse feel like control, not surveillance.",
      },
      {
        type: "paragraph",
        text:
          "A strong consent layer pairs friendly language with durable records: timestamp, relying party, data category, purpose, and policy version. Those details matter when a compliance team needs to reconstruct a decision.",
      },
    ],
  },
  {
    id: 5,
    slug: "developer-guide-to-verification-webhooks",
    title: "A Developer Guide to Verification Webhooks",
    excerpt:
      "How to design webhook handlers that are idempotent, observable, resilient, and ready for compliance-critical verification events.",
    image: "/assets/binary.png",
    date: "June 18, 2026",
    author: "Ife Martin",
    readTime: "8 min read",
    views: 870,
    shares: 286,
    category: "Developers",
    body: [
      {
        type: "paragraph",
        text:
          "Verification webhooks are small messages with large consequences. They often drive account activation, risk decisions, audit records, and support workflows.",
      },
      {
        type: "paragraph",
        text:
          "The safest handlers are idempotent. If the same event arrives twice, the system should produce the same final state. Store event identifiers, verify signatures, and separate receipt from processing when latency matters.",
      },
      {
        type: "paragraph",
        text:
          "Observability matters as much as correctness. Teams should be able to answer which events arrived, which failed, which were retried, and which user state changed as a result.",
      },
    ],
  },
  {
    id: 6,
    slug: "risk-signals-that-matter-in-onboarding",
    title: "Risk Signals That Matter in Onboarding",
    excerpt:
      "A framework for ranking signals that improve fraud detection without overcomplicating the user journey.",
    image: "/assets/matrix.png",
    date: "June 21, 2026",
    author: "Lena Okafor",
    readTime: "6 min read",
    views: 1110,
    shares: 508,
    category: "Risk",
    body: [
      {
        type: "paragraph",
        text:
          "Not every signal deserves the same weight. Device reputation, document consistency, liveness confidence, velocity, watchlist matches, and behavioral clues should be ranked by predictive value and operational cost.",
      },
      {
        type: "paragraph",
        text:
          "A mature onboarding system uses risk to route users, not punish them. Low-risk users move quickly. Higher-risk users receive stronger checks or human review.",
      },
      {
        type: "paragraph",
        text:
          "The goal is a journey that feels simple for honest users and expensive for attackers.",
      },
    ],
  },
  {
    id: 7,
    slug: "what-audit-ready-identity-logs-need",
    title: "What Audit-Ready Identity Logs Need",
    excerpt:
      "The records compliance teams should expect from modern verification infrastructure, from consent events to decision evidence.",
    image: "/assets/systems.png",
    date: "June 24, 2026",
    author: "Maya Hart",
    readTime: "5 min read",
    views: 760,
    shares: 214,
    category: "Compliance",
    body: [
      {
        type: "paragraph",
        text:
          "An audit-ready identity log should explain what happened, when it happened, who initiated it, and which evidence informed the decision.",
      },
      {
        type: "paragraph",
        text:
          "Useful logs connect events across the journey: consent, document capture, biometric match, AML screen, review action, and reuse request.",
      },
      {
        type: "paragraph",
        text:
          "The best logs are boring in the best possible way. They are consistent, exportable, and readable under pressure.",
      },
    ],
  },
  {
    id: 8,
    slug: "reusable-identity-for-marketplaces",
    title: "Reusable Identity for Marketplaces",
    excerpt:
      "How marketplaces can verify buyers, sellers, and service providers without adding repeat friction at every transaction layer.",
    image: "/assets/marketplaces.png",
    date: "June 26, 2026",
    author: "James Weick",
    readTime: "6 min read",
    views: 1320,
    shares: 677,
    category: "Marketplaces",
    body: [
      {
        type: "paragraph",
        text:
          "Marketplaces rely on trust between people who may never meet. Identity checks reduce risk, but repeated checks can hurt activation, liquidity, and repeat usage.",
      },
      {
        type: "paragraph",
        text:
          "Reusable identity lets a verified seller bring proof into new contexts while the marketplace keeps control over policy and risk thresholds.",
      },
      {
        type: "quote",
        text:
          "Trust grows faster when proof can travel with the user and policy can still adapt to the transaction.",
      },
      {
        type: "paragraph",
        text:
          "The right implementation gives users speed, operators visibility, and compliance teams a record they can defend.",
      },
    ],
  },
];

export function getBlogArticleBySlug(slug: string | undefined) {
  return blogArticles.find((article) => article.slug === slug);
}
