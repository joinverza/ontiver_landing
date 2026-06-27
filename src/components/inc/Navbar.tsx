import { useState, useEffect } from "react";
import MagneticFillButton from "../ui/MagneticFillButton";

const Navlinks = [
  { name: "Home", ref: "/" },
  { name: "Use Cases", ref: "#cases" },
  { name: "Pricing", ref: "#pricing" },
  { name: "Resources/Blogs", ref: "/blog" },
  { name: "Contact", ref: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-10 left-0 w-full z-[100] flex justify-center"
      style={{ pointerEvents: "none" }}
    >
      {/* Morphing bar */}
      <div
        style={{
          width: isScrolled ? "min(1000px, calc(100vw - 48px))" : "48px",
          height: "62px",
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? "scale(1)" : "scale(0.5)",
          borderRadius: "25px",
          backgroundColor: "white",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          overflow: "hidden",
          pointerEvents: isScrolled ? "auto" : "none",
          transition: isScrolled
            ? [
                "opacity 200ms ease-in",
                "transform 200ms ease-in",
                "width 500ms cubic-bezier(0.4, 0, 0.2, 1) 150ms",
              ].join(", ")
            : [
                "opacity 150ms ease-out 250ms",
                "transform 150ms ease-out 250ms",
                "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              ].join(", "),
        }}
      >
        <div className="h-full px-8 flex justify-between items-center">
          {/* Logo — fades in first at 300ms */}
          <div
            style={{
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 200ms ease, transform 200ms ease",
              transitionDelay: isScrolled ? "300ms" : "0ms",
              flexShrink: 0,
            }}
          >
            <img src="./assets/logo.svg" alt="logo" className="h-6" />
          </div>

          {/* Nav Links — staggered fade-in, each 60ms apart starting at 400ms */}
          <div className="hidden md:flex gap-8 shrink-0">
            {Navlinks.map((link, idx) => (
              <a
                key={idx}
                href={link.ref}
                className="text-black/80 hover:text-[#009311] font-medium text-sm whitespace-nowrap"
                style={{
                  opacity: isScrolled ? 1 : 0,
                  transform: isScrolled ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 200ms ease, transform 200ms ease, color 200ms ease",
                  transitionDelay: isScrolled ? `${400 + idx * 60}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button — fades in last */}
          <div
            style={{
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 200ms ease, transform 200ms ease",
              transitionDelay: isScrolled ? "600ms" : "0ms",
              flexShrink: 0,
            }}
          >
            <MagneticFillButton
              variant="green"
              className="py-2.5 px-6 rounded-full font-medium text-sm shadow-md"
            >
              Join Waitlist
            </MagneticFillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
