import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Fingerprint,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Layers3,
  LifeBuoy,
  ListChecks,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  ShoppingBag,
  WalletCards,
  type OntiverIcon,
} from "../components/ui/icons";
import { platformLayers } from "../../features/enterprise/platform/data/platform";
import { editorialPhotos } from "./editorialPhotos";
import type { EditorialImage } from "./imagery";

export type NavLink = {
  name: string;
  to: string;
  description: string;
  icon?: OntiverIcon;
  external?: boolean;
};

export type NavItem = NavLink & { children?: NavLink[] };

export const isNavigationLinkActive = (item: NavLink, pathname: string) =>
  !item.external && (pathname === item.to || pathname.startsWith(`${item.to}/`));

export const getActiveNavigationItem = (items: NavItem[], pathname: string) =>
  items.find((item) => isNavigationLinkActive(item, pathname)) ??
  items.find((item) => item.children?.some((child) => isNavigationLinkActive(child, pathname)));

export const navigationImages: Record<string, EditorialImage> = {
  "/identity": editorialPhotos.identity,
  "/how-it-works": editorialPhotos.howItWorks,
  "/use-cases": editorialPhotos.individualUseCases,
  "/security": editorialPhotos.security,
  "/resources": editorialPhotos.resources,
  "/blogs": editorialPhotos.blogIdentity,
  "/privacy": editorialPhotos.legal,
  "/support": editorialPhotos.support,
  "/contact": editorialPhotos.contact,
  "/enterprise/platform": editorialPhotos.platformOverview,
  "/enterprise/platform/identity-sources": editorialPhotos.identitySources,
  "/enterprise/platform/verification-engine": editorialPhotos.verification,
  "/enterprise/platform/workflow-engine": editorialPhotos.workflow,
  "/enterprise/platform/intelligence": editorialPhotos.intelligence,
  "/enterprise/platform/consent-and-privacy": editorialPhotos.consent,
  "/enterprise/platform/identity-proofs": editorialPhotos.proof,
  "/enterprise/use-cases": editorialPhotos.industryOverview,
  "/enterprise/use-cases/fintechs": editorialPhotos.fintech,
  "/enterprise/use-cases/digital-lenders": editorialPhotos.lending,
  "/enterprise/use-cases/marketplaces": editorialPhotos.marketplace,
  "/enterprise/use-cases/hr-platforms": editorialPhotos.hr,
  "/enterprise/use-cases/logistics-delivery": editorialPhotos.logistics,
  "/enterprise/use-cases/schools": editorialPhotos.education,
  "/enterprise/use-cases/compliance-teams": editorialPhotos.compliance,
  "/enterprise/resources": editorialPhotos.enterpriseResources,
  "/enterprise/security": editorialPhotos.enterpriseSecurity,
  "/enterprise/support": editorialPhotos.enterpriseSupport,
  "/enterprise/contact": editorialPhotos.enterpriseContact,
  "https://docs.ontiver.com/": editorialPhotos.blogWebhooks,
};

export const individualNavLinks: NavItem[] = [
  {
    name: "Product",
    to: "/identity",
    description: "Your identity, on your terms.",
    children: [
      {
        name: "Your identity",
        to: "/identity",
        description: "Proof that stays with you.",
        icon: Fingerprint,
      },
      {
        name: "How it works",
        to: "/how-it-works",
        description: "From verification to sharing.",
        icon: ListChecks,
      },
      {
        name: "Where it helps",
        to: "/use-cases",
        description: "Trust in everyday life.",
        icon: WalletCards,
      },
      {
        name: "Privacy & control",
        to: "/security",
        description: "You make the sharing decision.",
        icon: ShieldCheck,
      },
    ],
  },
  { name: "How it works", to: "/how-it-works", description: "Your verification journey." },
  {
    name: "Resources",
    to: "/resources",
    description: "A little clarity goes a long way.",
    children: [
      {
        name: "Explore resources",
        to: "/resources",
        description: "Guides and helpful links.",
        icon: Layers3,
      },
      {
        name: "The Ontiver journal",
        to: "/blogs",
        description: "Ideas on identity and trust.",
        icon: BookOpen,
      },
      {
        name: "Privacy Policy",
        to: "/privacy",
        description: "How your information is handled.",
        icon: LockKeyhole,
      },
    ],
  },
  {
    name: "Support",
    to: "/support",
    description: "Talk to the Ontiver team.",
    children: [
      {
        name: "Support centre",
        to: "/support",
        description: "Start or continue a conversation.",
        icon: LifeBuoy,
      },
      {
        name: "Contact us",
        to: "/contact",
        description: "Questions, ideas, and feedback.",
        icon: MessagesSquare,
      },
    ],
  },
];

