import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Check } from "lucide-react";
import AuroraBadge from "../../ui/AuroraBadge";
import MagneticFillButton from "../../ui/MagneticFillButton";

type JoinState = "idle" | "joining" | "joined";

function DotLoader() {
  return (
    <span className="ml-1 inline-flex w-5 justify-start">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 0.8,
            delay: dot * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export default function Join() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<JoinState>("idle");
  const [error, setError] = useState(false);
  const headingWords = "Join the reusable identity waitlist".split(" ");

  const submit = () => {
    if (state === "joining") return;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      setError(true);
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { x: 0 },
          {
            x: -5,
            duration: 0.07,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => gsap.set(inputRef.current, { x: 0 }),
          }
        );
      }
      window.setTimeout(() => setError(false), 400);
      return;
    }

    setState("joining");
    window.setTimeout(() => setState("joined"), 1500);
  };

  return (
    <section
      id="join"
      data-curtain-cta
      className="scroll-mt-24 bg-bg-light px-5 py-8 sm:px-6 sm:py-10"
    >
      <div
        data-curtain-cta-panel
        className="relative mx-auto flex min-h-[560px] max-w-[1280px] items-stretch overflow-hidden rounded-[24px] bg-[#06170f] text-left text-white sm:rounded-[28px]"
      >
        <div
          data-vault-cta-grid-bg
          className="pointer-events-none absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />
        <div
          data-vault-cta-glow-left
          className="pointer-events-none absolute top-0 left-0 h-[52%] w-[36%] bg-[radial-gradient(circle_at_top_left,rgba(0,147,17,0.62),rgba(0,147,17,0.22)_42%,rgba(0,147,17,0)_72%)]"
          aria-hidden="true"
        />
        <div
          data-vault-cta-glow-right
          className="pointer-events-none absolute right-0 bottom-0 h-[52%] w-[34%] bg-[radial-gradient(circle_at_bottom_right,rgba(0,147,17,0.56),rgba(0,147,17,0.2)_42%,rgba(0,147,17,0)_74%)]"
          aria-hidden="true"
        />
        <div
          data-vault-door-left
          className="pointer-events-none absolute inset-y-0 left-0 z-[20] hidden w-1/2 rounded-l-[24px] bg-[#06170f] sm:rounded-l-[28px] md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0% 0%, rgba(0,147,17,0.38), rgba(0,147,17,0.1) 38%, transparent 68%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "auto, 72px 72px, 72px 72px",
          }}
          aria-hidden="true"
        />
        <div
          data-vault-door-right
          className="pointer-events-none absolute inset-y-0 right-0 z-[20] hidden w-1/2 rounded-r-[24px] bg-[#06170f] sm:rounded-r-[28px] md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 100%, rgba(0,147,17,0.34), rgba(0,147,17,0.1) 40%, transparent 70%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "auto, 72px 72px, 72px 72px",
          }}
          aria-hidden="true"
        />
        <div
          data-vault-crack-glow
          className="pointer-events-none absolute left-1/2 top-0 z-[31] hidden h-full w-[22%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,147,17,0.42),rgba(0,147,17,0.16)_38%,rgba(0,147,17,0)_72%)] opacity-0 md:block"
          aria-hidden="true"
        />
        <div
          data-vault-crack-line
          className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-[32] hidden w-px -translate-x-1/2 bg-[#11cd43] opacity-0 shadow-[0_0_18px_rgba(17,205,67,0.72)] md:block"
          aria-hidden="true"
        />
        <div
          data-vault-left-shadow
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-[24] hidden w-24 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.12))] opacity-0 md:block"
          aria-hidden="true"
        />
        <div
          data-vault-right-shadow
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-[24] hidden w-24 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),transparent)] opacity-0 md:block"
          aria-hidden="true"
        />
        <span
          data-curtain-cta-watermark
          className="pointer-events-none absolute -bottom-[0.18em] left-[-0.08em] z-[1] text-[clamp(8rem,21vw,20rem)] font-bold uppercase leading-none text-white/20"
        >
          Waitlist
        </span>

        <div className="relative z-10 grid w-full gap-10 px-[clamp(1.25rem,5vw,5.25rem)] py-[clamp(3rem,6vw,5.5rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          <div className="flex min-h-full flex-col justify-between gap-10">
            <div>
              <div data-curtain-cta-badge>
                <AuroraBadge spanClassName="border border-white/65! bg-[#06170f]/80! px-7! py-2! text-sm! font-medium! text-white/75!">
                  Early Access
                </AuroraBadge>
              </div>

              <h2
                data-curtain-cta-heading
                className="mt-6 max-w-[8.5ch] text-balance text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.95] tracking-[0] text-white"
              >
                {headingWords.map((word, index) => (
                  <span
                    data-curtain-cta-heading-word
                    className="inline-block"
                    key={`${word}-${index}`}
                  >
                    {word}
                    {index === headingWords.length - 1 ? "" : "\u00a0"}
                  </span>
                ))}
              </h2>

              <p
                data-curtain-cta-subheading
                className="mt-7 max-w-[520px] text-balance text-base leading-relaxed text-white/62 sm:text-lg"
              >
                Get first access to Ontiver's reusable identity layer, product updates, private beta invites, and launch support for consent-led verification workflows.
              </p>
            </div>

            <div className="grid gap-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311]" />
                Beta access
              </span>
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311]" />
                API previews
              </span>
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311]" />
                Launch support
              </span>
            </div>
          </div>

          <div
            data-curtain-cta-input-row
            className="relative z-10 grid gap-7 rounded-[22px] border border-white/10 bg-[#04110b]/72 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-7 lg:p-9"
          >
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#70ff8a]">
                Waitlist request
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Tell us where to send your invite.
              </h3>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-white/55">
                Work email *
                <input
                  ref={inputRef}
                  className={`h-14 border-b bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 ${
                    error
                      ? "border-red-500/80"
                      : "border-white/20 focus:border-[#009311]"
                  }`}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white/55">
                Company
                <input
                  className="h-14 border-b border-white/20 bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#009311]"
                  placeholder="Company name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-white/55">
                What are you building?
                <input
                  className="h-14 border-b border-white/20 bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#009311]"
                  placeholder="Identity wallet, KYC, compliance, consent..."
                />
              </label>
            </div>

            <MagneticFillButton
              variant="green"
              className="mt-2 h-14 w-full rounded-lg px-8 text-sm font-semibold uppercase tracking-[0.22em] sm:h-16"
              onClick={submit}
            >
              {state === "joining" ? (
                <span className="inline-flex items-center">
                  Joining
                  <DotLoader />
                </span>
              ) : state === "joined" ? (
                <span className="inline-flex items-center gap-2">
                  <Check size={18} />
                  You're on the list!
                </span>
              ) : (
                "Request early access"
              )}
            </MagneticFillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
