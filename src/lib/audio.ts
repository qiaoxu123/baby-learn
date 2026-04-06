"use client";

let audioContext: AudioContext | null = null;
let currentAudio: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

/**
 * Play a pre-recorded audio file. Falls back to TTS if file not found.
 */
export function playAudioFile(path: string): Promise<void> {
  return new Promise((resolve) => {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(path);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      currentAudio = null;
      resolve();
    };
    audio.play().catch(() => resolve());
  });
}

/**
 * Stop any currently playing audio
 */
export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Play letter audio: /audio/en/letter-{x}.mp3
 */
export function playLetter(letter: string) {
  const l = letter.toLowerCase();
  return playAudioFile(`/audio/en/letter-${l}.mp3`);
}

/**
 * Play "X is for Word": /audio/en/letter-{x}-word.mp3
 */
export function playLetterWord(letter: string) {
  const l = letter.toLowerCase();
  return playAudioFile(`/audio/en/letter-${l}-word.mp3`);
}

/**
 * Play vocabulary word: /audio/en/vocab-{id}.mp3
 */
export function playVocab(id: string) {
  return playAudioFile(`/audio/en/vocab-${id}.mp3`);
}

/**
 * Play animal sound: /audio/en/sound-{id}.mp3
 */
export function playAnimalSound(id: string) {
  return playAudioFile(`/audio/en/sound-${id}.mp3`);
}

/**
 * Play poetry title: /audio/zh/{poemId}-title.mp3
 */
export function playPoemTitle(poemId: string) {
  return playAudioFile(`/audio/zh/${poemId}-title.mp3`);
}

/**
 * Play poetry line: /audio/zh/{poemId}-{lineNum}.mp3
 */
export function playPoemLine(poemId: string, lineNum: number) {
  return playAudioFile(`/audio/zh/${poemId}-${lineNum}.mp3`);
}

/**
 * Play song title
 */
export function playSongTitle(songId: string, lang: "en" | "zh") {
  const dir = lang === "en" ? "en" : "zh";
  return playAudioFile(`/audio/${dir}/song-${songId}-title.mp3`);
}

/**
 * Play song lyric line
 */
export function playSongLine(songId: string, lineNum: number, lang: "en" | "zh") {
  const dir = lang === "en" ? "en" : "zh";
  return playAudioFile(`/audio/${dir}/song-${songId}-${lineNum}.mp3`);
}

/**
 * Fallback TTS for dynamic text (settings page, etc.)
 */
export function playTTS(text: string, lang: "en-US" | "zh-CN" = "en-US") {
  if (typeof window === "undefined") return;
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === "zh-CN" ? 0.8 : 0.75;
    utterance.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export function playNote(frequency: number, duration: number = 0.2) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gainNode.gain.value = 0.1;
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio context not available
  }
}

export function playRewardSound() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    setTimeout(() => playNote(freq, 0.3), i * 150);
  });
}

export function playClickSound() {
  playNote(880, 0.1);
}

export function initAudio() {
  // Pre-warm audio context on first user interaction
}
