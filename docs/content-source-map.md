# Ontiver content and imagery alignment

The subsequent pasted division briefs supersede the wording and pricing/legal boundaries documented below. See [content-brief-implementation.md](content-brief-implementation.md) for the current implementation and pending confirmations. The PDF mapping remains historical product-source context.

Current direction: 25 September 2026. The user's requests govern the implementation. The supplied PDFs are product context, not authorization to deploy services, change commercial terms or claim that planned features are live.

## Primary product source

`Ontiver_Industry_Workflows_End_to_End_Documentation.pdf` (September 2026, eight pages) is the primary content reference. Its `(1)` copy has the same SHA-256 hash: `a1f121cc922d1b0a44212de761fd5948846c8feb1216c5a644aed6fd63672b58`.

The public product story now follows its universal journey: enterprise request → user consent → verification → explained signals → enterprise review → approved proof → user-controlled reuse. Ontiver connects approved sources and providers; the requesting organization makes the hiring, credit, admission, activation or access decision.

| Source sections | Website application |
| --- | --- |
| 1–3, 31: positioning, platform layers and universal journey | Both homepages, the seven-step walkthrough, six platform pages and their shared data. |
| 25: enterprise dashboard | Requests, review queue, normalized results, source evidence, audit events, roles, APIs and webhooks in platform and enterprise copy. |
| 26: mobile app | Requester, purpose, deadline, evidence, referee invitations, request status, consent, proof wallet and sharing history on individual pages. |
| 27–28: boundaries and sequencing | Human review, minimum necessary claims, expiry/revocation, agreed provider scope and phased availability. |
| 29–30: market entry and pilot | Lending, HR, logistics, contractors and sellers as priority examples; one scoped workflow and measured pilot outcomes. |

## Industry mapping

All source industry sequences have their own data and route. They do not repeat the former generic five-step story. Each page keeps the relevant claims, enterprise/user journey and decision boundary. The directory offers search and category filters; it does not imply every template or provider is already in production.

| PDF section | Route beneath `/enterprise/use-cases/` |
| --- | --- |
| 4 Financial services and lending | `digital-lenders` |
| 5 Banking and fintech | `fintechs` |
| 6 Recruitment and HR | `hr-platforms` |
| 7 Logistics and delivery | `logistics-delivery` |
| 8 Marketplaces and sellers | `marketplaces` |
| 9 Manufacturing, FMCG and industrial | `manufacturing-industrial` |
| 10 Construction and property services | `construction-property-services` |
| 11 Healthcare workforce | `healthcare-workforce` |
| 12 Education and EdTech | `schools` |
| 13 Insurance | `insurance` |
| 14 Real estate | `real-estate` |
| 15 Travel and hospitality | `travel-hospitality` |
| 16 Telecoms and digital services | `telecoms-digital-services` |
| 17 Crypto and Web3 | `crypto-web3` |
| 18 Government and public programs | `government-public-programs` |
| 19 NGOs and humanitarian aid | `ngos-humanitarian-aid` |
| 20 Agriculture and agribusiness | `agriculture-agribusiness` |
| 21 Energy and utilities | `energy-utilities` |
| 22 B2B vendors and professional services | `b2b-vendors` |
| 23 Security services | `security-services` |
| 24 Creators, freelancers and talent | `creators-talent` |
| 3, 25, 27 Cross-industry review and audit role | `compliance-teams` (existing route retained) |

## Supporting documents and limits

- The 90-Day GTM strategy identifies NIN/BVN as the initial verification focus. Broader workflow templates describe the intended scope to discuss; the site does not convert that roadmap into a claim of live coverage.
- The Launch Route and Memorandum describe a wallet, enterprise console, integrations and readiness dependencies. Existing waitlist/demo actions remain. No backend capability was implemented through this website change.
- The B2C Content Strategy informs plain-language consent and reuse explanations. Its older abbreviated journey is expanded using the newer industry document's request, evidence and review steps. Reuse is limited to supported businesses and valid proofs.
- The older Dtunes PRD supplies product context. It does not override the user's subsequent Trustly design reference, font, colors or specific request for photography and shorter cards.
- Conflicting absolute storage language is avoided: the website describes reduced repeated exposure and scoped access, without promising that no raw document can ever be stored. AI flags are review signals, not findings of fraud.
- Existing pricing, calculator assumptions, legal bodies, form endpoints and article author records are not independently verified by these planning PDFs and were not rewritten as new commitments.

## Image and layout direction

The user's latest correction explicitly requests real Pinterest-discovered photos instead of numerous illustrated interface cards. Photography therefore carries the main layouts: candidate interviews, mobile applications, delivery work, construction, merchants and education. Original licensed files are hosted locally; pin links and original photographer credits are in [image-sources.md](image-sources.md). Subjects illustrate an operational context, not Ontiver customers or a live verification result.

Repeated mini dashboards are removed from heroes, feature grids, industry cards, utility sidebars and CTAs. A limited labelled product concept remains on the security page where the sharing/review record itself needs explanation. Card photos use roughly 160–220px, ordinary hero photos 280–420px and section spacing 40–64px. Necessary copy can expand naturally; shorter cards do not clip text or shrink the shared type scale.

Navigation panels, mobile menu popups and disclosure rows have entrance/exit transitions. Keyboard access, focus management, scroll locking, global animation pause and reduced-motion preferences remain part of the shared behavior.

## Validation

- Full ESLint and production build passed on 25 September 2026; all 59 routes were prerendered. Vite reports a non-blocking JavaScript chunk-size warning (670.20 kB before gzip, 199.03 kB gzipped).
- All 59 routes were checked at 1440px and 390px widths for layout overflow, text clipping, image loading and browser errors. Additional 320px samples passed.
- Navigation checks cover hover, click, keyboard access, mobile focus/scroll locking, close/reopen timing, reduced motion and the global animation pause. Native disclosure animation has a functional fallback in browsers without the relevant CSS support.
- All 21 industry stage sequences were compared with sections 4–24 of the primary PDF. Directory search/filtering, workflow disclosures, pricing controls and the calculator were exercised.
- Seven new photographs total 836,886 bytes. Each was visually inspected; the existing phone portrait is reused intentionally. The final hero, feature and use-case layouts were also reviewed visually on desktop and mobile.
- Forms were verified with mocked requests; no live submissions were sent.
