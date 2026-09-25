# Blog and legal publication review

Review recorded 25 September 2026 against the supplied Blog, Legal Structure, and Pinterest Image Guide. This file is an internal review record, not published policy wording.

## Publication decisions

- Existing policy prose had no documented qualified legal approval in the repository. It included an unverified legal entity, effective date, SmileID exclusivity, retention/security promises, and jurisdiction-specific terms. Public policy routes now show review-pending structures, not these assertions.
- Before publication, the founder and qualified legal reviewer must confirm entity details, age/eligibility, actual processors and any SmileID relationship, purposes and applicable bases, transfers, retention, security practices, rights handling, cookie/storage inventory, commercial terms, liability, termination, and governing law.
- The account-deletion client calls `/account-deletion/request` and `/account-deletion/confirm`. Its typed confirmation response contains `requestId`, `status`, and `message`; this repository does not document that confirmation completes deletion. The UI acknowledges a submitted/verified request and preserves the server response. It does not assert that all data has already been deleted or promise sign-in grant revocation.
- Named blog authors and dated publication claims had no provenance. Articles use an Ontiver editorial label and omit publication dates pending actual publication approval. Reading times are derived from body word counts.
- The webhook event names in the supplied brief are illustrative proposed integration events, not an independently verified Ontiver API contract. No event payload schema, retry policy, signature protocol, or enabled screening provider is represented as a live Ontiver guarantee.

## Validation

Validation: focused ESLint passed for blog data, blog components, both blog pages, and the legal page. Browser checks covered all eight articles, the listing, and all five legal routes at 390px and 1440px: 30 route/functional checks passed with no overflow, broken images, or browser exceptions. The supplied titles, categories, excerpts, and opening paragraphs matched exactly. Load-more, reading progress, share targets, newsletter consent, and deletion error/retry/confirmation/completion were exercised with intercepted mock responses only; no real submissions were made. Evidence is stored locally at `C:/tmp/ontiver-blog-legal/report.json`.

## Previous policy text retained for legal review

The following source was removed from public rendering. Preservation does not validate any assertion or create a policy. The former effective date is also unverified.

