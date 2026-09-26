import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import RouteScroll from "./routes/RouteScroll";
import PageReveal from "../shared/components/motion/PageReveal";
import SEO from "./SEO";
import PageLayout from "../shared/components/layout/PageLayout";
import RouteLoading from "./routes/RouteLoading";
import RouteErrorBoundary from "./routes/RouteErrorBoundary";
import {
  IndividualProductPage,
  HowItWorksPage,
  IndividualUseCasesPage,
  PlatformOverviewPage,
  EnterpriseUseCasesPage,
  ResourcesPage,
  WaitlistPage,
  BlogArticlePage,
  BlogPage,
  ContactPage,
  EnterpriseContactPage,
  IndividualHomePage,
  EnterpriseHomePage,
  LegalPage,
  PricingPage,
  PlatformPage,
  SecurityPage,
  SupportPage,
  UseCasePage,
} from "./routes/pageModules";

const LegacyUseCaseRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/enterprise/use-cases/${id ?? ""}`} replace />;
};

const LegacyBlogArticleRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/blogs/${slug ?? ""}`} replace />;
};

const App = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <RouteErrorBoundary resetKey={pathname}>
        <Suspense fallback={<RouteLoading />}>
          <PageReveal />
          <SEO />
          <RouteScroll />
          <Routes>
            <Route path="/" element={<IndividualHomePage />} />
            <Route path="/enterprise" element={<EnterpriseHomePage />} />
            <Route path="/blog" element={<Navigate to="/blogs" replace />} />
            <Route path="/blog/:slug" element={<LegacyBlogArticleRedirect />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:slug" element={<BlogArticlePage />} />
            <Route path="/identity" element={<IndividualProductPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/use-cases" element={<IndividualUseCasesPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/enterprise/resources" element={<ResourcesPage audience="enterprise" />} />
            <Route path="/enterprise/platform" element={<PlatformOverviewPage />} />
            <Route path="/enterprise/use-cases" element={<EnterpriseUseCasesPage />} />
            <Route path="/enterprise/security" element={<SecurityPage audience="enterprise" />} />
            <Route path="/enterprise/support" element={<SupportPage audience="enterprise" />} />
            <Route path="/resources/blogs" element={<Navigate to="/blogs" replace />} />
            <Route path="/resources/blogs/:slug" element={<LegacyBlogArticleRedirect />} />
            <Route path="/enterprise/use-cases/:id" element={<UseCasePage />} />
            <Route path="/enterprise/platform/:id" element={<PlatformPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/use-cases/:id" element={<LegacyUseCaseRedirect />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/enterprise/contact" element={<EnterpriseContactPage />} />
            <Route path="/enterprise/pricing" element={<PricingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/cookies" element={<LegalPage />} />
            <Route path="/account-deletion" element={<LegalPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </PageLayout>
  );
};

export default App;
