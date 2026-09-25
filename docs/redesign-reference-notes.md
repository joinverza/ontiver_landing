# Ontiver website redesign

## Current visual update

The latest content correction follows the supplied industry workflow document and the user's request for relevant Pinterest photography, fewer interface cards, shorter sections and animated dropdowns/popups. See [content-source-map.md](content-source-map.md) for the current product mapping. The visual history below remains context for the retained Trustly layout direction.

The latest user request makes the live [Trustly business website](https://www.trustly.com/?r=0) and [Trustly personal website](https://www.trustly.com/personal) the visual references. This supersedes the preceding Payaza visual pass and the earlier Persona section-order direction. Ontiver retains its own content, palette, platform routes, pre-pilot proof handling, consent messaging, and the selected [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) font.

The current design adapts Trustly's white navigation, large editorial introductions, photo mosaics, asymmetric feature tiles, alternating photo/text sections, compact workflows, utility forms, document layouts, and photographic CTAs. Ontiver uses its own licensed photography and copy, with no Trustly brand assets, customer logos, commercial claims or certifications. The 14-photo library includes six new Pinterest-discovered originals. Current page coverage, typography, observed motion versus adaptations, and the 43-route mapping are documented in [trustly-redesign-reference.md](trustly-redesign-reference.md).

The navigation, typography and motion notes below record previous implementation passes where they differ from that current reference. They remain as historical context; the original source-priority and publishing-proof requirements continue to apply. The live Trustly website is separate from the similarly named Framer template mentioned in the earlier research.

## Previous pass: navigation, scrolling, and concise content

The preceding navigation pass used Payaza's grouped icon links, short descriptions, photo panel, and footer CTA pattern. The current Trustly pass replaces that composition as documented above. Each parent label remains a page link; its adjacent disclosure button opens the group. Desktop supports hover, click, keyboard navigation, Escape, and outside-click dismissal. Mobile uses an expandable menu inside the existing native modal dialog.

Ten dedicated destinations were added: `/identity`, `/how-it-works`, `/use-cases`, `/waitlist`, `/resources`, `/enterprise/platform`, `/enterprise/use-cases`, `/enterprise/resources`, `/enterprise/security`, and `/enterprise/support`. All 43 canonical routes have metadata and static prerender coverage. The shared waitlist form preserves the existing endpoint and validation on both the homepage and `/waitlist`.

Smooth scrolling follows the sibling Quickbite implementation: Lenis uses `lerp: 0.085`, `wheelMultiplier: 0.58`, native touch scrolling, bounded wheel deltas, a single animation loop capped at 33.3 ms per frame, and 0.9-second anchor navigation. Reduced-motion preferences disable Lenis. Menus and support conversations retain native internal scrolling; page scrolling stops while the mobile dialog is open. Route changes and anchor navigation share one scroll controller. No GSAP movement, pinning, or footer curtain is involved.

Supporting sections use short introductions, compact cards, and initially collapsed FAQs. Repeated platform, security, and support explanations were removed. Existing hero and use-case copy, long-form articles, legal policies, pricing calculations, and form behavior are retained. Empty recognition and certification areas stay hidden until approved evidence is supplied; the three pending pilot metrics remain visible.

Bricolage Grotesque is self-hosted with its OFL license. Shared text sizes are now 52–88px for page titles, 40–64px for section headings, 24–26px for card titles, 18–20px for subtitles, 18px for body text, and 14px for metadata; buttons and secondary labels use 16px. All pages use the same responsive tokens.

Pinterest research informed the photo selection. Eight optimized images are hosted locally, with their original sources and credits recorded in [image-sources.md](image-sources.md). These replace the abstract imagery in the home, industry, and resource views. Code-native Ontiver identity previews illustrate the product alongside the photography.

## Direction and source priority

The user's earlier pasted **Ontiver Website Redesign — Reference Brief for Design Agent** established the platform and evidence structure. At that stage, Persona supplied the homepage sequence, Veriff supplied the eventual evidence format, and Smile ID / Youverify informed local product language. Its evidence requirements remain in place; the visual update above now controls the layout and font.

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

Recognition cards and certification strips render only when approved records exist. The pre-pilot layout keeps the pilot invitation and pending metric slots.

The earlier `/security` and six `/enterprise/platform/:id` routes remain included in page metadata, the sitemap, and static prerendering alongside the new destinations above. Existing pricing calculations, contact/support behavior, waitlist submission, and legal policies are retained. No GSAP scrolling, pinned sections, footer curtain, or use-case scroll animation was introduced.
