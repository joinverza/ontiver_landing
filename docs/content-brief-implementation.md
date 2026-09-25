# September 2026 content brief implementation

The three pasted user briefs received on 25 September 2026 are the current copy specification. They take precedence over the earlier PDF-derived wording. The PDFs remain supporting product context; they are not evidence of live availability, published results or approved legal terms.

## Source briefs

- Individual Division: attachment `0e117e7e-abb2-48a5-8045-605a8a9c9c80/Pasted text.txt`.
- Enterprise Division: attachment `fa3c49fe-bf96-41e3-81e6-025f380d397b/Pasted text.txt`.
- Blog, Legal Structure, and Pinterest Image Guide: attachment `36e3b9f8-7c52-46cf-8a93-75950fb7bea2/Pasted text.txt`.

## Implementation decisions

| Area | Applied content and behavior |
| --- | --- |
| Both homepages | Supplied hero copy, audience-specific marquee phrases, six capabilities, seven-step journey, consent/security copy, FAQs and final calls to action. The individual hero has a labelled planned-app concept showing an example pending request. |
| Individual pages | Identity, request journey, six detailed everyday use cases, early access, security, resources, contact and support follow the supplied division copy. Expandable details preserve the compact layouts. |
| Enterprise pages | Six platform layer pages, the industry directory and 22 detail pages use the supplied headlines, workflows, claims, decision boundaries and industry-specific pilot CTAs. The six priority workflows are lenders, fintech, HR, logistics, marketplaces and construction. |
| Evidence | Partner, certification and recognition data remain empty and hidden until approved for publication. Pilot metrics remain structurally present with pending results. No numbers or logos were invented. |
| Pricing | All five proposed plans and the comparison structure remain. Unconfirmed prices, allowances, screening allocations and SLAs are marked pending. The explicit Compliance audit-log/export inclusions come from the new brief. Monthly/annual choices are carried into a quote request, without inventing discounts. |
| Calculator | Entered volume, current unit cost and drop-off produce current monthly cost and estimated lost-user count. Ontiver cost, direct savings and a recommended plan remain pending a confirmed quote/workflow review. |
| Blog | Eight supplied titles, categories, excerpts and openings are retained, with full article bodies and primary references. Unverified personal bylines and publication dates are removed; read times derive from body length. Webhook event names are examples, not a claimed production contract. |
| Legal | Policy routes contain only review-pending outlines. Previous prose is preserved in `blog-legal-review.md` for review, not silently discarded. Unconfirmed SmileID and legal-entity claims are not published. The three policy routes are excluded from the sitemap and carry `noindex, follow` in client and prerendered metadata. |
| Account deletion | Email/code verification still calls the existing service. Completion acknowledges the returned deletion request reference; it does not claim that deletion has finished when the service only accepts a request. |
| Photography | Existing licensed, locally hosted contextual photos are retained. Pinterest is used for art direction; reference-only designs are not copied into app assets. See `image-sources.md` and `pinterest-moodboards.md`. |

## Waitlist and contact behavior

The existing waitlist API stores email only. The new Name, User type, optional Phone, Interest area and consent fields are not sent as unsupported fields or silently discarded. With explicit signup consent, the form registers the email through the existing waitlist endpoint and sends the additional details through the existing contact endpoint. Each result is tracked separately; a retry skips a stage already confirmed successful. Partial failure messages explain what was saved and retain the entered values.

The full form is on `/waitlist`. Shared final CTAs link there, keeping other pages short. Enterprise requests retain supported plan values and pass Sandbox/security-documentation context through existing request fields; billing preference and calculator volume are preserved. No backend schema changes are required.

## Items intentionally awaiting confirmation

- Individual pricing; production plan prices, billing model, allowances, screening/monitoring scope and SLA terms.
- Pilot results, named partners, certifications, press or analyst recognition.
- A confirmed public contact email and response timeframe. Existing forms provide a working contact path; speculative addresses and turnaround promises are omitted.
- Legal entity details, provider relationships (including the proposed SmileID reference), storage inventory and lawyer-reviewed policy text.
- Final app screenshots. Current interface visuals are labelled concepts with example information.

The native-data-fetching skill informed the waitlist's response handling, explicit retry behavior and prevention of duplicate submissions. Existing browser fetch helpers and API contracts were preserved.

## Validation

- Full ESLint and the production build passed; all 59 routes prerendered. Vite retains a non-blocking JavaScript chunk-size warning (701.73 kB before gzip, 207.45 kB gzipped).
- All 59 routes passed at 1440px and 390px (118 checks), with one main heading, no page overflow, no clipped text, no broken content images and no browser errors. Six additional shared-page checks passed at 320px.
- All 22 industry entries and six platform layers were compared with the latest brief. Blog titles, categories, excerpts and openings were checked against all eight supplied articles.
- Waitlist checks cover consent, complete success, either partial failure, both failures, retained field values, trimming and retries that skip successful stages. Contact, enterprise quote context, and support conversation/reply/restore/reset behavior passed mocked checks.
- Directory search and filters, billing selection, plan guidance, calculator arithmetic/reset/zero/large inputs, copied estimates, FAQ category/answer links, blog loading/reading progress/sharing, newsletter opt-in and deletion confirmation passed focused interaction checks.
- Production HTML checks confirm one noindex directive per pending policy, no pending policies in the sitemap (56 indexable routes), and organization article attribution without invented publication dates.
- No live form submissions, deployments, commits or Pinterest account writes were made.
