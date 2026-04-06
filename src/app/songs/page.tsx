"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio when navigating away
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlay = (song: Song) => {
    // Stop current
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (playingSong?.id === song.id) {
      setPlayingSong(null);
      return;
    }

    const audio = new Audio(song.audioSrc);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => setPlayingSong(null);
    setPlayingSong(song);
    addStars(1);
    saveProgress(`songs.${song.id}`, "listen", 1, true);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingSong(null);
  };

  // Search mode
  if (searchQuery.length > 0) {
    const allSongs = SONG_CATEGORIES.flatMap((c) => c.songs);
    const results = allSongs.filter((s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-24">
        <NatureBackground />
        <BackButton />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <div className="text-sm text-gray-400 mb-3 z-10">
          找到 {results.length} 首
        </div>
        <SongList
          songs={results}
          playingSong={playingSong}
          onPlay={handlePlay}
        />
        {playingSong && <NowPlaying song={playingSong} onStop={handleStop} />}
      </main>
    );
  }

  // Category detail view
  if (selectedCategory) {
    return (
      <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-24">
        <NatureBackground />
        <BackButton />

        <motion.button
          className="z-10 mb-3 px-4 py-2 bg-white/80 rounded-full text-sm text-gray-500 shadow border border-gray-200"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playClickSound();
            setSelectedCategory(null);
            handleStop();
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

        <SongList
          songs={selectedCategory.songs}
          playingSong={playingSong}
          onPlay={handlePlay}
        />
        {playingSong && <NowPlaying song={playingSong} onStop={handleStop} />}
      </main>
    );
  }

  // Category grid (home)
  return (
    <main className="min-h-screen flex flex-col items-center p-6 pt-20 select-none pb-20">
      <NatureBackground />
      <BackButton />

      <div className="flex items-center gap-3 mb-4 z-10">
        <CatMascot size={65} expression="excited" />
        <motion.div
          className="bg-white/90 rounded-2xl px-5 py-3 shadow-md border border-pink-200 text-base text-pink-700 font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          选一类儿歌听吧!
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

      {/* Category cards */}
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

      {playingSong && <NowPlaying song={playingSong} onStop={handleStop} />}
    </main>
  );
}

function SearchBar({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
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

function SongList({
  songs,
  playingSong,
  onPlay,
}: {
  songs: Song[];
  playingSong: Song | null;
  onPlay: (s: Song) => void;
}) {
  return (
    <div className="flex flex-col gap-2 max-w-md w-full z-10">
      {songs.map((song, i) => {
        const isPlaying = playingSong?.id === song.id;
        return (
          <motion.div
            key={song.id}
            className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow cursor-pointer flex items-center gap-3 border-2 transition-all ${
              isPlaying
                ? "border-pink-400 bg-pink-50/90"
                : "border-transparent hover:border-pink-200"
            }`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: Math.min(i * 0.03, 0.5) }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              playClickSound();
              onPlay(song);
            }}
          >
            <motion.div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                isPlaying ? "bg-pink-400 text-white" : "bg-pink-50"
              }`}
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: isPlaying ? Infinity : 0 }}
            >
              {isPlaying ? "⏸" : "▶️"}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div
                className={`text-base font-medium truncate ${
                  isPlaying ? "text-pink-600" : "text-gray-700"
                }`}
              >
                {song.title}
              </div>
            </div>
            {isPlaying && (
              <motion.div
                className="flex gap-0.5"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {[1, 2, 3].map((bar) => (
                  <motion.div
                    key={bar}
                    className="w-1 bg-pink-400 rounded-full"
                    animate={{ height: [8, 16, 8] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: bar * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function NowPlaying({
  song,
  onStop,
}: {
  song: Song;
  onStop: () => void;
}) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t-2 border-pink-200 shadow-lg px-5 py-3 flex items-center gap-4"
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      exit={{ y: 80 }}
    >
      <motion.div
        className="text-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        🎵
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-base font-bold text-pink-600 truncate">
          {song.title}
        </div>
        <div className="text-xs text-gray-400">正在播放...</div>
      </div>
      <motion.button
        className="w-12 h-12 bg-pink-400 text-white rounded-full flex items-center justify-center text-xl shadow-lg"
        whileTap={{ scale: 0.85 }}
        onClick={onStop}
      >
        ⏹
      </motion.button>
    </motion.div>
  );
}
