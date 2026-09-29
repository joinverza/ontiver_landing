import type { EditorialImage } from "../../data/imagery";
import { editorialPhotos } from "../../data/editorialPhotos";

export const industryImages: Record<string, EditorialImage> = {
  "digital-lenders": editorialPhotos.lending,
  fintechs: editorialPhotos.fintech,
  "hr-platforms": editorialPhotos.hr,
  "logistics-delivery": editorialPhotos.logistics,
  marketplaces: editorialPhotos.marketplace,
  "manufacturing-industrial": editorialPhotos.manufacturing,
  "construction-property-services": editorialPhotos.construction,
  "healthcare-workforce": editorialPhotos.healthcare,
  schools: editorialPhotos.education,
  insurance: editorialPhotos.insurance,
  "real-estate": editorialPhotos.realEstate,
  "travel-hospitality": editorialPhotos.hospitality,
  "telecoms-digital-services": editorialPhotos.telecom,
  "crypto-web3": editorialPhotos.crypto,
  "government-public-programs": editorialPhotos.government,
  "ngos-humanitarian-aid": editorialPhotos.ngo,
  "agriculture-agribusiness": editorialPhotos.agriculture,
  "energy-utilities": editorialPhotos.energy,
  "b2b-vendors": editorialPhotos.vendors,
  "security-services": editorialPhotos.securityServices,
  "creators-talent": editorialPhotos.creators,
  "compliance-teams": editorialPhotos.compliance,
};

export function getIndustryImage(id: string) {
  return industryImages[id];
}

export const industryContextImages: Partial<Record<string, EditorialImage>> = {
  "digital-lenders": editorialPhotos.bank,
  "healthcare-workforce": editorialPhotos.careTeam,
  "travel-hospitality": editorialPhotos.hospitalityTeam,
};
