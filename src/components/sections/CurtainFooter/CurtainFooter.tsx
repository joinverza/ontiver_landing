import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Join from "../Join/Join";
import Footer from "../Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

function getEl<T extends HTMLElement>(root: HTMLElement, selector: string) {
  return root.querySelector<T>(selector);
}

function splitElementText(element: HTMLElement) {
  const text = element.textContent ?? "";
  element.textContent = "";

  return Array.from(text).map((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00a0" : char;
    span.style.display = "inline-block";
    span.dataset.footerSplitChar = "true";
    span.dataset.footerSplitIndex = String(index);
    element.appendChild(span);
    return span;
  });
}

export default function CurtainFooter() {
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const footerWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = ctaWrapperRef.current;
      if (!wrapper) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const cta = getEl<HTMLElement>(wrapper, "[data-curtain-cta]");
        const panel = getEl<HTMLElement>(wrapper, "[data-curtain-cta-panel]");
        const badge = getEl<HTMLElement>(wrapper, "[data-curtain-cta-badge]");
        const heading = getEl<HTMLElement>(
          wrapper,
          "[data-curtain-cta-heading]",
        );
        const subheading = getEl<HTMLElement>(
          wrapper,
          "[data-curtain-cta-subheading]",
        );
        const inputRow = getEl<HTMLElement>(
          wrapper,
          "[data-curtain-cta-input-row]",
        );
        const watermark = getEl<HTMLElement>(
          wrapper,
          "[data-curtain-cta-watermark]",
        );
        const leftDoor = getEl<HTMLElement>(wrapper, "[data-vault-door-left]");
        const rightDoor = getEl<HTMLElement>(wrapper, "[data-vault-door-right]");
        const centerLine = getEl<HTMLElement>(
          wrapper,
          "[data-vault-crack-line]",
        );
        const centerGlow = getEl<HTMLElement>(
          wrapper,
          "[data-vault-crack-glow]",
        );
        const leftGlow = getEl<HTMLElement>(
          wrapper,
          "[data-vault-left-shadow]",
        );
        const rightGlow = getEl<HTMLElement>(
          wrapper,
          "[data-vault-right-shadow]",
        );
        const headingWords = gsap.utils.toArray<HTMLElement>(
          wrapper.querySelectorAll("[data-curtain-cta-heading-word]"),
        );

        if (
          !cta ||
          !panel ||
          !badge ||
          !heading ||
          !subheading ||
          !inputRow ||
          !watermark ||
          !leftDoor ||
          !rightDoor ||
          !centerLine ||
          !centerGlow
        ) {
          return;
        }

        gsap.set(cta, {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "2vw",
          paddingRight: "2vw",
          paddingTop: "2vw",
          paddingBottom: "2vw",
        });
        gsap.set(panel, {
          width: "min(96vw, 1280px)",
          maxWidth: "1280px",
          minHeight: "min(84vh, 760px)",
          borderRadius: 28,
          backgroundColor: "#030A06",
          transformOrigin: "center center",
        });
        gsap.set([leftDoor, rightDoor], {
          display: "block",
          opacity: 1,
          xPercent: 0,
          scale: 1,
          borderRadius: 0,
          backgroundColor: "#030A06",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          willChange: "transform",
        });
        gsap.set(centerLine, {
          display: "block",
          opacity: 0.7,
          scaleY: 0,
          left: "50%",
          xPercent: -50,
          transformOrigin: "center center",
          top: 0,
          bottom: 0,
          backgroundColor: "#22C55E",
          boxShadow: "0 0 18px rgba(34,197,94,0.72)",
        });
        gsap.set(centerGlow, {
          display: "block",
          opacity: 0,
          scaleX: 0.3,
          left: "50%",
          xPercent: -50,
          width: "44%",
          top: 0,
          height: "100%",
          background:
            "radial-gradient(ellipse 280px 100% at 50% 50%, rgba(34,197,94,0.18) 0%, transparent 70%)",
          transformOrigin: "center center",
        });
        gsap.set([leftGlow, rightGlow], { opacity: 0, display: "block" });
        gsap.set([badge, subheading, inputRow], { opacity: 0, y: 16 });
        gsap.set(headingWords, { opacity: 0, y: 20 });
        gsap.set(heading, { opacity: 1, y: 0 });
        gsap.set(watermark, { opacity: 0, scale: 1 });

        const frameTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 82%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        frameTimeline
          .to(
            cta,
            {
              paddingLeft: 0,
              paddingRight: 0,
              ease: "none",
            },
            0,
          )
          .to(
            panel,
            {
              width: "100vw",
              maxWidth: "100vw",
              borderRadius: 0,
              ease: "none",
            },
            0,
          );

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            centerLine,
            {
              scaleY: 1,
              ease: "power2.out",
              duration: 0.25,
            },
            0,
          )
          .to(
            centerGlow,
            {
              opacity: 1,
              scaleX: 1,
              ease: "power1.out",
              duration: 0.25,
            },
            0,
          )
          .to(
            leftDoor,
            {
              xPercent: -100,
              ease: "power2.inOut",
              duration: 0.4,
            },
            0.25,
          )
          .to(
            rightDoor,
            {
              xPercent: 100,
              ease: "power2.inOut",
              duration: 0.4,
            },
            0.25,
          )
          .to(
            [leftGlow, rightGlow],
            {
              opacity: 0.5,
              ease: "power1.out",
              duration: 0.18,
            },
            0.25,
          )
          .to(
            [leftGlow, rightGlow],
            {
              opacity: 0,
              ease: "power2.in",
              duration: 0.25,
            },
            0.45,
          )
          .to(
            [centerLine, centerGlow],
            {
              opacity: 0,
              ease: "power2.in",
              duration: 0.15,
            },
            0.35,
          )
          .to(
            badge,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.14,
            },
            0.28,
          )
          .to(
            headingWords,
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "power3.out",
              duration: 0.2,
            },
            0.35,
          )
          .to(
            subheading,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.14,
            },
            0.48,
          )
          .to(
            inputRow,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.12,
            },
            0.56,
          )
          .to(
            watermark,
            {
              opacity: 0.05,
              ease: "none",
              duration: 0.2,
            },
            0.5,
          );

        return () => {
          frameTimeline.kill();
          timeline.kill();
          gsap.set(
            [
              cta,
              panel,
              badge,
              heading,
              subheading,
              inputRow,
              watermark,
              leftDoor,
              rightDoor,
              centerLine,
              centerGlow,
              leftGlow,
              rightGlow,
              ...headingWords,
            ],
            { clearProps: "all" },
          );
        };
      });

      return () => {
        media.revert();
      };
    },
    { scope: ctaWrapperRef },
  );

  useGSAP(
    () => {
      const wrapper = footerWrapperRef.current;
      if (!wrapper) return;

      const footer = getEl<HTMLElement>(wrapper, "[data-curtain-footer]");
      if (!footer) return;

      const logo = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-logo]",
      );
      const logoMark = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-logo-mark]",
      );
      const tagline = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-tagline]",
      );
      const bottom = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-bottom]",
      );
      const copyright = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-copyright]",
      );
      const dividerLeft = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-divider-left]",
      );
      const dividerRight = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-divider-right]",
      );
      const dividerFlash = getEl<HTMLElement>(
        wrapper,
        "[data-curtain-footer-divider-flash]",
      );
      const columns = gsap.utils.toArray<HTMLElement>(
        wrapper.querySelectorAll("[data-curtain-footer-column]"),
      );
      const columnHeadings = columns
        .map((column) => column.querySelector<HTMLElement>("h5"))
        .filter(Boolean) as HTMLElement[];
      const linksByColumn = columns.map((column) =>
        gsap.utils.toArray<HTMLElement>(
          column.querySelectorAll("[data-curtain-footer-link]"),
        ),
      );
      const allLinks = linksByColumn.flat();
      const socials = gsap.utils.toArray<HTMLElement>(
        wrapper.querySelectorAll("[data-curtain-footer-social]"),
      );

      const originalTaglineText = tagline?.textContent ?? "";
      const originalCopyrightText = copyright?.textContent ?? "";
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        if (!logo || !logoMark || !tagline || !bottom || !copyright) return;

        const taglineChars = splitElementText(tagline);
        const copyrightChars = splitElementText(copyright);
        const burialDepths = [80, 55, 70, 45];
        const riseDelays = [0.2, 0.28, 0.22, 0.35];
        const riseDurations = [0.6, 0.55, 0.65, 0.5];

        gsap.set(footer, { backgroundColor: "#0b2419" });
        gsap.set(logo, {
          opacity: 0,
          y: 60,
          scale: 0.94,
        });
        gsap.set(logoMark, {
          clipPath: "inset(0 100% 0 0)",
          transformOrigin: "left center",
        });
        gsap.set(taglineChars, { opacity: 0 });
        columns.forEach((column, index) => {
          gsap.set(column, {
            y: burialDepths[index % burialDepths.length],
            opacity: 0,
          });
        });
        gsap.set(columnHeadings, { y: 20, opacity: 0 });
        gsap.set(allLinks, { y: 16, x: 0, opacity: 0 });
        gsap.set([dividerLeft, dividerRight], { scaleX: 0, opacity: 1 });
        gsap.set(dividerLeft, { transformOrigin: "right center" });
        gsap.set(dividerRight, { transformOrigin: "left center" });
        gsap.set(dividerFlash, { x: "-100%", opacity: 0 });
        gsap.set(bottom, { y: 20, opacity: 0 });
        gsap.set(copyrightChars, { opacity: 0 });
        gsap.set(socials, {
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
        });

        const hoverHandlers = socials.map((icon) => {
          const handleEnter = () => {
            gsap.to(icon, {
              rotation: 12,
              duration: 0.1,
              ease: "power2.out",
              repeat: 1,
              yoyo: true,
              overwrite: "auto",
            });
          };

          icon.addEventListener("mouseenter", handleEnter);
          return () => icon.removeEventListener("mouseenter", handleEnter);
        });

        let logoBreathe: gsap.core.Tween | null = null;
        let flashCall: gsap.core.Tween | null = null;
        let flashTween: gsap.core.Tween | null = null;

        const flashLoop = () => {
          if (!dividerFlash) return;

          flashTween = gsap.fromTo(
            dividerFlash,
            { x: "-100%", opacity: 0.5 },
            {
              x: "100%",
              opacity: 0,
              duration: 0.5,
              ease: "power1.inOut",
              onComplete: () => {
                flashCall = gsap.delayedCall(8, flashLoop);
              },
            },
          );
        };

        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            logoBreathe = gsap.to(logoMark, {
              scale: 1.015,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              transformOrigin: "left center",
            });
            flashCall = gsap.delayedCall(8, flashLoop);
          },
        });

        footerTl
          .to(
            footer,
            {
              backgroundColor: "#06160f",
              duration: 0.8,
              ease: "power1.out",
            },
            0,
          )
          .to(
            logo,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            0.1,
          )
          .to(
            logoMark,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.45,
              ease: "power2.out",
            },
            0.2,
          )
          .to(
            taglineChars,
            {
              opacity: 1,
              duration: 0.3,
              ease: "none",
              stagger: 0.022,
            },
            0.55,
          );

        columns.forEach((column, index) => {
          const delay = riseDelays[index % riseDelays.length];
          const duration = riseDurations[index % riseDurations.length];
          const heading = column.querySelector<HTMLElement>("h5");
          const links = linksByColumn[index];

          footerTl
            .to(
              column,
              {
                y: 0,
                opacity: 1,
                duration,
                ease: "power3.out",
              },
              delay,
            )
            .to(
              heading,
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              },
              delay + 0.08,
            )
            .to(
              links,
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.055,
              },
              delay + 0.18,
            );
        });

        footerTl
          .to(
            dividerLeft,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.65,
          )
          .to(
            dividerRight,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0.65,
          )
          .fromTo(
            dividerFlash,
            { x: "-100%", opacity: 0.6 },
            {
              x: "100%",
              opacity: 0,
              duration: 0.35,
              ease: "power1.inOut",
            },
            1.1,
          )
          .to(
            bottom,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            0.85,
          )
          .to(
            copyrightChars,
            {
              opacity: 1,
              duration: 0.25,
              ease: "none",
              stagger: 0.012,
            },
            0.9,
          )
          .to(
            socials,
            {
              scale: 1,
              opacity: 0.75,
              duration: 0.4,
              ease: "back.out(2.8)",
              stagger: 0.06,
            },
            0.95,
          )
          .to(
            socials,
            {
              keyframes: [
                { scale: 1.08, duration: 0.1, ease: "power1.out" },
                { scale: 1, duration: 0.15, ease: "power2.in" },
              ],
              stagger: 0.06,
            },
            1.2,
          );

        return () => {
          footerTl.kill();
          logoBreathe?.kill();
          flashCall?.kill();
          flashTween?.kill();
          hoverHandlers.forEach((removeHandler) => removeHandler());
          tagline.textContent = originalTaglineText;
          copyright.textContent = originalCopyrightText;
          gsap.set(
            [
              footer,
              logo,
              logoMark,
              tagline,
              bottom,
              copyright,
              dividerLeft,
              dividerRight,
              dividerFlash,
              ...columns,
              ...columnHeadings,
              ...allLinks,
              ...socials,
            ],
            { clearProps: "all" },
          );
        };
      });

      return () => {
        media.revert();
      };
    },
    { scope: footerWrapperRef },
  );

  return (
    <>
      <div
        ref={ctaWrapperRef}
        data-section-reveal="off"
        className="relative isolate bg-bg-light"
      >
        <Join />
      </div>
      <div
        ref={footerWrapperRef}
        data-section-reveal="off"
        className="relative bg-[#06160f]"
      >
        <Footer />
      </div>
    </>
  );
}
