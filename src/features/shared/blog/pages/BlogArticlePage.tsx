import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUpRight, Clock3, Quote } from "lucide-react";
import ArticleSidebar from "../components/ArticleSidebar";
import ArticleSocialRail from "../components/ArticleSocialRail";
import ReadingProgress from "../components/ReadingProgress";
import { ArticleGridCard, ArticleImage } from "../components/BlogCards";
import PageFooter from "../../../../shared/components/layout/PageFooter";
import { getBlogArticleBySlug } from "../data/articles";
import type { BlogBodyBlock, LibraryArticle } from "../data/cmsArticles";
import type { BlogSummary } from "../data/summaries";
import { useBlogArticle, useBlogLibrary } from "../hooks/useBlogContent";
import { subscribeToNewsletter } from "../../../../shared/lib/landingApi";

type SubscribeState = "idle" | "loading" | "done" | "error";

const SITE_URL = "https://ontiver.com";

const ArticleStatus = ({ title, message }: { title: string; message: string }) => (
  <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
    <section className="page-intro">
      <div className="site-container" role="status">
        <p className="eyebrow">Blog</p>
        <h1 className="section-heading mt-4">{title}</h1>
        <p className="mt-5 text-body text-[#002d0e]/70">{message}</p>
        <Link className="button-secondary mt-8" to="/blogs">
          <ArrowLeft size={16} aria-hidden="true" /> All articles
        </Link>
      </div>
    </section>
    <PageFooter />
  </main>
);

const BlogArticlePage = () => {
  const { slug } = useParams();
  const state = useBlogArticle(slug, getBlogArticleBySlug(slug));
  const library = useBlogLibrary();
  if (state.status === "loading") return <ArticleStatus title="Loading article…" message="One moment." />;
  if (state.status === "missing") {
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <ArticleStatus
          title="We couldn't find that article."
          message="It may have been moved or unpublished. Browse the latest articles instead."
        />
      </>
    );
  }
  return <ArticleView article={state.article} library={library} />;
};

type ReadableArticle = BlogSummary & {
  body: BlogBodyBlock[];
  origin?: "bundled" | "cms";
  seoDescription?: string;
};

const ArticleView = ({ article, library }: { article: ReadableArticle; library: LibraryArticle[] }) => {
  const isCms = article.origin === "cms";
  const description = article.seoDescription || article.excerpt;
  const bodyRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");

  const related = useMemo(
    () => library.filter((item) => item.slug !== article.slug).slice(0, 3),
    [article.slug, library],
  );

  const subscribe = async () => {
    if (subscribeState === "loading" || subscribeState === "done") return;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid || !consent) {
      setEmailError(true);
      if (!valid) emailRef.current?.focus();
      return;
    }
    setEmailError(false);
    setSubscribeState("loading");
    try {
      await subscribeToNewsletter(email);
      setSubscribeState("done");
    } catch {
      setSubscribeState("error");
      setEmailError(true);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="bg-white text-[#002d0e]">
      {isCms ? (
        // Articles published from the admin dashboard are not in the build-time SEO table.
        <Helmet>
          <title>{`${article.title} | Ontiver`}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={`${SITE_URL}/blogs/${article.slug}`} />
          <meta property="og:title" content={`${article.title} | Ontiver`} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${SITE_URL}/blogs/${article.slug}`} />
          <meta property="og:image" content={article.image.startsWith("http") ? article.image : `${SITE_URL}${article.image}`} />
          <meta name="twitter:title" content={`${article.title} | Ontiver`} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      ) : null}
      <ReadingProgress key={article.slug} targetRef={bodyRef} />
      <section className="page-intro">
        <div className="site-container">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#007d21] hover:underline"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to all resources
          </Link>
          <div className="mt-9 max-w-[1160px]">
            <p className="eyebrow">{article.category}</p>
            <h1 className="mt-5 text-page-hero font-medium">{article.title}</h1>
            <p className="mt-6 max-w-[740px] text-subtitle text-[#002d0e]/65">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta text-[#002d0e]/60">
              <span className="font-semibold text-[#002d0e]">by {article.author}</span>
              {article.date && <span>{article.date}</span>}
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} aria-hidden="true" />
                {article.readTime}
              </span>
            </div>
          </div>
          <div
            data-scroll-reveal
            className="mt-10 aspect-[1.15] overflow-hidden rounded-2xl bg-[#dcebd7] sm:mt-12 sm:aspect-[2]"
          >
            <ArticleImage article={article} lazy={false} />
          </div>
        </div>
      </section>
      <section className="section-space section-flow">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 xl:grid-cols-[64px_minmax(0,1fr)_300px] xl:gap-12">
          <ArticleSocialRail />
          <article ref={bodyRef} className="min-w-0 max-w-[720px]">
            {article.body.map((block, index) =>
              block.type === "heading" ? (
                <h2 key={index} className="mb-5 mt-12 text-card-title font-medium text-[#002d0e]">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote key={index} className="my-10 border-y border-[#c7d9c3] py-8">
                  <Quote size={26} className="mb-4 text-[#009311]" aria-hidden="true" />
                  <p className="text-card-title font-medium tracking-[-0.02em] text-[#002d0e]">
                    {block.text}
                  </p>
                </blockquote>
              ) : (
                <p key={index} className="mb-6 text-body leading-[1.9] text-[#002d0e]/75">
                  {block.text}
                  {block.source && (
                    <>
                      {" "}
                      <a
                        href={block.source.href}
                        className="font-medium text-[#007d21] underline decoration-[#007d21]/30 underline-offset-4 hover:decoration-[#007d21]"
                      >
                        {block.source.label}
                      </a>
                      .
                    </>
                  )}
                </p>
              ),
            )}
            <div className="mt-10 border-t border-[#dde6dc] pt-6">
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]"
                to="/blogs"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back to all resources
              </Link>
            </div>
          </article>
          <ArticleSidebar
            emailRef={emailRef}
            email={email}
            emailError={emailError}
            consent={consent}
            subscribeState={subscribeState}
            onEmailChange={setEmail}
            onConsentChange={setConsent}
            onSubscribe={subscribe}
          />
        </div>
      </section>
      <section className="section-space section-flow bg-[#f7f7f7]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-heading">Related articles.</h2>
            <Link className="button-secondary" to="/blogs">
              All resources <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <ArticleGridCard key={item.slug} article={item} index={index} />
            ))}
          </div>
        </div>
      </section>
      <PageFooter />
    </main>
  );
};

export default BlogArticlePage;
