"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SONGS_DATA, Song } from "@/content/songs";
import { playSongTitle, playSongLine, playRewardSound, playClickSound, stopAudio } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import StarBurst from "@/components/StarBurst";
import CatMascot from "@/components/characters/CatMascot";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [activeLine, setActiveLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [filter, setFilter] = useState<"all" | "zh" | "en">("all");
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const filteredSongs = SONGS_DATA.filter(
    (s) => filter === "all" || s.language === filter || s.language === "both"
  );

  if (!selectedSong) {
    return (
      <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-20">
        <NatureBackground />
        <BackButton />

        <div className="flex items-center gap-3 mb-4 z-10">
          <CatMascot size={70} expression="excited" />
          <motion.div
            className="bg-white/90 rounded-2xl px-5 py-3 shadow-md border border-pink-200 text-base text-pink-700 font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            一起唱儿歌吧!
          </motion.div>
          <DogMascot size={70} expression="excited" />
        </div>

        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 z-10">
          儿歌乐园
        </h1>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 z-10">
          {[
            { key: "all" as const, label: "全部", emoji: "🎵" },
            { key: "zh" as const, label: "中文", emoji: "🇨🇳" },
            { key: "en" as const, label: "English", emoji: "🇬🇧" },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              className={`px-5 py-2.5 rounded-full text-base font-medium transition-all ${
                filter === tab.key
                  ? "bg-pink-400 text-white shadow-lg"
                  : "bg-white/80 text-gray-500 border border-gray-200"
              }`}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playClickSound();
                setFilter(tab.key);
              }}
            >
              {tab.emoji} {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Song list */}
        <div className="flex flex-col gap-3 max-w-md w-full z-10">
          {filteredSongs.map((song, i) => (
            <motion.div
              key={song.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg cursor-pointer flex items-center gap-4 border-2 border-transparent hover:border-pink-200 transition-colors"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.06, type: "spring" }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playClickSound();
                setSelectedSong(song);
                setActiveLine(-1);
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner flex-shrink-0"
                style={{ backgroundColor: song.color + "22" }}
              >
                {song.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold text-gray-800 truncate">
                  {song.title}
                </div>
                {song.titleEn && (
                  <div className="text-sm text-gray-400 truncate">{song.titleEn}</div>
                )}
                <div className="text-xs text-gray-400 mt-0.5">{song.description}</div>
              </div>
              <div className="text-3xl text-gray-300 flex-shrink-0">▶</div>
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  const audioLang = selectedSong.language === "en" ? "en" as const : "zh" as const;

  const handlePlayAll = () => {
    if (isPlaying) {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      setIsPlaying(false);
      setActiveLine(-1);
      stopAudio();
      return;
    }

    setIsPlaying(true);
    const refs: NodeJS.Timeout[] = [];

    playSongTitle(selectedSong.id, audioLang);

    selectedSong.lyrics.forEach((line, i) => {
      const t = setTimeout(() => {
        setActiveLine(i);
        playSongLine(selectedSong.id, i + 1, audioLang);
      }, 2000 + i * 2800);
      refs.push(t);
    });

    const finishT = setTimeout(() => {
      setActiveLine(-1);
      setIsPlaying(false);
      setShowReward(true);
      playRewardSound();
      addStars(1);
      saveProgress(`songs.${selectedSong.id}`, "listen", 1, true);
      setTimeout(() => setShowReward(false), 2500);
    }, 2000 + selectedSong.lyrics.length * 2800);
    refs.push(finishT);

    timeoutRefs.current = refs;
  };

  const handleLineTap = (index: number) => {
    setActiveLine(index);
    playSongLine(selectedSong.id, index + 1, audioLang);
    playClickSound();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <NatureBackground />
      <BackButton />
      <StarBurst show={showReward} count={1} />

      {/* Song emoji */}
      <motion.div
        className="text-8xl mb-3 z-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: isPlaying ? [0, 8, -8, 0] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {selectedSong.emoji}
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl font-extrabold text-gray-800 mb-1 z-10 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {selectedSong.title}
      </motion.h1>
      {selectedSong.titleEn && (
        <p className="text-base text-gray-400 mb-4 z-10">{selectedSong.titleEn}</p>
      )}

      {/* Lyrics card */}
      <div
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 w-96 max-w-full shadow-xl mb-5 border-2 border-pink-100 z-10 max-h-[50vh] overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {selectedSong.lyrics.map((line, i) => (
          <motion.div
            key={i}
            className={`py-3 px-4 rounded-xl mb-1.5 cursor-pointer transition-all ${
              activeLine === i
                ? "bg-gradient-to-r from-pink-50 to-orange-50 shadow-md border border-pink-200"
                : "hover:bg-pink-50/50"
            }`}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleLineTap(i)}
          >
            <div
              className={`text-xl font-medium ${
                activeLine === i ? "text-pink-600" : "text-gray-700"
              }`}
            >
              {activeLine === i
                ? line.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: ci * 0.08 }}
                    >
                      {char}
                    </motion.span>
                  ))
                : line}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 z-10">
        <motion.button
          className="w-16 h-16 bg-white/90 backdrop-blur rounded-full shadow-lg text-3xl flex items-center justify-center border-2 border-pink-200"
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            playClickSound();
            setSelectedSong(null);
            timeoutRefs.current.forEach(clearTimeout);
            setIsPlaying(false);
          }}
        >
          📋
        </motion.button>

        <motion.button
          className={`w-20 h-20 rounded-full shadow-lg text-4xl flex items-center justify-center border-2 ${
            isPlaying
              ? "bg-red-50 text-red-500 border-red-200"
              : "bg-gradient-to-r from-pink-400 to-orange-400 text-white border-pink-300"
          }`}
          whileTap={{ scale: 0.85 }}
          animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          onClick={handlePlayAll}
        >
          {isPlaying ? "⏹" : "▶️"}
        </motion.button>
      </div>

      <p className="mt-3 text-gray-400 text-sm z-10">
        {isPlaying ? "正在播放..." : "点击歌词或按播放键"}
      </p>
    </main>
  );
}
