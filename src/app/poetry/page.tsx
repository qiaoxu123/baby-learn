"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POETRY_DATA, Poem } from "@/content/poetry";
import { playTTS, playRewardSound, playClickSound } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import StarBurst from "@/components/StarBurst";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

export default function PoetryPage() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [activeLine, setActiveLine] = useState(-1);
  const [showReward, setShowReward] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  if (!selectedPoem) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
        <NatureBackground variant="spring" />
        <BackButton />

        <div className="flex items-center gap-2 mb-4 z-10">
          <DogMascot size={80} expression="happy" />
          <motion.div
            className="bg-white/90 rounded-2xl px-4 py-2 shadow-md border border-purple-200 text-sm text-purple-700 font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            选一首古诗来听吧!
          </motion.div>
        </div>

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6 z-10">
          古诗乐园
        </h1>

        <div className="flex flex-col gap-3 max-w-sm w-full z-10">
          {POETRY_DATA.map((poem, i) => (
            <motion.div
              key={poem.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg cursor-pointer flex items-center gap-4 border-2 border-transparent hover:border-purple-200 transition-colors"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playClickSound();
                setSelectedPoem(poem);
                setActiveLine(-1);
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner"
                style={{ backgroundColor: poem.bgColor }}
              >
                {poem.illustration}
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-gray-800">
                  {poem.title}
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    {poem.titlePinyin}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  [{poem.dynasty}] {poem.author}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {poem.description}
                </div>
              </div>
              <div className="text-2xl text-gray-300">▶</div>
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  const handlePlayAll = () => {
    if (isPlaying) {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      setIsPlaying(false);
      setActiveLine(-1);
      return;
    }

    setIsPlaying(true);
    const refs: NodeJS.Timeout[] = [];

    playTTS(selectedPoem.title, "zh-CN");

    selectedPoem.lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setActiveLine(i);
        playTTS(line.text, "zh-CN");
      }, 2000 + i * 3000);
      refs.push(t);
    });

    const finishT = setTimeout(() => {
      setActiveLine(-1);
      setIsPlaying(false);
      setShowReward(true);
      playRewardSound();
      addStars(2);
      saveProgress(`poetry.${selectedPoem.id}`, "listen", 2, true);
      setTimeout(() => setShowReward(false), 2500);
    }, 2000 + selectedPoem.lines.length * 3000);
    refs.push(finishT);

    timeoutRefs.current = refs;
  };

  const handleLineTap = (index: number) => {
    setActiveLine(index);
    playTTS(selectedPoem.lines[index].text, "zh-CN");
    playClickSound();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <NatureBackground variant={selectedPoem.id === "jing-ye-si" ? "night" : "spring"} />
      <BackButton />
      <StarBurst show={showReward} count={2} />

      {/* Dog guide */}
      <div className="flex items-center gap-2 mb-3 z-10">
        <DogMascot size={60} expression={isPlaying ? "excited" : "happy"} />
        <motion.div
          className="bg-white/90 rounded-2xl px-3 py-1.5 shadow-md border border-purple-200 text-xs text-purple-600 font-medium"
          key={isPlaying ? "playing" : "idle"}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {isPlaying ? "正在朗读..." : "点击每行或按播放键"}
        </motion.div>
      </div>

      {/* Illustration */}
      <motion.div
        className="text-6xl mb-2 z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: isPlaying ? [0, 5, -5, 0] : 0,
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {selectedPoem.illustration}
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl font-extrabold text-gray-800 mb-0.5 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {selectedPoem.title}
      </motion.h1>
      <p className="text-xs text-gray-400 z-10">{selectedPoem.titlePinyin}</p>
      <p className="text-sm text-gray-500 mb-4 z-10">
        [{selectedPoem.dynasty}] {selectedPoem.author}
      </p>

      {/* Poem card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 w-80 max-w-full shadow-xl mb-5 border-2 border-purple-100 z-10">
        {selectedPoem.lines.map((line, i) => (
          <motion.div
            key={i}
            className={`py-2.5 px-3 rounded-xl mb-1.5 cursor-pointer transition-all ${
              activeLine === i
                ? "bg-gradient-to-r from-purple-50 to-pink-50 shadow-md border border-purple-200"
                : "hover:bg-purple-50/50"
            }`}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleLineTap(i)}
            animate={activeLine === i ? { scale: [1, 1.01, 1] } : { scale: 1 }}
          >
            <div className="text-[10px] text-gray-400 mb-0.5 tracking-wider">{line.pinyin}</div>
            <div
              className={`text-xl font-medium tracking-[0.2em] ${
                activeLine === i ? "text-purple-700" : "text-gray-700"
              }`}
            >
              {activeLine === i
                ? line.text.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ci * 0.15 }}
                    >
                      {char}
                    </motion.span>
                  ))
                : line.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 z-10">
        <motion.button
          className="w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg text-2xl flex items-center justify-center border-2 border-purple-200"
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            playClickSound();
            setSelectedPoem(null);
            timeoutRefs.current.forEach(clearTimeout);
            setIsPlaying(false);
          }}
        >
          📋
        </motion.button>

        <motion.button
          className={`w-18 h-18 rounded-full shadow-lg text-3xl flex items-center justify-center border-2 px-5 py-3 ${
            isPlaying
              ? "bg-red-50 text-red-500 border-red-200"
              : "bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-300"
          }`}
          whileTap={{ scale: 0.85 }}
          animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          onClick={handlePlayAll}
        >
          {isPlaying ? "⏹" : "▶️"}
        </motion.button>
      </div>
    </main>
  );
}
