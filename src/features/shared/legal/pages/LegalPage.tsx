import { ShieldCheck } from "../../../../shared/components/ui/icons";
import { useLocation } from "react-router-dom";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { editorialPhotos } from "../../../../shared/data/editorialPhotos";
import type { EditorialImage } from "../../../../shared/data/imagery";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { LEGAL_LAST_UPDATED, legalDocuments } from "../data/legalDocuments";
import LegalNavigation from "../components/LegalNavigation";
import LegalCentreContent from "../components/LegalCentreContent";
import LegalDocumentContent from "../components/LegalDocumentContent";
import AccountDeletionContent from "../components/AccountDeletionContent";

const legalHeroImages: Record<string, EditorialImage> = {
  "/legal": editorialPhotos.legal,
  "/privacy": editorialPhotos.legalPrivacy,
  "/terms": editorialPhotos.legalTerms,
  "/cookies": editorialPhotos.legalCookies,
  "/account-deletion": editorialPhotos.legalAccountDeletion,
};

const LegalPage = () => {
  const { pathname } = useLocation();
  const isDeletion = pathname === "/account-deletion";
  const isCentre = pathname === "/legal";
  const document = legalDocuments[pathname] ?? legalDocuments["/privacy"];
  const title = isDeletion ? "Account Deletion" : isCentre ? "Legal Centre" : document.title;
  const summary = isDeletion
    ? "Enter your email to start the account deletion process."
    : isCentre
      ? "Legal documents, privacy questions, and account deletion requests."
      : document.summary;
  const image = legalHeroImages[pathname] ?? legalHeroImages["/privacy"];
  const imageLeft = isCentre || pathname === "/terms" || isDeletion;

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-surface text-[#002d0e]">
        <header className={`page-intro ${isCentre ? "" : "page-intro-compact"}`}>
          <div
            className={`site-container split-hero-grid ${imageLeft ? "split-hero-grid--image-left" : ""} ${isCentre ? "" : "split-hero-grid--compact"}`}
          >
            <div className="page-hero-content">
              <p className="eyebrow inline-flex items-center gap-2">
                <ShieldCheck size={16} aria-hidden="true" /> Ontiver Trust &amp; Legal
              </p>
              <h1 className="mt-5 text-page-hero font-medium">{title}</h1>
              <p className="page-hero-description mt-6 text-subtitle text-[#002d0e]/65">
                {summary}
              </p>
              {!isDeletion && (
                <p className="mt-7 inline-flex items-center gap-2 text-meta font-medium text-[#526058]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#009311]" aria-hidden="true" /> Last
                  updated {isCentre ? LEGAL_LAST_UPDATED : document.updated}
                </p>
              )}
            </div>
            <div className="page-hero-media hero-media-enter">
              <ContextPhoto image={image} priority sizes="(min-width: 1024px) 47vw, 100vw" />
            </div>
          </div>
        </header>
        <section className="section-space">
          <div className="site-container grid items-start gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
            <LegalNavigation
              pathname={pathname}
              document={document}
              showContents={!isCentre && !isDeletion}
            />
            <article className="legal-content min-w-0">
              {isCentre ? (
                <LegalCentreContent />
              ) : isDeletion ? (
                <AccountDeletionContent />
              ) : (
                <LegalDocumentContent document={document} />
              )}
            </article>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
};

export default LegalPage;
