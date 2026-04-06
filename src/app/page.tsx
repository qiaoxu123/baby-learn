"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initAudio, playClickSound, playTTS } from "@/lib/audio";
import { getTotalStars } from "@/lib/progress";
import CatMascot from "@/components/characters/CatMascot";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

const modules = [
  {
    href: "/english/abc",
    icon: "🔤",
    title: "ABC",
    subtitle: "学字母",
    gradient: "from-orange-300 to-amber-400",
    borderColor: "border-orange-200",
    delay: 0.1,
  },
  {
    href: "/english/vocab",
    icon: "🐾",
    title: "Words",
    subtitle: "学单词",
    gradient: "from-green-300 to-emerald-400",
    borderColor: "border-green-200",
    delay: 0.2,
  },
  {
    href: "/poetry",
    icon: "📜",
    title: "古诗",
    subtitle: "学古诗",
    gradient: "from-purple-300 to-violet-400",
    borderColor: "border-purple-200",
    delay: 0.3,
  },
  {
    href: "/rewards",
    icon: "🏆",
    title: "奖励",
    subtitle: "我的成就",
    gradient: "from-yellow-300 to-orange-400",
    borderColor: "border-yellow-200",
    delay: 0.4,
  },
];

export default function HomePage() {
  const [stars, setStars] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAudio();
    setStars(getTotalStars());
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center select-none relative overflow-hidden">
      <NatureBackground />

      {/* Header area */}
      <motion.div
        className="text-center mb-6 z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Mascots */}
        <div className="flex items-end justify-center gap-2 mb-2">
          <CatMascot size={90} expression="happy" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl mb-8"
          >
            ❤️
          </motion.div>
          <DogMascot size={90} expression="happy" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
          Baby Learn
        </h1>
        <p className="text-lg text-amber-700/70 mt-0.5 font-medium">宝宝学习乐园</p>

        {/* Star counter */}
        {stars > 0 && (
          <motion.div
            className="mt-2 inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md border border-amber-200"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl">⭐</span>
            <span className="text-lg font-bold text-amber-600">{stars}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Module cards */}
      <div className="grid grid-cols-2 gap-4 max-w-sm w-full z-10 px-4">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href}>
            <motion.div
              className={`bg-white/90 backdrop-blur-sm rounded-3xl p-5 text-center shadow-lg border-2 ${mod.borderColor} cursor-pointer min-h-[130px] flex flex-col items-center justify-center relative overflow-hidden`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: mod.delay,
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                playClickSound();
                playTTS(mod.title, mod.title === "古诗" || mod.title === "奖励" ? "zh-CN" : "en-US");
              }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${mod.gradient} rounded-t-3xl`} />

              <div className="text-4xl mb-2 mt-1">{mod.icon}</div>
              <div className="text-lg font-bold text-gray-700">{mod.title}</div>
              <div className="text-xs text-gray-400 font-medium">{mod.subtitle}</div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Parent settings */}
      <motion.div
        className="mt-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          href="/settings"
          className="text-sm text-amber-600/40 hover:text-amber-600/70 transition bg-white/50 rounded-full px-4 py-1.5"
        >
          👨‍👩‍👧 家长设置
        </Link>
      </motion.div>
    </main>
  );
}
