#!/bin/bash
# Generate all audio files using edge-tts
# English: en-US-AnaNeural (cute child voice)
# Chinese: zh-CN-XiaoyiNeural (lively cartoon voice)

OUT_EN="../public/audio/en"
OUT_ZH="../public/audio/zh"
VOICE_EN="en-US-AnaNeural"
VOICE_ZH="zh-CN-XiaoyiNeural"
RATE_EN="-10%"
RATE_ZH="-15%"

cd "$(dirname "$0")"

echo "=== Generating English ABC audio ==="
letters=("A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z")
words=("Apple" "Bear" "Cat" "Dog" "Elephant" "Fish" "Giraffe" "Horse" "Ice cream" "Jellyfish" "Koala" "Lion" "Monkey" "Nest" "Owl" "Panda" "Queen" "Rabbit" "Star" "Tiger" "Umbrella" "Violin" "Whale" "Xylophone" "Yak" "Zebra")

for i in "${!letters[@]}"; do
  l="${letters[$i]}"
  w="${words[$i]}"
  ll=$(echo "$l" | tr 'A-Z' 'a-z')

  # Letter sound
  edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "$l" --write-media "$OUT_EN/letter-${ll}.mp3" 2>/dev/null &

  # "X is for Word"
  edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "$l is for $w" --write-media "$OUT_EN/letter-${ll}-word.mp3" 2>/dev/null &

  # Wait every 8 to avoid too many parallel
  if (( (i+1) % 8 == 0 )); then wait; echo "  Letters ${letters[$((i-7))]}..${l} done"; fi
done
wait
echo "  ABC audio done"

echo "=== Generating English vocabulary audio ==="
vocab_en=("Cat" "Dog" "Bird" "Fish" "Duck" "Cow" "Pig" "Rabbit" "Panda" "Butterfly"
          "Red" "Blue" "Yellow" "Green" "Orange" "Purple" "Pink" "White"
          "One" "Two" "Three" "Four" "Five" "Six" "Seven" "Eight" "Nine" "Ten"
          "Apple" "Banana" "Grape" "Orange" "Strawberry" "Watermelon" "Peach" "Cherry")
vocab_ids=("cat" "dog" "bird" "fish" "duck" "cow" "pig" "rabbit" "panda" "butterfly"
           "red" "blue" "yellow" "green" "orange" "purple" "pink" "white"
           "one" "two" "three" "four" "five" "six" "seven" "eight" "nine" "ten"
           "apple" "banana" "grape" "orange-fruit" "strawberry" "watermelon" "peach" "cherry")

for i in "${!vocab_en[@]}"; do
  edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "${vocab_en[$i]}" --write-media "$OUT_EN/vocab-${vocab_ids[$i]}.mp3" 2>/dev/null &
  if (( (i+1) % 10 == 0 )); then wait; echo "  Vocab batch done"; fi
done
wait
echo "  Vocab audio done"

echo "=== Generating Chinese poetry audio ==="
# 咏鹅
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "咏鹅" --write-media "$OUT_ZH/yong-e-title.mp3" 2>/dev/null
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。" --write-media "$OUT_ZH/yong-e-full.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "鹅鹅鹅，" --write-media "$OUT_ZH/yong-e-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "曲项向天歌。" --write-media "$OUT_ZH/yong-e-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "白毛浮绿水，" --write-media "$OUT_ZH/yong-e-3.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "红掌拨清波。" --write-media "$OUT_ZH/yong-e-4.mp3" 2>/dev/null &
wait

# 静夜思
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "静夜思" --write-media "$OUT_ZH/jing-ye-si-title.mp3" 2>/dev/null
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "床前明月光，疑是地上霜。举头望明月，低头思故乡。" --write-media "$OUT_ZH/jing-ye-si-full.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "床前明月光，" --write-media "$OUT_ZH/jing-ye-si-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "疑是地上霜。" --write-media "$OUT_ZH/jing-ye-si-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "举头望明月，" --write-media "$OUT_ZH/jing-ye-si-3.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "低头思故乡。" --write-media "$OUT_ZH/jing-ye-si-4.mp3" 2>/dev/null &
wait

