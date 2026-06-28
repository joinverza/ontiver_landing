import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BarChart3, Clock3 } from "lucide-react";
import ArticleSidebar from "../components/blog/ArticleSidebar";
import ArticleSocialRail from "../components/blog/ArticleSocialRail";
import { ArticleGridCard } from "../components/blog/BlogCards";
import Footer from "../components/sections/Footer/Footer";
import { blogArticles, getBlogArticleBySlug } from "../data/blog";

type SubscribeState = "idle" | "loading" | "done";

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getBlogArticleBySlug(slug) ?? blogArticles[0];
  const contentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const viewsRef = useRef<HTMLParagraphElement>(null);
  const sharesRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subscribeState, setSubscribeState] = useState<SubscribeState>("idle");

  const related = useMemo(() => {
    if (!article) return [];
    return blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3);
  }, [article]);

  useEffect(() => {
    const onScroll = () => {
      if (!bodyRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const total = bodyRef.current.scrollHeight - window.innerHeight * 0.45;
      const distance = Math.max(0, -rect.top);
      const next = total <= 0 ? 0 : Math.min(100, (distance / total) * 100);
      setProgress(next);
      setShowProgress(rect.top < 12 && rect.bottom > window.innerHeight * 0.25);

      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (!contentRef.current || !article) return;

      const counters = [
        { ref: viewsRef.current, value: article.views },
        { ref: sharesRef.current, value: article.shares },
        { ref: socialRef.current, value: 425 },
      ];

      counters.forEach(({ ref, value }) => {
        if (!ref) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            ref.textContent = formatCompact(Math.round(counter.val));
          },
        });
      });

      gsap.fromTo(
        ".article-sidebar",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".article-follow-icon",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "back.out(2)",
          delay: 0.65,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".article-body-block").forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: contentRef, dependencies: [article?.slug] }
  );

  const subscribe = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid || !consent) {
      setEmailError(true);
      if (emailRef.current) {
        gsap.fromTo(
          emailRef.current,
          { x: 0 },
          { x: -4, duration: 0.08, repeat: 3, yoyo: true, ease: "power2.inOut" }
        );
      }
      window.setTimeout(() => setEmailError(false), 350);
      return;
    }

    setSubscribeState("loading");
    window.setTimeout(() => {
      setSubscribeState("done");
      window.setTimeout(() => setSubscribeState("idle"), 2000);
    }, 1500);
  };

  return (
    <main className="bg-white text-[#111827]">
      <motion.div
        ref={progressRef}
        className="fixed left-0 top-0 z-[200] h-0.5 bg-[#009311]"
        animate={{ width: `${progress}%`, opacity: showProgress ? 1 : 0 }}
        transition={{ width: { duration: 0.05, ease: "linear" }, opacity: { duration: 0.2 } }}
      />

      <section className="relative h-[360px] w-full overflow-hidden sm:h-[420px]">
        <motion.div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.65)_100%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        <motion.button
          className="absolute left-5 top-[104px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/25 sm:left-6 sm:top-[120px] md:left-20"
          type="button"
          onClick={() => navigate("/blogs")}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span aria-hidden="true">←</span>
          Back
        </motion.button>

        <div className="absolute right-5 bottom-8 left-5 max-w-[580px] text-white sm:left-6 md:left-20">
          <motion.h1
            className="text-[clamp(1.9rem,8vw,2.5rem)] font-bold leading-[1.15] [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {article.title}
          </motion.h1>
          <motion.div
            className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            <span>by {article.author}</span>
            <span>—</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              {article.readTime}
            </span>
            <span>—</span>
            <span className="inline-flex items-center gap-1.5">
              <BarChart3 size={14} />
              {formatCompact(article.views)} views
            </span>
          </motion.div>
        </div>
      </section>

      <section ref={contentRef} className="px-5 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-[1040px] gap-8 lg:grid-cols-[80px_minmax(0,580px)_minmax(220px,260px)] lg:gap-10">
          <ArticleSocialRail
            viewsRef={viewsRef}
            sharesRef={sharesRef}
            socialRef={socialRef}
          />

          <article ref={bodyRef} className="max-w-[580px] min-w-0">
            {article.body.map((block, index) =>
              block.type === "quote" ? (
                <blockquote
                  key={index}
                  className="article-body-block my-8 border-l-[3px] border-[#009311] pl-5 text-base italic leading-[1.8] text-black/60 sm:text-lg"
                >
                  {block.text}
                </blockquote>
              ) : (
                <p
                  key={index}
                  className="article-body-block mb-6 text-base leading-[1.8] text-[#111827] sm:text-[17px]"
                >
                  {block.text}
                </p>
              )
            )}
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

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <motion.h2
            className="mb-8 text-3xl font-bold text-[#05150E]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Related Articles
          </motion.h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <ArticleGridCard key={item.slug} article={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 text-center">
        <Link className="text-sm font-bold text-[#009311]" to="/blogs">
          Back to all resources
        </Link>
      </section>

      <Footer />
    </main>
  );
}
