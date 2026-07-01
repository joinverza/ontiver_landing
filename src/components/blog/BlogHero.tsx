import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MagneticFillButton from "../ui/MagneticFillButton";

const heroEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

function scrollToBlogLibrary() {
  document.getElementById("blog-library")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function BlogHero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#f3f3f1] px-5 pb-12 pt-[112px] sm:px-8 sm:-16 md:pt-28 lg:px-10 lg:pb-18 lg:pt-[10rem]">
      <div
        className="poinpbter-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(0,45,14,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,45,14,0.055)_1px,transparent_1px)] [background-size:92px_92px]"
        aria-hidden="true"
      />
      {/* Animated Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] animate-grid-move"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      ></div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between px-5 sm:px-6 md:px-12 lg:flex-row lg:px-20">
        <div className="flex w-full flex-col items-start pt-0 md:pt-8 lg:w-[60%] lg:pb-10">
          <motion.h1
            className="text-[clamp(2.45rem,7.1vw,4.1rem)] text-black sm:text-[clamp(3rem,7vw,4.5rem)] font-bold leading-[1.13] tracking-tight sm:mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: heroEase }}
          >
            Insights on Identity,
            <br />
            Compliance, and
            <br />
            Trust Infrastructure
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[435px] text-[0.95rem] leading-[1.25] text-black/55 sm:text-base md:mt-5 md:text-[1.12rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: heroEase }}
          >
            Explore practical guides, compliance insights, developer resources,
            and research on reusable identity, KYC optimization, AML, and
            digital trust systems.
          </motion.p>

          <motion.div
            className="mt-5 flex w-full max-w-[420px] flex-col gap-3 xss:flex-row md:mt-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: heroEase }}
          >
            <MagneticFillButton
              variant="green"
              className="h-10 flex-1 rounded-lg px-6 text-md font-semibold sm:h-[52px]"
              onClick={scrollToBlogLibrary}
            >
              Explore Resources
            </MagneticFillButton>
            <MagneticFillButton
              variant="light"
              className="h-10 flex-1 rounded-lg px-6 text-md font-semibold sm:h-[52px]"
              onClick={() => navigate("/blogs/developer-guide-to-verification-webhooks")}
            >
              Developer Docs
            </MagneticFillButton>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.08, ease: heroEase }}
        >
          <img
            src="/assets/hero-blog.png"
            alt="Illustration of identity and developer resources"
            className="w-full max-w-[430px] object-contain sm:max-w-[520px] md:max-w-[560px] lg:max-w-[620px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
