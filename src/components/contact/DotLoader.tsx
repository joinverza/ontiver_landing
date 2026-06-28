import { motion } from "framer-motion";

export default function DotLoader() {
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