# 春晓
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "春晓" --write-media "$OUT_ZH/chun-xiao-title.mp3" 2>/dev/null
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "春眠不觉晓，" --write-media "$OUT_ZH/chun-xiao-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "处处闻啼鸟。" --write-media "$OUT_ZH/chun-xiao-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "夜来风雨声，" --write-media "$OUT_ZH/chun-xiao-3.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "花落知多少。" --write-media "$OUT_ZH/chun-xiao-4.mp3" 2>/dev/null &
wait

# 咏柳
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "咏柳" --write-media "$OUT_ZH/yong-liu-title.mp3" 2>/dev/null
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "碧玉妆成一树高，" --write-media "$OUT_ZH/yong-liu-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "万条垂下绿丝绦。" --write-media "$OUT_ZH/yong-liu-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "不知细叶谁裁出，" --write-media "$OUT_ZH/yong-liu-3.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "二月春风似剪刀。" --write-media "$OUT_ZH/yong-liu-4.mp3" 2>/dev/null &
wait

# 悯农
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "悯农" --write-media "$OUT_ZH/min-nong-title.mp3" 2>/dev/null
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "锄禾日当午，" --write-media "$OUT_ZH/min-nong-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "汗滴禾下土。" --write-media "$OUT_ZH/min-nong-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "谁知盘中餐，" --write-media "$OUT_ZH/min-nong-3.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "粒粒皆辛苦。" --write-media "$OUT_ZH/min-nong-4.mp3" 2>/dev/null &
wait

echo "=== Generating Chinese songs audio ==="
# 儿歌 - 每首歌逐行生成
songs_ids=("xiao-xing-xing" "liang-zhi-laohu" "xiao-tu-zi-guai-guai" "xiao-mao-mi" "shi-shang-zhi-you" "xiao-ya-zi" "xiao-luo-hao")
songs_titles=("小星星" "两只老虎" "小兔子乖乖" "小花猫" "世上只有妈妈好" "数鸭子" "小螺号")

for i in "${!songs_ids[@]}"; do
  edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "${songs_titles[$i]}" --write-media "$OUT_ZH/song-${songs_ids[$i]}-title.mp3" 2>/dev/null &
done
wait

# Song lyrics line by line
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "一闪一闪亮晶晶，满天都是小星星。" --write-media "$OUT_ZH/song-xiao-xing-xing-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "挂在天上放光明，好像许多小眼睛。" --write-media "$OUT_ZH/song-xiao-xing-xing-2.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "两只老虎，两只老虎，跑得快，跑得快。" --write-media "$OUT_ZH/song-liang-zhi-laohu-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_ZH" --rate "$RATE_ZH" --text "一只没有眼睛，一只没有尾巴，真奇怪，真奇怪。" --write-media "$OUT_ZH/song-liang-zhi-laohu-2.mp3" 2>/dev/null &
wait

echo "=== Generating English songs audio ==="
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "Old MacDonald Had a Farm" --write-media "$OUT_EN/song-old-macdonald-title.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "Old MacDonald had a farm, E I E I O! And on his farm he had a cow, E I E I O!" --write-media "$OUT_EN/song-old-macdonald-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "The Wheels on the Bus" --write-media "$OUT_EN/song-wheels-on-bus-title.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "The wheels on the bus go round and round, round and round, round and round, all through the town!" --write-media "$OUT_EN/song-wheels-on-bus-1.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "Head, Shoulders, Knees and Toes" --write-media "$OUT_EN/song-head-shoulders-title.mp3" 2>/dev/null &
edge-tts --voice "$VOICE_EN" --rate "$RATE_EN" --text "Head, shoulders, knees and toes, knees and toes. Eyes and ears and mouth and nose." --write-media "$OUT_EN/song-head-shoulders-1.mp3" 2>/dev/null &
wait

echo "=== All audio generated! ==="
echo "English files: $(ls $OUT_EN/*.mp3 2>/dev/null | wc -l)"
echo "Chinese files: $(ls $OUT_ZH/*.mp3 2>/dev/null | wc -l)"
