import React, { useState } from 'react';
import { 
  Sparkles, Image as ImageIcon, MessageSquare, Tag, Type, 
  Wand2, Copy, RefreshCw, CheckCircle2, SlidersHorizontal,
  PenTool, ImagePlus, UserCircle2, ArrowRight, Link2, ScanSearch,
  Wand, Layout, Smile, Palette, Camera, Layers, Heart, Eye, Play, ScanLine, Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=500',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500',
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400&h=500',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400&h=500'
];

const MOCK_PARSED_DATA = {
  styleTags: ['情绪共鸣', '痛点前置', '闺蜜分享语气'],
  visualTags: ['冷白皮质感', '3:4构图', '前景虚化', '高饱和度'],
  titles: ['千万别买！除非...😭', '打工人的续命神器！绝绝子✨', '后悔没早点知道的宝藏好物📦'],
  content: `家人们谁懂啊！最近熬夜加班，皮肤状态简直没眼看😭...\n(省略)\n但是！自从换了这个搭配，早上起来脸都是发光的✨...\n\n✅ 重点来了：\n1⃣️ 质地像冰淇淋一样\n2⃣️ 吸收超快不黏腻\n3⃣️ 学生党也毫无压力\n\n赶紧艾特你的怨种闺蜜来看看！👇`,
  tags: '#我的平价好物 #沉浸式护肤 #早八党 #拯救熬夜脸',
  cover: 'https://images.unsplash.com/photo-1522337352214-9abc66eb4578?auto=format&fit=crop&q=80&w=400&h=500'
};

