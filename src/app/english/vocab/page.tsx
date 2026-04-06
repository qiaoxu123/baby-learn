"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VOCAB_DATA, VocabCategory } from "@/content/vocab";
import { playTTS, playRewardSound, playClickSound } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import StarBurst from "@/components/StarBurst";
import CatMascot from "@/components/characters/CatMascot";
import NatureBackground from "@/components/NatureBackground";

export default function VocabPage() {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [tapped, setTapped] = useState(false);

  if (!selectedCategory) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
        <NatureBackground />
        <BackButton />

        <div className="flex items-center gap-2 mb-4 z-10">
          <CatMascot size={70} expression="happy" />
          <motion.div
            className="bg-white/90 rounded-2xl px-4 py-2 shadow-md border border-green-200 text-sm text-green-700 font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            选一个主题学单词!
          </motion.div>
        </div>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-6 z-10">
          Words · 学单词
        </h1>

        <div className="grid grid-cols-2 gap-4 max-w-sm w-full z-10">
          {VOCAB_DATA.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 text-center shadow-lg cursor-pointer border-2 border-transparent hover:border-green-200 transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playClickSound();
                playTTS(cat.name, "en-US");
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 shadow-inner"
                style={{ backgroundColor: cat.color + "33" }}
              >
                {cat.emoji}
              </div>
              <div className="text-lg font-bold text-gray-700">{cat.name}</div>
              <div className="text-xs text-gray-400">{cat.nameZh}</div>
              <div className="text-xs text-gray-300 mt-1">{cat.items.length} 个</div>
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  const item = selectedCategory.items[currentIndex];

  const handleTap = () => {
    setTapped(true);
    playTTS(item.english, "en-US");
    if (item.sound) {
      setTimeout(() => playTTS(item.sound!, "en-US"), 1000);
    }
    setTimeout(() => setTapped(false), 1500);
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < selectedCategory.items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowReward(true);
      playRewardSound();
      addStars(2);
      saveProgress(`vocab.${selectedCategory.id}`, "complete", 2, true);
      setTimeout(() => {
        setShowReward(false);
        setSelectedCategory(null);
      }, 2500);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <NatureBackground />
      <BackButton />
      <StarBurst show={showReward} count={2} />

      {/* Progress bar */}
      <div className="w-72 max-w-full mb-3 z-10">
        <div className="bg-white/60 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
            animate={{ width: `${((currentIndex + 1) / selectedCategory.items.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
          <span>{selectedCategory.name} · {selectedCategory.nameZh}</span>
          <span>{currentIndex + 1} / {selectedCategory.items.length}</span>
        </div>
      </div>

      {/* Cat guide */}
      <div className="flex items-center gap-2 mb-3 z-10">
        <CatMascot size={55} expression={tapped ? "excited" : "happy"} />
        <motion.div
          className="bg-white/90 rounded-2xl px-3 py-1.5 shadow-md border border-green-200 text-xs text-green-600 font-medium"
          key={tapped ? "tap" : "idle"}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {tapped ? (item.sound || "棒棒的!") : "点击卡片听发音!"}
        </motion.div>
      </div>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory.id}-${currentIndex}`}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-96 max-w-full z-10"
        >
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl cursor-pointer border-2 border-green-100 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
            onClick={handleTap}
          >
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl" style={{ backgroundColor: selectedCategory.color }} />

            <motion.div
              className="text-8xl mb-4 mt-2"
              animate={tapped ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {item.emoji}
            </motion.div>

            <div className="text-4xl font-bold text-gray-800 mb-1">{item.english}</div>
            <div className="text-2xl text-gray-400 mb-2">{item.chinese}</div>

            {item.sound && (
              <motion.div
                className="inline-block px-3 py-1 bg-orange-50 rounded-full text-sm text-orange-500 font-medium border border-orange-200"
                animate={tapped ? { scale: [1, 1.2, 1] } : {}}
              >
                {item.sound}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-5 mt-5 z-10">
        <motion.button
          className="w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg text-2xl flex items-center justify-center border-2 border-green-200 disabled:opacity-30"
          whileTap={{ scale: 0.85 }}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ⬅️
        </motion.button>
        <motion.button
          className="w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg text-2xl flex items-center justify-center border-2 border-gray-200"
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            setSelectedCategory(null);
            playClickSound();
          }}
        >
          📋
        </motion.button>
        <motion.button
          className="w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg text-2xl flex items-center justify-center border-2 border-green-200"
          whileTap={{ scale: 0.85 }}
          onClick={handleNext}
        >
          ➡️
        </motion.button>
      </div>
    </main>
  );
}
