export interface LetterData {
  letter: string;
  word: string;
  wordZh: string;
  emoji: string;
  color: string;
  sound: string; // phonics sound description
}

export const ABC_DATA: LetterData[] = [
  { letter: "A", word: "Apple", wordZh: "苹果", emoji: "🍎", color: "#FF6B6B", sound: "/æ/" },
  { letter: "B", word: "Bear", wordZh: "小熊", emoji: "🐻", color: "#4ECDC4", sound: "/b/" },
  { letter: "C", word: "Cat", wordZh: "猫咪", emoji: "🐱", color: "#FFE66D", sound: "/k/" },
  { letter: "D", word: "Dog", wordZh: "小狗", emoji: "🐶", color: "#A8E6CF", sound: "/d/" },
  { letter: "E", word: "Elephant", wordZh: "大象", emoji: "🐘", color: "#DDA0DD", sound: "/ɛ/" },
  { letter: "F", word: "Fish", wordZh: "小鱼", emoji: "🐟", color: "#87CEEB", sound: "/f/" },
  { letter: "G", word: "Giraffe", wordZh: "长颈鹿", emoji: "🦒", color: "#F0E68C", sound: "/ɡ/" },
  { letter: "H", word: "Horse", wordZh: "小马", emoji: "🐴", color: "#DEB887", sound: "/h/" },
  { letter: "I", word: "Ice cream", wordZh: "冰淇淋", emoji: "🍦", color: "#FFB6C1", sound: "/ɪ/" },
  { letter: "J", word: "Jellyfish", wordZh: "水母", emoji: "🪼", color: "#E6E6FA", sound: "/dʒ/" },
  { letter: "K", word: "Koala", wordZh: "考拉", emoji: "🐨", color: "#C0C0C0", sound: "/k/" },
  { letter: "L", word: "Lion", wordZh: "狮子", emoji: "🦁", color: "#FFD700", sound: "/l/" },
  { letter: "M", word: "Monkey", wordZh: "猴子", emoji: "🐵", color: "#D2691E", sound: "/m/" },
  { letter: "N", word: "Nest", wordZh: "鸟巢", emoji: "🪺", color: "#8FBC8F", sound: "/n/" },
  { letter: "O", word: "Owl", wordZh: "猫头鹰", emoji: "🦉", color: "#DAA520", sound: "/ɒ/" },
  { letter: "P", word: "Panda", wordZh: "熊猫", emoji: "🐼", color: "#2F4F4F", sound: "/p/" },
  { letter: "Q", word: "Queen", wordZh: "女王", emoji: "👸", color: "#FF69B4", sound: "/kw/" },
  { letter: "R", word: "Rabbit", wordZh: "兔子", emoji: "🐰", color: "#FFC0CB", sound: "/r/" },
  { letter: "S", word: "Star", wordZh: "星星", emoji: "⭐", color: "#FFD700", sound: "/s/" },
  { letter: "T", word: "Tiger", wordZh: "老虎", emoji: "🐯", color: "#FF8C00", sound: "/t/" },
  { letter: "U", word: "Umbrella", wordZh: "雨伞", emoji: "☂️", color: "#4169E1", sound: "/ʌ/" },
  { letter: "V", word: "Violin", wordZh: "小提琴", emoji: "🎻", color: "#8B4513", sound: "/v/" },
  { letter: "W", word: "Whale", wordZh: "鲸鱼", emoji: "🐳", color: "#1E90FF", sound: "/w/" },
  { letter: "X", word: "Xylophone", wordZh: "木琴", emoji: "🎵", color: "#FF6347", sound: "/ks/" },
  { letter: "Y", word: "Yak", wordZh: "牦牛", emoji: "🐃", color: "#8B6914", sound: "/j/" },
  { letter: "Z", word: "Zebra", wordZh: "斑马", emoji: "🦓", color: "#2F2F2F", sound: "/z/" },
];
