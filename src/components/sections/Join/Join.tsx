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
    <section id="join" className="scroll-mt-24 bg-bg-light px-5 py-8 sm:px-6 sm:py-10">
      <motion.div
        className="relative mx-auto flex min-h-[390px] max-w-[1200px] items-center justify-center overflow-hidden rounded-[24px] bg-[#06170f] px-5 py-12 text-center text-white sm:min-h-[465px] sm:rounded-[28px] sm:px-6 sm:py-16 md:px-12"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-0 left-0 h-[52%] w-[36%] bg-[radial-gradient(circle_at_top_left,rgba(0,147,17,0.62),rgba(0,147,17,0.22)_42%,rgba(0,147,17,0)_72%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-[52%] w-[34%] bg-[radial-gradient(circle_at_bottom_right,rgba(0,147,17,0.56),rgba(0,147,17,0.2)_42%,rgba(0,147,17,0)_74%)]"
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute inset-x-0 bottom-[-72px] text-[clamp(7rem,18vw,16rem)] font-bold leading-none text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.06 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Ontiver
        </motion.span>

        <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AuroraBadge spanClassName="border border-white/70! bg-[#06170f]! px-8! py-2! text-base! font-medium! text-white/70!">
              Early Access
            </AuroraBadge>
          </motion.div>

          <motion.h2
            className="mt-5 text-balance text-[clamp(1.75rem,4vw,2.35rem)] font-semibold leading-[1.15] tracking-[0] text-white"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
          >
            Be among the first to use reusable identity
          </motion.h2>

          <motion.p
            className="mt-4 max-w-[640px] text-balance text-sm leading-relaxed text-white/60 sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.28, ease: "easeOut" }}
          >
            Join the waitlist for early access to Ontiver's personal identity wallet - verify once, control your data, and share with consent.
          </motion.p>

          <motion.div
            className="mt-8 flex w-full max-w-[760px] flex-col items-stretch gap-3 sm:mt-11 sm:flex-row"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
          >
            <div
              className={`flex min-w-0 flex-1 items-center rounded-full border bg-[#06170f]/75 transition-[border-color,background-color,box-shadow] focus-within:border-[#009311] focus-within:[box-shadow:0_0_0_3px_rgba(0,147,17,0.12)] ${
                error ? "border-red-500/80" : "border-[#009311]/80"
              }`}
            >
              <input
                ref={inputRef}
                className="h-14 min-w-0 flex-1 rounded-full bg-transparent px-5 text-base text-white outline-none placeholder:text-white/55 sm:h-16 sm:px-7 sm:text-lg"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <MagneticFillButton
              variant="green"
              className="h-14 shrink-0 rounded-full px-8 text-base font-semibold sm:h-16 sm:px-11 sm:text-lg"
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
                "Join Waitlist"
              )}
            </MagneticFillButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
