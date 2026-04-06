export interface VocabItem {
  id: string;
  english: string;
  chinese: string;
  emoji: string;
  sound?: string; // animal sound
}

export interface VocabCategory {
  id: string;
  name: string;
  nameZh: string;
  emoji: string;
  color: string;
  items: VocabItem[];
}

export const VOCAB_DATA: VocabCategory[] = [
  {
    id: "animals",
    name: "Animals",
    nameZh: "动物",
    emoji: "🐾",
    color: "#4ECDC4",
    items: [
      { id: "cat", english: "Cat", chinese: "猫咪", emoji: "🐱", sound: "Meow!" },
      { id: "dog", english: "Dog", chinese: "小狗", emoji: "🐶", sound: "Woof!" },
      { id: "bird", english: "Bird", chinese: "小鸟", emoji: "🐦", sound: "Tweet!" },
      { id: "fish", english: "Fish", chinese: "小鱼", emoji: "🐟", sound: "Splash!" },
      { id: "duck", english: "Duck", chinese: "鸭子", emoji: "🦆", sound: "Quack!" },
      { id: "cow", english: "Cow", chinese: "奶牛", emoji: "🐮", sound: "Moo!" },
      { id: "pig", english: "Pig", chinese: "小猪", emoji: "🐷", sound: "Oink!" },
      { id: "rabbit", english: "Rabbit", chinese: "兔子", emoji: "🐰" },
      { id: "panda", english: "Panda", chinese: "熊猫", emoji: "🐼" },
      { id: "butterfly", english: "Butterfly", chinese: "蝴蝶", emoji: "🦋" },
    ],
  },
  {
    id: "colors",
    name: "Colors",
    nameZh: "颜色",
    emoji: "🎨",
    color: "#FF6B6B",
    items: [
      { id: "red", english: "Red", chinese: "红色", emoji: "🔴" },
      { id: "blue", english: "Blue", chinese: "蓝色", emoji: "🔵" },
      { id: "yellow", english: "Yellow", chinese: "黄色", emoji: "🟡" },
      { id: "green", english: "Green", chinese: "绿色", emoji: "🟢" },
      { id: "orange", english: "Orange", chinese: "橙色", emoji: "🟠" },
      { id: "purple", english: "Purple", chinese: "紫色", emoji: "🟣" },
      { id: "pink", english: "Pink", chinese: "粉色", emoji: "🩷" },
      { id: "white", english: "White", chinese: "白色", emoji: "⚪" },
    ],
  },
  {
    id: "numbers",
    name: "Numbers",
    nameZh: "数字",
    emoji: "🔢",
    color: "#FFE66D",
    items: [
      { id: "one", english: "One", chinese: "一", emoji: "1️⃣" },
      { id: "two", english: "Two", chinese: "二", emoji: "2️⃣" },
      { id: "three", english: "Three", chinese: "三", emoji: "3️⃣" },
      { id: "four", english: "Four", chinese: "四", emoji: "4️⃣" },
      { id: "five", english: "Five", chinese: "五", emoji: "5️⃣" },
      { id: "six", english: "Six", chinese: "六", emoji: "6️⃣" },
      { id: "seven", english: "Seven", chinese: "七", emoji: "7️⃣" },
      { id: "eight", english: "Eight", chinese: "八", emoji: "8️⃣" },
      { id: "nine", english: "Nine", chinese: "九", emoji: "9️⃣" },
      { id: "ten", english: "Ten", chinese: "十", emoji: "🔟" },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    nameZh: "水果",
    emoji: "🍎",
    color: "#A8E6CF",
    items: [
      { id: "apple", english: "Apple", chinese: "苹果", emoji: "🍎" },
      { id: "banana", english: "Banana", chinese: "香蕉", emoji: "🍌" },
      { id: "grape", english: "Grape", chinese: "葡萄", emoji: "🍇" },
      { id: "orange-fruit", english: "Orange", chinese: "橘子", emoji: "🍊" },
      { id: "strawberry", english: "Strawberry", chinese: "草莓", emoji: "🍓" },
      { id: "watermelon", english: "Watermelon", chinese: "西瓜", emoji: "🍉" },
      { id: "peach", english: "Peach", chinese: "桃子", emoji: "🍑" },
      { id: "cherry", english: "Cherry", chinese: "樱桃", emoji: "🍒" },
    ],
  },
];
