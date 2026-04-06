"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StarBurstProps {
  show: boolean;
  count?: number;
}

export default function StarBurst({ show, count = 1 }: StarBurstProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stars flying out */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 150,
                y: Math.sin((i * Math.PI * 2) / 8) * 150,
                rotate: [0, 360],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Center text */}
          <motion.div
            className="text-6xl font-bold text-yellow-400 drop-shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {count === 3 ? "🌟🌟🌟" : count === 2 ? "🌟🌟" : "🌟"}
          </motion.div>

          {/* Great job text */}
          <motion.div
            className="absolute bottom-1/3 text-3xl font-bold text-pink-500 drop-shadow"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            棒棒的! Great!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
