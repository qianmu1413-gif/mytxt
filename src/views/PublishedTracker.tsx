import React, { useState, useEffect } from 'react';
// Add icons
import { 
  Search, Heart, Eye, Filter, PlayCircle, X, MessageCircle, BarChart3, 
  ExternalLink, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight, 
  LinkIcon, MousePointerClick, Zap, MessageSquareQuote, Flame, LayoutDashboard,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the area chart
const trafficData = [
  { time: '10:00', interactions: 15 },
  { time: '12:00', interactions: 45 },
  { time: '14:00', interactions: 120 },
  { time: '16:00', interactions: 380 },
  { time: '18:00', interactions: 850 },
  { time: '20:00', interactions: 1540 },
  { time: '22:00', interactions: 1280 },
];

const MOCK_PUBLISHED_NOTES = [
  {
    id: 1,
    title: '早八打工人必备！5分钟搞定无暇底妆✨',
    account: '美妆小助理',
    avatar: 'https://ui-avatars.com/api/?name=A&background=random',
    publishTime: '2小时前',
    cover: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=600',
    metrics: { likes: 1240, favorites: 856, comments: 89, linkClicks: 342 },
    status: 'viral', // viral, warning, normal
    attachedLink: '【粉丝福利】免费领试用装',
    isVideo: true,
  },
  {
    id: 2,
    title: '不吃肉也能瘦！减脂期绝赞轻断食食谱🥗',
    account: '健身少女',
    avatar: 'https://ui-avatars.com/api/?name=J&background=random',
    publishTime: '昨天 17:30',
    cover: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=450',
    metrics: { likes: 580, favorites: 320, comments: 24, linkClicks: 120 },
    status: 'normal',
    attachedLink: '点击获取完整版食谱PDF',
    isVideo: false,
  },
  {
    id: 3,
    title: '护肤小白避雷指南！这些成分千万别混用😨',
    account: '护肤研究所',
    avatar: 'https://ui-avatars.com/api/?name=H&background=random',
    publishTime: '昨天 12:00',
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500',
    metrics: { likes: 12, favorites: 5, comments: 2, linkClicks: 0 },
    status: 'warning',
    attachedLink: '一对一护肤方案定制',
    isVideo: false,
  },
  {
    id: 4,
    title: '摄影干货｜手机怎么拍出电影感？构图公式来了',
    account: '光影捕手',
    avatar: 'https://ui-avatars.com/api/?name=G&background=random',
    publishTime: '2天前',
    cover: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=550',
    metrics: { likes: 5400, favorites: 3200, comments: 310, linkClicks: 1205 },
    status: 'viral',
    attachedLink: '【摄影大师课】新人特惠',
    isVideo: true,
  },
  {
    id: 5,
    title: 'OOTD日常｜黑白灰极简高级感穿搭，今天是清冷学姐',
    account: '穿搭日记',
    avatar: 'https://ui-avatars.com/api/?name=C&background=random',
    publishTime: '3天前',
    cover: 'https://images.unsplash.com/photo-1434382842757-ea64861bc9b2?auto=format&fit=crop&q=80&w=400&h=500',
    metrics: { likes: 890, favorites: 650, comments: 45, linkClicks: 210 },
    status: 'normal',
    attachedLink: '同款衣服链接直达',
    isVideo: false,
  },
  {
    id: 6,
    title: '周末去哪儿｜杭州周边最美小众徒步路线，吸氧去',
    account: '旅行日记',
    avatar: 'https://ui-avatars.com/api/?name=T&background=random',
    publishTime: '4天前',
    cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400&h=650',
    metrics: { likes: 320, favorites: 210, comments: 15, linkClicks: 85 },
    status: 'normal',
    attachedLink: '携程/飞猪优惠券包',
    isVideo: false,
  }
];

export default function PublishedTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNote, setActiveNote] = useState<typeof MOCK_PUBLISHED_NOTES[0] | null>(null);

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
    const currentIndex = MOCK_PUBLISHED_NOTES.findIndex(n => n.id === activeNote.id);
    if (currentIndex > 0) setActiveNote(MOCK_PUBLISHED_NOTES[currentIndex - 1]);
  };

  const handleNextNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeNote) return;
    const currentIndex = MOCK_PUBLISHED_NOTES.findIndex(n => n.id === activeNote.id);
    if (currentIndex < MOCK_PUBLISHED_NOTES.length - 1) setActiveNote(MOCK_PUBLISHED_NOTES[currentIndex + 1]);
  };

  return (
    <div className="h-full flex flex-col pt-4 relative bg-slate-50/30">
      
      {/* Top Bar: Search and Filters */}
      <div className="flex-shrink-0 bg-white/90 backdrop-blur-2xl rounded-2xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto w-full max-w-7xl relative z-20">
        <div className="p-4 flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="flex items-center gap-6 text-sm divide-x divide-slate-100">
             <div className="flex flex-col">
               <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5"><LayoutDashboard className="w-3.5 h-3.5"/>累计发布笔记</span>
               <span className="text-2xl font-black text-slate-800 tracking-tight">1,248</span>
             </div>
             <div className="flex flex-col pl-6">
               <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5"><Heart className="w-3.5 h-3.5"/>综合互动指数</span>
               <span className="text-2xl font-black text-rose-500 tracking-tight">8.5<span className="text-sm font-bold text-rose-500/60 ml-0.5 uppercase">w</span></span>
             </div>
             <div className="flex flex-col pl-6">
               <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5"/>外链总转化</span>
               <span className="text-2xl font-black text-emerald-500 tracking-tight">12.4<span className="text-sm font-bold text-emerald-500/60 ml-0.5 uppercase">k</span></span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[280px] group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
               <input 
                 type="text" 
                 placeholder="搜索笔记标题/账号..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="relative w-full bg-slate-50/80 border-0 rounded-xl py-2.5 pl-10 pr-4 text-[13px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:bg-white transition-all font-medium placeholder:text-slate-400"
               />
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            </div>
            
            <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shrink-0 active:scale-95 shadow-sm">
               <Filter className="w-4 h-4 mr-1.5 text-slate-400" /> 筛选状态
            </button>
          </div>
        </div>
      </div>

      {/* Waterfall Grid for Published Notes */}
      <div className="flex-1 overflow-y-auto pt-6 px-4 pb-12 custom-scrollbar relative z-10">
        <div className="max-w-7xl mx-auto columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-5 space-y-5">
          {MOCK_PUBLISHED_NOTES.map((note) => (
            <motion.div 
              key={note.id}
              onClick={() => setActiveNote(note)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="break-inside-avoid rounded-[20px] overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer border border-slate-100 group flex flex-col"
            >
              <div className="relative overflow-hidden">
                 <img src={note.cover} alt={note.title} className="w-full object-cover aspect-[3/4] sm:aspect-auto group-hover:scale-105 transition-transform duration-700 ease-out bg-slate-100" loading="lazy" />
                 {note.isVideo && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <PlayCircle className="w-4 h-4" />
                    </div>
                 )}
                 {/* Status Badges */}
                 <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {note.status === 'viral' && (
                       <span className="px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black tracking-wide rounded-md shadow-lg flex items-center gap-1">
                         <Flame className="w-3 h-3" /> 爆款预定
                       </span>
                    )}
                    {note.status === 'warning' && (
                       <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black tracking-wide rounded-md shadow-lg flex items-center gap-1">
                         <AlertTriangle className="w-3 h-3" /> 隐形降权
                       </span>
                    )}
                 </div>
                 {/* Link indication on image */}
                 {note.metrics.linkClicks > 0 && (
                   <div className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-slate-900/70 backdrop-blur-xl text-white rounded-xl flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                     <div className="flex items-center gap-1.5 text-[11px] font-semibold"><LinkIcon className="w-3.5 h-3.5 text-blue-400"/> 已引流</div>
                     <div className="text-[12px] font-black text-blue-100">{note.metrics.linkClicks} <span className="text-[9px] font-medium text-white/60">次</span></div>
                   </div>
                 )}
              </div>
              
              <div className="p-4 flex flex-col flex-1 bg-white relative z-10">
                <h3 className="text-[14px] font-bold text-slate-800 leading-[1.5] mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {note.title}
                </h3>
                
                {/* Account Info */}
                <div className="flex items-center gap-2 mb-4 mt-auto bg-slate-50/80 p-2 rounded-xl border border-slate-100/80 group-hover:bg-slate-100/50 transition-colors">
                  <img src={note.avatar} className="w-5 h-5 rounded-full object-cover ring-1 ring-white shadow-sm" alt="avatar" />
                  <span className="text-[11px] font-bold text-slate-600 truncate flex-1">{note.account}</span>
                  <span className="text-[10px] text-slate-400 font-mono font-medium tracking-tighter shrink-0">{note.publishTime}</span>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[12px] font-bold">{note.metrics.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[12px] font-bold">{note.metrics.favorites}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[12px] font-bold">{note.metrics.comments}</span>
                    </div>
                  </div>
                  {note.metrics.linkClicks > 0 && (
                     <div className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md text-[11px] font-bold">
                       <MousePointerClick className="w-3 h-3" /> {note.metrics.linkClicks}
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Tracking Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-50 rounded-3xl w-full max-w-[1240px] h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
            >
              {/* Left Column: Visual & Content Preview */}
              <div className="w-full md:w-[420px] bg-white flex flex-col shrink-0 relative order-2 md:order-1 hidden md:flex border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
                <div className="absolute top-5 left-5 z-20 flex gap-2">
                   <button onClick={handlePrevNote} className="p-2.5 bg-black/30 hover:bg-black/50 text-white backdrop-blur-xl rounded-full transition-all hover:scale-105 active:scale-95 border border-white/10 shadow-lg"><ChevronLeft className="w-5 h-5"/></button>
                   <button onClick={handleNextNote} className="p-2.5 bg-black/30 hover:bg-black/50 text-white backdrop-blur-xl rounded-full transition-all hover:scale-105 active:scale-95 border border-white/10 shadow-lg"><ChevronRight className="w-5 h-5"/></button>
                </div>
                
                <div className="h-[55%] relative overflow-hidden group">
                   <img src={activeNote.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                   
                   <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <div className="flex items-center gap-2 mb-3">
                         <img src={activeNote.avatar} className="w-8 h-8 rounded-full border-2 border-white/30 shadow-md" />
                         <span className="font-bold text-[13px] tracking-wide text-white/90">{activeNote.account}</span>
                      </div>
                      <h2 className="font-extrabold text-[19px] leading-snug text-white drop-shadow-md">{activeNote.title}</h2>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto w-full p-8 text-[14px] text-slate-600 leading-relaxed font-medium custom-scrollbar relative">
                   <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
                   <div className="space-y-4">
                     <p>这里是笔记的正文内容展示。我们可以看到笔记的文字结构非常清晰。针对目前的互动表现，AI给出了一些分析：</p>
                     <p className="text-indigo-600 font-bold">#引流话题 #精准定位 #高转化</p>
                   </div>
                   
                   <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/50 p-5 rounded-[20px] border border-indigo-100/50 mt-8 flex flex-col gap-3 relative overflow-hidden group">
                      <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                         <MessageCircle className="w-32 h-32 text-indigo-600" />
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-[13px]">
                        <MessageSquareQuote className="w-4 h-4" /> 评论区自动回复配置
                      </div>
                      <div className="text-[13px] text-slate-700 leading-relaxed font-medium bg-white/60 p-3 rounded-xl border border-indigo-100/30">
                         "感谢宝子喜欢！相关<span className="text-indigo-600 font-bold mx-1">🔗</span>链接已经私信发给你啦，请注意查收哦~"
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Deep Tracking & Analytics */}
              <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar order-1 md:order-2 relative">
                 <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0"></div>
                 {/* Header Panel */}
                 <div className="bg-white/80 backdrop-blur-xl px-8 py-6 border-b border-slate-200/60 shrink-0 sticky top-0 z-20 flex justify-between items-start">
                    <div>
                       <h2 className="text-[20px] font-black text-slate-900 flex items-center gap-2 mb-1.5 tracking-tight">
                          <BarChart3 className="w-5 h-5 text-indigo-600" />
                          后续数据追踪
                       </h2>
                       <p className="text-[13px] text-slate-500 font-medium">实时分析公域流量转化与安全防御链路</p>
                    </div>
                    <button 
                      onClick={() => setActiveNote(null)}
                      className="p-2 bg-slate-100/80 hover:bg-slate-200 text-slate-600 rounded-full transition-transform hover:scale-105 active:scale-95"
                     >
                       <X className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="p-8 space-y-8 max-w-4xl mx-auto w-full z-10 relative">
                    
                    {/* Status Alert Banner */}
                    {activeNote.status === 'warning' && (
                       <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200/60 rounded-[20px] p-5 flex gap-4 shadow-sm items-start relative overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-rose-100/50 to-transparent pointer-events-none"></div>
                          <div className="w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(225,29,72,0.1)] flex items-center justify-center shrink-0 border border-rose-100 z-10">
                             <AlertTriangle className="w-5 h-5 text-rose-500" />
                          </div>
                          <div className="pt-1 z-10">
                             <h4 className="text-[15px] font-extrabold text-rose-800 mb-1.5">平台风控警告 (流量中断)</h4>
                             <p className="text-[13px] text-rose-600/90 font-medium leading-relaxed max-w-2xl">系统监测到该笔记已停止进入新流量池。由于识别到高频的外链点击或敏感关键词，可能触发了【硬广营销】规则。建议使用防拦截安全链接重试。</p>
                          </div>
                       </div>
                    )}
                    {activeNote.status === 'viral' && (
                       <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-[20px] p-5 flex gap-4 shadow-sm items-start relative overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-100/50 to-transparent pointer-events-none"></div>
                          <div className="w-12 h-12 rounded-full bg-white shadow-[0_2px_10px_rgba(16,185,129,0.1)] flex items-center justify-center shrink-0 border border-emerald-100 z-10">
                             <TrendingUp className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div className="pt-1 z-10">
                             <h4 className="text-[15px] font-extrabold text-emerald-800 mb-1.5">爆款流量池进入预警！</h4>
                             <p className="text-[13px] text-emerald-600/90 font-medium leading-relaxed max-w-2xl">过去这几个小时内容热度急剧飙升，正在冲击百万级流量池。系统已自动开启高并发私信防护策略，并锁定所有引流表单资源。</p>
                          </div>
                       </div>
                    )}

                    {/* Funnel Metrics */}
                    <div className="grid grid-cols-4 gap-5">
                       <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                          <div className="text-[12px] font-bold text-slate-400/80 uppercase tracking-widest mb-1 relative z-10">总互动量</div>
                          <div className="text-[28px] font-black text-slate-800 relative z-10 tracking-tight">{activeNote.metrics.likes + activeNote.metrics.favorites + activeNote.metrics.comments}</div>
                          <div className="mt-3 text-[11px] font-bold text-emerald-600 bg-emerald-50/80 border border-emerald-100/50 inline-block px-2 py-0.5 rounded shadow-sm relative z-10">↑ 12% 较同期</div>
                          <Heart className="absolute -right-4 -bottom-4 w-28 h-28 text-rose-50 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out z-0" />
                       </div>
                       <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                          <div className="text-[12px] font-bold text-slate-400/80 uppercase tracking-widest mb-1 relative z-10">有效交互率</div>
                          <div className="text-[28px] font-black text-slate-800 relative z-10 tracking-tight">8.4%</div>
                          <div className="mt-3 text-[11px] font-bold text-emerald-600 bg-emerald-50/80 border border-emerald-100/50 inline-block px-2 py-0.5 rounded shadow-sm relative z-10">高于平均 5%</div>
                          <Heart className="absolute -right-4 -bottom-4 w-28 h-28 text-rose-50 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out z-0" />
                       </div>
                       <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden group col-span-2">
                          <div className="flex justify-between items-start relative z-10">
                            <div>
                               <div className="text-[12px] font-bold text-indigo-500/80 flex items-center gap-1 uppercase tracking-widest mb-1"><LinkIcon className="w-3.5 h-3.5"/> 引导外链转化</div>
                               <div className="text-[28px] font-black text-indigo-700 tracking-tight">{activeNote.metrics.linkClicks} <span className="text-[14px]">次点击</span></div>
                            </div>
                            <div className="text-right">
                               <div className="text-[11px] text-slate-400/80 font-bold uppercase tracking-widest mb-1.5">外推预估收益</div>
                               <div className="text-xl font-bold text-slate-800 font-mono tracking-tighter">¥ {(activeNote.metrics.linkClicks * 1.5).toFixed(2)}</div>
                            </div>
                          </div>
                          
                          {/* Funnel Progress */}
                          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                             <div className="flex flex-col items-center">
                               <span className="text-[11px] text-slate-400 font-bold mb-1.5">笔记点赞</span>
                               <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-[10px] font-black border border-rose-100/50">{activeNote.metrics.likes}</span>
                             </div>
                             <div className="flex-1 h-1.5 bg-slate-100 mx-3 rounded-full relative overflow-hidden">
                               <div className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full" style={{width: '60%'}}></div>
                             </div>
                             <div className="flex flex-col items-center">
                               <span className="text-[11px] text-slate-400 font-bold mb-1.5">笔记收藏</span>
                               <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-black border border-amber-100/50">{activeNote.metrics.favorites}</span>
                             </div>
                             <div className="flex-1 h-1.5 bg-slate-100 mx-3 rounded-full relative overflow-hidden">
                               <div className="absolute inset-y-0 left-0 bg-emerald-400 rounded-full" style={{width: '20%'}}></div>
                             </div>
                             <div className="flex flex-col items-center">
                               <span className="text-[11px] text-slate-400 font-bold mb-1.5">加微转化</span>
                               <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black border border-emerald-100/50">{activeNote.metrics.linkClicks}</span>
                             </div>
                          </div>
                          <MousePointerClick className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-50/50 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out z-0" />
                       </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                       <div className="flex items-center justify-between mb-8">
                         <h3 className="font-extrabold text-[16px] text-slate-800 flex items-center gap-2">
                           <TrendingUp className="w-5 h-5 text-rose-500" /> 互动增长趋势
                         </h3>
                         <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                           <button className="px-5 py-1.5 bg-white text-slate-700 text-[12px] font-bold rounded-lg shadow-sm border border-slate-200/50">24小时</button>
                           <button className="px-5 py-1.5 text-slate-400 text-[12px] font-bold rounded-lg hover:text-slate-600 transition-colors">7天</button>
                         </div>
                       </div>
                       <div className="h-[250px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                             <defs>
                               <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                               </linearGradient>
                             </defs>
                             <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                             <Tooltip 
                               contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: '16px' }}
                               labelStyle={{ fontWeight: 800, color: '#64748b', marginBottom: '8px' }}
                               itemStyle={{ fontWeight: 800, color: '#0f172a' }}
                             />
                             <Area type="monotone" dataKey="interactions" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorInteractions)" />
                           </AreaChart>
                         </ResponsiveContainer>
                       </div>
                    </div>

                    {/* Attached Links Details */}
                     <div className="bg-white p-7 rounded-[24px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                       <h3 className="font-extrabold text-[16px] text-slate-800 flex items-center gap-2 mb-6">
                         <LinkIcon className="w-5 h-5 text-emerald-500" /> 转化链路诊断
                       </h3>
                       <div className="border border-slate-100/80 rounded-[20px] divide-y divide-slate-100 bg-slate-50/50 overflow-hidden">
                          
                          <div className="p-5 flex items-center justify-between hover:bg-white transition-colors cursor-default">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 font-extrabold shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.15)] border border-emerald-200/50 text-lg">
                                   W
                                </div>
                                <div className="space-y-1">
                                   <div className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
                                     微信企微名片跳转 <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">主防线</span>
                                   </div>
                                   <div className="text-[12px] text-slate-500 font-mono font-medium flex items-center gap-1.5 hover:text-indigo-500 cursor-pointer transition-colors group/link w-max">
                                      {activeNote.attachedLink} <ExternalLink className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                                   </div>
                                </div>
                             </div>
                             
                             <div className="flex gap-10 items-center text-right">
                                <div className="flex flex-col">
                                   <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">主动发私信数</span>
                                   <span className="text-[18px] font-black text-slate-700">421</span>
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">无折损触达</span>
                                   <span className="text-[18px] font-black text-indigo-600 flex items-baseline gap-1 justify-end">{activeNote.metrics.linkClicks} <span className="text-[11px] text-indigo-400 font-bold">次</span></span>
                                </div>
                                <button className="px-5 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-[13px] rounded-xl transition-all ml-2 shadow-sm border border-indigo-100">
                                   优化策略
                                </button>
                             </div>
                          </div>

                       </div>
                       
                       <div className="mt-5 p-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-[20px] border border-blue-100 flex items-start gap-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                             <Zap className="w-24 h-24 text-indigo-600" />
                          </div>
                          <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" />
                          <div className="relative z-10">
                             <h4 className="text-[14px] font-extrabold text-slate-800 mb-1">流量护城河防御已开启</h4>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed max-w-2xl">已注入防风控底层跳转协议。平台机器人爬虫将只会看到空白合法页面，仅真实用户的点击才会经过 302 重定向落盘至微信号码/小程序，最大程度延长引流存活时间。</p>
                          </div>
                       </div>
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
