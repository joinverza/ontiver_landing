import ActionIcon from "../../../../shared/components/ui/ActionIcon";
import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock3, Quote } from "lucide-react";
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
  <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
    <section className="page-intro">
      <div className="site-container" role="status">
        <div className="page-hero-content">
          <p className="eyebrow">Blog</p>
          <h1 className="text-page-hero mt-5 font-medium">{title}</h1>
          <p className="page-hero-description mt-6 text-subtitle text-[#002d0e]/70">{message}</p>
          <div className="page-hero-actions">
            <Link className="button-secondary" to="/blogs">
              <ActionIcon direction="back" size={16} aria-hidden="true" /> All articles
            </Link>
          </div>
        </div>
      </div>
    </section>
    <PageFooter />
  </main>
);

const BlogArticlePage = () => {
  const { slug } = useParams();
  const state = useBlogArticle(slug, getBlogArticleBySlug(slug));
  const library = useBlogLibrary();
  if (state.status === "loading")
    return <ArticleStatus title="Loading article…" message="One moment." />;
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

const ArticleView = ({
  article,
  library,
}: {
  article: ReadableArticle;
  library: LibraryArticle[];
}) => {
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
    <main id="main-content" tabIndex={-1} className="bg-surface text-[#002d0e]">
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
          <meta
            property="og:image"
            content={
              article.image.startsWith("http") ? article.image : `${SITE_URL}${article.image}`
            }
          />
          <meta name="twitter:title" content={`${article.title} | Ontiver`} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      ) : null}
      <ReadingProgress key={article.slug} targetRef={bodyRef} />
      <section className="page-intro pt-32!">
        <div className="site-container split-hero-grid split-hero-grid--image-left">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <ActionIcon direction="back" size={16} aria-hidden="true" /> Back to all resources
          </Link>
          <div className="page-hero-content">
            <p className="eyebrow">{article.category}</p>
            <h1 className="mt-5 text-page-hero font-medium">{article.title}</h1>
            <p className="page-hero-description mt-6 text-subtitle text-[#002d0e]/65">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta text-[#002d0e]/60">
              <span className="font-semibold text-[#002d0e]">by {article.author}</span>
              {article.date && <span>{article.date}</span>}
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} aria-hidden="true" />
                {article.readTime}
              </span>
            </div>
          </div>
          <div className="page-hero-media hero-media-enter">
            <div className="context-photo context-photo--hero">
              <ArticleImage
                article={article}
                lazy={false}
                sizes="(min-width: 1024px) 47vw, 100vw"
              />
            </div>
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
                        className="font-medium text-accent underline decoration-[#007d21]/30 underline-offset-4 hover:decoration-[#007d21]"
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                to="/blogs"
              >
                <ActionIcon direction="back" size={16} aria-hidden="true" /> Back to all resources
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
      <section className="section-space section-flow bg-surface-muted">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-heading">Related articles.</h2>
            <Link className="button-secondary" to="/blogs">
              All resources <ActionIcon size={17} aria-hidden="true" />
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
