import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import SEO from "./components/SEO";
import {
  BlogArticlePage,
  BlogPage,
  ContactPage,
  HomePage,
  PageLayout,
  PricingPage,
  UseCasePage,
} from "./pages";

function ScrollToHash({ lenisRef }: { lenisRef: ReturnType<typeof useLenis> }) {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      return;
    }

    const target = document.querySelector(hash);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash, key, lenisRef]);

  return null;
}

export default function App() {
  const lenisRef = useLenis();

  return (
    <PageLayout>
      <SEO />
      <ScrollToHash lenisRef={lenisRef} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogArticlePage />} />
        <Route path="/resources" element={<BlogPage />} />
        <Route path="/resources/blogs" element={<BlogPage />} />
        <Route path="/resources/blogs/:slug" element={<BlogArticlePage />} />
        <Route path="/use-cases/:id" element={<UseCasePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}
