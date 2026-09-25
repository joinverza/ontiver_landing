export type EditorialImage = {
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
};

export const imagery = {
  individualHero: { src: "/assets/photos/individual-hero.webp", alt: "A smiling woman in a headscarf holding her smartphone outdoors", objectPosition: "50% 35%", width: 1200, height: 1800 },
  enterpriseHero: { src: "/assets/photos/enterprise-hero.webp", alt: "A technology professional reviewing a tablet beside server racks", objectPosition: "70% 45%", width: 1600, height: 1068 },
  teamwork: { src: "/assets/photos/teamwork.webp", alt: "Five colleagues with laptops seated together in a bright office lounge", objectPosition: "50% 45%", width: 1800, height: 1200 },
  marketplace: { src: "/assets/photos/marketplace.webp", alt: "Two florists reviewing a tablet together in their shop", objectPosition: "55% 45%", width: 1600, height: 1131 },
  work: { src: "/assets/photos/work.webp", alt: "Two colleagues reviewing work together on a laptop", objectPosition: "60% 45%", width: 1600, height: 1067 },
  education: { src: "/assets/photos/education.webp", alt: "A smiling woman with glasses studying at a laptop", objectPosition: "60% 40%", width: 1600, height: 1067 },
  finance: { src: "/assets/photos/finance.webp", alt: "Colleagues reviewing charts and financial information around a table", objectPosition: "50% 50%", width: 1600, height: 900 },
  developer: { src: "/assets/photos/developer.webp", alt: "A developer typing on a laptop beside monitors showing code", objectPosition: "50% 50%", width: 1600, height: 1068 },
  cityPortrait: { src: "/assets/photos/city-portrait.webp", alt: "A man in a dark coat standing beneath a sculptural concrete overpass", objectPosition: "68% 45%", width: 1800, height: 1200 },
  studentLife: { src: "/assets/photos/student-life.webp", alt: "A smiling student carrying books and a laptop through a green garden", objectPosition: "50% 35%", width: 1400, height: 1939 },
  everydayPhone: { src: "/assets/photos/everyday-phone.webp", alt: "A smiling older man talking on his phone beside a laptop outdoors", objectPosition: "44% 40%", width: 1600, height: 1067 },
  smallBusiness: { src: "/assets/photos/small-business.webp", alt: "Two florists preparing for work in a flower-filled shop", objectPosition: "45% 40%", width: 1400, height: 1860 },
  mobileDetail: { src: "/assets/photos/mobile-detail.webp", alt: "Hands holding a smartphone with a blank screen", objectPosition: "50% 55%", width: 1200, height: 1800 },
  cityArchitecture: { src: "/assets/photos/city-architecture.webp", alt: "Historic buildings and a tram-lined street in Zurich", objectPosition: "50% 45%", width: 1400, height: 1867 },
  candidateReview: { src: "/assets/photos/candidate-review.webp", alt: "Two women reviewing documents together across an office table", objectPosition: "50% 45%", width: 1600, height: 1068 },
  courierOnboarding: { src: "/assets/photos/courier-onboarding.webp", alt: "A delivery driver checking a phone while reaching for a parcel in his van", objectPosition: "60% 50%", width: 1600, height: 1068 },
  studentAdmissions: { src: "/assets/photos/student-admissions.webp", alt: "A teacher and student reviewing open books and papers at a desk", objectPosition: "50% 45%", width: 1200, height: 1800 },
  healthcareCredentials: { src: "/assets/photos/healthcare-credentials.webp", alt: "A clinician in a white coat reviewing information on a tablet", objectPosition: "50% 40%", width: 1200, height: 1800 },
  farmSupplier: { src: "/assets/photos/farm-supplier.webp", alt: "Two people harvesting ripe tomatoes together on a vegetable farm", objectPosition: "50% 45%", width: 1600, height: 1067 },
  siteWorkers: { src: "/assets/photos/site-workers.webp", alt: "A construction worker wearing a hard hat and safety harness on a work platform", objectPosition: "55% 45%", width: 1600, height: 1067 },
  // This licensed phone portrait also illustrates the mobile application journey.
  mobileApplication: { src: "/assets/photos/individual-hero.webp", alt: "A smiling woman in a headscarf holding her smartphone outdoors", objectPosition: "50% 35%", width: 1200, height: 1800 },
  merchantOrders: { src: "/assets/photos/merchant-orders.webp", alt: "A small business owner checking a parcel against an order sheet beside a laptop", objectPosition: "55% 50%", width: 1600, height: 1068 },
} satisfies Record<string, EditorialImage>;

export function getImageAlt(src: string) {
  return Object.values(imagery).find((image) => image.src === src)?.alt ?? "";
}

export function getImagePosition(src: string) {
  return Object.values(imagery).find((image) => image.src === src)?.objectPosition ?? "50% 50%";
}
