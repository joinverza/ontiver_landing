import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock3, Quote } from "lucide-react";
import ArticleSidebar from "../components/blog/ArticleSidebar";
import ArticleSocialRail from "../components/blog/ArticleSocialRail";
import { ArticleGridCard, ArticleImage } from "../components/blog/BlogCards";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { blogArticles, getBlogArticleBySlug } from "../data/blog";
import { subscribeToNewsletter } from "../lib/landingApi";

type SubscribeState = "idle" | "loading" | "done" | "error";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = getBlogArticleBySlug(slug) ?? blogArticles[0];
  const bodyRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");

  const related = useMemo(() => blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3), [article]);

  useEffect(() => {
    const onScroll = () => {
      if (!bodyRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const total = bodyRef.current.scrollHeight - window.innerHeight * 0.45;
      const distance = Math.max(0, -rect.top);
      setProgress(total <= 0 ? 0 : Math.min(100, (distance / total) * 100));
      setShowProgress(rect.top < 12 && rect.bottom > window.innerHeight * 0.25);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article.slug]);

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
    <main className="bg-white text-[#002d0e]">
      <span aria-hidden="true" className="fixed left-0 top-0 z-[200] h-0.5 bg-[#009311]" style={{ width: `${progress}%`, opacity: showProgress ? 1 : 0 }} />
      <section className="page-intro">
        <div className="site-container">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-[#007d21] hover:underline"><ArrowLeft size={16} aria-hidden="true" /> Back to all resources</Link>
          <div className="mt-9 max-w-[1160px]">
            <p className="eyebrow">{article.category}</p>
            <h1 className="mt-5 text-page-hero font-medium">{article.title}</h1>
            <p className="mt-6 max-w-[740px] text-subtitle text-[#002d0e]/65">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta text-[#002d0e]/60">
              <span className="font-semibold text-[#002d0e]">by {article.author}</span>
              {article.date && <span>{article.date}</span>}
              <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{article.readTime}</span>
            </div>
          </div>
          <div data-scroll-reveal className="mt-10 aspect-[1.15] overflow-hidden rounded-2xl bg-[#dcebd7] sm:mt-12 sm:aspect-[2]">
            <ArticleImage article={article} lazy={false} />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 xl:grid-cols-[64px_minmax(0,1fr)_300px] xl:gap-12">
          <ArticleSocialRail />
          <article ref={bodyRef} className="min-w-0 max-w-[720px]">
            {article.body.map((block, index) => block.type === "heading" ? (
              <h2 key={index} className="mb-5 mt-12 text-card-title font-medium text-[#002d0e]">{block.text}</h2>
            ) : block.type === "quote" ? (
              <blockquote key={index} className="my-10 border-y border-[#c7d9c3] py-8">
                <Quote size={26} className="mb-4 text-[#009311]" aria-hidden="true" />
                <p className="text-card-title font-medium tracking-[-0.02em] text-[#002d0e]">{block.text}</p>
              </blockquote>
            ) : <p key={index} className="mb-6 text-body leading-[1.9] text-[#002d0e]/75">{block.text}{block.source && <> <a href={block.source.href} className="font-medium text-[#007d21] underline decoration-[#007d21]/30 underline-offset-4 hover:decoration-[#007d21]">{block.source.label}</a>.</>}</p>)}
            <div className="mt-10 border-t border-[#dde6dc] pt-6">
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#007d21]" to="/blogs"><ArrowLeft size={16} aria-hidden="true" /> Back to all resources</Link>
            </div>
          </article>
          <ArticleSidebar emailRef={emailRef} email={email} emailError={emailError} consent={consent} subscribeState={subscribeState} onEmailChange={setEmail} onConsentChange={setConsent} onSubscribe={subscribe} />
        </div>
      </section>
      <section className="section-space bg-[#f7f7f7]">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-heading">Related articles.</h2>
            <Link className="button-secondary" to="/blogs">All resources <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => <ArticleGridCard key={item.slug} article={item} index={index} />)}
          </div>
        </div>
      </section>
      <CurtainFooter />
    </main>
  );
}
