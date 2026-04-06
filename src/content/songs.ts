export interface Song {
  id: string;
  title: string;
  titleEn?: string;
  language: "zh" | "en";
  emoji: string;
  color: string;
  /** Bilibili BV号 or YouTube video ID */
  videoId: string;
  platform: "bilibili" | "youtube";
  description: string;
}

export const SONGS_DATA: Song[] = [
  // === 中文儿歌 (Bilibili) ===
  {
    id: "xiao-xing-xing",
    title: "小星星",
    titleEn: "Twinkle Twinkle Little Star",
    language: "zh",
    emoji: "⭐",
    color: "#FFC107",
    videoId: "BV1Ws411f7GY",
    platform: "bilibili",
    description: "一闪一闪亮晶晶，最经典的儿歌",
  },
  {
    id: "liang-zhi-laohu",
    title: "两只老虎",
    language: "zh",
    emoji: "🐯",
    color: "#FF9800",
    videoId: "BV1ab411s7y2",
    platform: "bilibili",
    description: "两只老虎跑得快，活泼有趣",
  },
  {
    id: "xiao-tu-zi-guai-guai",
    title: "小兔子乖乖",
    language: "zh",
    emoji: "🐰",
    color: "#E91E63",
    videoId: "BV1hx411w7MH",
    platform: "bilibili",
    description: "小兔子乖乖把门开开",
  },
  {
    id: "xiao-ya-zi",
    title: "数鸭子",
    language: "zh",
    emoji: "🦆",
    color: "#4CAF50",
    videoId: "BV1Jx411w7c8",
    platform: "bilibili",
    description: "门前大桥下游过一群鸭",
  },
  {
    id: "shi-shang-zhi-you",
    title: "世上只有妈妈好",
    language: "zh",
    emoji: "👩‍👧",
    color: "#F44336",
    videoId: "BV1Us411E7ct",
    platform: "bilibili",
    description: "有妈的孩子像块宝",
  },
  {
    id: "xiao-luo-hao",
    title: "小螺号",
    language: "zh",
    emoji: "🐚",
    color: "#00BCD4",
    videoId: "BV17x41187dV",
    platform: "bilibili",
    description: "小螺号嘀嘀嘀吹",
  },
  {
    id: "zhuo-ni-yu",
    title: "捉泥鳅",
    language: "zh",
    emoji: "🐟",
    color: "#795548",
    videoId: "BV1Wx411f7H8",
    platform: "bilibili",
    description: "大哥哥好不好，咱们去捉泥鳅",
  },
  // === English Songs (YouTube) ===
  {
    id: "baby-shark",
    title: "Baby Shark",
    language: "en",
    emoji: "🦈",
    color: "#2196F3",
    videoId: "XqZsoesa55w",
    platform: "youtube",
    description: "Baby shark doo doo doo!",
  },
  {
    id: "wheels-on-bus",
    title: "Wheels on the Bus",
    language: "en",
    emoji: "🚌",
    color: "#FF5722",
    videoId: "e_04ZrNroTo",
    platform: "youtube",
    description: "The wheels go round and round!",
  },
  {
    id: "old-macdonald",
    title: "Old MacDonald",
    language: "en",
    emoji: "🐄",
    color: "#8BC34A",
    videoId: "5oYKonYBujg",
    platform: "youtube",
    description: "E-I-E-I-O! Learn animal sounds!",
  },
  {
    id: "head-shoulders",
    title: "Head Shoulders Knees & Toes",
    language: "en",
    emoji: "🧒",
    color: "#3F51B5",
    videoId: "ZanHgPprl-0",
    platform: "youtube",
    description: "Learn body parts with music!",
  },
  {
    id: "twinkle-star",
    title: "Twinkle Twinkle Little Star",
    language: "en",
    emoji: "🌟",
    color: "#9C27B0",
    videoId: "yCjJyiqpAuU",
    platform: "youtube",
    description: "Classic lullaby for babies!",
  },
  {
    id: "johny-johny",
    title: "Johny Johny Yes Papa",
    language: "en",
    emoji: "👶",
    color: "#607D8B",
    videoId: "F4tHL8reNCs",
    platform: "youtube",
    description: "Eating sugar? No papa!",
  },
];