export default function SmartEditor() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  
  const [parseLink, setParseLink] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<typeof MOCK_PARSED_DATA | null>(null);
  
  const [topic, setTopic] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState<{titles: string[], content: string, tags: string} | null>(null);
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleParseLink = () => {
    if (!parseLink) return;
    setIsParsing(true);
    setTimeout(() => {
      setParsedData(MOCK_PARSED_DATA);
      setIsParsing(false);
    }, 1500);
  };

  const handleGenerateAll = () => {
    if (!topic || !parsedData) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedText({
        titles: [
          '真的绝了！早八人10分钟搞定的出门神仙搭配✨',
          '别再乱买了！这才是原木风桌搭的终极答案😭',
          '打死不换！这杯燕麦拿铁直接封神☕️'
        ],
        content: `家人们谁懂啊！最近为了搞好这个桌面，简直操碎了心😭...\n\n但是！自从换了这个搭配，每天坐在屏幕前心情都是发光的✨...\n\n✅ 重点来了：\n1⃣️ 质感温润不扎手\n2⃣️ 收纳空间大了一倍\n3⃣️ 学生党也毫无压力\n\n赶紧艾特你的怨种室友来看看！👇`,
        tags: '#原木风桌搭 #沉浸式工作 #早八党 #我的平价好物'
      });
      setGeneratedImages(MOCK_IMAGES);
      setIsGenerating(false);
      setActiveTab('text');
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-full p-4 lg:p-8 flex items-center justify-center">
      <div className="bg-white max-w-7xl w-full rounded-[32px] border border-slate-200/60 shadow-2xl shadow-indigo-900/5 flex overflow-hidden min-h-[800px]">
        
        {/* Left Sidebar: Controls */}
        <div className="w-[380px] bg-white border-r border-slate-100 flex flex-col z-10 shrink-0">
           <div className="px-8 py-8 border-b border-slate-50 shrink-0">
             <div className="inline-flex items-center justify-center p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
                <Wand2 className="w-5 h-5" />
             </div>
             <h2 className="text-[20px] font-extrabold text-slate-800 tracking-tight mb-1">AI 爆款双引擎</h2>
             <p className="text-[13px] text-slate-500 font-medium">拆解对标爆款，1:1 克隆爆款结构与视觉风格。</p>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
              
              {/* Step 1: Parse */}
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                    <h3 className="text-[14px] font-bold text-slate-800">对标爆款拆解</h3>
                 </div>
                 <div className="relative">
                    <input 
                      type="text" 
                      value={parseLink}
                      onChange={(e) => setParseLink(e.target.value)}
                      placeholder="粘贴小红书笔记链接 (URL)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pr-12 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                    />
                    <button 
                      onClick={handleParseLink}
                      disabled={!parseLink || isParsing}
                      className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors disabled:opacity-50"
                    >
                      {isParsing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ScanSearch className="w-4 h-4" />}
                    </button>
                 </div>

                 {parsedData && (
                   <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex gap-4">
                      <img src={parsedData.cover} className="w-16 h-20 rounded-lg object-cover shadow-sm" alt="Ref" />
                      <div className="flex-1">
                         <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 解析成功
                         </div>
                         <h4 className="text-[12px] font-bold text-slate-800 line-clamp-1 mb-2">{parsedData.titles[0]}</h4>
                         <div className="flex flex-wrap gap-1">
                            <span className="text-[9px] bg-white border border-emerald-100 px-1.5 py-0.5 rounded text-emerald-600 font-bold">已提取文案骨架</span>
                            <span className="text-[9px] bg-white border border-emerald-100 px-1.5 py-0.5 rounded text-emerald-600 font-bold">已提取视觉Prompt</span>
                         </div>
                      </div>
                   </div>
                 )}
              </div>

              {/* Step 2: Content Direction */}
              <div className={cn("space-y-4 transition-opacity duration-300", !parsedData ? "opacity-30 pointer-events-none" : "opacity-100")}>
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                    <h3 className="text-[14px] font-bold text-slate-800">设定创作方向</h3>
                 </div>
                 <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="你想卖什么？或者想表达什么核心卖点？&#10;例如：帮我写一篇卖咖啡豆的笔记，突出果酸风味和高性价比。"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[13px] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                    rows={4}
                 />
                 
                 <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
                    <div className="bg-white p-1.5 rounded-lg border border-indigo-100 shadow-sm shrink-0">
                       <Camera className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                       <p className="text-[12px] font-bold text-slate-800 mb-0.5">上传实拍产品图 (可选)</p>
                       <p className="text-[11px] text-slate-500 font-medium mb-2.5">用于 IP-Adapter 将对标笔记的构图、色调无缝迁移到你的产品上。</p>
                       <button className="text-[11px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-md text-slate-600 hover:text-indigo-600 transition-colors">
                          选择图片
                       </button>
                    </div>
                 </div>
              </div>
              
           </div>
           
           <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <button 
                onClick={handleGenerateAll}
                disabled={!topic || !parsedData || isGenerating}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-[14px] font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <><RefreshCw className="w-4 h-4 animate-spin text-slate-400" /> <span className="tracking-wide">AI 正在深度思考重组...</span></>
                ) : (
                  <><Sparkles className="w-4 h-4 text-yellow-400" /> <span className="tracking-wide">一键生成爆款图文</span></>
               )}
              </button>
           </div>
        </div>

        {/* Right Area: Preview Workspace */}
        <div className="flex-1 bg-slate-50/30 flex flex-col relative">
           
           {/* Tab Nav */}
           <div className="h-[72px] border-b border-slate-100 flex items-center justify-between px-8 bg-white shrink-0">
              <div className="flex gap-6 h-full">
                 <button 
                   onClick={() => setActiveTab('text')}
                   className={cn("h-full flex items-center gap-2 text-[14px] font-bold border-b-2 transition-colors", activeTab === 'text' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800")}
                 >
                   <Type className="w-4 h-4" /> 爆款文案
                 </button>
                 <button 
                   onClick={() => setActiveTab('image')}
                   className={cn("h-full flex items-center gap-2 text-[14px] font-bold border-b-2 transition-colors", activeTab === 'image' ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800")}
                 >
                   <Palette className="w-4 h-4" /> 视觉克隆
                 </button>
              </div>
              
              {generatedText && (
                <div className="flex gap-3">
                   <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-[13px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                      <Copy className="w-3.5 h-3.5" /> 复制图文
                   </button>
                   <button className="px-5 py-2 bg-rose-500 text-white rounded-lg text-[13px] font-bold hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all">
                      发布到账号
                   </button>
                </div>
              )}
           </div>

           {/* Content Area */}
           <div className="flex-1 overflow-y-auto custom-scrollbar p-8 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15] pointer-events-none"></div>

              {!generatedText ? (
                 <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto relative z-10 space-y-6">
                    <div className="w-24 h-24 rounded-[32px] bg-white shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center transform -rotate-12">
                       <Layers className="w-10 h-10 text-indigo-300" />
                    </div>
                    <div>
                       <h3 className="font-extrabold text-slate-800 text-[18px] mb-2">等待开始创作</h3>
                       <p className="text-[14px] leading-relaxed text-slate-500 font-medium">配置左侧向导，AI 将在一分钟内为你生成具备强传播力的小红书爆款图文笔记。</p>
                    </div>
                 </div>
              ) : (
                <div className="max-w-3xl mx-auto relative z-10 pb-12">
                  {activeTab === 'text' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                       
                       <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                         <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                         <p className="text-[12px] text-blue-700 font-medium leading-relaxed">AI 已成功剥离原笔记的行文结构，并降维重组了您的产品卖点。文字自带表情排版，节奏感极佳。</p>
                       </div>

                       <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="text-[12px] font-bold text-slate-800">1. 选择一个勾人标题</label>
                            <button className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600">换一换</button>
                          </div>
                          <div className="grid gap-3">
                             {generatedText.titles.map((t, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => setActiveTitleIndex(idx)}
                                  className={cn("px-5 py-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3", 
                                  activeTitleIndex === idx ? "border-indigo-500 bg-indigo-50/30" : "border-transparent bg-white shadow-sm hover:border-slate-200")}
                                >
                                   <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors", activeTitleIndex === idx ? "border-indigo-500 bg-indigo-500" : "border-slate-300 bg-slate-50")}>
                                      {activeTitleIndex === idx && <CheckCircle2 className="w-3 h-3 text-white" />}
                                   </div>
                                   <span className={cn("text-[15px] font-bold", activeTitleIndex === idx ? "text-indigo-900" : "text-slate-700")}>{t}</span>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div>
                          <label className="text-[12px] font-bold text-slate-800 mb-3 block">2. 爆款正文内容</label>
                          <textarea
                            defaultValue={generatedText.content}
                            className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-[15px] leading-[1.8] text-slate-700 outline-none resize-none min-h-[380px] focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                          />
                       </div>

                       <div>
                          <label className="text-[12px] font-bold text-slate-800 mb-3 block">3. 流量话题推荐</label>
                          <input
                            type="text"
                            defaultValue={generatedText.tags}
                            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[14px] font-semibold text-indigo-600 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500/20"
                          />
                       </div>

                    </motion.div>
                  )}

                  {activeTab === 'image' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                       
                       <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                         <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                         <p className="text-[12px] text-emerald-700 font-medium leading-relaxed">已使用 IP-Adapter 完美迁移对标图的质感与色调。AI 自动套用了排版模板生成 4 张 Plog。</p>
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          {generatedImages.map((img, idx) => (
                            <div key={idx} className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 cursor-pointer aspect-[3/4] bg-white">
                               <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={`Gen_${idx}`} />
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                  <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-white/30 transition-colors">
                                    编辑排版文字
                                  </button>
                               </div>
                               {idx === 0 && (
                                 <div className="absolute top-3 left-3 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg border border-white/20 uppercase tracking-wider">首图封面</div>
                               )}
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}

