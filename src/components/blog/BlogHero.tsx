import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import MagneticFillButton from "../ui/MagneticFillButton";

const heading = "Insights on Identity, Compliance, and Trust Infrastructure";
const heroEase: [number, number, number, number] = [0.4, 0, 0.2, 1];

function SplitHeading() {
  const words = heading.split(" ");

  return (
    <h1 className="max-w-[620px] text-balance text-[clamp(2.35rem,8vw,3.5rem)] font-bold leading-[1.08] tracking-[0] text-[#05150E]">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: heroEase }}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </h1>
  );
}

export default function BlogHero({ onJoinClick }: { onJoinClick: () => void }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#f1f4ef] px-6 pb-14 pt-[120px] sm:pb-20 sm:pt-[150px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] animate-grid-move [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:100px_100px]"
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 z-20 hidden w-full items-center justify-between px-6 py-6 md:flex md:px-12">
        <Link to="/" aria-label="Ontiver home">
          <img src="/assets/logo.svg" alt="Ontiver" className="h-6 md:h-8" />
        </Link>
        <MagneticFillButton
          variant="green"
          className="rounded-xl px-7 py-3 text-sm font-medium md:px-8 md:text-base"
          onClick={onJoinClick}
        >
          Join Waitlist
        </MagneticFillButton>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div>
          <SplitHeading />
          <motion.p
            className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-[#6B7280]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.85, ease: heroEase }}
          >
            Explore practical guides, compliance insights, developer resources,
            and research on reusable identity, KYC optimization, AML, and
            digital trust systems.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 1.1, ease: "easeOut" }}
          >
            <MagneticFillButton
              variant="green"
              className="h-12 rounded-lg px-6 text-sm font-semibold"
              onClick={() => {
                document.getElementById("blog-library")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Explore Resources
            </MagneticFillButton>
            <MagneticFillButton
              variant="light"
              className="h-12 rounded-lg px-6 text-sm font-semibold"
              onClick={() => navigate("/blogs/developer-guide-to-verification-webhooks")}
            >
              Developer Docs
            </MagneticFillButton>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[250px] sm:min-h-[360px] lg:min-h-[500px]"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          <motion.img
            src="/assets/hero-blog.png"
            alt="Floating editorial resource cards"
            className="absolute left-1/2 top-[-8px] w-[min(100%,520px)] -translate-x-1/2 object-contain sm:top-[-24px] lg:left-[56%] lg:w-[680px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
