export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

export const LEGAL_LAST_UPDATED = "4 October 2026";

export const legalEntity = {
  name: "Qynara Technologies Limited",
  registration: "RC 9436348",
  address: "18, Road 23, Airforce, Akobo, Ibadan, Oyo State, Nigeria",
  privacyEmail: "privacy@ontiver.com",
  supportEmail: "support@ontiver.com",
};

const ENTITY = `${legalEntity.name} (${legalEntity.registration})`;

export const legalDocuments: Record<string, LegalDocument> = {
  "/privacy": {
    title: "Privacy Policy",
    summary:
      "How Ontiver collects, uses, shares and protects personal data, how long we keep it, and the rights you have under the Nigeria Data Protection Act 2023.",
    updated: LEGAL_LAST_UPDATED,
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          `Ontiver is operated by ${ENTITY}, a company incorporated in Nigeria with its registered office at ${legalEntity.address} ("Ontiver", "we", "us").`,
          "We are the data controller for personal data we collect to run ontiver.com, the Ontiver app and vault, and the accounts of businesses and developers that use our dashboards and API.",
          "When a business (our customer) uses Ontiver to verify its own customers, that business decides why and how the verification happens. For that data we act as its data processor and follow its instructions; the business's own privacy notice also applies, and we help it respond to your requests.",
          `For any privacy question or request, email ${legalEntity.privacyEmail} or write to us at the address above.`,
        ],
      },
      {
        heading: "Information we process",
        paragraphs: ["Depending on how you use Ontiver, we process:"],
        bullets: [
          "Account details: name, email address, phone number, password (stored only as a one-way hash), multi-factor authentication settings, and your role in an organisation.",
          "Identity verification data: government identification numbers such as NIN and BVN, identity document images and the details read from them, a selfie or short liveness video, and face-comparison data derived from them.",
          "Contact proofs: confirmation that you control a phone number or email address. One-time codes are never stored in readable form.",
          "Address data: the address you declare, its postcode, optional location coordinates, and the matching result from the NIPOST postcode register.",
          "Screening results: whether a name matches sanctions, politically exposed person or adverse media lists, where a business requests screening.",
          "Bank account data: only where you connect a bank account and agree to share it, for example to confirm account ownership.",
          "Proofs and sharing records: proofs issued to your vault, and a record of each request to share them, including who asked, the purpose, the fields requested and your decision.",
          "Payment details for paid plans: billing contact, plan and invoice history, and the card brand and last four digits returned by our payment processor. We never receive or store full card numbers.",
          "Support and communications: messages you send us, support tickets, waitlist and newsletter sign-ups.",
          "Technical data: IP address, device and browser type, request logs, security events, and error reports.",
          "Sign-in with Google or Apple: the account identifier, name and email those providers share with your permission.",
        ],
      },
      {
        heading: "Where the information comes from",
        paragraphs: [
          "Most information comes from you directly. We also receive information from a business that asks you to verify with Ontiver, from identity and screening providers and authorised government and bank identity records when we run a check you or that business requested, from Google or Apple if you use them to sign in, and automatically from your device when you use our services.",
        ],
      },
      {
        heading: "Why we use information and our legal bases",
        paragraphs: [
          "We process personal data only where the Nigeria Data Protection Act 2023 allows it:",
        ],
        bullets: [
          "To provide the service you or a business asked for, such as creating your account, running verification checks, issuing proofs and sharing them when you approve (performance of a contract).",
          "To verify identity using biometric data, to share your proofs with others, and to send marketing emails (your consent, which you can withdraw at any time).",
          "To keep records required by anti-money laundering, counter-terrorist financing and tax law, and to respond to lawful requests from authorities (legal obligation).",
          "To secure our services, prevent fraud and misuse, fix errors and improve Ontiver, in ways you would reasonably expect and that do not override your rights (legitimate interests).",
        ],
      },
      {
        heading: "Biometric and other sensitive data",
        paragraphs: [
          "Face images, liveness video and face-comparison data are sensitive personal data. We process them only with your explicit consent and only to confirm that you are the person on the identity record or document.",
          "Liveness media is deleted within 6 hours, identity document images within 24 hours, and face-comparison templates within 24 hours of the check. We keep the result of the check, not the biometric data itself.",
        ],
      },
      {
        heading: "Automated checks and decisions",
        paragraphs: [
          "Verification checks are automated: they compare the information you provide with authoritative records and return a result with reasons. Where a business makes a decision about you based on those results, that business is responsible for the decision and must offer you a way to have it reviewed by a person.",
          "Some Ontiver features use AI to draft or explain information for people at businesses, for example drafting a verification workflow. AI never makes a verification decision. Before any text reaches an AI provider, personal identifiers are replaced with tokens.",
        ],
      },
      {
        heading: "Who we share information with",
        paragraphs: [
          "We do not sell personal data. We share it only as needed to provide Ontiver, with:",
        ],
        bullets: [
          "Businesses you choose to share a proof with, and only the fields you approve, for the purpose and period shown when you approve.",
          "The business that asked you to verify, which receives the results of the checks it requested.",
          "Identity and screening providers: Smile ID and Youverify, and authorised sources of government and bank identity records such as NIN and BVN records.",
          "Communication providers: Resend for email and Sendexa for SMS and WhatsApp verification codes.",
          "NIPOST, for postcode lookups. We send only the postcode or coordinates, never your name.",
          "Paystack for payments, and Mono for bank account data you choose to connect.",
          "Infrastructure providers: Render (application hosting and databases), Cloudflare (encrypted file storage), Google Cloud (encryption key management) and Sentry (error monitoring, configured not to collect personal data).",
          "OpenAI, only for AI features a business has switched on, and only with personal identifiers replaced by tokens.",
          "Google and Apple, if you use them to sign in.",
          "Professional advisers, auditors, insurers, and regulators or law enforcement where the law requires it, and a buyer or successor if our business is reorganised or sold, under equivalent protections.",
        ],
      },
      {
        heading: "International transfers",
        paragraphs: [
          "Our application servers and databases are hosted by Render in the United States, and some of our providers operate in other countries. When personal data leaves Nigeria, we rely on the transfer grounds in Part VIII of the Nigeria Data Protection Act 2023, including contractual safeguards with each provider, and we encrypt data in transit and at rest.",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "We keep personal data only as long as we need it for the purpose it was collected for, or as the law requires:",
        ],
        bullets: [
          "Liveness media: up to 6 hours. Identity document images and face-comparison templates: up to 24 hours.",
          "Raw responses from verification providers: up to 7 days.",
          "Normalised verification evidence: up to 30 days.",
          "Issued proofs: up to 1 year, or until they expire or you revoke them, whichever is sooner.",
          "Audit records of verifications, approvals and sharing: 7 years, to meet anti-money laundering and dispute-resolution requirements.",
          "Account details: while your account is open. After a deletion request is processed, we delete or anonymise them, except records we must keep for the periods above.",
          "Support messages: for as long as needed to resolve your request and keep a record of how it was handled.",
        ],
      },
      {
        heading: "How we protect information",
        paragraphs: [
          "We encrypt data in transit with TLS and at rest. Identity data is encrypted with keys managed in Google Cloud Key Management Service, and raw personal data is minimised once a check is complete. Each organisation's data is isolated at the database level. Staff and business accounts use multi-factor authentication, sensitive actions require recent re-authentication, and access is logged.",
          "No system is perfectly secure. If a breach is likely to put your rights at risk, we will notify the Nigeria Data Protection Commission and, where required, you, within the time the law sets.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under the Nigeria Data Protection Act 2023 you can ask us to:",
        ],
        bullets: [
          "Give you a copy of your personal data, including in a portable format.",
          "Correct personal data that is inaccurate or incomplete.",
          "Delete your personal data, subject to the records we must keep by law.",
          "Restrict or object to processing based on our legitimate interests.",
          "Withdraw your consent at any time, for example by revoking a shared proof. This stops future processing but does not affect processing already done.",
          "Not be subject to a decision based solely on automated processing that significantly affects you, and have a person review it.",
        ],
      },
      {
        heading: "How to make a request",
        paragraphs: [
          `Email ${legalEntity.privacyEmail}. You can also download or delete your data in the Ontiver app, or start a deletion request on our Account Deletion page. We may ask you to confirm your identity, and we respond within 30 days.`,
          "If your data was collected by a business that verified you through Ontiver, you can contact that business or us; we will pass your request on and help it respond.",
          "If you are not satisfied with our response, you can complain to the Nigeria Data Protection Commission (ndpc.gov.ng).",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "Ontiver accounts are for people aged 18 and over. We do not knowingly collect personal data from children. If you believe a child has given us personal data, contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We will update this policy when our practices change and show the date of the latest version at the top of this page. If a change materially affects how we use your personal data, we will tell you by email or in the app before it takes effect.",
        ],
      },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    summary:
      "The agreement between you and Qynara Technologies Limited for using Ontiver's website, app, dashboards and API.",
    updated: LEGAL_LAST_UPDATED,
    sections: [
      {
        heading: "About these terms",
        paragraphs: [
          `These terms are an agreement between you and ${ENTITY}, the company that operates Ontiver, with its registered office at ${legalEntity.address}. By creating an account or using ontiver.com, the Ontiver app, our dashboards or our API, you accept these terms.`,
          "If you use Ontiver on behalf of a business, you confirm that you are authorised to accept these terms for it, and \"you\" includes that business. A signed order form or enterprise agreement with us takes priority over these terms where they conflict.",
        ],
      },
      {
        heading: "Eligibility",
        paragraphs: [
          "You must be at least 18 years old and able to enter into a binding contract. You must not use Ontiver if the law prohibits you from doing so, or if we have previously closed your account for breaching these terms.",
        ],
      },
      {
        heading: "Your account",
        paragraphs: [
          "Give accurate information and keep it up to date. Keep your password, multi-factor authentication device, API keys and secrets confidential, and tell us immediately at support@ontiver.com if you suspect unauthorised access. You are responsible for activity under your account, including activity by team members you invite and by systems using your API keys.",
        ],
      },
      {
        heading: "What Ontiver provides",
        paragraphs: [
          "Ontiver lets people verify their identity once and reuse proof of it with their permission, and lets businesses run verification checks, manage verification workflows, and receive proofs that people choose to share. Features depend on your plan, as described on our pricing page.",
          "Sandbox accounts and sandbox API keys use test data only and must not be used with real people's information.",
        ],
      },
      {
        heading: "Verification results and proofs",
        paragraphs: [
          "A verification result shows what the selected checks found, at the time they ran, against the sources available to us. Results are not a guarantee of a person's identity, character, creditworthiness or eligibility, and sources can be incomplete or unavailable.",
          "If you are a business, you remain responsible for your own decisions, for complying with the know-your-customer, anti-money laundering and other rules that apply to you, and for giving people a way to challenge decisions that affect them.",
          "If you are an individual, you decide whether to share a proof. Each request shows who is asking, why, which fields and for how long. You can revoke sharing at any time; revocation stops future access but cannot recall information already shared.",
        ],
      },
      {
        heading: "Business and developer responsibilities",
        paragraphs: ["If you use Ontiver as a business or developer, you must:"],
        bullets: [
          "Have a lawful basis, and where required consent, for every person you ask to verify, and tell them how their data will be used.",
          "Request only the checks and fields you need for the stated purpose.",
          "Keep API secrets on your servers, never in browser or mobile code, and rotate them if they may have been exposed.",
          "Comply with the Nigeria Data Protection Act 2023 and any other data protection law that applies to you, and with the data processing terms that form part of your agreement with us.",
          "Respect the request limits of your plan and our documented rate limits.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: ["You must not:"],
        bullets: [
          "Verify, impersonate or submit information about a person without their knowledge and a lawful basis.",
          "Use Ontiver to commit fraud, launder money, finance terrorism, discriminate unlawfully, or evade sanctions.",
          "Submit false, altered or stolen documents, images or identification numbers.",
          "Probe, scan or test our systems for vulnerabilities without our written permission, or bypass security, rate limits or plan limits.",
          "Copy, resell or build a competing database from verification results, or scrape our services.",
          "Interfere with Ontiver's operation or other users' use of it.",
        ],
      },
      {
        heading: "Fees and payment",
        paragraphs: [
          "Sandbox is free. Paid plans are charged in the currency and at the prices shown on our pricing page or in your order form, in advance, through our payment processor Paystack. Usage above your plan's included volume is charged at the overage rates shown for your plan. Prices exclude applicable taxes, which we add where required.",
          "Plans renew automatically until cancelled. You can cancel at any time by emailing support@ontiver.com; cancellation takes effect at the end of the current billing period, and fees already paid are not refunded except where the law requires. We will give at least 30 days' notice of price changes for your plan.",
        ],
      },
      {
        heading: "Availability and support",
        paragraphs: [
          "We work to keep Ontiver available and secure, and we publish target availability for each plan on our pricing page. Targets are not guarantees unless an enterprise agreement includes a service level agreement. We may carry out maintenance and will try to schedule it to minimise disruption.",
          "Ontiver relies on third-party providers, such as identity record sources, mobile networks and payment processors. When a provider is unavailable, related checks may be delayed or return an unavailable result.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Ontiver, its software, documentation and brand belong to us or our licensors. We give you a limited, non-exclusive, non-transferable right to use them while your account is active and in line with these terms. You keep ownership of the data you submit, and you give us the rights we need to process it to provide Ontiver. If you send us feedback, we may use it without obligation to you.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          "Our Privacy Policy explains how we handle personal data. Where we process personal data on behalf of a business, the data processing terms in that business's agreement with us apply.",
        ],
      },
      {
        heading: "Suspension and termination",
        paragraphs: [
          "You can close your account at any time from the app or our Account Deletion page. We may suspend or close an account, or disable API keys, if you breach these terms, if we must do so by law, or to protect people, our services or others from harm. Where reasonable, we will tell you first and give you a chance to fix the problem.",
          "When an account closes, your right to use Ontiver ends. We keep and delete data as described in our Privacy Policy. Sections that by their nature should continue, including fees owed, disclaimers, limitation of liability and governing law, survive.",
        ],
      },
      {
        heading: "Disclaimers",
        paragraphs: [
          "Apart from the commitments in these terms, Ontiver is provided \"as is\" and \"as available\". To the extent the law allows, we disclaim implied warranties, including fitness for a particular purpose and that the service will be uninterrupted or error-free. Nothing in these terms excludes rights you have as a consumer that cannot be excluded by law.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent the law allows, neither party is liable for indirect or consequential loss, or for loss of profits, revenue, goodwill or data, arising from these terms. Our total liability to you for all claims in any 12-month period is limited to the greater of the fees you paid us in that period and USD 100.",
          "These limits do not apply to liability that cannot be limited by law, including liability for fraud or for death or personal injury caused by negligence.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "If you are a business, you will compensate us for reasonable losses and costs arising from claims by third parties that result from your breach of these terms or of data protection law, or from your decisions based on verification results.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms. We will show the date of the latest version at the top of this page and, for material changes, give you at least 30 days' notice by email or in the app. If you keep using Ontiver after a change takes effect, the updated terms apply; if you do not agree, you can close your account before then.",
        ],
      },
      {
        heading: "Governing law and disputes",
        paragraphs: [
          "These terms are governed by the laws of the Federal Republic of Nigeria. We will first try to resolve any dispute informally; contact us at support@ontiver.com. If it is not resolved within 30 days, the courts of Lagos State, Nigeria have exclusive jurisdiction.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `${ENTITY}, ${legalEntity.address}. Support: ${legalEntity.supportEmail}. Privacy: ${legalEntity.privacyEmail}.`,
        ],
      },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    summary:
      "The cookies and browser storage Ontiver uses on ontiver.com, in the Ontiver app and in our dashboards, and how you can control them.",
    updated: LEGAL_LAST_UPDATED,
    sections: [
      {
        heading: "In short",
        paragraphs: [
          "Ontiver does not use advertising or cross-site tracking cookies, and we do not use third-party analytics that profile you. We only use cookies and browser storage that are needed for sign-in, security, and features you choose to use.",
          "Cookies are small files a website stores in your browser. Browser storage (local and session storage) works in a similar way but is never sent to our servers automatically.",
        ],
      },
      {
        heading: "On ontiver.com",
        paragraphs: [
          "Our public website sets no cookies. It uses one browser storage item, and only if you contact support through the website:",
        ],
        bullets: [
          "ontiver.publicSupportSession (local storage): lets you return to your open support conversation. It stays until you close the conversation or clear your browser storage.",
        ],
      },
      {
        heading: "When you sign in",
        paragraphs: [
          "Our app and dashboards (portal, developer, admin and sign-in pages) use the following, all strictly necessary for the service you asked for:",
        ],
        bullets: [
          "ontiver_<area>_refresh_token (cookie): keeps you signed in securely. HttpOnly, Secure and SameSite=Strict, so scripts and other sites cannot read it. Lasts up to 30 days, or until you sign out.",
          "ontiver_<area>_mfa_trust (cookie): remembers a device you chose to trust for two-step sign-in, so you are not asked for a code every time. HttpOnly, Secure and SameSite=Strict. Lasts up to 15 days.",
          "Session storage for your current sign-in, for a verification or sharing request you started before signing in so you can continue it, and for any API key secret you enter in a dashboard. All of it is cleared when you close the tab.",
          "Local storage for interface preferences, such as light or dark theme, a collapsed sidebar and onboarding tips you dismissed.",
        ],
      },
      {
        heading: "Error monitoring",
        paragraphs: [
          "We use Sentry to detect and fix errors. It sets no cookies, is configured not to collect personal data, and records performance for only a small sample of page loads.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "Because we only use strictly necessary cookies and storage, we do not show a consent banner. You can clear or block cookies and browser storage in your browser settings at any time. If you block the sign-in cookies, you will need to sign in again more often and some features of the app and dashboards will not work.",
          "If we ever add optional cookies, such as analytics, we will update this policy and ask for your consent first.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Questions about this policy: ${legalEntity.privacyEmail}, or ${ENTITY}, ${legalEntity.address}.`,
        ],
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
