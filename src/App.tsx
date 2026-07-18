import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
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

function ScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    if (!/^#[A-Za-z][\w:.-]*$/.test(hash)) return;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }, [hash, key]);

  return null;
}

export default function App() {
  return (
    <PageLayout>
      <SEO />
      <ScrollToHash />
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
        <Route path="/resources" element={<Navigate to="/blogs" replace />} />
        <Route path="/resources/blogs" element={<Navigate to="/blogs" replace />} />
        <Route path="/resources/blogs/:slug" element={<LegacyBlogArticleRedirect />} />
        <Route path="/enterprise/use-cases/:id" element={<UseCasePage />} />
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
