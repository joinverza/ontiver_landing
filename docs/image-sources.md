# Editorial photography

Selected and downloaded on 24 September 2026. These photographs illustrate everyday identity, work, education, and business contexts. The models are not represented as Ontiver customers, partners, employees, or endorsers. No competitor imagery, watermarked previews, paid assets, or generated people are included.

## Discovery and permission

Pinterest was searched for Black and African professionals, people using phones, small business owners, and students, including pins that credit Pexels and PICHA Stock. The following actual pins were opened, their image previews inspected, and their source metadata examined:

- [PICHA Stock / Pexels discovery pin](https://www.pinterest.com/pin/523543525436884156/) resolves to the [group-of-women pin](https://www.pinterest.com/pin/friends-sofa-photos--1079456604412132427/). Its outbound source is [PICHA Stock's original Pexels photograph](https://www.pexels.com/photo/group-of-women-sitting-on-couch-3869651/), used as `teamwork.webp`. The same photographer's related work supplied `work.webp`.
- [Pexels student reference pin](https://www.pinterest.com/pin/850406342134120908/) resolves to [this student photography pin](https://in.pinterest.com/pin/student-photos-download-the-best-free-student-stock-photos-hd-images--111816003238439473/). Its preview informed the natural, people-led educational direction; that pin's image is not included in the app.

Pinterest is a discovery reference, not the source of usage rights. All installed photographs were downloaded from their original Pexels image URLs. The remaining complementary photographs were selected directly from Pexels. The [Pexels license](https://www.pexels.com/license/) permits free website/app use and image modification, without mandatory attribution. It prohibits implying endorsement, offensive portrayals of identifiable people, unaltered resale, redistribution as stock, and trademark use. Attribution is recorded below voluntarily.

## Installed photographs

All files live in `public/assets/photos/`. Original dimensions are from the downloaded originals. Each image retains its source aspect ratio; the site applies `object-fit: cover` with the recommended focal point from `src/data/imagery.ts`. No color grading, compositing, identity alteration, or destructive crop was applied. Processing consists of EXIF orientation normalization, proportional downsampling, metadata removal, and WebP compression at quality 83.

| Local file / use | Photographer and original page | Original → delivered dimensions | Recommended focal point |
| --- | --- | --- | --- |
| `individual-hero.webp` / phone portrait, fintech | [Ono Kosuki — smiling office worker with smartphone](https://www.pexels.com/photo/smiling-ethnic-office-worker-with-smartphone-on-street-5999901/) | 4000 × 6000 → 1200 × 1800 | 50% 35% |
| `enterprise-hero.webp` / technology professional, audit article | [Christina Morillo — software engineer with tablet](https://www.pexels.com/photo/software-engineer-looking-at-an-ipad-1181335/) | 6016 × 4016 → 1600 × 1068 | 70% 45% |
| `teamwork.webp` / collaboration, contact, compliance | [PICHA Stock — group of women sitting on couch](https://www.pexels.com/photo/group-of-women-sitting-on-couch-3869651/) | 4923 × 3282 → 1800 × 1200 | 50% 45% |
| `marketplace.webp` / small business, marketplace | [Amina Filkins — florists reviewing a tablet](https://www.pexels.com/photo/focused-multiracial-women-with-tablet-in-workshop-5410067/) | 3801 × 2686 → 1600 × 1131 | 55% 45% |
| `work.webp` / work and hiring | [PICHA Stock — women looking at a laptop](https://www.pexels.com/photo/women-looking-at-the-laptop-3869650/) | 5472 × 3648 → 1600 × 1067 | 60% 45% |
| `education.webp` / learning and education | [Andrea Piacquadio — woman at a laptop](https://www.pexels.com/photo/happy-ethnic-woman-sitting-at-table-with-laptop-3769021/) | 6100 × 4067 → 1600 × 1067 | 60% 40% |
| `finance.webp` / lending and finance | [fauxels — people discussing charts](https://www.pexels.com/photo/people-discuss-about-graphs-and-rates-3184292/) | 6000 × 3374 → 1600 × 900 | 50% 50% |
| `developer.webp` / developer article | [Christina Morillo — typing on a laptop](https://www.pexels.com/photo/close-up-photo-of-person-typing-on-laptop-1181675/) | 6016 × 4016 → 1600 × 1068 | 50% 50% |

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

| Registry key / local file | Pinterest discovery | Original photographer and source | Original to delivered dimensions | File bytes |
| --- | --- | --- | --- | --- |
| `cityPortrait` / `city-portrait.webp` | [nappy portrait pin](https://www.pinterest.com/pin/248049891963325294/) | [nappy: man beneath an overpass](https://www.pexels.com/photo/man-wearing-black-long-jacket-and-blue-shirt-holding-pocket-936087/) | 6720 x 4480 to 1800 x 1200 | 61,678 |
| `studentLife` / `student-life.webp` | [Zen Chung student pin](https://www.pinterest.com/pin/364087951143828893/) | [Zen Chung: student walking in a garden](https://www.pexels.com/photo/happy-asian-female-student-waling-in-park-5538001/) | 2406 x 3332 to 1400 x 1939 | 340,358 |
| `everydayPhone` / `everyday-phone.webp` | [Andrea Piacquadio phone pin](https://www.pinterest.com/pin/627126316854255459/) | [Andrea Piacquadio: man on a phone beside a laptop](https://www.pexels.com/photo/man-in-blue-sweater-having-a-sweet-conversation-3783229/) | 5760 x 3840 to 1600 x 1067 | 73,372 |
| `smallBusiness` / `small-business.webp` | [Amina Filkins florist pin](https://www.pinterest.com/pin/610941505735323031/) | [Amina Filkins: florists preparing for work](https://www.pexels.com/photo/female-assistant-preparing-for-work-with-florist-5409680/) | 3011 x 4000 to 1400 x 1860 | 464,370 |
| `mobileDetail` / `mobile-detail.webp` | [Tima Miroshnichenko smartphone pin](https://www.pinterest.com/pin/1145181011483399961/) | [Tima Miroshnichenko: hands holding a phone](https://www.pexels.com/photo/a-person-holding-a-smartphone-with-a-blank-screen-6611933/) | 4000 x 6000 to 1200 x 1800 | 39,344 |
| `cityArchitecture` / `city-architecture.webp` | [Mehmet Turgut Kirkgoz architecture pin](https://www.pinterest.com/pin/396809417187438615/) | [Mehmet Turgut Kirkgoz: Zurich streetscape](https://www.pexels.com/photo/facade-of-the-zunfthaus-zur-saffran-in-zurich-switzerland-18744527/) | 3024 x 4032 to 1400 x 1867 | 490,086 |

Pinterest can resolve older discovery URLs to related canonical pins. The resolved pin IDs during this review were `967640669908134758` (city portrait), `18647785947331462` (student), `611011874473590380` (phone), `182606959886661580` (florist), `236861261648299508` (phone detail), and `396809417187438615` (architecture). In every case, the page metadata linked to the original Pexels photograph recorded above. The installed image bytes came from Pexels, never from Pinterest previews.

Original files:

- [City portrait original](https://images.pexels.com/photos/936087/pexels-photo-936087.jpeg)
- [Student life original](https://images.pexels.com/photos/5538001/pexels-photo-5538001.jpeg)
- [Everyday phone original](https://images.pexels.com/photos/3783229/pexels-photo-3783229.jpeg)
- [Small business original](https://images.pexels.com/photos/5409680/pexels-photo-5409680.jpeg)
- [Mobile detail original](https://images.pexels.com/photos/6611933/pexels-photo-6611933.jpeg)
- [City architecture original](https://images.pexels.com/photos/18744527/pexels-photo-18744527.jpeg)

The wide city portrait has room to the left of the subject; the student and florist photographs suit taller tiles; the phone and streetscape images provide visual variety between portraits. The blank phone screen is part of the original photograph. The travel photograph is editorial context and does not assert service availability in Switzerland. None of the photographs represent an Ontiver customer, employee, testimonial, partner, or endorsement.
