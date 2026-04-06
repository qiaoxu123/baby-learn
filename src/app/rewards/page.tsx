"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTotalStars } from "@/lib/progress";
import { playClickSound } from "@/lib/audio";
import BackButton from "@/components/BackButton";
import CatMascot from "@/components/characters/CatMascot";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

const BADGES = [
  { id: "abc-5", title: "字母新手", icon: "🔤", requirement: 2, color: "#FF9800" },
  { id: "abc-all", title: "字母大师", icon: "🏅", requirement: 8, color: "#F44336" },
  { id: "vocab-1", title: "小小探险家", icon: "🐾", requirement: 4, color: "#4CAF50" },
  { id: "vocab-all", title: "单词王者", icon: "👑", requirement: 12, color: "#9C27B0" },
  { id: "poem-1", title: "小诗人", icon: "📜", requirement: 6, color: "#2196F3" },
  { id: "poem-all", title: "诗词达人", icon: "🎓", requirement: 16, color: "#E91E63" },
  { id: "star-10", title: "闪耀之星", icon: "⭐", requirement: 10, color: "#FFC107" },
  { id: "star-50", title: "超级明星", icon: "🌟", requirement: 50, color: "#FF5722" },
];

const STICKER_SETS = [
  { name: "动物朋友", stickers: ["🐱", "🐶", "🐰", "🐼", "🦁", "🐯", "🐮", "🐷", "🐸", "🦊"] },
  { name: "美味水果", stickers: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍑", "🍒", "🥝", "🍍"] },
  { name: "交通工具", stickers: ["🚗", "🚌", "🚁", "🚂", "🚀", "⛵", "🚲", "✈️", "🛸", "🚜"] },
  { name: "大自然", stickers: ["🌸", "🌻", "🌈", "⭐", "🌙", "☀️", "🦋", "🐝", "🌊", "🍀"] },
];

export default function RewardsPage() {
  const [stars, setStars] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [tappedSticker, setTappedSticker] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = getTotalStars();
    setStars(s);
    setUnlockedCount(Math.min(40, Math.floor(s / 2) + 3));
  }, []);

  if (!mounted) return null;

  let stickerIndex = 0;

  return (
    <main className="min-h-screen flex flex-col items-center p-6 select-none pb-20">
      <NatureBackground />
      <BackButton />

      {/* Header with mascots */}
      <div className="mt-14 mb-4 flex items-end gap-4 z-10">
        <CatMascot size={60} />
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="text-5xl mb-1">🏆</div>
          <div className="text-3xl font-extrabold text-amber-600">{stars}</div>
          <div className="text-sm text-amber-500/70">我的星星</div>
        </motion.div>
        <DogMascot size={60} />
      </div>

      {/* Badges section */}
      <div className="w-full max-w-sm z-10 mb-6">
        <h2 className="text-lg font-bold text-gray-600 mb-3 text-center">成就徽章</h2>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((badge, i) => {
            const unlocked = stars >= badge.requirement;
            return (
              <motion.div
                key={badge.id}
                className={`relative flex flex-col items-center p-2 rounded-2xl ${
                  unlocked
                    ? "bg-white/90 shadow-lg border-2"
                    : "bg-white/40 border-2 border-dashed border-gray-200"
                }`}
                style={unlocked ? { borderColor: badge.color + "66" } : {}}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileTap={unlocked ? { scale: 0.9, rotate: 10 } : {}}
                onClick={() => unlocked && playClickSound()}
              >
                {/* Crown for unlocked */}
                {unlocked && (
                  <motion.div
                    className="absolute -top-2 text-sm"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    👑
                  </motion.div>
                )}
                <div className={`text-2xl mt-1 ${unlocked ? "" : "grayscale opacity-30"}`}>
                  {badge.icon}
                </div>
                <div className={`text-[10px] mt-1 text-center font-medium ${unlocked ? "text-gray-700" : "text-gray-400"}`}>
                  {badge.title}
                </div>
                {!unlocked && (
                  <div className="text-[9px] text-gray-300">
                    {badge.requirement}⭐
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticker book */}
      {STICKER_SETS.map((set, setIdx) => {
        return (
          <div key={setIdx} className="w-full max-w-sm mb-5 z-10">
            <h2 className="text-sm font-bold text-gray-500 mb-2 text-center">
              {set.name}
            </h2>
            <div className="grid grid-cols-5 gap-2.5">
              {set.stickers.map((sticker, i) => {
                const globalIdx = stickerIndex++;
                const unlocked = globalIdx < unlockedCount;

                return (
                  <motion.div
                    key={`${setIdx}-${i}`}
                    className={`aspect-square rounded-xl flex items-center justify-center text-2xl cursor-pointer ${
                      unlocked
                        ? "bg-white/90 shadow-md border border-amber-200"
                        : "bg-white/30 border border-dashed border-gray-200"
                    }`}
                    whileTap={unlocked ? { scale: 0.8, rotate: 15 } : {}}
                    animate={
                      tappedSticker === `${setIdx}-${i}`
                        ? { scale: [1, 1.4, 1], rotate: [0, 360] }
                        : {}
                    }
                    onClick={() => {
                      if (unlocked) {
                        playClickSound();
                        setTappedSticker(`${setIdx}-${i}`);
                        setTimeout(() => setTappedSticker(null), 600);
                      }
                    }}
                  >
                    {unlocked ? sticker : <span className="text-lg text-gray-300">?</span>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="text-xs text-amber-500/50 text-center mt-2 mb-6 z-10">
        每获得 2 颗星星解锁 1 个贴纸 · 已解锁 {unlockedCount}/40
      </div>
    </main>
  );
}
