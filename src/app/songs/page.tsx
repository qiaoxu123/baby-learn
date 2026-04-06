"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SONGS_DATA, Song } from "@/content/songs";
import { playClickSound } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import CatMascot from "@/components/characters/CatMascot";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

function getEmbedUrl(song: Song): string {
  if (song.platform === "bilibili") {
    return `https://player.bilibili.com/player.html?bvid=${song.videoId}&autoplay=0&high_quality=1`;
  }
  return `https://www.youtube.com/embed/${song.videoId}?rel=0&modestbranding=1`;
}

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [filter, setFilter] = useState<"all" | "zh" | "en">("all");

  const filteredSongs = SONGS_DATA.filter(
    (s) => filter === "all" || s.language === filter
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
            一起听儿歌吧!
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
                addStars(1);
                saveProgress(`songs.${song.id}`, "watch", 1, true);
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
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="text-3xl">▶️</div>
                <div className="text-[10px] text-gray-300">
                  {song.platform === "bilibili" ? "B站" : "YouTube"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none">
      <NatureBackground />
      <BackButton />

      {/* Song title */}
      <motion.div
        className="text-center mb-4 z-10 mt-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="text-5xl mb-2">{selectedSong.emoji}</div>
        <h1 className="text-3xl font-extrabold text-gray-800">
          {selectedSong.title}
        </h1>
        {selectedSong.titleEn && (
          <p className="text-base text-gray-400">{selectedSong.titleEn}</p>
        )}
      </motion.div>

      {/* Video player */}
      <motion.div
        className="w-full max-w-lg z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={getEmbedUrl(selectedSong)}
            title={selectedSong.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          />
        </div>
      </motion.div>

      {/* Back to list button */}
      <motion.button
        className="mt-6 z-10 px-8 py-4 bg-white/90 backdrop-blur rounded-full shadow-lg text-xl font-medium text-pink-500 border-2 border-pink-200 flex items-center gap-2"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          playClickSound();
          setSelectedSong(null);
        }}
      >
        📋 返回歌单
      </motion.button>
    </main>
  );
}
