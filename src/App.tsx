import { Navigate, Route, Routes, useParams } from "react-router-dom";
import RouteScroll from "./components/RouteScroll";
import IndividualProductPage from "./pages/IndividualProductPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import IndividualUseCasesPage from "./pages/IndividualUseCasesPage";
import PlatformOverviewPage from "./pages/PlatformOverviewPage";
import EnterpriseUseCasesPage from "./pages/EnterpriseUseCasesPage";
import ResourcesPage from "./pages/ResourcesPage";
import WaitlistPage from "./pages/WaitlistPage";
import SEO from "./components/SEO";
import {
  BlogArticlePage,
  BlogPage,
  ContactPage,
  EnterpriseContactPage,
  HomePage,
  LegalPage,
  PageLayout,
  PricingPage,
  PlatformPage,
  SecurityPage,
  SupportPage,
  UseCasePage,
} from "./pages";

function LegacyUseCaseRedirect() {
  const { id } = useParams();
  return <Navigate to={`/enterprise/use-cases/${id ?? ""}`} replace />;
}

function LegacyBlogArticleRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blogs/${slug ?? ""}`} replace />;
}

export default function App() {
  return (
    <PageLayout>
      <SEO />
      <RouteScroll />
      <Routes>
        <Route
          path="/"
          element={<HomePage key="individual-home" audience="individual" />}
        />
        <Route
          path="/enterprise"
          element={<HomePage key="enterprise-home" audience="enterprise" />}
        />
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
    </PageLayout>
  );
}
