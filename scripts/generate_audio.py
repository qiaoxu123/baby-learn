#!/usr/bin/env python3
"""Generate all audio files using edge-tts with child-friendly voices."""

import asyncio
import os
import edge_tts

VOICE_EN = "en-US-AnaNeural"      # Cute child voice
VOICE_ZH = "zh-CN-XiaoyiNeural"   # Lively cartoon voice
RATE_EN = "-10%"
RATE_ZH = "-15%"

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
EN_DIR = os.path.join(BASE, "en")
ZH_DIR = os.path.join(BASE, "zh")

os.makedirs(EN_DIR, exist_ok=True)
os.makedirs(ZH_DIR, exist_ok=True)


async def gen(text: str, voice: str, rate: str, path: str):
    if os.path.exists(path):
        return
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(path)


async def main():
    tasks = []

    # === ABC Letters ===
    print("Generating ABC audio...")
    letters_words = [
        ("A", "Apple"), ("B", "Bear"), ("C", "Cat"), ("D", "Dog"),
        ("E", "Elephant"), ("F", "Fish"), ("G", "Giraffe"), ("H", "Horse"),
        ("I", "Ice cream"), ("J", "Jellyfish"), ("K", "Koala"), ("L", "Lion"),
        ("M", "Monkey"), ("N", "Nest"), ("O", "Owl"), ("P", "Panda"),
        ("Q", "Queen"), ("R", "Rabbit"), ("S", "Star"), ("T", "Tiger"),
        ("U", "Umbrella"), ("V", "Violin"), ("W", "Whale"), ("X", "Xylophone"),
        ("Y", "Yak"), ("Z", "Zebra"),
    ]
    for letter, word in letters_words:
        ll = letter.lower()
        tasks.append(gen(letter, VOICE_EN, RATE_EN, f"{EN_DIR}/letter-{ll}.mp3"))
        tasks.append(gen(f"{letter} is for {word}", VOICE_EN, RATE_EN, f"{EN_DIR}/letter-{ll}-word.mp3"))

    # === Vocabulary ===
    print("Generating vocabulary audio...")
    vocab = [
        "Cat", "Dog", "Bird", "Fish", "Duck", "Cow", "Pig", "Rabbit", "Panda", "Butterfly",
        "Red", "Blue", "Yellow", "Green", "Orange", "Purple", "Pink", "White",
        "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Apple", "Banana", "Grape", "Strawberry", "Watermelon", "Peach", "Cherry",
    ]
    vocab_ids = [
        "cat", "dog", "bird", "fish", "duck", "cow", "pig", "rabbit", "panda", "butterfly",
        "red", "blue", "yellow", "green", "orange", "purple", "pink", "white",
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
        "apple", "banana", "grape", "strawberry", "watermelon", "peach", "cherry",
    ]
    # Animal sounds
    animal_sounds = {
        "cat": "Meow!", "dog": "Woof woof!", "bird": "Tweet tweet!",
        "duck": "Quack quack!", "cow": "Moo!", "pig": "Oink oink!",
    }

    for word, wid in zip(vocab, vocab_ids):
        tasks.append(gen(word, VOICE_EN, RATE_EN, f"{EN_DIR}/vocab-{wid}.mp3"))
    for wid, sound in animal_sounds.items():
        tasks.append(gen(sound, VOICE_EN, RATE_EN, f"{EN_DIR}/sound-{wid}.mp3"))

    # Also generate "Orange" for fruit separately
    tasks.append(gen("Orange", VOICE_EN, RATE_EN, f"{EN_DIR}/vocab-orange-fruit.mp3"))

    # === Poetry ===
    print("Generating poetry audio...")
    poems = {
        "yong-e": {
            "title": "咏鹅",
            "lines": ["鹅鹅鹅，", "曲项向天歌。", "白毛浮绿水，", "红掌拨清波。"],
        },
        "jing-ye-si": {
            "title": "静夜思",
            "lines": ["床前明月光，", "疑是地上霜。", "举头望明月，", "低头思故乡。"],
        },
        "chun-xiao": {
            "title": "春晓",
            "lines": ["春眠不觉晓，", "处处闻啼鸟。", "夜来风雨声，", "花落知多少。"],
        },
        "yong-liu": {
            "title": "咏柳",
            "lines": ["碧玉妆成一树高，", "万条垂下绿丝绦。", "不知细叶谁裁出，", "二月春风似剪刀。"],
        },
        "min-nong": {
            "title": "悯农",
            "lines": ["锄禾日当午，", "汗滴禾下土。", "谁知盘中餐，", "粒粒皆辛苦。"],
        },
    }
    for pid, poem in poems.items():
        tasks.append(gen(poem["title"], VOICE_ZH, RATE_ZH, f"{ZH_DIR}/{pid}-title.mp3"))
        full_text = "".join(poem["lines"])
        tasks.append(gen(full_text, VOICE_ZH, RATE_ZH, f"{ZH_DIR}/{pid}-full.mp3"))
        for i, line in enumerate(poem["lines"], 1):
            tasks.append(gen(line, VOICE_ZH, RATE_ZH, f"{ZH_DIR}/{pid}-{i}.mp3"))

    # === Chinese Songs ===
    print("Generating Chinese songs audio...")
    zh_songs = {
        "xiao-xing-xing": ("小星星", [
            "一闪一闪亮晶晶，", "满天都是小星星。",
            "挂在天上放光明，", "好像许多小眼睛。",
            "一闪一闪亮晶晶，", "满天都是小星星。",
        ]),
        "liang-zhi-laohu": ("两只老虎", [
            "两只老虎，两只老虎，", "跑得快，跑得快。",
            "一只没有眼睛，", "一只没有尾巴，", "真奇怪，真奇怪。",
        ]),
        "xiao-tu-zi-guai-guai": ("小兔子乖乖", [
            "小兔子乖乖，把门儿开开。", "快点儿开开，我要进来。",
            "不开不开我不开，", "妈妈没回来，", "谁来也不开。",
        ]),
        "xiao-mao-mi": ("小花猫", [
            "小花猫，喵喵叫，", "看见老鼠就追跑。",
            "跑过来，跑过去，", "老鼠吓得到处跑。",
        ]),
        "shi-shang-zhi-you": ("世上只有妈妈好", [
            "世上只有妈妈好，", "有妈的孩子像块宝。",
            "投进妈妈的怀抱，", "幸福享不了。",
        ]),
        "xiao-ya-zi": ("数鸭子", [
            "门前大桥下，", "游过一群鸭。",
            "快来快来数一数，", "二四六七八。",
            "嘎嘎嘎嘎真呀真多呀，", "数不清到底多少鸭。",
        ]),
        "xiao-luo-hao": ("小螺号", [
            "小螺号，嘀嘀嘀吹，", "海鸥听了展翅飞。",
            "小螺号，嘀嘀嘀吹，", "浪花听了笑微微。",
        ]),
    }
    for sid, (title, lyrics) in zh_songs.items():
        tasks.append(gen(title, VOICE_ZH, RATE_ZH, f"{ZH_DIR}/song-{sid}-title.mp3"))
        for i, line in enumerate(lyrics, 1):
            tasks.append(gen(line, VOICE_ZH, RATE_ZH, f"{ZH_DIR}/song-{sid}-{i}.mp3"))

    # === English Songs ===
    print("Generating English songs audio...")
    en_songs = {
        "old-macdonald": ("Old MacDonald Had a Farm", [
            "Old MacDonald had a farm,", "E-I-E-I-O!",
            "And on his farm he had a cow,", "E-I-E-I-O!",
            "With a moo-moo here,", "And a moo-moo there,",
            "Old MacDonald had a farm,", "E-I-E-I-O!",
        ]),
        "wheels-on-bus": ("The Wheels on the Bus", [
            "The wheels on the bus", "go round and round,",
            "round and round,", "round and round.",
            "The wheels on the bus", "go round and round,",
            "all through the town!",
        ]),
        "head-shoulders": ("Head, Shoulders, Knees and Toes", [
            "Head, shoulders,", "knees and toes,", "knees and toes.",
            "Head, shoulders,", "knees and toes,", "knees and toes.",
            "Eyes and ears", "and mouth and nose.",
            "Head, shoulders,", "knees and toes,", "knees and toes!",
        ]),
        "baa-baa": ("Baa Baa Black Sheep", [
            "Baa, baa, black sheep,", "have you any wool?",
            "Yes sir, yes sir,", "three bags full.",
            "One for the master,", "one for the dame,",
            "one for the little boy", "who lives down the lane.",
        ]),
        "itsy-bitsy": ("Itsy Bitsy Spider", [
            "The itsy bitsy spider", "went up the water spout.",
            "Down came the rain", "and washed the spider out.",
            "Out came the sun", "and dried up all the rain.",
            "And the itsy bitsy spider", "went up the spout again.",
        ]),
    }
    for sid, (title, lyrics) in en_songs.items():
        tasks.append(gen(title, VOICE_EN, RATE_EN, f"{EN_DIR}/song-{sid}-title.mp3"))
        for i, line in enumerate(lyrics, 1):
            tasks.append(gen(line, VOICE_EN, RATE_EN, f"{EN_DIR}/song-{sid}-{i}.mp3"))

    # Run all concurrently (batched)
    batch_size = 15
    for i in range(0, len(tasks), batch_size):
        batch = tasks[i:i + batch_size]
        await asyncio.gather(*batch)
        done = min(i + batch_size, len(tasks))
        print(f"  Progress: {done}/{len(tasks)}")

    en_count = len([f for f in os.listdir(EN_DIR) if f.endswith(".mp3")])
    zh_count = len([f for f in os.listdir(ZH_DIR) if f.endswith(".mp3")])
    print(f"\nDone! English: {en_count} files, Chinese: {zh_count} files")


if __name__ == "__main__":
    asyncio.run(main())
