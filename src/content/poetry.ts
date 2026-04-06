export interface PoemLine {
  text: string;
  pinyin: string;
}

export interface Poem {
  id: string;
  title: string;
  titlePinyin: string;
  author: string;
  authorPinyin: string;
  dynasty: string;
  lines: PoemLine[];
  illustration: string; // emoji scene
  bgColor: string;
  description: string; // simple explanation for parents
}

export const POETRY_DATA: Poem[] = [
  {
    id: "yong-e",
    title: "咏鹅",
    titlePinyin: "yǒng é",
    author: "骆宾王",
    authorPinyin: "luò bīn wáng",
    dynasty: "唐",
    lines: [
      { text: "鹅鹅鹅，", pinyin: "é é é，" },
      { text: "曲项向天歌。", pinyin: "qū xiàng xiàng tiān gē。" },
      { text: "白毛浮绿水，", pinyin: "bái máo fú lǜ shuǐ，" },
      { text: "红掌拨清波。", pinyin: "hóng zhǎng bō qīng bō。" },
    ],
    illustration: "🪿",
    bgColor: "#E8F5E9",
    description: "小白鹅在绿水里游泳，弯着脖子唱歌",
  },
  {
    id: "jing-ye-si",
    title: "静夜思",
    titlePinyin: "jìng yè sī",
    author: "李白",
    authorPinyin: "lǐ bái",
    dynasty: "唐",
    lines: [
      { text: "床前明月光，", pinyin: "chuáng qián míng yuè guāng，" },
      { text: "疑是地上霜。", pinyin: "yí shì dì shàng shuāng。" },
      { text: "举头望明月，", pinyin: "jǔ tóu wàng míng yuè，" },
      { text: "低头思故乡。", pinyin: "dī tóu sī gù xiāng。" },
    ],
    illustration: "🌙",
    bgColor: "#E8EAF6",
    description: "月亮的光照在床前，让人想起远方的家",
  },
  {
    id: "chun-xiao",
    title: "春晓",
    titlePinyin: "chūn xiǎo",
    author: "孟浩然",
    authorPinyin: "mèng hào rán",
    dynasty: "唐",
    lines: [
      { text: "春眠不觉晓，", pinyin: "chūn mián bù jué xiǎo，" },
      { text: "处处闻啼鸟。", pinyin: "chù chù wén tí niǎo。" },
      { text: "夜来风雨声，", pinyin: "yè lái fēng yǔ shēng，" },
      { text: "花落知多少。", pinyin: "huā luò zhī duō shǎo。" },
    ],
    illustration: "🌸",
    bgColor: "#FCE4EC",
    description: "春天的早晨，到处都能听到小鸟唱歌",
  },
  {
    id: "yong-liu",
    title: "咏柳",
    titlePinyin: "yǒng liǔ",
    author: "贺知章",
    authorPinyin: "hè zhī zhāng",
    dynasty: "唐",
    lines: [
      { text: "碧玉妆成一树高，", pinyin: "bì yù zhuāng chéng yī shù gāo，" },
      { text: "万条垂下绿丝绦。", pinyin: "wàn tiáo chuí xià lǜ sī tāo。" },
      { text: "不知细叶谁裁出，", pinyin: "bù zhī xì yè shuí cái chū，" },
      { text: "二月春风似剪刀。", pinyin: "èr yuè chūn fēng sì jiǎn dāo。" },
    ],
    illustration: "🌿",
    bgColor: "#E8F5E9",
    description: "绿色的柳树好美，春风就像剪刀剪出了细细的叶子",
  },
  {
    id: "min-nong",
    title: "悯农",
    titlePinyin: "mǐn nóng",
    author: "李绅",
    authorPinyin: "lǐ shēn",
    dynasty: "唐",
    lines: [
      { text: "锄禾日当午，", pinyin: "chú hé rì dāng wǔ，" },
      { text: "汗滴禾下土。", pinyin: "hàn dī hé xià tǔ。" },
      { text: "谁知盘中餐，", pinyin: "shuí zhī pán zhōng cān，" },
      { text: "粒粒皆辛苦。", pinyin: "lì lì jiē xīn kǔ。" },
    ],
    illustration: "🌾",
    bgColor: "#FFF8E1",
    description: "农民伯伯辛苦种粮食，我们要爱惜每一粒米饭",
  },
];
