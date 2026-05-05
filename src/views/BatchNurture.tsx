import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Play, Pause, Save, Plus, MessageSquare, Heart, 
  Share2, Eye, Clock, Search, Bot, Activity, BrainCircuit,
  Zap, ChevronRight, CheckCircle2, ChevronDown, CheckSquare, Square,
  Terminal, Smartphone, RefreshCw, Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const ACCOUNT_GROUPS = [
  { 
    id: 'g1', 
    name: '美妆冷启动库 (42)', 
    accounts: [
      { id: 'a1', name: '美妆种草日记', device: '设备-01' },
      { id: 'a2', name: '早八打工人', device: '设备-02' },
      { id: 'a3', name: '干皮护肤指南', device: '设备-03' }
    ]
  },
  { 
    id: 'g2', 
    name: 'OOTD精养矩阵 (38)', 
    accounts: [
      { id: 'a4', name: '每日穿搭灵感', device: '设备-08' },
      { id: 'a5', name: '复古风Miya', device: '设备-09' }
    ]
  },
  { 
    id: 'g3', 
    name: '数码潮物截流 (12)', 
    accounts: [
      { id: 'a6', name: '数码极客测评', device: '设备-15' }
    ]
  },
];

export default function BatchNurture() {
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['g1']);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(['a1', 'a2', 'a3']);
  const [statusRunning, setStatusRunning] = useState(false);
  const [commentMode, setCommentMode] = useState('AI智能生成');
  const [activePersonas, setActivePersonas] = useState<string[]>(['干货求推荐']);
  const [commentCount, setCommentCount] = useState(3);
  const [readRatio, setReadRatio] = useState(90);
  const [likeRatio, setLikeRatio] = useState(30);
  const [commentRatio, setCommentRatio] = useState(15);
  const [keywords, setKeywords] = useState('');
  const [targetUIDs, setTargetUIDs] = useState('');
  const [commentExtractLogic, setCommentExtractLogic] = useState('AI结合素材池重写');
  const [commentCorpus, setCommentCorpus] = useState('');
  
  const togglePersona = (persona: string) => {
    setActivePersonas(prev => 
      prev.includes(persona) ? prev.filter(p => p !== persona) : [...prev, persona]
    );
  };
 
  const toggleGroupExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    );
  };

  const toggleGroupSelect = (id: string, accountIds: string[]) => {
    const allSelected = accountIds.length > 0 && accountIds.every(aId => selectedAccounts.includes(aId));
    if (allSelected) {
      setSelectedAccounts(prev => prev.filter(aId => !accountIds.includes(aId)));
    } else {
      setSelectedAccounts(prev => Array.from(new Set([...prev, ...accountIds])));
    }
  };

  const toggleAccount = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 h-[calc(100vh-8rem)] flex overflow-hidden shadow-sm">
      
      {/* Column 1: Target Accounts Selection */}
      <div className="w-72 border-r border-slate-200 bg-slate-50 flex flex-col flex-shrink-0 z-10">
        <div className="px-5 py-4 border-b border-slate-200 bg-white shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800 flex items-center mb-1">
            <Layers className="w-4 h-4 mr-2 text-blue-600" /> 第一步：选择目标号池
          </h2>
          <p className="text-[11px] text-slate-500 pl-6">通过勾选账号组进行批量策略下发</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {ACCOUNT_GROUPS.map(group => {
            const groupAccountIds = group.accounts.map(a => a.id);
            const isAllSelected = groupAccountIds.length > 0 && groupAccountIds.every(id => selectedAccounts.includes(id));
            const isSomeSelected = groupAccountIds.some(id => selectedAccounts.includes(id)) && !isAllSelected;
            const isExpanded = expandedGroups.includes(group.id);

            return (
              <div key={group.id} className="mb-2">
                <div 
                  onClick={() => toggleGroupSelect(group.id, groupAccountIds)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all border group",
                    isAllSelected 
                      ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/50" 
                      : isSomeSelected
                        ? "bg-blue-50/50 border-blue-200"
                        : "bg-transparent border-transparent hover:bg-slate-200/50 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    <button 
                      onClick={(e) => toggleGroupExpand(e, group.id)} 
                      className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-200/50"
                    >
                      <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
                    </button>
                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      {isAllSelected ? <CheckSquare className="w-4 h-4 text-blue-600" /> : isSomeSelected ? <Square className="w-4 h-4 text-blue-400" fill="currentColor" fillOpacity={0.2} /> : <Square className="w-4 h-4" />}
                    </div>
                    <span className={cn("text-[13px] font-bold transition-colors truncate", isAllSelected ? "text-slate-900" : "text-slate-700")}>{group.name}</span>
                  </div>
                  {isAllSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>}
                </div>

                {isExpanded && (
                  <div className="mt-1 pl-8 pr-1 space-y-1">
                    {group.accounts.map(account => {
                      const isAccSelected = selectedAccounts.includes(account.id);
                      return (
                        <div 
                          key={account.id}
                          onClick={(e) => toggleAccount(e, account.id)}
                          className={cn(
                            "flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all border",
                            isAccSelected 
                               ? "bg-white border-blue-200 shadow-sm"
                               : "border-transparent hover:bg-slate-200/50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                             <div className="text-slate-400">
                               {isAccSelected ? <CheckSquare className="w-3.5 h-3.5 text-blue-500" /> : <Square className="w-3.5 h-3.5" />}
                             </div>
                             <div className="flex flex-col">
                               <span className={cn("text-[12px] font-medium", isAccSelected ? "text-slate-800" : "text-slate-600")}>{account.name}</span>
                             </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{account.device}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="px-3 pt-4 pb-2">
             <div className="border-t border-dashed border-slate-300 mb-4"></div>
             <button 
               onClick={() => navigate('/assets')}
               className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-all"
             >
                <Plus className="w-3.5 h-3.5" /> 去[账号资产]管理分组
             </button>
          </div>
        </div>
      </div>

      {/* Column 2: Strategy Configuration */}
      <div className="flex-1 border-r border-slate-200 bg-white flex flex-col relative z-0 mix-w-[360px]">
        <div className="px-6 py-4 border-b border-slate-200 bg-white shrink-0 flex justify-between items-center">
          <div>
            <h2 className="text-[15px] font-bold text-slate-800 flex items-center mb-1">
              <BrainCircuit className="w-4 h-4 mr-2 text-indigo-600" /> 第二步：策略下发配置
            </h2>
            <p className="text-[11px] text-slate-500 pl-6">设置账号的搜索互动与AI话术规则</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-8">
            
            <div className="group">
               <h3 className="text-[13px] font-bold text-slate-800 flex items-center mb-4">
                  <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 mr-2 text-[10px]">1</span>
                  定向互动图谱
               </h3>
               <div className="grid grid-cols-2 gap-5 pl-8">
                 <div>
                   <label className="block text-[12px] font-bold text-slate-600 mb-2">行业检索关键词 (每行一个)</label>
                   <textarea 
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-[13px] text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-all resize-none h-28 leading-relaxed placeholder:text-slate-400 shadow-inner"
                     placeholder="输入行业关键词，每行一个"
                     value={keywords}
                     onChange={e => setKeywords(e.target.value)}
                   ></textarea>
                 </div>
                 <div>
                   <label className="block text-[12px] font-bold text-slate-600 mb-2">定点截流博主 UID</label>
                   <textarea 
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-[13px] text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:bg-white transition-all resize-none h-28 leading-relaxed placeholder:text-slate-400 shadow-inner"
                     placeholder="输入对标大V的UID..."
                     value={targetUIDs}
                     onChange={e => setTargetUIDs(e.target.value)}
                   ></textarea>
                 </div>
               </div>
            </div>

            <div className="group">
               <h3 className="text-[13px] font-bold text-slate-800 flex items-center mb-4">
                  <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 mr-2 text-[10px]">2</span>
                  转化漏斗配比
               </h3>
               <div className="pl-8 space-y-4">
                  {[
                    { icon: Eye, label: '有效深思阅读', color: 'text-emerald-500', val: readRatio, setter: setReadRatio },
                    { icon: Heart, label: '点赞互动率', color: 'text-rose-500', val: likeRatio, setter: setLikeRatio },
                    { icon: MessageSquare, label: '留评互动率', color: 'text-indigo-500', val: commentRatio, setter: setCommentRatio },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center bg-slate-50/50 border border-slate-100 rounded-lg p-2.5 group/item">
                      <div className="w-32 flex items-center text-[12px] font-medium text-slate-700">
                        <item.icon className={cn("w-3.5 h-3.5 mr-2", item.color)} /> {item.label}
                      </div>
                      <div className="flex-1 flex items-center gap-4 px-2">
                        <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" value={item.val} onChange={(e) => item.setter(parseInt(e.target.value))} />
                        <span className="text-[12px] font-mono w-10 text-right font-medium text-slate-500">{item.val}%</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="group">
               <h3 className="text-[13px] font-bold text-slate-800 flex items-center mb-4 justify-between">
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mr-2"><Bot className="w-3.5 h-3.5" /></span>
                    高级评论与人设交互引擎
                  </div>
                  <div className="flex gap-2">
                    {['AI智能生成', '指定内容库'].map(mode => (
                      <button 
                        key={mode} 
                        onClick={() => setCommentMode(mode)}
                        className={cn("px-3 py-1 text-xs font-bold rounded-full transition-colors border", commentMode === mode ? "bg-purple-100/50 border-purple-200 text-purple-700" : "bg-slate-50 border-slate-200 text-slate-500")}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
               </h3>
               
               <div className="pl-8 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['路人吃瓜态', '脑残粉护主', '干货求推荐'].map((persona, i) => {
                       const isActive = activePersonas.includes(persona);
                       return (
                         <div key={persona} onClick={() => togglePersona(persona)} className={cn(
                           "border rounded-xl p-3 cursor-pointer transition-all",
                           isActive ? "border-purple-500 bg-purple-50/30 ring-1 ring-purple-500/20" : "border-slate-200 hover:border-slate-300"
                         )}>
                            <div className="flex justify-between items-center mb-1.5">
                               <span className="text-[12px] font-bold text-slate-800">{persona}</span>
                               {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />}
                            </div>
                            <span className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">基于大模型分析图文，生成带语气词与Emoji的乱序评论。</span>
                         </div>
                       );
                    })}
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                     <div className="flex items-center justify-between">
                        <label className="text-[12px] font-bold text-slate-700">精细化评论控制</label>
                     </div>
                     <div className="flex gap-6">
                        <div className="flex-1">
                           <label className="block text-[11px] font-medium text-slate-500 mb-1">单号评论篇数</label>
                           <input type="number" className="w-full border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-purple-400 outline-none" value={commentCount} onChange={(e) => setCommentCount(parseInt(e.target.value) || 1)} min={1} />
                        </div>
                        <div className="flex-1">
                           <label className="block text-[11px] font-medium text-slate-500 mb-1">评论抽取逻辑</label>
                           <select 
                             className="w-full border border-slate-200 rounded px-3 py-1.5 text-xs focus:border-purple-400 outline-none bg-white"
                             value={commentExtractLogic}
                             onChange={e => setCommentExtractLogic(e.target.value)}
                           >
                             <option>AI结合素材池重写</option>
                             <option>直接使用原始素材 (随机)</option>
                             <option>直接使用原始素材 (顺序)</option>
                           </select>
                        </div>
                     </div>
                     <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1.5">自定义补充语料 / 关键词 / 指定内容库 (支持多行)</label>
                        <textarea 
                           className="w-full h-24 border border-slate-200 rounded p-3 text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white placeholder:text-slate-400" 
                           placeholder="输入自定义话术：\n这件毛衣也太温柔了吧！\n博主身高体重多少呀~\n（系统将融合上方选择的人设和这里的指定话术进行自动化交互）"
                           value={commentCorpus}
                           onChange={e => setCommentCorpus(e.target.value)}
                        ></textarea>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Action Bottom */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="text-[11px] text-slate-500 font-mono">
            已选择 <span className="font-bold text-slate-800">{selectedAccounts.length}</span> 个目标设备
          </div>
          <button 
             onClick={() => setStatusRunning(!statusRunning)}
             className={cn(
               "px-6 py-2.5 text-[13px] font-bold rounded-xl shadow-sm transition-all flex items-center",
               statusRunning 
                 ? "bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200" 
                 : "bg-[#4F46E5] hover:bg-[#4338CA] text-white"
             )}
          >
            {statusRunning ? <Pause className="w-4 h-4 mr-2" fill="currentColor" /> : <Play className="w-4 h-4 mr-2" fill="currentColor" />}
            {statusRunning ? '停止任务' : '派发全局策略'}
          </button>
        </div>
      </div>

      {/* Column 3: Live Console */}
      <div className="w-80 bg-slate-900 flex-shrink-0 flex flex-col relative">
        <div className="px-5 py-4 border-b border-white/10 shrink-0 flex justify-between items-center">
          <h2 className="text-[13px] font-bold text-white flex items-center">
            <Terminal className="w-4 h-4 mr-2 text-emerald-400" /> 第三步：云端调度池
          </h2>
          {statusRunning && (
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
          )}
        </div>

        <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar text-emerald-400/80 bg-[#0a0a0a]">
          {statusRunning ? (
            <div className="space-y-3">
              <div className="text-slate-400">[{new Date().toLocaleTimeString()}] 初始化集群连接... 成功</div>
              <div className="text-slate-400">[{new Date().toLocaleTimeString()}] 解析策略组 ID: NRT-A890</div>
              <div className="text-blue-400">[{new Date().toLocaleTimeString()}] 下发至 [美妆冷启动库 (42)]</div>
              <div className="text-emerald-500 mt-2 font-bold">&gt;&gt;&gt; 开始模拟真人行为轨道 &lt;&lt;&lt;</div>
              
              <div className="pt-2 flex flex-col gap-2">
                 <div className="bg-white/5 border border-white/10 p-2 rounded-lg break-all">
                   <div className="flex items-center gap-2 mb-1">
                     <Smartphone className="w-3 h-3 text-emerald-500" /> 
                     <span className="text-white font-bold">XH-DEV-12</span>
                     <span className="text-slate-500 ml-auto">刚刚</span>
                   </div>
                   <span className="text-emerald-300">✓ 搜索 "干皮粉底液选购"</span> <br/>
                   <span className="text-emerald-300">✓ 深度停留 45s</span>
                 </div>

                 <div className="bg-white/5 border border-white/10 p-2 rounded-lg break-all">
                   <div className="flex items-center gap-2 mb-1">
                     <Smartphone className="w-3 h-3 text-emerald-500" /> 
                     <span className="text-white font-bold">XH-DEV-18</span>
                     <span className="text-slate-500 ml-auto">2s前</span>
                   </div>
                   <span className="text-purple-400">★ AI生成评论:</span> <br/>
                   <span className="text-slate-300">"啊啊啊这套真的绝了，我的大干皮终于有救了😭"</span>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
               <Activity className="w-10 h-10 mb-3 opacity-20" />
               等待任务派发...
            </div>
          )}
        </div>
      </div>

    </div>
  );
}