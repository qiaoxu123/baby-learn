"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { playClickSound } from "@/lib/audio";

export default function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="fixed top-4 left-4 z-50 w-14 h-14 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-2xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => playClickSound()}
      >
        🏠
      </motion.div>
    </Link>
  );
}
