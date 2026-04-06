"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABC_DATA, LetterData } from "@/content/abc";
import { playTTS, playRewardSound, playClickSound } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import StarBurst from "@/components/StarBurst";
import CatMascot from "@/components/characters/CatMascot";
import NatureBackground from "@/components/NatureBackground";

export default function ABCPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [tapped, setTapped] = useState(false);

  const letter = ABC_DATA[currentIndex];

  const handleLetterTap = useCallback(() => {
    setTapped(true);
    playTTS(`${letter.letter}`, "en-US");
    setTimeout(() => {
      playTTS(`${letter.letter} is for ${letter.word}`, "en-US");
    }, 800);
    setTimeout(() => setTapped(false), 1500);
  }, [letter]);

  const handleNext = useCallback(() => {
    playClickSound();
    if (currentIndex < ABC_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if ((currentIndex + 1) % 5 === 0) {
        setShowReward(true);
        playRewardSound();
        addStars(1);
        saveProgress("abc", `letter-${letter.letter}`, 1, true);
        setTimeout(() => setShowReward(false), 2000);
      }
    } else {
      setShowReward(true);
      playRewardSound();
      addStars(3);
      saveProgress("abc", "complete", 3, true);
      setTimeout(() => {
        setShowReward(false);
        setCurrentIndex(0);
      }, 2500);
    }
  }, [currentIndex, letter]);

  const handlePrev = useCallback(() => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <NatureBackground />
      <BackButton />
      <StarBurst show={showReward} count={currentIndex === ABC_DATA.length - 1 ? 3 : 1} />

      {/* Progress bar */}
      <div className="w-72 max-w-full mb-3 z-10">
        <div className="bg-white/60 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / ABC_DATA.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-center text-xs text-amber-600/60 mt-1">
          {currentIndex + 1} / {ABC_DATA.length}
        </div>
      </div>

      {/* Cat guide */}
      <div className="flex items-center gap-2 mb-3 z-10">
        <CatMascot size={60} expression={tapped ? "excited" : "happy"} />
        <motion.div
          className="bg-white/90 rounded-2xl px-4 py-2 shadow-md border border-orange-200 text-sm text-amber-700 font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={tapped ? "tapped" : "idle"}
        >
          {tapped ? "棒棒的! Great!" : "点击字母听发音!"}
        </motion.div>
      </div>

      {/* Letter card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-80 max-w-full z-10"
        >
          <LetterCard letter={letter} tapped={tapped} onTap={handleLetterTap} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-6 mt-5 z-10">
        <motion.button
          className="w-16 h-16 bg-white/90 backdrop-blur rounded-full shadow-lg text-3xl flex items-center justify-center border-2 border-orange-200 disabled:opacity-30"
          whileTap={{ scale: 0.85 }}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ⬅️
        </motion.button>
        <motion.button
          className="w-16 h-16 bg-white/90 backdrop-blur rounded-full shadow-lg text-3xl flex items-center justify-center border-2 border-orange-200"
          whileTap={{ scale: 0.85 }}
          onClick={handleNext}
        >
          ➡️
        </motion.button>
      </div>
    </main>
  );
}

function LetterCard({
  letter,
  tapped,
  onTap,
}: {
  letter: LetterData;
  tapped: boolean;
  onTap: () => void;
}) {
  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl cursor-pointer border-2 border-orange-100 relative overflow-hidden"
      whileTap={{ scale: 0.96 }}
      onClick={onTap}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl"
        style={{ backgroundColor: letter.color }}
      />

      {/* Big letter */}
      <motion.div
        className="text-8xl font-extrabold mb-3"
        style={{ color: letter.color }}
        animate={
          tapped
            ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
            : { scale: 1 }
        }
        transition={{ duration: 0.5 }}
      >
        {letter.letter}
      </motion.div>

      {/* Emoji and word */}
      <motion.div
        className="text-6xl mb-3"
        animate={tapped ? { scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        {letter.emoji}
      </motion.div>

      <div className="text-2xl font-bold text-gray-700">{letter.word}</div>
      <div className="text-base text-gray-400">{letter.wordZh}</div>

      {/* Phonics badge */}
      <motion.div
        className="mt-3 inline-block px-4 py-1.5 bg-amber-50 rounded-full text-sm text-amber-600 font-medium border border-amber-200"
        animate={tapped ? { backgroundColor: ["#FFF8E1", "#FFF3E0", "#FFF8E1"] } : {}}
      >
        发音: {letter.sound}
      </motion.div>
    </motion.div>
  );
}
