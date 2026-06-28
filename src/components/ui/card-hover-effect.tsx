import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type HoverEffectItem = {
  image: string;
  title: string;
  description: string;
};

type HoverEffectProps = {
  items: HoverEffectItem[];
};

export default function HoverEffect({ items }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="group relative block h-full rounded-3xl p-2"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index ? (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl"
                style={{ background: "rgba(34, 197, 94, 0.06)" }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            ) : null}
          </AnimatePresence>

          <div className="relative z-20 h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-colors duration-200 group-hover:border-[#009311]/30">
            <div className="relative h-[220px] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#002d0e]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="p-5">
              <h4 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-150 group-hover:text-[#007D21]">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
