# Context-led image refresh

Research and selection date: 18 October 2026.

This refresh assigns photography to the message and action of each section across the individual and enterprise sites. It covers page heroes, use cases, workflow illustrations, navigation previews, pricing helpers and local article fallback images. Dedicated images replace shared assignments where the same photograph served unrelated subjects. Dormant registry entries marked `unused` remain outside the displayed refresh; this is not a claim that every registered asset was replaced.

## Research records

The manifests record each image's consumer context, selection decision, rationale, original publisher page, creator, download URL, literal alt text and focal point:

- [Individual journeys and imagery registry](individual.json)
- [Enterprise platform and industry contexts](enterprise.json)
- [Shared pages, pricing helpers, article fallbacks and legal pages](shared.json)
- [Workflow renewal and expiry](workflow.json)
- [Request-progress panorama](progress.json)
- [Phone sources and institution-issued credentials](identity-sources.json)
- [National identity and employment source records](source-records.json)

Current rendered assignments live in [editorialPhotos.ts](../../src/shared/data/editorialPhotos.ts) and [imagery.ts](../../src/shared/data/imagery.ts). CMS-supplied article content remains controlled by the CMS; the article research here concerns the app's local fallbacks.

## Selection method

1. Read the section's heading, body and intended action, and inspect every consumer of its existing image key.
2. Search for a visible activity or object that supports that context, then check the original publisher page and creator attribution. A search thumbnail or aesthetic resemblance alone is insufficient.
3. Inspect the downloaded image, including any visible interface, branding or document text. Reject mismatched scenes and misleading implications, then choose a focal point that preserves the meaningful subject in the site's image frame.
4. Deliver local, proportionally resized WebP assets with responsive variants and descriptive alt text. The new photographs live in `public/assets/photos/contextual/`; their smaller variants live in `public/assets/photos/responsive/contextual/`. Display crops use the registry's focal point.

African and inclusive subjects were considered where the activity fit equally well. Alt text does not infer nationality, identity status or private characteristics. Technical photographs illustrate a topic; a photographed screen is not represented as an Ontiver interface. People shown are not represented as Ontiver staff, customers, partners or endorsers.

## Examples of contextual changes

| Section                                             | Previous image                         | Selected subject and reason                                                                                                                                                              |
| --------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan guidance: “Find your fit”                      | Developers collaborating at a computer | [Monthly budget worksheet and calculator](https://www.pexels.com/photo/monthly-budget-planning-7054399/) support choosing a plan from expected monthly usage.                            |
| Pricing calculator: “Start with your current costs” | Adviser meeting with clients           | [Calculator over recorded figures](https://www.pexels.com/photo/a-black-calculator-on-the-table-8068819/) supports comparing volumes and per-check costs.                                |
| Individual security controls                        | Cropped phone-and-laptop scene         | [A person carefully reading a document](https://www.pexels.com/photo/woman-working-with-documents-on-laptop-12911671/) supports understanding the request before choosing what to share. |
| Enterprise contact: pilot planning                  | Colleagues looking at a laptop         | [Colleagues mapping ideas on a whiteboard](https://www.pexels.com/photo/two-women-writing-on-the-white-board-1181531/) supports agreeing checks, responsibilities and a pilot workflow.  |
| Terms of Service                                    | An unrelated urban portrait            | [A magnified terms-and-conditions document](https://www.pexels.com/photo/person-holding-a-magnifying-glass-above-a-document-7821573/) directly identifies the document-reading task.     |
| Cookie Policy                                       | A generic phone-use photograph         | An original browser-storage illustration shows the policy's necessary sign-in, support-conversation and preference storage.                                                              |

## Sources and permissions

Photographs were sourced from original [Pexels](https://www.pexels.com/) pages under the [Pexels license](https://www.pexels.com/license/) and original [Unsplash](https://unsplash.com/) pages under the [Unsplash license](https://unsplash.com/license). Both publishers permit free commercial use under their respective terms. Creator and source credits are preserved in the manifests. Pinterest can aid discovery, but a pin does not establish permission to reuse an image.

No paid previews or watermarked thumbnails were selected. Review excluded photographs whose subjects would imply unsupported product functionality or associate an identifiable person with wrongdoing. Imagery is used within the site's editorial and product context, not redistributed as a stock-photo collection.

## Cookie Policy illustration

[browser-storage.svg](../../public/assets/photos/contextual/browser-storage.svg) is an original, code-native illustration using the app's colours. Its three categories come from the actual [Cookie Policy content](../../src/features/shared/legal/data/legalDocuments.ts): secure sign-in for the app and dashboards, returning to an open support conversation, and interface preferences. It is an explanatory diagram, not a screenshot or an additional settings control.

The distinction between cookies and browser storage was checked against MDN's [HTTP cookies guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) and [Web Storage API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API). Food-cookie photographs, unrelated consent screens and advertising-tracking imagery did not fit this policy's stated use of necessary storage.

Earlier selections and provenance remain in [the historical image-source log](../image-sources.md). Use these manifests and the current registries for the October refresh.

## Review adjustments, 19 October

The flagged workflow, individual controls, individual use-cases, AML and onboarding-risk photographs now use complete scenes with people visibly reviewing or coordinating their work. The identity-sources photo also includes the person's face, hands and documents in the actual card and hero crops. The updated source pages, credits and focal points are in the manifests above.

The identity image uses [Anastasia Shuraeva's photograph of a woman taking her own selfie](https://www.pexels.com/photo/woman-holding-cellphone-while-sitting-on-sofa-chair-8748733/). Her face, hand and own phone are visible together, making the self-capture action clear. The photograph illustrates the selfie step without implying a successful identity check. Desktop, mobile and square crops retain both the face and phone.

The marketplace image uses [Kampus Production's photograph of a seller packing a shoe order](https://www.pexels.com/photo/man-in-gray-dress-shirt-holding-black-a-shoes-7289716/). The computer catalogue, parcels and packing activity connect the image to an operating online business. Both wide and smaller card crops preserve the person's head, hands and product.

The enterprise Identity sources module now assigns images to the specific capability: labelled NIN/BVN records, physical SIM cards, a person capturing their face, an issued credential, and an employment record. The [original NIN/BVN illustration](../../public/assets/photos/contextual/source-identity-records.svg) uses masked identifiers and no government marks or verification result. Its source labels follow [NIMC's NIN explanation](https://nimc.gov.ng/nin) and [NIBSS's BVN explanation](https://nibss-plc.com.ng/bank-verification-numberbvn/); it is a conceptual record illustration, not an official ID card or product screenshot.

The journey's “Follow the review” step uses its own [landscape phone-checking photograph](https://www.pexels.com/photo/a-man-lying-on-sofa-while-using-a-smartphone-8933550/). Its composition keeps the full face and phone visible in the wide desktop timeline. On small screens, timeline photos fit inside the frame and move alongside the selected step, with a muted background fill instead of enlarging them across the entire stack of steps.
