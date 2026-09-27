import { imagery, type EditorialImage } from "../../data/imagery";

export const workflowImages = [
  imagery.mobileDetail,
  imagery.developer,
  imagery.individualHero,
  imagery.work,
];

export const industryImages: Record<string, EditorialImage> = {
  "digital-lenders": imagery.finance,
  fintechs: imagery.marketplace,
  "hr-platforms": imagery.candidateReview,
  "logistics-delivery": imagery.courierOnboarding,
  marketplaces: imagery.merchantOrders,
  "manufacturing-industrial": imagery.work,
  "construction-property-services": imagery.siteWorkers,
  "healthcare-workforce": imagery.healthcareCredentials,
  schools: imagery.studentAdmissions,
  insurance: imagery.education,
  "real-estate": imagery.cityArchitecture,
  "travel-hospitality": imagery.cityPortrait,
  "telecoms-digital-services": imagery.mobileDetail,
  "crypto-web3": imagery.developer,
  "ngos-humanitarian-aid": imagery.teamwork,
  "agriculture-agribusiness": imagery.farmSupplier,
  "energy-utilities": imagery.everydayPhone,
  "b2b-vendors": imagery.smallBusiness,
  "creators-talent": imagery.studentLife,
};

export function getIndustryImage(id: string) {
  return industryImages[id] ?? imagery.work;
}
