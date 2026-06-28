import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/navigation";
import MagneticFillButton from "./ui/MagneticFillButton";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onJoinClick: () => void;
};

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  onJoinClick,
}: MobileMenuProps) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {mobileMenuOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-[198] bg-[#05150E]/35 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            className="fixed inset-3 z-[199] flex flex-col overflow-hidden rounded-[28px] border border-[#00291b]/10 bg-[#f1f4ef] text-[#05150E] shadow-[0_24px_90px_rgba(0,41,27,0.28)] md:hidden"
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(160% at calc(100% - 2.5rem) 2.5rem)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
            }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(0,147,17,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(0,147,17,0.65)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,147,17,0.12),transparent_36%),linear-gradient(315deg,rgba(0,41,27,0.10),transparent_42%)]" />

            <div className="relative z-10 flex items-center justify-between border-b border-[#00291b]/10 bg-white/75 p-5 backdrop-blur-xl">
              <Link
                to="/"
                className="flex items-center"
                aria-label="Ontiver home"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/assets/logo.svg" alt="Ontiver" className="h-7" />
              </Link>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#00291b]/10 bg-[#f7fff7] text-[#05150E] shadow-sm transition-colors duration-200 hover:border-[#009311]/35 hover:text-[#009311]"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative z-10 border-b border-[#00291b]/10 bg-white/45 p-5">
              <p className="inline-flex rounded-full border border-[#009311]/25 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#009311]">
                Menu
              </p>
              <p className="mt-3 max-w-[16rem] text-2xl font-semibold leading-tight text-[#05150E]">
                Verify once. Use everywhere.
              </p>
            </div>

            <div className="relative z-10 flex flex-1 flex-col gap-3 overflow-y-auto p-5">
              {navLinks.map((item, index) => {
                const isActive =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block outline-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      className={`group relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 shadow-sm transition-all duration-200 ${
                        isActive
                          ? "border-[#009311]/35 bg-[#f8fff8] text-[#009311]"
                          : "border-[#00291b]/10 bg-white/70 text-[#05150E] hover:-translate-y-0.5 hover:border-[#009311]/25 hover:bg-white"
                      }`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.16 + index * 0.05, duration: 0.35 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <span
                        className={`mr-4 h-2.5 w-2.5 shrink-0 rounded-full ${
                          isActive
                            ? "bg-[#009311] shadow-[0_0_0_5px_rgba(0,147,17,0.10)]"
                            : "bg-[#00291b]/20 group-hover:bg-[#009311]/70"
                        }`}
                      />
                      <div className="relative z-10 min-w-0 flex-1">
                        <span
                          className={`block text-sm font-bold uppercase tracking-widest ${
                            isActive ? "text-[#009311]" : "text-[#05150E]"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="mt-1 block text-[11px] font-medium text-[#05150E]/45">
                          {item.description}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className={`relative z-10 shrink-0 ${
                          isActive
                            ? "text-[#009311]"
                            : "text-[#05150E]/35 group-hover:text-[#009311]"
                        }`}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="relative z-10 border-t border-[#00291b]/10 bg-white/65 p-5 backdrop-blur-xl">
              <MagneticFillButton
                type="button"
                variant="green"
                className="h-12 w-full rounded-2xl text-sm font-bold shadow-[0_14px_30px_rgba(0,147,17,0.20)]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onJoinClick();
                }}
              >
                Join Waitlist
              </MagneticFillButton>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
