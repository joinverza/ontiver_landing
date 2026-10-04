# Editorial photography

Selected and downloaded on 24 September 2026. These photographs illustrate everyday identity, work, education, and business contexts. The models are not represented as Ontiver customers, partners, employees, or endorsers. No competitor imagery, watermarked previews, paid assets, or generated people are included.

## Discovery and permission

Pinterest was searched for Black and African professionals, people using phones, small business owners, and students, including pins that credit Pexels and PICHA Stock. The following actual pins were opened, their image previews inspected, and their source metadata examined:

- [PICHA Stock / Pexels discovery pin](https://www.pinterest.com/pin/523543525436884156/) resolves to the [group-of-women pin](https://www.pinterest.com/pin/friends-sofa-photos--1079456604412132427/). Its outbound source is [PICHA Stock's original Pexels photograph](https://www.pexels.com/photo/group-of-women-sitting-on-couch-3869651/), used as `teamwork.webp`. The same photographer's related work supplied `work.webp`.
- [Pexels student reference pin](https://www.pinterest.com/pin/850406342134120908/) resolves to [this student photography pin](https://in.pinterest.com/pin/student-photos-download-the-best-free-student-stock-photos-hd-images--111816003238439473/). Its preview informed the natural, people-led educational direction; that pin's image is not included in the app.

Pinterest is a discovery reference, not the source of usage rights. All installed photographs were downloaded from their original Pexels image URLs. The remaining complementary photographs were selected directly from Pexels. The [Pexels license](https://www.pexels.com/license/) permits free website/app use and image modification, without mandatory attribution. It prohibits implying endorsement, offensive portrayals of identifiable people, unaltered resale, redistribution as stock, and trademark use. Attribution is recorded below voluntarily.

## Installed photographs

All files live in `public/assets/photos/`. Original dimensions are from the downloaded originals. Each image retains its source aspect ratio; the site applies `object-fit: cover` with the recommended focal point from `src/data/imagery.ts`. No color grading, compositing, identity alteration, or destructive crop was applied. Processing consists of EXIF orientation normalization, proportional downsampling, metadata removal, and WebP compression at quality 83.

| Local file / use                                                | Photographer and original page                                                                                                                     | Original → delivered dimensions | Recommended focal point |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------- |
| `individual-hero.webp` / phone portrait, fintech                | [Ono Kosuki — smiling office worker with smartphone](https://www.pexels.com/photo/smiling-ethnic-office-worker-with-smartphone-on-street-5999901/) | 4000 × 6000 → 1200 × 1800       | 50% 35%                 |
| `enterprise-hero.webp` / technology professional, audit article | [Christina Morillo — software engineer with tablet](https://www.pexels.com/photo/software-engineer-looking-at-an-ipad-1181335/)                    | 6016 × 4016 → 1600 × 1068       | 70% 45%                 |
| `teamwork.webp` / collaboration, contact, compliance            | [PICHA Stock — group of women sitting on couch](https://www.pexels.com/photo/group-of-women-sitting-on-couch-3869651/)                             | 4923 × 3282 → 1800 × 1200       | 50% 45%                 |
| `marketplace.webp` / small business, marketplace                | [Amina Filkins — florists reviewing a tablet](https://www.pexels.com/photo/focused-multiracial-women-with-tablet-in-workshop-5410067/)             | 3801 × 2686 → 1600 × 1131       | 55% 45%                 |
| `work.webp` / work and hiring                                   | [PICHA Stock — women looking at a laptop](https://www.pexels.com/photo/women-looking-at-the-laptop-3869650/)                                       | 5472 × 3648 → 1600 × 1067       | 60% 45%                 |
| `education.webp` / learning and education                       | [Andrea Piacquadio — woman at a laptop](https://www.pexels.com/photo/happy-ethnic-woman-sitting-at-table-with-laptop-3769021/)                     | 6100 × 4067 → 1600 × 1067       | 60% 40%                 |
| `finance.webp` / lending and finance                            | [fauxels — people discussing charts](https://www.pexels.com/photo/people-discuss-about-graphs-and-rates-3184292/)                                  | 6000 × 3374 → 1600 × 900        | 50% 50%                 |
| `developer.webp` / developer article                            | [Christina Morillo — typing on a laptop](https://www.pexels.com/photo/close-up-photo-of-person-typing-on-laptop-1181675/)                          | 6016 × 4016 → 1600 × 1068       | 50% 50%                 |

## Original download URLs

The originals were obtained from these publisher-hosted files. The app serves the optimized local copies and never hotlinks these URLs.

- [Individual hero original](https://images.pexels.com/photos/5999901/pexels-photo-5999901.jpeg)
- [Enterprise hero original](https://images.pexels.com/photos/1181335/pexels-photo-1181335.jpeg)
- [Teamwork original](https://images.pexels.com/photos/3869651/pexels-photo-3869651.jpeg)
- [Marketplace original](https://images.pexels.com/photos/5410067/pexels-photo-5410067.jpeg)
- [Work original](https://images.pexels.com/photos/3869650/pexels-photo-3869650.jpeg)
- [Education original](https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg)
- [Finance original](https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg)
- [Developer original](https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg)

The `imagery` registry supplies the local paths, descriptive alternative text, dimensions, and focal points. `getImageAlt(src)` and `getImagePosition(src)` allow existing image-URL data models to use the same metadata. These editorial illustrations should not be relabeled as actual customer stories or team portraits.

## Photography additions for the editorial layout

Six complementary photographs were selected through Pinterest on 24 September 2026. Each pin below was opened in a browser; its preview and outbound original-source metadata were inspected. The source photographs were then visually checked and downloaded from Pexels, under the same [Pexels license](https://www.pexels.com/license/). Existing photographs and registry keys are preserved. All additions retain their original colors and aspect ratios, with EXIF orientation normalization and WebP quality 83 compression.

| Registry key / local file                     | Pinterest discovery                                                                         | Original photographer and source                                                                                                              | Original to delivered dimensions | File bytes |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `cityPortrait` / `city-portrait.webp`         | [nappy portrait pin](https://www.pinterest.com/pin/248049891963325294/)                     | [nappy: man beneath an overpass](https://www.pexels.com/photo/man-wearing-black-long-jacket-and-blue-shirt-holding-pocket-936087/)            | 6720 x 4480 to 1800 x 1200       | 61,678     |
| `studentLife` / `student-life.webp`           | [Zen Chung student pin](https://www.pinterest.com/pin/364087951143828893/)                  | [Zen Chung: student walking in a garden](https://www.pexels.com/photo/happy-asian-female-student-waling-in-park-5538001/)                     | 2406 x 3332 to 1400 x 1939       | 340,358    |
| `everydayPhone` / `everyday-phone.webp`       | [Andrea Piacquadio phone pin](https://www.pinterest.com/pin/627126316854255459/)            | [Andrea Piacquadio: man on a phone beside a laptop](https://www.pexels.com/photo/man-in-blue-sweater-having-a-sweet-conversation-3783229/)    | 5760 x 3840 to 1600 x 1067       | 73,372     |
| `smallBusiness` / `small-business.webp`       | [Amina Filkins florist pin](https://www.pinterest.com/pin/610941505735323031/)              | [Amina Filkins: florists preparing for work](https://www.pexels.com/photo/female-assistant-preparing-for-work-with-florist-5409680/)          | 3011 x 4000 to 1400 x 1860       | 464,370    |
| `mobileDetail` / `mobile-detail.webp`         | [Tima Miroshnichenko smartphone pin](https://www.pinterest.com/pin/1145181011483399961/)    | [Tima Miroshnichenko: hands holding a phone](https://www.pexels.com/photo/a-person-holding-a-smartphone-with-a-blank-screen-6611933/)         | 4000 x 6000 to 1200 x 1800       | 39,344     |
| `cityArchitecture` / `city-architecture.webp` | [Mehmet Turgut Kirkgoz architecture pin](https://www.pinterest.com/pin/396809417187438615/) | [Mehmet Turgut Kirkgoz: Zurich streetscape](https://www.pexels.com/photo/facade-of-the-zunfthaus-zur-saffran-in-zurich-switzerland-18744527/) | 3024 x 4032 to 1400 x 1867       | 490,086    |

Pinterest can resolve older discovery URLs to related canonical pins. The resolved pin IDs during this review were `967640669908134758` (city portrait), `18647785947331462` (student), `611011874473590380` (phone), `182606959886661580` (florist), `236861261648299508` (phone detail), and `396809417187438615` (architecture). In every case, the page metadata linked to the original Pexels photograph recorded above. The installed image bytes came from Pexels, never from Pinterest previews.

Original files:

- [City portrait original](https://images.pexels.com/photos/936087/pexels-photo-936087.jpeg)
- [Student life original](https://images.pexels.com/photos/5538001/pexels-photo-5538001.jpeg)
- [Everyday phone original](https://images.pexels.com/photos/3783229/pexels-photo-3783229.jpeg)
- [Small business original](https://images.pexels.com/photos/5409680/pexels-photo-5409680.jpeg)
- [Mobile detail original](https://images.pexels.com/photos/6611933/pexels-photo-6611933.jpeg)
- [City architecture original](https://images.pexels.com/photos/18744527/pexels-photo-18744527.jpeg)

The wide city portrait has room to the left of the subject; the student and florist photographs suit taller tiles; the phone and streetscape images provide visual variety between portraits. The blank phone screen is part of the original photograph. The travel photograph is editorial context and does not assert service availability in Switzerland. None of the photographs represent an Ontiver customer, employee, testimonial, partner, or endorsement.

## Workflow-specific photographs - 25 September 2026

The latest selection follows the project documents: hiring and document review, driver onboarding, construction credentials, education, healthcare, and agricultural suppliers. Pinterest discovery pins were opened and their original-source metadata traced to Pexels. Each downloaded original was visually inspected; misleading pin descriptions were not treated as evidence of the image subject. All installed additions are real photographs, downloaded from the publisher and served locally. They illustrate a use case and do not depict an actual Ontiver applicant, customer, verification result, or certified professional.

The [Pexels license](https://www.pexels.com/license/) was checked again on 25 September 2026. These photographs permit free website/app use and modification; attribution is recorded voluntarily. No endorsement by the people pictured is implied. Processing preserves the photograph's colors and full aspect ratio, normalizes EXIF orientation, downsamples proportionally, and compresses to WebP at quality 82. Display crops use the focal points in `src/data/imagery.ts`.

| Registry key / local file                               | Pinterest discovery pin                                                     | Photographer and original source                                                                                                                                      | Original to delivered dimensions | File bytes |
| ------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `candidateReview` / `candidate-review.webp`             | [Document-review pin](https://uk.pinterest.com/pin/346143921363431387/)     | [Christina Morillo: women reviewing documents](https://www.pexels.com/photo/adult-african-american-people-black-women-business-1181605/)                              | 5855 x 3909 to 1600 x 1068       | 79,268     |
| `courierOnboarding` / `courier-onboarding.webp`         | [Delivery-driver pin](https://in.pinterest.com/pin/928586016906245884/)     | [Kampus Production: driver with a phone and parcel](https://www.pexels.com/photo/a-man-sitting-in-the-driver-sear-of-a-van-holding-a-cardboard-box-7843963/)          | 6016 x 4016 to 1600 x 1068       | 91,310     |
| `siteWorkers` / `site-workers.webp`                     | [Construction-worker pin](https://in.pinterest.com/pin/316589048803032303/) | [Life Of Pix: construction worker wearing safety equipment](https://www.pexels.com/photo/construction-worker-safety-danger-8159/)                                     | 5760 x 3840 to 1600 x 1067       | 116,288    |
| `studentAdmissions` / `student-admissions.webp`         | [Teacher and student pin](https://www.pinterest.com/pin/22447698137822018/) | [Polina Tankilevitch: teacher discussing a lesson with a student](https://www.pexels.com/photo/teacher-discussing-her-lesson-with-her-student-6929206/)               | 2000 x 3000 to 1200 x 1800       | 102,082    |
| `healthcareCredentials` / `healthcare-credentials.webp` | [Clinician pin](https://in.pinterest.com/pin/439452876157850188/)           | [Tima Miroshnichenko: clinician reviewing a tablet](https://www.pexels.com/photo/man-in-white-button-up-shirt-holding-black-tablet-computer-5452293/)                 | 3489 x 5233 to 1200 x 1800       | 75,966     |
| `farmSupplier` / `farm-supplier.webp`                   | [Zen Chung harvest pin](https://in.pinterest.com/pin/833588212288741313/)   | [Zen Chung: people harvesting vegetables](https://www.pexels.com/photo/anonymous-local-female-farmers-picking-vegetables-during-harvesting-season-in-garden-5529604/) | 6000 x 4000 to 1600 x 1067       | 282,016    |

The resolved canonical pins were [candidate review](https://www.pinterest.com/pin/first-generation-college-student-wallpaper--593067844659181206/), [courier](https://www.pinterest.com/pin/the-8-best-apps-for-delivery-drivers-to-maximize-efficiency--312226186688809032/), [construction](https://www.pinterest.com/pin/the-importance-of-management-in-the-construction-industry--531284087303024840/), [education](https://in.pinterest.com/pin/photo-by-polina-tankilevitch-on-pexels--22447698137822018/), [healthcare](https://www.pinterest.com/pin/photo-by-tima-miroshnichenko-on-pexels--143552306885666963/), and [vegetable harvesting](https://www.pinterest.com/pin/is-veganic-gardening-worth-it-how-to-get-a-thriving-backyard-without-using-animal-products--93027548548624785/). Canonical pin titles sometimes differ from their actual photographs; the original source and visible image determine the alt text and use.

Original publisher downloads:

- [Candidate review original](https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg)
- [Courier original](https://images.pexels.com/photos/7843963/pexels-photo-7843963.jpeg)
- [Construction original](https://images.pexels.com/photos/8159/pexels-photo.jpg)
- [Education original](https://images.pexels.com/photos/6929206/pexels-photo-6929206.jpeg)
- [Healthcare original](https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg)
- [Vegetable harvest original](https://images.pexels.com/photos/5529604/pexels-photo-5529604.jpeg)

`mobileApplication` intentionally reuses the existing `individual-hero.webp` photograph by Ono Kosuki, credited above. The visible person holding a smartphone fits the mobile application journey without implying that a third-party app is Ontiver. This reuse does not count as a new photograph. A candidate showing Pexels on its phone screen was rejected and its unused local file removed. An unrelated beach photograph returned by another agricultural pin was also rejected and replaced with the verified vegetable-harvest original.

### Complementary merchant photograph

The [Pinterest packing-and-sending-orders pin](https://www.pinterest.com/pin/579345939566283046/) was opened as a workflow reference. It is a packing-tips graphic and does **not** contain the photograph installed below or a verified link to it. To illustrate the same concrete activity with suitable licensed photography, the merchant photograph was selected separately from Pexels. The source distinction is intentional: six new photographs above have direct Pinterest-to-original traces; this seventh photograph has Pinterest subject inspiration and a separately verified original source.

| Registry key / local file                 | Photographer and original source                                                                                                          | Original to delivered dimensions | File bytes |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `merchantOrders` / `merchant-orders.webp` | [Kampus Production: packing online orders at a desk](https://www.pexels.com/photo/woman-sitting-at-the-table-and-packing-orders-7857532/) | 6016 x 4016 to 1600 x 1068       | 89,956     |

The [publisher-hosted original](https://images.pexels.com/photos/7857532/pexels-photo-7857532.jpeg) was downloaded and inspected. It shows a person checking a labeled cardboard parcel against an order sheet, with a laptop and packing tape nearby. The local WebP uses the same processing and Pexels license described above, with focal point `55% 50%`. No Pinterest preview or packing-tips graphic is included in the app.

## Distinct page photography - 29 September 2026

This collection replaces repeated hero photographs and complements the consent, document review, industry, support, and security layouts. Every entry in `src/shared/data/editorialPhotos.ts` has a different Pexels photo ID and a different SHA-256 file hash. These photographs illustrate activities, not actual Ontiver customers, team members, applicants, approvals, or endorsements.

Pinterest was searched again for phone use, professional document review, students, customer support, agriculture, healthcare, hotels, and technical work. Public search pages sometimes required login, so discoverable individual pins were opened directly and their source metadata examined. The following verified links are exact Pinterest-to-original traces:

| New photograph    | Pinterest discovery                                                          | Verified original                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `graduate`        | [Graduation pin](https://in.pinterest.com/pin/467600373825388106/)           | [Pavel Danilyuk: graduating students](https://www.pexels.com/photo/photo-of-graduating-students-sitting-on-folding-chairs-7942500/) |
| `careTeam`        | [Healthcare workspace pin](https://in.pinterest.com/pin/512566001354667600/) | [Doctor having a video call](https://www.pexels.com/photo/a-female-doctor-having-a-video-call-7195447/)                             |
| `hospitalityTeam` | [Hotel-work pin](https://in.pinterest.com/pin/685954586984431525/)           | [Andrea Piacquadio: arranging hotel linen](https://www.pexels.com/photo/hard-working-man-fixing-the-linen-3770291/)                 |

The [professional laptop pin](https://in.pinterest.com/pin/african-american-businesswoman-working-on-a-laptop-in-an-office--776589529482482039/), [document review pin](https://in.pinterest.com/pin/midsection-of-african-american-businesswoman-looking-at-paperwork-standing-in-office--877146464894953685/), [support portrait pin](https://in.pinterest.com/pin/1011339660070076950/), and [solar worker pin](https://in.pinterest.com/pin/868631846860119011/) informed subjects and framing. Their preview photographs were not downloaded into the app. The remaining installed photographs were selected separately from Pexels and checked against their visible subjects. This is Pinterest-led discovery with verified publisher photography; it is not a claim that all 63 images came from exact Pinterest pins.

The [surgeon pin](https://in.pinterest.com/pin/735775657893972387/) was traced to Pexels but rejected because surgery was less relevant than professional credentials and document review. The [green-screen phone pin](https://in.pinterest.com/pin/808536939362030563/) was also rejected. No watermarks, generated people, Pinterest thumbnail downloads, or premium stock previews are installed.

The [Pexels license](https://www.pexels.com/license/) was checked on 29 September 2026. Files are served locally from `public/assets/photos/editorial/`. Publisher downloads use `https://images.pexels.com/photos/{photo ID}/pexels-photo-{photo ID}.jpeg` with proportional 1600-pixel delivery, followed by EXIF orientation normalization, a maximum 1600 by 1800 bounding box, and WebP quality 82 compression. Original aspect ratios and colors are preserved. The dimensions below are actual delivered file dimensions; responsive components control display size using their frame and the registry focal point. Alt text describes what is visible and does not infer private characteristics or verified status.

| Registry key                 | Publisher source                                                                                                                    | Delivered pixels | Focal point | Bytes   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------- | ------- |
| `resources`                  | [Pexels 4050315](https://www.pexels.com/photo/4050315/)                                                                             | 1600 x 1067      | 50% 50%     | 129,676 |
| `enterpriseResources`        | [Pexels 1181371](https://www.pexels.com/photo/1181371/)                                                                             | 1600 x 1068      | 50% 45%     | 94,942  |
| `support`                    | [Pexels 7709246](https://www.pexels.com/photo/7709246/)                                                                             | 1200 x 1800      | 50% 35%     | 148,700 |
| `enterpriseSupport`          | [Pexels 5453838](https://www.pexels.com/photo/5453838/)                                                                             | 1600 x 1067      | 45% 45%     | 58,056  |
| `contact`                    | [Pexels 5356269](https://www.pexels.com/photo/5356269/)                                                                             | 1600 x 1067      | 60% 45%     | 87,120  |
| `security`                   | [Pexels 1181243](https://www.pexels.com/photo/1181243/)                                                                             | 1600 x 1068      | 50% 50%     | 106,784 |
| `enterpriseSecurity`         | [Pexels 4716292](https://www.pexels.com/photo/4716292/)                                                                             | 1600 x 1065      | 50% 50%     | 104,328 |
| `securityControls`           | [Pexels 1181281](https://www.pexels.com/photo/1181281/)                                                                             | 1600 x 1068      | 50% 50%     | 115,628 |
| `enterpriseSecurityControls` | [Pexels 1181467](https://www.pexels.com/photo/1181467/)                                                                             | 1600 x 1068      | 50% 45%     | 99,618  |
| `enterpriseContact`          | [Pexels 3869639](https://www.pexels.com/photo/3869639/)                                                                             | 1200 x 1800      | 50% 15%     | 168,992 |
| `pricing`                    | [Pexels 3184306](https://www.pexels.com/photo/3184306/)                                                                             | 1600 x 1067      | 50% 50%     | 149,592 |
| `legal`                      | [Pexels 8112134](https://www.pexels.com/photo/8112134/)                                                                             | 1600 x 1068      | 60% 45%     | 87,710  |
| `blogIdentity`               | [Pexels 5356289](https://www.pexels.com/photo/5356289/)                                                                             | 1600 x 1067      | 60% 45%     | 67,078  |
| `blogKyc`                    | [Pexels 8441811](https://www.pexels.com/photo/8441811/)                                                                             | 1600 x 1068      | 50% 50%     | 86,242  |
| `blogAml`                    | [Pexels 8730368](https://www.pexels.com/photo/8730368/)                                                                             | 1600 x 1068      | 55% 50%     | 102,484 |
| `blogConsent`                | [Pexels 7731329](https://www.pexels.com/photo/7731329/)                                                                             | 1600 x 1167      | 50% 50%     | 84,432  |
| `blogWebhooks`               | [Pexels 1181263](https://www.pexels.com/photo/1181263/)                                                                             | 1600 x 1068      | 50% 50%     | 87,820  |
| `blogRisk`                   | [Pexels 8292887](https://www.pexels.com/photo/8292887/)                                                                             | 1600 x 1067      | 55% 50%     | 85,750  |
| `blogAudit`                  | [Pexels 8152738](https://www.pexels.com/photo/8152738/)                                                                             | 1600 x 1068      | 50% 50%     | 102,590 |
| `blogMarketplace`            | [Pexels 7857523](https://www.pexels.com/photo/7857523/)                                                                             | 1600 x 1068      | 50% 50%     | 57,960  |
| `planGuidance`               | [Pexels 1181471](https://www.pexels.com/photo/1181471/)                                                                             | 1600 x 1068      | 55% 45%     | 116,232 |
| `pricingCalculator`          | [Pexels 8292854](https://www.pexels.com/photo/8292854/)                                                                             | 1600 x 1067      | 50% 45%     | 74,234  |
| `fintech`                    | [Pexels 5965914](https://www.pexels.com/photo/5965914/)                                                                             | 1600 x 1067      | 50% 45%     | 48,562  |
| `bank`                       | [Pexels 7821671](https://www.pexels.com/photo/7821671/)                                                                             | 1600 x 1067      | 50% 45%     | 62,722  |
| `lending`                    | [Pexels 8292879](https://www.pexels.com/photo/8292879/)                                                                             | 1600 x 1067      | 50% 50%     | 59,940  |
| `insurance`                  | [Pexels 8439655](https://www.pexels.com/photo/8439655/)                                                                             | 1600 x 1068      | 50% 45%     | 75,056  |
| `hospitality`                | [Pexels 7820359](https://www.pexels.com/photo/7820359/)                                                                             | 1600 x 1067      | 50% 50%     | 42,774  |
| `realEstate`                 | [Pexels 7642008](https://www.pexels.com/photo/7642008/)                                                                             | 1600 x 1067      | 50% 45%     | 92,208  |
| `logistics`                  | [Pexels 4480797](https://www.pexels.com/photo/4480797/)                                                                             | 1200 x 1800      | 50% 60%     | 217,174 |
| `ngo`                        | [Pexels 8069564](https://www.pexels.com/photo/8069564/)                                                                             | 1600 x 1067      | 50% 45%     | 164,068 |
| `energy`                     | [Pexels 4254159](https://www.pexels.com/photo/4254159/)                                                                             | 1600 x 1067      | 65% 50%     | 65,930  |
| `healthcare`                 | [Pexels 5452228](https://www.pexels.com/photo/5452228/)                                                                             | 1200 x 1800      | 50% 18%     | 120,026 |
| `education`                  | [Pexels 6140610](https://www.pexels.com/photo/6140610/)                                                                             | 1600 x 1067      | 50% 45%     | 96,154  |
| `hr`                         | [Pexels 1181396](https://www.pexels.com/photo/1181396/)                                                                             | 1600 x 1068      | 50% 50%     | 122,050 |
| `construction`               | [Pexels 10202865](https://www.pexels.com/photo/10202865/)                                                                           | 1600 x 995       | 50% 50%     | 119,710 |
| `marketplace`                | [Pexels 7289732](https://www.pexels.com/photo/7289732/)                                                                             | 1600 x 1067      | 50% 45%     | 120,528 |
| `telecom`                    | [Pexels 442158](https://www.pexels.com/photo/442158/)                                                                               | 1600 x 1067      | 50% 50%     | 107,720 |
| `crypto`                     | [Pexels 1181216](https://www.pexels.com/photo/1181216/)                                                                             | 1600 x 1068      | 50% 50%     | 112,922 |
| `government`                 | [Pexels 7979594](https://www.pexels.com/photo/7979594/)                                                                             | 1600 x 1067      | 50% 45%     | 86,328  |
| `vendors`                    | [Pexels 7674983](https://www.pexels.com/photo/7674983/)                                                                             | 1600 x 1068      | 50% 45%     | 151,450 |
| `securityServices`           | [Pexels 8285775](https://www.pexels.com/photo/8285775/)                                                                             | 1440 x 1800      | 50% 45%     | 139,818 |
| `creators`                   | [Pexels 24286930](https://www.pexels.com/photo/24286930/)                                                                           | 1600 x 1067      | 60% 45%     | 80,130  |
| `compliance`                 | [Pexels 8872393](https://www.pexels.com/photo/8872393/)                                                                             | 1600 x 1067      | 50% 45%     | 123,422 |
| `agriculture`                | [Pexels 11588042](https://www.pexels.com/photo/11588042/)                                                                           | 1600 x 1067      | 50% 50%     | 369,000 |
| `personalPhone`              | [Pexels 5965887](https://www.pexels.com/photo/5965887/)                                                                             | 1600 x 1067      | 100% 50%    | 89,790  |
| `personalLaptop`             | [Pexels 5999817](https://www.pexels.com/photo/5999817/)                                                                             | 1200 x 1800      | 50% 40%     | 128,810 |
| `graduate`                   | [Pexels 7942500](https://www.pexels.com/photo/7942500/)                                                                             | 1600 x 1068      | 50% 50%     | 141,148 |
| `careTeam`                   | [Pexels 7195447](https://www.pexels.com/photo/7195447/)                                                                             | 1600 x 1067      | 50% 45%     | 37,996  |
| `hospitalityTeam`            | [Pexels 3770291](https://www.pexels.com/photo/3770291/)                                                                             | 1600 x 1067      | 50% 45%     | 54,308  |
| `manufacturing`              | [Pexels 1087083](https://www.pexels.com/photo/1087083/)                                                                             | 1600 x 1067      | 50% 50%     | 178,244 |
| `identitySources`            | [Pexels 5668830](https://www.pexels.com/photo/focused-diverse-colleagues-checking-documents-in-office-5668830/)                     | 1600 x 1067      | 50% 42%     | 70,496  |
| `verification`               | [Pexels 8847134](https://www.pexels.com/photo/colleagues-looking-at-documents-8847134/)                                             | 1600 x 1067      | 50% 42%     | 83,990  |
| `workflow`                   | [Pexels 9431442](https://www.pexels.com/photo/black-people-colleagues-discussing-blueprint-at-whiteboard-9431442/)                  | 1200 x 1800      | 50% 32%     | 112,146 |
| `intelligence`               | [Pexels 9034293](https://www.pexels.com/photo/woman-in-white-long-sleeve-shirt-and-black-pants-standing-beside-whiteboard-9034293/) | 1600 x 1067      | 65% 42%     | 73,440  |
| `consent`                    | [Pexels 3931643](https://www.pexels.com/photo/young-black-woman-showing-smartphone-to-boss-3931643/)                                | 1600 x 1067      | 48% 45%     | 75,712  |
| `proof`                      | [Pexels 7731400](https://www.pexels.com/photo/a-person-in-black-blazer-pointing-the-document-on-the-clipboard-7731400/)             | 1600 x 1601      | 50% 44%     | 88,268  |
| `platformOverview`           | [Pexels 7433894](https://www.pexels.com/photo/a-man-in-black-suit-jacket-writing-on-the-white-board-7433894/)                       | 1600 x 1067      | 52% 40%     | 65,714  |
| `identity`                   | [Pexels 6140931](https://www.pexels.com/photo/serious-young-black-man-browsing-smartphone-on-street-6140931/)                       | 1600 x 1067      | 60% 45%     | 90,288  |
| `howItWorks`                 | [Pexels 6238059](https://www.pexels.com/photo/black-woman-taking-selfie-on-smartphone-during-studies-6238059/)                      | 1200 x 1800      | 55% 42%     | 92,452  |
| `individualUseCases`         | [Pexels 5965930](https://www.pexels.com/photo/black-student-listening-to-music-using-smartphone-in-park-5965930/)                   | 1600 x 1067      | 64% 45%     | 104,576 |
| `waitlist`                   | [Pexels 6000080](https://www.pexels.com/photo/delighted-black-businesswoman-speaking-via-smartphone-in-city-street-6000080/)        | 1600 x 1067      | 49% 40%     | 80,512  |
| `industryOverview`           | [Pexels 9301864](https://www.pexels.com/photo/colleagues-looking-at-a-document-9301864/)                                            | 1200 x 1800      | 50% 40%     | 146,140 |
| `enterpriseHome`             | [Pexels 5257576](https://www.pexels.com/photo/colleagues-planning-a-business-5257576/)                                              | 1600 x 1067      | 50% 45%     | 79,154  |

Source IDs and file hashes were checked for duplicates across all 63 additions. Total delivered size is 6,586,844 bytes across the collection; individual pages load only the images they render. Article thumbnails may identify their corresponding article across navigation contexts, while page hero assignments are distinct.

## Addition (4 October 2026)

| Key / file | Photographer and original page | Delivered | Focal point |
| --- | --- | --- | --- |
| `sharingHistory` / `editorial/sharingHistory.webp` — "Every share has a record" workflow card | [Ketut Subiyanto — serious woman using smartphone](https://www.pexels.com/photo/serious-woman-using-smartphone-4353614/) | 1600 x 2400 → 1200 x 1800, WebP q83, metadata removed | 50% 30% |

Replaces the reuse of `education.webp` (a woman studying at a laptop) on the sharing-history card, where the subject did not match the content. Downloaded from the original Pexels image URL under the [Pexels license](https://www.pexels.com/license/).
