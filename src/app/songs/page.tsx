"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SONG_CATEGORIES, Song, SongCategory } from "@/content/songs";
import { playClickSound } from "@/lib/audio";
import { saveProgress, addStars } from "@/lib/progress";
import BackButton from "@/components/BackButton";
import CatMascot from "@/components/characters/CatMascot";
import DogMascot from "@/components/characters/DogMascot";
import NatureBackground from "@/components/NatureBackground";

export default function SongsPage() {
  const [selectedCategory, setSelectedCategory] = useState<SongCategory | null>(null);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = (song: Song) => {
    playClickSound();
    setPlayingSong(song);
    addStars(1);
    saveProgress(`songs.${song.id}`, "watch", 1, true);
    // Scroll to top when song selected
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    setPlayingSong(null);
  };

  const currentSongs = searchQuery.length > 0
    ? SONG_CATEGORIES.flatMap((c) => c.songs).filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory?.songs ?? null;

  return (
    <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-10">
      <NatureBackground />
      <BackButton />

      {/* Header (hide when video playing to save space) */}
      {!playingSong && (
        <>
          <div className="flex items-center gap-3 mb-3 z-10">
            <CatMascot size={55} expression="excited" />
            <motion.div
              className="bg-white/90 rounded-2xl px-4 py-2 shadow-md border border-pink-200 text-sm text-pink-700 font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.name}` : "选一类儿歌看吧!"}
            </motion.div>
            <DogMascot size={55} expression="excited" />
          </div>

          {!selectedCategory && (
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-1 z-10">
              儿歌乐园
            </h1>
          )}
          <p className="text-xs text-gray-400 mb-3 z-10">
            {selectedCategory
              ? `${selectedCategory.songs.length} 首儿歌`
              : `${SONG_CATEGORIES.reduce((a, c) => a + c.songs.length, 0)} 首贝乐虎儿歌`}
          </p>
        </>
      )}

      {/* Video player (inline, not full-screen) */}
      {playingSong && (
        <motion.div
          className="w-full max-w-lg z-10 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-pink-100">
            <video
              ref={videoRef}
              key={playingSong.id}
              src={playingSong.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full aspect-video"
            />
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <h3 className="text-lg font-bold text-gray-700">{playingSong.title}</h3>
            <motion.button
              className="px-4 py-1.5 bg-white/80 rounded-full text-sm text-gray-500 shadow border border-gray-200"
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
            >
              ✕ 关闭
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="w-full max-w-md z-10 mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.length > 0) setSelectedCategory(null);
          }}
          placeholder="🔍 搜索儿歌..."
          className="w-full px-5 py-3 rounded-full bg-white/90 border-2 border-pink-200 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
        />
      </div>

      {/* Search results hint */}
      {searchQuery.length > 0 && currentSongs && (
        <div className="text-xs text-gray-400 mb-2 z-10">找到 {currentSongs.length} 首</div>
      )}

      {/* Back to categories button */}
      {selectedCategory && (
        <motion.button
          className="z-10 mb-3 px-4 py-2 bg-white/80 rounded-full text-sm text-gray-500 shadow border border-gray-200"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playClickSound();
            setSelectedCategory(null);
            setSearchQuery("");
          }}
        >
          ← 全部分类
        </motion.button>
      )}

      {/* Category grid (show when no category selected and not searching) */}
      {!selectedCategory && searchQuery.length === 0 && (
        <div className="grid grid-cols-2 gap-3 max-w-md w-full z-10">
          {SONG_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg cursor-pointer border-2 border-transparent hover:border-pink-200 transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
            >
              <div className="text-3xl mb-1">{cat.emoji}</div>
              <div className="text-base font-bold text-gray-700">{cat.name}</div>
              <div className="text-xs text-gray-400">{cat.songs.length} 首</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Song list */}
      {currentSongs && (
        <div className="flex flex-col gap-2 max-w-md w-full z-10">
          {currentSongs.map((song, i) => {
            const isActive = playingSong?.id === song.id;
            return (
              <motion.div
                key={song.id}
                className={`bg-white/90 backdrop-blur-sm rounded-xl p-3.5 shadow cursor-pointer flex items-center gap-3 border-2 transition-all ${
                  isActive
                    ? "border-pink-400 bg-pink-50/90"
                    : "border-transparent hover:border-pink-200"
                }`}
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.4) }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePlay(song)}
              >
                <motion.div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    isActive ? "bg-pink-400 text-white" : "bg-pink-50"
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                >
                  {isActive ? "⏸" : "▶️"}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${isActive ? "text-pink-600" : "text-gray-700"}`}>
                    {song.title}
                  </div>
                </div>
                {isActive && (
                  <motion.div className="flex gap-0.5" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                    {[1, 2, 3].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-0.5 bg-pink-400 rounded-full"
                        animate={{ height: [6, 14, 6] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: bar * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
