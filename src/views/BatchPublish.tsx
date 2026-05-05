import React, { useState } from 'react';
import { 
  Send, Clock, Hash, Image as ImageIcon, Box, Wand2, 
  MapPin, Plus, CheckCircle2, ChevronDown, ListPlus, Battery, 
  Wifi, Heart, Star, MessageCircle, MoreHorizontal, User, Sparkles,
  ChevronLeft, ChevronRight, Copy, CheckSquare, Square, X, Search,
  Users, LayoutTemplate, FileText, Check, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// --- Mock Data ---
const AVAILABLE_ACCOUNTS = [
  { id: 'a1', name: '美妆护肤指南', group: '美妆个护', avatar: 'https://ui-avatars.com/api/?name=美妆&background=random' },
  { id: 'a2', name: '好物种草机', group: '美妆个护', avatar: 'https://ui-avatars.com/api/?name=种草&background=random' },
  { id: 'a3', name: 'OOTD穿搭日记', group: '穿搭矩阵', avatar: 'https://ui-avatars.com/api/?name=穿搭&background=random' },
  { id: 'a4', name: '数码达人小明', group: '数码潮物', avatar: 'https://ui-avatars.com/api/?name=数码&background=random' },
  { id: 'a5', name: '本地探店小分队', group: '本地探店', avatar: 'https://ui-avatars.com/api/?name=探店&background=random' },
  { id: 'a6', name: '干货分享大全', group: '个人成长', avatar: 'https://ui-avatars.com/api/?name=干货&background=random' },
  { id: 'a7', name: '居家好生活', group: '家居百货', avatar: 'https://ui-avatars.com/api/?name=居家&background=random' },
];

const TEMPLATES = [
  {
    id: 't1',
    name: '秋冬护肤爆款模板',
    title: '秋冬精简护肤！干敏皮救星来了！',
    content: '最近换季，皮肤状态真的很容易不稳定！\n今天给大家分享一套我最近在用的睡前护肤流程，超级精简但贼管用！\n\n1️⃣ 洁面：温和氨基酸\n2️⃣ 水：湿敷维稳\n3️⃣ 精华：修护屏障\n4️⃣ 面霜：锁水保湿\n\n真的很适合像我一样秋冬容易起皮泛红的姐妹！',
    tags: ['干敏皮', '精简护肤', '好物分享'],
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500']
  },
  {
    id: 't2',
    name: '平价好物开箱',
    title: '百元内幸福感好物分享~',
    content: '打工人提升幸福感的秘诀都在这里了！\n今天集中开箱一波近期入手的平价好物，跟着买绝对不踩雷！\n\n✅ 好物1：桌面加湿器，秋冬必备不仅保湿度拉满还带氛围灯！\n✅ 好物2：便携保温杯，颜值绝了而且保温大半天没问题！\n✅ 好物3：毛绒坐垫，久坐星人的福音啊啊啊！',
    tags: ['平价好物', '开箱', '好物分享'],
    images: []
  },
  {
    id: 't3',
    name: '穿搭分享模板',
    title: '微胖梨型身材怎么穿？',
    content: '今天这套真的是梨型身材的报恩穿搭！遮肉显瘦绝了！\n\n上衣选了这件微宽松的针织衫，领口设计很修饰脸型！\n下半身搭配了这条高腰A字半裙，刚好遮住了大腿最粗的地方，露出脚踝显得超级纤细～\n\n微胖姐妹赶紧抄作业啦！',
    tags: ['OOTD', '微胖穿搭', '梨型身材'],
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500']
  },
  {
    id: 't4',
    name: '探店打卡模板',
    title: '藏在巷子里的神仙小店！好吃到无语！',
    content: '作为一个资深吃货，这家店我真的不允许你们没吃过！\n\n环境超有氛围感，随手一拍都很出片📷\n招牌必点：\n特色意面 🍝 口感浓郁，面条劲道！\n海盐流心卷 🍰 甜而不腻，入口即化！\n\n周末约上闺蜜赶紧冲！',
    tags: ['周末去哪儿', '探店', '美食分享'],
    images: []
  }
];

interface PublishTask {
  id: string;
  accountId: string;
  account: string;
  avatar: string;
  status: 'pending' | 'editing' | 'success';
  templateId?: string;
  templateName?: string;
  images: string[];
  title: string;
  content: string;
  tags: string[];
}

const MOCK_FEED = [
  { id: 'f1', title: '被问疯了的神仙鞋子，暴走一天都不累！', cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', author: '穿搭小能手', avatar: 'https://ui-avatars.com/api/?name=穿&background=random', likes: '892', height: 180 },
  { id: 'f2', title: '绝美！这辈子一定要去一次的地方', cover: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=300', author: '旅游达人', avatar: 'https://ui-avatars.com/api/?name=旅&background=random', likes: '1.2w', height: 210 },
  { id: 'f3', title: '小户型榨干每一平米！绝美原木风设计！', cover: 'https://images.unsplash.com/photo-1512496015851-a1c814df7189?auto=format&fit=crop&q=80&w=300', author: '家居生活', avatar: 'https://ui-avatars.com/api/?name=居&background=random', likes: '3.4k', height: 190 },
];

export default function BatchPublish() {
  const [previewMode, setPreviewMode] = useState<'feed' | 'detail'>('feed');
  const [tasks, setTasks] = useState<PublishTask[]>([
    {
      id: 'task_1',
      accountId: 'a1',
      account: '美妆护肤指南',
      avatar: 'https://ui-avatars.com/api/?name=美妆&background=random',
      status: 'editing',
      templateId: 't1',
      templateName: '秋冬护肤爆款模板',
      images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400&h=500'],
      title: '秋冬精简护肤！干敏皮救星来了！',
      content: '最近换季，皮肤状态真的很容易不稳定！\n今天给大家分享一套我最近在用的睡前护肤流程，超级精简但贼管用！\n\n1️⃣ 洁面：温和氨基酸\n2️⃣ 水：湿敷维稳\n3️⃣ 精华：修护屏障\n4️⃣ 面霜：锁水保湿\n\n真的很适合像我一样秋冬容易起皮泛红的姐妹！',
      tags: ['干敏皮', '精简护肤', '好物分享']
    },
    {
      id: 'task_2',
      accountId: 'a2',
      account: '好物种草机',
      avatar: 'https://ui-avatars.com/api/?name=种草&background=random',
      status: 'pending',
      images: [],
      title: '',
      content: '',
      tags: []
    }
  ]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(['task_1', 'task_2']);
  
  // Modals state
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [accountSearchQuery, setAccountSearchQuery] = useState('');
  const [pendingAccountIds, setPendingAccountIds] = useState<string[]>([]);
  
  const [isTemplateModalOpen, setTemplateModalOpen] = useState(false);
  const [templateTarget, setTemplateTarget] = useState<'current' | 'selected'>('current');
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');

  const currentTask = tasks.length > 0 ? tasks[activeTaskIndex] : null;

  const handleUpdateCurrentTask = (field: string, value: any) => {
    if (!currentTask) return;
    const newTasks = [...tasks];
    newTasks[activeTaskIndex] = { ...newTasks[activeTaskIndex], [field]: value };
    // If user edits title or content manually, perhaps we should indicate it's modified from template,
    // but for simplicity, we just allow the edit.
    setTasks(newTasks);
  };

  const toggleSelectTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(t => t !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const selectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  const handlePrev = () => setActiveTaskIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveTaskIndex((prev) => Math.min(tasks.length - 1, prev + 1));

  // --- Modal Actions ---
  const openAccountModal = () => {
    setPendingAccountIds(tasks.map(t => t.accountId));
    setAccountSearchQuery('');
    setAccountModalOpen(true);
  };

  const togglePendingAccount = (accountId: string) => {
    if (pendingAccountIds.includes(accountId)) {
      setPendingAccountIds(pendingAccountIds.filter(id => id !== accountId));
    } else {
      setPendingAccountIds([...pendingAccountIds, accountId]);
    }
  };

  const confirmAddAccounts = () => {
    const newTasks = [...tasks];
    // Add new ones
    AVAILABLE_ACCOUNTS.filter(acc => pendingAccountIds.includes(acc.id)).forEach(acc => {
      if (!newTasks.some(t => t.accountId === acc.id)) {
        newTasks.push({
          id: `task_${Date.now()}_${acc.id}`,
          accountId: acc.id,
          account: acc.name,
          avatar: acc.avatar,
          status: 'pending',
          images: [],
          title: '',
          content: '',
          tags: []
        });
      }
    });
    // Remove unselected ones
    const filteredTasks = newTasks.filter(t => pendingAccountIds.includes(t.accountId));
    
    setTasks(filteredTasks);
    // Auto-select new tasks
    const newSelected = [...selectedTasks];
    filteredTasks.forEach(t => {
      if (!newSelected.includes(t.id)) newSelected.push(t.id);
    });
    
    setSelectedTasks(newSelected.filter(id => filteredTasks.some(t => t.id === id)));
    
    if (activeTaskIndex >= filteredTasks.length) {
      setActiveTaskIndex(Math.max(0, filteredTasks.length - 1));
    }
    
    setAccountModalOpen(false);
  };

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const newTasks = [...tasks];
    
    if (templateTarget === 'current' && currentTask) {
      newTasks[activeTaskIndex] = {
        ...newTasks[activeTaskIndex],
        templateId: template.id,
        templateName: template.name,
        title: template.title,
        content: template.content,
        tags: [...template.tags],
        images: [...template.images],
        status: 'editing'
      };
    } else if (templateTarget === 'selected') {
      newTasks.forEach((task, idx) => {
        if (selectedTasks.includes(task.id)) {
          newTasks[idx] = {
            ...task,
            templateId: template.id,
            templateName: template.name,
            title: template.title,
            content: template.content,
            tags: [...template.tags],
            images: [...template.images],
            status: 'editing'
          };
        }
      });
    }

    setTasks(newTasks);
    setTemplateModalOpen(false);
  };

  const filteredAccounts = AVAILABLE_ACCOUNTS.filter(a => 
    a.name.toLowerCase().includes(accountSearchQuery.toLowerCase()) || 
    a.group.toLowerCase().includes(accountSearchQuery.toLowerCase())
  );

  const filteredTemplates = TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) || 
    t.title.toLowerCase().includes(templateSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 h-[calc(100vh-8rem)] flex overflow-hidden shadow-sm relative">
      
      {/* Column 1: Task List */}
      <div className="w-72 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0 z-20">
        <div className="p-4 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center justify-between mb-3">
             <h2 className="text-sm font-bold text-slate-800">创作队列 ({tasks.length})</h2>
             <button onClick={openAccountModal} className="text-xs text-blue-600 font-bold hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
               <Plus className="w-3 h-3" /> 添加发布账号
             </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-90 text-white rounded-lg text-sm font-bold shadow-sm transition-opacity">
             <Wand2 className="w-4 h-4" /> 批量 AI 洗稿裂变
          </button>
        </div>
        
        <div className="px-3 py-2 border-b border-slate-200 bg-slate-100/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
           <button onClick={selectAll} className="flex items-center hover:text-slate-700 font-medium">
             {tasks.length > 0 && selectedTasks.length === tasks.length ? <CheckSquare className="w-4 h-4 mr-1.5 text-blue-600" /> : <Square className="w-4 h-4 mr-1.5" />}
             全选
           </button>
           <div className="flex space-x-3 items-center">
             <span className="font-medium">已选 {selectedTasks.length}</span>
             <button 
               onClick={() => { setTemplateTarget('selected'); setTemplateModalOpen(true); }}
               disabled={selectedTasks.length === 0}
               className="text-blue-600 hover:text-blue-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
             >
               批量套用草稿
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1.5">
          {tasks.map((task, idx) => {
            const isSelected = selectedTasks.includes(task.id);
            const isActive = activeTaskIndex === idx;
            return (
              <div 
                key={task.id}
                onClick={() => setActiveTaskIndex(idx)}
                className={cn(
                  "p-3 rounded-xl cursor-pointer transition-all border text-left group relative",
                  isActive 
                    ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500" 
                    : "bg-transparent border-transparent hover:bg-slate-200/50"
                )}
              >
                <div className="flex items-start">
                   <button onClick={(e) => toggleSelectTask(task.id, e)} className="mt-0.5 mr-2.5 text-slate-400 group-hover:text-slate-600 shrink-0">
                      {isSelected ? <CheckSquare className="w-4.5 h-4.5 text-blue-600" /> : <Square className="w-4.5 h-4.5" />}
                   </button>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1.5 shrink-0 overflow-hidden pr-2">
                           <img src={task.avatar} className="w-4 h-4 rounded-full" alt="" />
                           <span className="text-[13px] font-bold text-slate-800 truncate">@{task.account}</span>
                        </div>
                        {task.status === 'success' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        ) : task.status === 'editing' ? (
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_4px_#3b82f6]"></span>
                        ) : (
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                        )}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mb-1 flex items-center gap-1">
                        {task.templateName ? (
                          <span className="bg-purple-100 text-purple-700 px-1.5 py-px rounded inline-flex items-center gap-0.5 border border-purple-200">
                             <LayoutTemplate className="w-2.5 h-2.5" />
                             {task.templateName}
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 px-1.5 py-px rounded inline-flex items-center gap-0.5 border border-slate-200">
                             自定义内容
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-slate-600 truncate mb-2">
                        {task.title || <span className="text-slate-400 italic">尚未填写标题...</span>}
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="flex gap-1.5 items-center">
                           {task.images.length > 0 ? (
                             <span className="text-[10px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 flex items-center font-medium">
                               <ImageIcon className="w-3 h-3 mr-1" /> {task.images.length}
                             </span>
                           ) : (
                             <span className="text-[10px] bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded border border-rose-100 font-medium">
                               无配图
                             </span>
                           )}
                         </div>
                         <span className="text-[10px] text-slate-400 font-mono">
                           {task.content.length} 字
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
          {tasks.length === 0 && (
             <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <Users className="w-10 h-10 mb-3 opacity-20" />
                <span className="text-xs font-medium">队列为空，请添加账号</span>
             </div>
          )}
        </div>
      </div>

      {/* Column 2: Editor */}
      <div className="flex-1 flex flex-col bg-white relative z-10 border-r border-slate-200 min-w-[450px]">
        {currentTask ? (
          <>
            {/* Editor Header with Navigation */}
            <div className="h-14 px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-4">
                 <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <button 
                      onClick={handlePrev}
                      disabled={activeTaskIndex === 0}
                      className="px-2 py-1.5 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed border-r border-slate-200 flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="px-3 text-xs font-bold text-slate-700 bg-slate-50">
                       {activeTaskIndex + 1} <span className="text-slate-400 font-normal">/ {tasks.length}</span>
                    </div>
                    <button 
                      onClick={handleNext}
                      disabled={activeTaskIndex === tasks.length - 1}
                      className="px-2 py-1.5 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed border-l border-slate-200 flex items-center"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="flex items-center gap-2">
                    <img src={currentTask.avatar} className="w-6 h-6 rounded-full border border-slate-200" alt="" />
                    <div className="text-sm font-bold text-slate-800">@{currentTask.account}</div>
                 </div>
              </div>
              <div className="flex space-x-2">
                 <button 
                   onClick={() => { setTemplateTarget('current'); setTemplateModalOpen(true); }}
                   className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200 rounded-md transition-colors flex items-center shadow-sm"
                 >
                   <LayoutTemplate className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> 从草稿/模板载入
                 </button>
                 <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold rounded-md shadow-sm transition-colors flex items-center">
                   <Send className="w-3.5 h-3.5 mr-1.5" /> 提交发布
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar bg-slate-50/50">
              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* Visuals Editor */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                   <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 flex items-center">
                          <ImageIcon className="w-4 h-4 mr-2 text-slate-400" /> 视觉素材 ({currentTask.images.length}/18)
                        </h3>
                      </div>
                      <button className="text-[12px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 flex items-center transition-colors">
                        <ListPlus className="w-3.5 h-3.5 mr-1" /> 从素材库提取
                      </button>
                   </div>
                   
                   <div className="flex gap-3 flex-wrap">
                     {currentTask.images.map((img, i) => (
                       <div key={i} className="w-32 h-32 rounded-xl border border-slate-200 relative overflow-hidden group shadow-sm bg-slate-100">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <div className="absolute top-1.5 right-1.5 bg-black/60 text-white font-bold text-[10px] px-2 py-0.5 rounded-md backdrop-blur">图 {i+1}</div>
                          <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">替换图片</button>
                       </div>
                     ))}
                     
                     <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col justify-center items-center text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                        <Plus className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">本地上传图文</span>
                     </div>
                   </div>
                </div>

                {/* Config & Rewrite Toolkit */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="border border-purple-200 bg-gradient-to-br from-purple-50 to-white rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-purple-300 transition-colors cursor-pointer">
                     <div>
                       <div className="text-sm font-bold text-purple-900 flex items-center gap-2 mb-1.5">
                         <Sparkles className="w-4 h-4 text-purple-600" />
                         专属文案生成
                       </div>
                       <div className="text-xs text-purple-600/80 leading-relaxed font-medium">贴合目标账号人设特征，一键改写不撞文结构。</div>
                     </div>
                     <div className="mt-4 flex justify-end">
                       <div className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-lg group-hover:bg-purple-200 transition-colors">
                         AI 改写优化 →
                       </div>
                     </div>
                   </div>
                   <div className="border border-slate-200 bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm group hover:border-slate-300 transition-colors cursor-pointer">
                     <div>
                       <div className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                         <Hash className="w-4 h-4 text-slate-500" />
                         话题与互动配置
                       </div>
                       <div className="text-xs text-slate-500 leading-relaxed font-medium">配置评论区置顶引导、@相关小助手及活动热门标签。</div>
                     </div>
                     <div className="mt-4 flex justify-end">
                       <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg group-hover:bg-slate-200 transition-colors">
                         高级设置项 →
                       </div>
                     </div>
                   </div>
                </div>

                {/* Text Editor */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all flex flex-col">
                   <input 
                     type="text" 
                     value={currentTask.title}
                     onChange={(e) => handleUpdateCurrentTask('title', e.target.value)}
                     placeholder="填写吸引人的标题，会有更多赞哦~" 
                     className="w-full border-b border-slate-100 px-5 pt-5 pb-4 text-[17px] font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none bg-transparent"
                   />
                   <textarea 
                     rows={12}
                     value={currentTask.content}
                     onChange={(e) => handleUpdateCurrentTask('content', e.target.value)}
                     placeholder="添加正文内容，分享你的心得..."
                     className="w-full px-5 py-4 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent resize-none leading-[1.8]"
                     style={{ minHeight: '300px' }}
                   ></textarea>
                   
                   {/* Toolbar */}
                   <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 flex flex-wrap gap-2 items-center justify-between">
                     <div className="flex gap-2">
                       <button className="flex items-center text-[12px] font-bold bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                          <Hash className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> 加话题
                       </button>
                       <button className="flex items-center text-[12px] font-bold bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> 选地点
                       </button>
                     </div>
                     <div className="text-[11px] text-slate-400 font-mono font-medium">
                       {currentTask.content.length} / 1000 字
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
             <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
             <p className="text-sm font-bold text-slate-500">请在左侧选择或添加发布账号</p>
          </div>
        )}
      </div>

      {/* Column 3: XHS Phone Preview */}
      {currentTask && (
        <div className="w-[360px] bg-[#f8f9fa] flex-shrink-0 flex flex-col relative items-center justify-center py-8 border-l border-slate-200 hidden xl:flex">
          
          <div className="absolute top-4 left-0 right-0 flex justify-center z-20 w-full px-6 pointer-events-none">
             <div className="bg-white/90 backdrop-blur p-1 rounded-full shadow-md border border-slate-200/60 flex items-center pointer-events-auto">
               <button onClick={() => setPreviewMode('feed')} className={cn("px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all", previewMode === 'feed' ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800")}>发现页信息流</button>
               <button onClick={() => setPreviewMode('detail')} className={cn("px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all", previewMode === 'detail' ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800")}>正文排版</button>
             </div>
          </div>

          {/* Device Mockup */}
          <div className="w-[320px] h-[660px] bg-black rounded-[3rem] p-2.5 shadow-2xl relative border-[4px] border-slate-800">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col relative text-slate-900">
               
               {/* iOS Status Bar */}
               <div className="h-7 w-full absolute top-0 left-0 z-50 flex justify-between items-center px-6 text-black pointer-events-none">
                  <span className="text-[11px] font-bold tracking-tight">12:00</span>
                  <div className="flex gap-1.5 items-center">
                     <Wifi className="w-3.5 h-3.5" />
                     <Battery className="w-[18px] h-[18px]" />
                  </div>
               </div>
               
               {/* Dynamic Notch */}
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-[18px] bg-black rounded-full z-50 pointer-events-none"></div>

               {previewMode === 'detail' ? (
                 <>
                   {/* Sticky App Header */}
                   <div className="flex p-4 pt-10 pb-2 items-center justify-between border-b border-gray-100 z-40 bg-white/90 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setPreviewMode('feed')} className="mr-1 text-gray-800 p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-black/5">
                           <img src={currentTask.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#333333] leading-tight">{currentTask.account}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-1.5 bg-[#ff2442] text-white text-[12px] font-bold rounded-full hover:bg-[#e61e38] transition-colors">关注</button>
                        <span className="p-1"><MoreHorizontal className="w-5 h-5 text-gray-800" /></span>
                      </div>
                   </div>

                   {/* Content Area */}
                   <div className="flex-1 overflow-y-auto custom-scrollbar pb-16 bg-white pointer-events-auto">
                      
                      {/* Media Carousel */}
                      <div className="w-full aspect-[3/4] bg-slate-100 flex items-center justify-center relative">
                         {currentTask.images.length > 0 ? (
                            <img src={currentTask.images[0]} alt="preview" className="w-full h-full object-cover" />
                         ) : (
                            <div className="text-slate-400 flex flex-col items-center">
                               <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                               <span className="text-xs font-medium">无封面视效</span>
                            </div>
                         )}
                         {currentTask.images.length > 1 && (
                           <div className="absolute top-3 right-3 bg-black/40 text-white text-[11px] font-bold px-2.5 py-1 rounded-full filter backdrop-blur-sm">
                             1/{currentTask.images.length}
                           </div>
                         )}
                      </div>

                      {/* Article Info */}
                      <div className="p-4 bg-white">
                         <div 
                           contentEditable
                           suppressContentEditableWarning
                           onBlur={(e) => handleUpdateCurrentTask('title', e.currentTarget.innerText)}
                           className="text-[17px] font-bold text-[#333333] leading-snug mb-3 tracking-wide break-words outline-none focus:bg-slate-50 focus:ring-2 focus:ring-indigo-500/20 rounded px-1 -mx-1 py-0.5 cursor-text"
                           title="点击可直接编辑标题"
                         >
                           {currentTask.title || '【标题预览占位】'}
                         </div>
                         <div 
                           contentEditable
                           suppressContentEditableWarning
                           onBlur={(e) => handleUpdateCurrentTask('content', e.currentTarget.innerText)}
                           className="text-[#333333] text-[15px] leading-[1.7] whitespace-pre-wrap font-[400] mb-4 break-words outline-none focus:bg-slate-50 focus:ring-2 focus:ring-indigo-500/20 rounded px-1 -mx-1 py-0.5 cursor-text min-h-[50px]"
                           title="点击可直接编辑正文"
                         >
                           {currentTask.content || '正文内容预览...'}
                         </div>
                         
                         {/* Tags */}
                         <div className="flex flex-wrap gap-x-2 gap-y-1.5 mb-5">
                            {currentTask.tags.map((tag, i) => (
                              <span key={i} className="text-[#13306d] text-[15px] font-medium">#{tag}</span>
                            ))}
                         </div>
                         
                         <span className="text-[#999999] text-[11px] font-medium">刚刚 发布于 广东</span>
                         
                         {/* Divider line for comments */}
                         <div className="h-px bg-gray-100 w-full mt-6 mb-4"></div>
                         <div className="text-[13px] text-[#333333] font-bold mb-4">共 0 条评论</div>
                         <div className="flex items-center gap-3 opacity-60">
                            <img src={currentTask.avatar} className="w-8 h-8 rounded-full" />
                            <div className="flex-1 bg-gray-50 text-gray-400 text-[12px] p-2 rounded-full px-4">
                               快来发表评论吧
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Bottom Interaction Bar */}
                   <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-white border-t border-gray-100 flex items-center px-4 justify-between z-40">
                      <div className="w-[130px] h-[34px] bg-[#f5f5f5] rounded-full flex items-center px-3.5 text-[#999999] text-[12px] font-medium">
                         说点什么...
                      </div>
                      <div className="flex items-center gap-4 text-[#333333]">
                         <div className="flex items-center gap-1"><Heart className="w-[22px] h-[22px]" /><span className="text-[12px] font-medium font-mono">赞</span></div>
                         <div className="flex items-center gap-1"><Star className="w-[22px] h-[22px]" /><span className="text-[12px] font-medium font-mono">收藏</span></div>
                         <div className="flex items-center gap-1"><MessageCircle className="w-[22px] h-[22px]" /><span className="text-[12px] font-medium font-mono">评论</span></div>
                      </div>
                   </div>
                 </>
               ) : (
                 <>
                   {/* Feed View Header */}
                   <div className="flex px-4 pt-10 pb-2 items-center justify-between z-40 bg-white/90 backdrop-blur-md">
                      <Menu className="w-6 h-6 text-gray-400" />
                      <div className="flex gap-5 items-center">
                         <span className="text-[15px] text-gray-500 font-medium">关注</span>
                         <div className="flex flex-col items-center">
                            <span className="text-[16px] font-bold text-gray-900">发现</span>
                            <div className="w-4 h-[3px] bg-[#ff2442] rounded-full mt-1"></div>
                         </div>
                         <span className="text-[15px] text-gray-500 font-medium">同城</span>
                      </div>
                      <Search className="w-6 h-6 text-gray-800" />
                   </div>
                   
                   {/* Feed Masonry Layout */}
                   <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f0f0f0] p-1.5 flex items-start gap-1.5 pb-16 pointer-events-auto">
                      {/* Left Column */}
                      <div className="flex-1 flex flex-col gap-1.5">
                         {/* Current Task Item */}
                         <div 
                           className="bg-white rounded-lg overflow-hidden relative group cursor-pointer border-2 border-indigo-500 hover:border-indigo-400 transition-colors shadow-sm"
                           onClick={() => setPreviewMode('detail')}
                         >
                           <div className="absolute top-1.5 left-1.5 bg-indigo-600/90 backdrop-blur text-white text-[10px] font-black tracking-wide px-2 py-0.5 rounded shadow z-10 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-yellow-300" /> 你的排版
                           </div>
                           <div className="w-full aspect-[3/4] bg-slate-100 flex justify-center items-center">
                             {currentTask.images.length > 0 ? (
                               <img src={currentTask.images[0]} className="w-full h-full object-cover" />
                             ) : (
                               <div className="text-slate-400 text-[10px] flex flex-col items-center font-medium">
                                  <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                                  无封面
                               </div>
                             )}
                           </div>
                           <div className="p-2.5">
                             <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-relaxed mb-2">
                               {currentTask.title || '标题占位符'}
                             </h3>
                             <div className="flex justify-between items-center text-[#555] text-[11px]">
                               <div className="flex items-center gap-1.5 max-w-[65%]">
                                 <img src={currentTask.avatar} className="w-4 h-4 rounded-full border border-gray-100" />
                                 <span className="line-clamp-1 truncate font-medium">{currentTask.account}</span>
                               </div>
                               <div className="flex items-center gap-0.5 mt-0.5">
                                 <Heart className="w-3.5 h-3.5" />
                                 <span className="font-medium">10</span>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         {/* Feed Item 2 */}
                         <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                           <div className="w-full h-[220px] bg-slate-100">
                              <img src={MOCK_FEED[1].cover} className="w-full h-full object-cover" />
                           </div>
                           <div className="p-2.5">
                             <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-relaxed mb-2">{MOCK_FEED[1].title}</h3>
                             <div className="flex justify-between items-center text-[#555] text-[11px]">
                               <div className="flex items-center gap-1.5 max-w-[65%]">
                                 <img src={MOCK_FEED[1].avatar} className="w-4 h-4 rounded-full border border-gray-100" />
                                 <span className="line-clamp-1 truncate font-medium">{MOCK_FEED[1].author}</span>
                               </div>
                               <div className="flex items-center gap-0.5 mt-0.5">
                                 <Heart className="w-3.5 h-3.5" />
                                 <span className="font-medium">{MOCK_FEED[1].likes}</span>
                               </div>
                             </div>
                           </div>
                         </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex-1 flex flex-col gap-1.5">
                         {/* Feed Item 1 */}
                         <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                           <div className="w-full h-[180px] bg-slate-100">
                             <img src={MOCK_FEED[0].cover} className="w-full h-full object-cover" />
                           </div>
                           <div className="p-2.5">
                             <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-relaxed mb-2">{MOCK_FEED[0].title}</h3>
                             <div className="flex justify-between items-center text-[#555] text-[11px]">
                               <div className="flex items-center gap-1.5 max-w-[65%]">
                                 <img src={MOCK_FEED[0].avatar} className="w-4 h-4 rounded-full border border-gray-100" />
                                 <span className="line-clamp-1 truncate font-medium">{MOCK_FEED[0].author}</span>
                               </div>
                               <div className="flex items-center gap-0.5 mt-0.5">
                                 <Heart className="w-3.5 h-3.5" />
                                 <span className="font-medium">{MOCK_FEED[0].likes}</span>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Feed Item 3 */}
                         <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                           <div className="w-full h-[200px] bg-slate-100">
                             <img src={MOCK_FEED[2].cover} className="w-full h-full object-cover" />
                           </div>
                           <div className="p-2.5">
                             <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-relaxed mb-2">{MOCK_FEED[2].title}</h3>
                             <div className="flex justify-between items-center text-[#555] text-[11px]">
                               <div className="flex items-center gap-1.5 max-w-[65%]">
                                 <img src={MOCK_FEED[2].avatar} className="w-4 h-4 rounded-full border border-gray-100" />
                                 <span className="line-clamp-1 truncate font-medium">{MOCK_FEED[2].author}</span>
                               </div>
                               <div className="flex items-center gap-0.5 mt-0.5">
                                 <Heart className="w-3.5 h-3.5" />
                                 <span className="font-medium">{MOCK_FEED[2].likes}</span>
                               </div>
                             </div>
                           </div>
                         </div>
                      </div>
                   </div>

                   {/* Feed Bottom Bar */}
                   <div className="absolute bottom-0 left-0 right-0 h-[55px] bg-white border-t border-gray-100 flex items-center px-6 justify-between z-40 text-[#999999]">
                     <div className="flex flex-col items-center text-[#333333] font-bold">
                        <span className="text-[15px]">首页</span>
                     </div>
                     <div className="flex flex-col items-center hover:text-[#333] transition-colors"><span className="text-[15px] font-medium">购物</span></div>
                     <div className="w-11 h-8 bg-[#ff2442] flex justify-center items-center rounded-lg text-white font-bold text-xl shadow-sm"><Plus className="w-6 h-6"/></div>
                     <div className="flex flex-col items-center hover:text-[#333] transition-colors"><span className="text-[15px] font-medium">消息</span></div>
                     <div className="flex flex-col items-center hover:text-[#333] transition-colors"><span className="text-[15px] font-medium">我</span></div>
                   </div>
                 </>
               )}

               {/* Home Indicator */}
               <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-black rounded-full z-50 pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}

      {/* --- Modals --- */}
      
      {/* 1. Add Accounts Modal */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                 <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                   <Users className="w-5 h-5 text-blue-600" />
                   选择发布账号
                 </h2>
                 <button onClick={() => setAccountModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
                 <div className="relative">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input 
                     type="text" 
                     placeholder="搜索账号名称或分组..." 
                     value={accountSearchQuery}
                     onChange={(e) => setAccountSearchQuery(e.target.value)}
                     className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                   />
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {filteredAccounts.map(acc => {
                  const isChecked = pendingAccountIds.includes(acc.id);
                  return (
                    <div 
                      key={acc.id}
                      onClick={() => togglePendingAccount(acc.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border text-left",
                        isChecked ? "bg-blue-50/50 border-blue-200" : "bg-transparent border-transparent hover:bg-slate-50"
                      )}
                    >
                       <div className="shrink-0 text-slate-400">
                         {isChecked ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5" />}
                       </div>
                       <img src={acc.avatar} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 shrink-0" alt=""/>
                       <div className="flex-1 min-w-0">
                         <div className="font-bold text-[14px] text-slate-800 truncate">{acc.name}</div>
                         <div className="text-[12px] text-slate-500 mt-0.5">{acc.group}</div>
                       </div>
                    </div>
                  );
                })}
                {filteredAccounts.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-sm">
                    未找到相关账号
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                 <div className="text-sm font-medium text-slate-600">
                   已选 <span className="text-blue-600 font-bold">{pendingAccountIds.length}</span> 个账号
                 </div>
                 <div className="flex gap-3">
                   <button onClick={() => setAccountModalOpen(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-100 transition-colors">
                     取消
                   </button>
                   <button onClick={confirmAddAccounts} className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-500 transition-colors">
                     确认添加
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Select Template Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                 <div>
                   <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                     <LayoutTemplate className="w-5 h-5 text-purple-600" />
                     选择草稿 / 内容模板
                   </h2>
                   <p className="text-xs text-slate-500 mt-1">
                     {templateTarget === 'current' ? `正在应用到账号: @${currentTask?.account}` : `正在批量应用到选中的 ${selectedTasks.length} 个账号`}
                   </p>
                 </div>
                 <button onClick={() => setTemplateModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
                 <div className="relative">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input 
                     type="text" 
                     placeholder="搜索模板名称或内容关键字..." 
                     value={templateSearchQuery}
                     onChange={(e) => setTemplateSearchQuery(e.target.value)}
                     className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                   />
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/50 space-y-3">
                {filteredTemplates.map(template => (
                  <div 
                    key={template.id}
                    onClick={() => applyTemplate(template.id)}
                    className="flex flex-col gap-3 p-4 rounded-xl cursor-pointer transition-all border border-slate-200 bg-white hover:border-purple-300 hover:shadow-md group"
                  >
                     <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
                            {template.name}
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono border border-slate-200 uppercase">Template</span>
                          </div>
                          <div className="text-[13px] font-bold text-slate-600 mt-2 truncate">
                            {template.title}
                          </div>
                        </div>
                        <button className="px-3 py-1.5 bg-purple-50 text-purple-700 font-bold text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-purple-200">
                          套用此模板
                        </button>
                     </div>
                     <div className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">
                       {template.content}
                     </div>
                     <div className="flex gap-2">
                       {template.tags.map((tag, idx) => (
                         <span key={idx} className="text-[11px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md font-medium border border-purple-100">
                           #{tag}
                         </span>
                       ))}
                     </div>
                  </div>
                ))}
                {filteredTemplates.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center">
                    <FileText className="w-10 h-10 mb-3 opacity-20" />
                    未找到相关模板
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
