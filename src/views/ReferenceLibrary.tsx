import React, { useState, useEffect } from 'react';
import { 
  Search, Heart, Flame, LayoutGrid, Eye, Search as SearchIcon, Filter, 
  PlayCircle, X, MessageCircle, Star, Share2, MoreHorizontal, ChevronLeft, ChevronRight, Wand2 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Some mock thumbnails mimicking Xiaohongshu aspect ratios
const MOCK_NOTES = [
  {
    id: 1,
    title: '秋冬氛围感穿搭｜温柔拿捏🍂微胖绝绝子',
    author: '芝士莓莓',
    likes: '1.2w',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=600',
    avatar: 'https://ui-avatars.com/api/?name=Z&background=random',
  },
  {
    id: 2,
    title: '租房vlog | 爆改10平米城中村单间，提升幸福感',
    author: '野生设计师',
    likes: '8520',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=400',
    avatar: 'https://ui-avatars.com/api/?name=W&background=random',
    isVideo: true,
  },
  {
    id: 3,
    title: '干敏皮福音！这套精简护肤流程真的绝，便宜又好用',
    author: '护肤小能手',
    likes: '2.5w',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500',
    avatar: 'https://ui-avatars.com/api/?name=H&background=random',
  },
  {
    id: 4,
    title: '上海探店 | 魔都必吃的浪漫法式餐厅🍷约会首选',
    author: '魔都吃货',
    likes: '3491',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=400&h=450',
    avatar: 'https://ui-avatars.com/api/?name=M&background=random',
  },
  {
    id: 5,
    title: '新手化妆教程｜放大双眼の心机眼妆，有手就会！',
    author: '美妆大阿姨',
    likes: '4.8w',
    image: 'https://images.unsplash.com/photo-1512496264491-9c6a1e944b0c?auto=format&fit=crop&q=80&w=400&h=550',
    avatar: 'https://ui-avatars.com/api/?name=M&background=random',
  },
  {
    id: 6,
    title: '周末去哪儿｜杭州周边最美小众徒步路线，吸氧去',
    author: '地球流浪汉',
    likes: '921',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400&h=650',
    avatar: 'https://ui-avatars.com/api/?name=D&background=random',
  },
  {
    id: 7,
    title: 'OOTD日常｜黑白灰极简高级感穿搭，今天是清冷学姐',
    author: 'Celia',
    likes: '1.8w',
    image: 'https://images.unsplash.com/photo-1434382842757-ea64861bc9b2?auto=format&fit=crop&q=80&w=400&h=500',
    avatar: 'https://ui-avatars.com/api/?name=C&background=random',
  },
  {
    id: 8,
    title: '我的桌面物语👩🏻‍💻沉浸式学习桌搭分享，拒绝精神内耗',
    author: '学习委员',
    likes: '6245',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400&h=300',
    avatar: 'https://ui-avatars.com/api/?name=X&background=random',
  },
  {
    id: 9,
    title: '今天不吃肉🤤轻断食健康减脂餐合集，越吃越瘦',
    author: '健身少女',
    likes: '3.1w',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=450',
    avatar: 'https://ui-avatars.com/api/?name=J&background=random',
  },
  {
    id: 10,
    title: '富士X100V实拍｜原片直出绝了，这就是我的梦中情机',
    author: '光影捕手',
    likes: '2.1w',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=550',
    avatar: 'https://ui-avatars.com/api/?name=G&background=random',
  },
  {
    id: 11,
    title: '早八人福音！5分钟搞定完美底妆，早起是不可能的',
    author: '不想起床',
    likes: '15.2w',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=600',
    avatar: 'https://ui-avatars.com/api/?name=B&background=random',
    isVideo: true,
  },
  {
    id: 12,
    title: '送给闺蜜的生日礼物清单🎁不踩雷直接抄作业',
    author: '挑剔的王小丫',
    likes: '8910',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=400',
    avatar: 'https://ui-avatars.com/api/?name=T&background=random',
  }
];

const CATEGORIES = ['推荐', '穿搭', '护肤', '探店', '彩妆', '摄影', '家居', '职场', '美食', '运动'];

export default function ReferenceLibrary() {
  const [activeCategory, setActiveCategory] = useState('推荐');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<typeof MOCK_NOTES[0] | null>(null);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (activeNote) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeNote]);

  const handlePrevNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeNote) return;
    const currentIndex = MOCK_NOTES.findIndex(n => n.id === activeNote.id);
    if (currentIndex > 0) setActiveNote(MOCK_NOTES[currentIndex - 1]);
  };

  const handleNextNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeNote) return;
    const currentIndex = MOCK_NOTES.findIndex(n => n.id === activeNote.id);
    if (currentIndex < MOCK_NOTES.length - 1) setActiveNote(MOCK_NOTES[currentIndex + 1]);
  };

  return (
    <div className="h-full flex flex-col pt-2">
      {/* Top Bar: Search and Categories */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm mx-auto w-full max-w-7xl relative z-20">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-[400px]">
            <input 
              type="text" 
              placeholder="搜索优质爆款笔记，激发创作灵感..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 border border-transparent rounded-full py-2.5 pl-10 pr-4 text-[14px] text-slate-800 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400 placeholder:font-normal"
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4 mr-2 text-slate-400" /> 高级筛选
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 rounded-full text-sm font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-500 transition-colors">
              AI 智能拆解
            </button>
          </div>
        </div>
        
        <div className="px-5 py-3 flex gap-6 overflow-x-auto no-scrollbar items-center justify-start">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap pb-1.5 border-b-2 transition-colors px-1 text-[15px]",
                activeCategory === cat
                  ? "border-[#ff2442] text-slate-900 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-700 font-medium"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Waterfall Grid */}
      <div className="flex-1 overflow-y-auto pt-6 px-4 pb-12 custom-scrollbar">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {MOCK_NOTES.map((note) => (
            <motion.div 
              key={note.id}
              onClick={() => setActiveNote(note)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: note.id * 0.05 }}
              whileHover={{ y: -4 }}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all cursor-pointer border border-transparent hover:border-slate-100 group relative"
            >
              <div className="relative">
                 <img src={note.image} alt={note.title} className="w-full object-cover" loading="lazy" />
                 {note.isVideo && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <PlayCircle className="w-4 h-4" />
                    </div>
                 )}
                 {/* Overlay Gradient for readability if we wanted */}
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-3">
                <h3 className="text-[14px] font-[500] text-[#333333] leading-[1.4] mb-3 line-clamp-2">
                  {note.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <img 
                      src={note.avatar} 
                      alt={note.author} 
                      className="w-[18px] h-[18px] rounded-full object-cover border border-slate-100 shrink-0"
                    />
                    <span className="text-[11px] text-[#666666] truncate pr-2">
                      {note.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#666666] shrink-0">
                    <Heart className="w-[12px] h-[12px]" />
                    <span className="text-[11px] font-medium">{note.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveNote(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 text-black backdrop-blur-md rounded-full sm:hidden transition-colors"
               >
                 <X className="w-5 h-5" />
              </button>

              {/* Left Column: Media */}
              <div className="w-full sm:w-[55%] bg-[#111111] relative flex items-center justify-center group overflow-hidden">
                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevNote}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:flex"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNextNote}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hidden sm:flex"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <img 
                  src={activeNote.image} 
                  alt={activeNote.title} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>

              {/* Right Column: Content */}
              <div className="w-full sm:w-[45%] bg-white flex flex-col hidden sm:flex">
                {/* Author Info / Header */}
                <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <img src={activeNote.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                    <span className="font-bold text-[15px] text-[#333333] hover:text-[#ff2442] cursor-pointer transition-colors">
                      {activeNote.author}
                    </span>
                  </div>
                  <button className="px-5 py-1.5 bg-[#ff2442] hover:bg-[#e01936] text-white text-[13px] font-bold rounded-full transition-colors shadow-[0_2px_8px_rgba(255,36,66,0.3)]">
                    关注
                  </button>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar text-[#333333]">
                  {/* AI Extract Widget (Tool addition) */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Wand2 className="w-12 h-12" />
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-[13px]">
                      <Wand2 className="w-4 h-4" /> AI 爆款拆解引擎 
                    </div>
                    <div className="text-[12px] text-blue-900/70 leading-relaxed max-w-[90%]">
                      情绪点：共鸣感强 / 实用价值：极简高效 <br/>
                      结构：痛点痛击 → 反差呈现 → 解决干货，此模版裂变概率 <span className="font-bold text-blue-700">92%</span> 
                    </div>
                    <button className="mt-3 px-3 py-1.5 bg-white text-blue-600 text-[11px] font-bold rounded-lg border border-blue-200 shadow-sm hover:shadow transition-all">
                      ⚡ 应用此模版结构创建任务
                    </button>
                  </div>

                  <h1 className="text-[18px] font-[600] leading-snug mb-4 tracking-wide text-slate-800">
                    {activeNote.title}
                  </h1>
                  
                  <div className="text-[15px] leading-[1.8] whitespace-pre-wrap font-[400] text-slate-700">
                    {/* Mock detailed text */}
                    这个真的是我最近逢人便夸的宝藏法则！
                    {' '}
                    不知道有没有姐妹跟我一样，每天都在为了这些小事情内耗...
                    但是自从我调整了方法之后，整个人简直就是豁然开朗！
                    {' '}
                    下面直接上干货👇
                    {' '}
                    1. 拒绝完美主义，完成比完美更重要。
                    2. 学会课题分离，不要把别人的情绪归咎于自己。
                    3. 保持边界感，勇敢说“不”！
                    {' '}
                    真的建议所有人把这些法则刻进DNA里！！
                  </div>
                  
                  <div className="mt-5 mb-5 space-y-2">
                    <div className="flex flex-wrap gap-2 text-[#13306d] text-[15px] cursor-pointer">
                      <span className="hover:text-[#0b1d44]">#日常分享</span>
                      <span className="hover:text-[#0b1d44]">#干货</span>
                      <span className="hover:text-[#0b1d44]">#沉浸式</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-[12px] text-[#999999] mb-4 space-x-3">
                    <span>10-24</span>
                    <span>上海</span>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100 my-4"></div>
                  
                  <div className="text-[14px] text-slate-600 font-medium mb-4 flex items-center">
                    共 128 条评论
                  </div>
                  
                  {/* Mock Comment */}
                  <div className="flex gap-3 mb-4">
                    <img src="https://ui-avatars.com/api/?name=A&background=random" className="w-8 h-8 rounded-full border border-slate-100" />
                    <div>
                      <div className="text-[12px] text-[#666666] font-medium mb-0.5">努力搞钱的小仙女</div>
                      <div className="text-[13px] text-slate-700 leading-snug">狠狠码住了！这简直就是世另我啊😭</div>
                      <div className="flex items-center gap-4 text-[11px] text-[#999999] mt-1.5">
                        <span>昨天 14:30</span>
                        <div className="flex items-center gap-1"><Heart className="w-3 h-3" /> 23</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Interaction Bar */}
                <div className="h-[72px] border-t border-slate-100 bg-white flex items-center px-4 md:px-6 shrink-0 justify-between">
                  <div className="flex-1 mr-4">
                    <div className="h-9 bg-slate-100 rounded-full flex items-center px-4 text-[#999999] text-[13px] hover:bg-slate-200 transition-colors cursor-text">
                      说点什么...
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-5 text-[#333333]">
                    <button className="flex items-center gap-1 flex-col justify-center group">
                      <Heart className="w-6 h-6 group-hover:text-[#ff2442] transition-colors" />
                      <span className="text-[11px] font-medium text-[#666666]">{activeNote.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 flex-col justify-center group">
                      <Star className="w-6 h-6 group-hover:text-amber-500 transition-colors" />
                      <span className="text-[11px] font-medium text-[#666666]">收藏</span>
                    </button>
                    <button className="flex items-center gap-1 flex-col justify-center group">
                      <MessageCircle className="w-6 h-6 group-hover:text-blue-500 transition-colors" />
                      <span className="text-[11px] font-medium text-[#666666]">128</span>
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
