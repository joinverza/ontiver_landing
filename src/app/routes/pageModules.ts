import { lazy } from "react";

// Import each route directly: a barrel would eagerly load the whole website.
export const IndividualHomePage = lazy(
  () => import("../../features/individual/home/pages/IndividualHomePage"),
);
export const EnterpriseHomePage = lazy(
  () => import("../../features/enterprise/home/pages/EnterpriseHomePage"),
);
export const IndividualProductPage = lazy(
  () => import("../../features/individual/identity/pages/IndividualProductPage"),
);
export const HowItWorksPage = lazy(
  () => import("../../features/individual/journey/pages/HowItWorksPage"),
);
export const IndividualUseCasesPage = lazy(
  () => import("../../features/individual/use-cases/pages/IndividualUseCasesPage"),
);
export const WaitlistPage = lazy(
  () => import("../../features/individual/waitlist/pages/WaitlistPage"),
);
export const PlatformOverviewPage = lazy(
  () => import("../../features/enterprise/platform/pages/PlatformOverviewPage"),
);
export const PlatformPage = lazy(
  () => import("../../features/enterprise/platform/pages/PlatformPage"),
);
export const EnterpriseUseCasesPage = lazy(
  () => import("../../features/enterprise/use-cases/pages/EnterpriseUseCasesPage"),
);
export const UseCasePage = lazy(
  () => import("../../features/enterprise/use-cases/pages/UseCasePage"),
);
export const EnterpriseContactPage = lazy(
  () => import("../../features/enterprise/contact/pages/EnterpriseContactPage"),
);
export const PricingPage = lazy(
  () => import("../../features/enterprise/pricing/pages/PricingPage"),
);
export const BlogPage = lazy(() => import("../../features/shared/blog/pages/BlogPage"));
export const BlogArticlePage = lazy(
  () => import("../../features/shared/blog/pages/BlogArticlePage"),
);
export const ResourcesPage = lazy(
  () => import("../../features/shared/resources/pages/ResourcesPage"),
);
export const SecurityPage = lazy(() => import("../../features/shared/security/pages/SecurityPage"));
export const SupportPage = lazy(() => import("../../features/shared/support/pages/SupportPage"));
export const ContactPage = lazy(() => import("../../features/shared/contact/pages/ContactPage"));
export const LegalPage = lazy(() => import("../../features/shared/legal/pages/LegalPage"));
