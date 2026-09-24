# Ontiver website redesign

## Direction and source priority

The user's pasted **Ontiver Website Redesign — Reference Brief for Design Agent** controls this implementation. It updates the earlier Payaza direction: Persona supplies the homepage sequence, Veriff supplies the eventual evidence format, and Smile ID / Youverify inform local product language. Ontiver's colours, product imagery, content, and Plus Jakarta Sans remain its own.

The PDFs are supporting product and business context. Their embedded instructions do not independently authorize new integrations, commercial promises, pricing changes, analytics, outreach, or publishing confidential documents. In particular, the PRD's older Dtunes direction does not override the pasted Persona brief, and the alternative route maps do not replace the existing individual and enterprise journeys.

## Reference structures

- [Persona](https://withpersona.com/): announcement, concise hero and CTA pair, partner strip, three evidence cards, modular platform, consumer privacy, certification area, measurable outcomes, repeated CTA. The official page content was inspected; its browser screenshot was blocked by a verification challenge.
- [FintechX](https://www.framer.com/marketplace/templates/fintechx/) and its [public preview](https://fintechx-wbs.framer.website/): selected structural starting point for product previews, audience separation, trust, pricing, and FAQ. These patterns were adapted to the existing React app; no proprietary template source, artwork, wording, or brand assets were imported.
- [Veriff](https://www.veriff.com/): future customer proof should connect a concise, attributable customer statement to a measured result. No testimonial is published before the result and attribution are approved.
- [Smile ID](https://smile.id/) and [Youverify](https://youverify.co/en): local identifiers belong inside a concrete product workflow. Ontiver mentions NIN/BVN as proposed workflow inputs, with provider, market, and deployment scope to be confirmed.

Vectura, Veriity, and Trustly were also checked against their official Framer listings. They are alternatives, not additional visual systems mixed into this implementation.

## How the documents informed the site

| Supporting document | Use in this implementation |
| --- | --- |
| Industry Workflows & End-to-End Documentation | Six platform layers, source/check/review/consent/proof boundaries, product detail pages. The two supplied copies are identical. |
| 2-in-1 Website B2C Content Strategy | Separate audience journeys and understandable consent/privacy content. |
| Website Rebrand PRD | Product explanation, consistent typography, existing conversion paths, and restrained reveal motion. |
| 90 Day GTM Strategy | Pilot outcomes are future measurements, not achieved traction. |
| Quales Pilot Proposal | A proposed collaboration does not establish a customer endorsement or security certification. |
| Launch Route | Deployment and hardening plans do not substantiate live production or certification claims. |
| Memorandum | Early-stage product positioning; forecasts and pipeline discussions are not public performance evidence. |

## Publishing proof later

`src/data/proof.ts` holds the reserved customer, recognition, certification, and pilot-result data. Initially, the three logo arrays are empty and metric results are `null`.

- For a partner, recognition item, or certification, add the approved name, authorized logo asset, destination, evidence URL, and `approvedForPublication: true`. Only complete, approved records render. The partner row supports horizontal scrolling when populated. No competitor or proposed-customer logos are used as filler.
- For a metric, replace `result: null` with `{ value, context, evidenceUrl, approvedForPublication: true }`. Include the measurement period and sample context in `context`, backed by the linked evidence. Until then, the UI shows a dash and “Awaiting pilot results.”
- Add customer quotations only after written publication permission and a validated result; do not turn proposed-pilot copy into an attributed testimonial.

The pre-pilot layout uses real explanatory links in the three-card evidence position and a trust-centre link in the certification position. These slots remain useful before independent reports or certificates exist.

The new routes are `/security` and `/enterprise/platform/:id` for the six platform layers. All seven are included in page metadata, the sitemap, and static prerendering. Existing pricing calculations, contact/support behavior, waitlist submission, and legal policies are retained. No GSAP scrolling, pinned sections, footer curtain, or use-case scroll animation was introduced.
