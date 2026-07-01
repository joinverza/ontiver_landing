import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactField from "../components/contact/ContactField";
import DotLoader from "../components/contact/DotLoader";
import SplitHeading from "../components/contact/SplitHeading";
import Footer from "../components/sections/Footer/Footer";
import Join from "../components/sections/Join/Join";
import MagneticFillButton from "../components/ui/MagneticFillButton";
import { sendContactRequest } from "../lib/landingApi";
import {
  contactFields,
  contactHeading,
  contactInitialValues,
  contactRows,
  contactSocialIcons,
  type ContactFormField,
} from "../data/contact";

gsap.registerPlugin(ScrollTrigger);

type SendState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(contactInitialValues);
  const [focusedField, setFocusedField] = useState<ContactFormField | null>(null);
  const [visitedFields, setVisitedFields] =
    useState<Set<ContactFormField>>(new Set());
  const [sweepField, setSweepField] = useState<ContactFormField | null>(null);
  const [missingFields, setMissingFields] =
    useState<Set<ContactFormField>>(new Set());
  const [sendState, setSendState] = useState<SendState>("idle");
  const [submitError, setSubmitError] = useState("");

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root || !leftPanelRef.current || !rightPanelRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(".contact-info-row");
      const socials = gsap.utils.toArray<HTMLElement>(".contact-social-icon");
      const fieldsEls = gsap.utils.toArray<HTMLElement>(".contact-form-field");
      const formButton = root.querySelector(".contact-submit-button");

      gsap.set(leftPanelRef.current, { opacity: 0, x: -36, scale: 0.97 });
      gsap.set(rightPanelRef.current, { opacity: 0, x: 36, scale: 0.97 });
      gsap.set(".contact-title-clip", { yPercent: 100, opacity: 0 });
      gsap.set(".contact-subtitle", { opacity: 0, y: 8 });
      gsap.set(rows, { opacity: 0, x: -12 });
      gsap.set(socials, { opacity: 0, scale: 0 });
      gsap.set(fieldsEls, { opacity: 0, y: 10 });
      gsap.set(".contact-field-line", { scaleX: 0 });
      gsap.set(formButton, { opacity: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      });

      timeline
        .to(leftPanelRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        })
        .to(
          rightPanelRef.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "<0.1"
        )
        .to(".contact-title-clip", {
          yPercent: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(".contact-subtitle", { opacity: 1, y: 0, duration: 0.22 }, "+=0.05")
        .to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.08,
          ease: "power2.out",
        })
        .to(socials, {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          stagger: 0.06,
          ease: "back.out(2)",
        })
        .to(
          fieldsEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.06,
            ease: "power2.out",
          },
          "<-0.2"
        )
        .to(
          ".contact-field-line",
          {
            scaleX: 1,
            duration: 0.25,
            stagger: 0.06,
            ease: "power2.out",
          },
          "<"
        )
        .to(formButton, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });

      return () => {
        timeline.kill();
      };
    },
    { scope: sectionRef }
  );

  const setFieldValue = (field: ContactFormField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setMissingFields((current) => {
      if (!current.has(field)) return current;
      const next = new Set(current);
      next.delete(field);
      return next;
    });
  };

  const focusField = (field: ContactFormField) => {
    setFocusedField(field);
    if (visitedFields.has(field)) return;
    setVisitedFields((current) => new Set(current).add(field));
    setSweepField(field);
    window.setTimeout(() => setSweepField(null), 320);
  };

  const submitRequest = async () => {
    if (sendState === "sending") return;
    const missing = contactFields
      .map((field) => field.key)
      .filter((field) => !values[field].trim());

    if (missing.length) {
      setMissingFields(new Set(missing));
      if (rightPanelRef.current) {
        gsap.fromTo(
          rightPanelRef.current,
          { x: 0 },
          {
            x: -6,
            duration: 0.07,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => gsap.set(rightPanelRef.current, { x: 0 }),
          }
        );
      }
      window.setTimeout(() => setMissingFields(new Set()), 420);
      return;
    }

    setSendState("sending");
    setSubmitError("");
    try {
      await sendContactRequest({
        name: values.firstName,
        email: values.email,
        subject: `Website inquiry from ${values.companyName}`,
        message: `${values.message}\n\nCompany: ${values.companyName}\nCompany size: ${values.companySize}`,
      });
      setSendState("sent");
    } catch (error) {
      setSendState("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please try again."
      );
    }
  };

  return (
    <main className="relative overflow-hidden bg-bg-light text-black">
      <section className="relative z-10 bg-[#f1f4ef] px-5 pb-14 pt-[120px] sm:px-6 sm:pb-16 sm:pt-[150px]">
        {/* Animated Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] animate-grid-move"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        ></div>
        <motion.button
          className="absolute left-5 top-[92px] inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm font-semibold text-black/60 backdrop-blur-sm transition-colors duration-150 hover:text-black sm:left-6 sm:top-[118px] md:left-20"
          type="button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ArrowLeft size={15} />
          Back
        </motion.button>

        <div className="mx-auto max-w-[760px] text-center">
          <SplitHeading
            text={contactHeading}
            className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,9vw,3.5rem)] font-bold leading-[1.08] tracking-[0] text-[#05150E]"
          />
          <motion.p
            className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-[#6B7280]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.62, ease: [0.4, 0, 0.2, 1] }}
          >
            Whether you're launching a fintech, scaling a marketplace, or designing a compliance workflow, our team can help you choose the right identity solution.
          </motion.p>
        </div>
      </section>

      <section ref={sectionRef} className="relative z-10 px-5 pb-16 sm:px-6 sm:pb-20">
        <div
          className={`mx-auto grid max-w-[1020px] items-stretch gap-5 transition-opacity duration-300 lg:grid-cols-[0.78fr_1.22fr] ${sendState === "sending" ? "opacity-90" : "opacity-100"
            }`}
        >
          <motion.div
            ref={leftPanelRef}
            className="group relative overflow-hidden rounded-2xl bg-[#0A2818] p-6 text-white sm:p-8 md:p-10"
            whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.2 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:52px_52px] animate-[contact-panel-grid_12s_linear_infinite]" />
            <span className="pointer-events-none absolute -left-20 top-12 h-48 w-48 rounded-full bg-[#009311]/15 blur-2xl transition-transform duration-500 group-hover:translate-x-8 group-hover:scale-125" />
            <div className="relative z-10">
              <div className="overflow-hidden">
                <h2 className="contact-title-clip text-lg font-bold">
                  Contact Information
                </h2>
              </div>
              <p className="contact-subtitle mt-2 inline-flex items-center gap-2 text-[13px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#23d838] animate-[contact-live-pulse_1.5s_ease-in-out_infinite]" />
                Say something to start a live chat!
              </p>

              <div className="mt-8 space-y-5">
                {contactRows.map((row) => (
                  <motion.div
                    key={row.label}
                    className="contact-info-row group/row flex items-start gap-4 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-white/[0.04]"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <img
                      src={row.icon}
                      alt=""
                      className="mt-0.5 h-4 w-4 opacity-80 brightness-0 invert transition-opacity duration-150 group-hover/row:opacity-100"
                    />
                    <p className="text-sm leading-relaxed text-white/85 transition-colors duration-150 group-hover/row:text-white">
                      {row.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9 flex gap-3">
                {contactSocialIcons.map((social) => (
                  <a
                    key={social.label}
                    className="contact-social-icon grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] transition-colors duration-150 hover:bg-white/[0.15]"
                    aria-label={social.label}
                    href={social.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <img
                      src={social.icon}
                      alt=""
                      className="h-4 w-4 brightness-0 invert transition-transform duration-150 hover:scale-[1.15]"
                    />
                  </a>
                ))}
              </div>
            </div>

            <span className="pointer-events-none absolute bottom-4 left-6 text-[72px] font-bold leading-none text-white/[0.04] sm:left-8 sm:text-[92px] md:text-[140px]">
              Ontiver
            </span>
            <svg
              className="pointer-events-none absolute -bottom-16 -right-14 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px]"
              viewBox="0 0 230 230"
              fill="none"
              aria-hidden="true"
            >
              <motion.circle
                cx="116"
                cy="116"
                r="88"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.circle
                cx="116"
                cy="116"
                r="58"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
              />
            </svg>
          </motion.div>

          <motion.form
            ref={rightPanelRef}
            className="relative overflow-hidden rounded-2xl border border-[#00291b]/12 bg-white/90 p-6 backdrop-blur-xl sm:p-8 md:p-10"
            whileHover={{ y: -6, rotateX: 1.1, rotateY: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onSubmit={(event) => {
              event.preventDefault();
              void submitRequest();
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,147,17,0.5),transparent)]" />
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#009311]/[0.06] blur-2xl" />
            <div className="grid gap-x-9 gap-y-8 md:grid-cols-2">
              {contactFields.map((field) => (
                <ContactField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  focused={focusedField === field.key}
                  missing={missingFields.has(field.key)}
                  swept={sweepField === field.key}
                  onChange={(event) => setFieldValue(field.key, event.target.value)}
                  onFocus={() => focusField(field.key)}
                  onBlur={() => setFocusedField(null)}
                />
              ))}
            </div>

            <motion.div className="contact-submit-button mt-10 inline-flex w-full sm:w-auto" whileTap={{ scale: 0.97 }}>
              <MagneticFillButton
                variant="green"
                className="h-11 w-full rounded-lg px-5 text-sm font-semibold sm:w-[166px]"
                type="submit"
              >
                {sendState === "sending" ? (
                  <span className="inline-flex items-center">
                    Sending
                    <DotLoader />
                  </span>
                ) : sendState === "sent" ? (
                  <span className="inline-flex items-center gap-2">
                    <Check size={15} />
                    Request Sent!
                  </span>
                ) : (
                  "Submit Request"
                )}
              </MagneticFillButton>
            </motion.div>
            {submitError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}
          </motion.form>
        </div>
      </section>

      <div className="relative z-10">
        <Join />
      </div>

      <Footer />
    </main>
  );
}
