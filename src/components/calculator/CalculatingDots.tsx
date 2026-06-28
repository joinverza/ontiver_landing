import { motion } from "framer-motion";

export default function CalculatingDots() {
  return (
    <span className="inline-flex w-6 justify-start">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.span
          key={index}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 0.8,
            delay: index * 0.16,
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