```tsx
const updated = "17 July 2026";
const documents: Record<string, { title: string; summary: string; sections: LegalSection[] }> = {
  "/privacy": {
    title: "Privacy Policy",
    summary: "How Ontiver collects, uses, shares, safeguards, and deletes personal information.",
    sections: [
      { heading: "Who we are", paragraphs: ["Ontiver Inc., Nigeria (\"Ontiver\", \"we\", \"us\") provides reusable digital identity, verification, credential, consent, and account services. This policy applies to Ontiver's website, mobile applications, dashboards, APIs, and support services. Our Nigeria-first consumer launch is intended for people aged 18 and over."] },
      { heading: "Information we process", paragraphs: ["Depending on the service you use, we process account and contact details, profile information, device and session data, credentials and verification results, consent and sharing history, support communications, security events, and billing or enterprise workspace information."], bullets: ["Google or Apple sign-in may provide a stable provider identifier, verified email status, name, and authorization metadata.", "Push notification tokens, crash diagnostics, and limited product analytics are processed only for delivery, security, reliability, and product improvement.", "We do not sell personal information or use identity documents for advertising."] },
      { heading: "SmileID verification", paragraphs: ["SmileID is Ontiver's exclusive provider for selfie, face, liveness, document, and identity verification. Ontiver does not run independent face matching or liveness models. Verification captures and results are sent to SmileID under our instructions and handled according to the applicable verification flow, contract, and law."] },
      { heading: "Why we use information", paragraphs: ["We use information to create and secure accounts, deliver verification and reusable credentials, record consent, prevent fraud, support users, meet legal and compliance obligations, operate enterprise integrations, improve reliability, and communicate service or security notices. Where consent is the legal basis, it can be withdrawn without affecting earlier lawful processing."] },
      { heading: "Sharing and international processing", paragraphs: ["We disclose only what is needed to service providers such as SmileID, cloud hosting, email, monitoring, push notification, analytics, and social sign-in providers; to an organization you explicitly authorize; or when law and safety require it. Providers must protect information and process it for defined purposes. Some processing may occur outside Nigeria with contractual and technical safeguards."] },
      { heading: "Retention and security", paragraphs: ["We retain information only for the service, security, fraud-prevention, audit, contractual, and legal periods that apply. Retention varies by record type and verification obligation. We use encryption in transit and at rest where appropriate, access controls, audit logs, token rotation, and restricted production access. No system can guarantee absolute security."] },
      { heading: "Your choices and rights", paragraphs: ["You can review account data, change privacy and notification preferences, revoke active sharing, request an export, correct information, or initiate deletion from the Ontiver app. An external deletion flow is also available on our Account Deletion page. Some records may be retained where law, fraud prevention, disputes, or security require it."], bullets: ["Email privacy or rights requests to support@ontiver.com.", "We may verify identity before fulfilling a request.", "You may escalate an unresolved concern to the Nigeria Data Protection Commission where applicable."] },
      { heading: "Contact and changes", paragraphs: ["Questions can be sent to support@ontiver.com. We may update this policy as the service or law changes. Material changes will be communicated through the app, website, or email where appropriate."] },
    ],
  },
  "/terms": {
    title: "Terms of Use",
    summary: "The rules for accessing Ontiver's consumer, enterprise, developer, and verification services.",
    sections: [
      { heading: "Agreement and eligibility", paragraphs: ["These Terms form an agreement between you and Ontiver Inc., Nigeria. You must be at least 18 years old, have legal capacity, and provide accurate information. If you use Ontiver for an organization, you confirm that you are authorized to bind it."] },
      { heading: "Accounts and sign-in", paragraphs: ["Keep your devices, credentials, recovery methods, and linked Apple or Google accounts secure. You are responsible for activity through your account unless you notify us promptly of unauthorized use. Social sign-in is optional; email and password remain available where enabled."] },
      { heading: "Verification and credentials", paragraphs: ["Ontiver coordinates verification through SmileID and may issue or display credentials based on provider results. A credential is not a guarantee of identity, creditworthiness, legality, or future conduct. Organizations remain responsible for their own risk, compliance, and onboarding decisions."] },
      { heading: "Acceptable use", paragraphs: ["Do not impersonate others, submit unlawful or misleading data, bypass controls, scrape or reverse engineer protected services, disrupt availability, misuse API credentials, probe without authorization, or use Ontiver to violate law or another person's rights."] },
      { heading: "Availability, changes, and third parties", paragraphs: ["We may change, suspend, or discontinue features for security, legal, technical, or operational reasons. Provider services, including SmileID, Apple, Google, hosting, and communications platforms, have their own availability and terms."] },
      { heading: "Fees, ownership, and feedback", paragraphs: ["Enterprise or paid services are governed by the applicable order or plan. Ontiver and its licensors own the platform, branding, software, and documentation. You retain rights in your content and grant us the limited rights needed to operate the service. Feedback may be used without restriction or compensation."] },
      { heading: "Liability and termination", paragraphs: ["To the maximum extent permitted by law, the service is provided without implied warranties and Ontiver is not liable for indirect, special, or consequential loss. Any aggregate liability is limited by the applicable agreement and law. We may restrict or terminate misuse; you may stop using Ontiver and request deletion at any time."] },
      { heading: "Governing law and contact", paragraphs: ["These Terms are governed by the laws of the Federal Republic of Nigeria, without limiting mandatory consumer rights. Contact support@ontiver.com before commencing a dispute so we can try to resolve it promptly."] },
    ],
  },
  "/cookies": {
    title: "Cookie Policy",
    summary: "How the Ontiver website uses cookies and similar browser storage.",
    sections: [
      { heading: "What we use", paragraphs: ["Ontiver uses essential cookies or local storage for security, session continuity, language or theme preferences, consent choices, and reliable site operation. Optional analytics may help us understand aggregate usage and diagnose performance."] },
      { heading: "Cookie categories", paragraphs: [], bullets: ["Strictly necessary: authentication, security, fraud prevention, routing, and consent storage.", "Preferences: interface choices such as theme or locale.", "Analytics and diagnostics: limited product usage, errors, performance, and device context with unnecessary personal data disabled."] },
      { heading: "Managing choices", paragraphs: ["You can use available consent controls and browser settings to block or remove cookies. Blocking essential storage can prevent sign-in or other protected features from working. Ontiver does not use identity verification data for behavioral advertising."] },
      { heading: "Contact", paragraphs: ["For questions about cookies or tracking technologies, email support@ontiver.com."] },
    ],
  },
};
```
