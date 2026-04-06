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
  };

  // === Video Player View ===
  if (playingSong) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 select-none bg-black">
        {/* Video */}
        <motion.div
          className="w-full max-w-2xl z-10 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <video
            ref={videoRef}
            src={playingSong.videoSrc}
            controls
            autoPlay
            playsInline
            className="w-full"
            onEnded={() => {
              // Auto-play next song in category
            }}
          />
        </motion.div>

        {/* Song title */}
        <motion.div
          className="mt-4 text-center z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-white">{playingSong.title}</h2>
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4 mt-4 z-10">
          <motion.button
            className="px-6 py-3 bg-white/90 rounded-full shadow-lg text-lg font-medium text-pink-500 flex items-center gap-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (videoRef.current) videoRef.current.pause();
              setPlayingSong(null);
            }}
          >
            📋 返回列表
          </motion.button>
        </div>
      </main>
    );
  }

  // === Search Results ===
  if (searchQuery.length > 0) {
    const allSongs = SONG_CATEGORIES.flatMap((c) => c.songs);
    const results = allSongs.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-10">
        <NatureBackground />
        <BackButton />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <div className="text-sm text-gray-400 mb-3 z-10">
          找到 {results.length} 首
        </div>
        <SongList songs={results} onPlay={handlePlay} />
      </main>
    );
  }

  // === Category Detail ===
  if (selectedCategory) {
    return (
      <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-10">
        <NatureBackground />
        <BackButton />

        <motion.button
          className="z-10 mb-3 px-4 py-2 bg-white/80 rounded-full text-sm text-gray-500 shadow border border-gray-200"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playClickSound();
            setSelectedCategory(null);
          }}
        >
          ← 返回分类
        </motion.button>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-1 z-10">
          {selectedCategory.emoji} {selectedCategory.name}
        </h2>
        <p className="text-sm text-gray-400 mb-4 z-10">
          {selectedCategory.songs.length} 首儿歌
        </p>

        <SongList songs={selectedCategory.songs} onPlay={handlePlay} />
      </main>
    );
  }

  // === Home: Category Grid ===
  return (
    <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-10">
      <NatureBackground />
      <BackButton />

      <div className="flex items-center gap-3 mb-4 z-10">
        <CatMascot size={65} expression="excited" />
        <motion.div
          className="bg-white/90 rounded-2xl px-5 py-3 shadow-md border border-pink-200 text-base text-pink-700 font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          选一类儿歌看吧!
        </motion.div>
        <DogMascot size={65} expression="excited" />
      </div>

      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 z-10">
        儿歌乐园
      </h1>
      <p className="text-sm text-gray-400 mb-4 z-10">
        {SONG_CATEGORIES.reduce((a, c) => a + c.songs.length, 0)} 首贝乐虎儿歌
      </p>

      <SearchBar query={searchQuery} onChange={setSearchQuery} />

      <div className="grid grid-cols-2 gap-3 max-w-md w-full z-10 mt-2">
        {SONG_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 text-center shadow-lg cursor-pointer border-2 border-transparent hover:border-pink-200 transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.06, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound();
              setSelectedCategory(cat);
            }}
          >
            <div className="text-4xl mb-2">{cat.emoji}</div>
            <div className="text-lg font-bold text-gray-700">{cat.name}</div>
            <div className="text-xs text-gray-400">{cat.songs.length} 首</div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full max-w-md z-10 mb-3">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 搜索儿歌..."
        className="w-full px-5 py-3 rounded-full bg-white/90 border-2 border-pink-200 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
      />
    </div>
  );
}

function SongList({ songs, onPlay }: { songs: Song[]; onPlay: (s: Song) => void }) {
  return (
    <div className="flex flex-col gap-2 max-w-md w-full z-10">
      {songs.map((song, i) => (
        <motion.div
          key={song.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow cursor-pointer flex items-center gap-3 border-2 border-transparent hover:border-pink-200 transition-all"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: Math.min(i * 0.03, 0.5) }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onPlay(song)}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-pink-50">
            ▶️
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-medium text-gray-700 truncate">
              {song.title}
            </div>
          </div>
          <div className="text-xs text-gray-300 flex-shrink-0">🎬</div>
        </motion.div>
      ))}
    </div>
  );
}