export const enterpriseNavLinks: NavItem[] = [
  {
    name: "Platform",
    to: "/enterprise/platform",
    description: "The layers behind reusable trust.",
    children: [
      {
        name: "Platform overview",
        to: "/enterprise/platform",
        description: "See how the layers connect.",
        icon: Layers3,
      },
      ...platformLayers.map((layer) => ({
        name: layer.title,
        to: `/enterprise/platform/${layer.id}`,
        description: layer.description,
        icon: layer.icon,
      })),
    ],
  },
  {
    name: "Solutions",
    to: "/enterprise/use-cases",
    description: "Find your verification workflow.",
    children: [
      {
        name: "All use cases",
        to: "/enterprise/use-cases",
        description: "Explore industry workflows.",
        icon: Layers3,
      },
      {
        name: "Fintechs",
        to: "/enterprise/use-cases/fintechs",
        description: "Customer onboarding.",
        icon: WalletCards,
      },
      {
        name: "Digital lenders",
        to: "/enterprise/use-cases/digital-lenders",
        description: "Borrower identity.",
        icon: BadgeCheck,
      },
      {
        name: "Marketplaces",
        to: "/enterprise/use-cases/marketplaces",
        description: "Seller and buyer trust.",
        icon: ShoppingBag,
      },
      {
        name: "Recruitment & HR",
        to: "/enterprise/use-cases/hr-platforms",
        description: "Credentials and references.",
        icon: BriefcaseBusiness,
      },
      {
        name: "Logistics & delivery",
        to: "/enterprise/use-cases/logistics-delivery",
        description: "Drivers, licences and renewals.",
        icon: ListChecks,
      },
      {
        name: "Schools",
        to: "/enterprise/use-cases/schools",
        description: "Student identity.",
        icon: GraduationCap,
      },
      {
        name: "Compliance teams",
        to: "/enterprise/use-cases/compliance-teams",
        description: "Evidence for review.",
        icon: ShieldCheck,
      },
    ],
  },
  { name: "Pricing", to: "/enterprise/pricing", description: "Find your starting point." },
  {
    name: "Resources",
    to: "/enterprise/resources",
    description: "Plan your next integration.",
    children: [
      {
        name: "Explore resources",
        to: "/enterprise/resources",
        description: "Guides for your team.",
        icon: Layers3,
      },
      {
        name: "The Ontiver journal",
        to: "/blogs",
        description: "Identity and product insights.",
        icon: BookOpen,
      },
      {
        name: "Security & trust",
        to: "/enterprise/security",
        description: "Consent, data, and review.",
        icon: ShieldCheck,
      },
      {
        name: "Developer documentation",
        to: "https://docs.ontiver.com/",
        description: "Explore the integration guides.",
        icon: ListChecks,
        external: true,
      },
    ],
  },
  {
    name: "Support",
    to: "/enterprise/support",
    description: "Let's work through it together.",
    children: [
      {
        name: "Support centre",
        to: "/enterprise/support",
        description: "Get help with your workflow.",
        icon: Headphones,
      },
      {
        name: "Talk to our team",
        to: "/enterprise/contact",
        description: "Plan a demo or pilot.",
        icon: HeartHandshake,
      },
    ],
  },
];

export const navLinks = individualNavLinks;
