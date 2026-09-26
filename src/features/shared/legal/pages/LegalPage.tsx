import { ShieldCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { imagery } from "../../../../shared/data/imagery";
import ContextPhoto from "../../../../shared/components/ui/ContextPhoto";
import { legalDocuments } from "../data/legalDocuments";
import LegalNavigation from "../components/LegalNavigation";
import LegalCentreContent from "../components/LegalCentreContent";
import LegalDocumentContent from "../components/LegalDocumentContent";
import AccountDeletionContent from "../components/AccountDeletionContent";

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

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#002d0e]">
        <header className="page-intro">
          <div
            className={`site-container ${isCentre ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20" : ""}`}
          >
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <ShieldCheck size={16} aria-hidden="true" /> Ontiver Trust &amp; Legal
              </p>
              <h1 className="mt-5 max-w-[1100px] text-page-hero font-medium">{title}</h1>
              <p className="mt-6 max-w-[640px] text-subtitle text-[#002d0e]/65">{summary}</p>
              {!isDeletion && (
                <p className="mt-7 inline-flex items-center gap-2 text-meta font-medium text-[#526058]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#009311]" aria-hidden="true" />{" "}
                  Awaiting qualified legal review
                </p>
              )}
            </div>
            {isCentre && (
              <div data-scroll-reveal>
                <ContextPhoto image={imagery.candidateReview} size="wide" />
              </div>
            )}
          </div>
        </header>
        <section className="pb-20 lg:pb-32">
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
