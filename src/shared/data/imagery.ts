export type EditorialImage = {
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
};

export const imagery = {
  individualHero: {
    src: "/assets/photos/contextual/journey-individualHero-6000094.webp",
    alt: "A woman seated on a city bench reading her smartphone.",
    objectPosition: "47% 45%",
    width: 1600,
    height: 1067,
  },
  enterpriseHero: {
    src: "/assets/photos/contextual/journey-enterpriseHero-5673481.webp",
    alt: "Three professionals discussing papers, a laptop, and a tablet around a desk.",
    objectPosition: "50% 50%",
    width: 1600,
    height: 1067,
  },
  teamwork: {
    src: "/assets/photos/teamwork.webp",
    alt: "Five colleagues with laptops seated together in a bright office lounge",
    objectPosition: "50% 45%",
    width: 1800,
    height: 1200,
  },
  marketplace: {
    src: "/assets/photos/contextual/journey-marketplace-7552726.webp",
    alt: "A woman working on a laptop beside parcels on her desk.",
    objectPosition: "55% 50%",
    width: 1600,
    height: 1067,
  },
  work: {
    src: "/assets/photos/contextual/journey-work-6457511.webp",
    alt: "A woman reviewing paper documents beside an open laptop.",
    objectPosition: "50% 42%",
    width: 1200,
    height: 1800,
  },
  education: {
    src: "/assets/photos/contextual/journey-education-8199766.webp",
    alt: "A woman reading a book beside library shelves.",
    objectPosition: "58% 45%",
    width: 1600,
    height: 1067,
  },
  finance: {
    src: "/assets/photos/contextual/journey-finance-7821513.webp",
    alt: "Hands filling in a consumer loan application form on a wooden table.",
    objectPosition: "50% 45%",
    width: 1600,
    height: 1067,
  },
  developer: {
    src: "/assets/photos/contextual/journey-developer-7988087.webp",
    alt: "A developer working at a laptop and an external monitor displaying code.",
    objectPosition: "59% 48%",
    width: 1600,
    height: 1068,
  },
  cityPortrait: {
    src: "/assets/photos/contextual/journey-cityPortrait-4560083.webp",
    alt: "A smiling student holding application papers with an open laptop outdoors.",
    objectPosition: "48% 50%",
    width: 1600,
    height: 1067,
  },
  studentLife: {
    src: "/assets/photos/student-life.webp",
    alt: "A smiling student carrying books and a laptop through a green garden",
    objectPosition: "50% 35%",
    width: 1400,
    height: 1939,
  },
  everydayPhone: {
    src: "/assets/photos/contextual/journey-everydayPhone-9051678.webp",
    alt: "A woman looking down at her smartphone while leaning on an indoor counter.",
    objectPosition: "50% 50%",
    width: 1200,
    height: 1800,
  },
  smallBusiness: {
    src: "/assets/photos/contextual/journey-smallBusiness-7289725.webp",
    alt: "A small-business owner preparing an order beside a laptop and stacked boxes.",
    objectPosition: "50% 45%",
    width: 1600,
    height: 1067,
  },
  mobileDetail: {
    src: "/assets/photos/contextual/journey-mobileDetail-6969614.webp",
    alt: "A woman seated by a window using a smartphone while holding a payment card.",
    objectPosition: "50% 48%",
    width: 1200,
    height: 1800,
  },
  cityArchitecture: {
    src: "/assets/photos/city-architecture.webp",
    alt: "Historic buildings and a tram-lined street in Zurich",
    objectPosition: "50% 45%",
    width: 1400,
    height: 1867,
  },
  candidateReview: {
    src: "/assets/photos/contextual/journey-candidateReview-5439376.webp",
    alt: "An interviewer reviewing a document across a desk from a candidate.",
    objectPosition: "52% 45%",
    width: 1600,
    height: 1067,
  },
  courierOnboarding: {
    src: "/assets/photos/contextual/journey-courierOnboarding-5025654.webp",
    alt: "A delivery driver writing on a clipboard inside a van with a parcel beside him.",
    objectPosition: "50% 50%",
    width: 1600,
    height: 900,
  },
  studentAdmissions: {
    src: "/assets/photos/contextual/journey-studentAdmissions-7973208.webp",
    alt: "Students comparing paper documents outside a university building.",
    objectPosition: "50% 48%",
    width: 1200,
    height: 1800,
  },
  healthcareCredentials: {
    src: "/assets/photos/healthcare-credentials.webp",
    alt: "A clinician in a white coat reviewing information on a tablet",
    objectPosition: "50% 40%",
    width: 1200,
    height: 1800,
  },
  farmSupplier: {
    src: "/assets/photos/farm-supplier.webp",
    alt: "Two people harvesting ripe tomatoes together on a vegetable farm",
    objectPosition: "50% 45%",
    width: 1600,
    height: 1067,
  },
  siteWorkers: {
    src: "/assets/photos/site-workers.webp",
    alt: "A construction worker wearing a hard hat and safety harness on a work platform",
    objectPosition: "55% 45%",
    width: 1600,
    height: 1067,
  },
  merchantOrders: {
    src: "/assets/photos/contextual/journey-merchantOrders-6169033.webp",
    alt: "A woman comparing a parcel with a clipboard beside a desktop computer.",
    objectPosition: "50% 50%",
    width: 1600,
    height: 1067,
  },
} satisfies Record<string, EditorialImage>;

export function getImageAlt(src: string) {
  return Object.values(imagery).find((image) => image.src === src)?.alt ?? "";
}

export function getImagePosition(src: string) {
  return Object.values(imagery).find((image) => image.src === src)?.objectPosition ?? "50% 50%";
}
