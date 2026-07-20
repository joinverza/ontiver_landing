import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlogHero from "../components/blog/BlogHero";
import LoadingDots from "../components/blog/LoadingDots";
import MagneticFillButton from "../components/ui/MagneticFillButton";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";
import { blogArticles } from "../data/blog";
import {
  ArticleGridCard,
  DarkFeaturedArticleCard,
  FeaturedArticleCard,
} from "../components/blog/BlogCards";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const featured = blogArticles[0];
  const gridArticles = blogArticles.slice(1, 1 + visibleCount);
  const darkFeature = blogArticles[4];
  const canLoadMore = visibleCount < blogArticles.length - 2;

  const loadMore = () => {
    if (!canLoadMore || loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 3, blogArticles.length - 2));
      setLoading(false);
    }, 900);
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const sections = gsap.utils.toArray<HTMLElement>(".blog-reveal-section");
      const cards = gsap.utils.toArray<HTMLElement>("[data-blog-card]");
      const hoverCleanups: Array<() => void> = [];

      gsap.set(sections, { opacity: 0, y: 42 });
      gsap.set(cards, { opacity: 0, y: 34, scale: 0.97 });

      sections.forEach((section) => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          delay: index * 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
        });

        const image = card.querySelector<HTMLElement>(".blog-card-image");
        const content = card.querySelector<HTMLElement>(".blog-card-content");
        const readMore = card.querySelector<HTMLElement>(".blog-read-more");

        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            rotateX: 1.6,
            rotateY: -1.2,
            borderColor: "rgba(0,147,17,0.32)",
            duration: 0.32,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(image, {
            scale: 1.055,
            filter: "saturate(1.12) brightness(0.92)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(content, { y: -3, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(readMore, { x: 4, duration: 0.24, ease: "power2.out", overwrite: "auto" });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            borderColor: "rgba(0,41,27,0.15)",
            duration: 0.34,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(image, {
            scale: 1,
            filter: "saturate(1) brightness(1)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(content, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          gsap.to(readMore, { x: 0, duration: 0.24, ease: "power2.out", overwrite: "auto" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef, dependencies: [visibleCount] }
  );

  return (
    <main ref={rootRef} id="blog" className="bg-bg-light text-black">
      <BlogHero />

      <section
        id="blog-library"
        className="blog-reveal-section px-6 pb-12 pt-16"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-meta font-semibold uppercase tracking-[0.16em] text-[#009311]">
                Featured Insight
              </p>
              <h2 className="mt-2 text-section font-bold text-[#05150E]">Start with the core story.</h2>
            </div>
            <p className="max-w-[330px] text-body text-black/50">
              The latest selected article from the active resource view.
            </p>
          </div>
          <FeaturedArticleCard article={featured} />
        </div>
      </section>

      <section className="blog-reveal-section px-6 py-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-meta font-semibold uppercase tracking-[0.16em] text-[#009311]">
                Resource Library
              </p>
              <h2 className="mt-2 text-section font-bold text-[#05150E]">
                Browse practical playbooks.
              </h2>
            </div>
            <p className="text-body font-medium text-black/45">
              {blogArticles.length} articles
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article, index) => (
              <ArticleGridCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {darkFeature ? (
        <section className="blog-reveal-section px-6 py-12">
          <div className="mx-auto max-w-[1180px]">
            <DarkFeaturedArticleCard article={darkFeature} />
          </div>
        </section>
      ) : null}

      <section className="blog-reveal-section px-6 pb-20 pt-6 text-center">
        <MagneticFillButton
          variant="light"
          className="h-12 rounded-lg px-7 text-sm font-semibold"
          onClick={loadMore}
        >
          {loading ? (
            <span className="inline-flex items-center">
              Loading
              <LoadingDots />
            </span>
          ) : canLoadMore ? (
            "Load More Articles"
          ) : (
            "All Articles Loaded"
          )}
        </MagneticFillButton>
      </section>

      <CurtainFooter />
    </main>
  );
}
