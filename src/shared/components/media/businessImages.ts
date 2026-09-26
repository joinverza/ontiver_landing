import { imagery, type EditorialImage } from "../../data/imagery";

export const platformImages: Record<string, EditorialImage> = {
  "identity-sources": imagery.mobileApplication,
  "verification-engine": imagery.candidateReview,
  "workflow-engine": imagery.courierOnboarding,
  intelligence: imagery.finance,
  "consent-and-privacy": imagery.mobileApplication,
  "identity-proofs": imagery.mobileApplication,
};

export const workflowImages = [
  imagery.mobileDetail,
  imagery.developer,
  imagery.individualHero,
  imagery.work,
];

const additionalImages: Record<string, EditorialImage> = imagery;

export const industryImages: Record<string, EditorialImage> = {
  "digital-lenders": imagery.finance,
  fintechs: imagery.mobileApplication,
  "hr-platforms": imagery.candidateReview,
  "logistics-delivery": imagery.courierOnboarding,
  marketplaces: imagery.merchantOrders,
  "manufacturing-industrial": imagery.siteWorkers,
  "construction-property-services": imagery.siteWorkers,
  "healthcare-workforce": imagery.healthcareCredentials,
  schools: imagery.studentAdmissions,
  insurance: imagery.finance,
  "real-estate": imagery.candidateReview,
  "travel-hospitality": imagery.mobileApplication,
  "telecoms-digital-services": imagery.mobileApplication,
  "crypto-web3": imagery.developer,
  "government-public-programs": imagery.candidateReview,
  "ngos-humanitarian-aid": imagery.candidateReview,
  "agriculture-agribusiness": additionalImages.farmSupplier ?? imagery.mobileApplication,
  "energy-utilities": imagery.siteWorkers,
  "b2b-vendors": imagery.merchantOrders,
  "security-services": imagery.candidateReview,
  "creators-talent": imagery.developer,
  "compliance-teams": imagery.candidateReview,
};

export function getIndustryImage(id: string) {
  return industryImages[id] ?? imagery.work;
}
