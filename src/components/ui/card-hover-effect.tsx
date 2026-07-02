import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type HoverEffectItem = {
  image: string;
  title: string;
  description: string;
};

type HoverEffectProps = {
  items: HoverEffectItem[];
  isInView?: boolean;
  className?: string;
  enableHover?: boolean;
};

const cardEase: [number, number, number, number] = [0.2, 0, 0, 1];

export default function HoverEffect({
  items,
  isInView = true,
  className = "",
  enableHover = true,
}: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatePresence>
      <motion.div
        layout
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`}
        onMouseLeave={() => {
          if (enableHover) setHoveredIndex(null);
        }}
      >
        {items.map((item, index) => (
          <motion.div
            data-hover-card
            key={item.title}
            className={`relative block h-full rounded-3xl p-2 ${
              enableHover ? "group" : ""
            }`}
            onMouseEnter={() => {
              if (enableHover) setHoveredIndex(index);
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
              duration: 0.5,
              ease: cardEase,
              delay: 0.4 + index * 0.1,
            }}
          >
            {enableHover && hoveredIndex === index ? (
              <motion.span
                className="pointer-events-none absolute inset-0 block h-full w-full rounded-3xl"
                style={{ background: "rgba(34, 197, 94, 0.15)" }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
            ) : null}

            <div
              className={`relative z-20 h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white ${
                enableHover
                  ? "transition-colors duration-200 group-hover:border-[#009311]/70"
                  : ""
              }`}
            >
              <div className="relative h-[170px] w-full overflow-hidden sm:h-[220px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`h-full w-full object-cover saturate-[0.85] contrast-[1.05] ${
                    enableHover
                      ? "transition-transform duration-500 ease-out group-hover:scale-105"
                      : ""
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#002d0e]/55 opacity-60 ${
                    enableHover
                      ? "transition-opacity duration-300 group-hover:opacity-85"
                      : ""
                  }`}
                />
              </div>

              <div className="p-5">
                <h4
                  className={`mb-2 text-lg font-semibold text-gray-900 ${
                    enableHover
                      ? "transition-colors duration-150 group-hover:text-[#007D21]"
                      : ""
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
