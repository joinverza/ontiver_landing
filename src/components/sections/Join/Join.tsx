import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Check } from "lucide-react";
import Text from "../../base/Text";
import MagneticFillButton from "../../ui/MagneticFillButton";
import { joinWaitlist } from "../../../lib/landingApi";

type JoinState = "idle" | "joining" | "joined" | "error";

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
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
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
    setErrorMessage("");
    try {
      await joinWaitlist(email);
      setState("joined");
    } catch (submitError) {
      setState("error");
      setErrorMessage(
        submitError instanceof Error
          ? submitError.message
          : "We could not join the waitlist. Please try again."
      );
    }
  };

  return (
    <section
      id="join"
      data-curtain-cta
      className="scroll-mt-24 px-0 py-0"
    >
      <div
        data-curtain-cta-panel
        className="relative mx-auto flex min-h-[560px] max-w-[1280px] items-stretch overflow-hidden rounded-t-[24px] bg-[#000a03] text-left text-[#06160f] lg:rounded-[28px]"
      >
        <div
          data-vault-cta-grid-bg
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />
        <div
          data-vault-cta-glow-left
          className="pointer-events-none absolute top-0 left-0 h-[52%] w-[22%]"
          aria-hidden="true"
        />
        <div
          data-vault-cta-glow-right
          className="pointer-events-none absolute right-0 bottom-0 h-[52%] w-[28%]"
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
          className="pointer-events-none absolute -bottom-32 z-[1] left-32 text-[clamp(7rem,20vw,17rem)] font-bold uppercase leading-none text-white/[0.45]"
        >
          Ontiver
        </span>

        <div className="relative z-10 grid w-full gap-7 px-[clamp(1.25rem,4.5vw,4.25rem)] py-[clamp(11rem,7vw,10.25rem)] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-center">
          <div className="flex min-h-full flex-col justify-between gap-8">
            <div>
              <div
                data-curtain-cta-heading
                className="max-w-[560px]"
              >
                <Text
                  btext=""
                  heading="Join the Ontiver waitlist"
                  animate={false}
                  color="#fff"
                  containerClassName="items-start gap-0 pb-0"
                  headingClassName="mx-0 max-w-[12ch] !text-left text-[clamp(2.45rem,3.7vw,6.65rem)] font-medium !leading-[1.04] tracking-[0.01em]"
                />
              </div>
              <p
                data-curtain-cta-subheading
                className="max-w-[500px] text-balance text-[clamp(0.82rem,1vw,0.98rem)] leading-[1.28] text-white"
              >
                Get first access to reusable identity workflows, private beta
                invites, product updates, and launch support for consent-led
                verification.
              </p>
            </div>

            <div className="grid gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311] rounded-full" />
                Early beta
              </span>
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311] rounded-full" />
                API previews
              </span>
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-[#009311] rounded-full" />
                Launch support
              </span>
            </div>
          </div>

          <div
            data-curtain-cta-input-row
            className="relative z-10 grid gap-6 p-0"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#22C55E]">
                Access request
              </p>
              <h3 className="mt-3 max-w-[24ch] text-[clamp(1.2rem,1.65vw,1.65rem)] font-medium leading-tight text-white">
                Tell us where to send your invite.
              </h3>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-1 text-[clamp(0.95rem,1.05vw,1.08rem)] font-normal text-white/60">
                Your email *
                <input
                  ref={inputRef}
                  className={`h-11 border-b bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 ${error
                    ? "border-red-500/80"
                    : "border-white/20 focus:border-[#22C55E]"
                    }`}
                  placeholder=""
                  // value={email}
                  // onChange={(event) => setEmail(event.target.value)}

                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (state === "error") setState("idle");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") void submit();
                  }}
                />
              </label>
              <label className="grid gap-1 text-[clamp(0.95rem,1.05vw,1.08rem)] font-normal text-white/60">
                Company
                <input
                  className="h-11 border-b border-white/20 bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#22C55E]"
                  placeholder=""
                />
              </label>
              <label className="grid gap-1 text-[clamp(0.95rem,1.05vw,1.08rem)] font-normal text-white/60">
                What identity workflow do you need?
                <input
                  className="h-11 border-b border-white/20 bg-transparent text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#22C55E]"
                  placeholder=""
                />
              </label>

              <MagneticFillButton
                variant="green"
                className="mt-2 h-13 w-full px-7 text-xs font-semibold uppercase tracking-[0.28em] rounded-2xl"
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
          {errorMessage ? (
            <p className="mt-3 text-sm text-red-300" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
