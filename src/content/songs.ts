export interface Song {
  id: string;
  title: string;
  videoSrc: string; // /video/songs/{id}.mp4
}

export interface SongCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  songs: Song[];
}

function s(id: string, title?: string): Song {
  return { id, title: title || id, videoSrc: `/video/songs/${encodeURIComponent(id)}.mp4` };
}

export const SONG_CATEGORIES: SongCategory[] = [
  {
    id: "classic",
    name: "经典儿歌",
    emoji: "🌟",
    color: "#FF9800",
    songs: [
      s("小星星"), s("两只老虎"), s("小兔子乖乖"), s("数鸭子"), s("世上只有妈妈好"),
      s("小螺号"), s("小毛驴"), s("小燕子"), s("拔萝卜"), s("找朋友"),
      s("小白兔白又白"), s("小白兔"), s("小白船"), s("小红帽"), s("捉泥鳅"),
      s("丢手绢"), s("摇篮曲"), s("娃哈哈"), s("泥娃娃"), s("一分钱"),
      s("劳动最光荣"), s("卖报歌"), s("我是一个粉刷匠"), s("采蘑菇的小姑娘"),
      s("让我们荡起双桨"), s("读书郎"), s("送别"), s("茉莉花"), s("虫儿飞"),
      s("鲁冰花"), s("童年"), s("大风车"), s("字母歌"), s("种太阳"),
      s("颜色歌"), s("歌声与微笑"), s("幸福拍手歌"), s("王老先生有块地"),
      s("小星星洗澡"), s("哆来咪"), s("舒伯特摇篮曲"),
    ],
  },
  {
    id: "animals",
    name: "动物主题",
    emoji: "🐾",
    color: "#4CAF50",
    songs: [
      s("一只哈巴狗"), s("三只小猪盖房子"), s("三只小猫"), s("三只熊"),
      s("五只小青蛙"), s("兔子舞"), s("兔子跳跳跳"), s("可爱的蓝精灵"),
      s("小熊爱刷牙"), s("小猪猪"), s("小跳蛙"), s("小鸟小鸟"), s("小龙人"),
      s("来了一群小鸭子"), s("洋娃娃和小熊跳舞"), s("爱学习的小乌龟"),
      s("白龙马"), s("萤火虫对星星说"), s("蚂蚁搬家"), s("蜗牛与黄鹂鸟"),
      s("袋鼠跳跳"), s("鲨鱼一家"), s("鹅之歌"), s("糖果屋里的小老虎"),
      s("我叫贝乐虎"), s("一只蛤蟆"), s("动物狂欢曲"),
    ],
  },
  {
    id: "habits",
    name: "生活习惯",
    emoji: "🧹",
    color: "#2196F3",
    songs: [
      s("刷牙歌"), s("洗手歌"), s("洗澡歌"), s("吃饭进行曲"), s("快乐起床歌"),
      s("健康歌"), s("我会听话"), s("礼貌歌"), s("运动歌"), s("身体音阶歌"),
      s("手指运动歌"), s("时间歌"), s("一寸光阴一寸金"), s("维生素宝宝"),
      s("我的身体最神气"), s("我是勇敢小兵兵"),
    ],
  },
  {
    id: "family",
    name: "亲子家庭",
    emoji: "👨‍👩‍👧",
    color: "#E91E63",
    songs: [
      s("我的好妈妈"), s("我爱你好妈妈"), s("妈妈生日快乐"), s("爸爸去哪儿"),
      s("爸爸妈妈听我说"), s("好爸爸坏爸爸"), s("不老的爸爸"), s("大头儿子小头爸爸"),
      s("小手牵大手"), s("小暖男"), s("宝宝的一天"), s("宝宝不怕冷"), s("宝宝不怕黑"),
      s("小宝贝"), s("小宝贝大梦想"), s("快乐小宝贝"), s("家庭称呼歌"),
      s("幸福的一家"), s("我和奶奶去买菜"), s("听妈妈讲那过去的事情"),
      s("朋友越多越快乐"), s("我的朋友在哪里"), s("爱我你就抱抱我"),
      s("我是好宝宝"), s("做个勇敢的小朋友"), s("宝贝自护歌"), s("雪宝宝"),
    ],
  },
  {
    id: "seasons",
    name: "节日季节",
    emoji: "🎉",
    color: "#9C27B0",
    songs: [
      s("新年好"), s("过大年"), s("恭喜恭喜"), s("春天在哪里"), s("春天到"),
      s("春雨沙沙"), s("中秋"), s("庆祝六一"), s("卖汤圆"), s("雪绒花"),
    ],
  },
  {
    id: "english",
    name: "English Songs",
    emoji: "🌍",
    color: "#FF5722",
    songs: [
      s("Baby-Shark", "Baby Shark"), s("Bingo"), s("Do-Re-Mi", "Do Re Mi"),
      s("If-You-Are-Happy", "If You Are Happy"), s("Jingle-Bells", "Jingle Bells"),
      s("Merry-Chrismas", "Merry Christmas"), s("Ten-Little-Indians", "Ten Little Indians"),
      s("Trick-or-Treat", "Trick or Treat"),
      s("We-Wish-You-A-Merry-Christmas", "We Wish You A Merry Christmas"),
      s("铃儿响叮当", "铃儿响叮当 (中文版)"),
    ],
  },
  {
    id: "more",
    name: "更多儿歌",
    emoji: "🎶",
    color: "#607D8B",
    songs: [
      s("-友谊地久天长", "友谊地久天长"), s("一双小小手"), s("一起来跳舞"),
      s("三个和尚"), s("上学歌"), s("乡间小路"), s("云朵棉花糖"), s("五指歌"),
      s("加油歌"), s("十二生肖歌"), s("可爱颂"), s("吹泡泡"), s("四季歌"),
      s("声律启蒙"), s("大海啊故乡"), s("小乖乖"), s("小喇叭"), s("小懒虫"),
      s("彩虹的约定"), s("感恩的心"), s("我上幼儿园"), s("我不上你的当"),
      s("我是小可爱"), s("我爱我的幼儿园"), s("打电话"), s("捉迷藏"),
      s("最美的光"), s("森林音乐家"), s("泼水歌"), s("生日快乐"),
      s("神奇画笔"), s("笑一个吧"), s("粗心的小画家"), s("聪明的一休"),
      s("花仙子"), s("苹果树"), s("表情歌"), s("郊游"), s("踩沙滩"),
      s("骑上我心爱的小摩托"), s("魔法变变变"), s("棒棒棒"),
      s("帮帮忙"), s("稍息立正站好"), s("颠倒歌"), s("锉冰进行曲"),
      s("勇气大爆发"), s("甜蜜水果派"), s("老师老师"), s("小小少年"),
      s("兰花草"), s("快乐去钓鱼"), s("我要说声谢谢你"),
      s("梦幻火车"), s("超级英雄出发"), s("超级车队"),
    ],
  },
];

export const ALL_SONGS = SONG_CATEGORIES.flatMap((c) => c.songs);
