import { useState, useRef, useEffect } from 'react';
import { Search, RefreshCw, Send, Copy, Image as ImageIcon, Settings, Plus, X, Command, Edit2, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const ACCOUNTS = [
  { id: 1, name: '潮流风向标', xhs: 'trend_88', unread: 12, status: 'online' },
  { id: 2, name: '美食探店家', xhs: 'foodie_vip', unread: 5, status: 'online' },
  { id: 3, name: '数码极客', xhs: 'geek_tech', unread: 0, status: 'offline' },
  { id: 4, name: '情感语录', xhs: 'emo_daily', unread: 23, status: 'online' },
];

const SESSIONS = [
  { id: 101, user: 'User_ABC', avatar: 'A', preview: '请问这件衣服还有M码吗？', time: '10:42', unread: true, type: 'real' },
  { id: 102, user: '王小小', avatar: '王', preview: '地址发一下～', time: '09:15', unread: true, type: 'real' },
  { id: 103, user: '系统通知', avatar: '!', preview: '您的笔记已被推荐', time: '昨天', unread: false, type: 'notice' },
  { id: 104, user: '周末去哪儿', avatar: '周', preview: '[图片]', time: '昨天', unread: false, type: 'real' },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function MessageCenter() {
  const [activeAccount, setActiveAccount] = useState(1);
  const [activeSession, setActiveSession] = useState(101);
  const [quickReplies, setQuickReplies] = useState([
    '亲随时有货的哦~',
    '我们承诺24小时内发货',
    '默认发圆通，急单补差顺丰',
    '请提供一下您的具体身高体重，这边给您推荐尺码~',
    '感谢您的喜欢，关注我们可以领取专属优惠券哦！'
  ]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [newQuickReply, setNewQuickReply] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [inputText, setInputText] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeSession]);

  const addQuickReply = () => {
    if (newQuickReply.trim()) {
      setQuickReplies([...quickReplies, newQuickReply.trim()]);
      setNewQuickReply('');
    }
  };

  const removeQuickReply = (index: number) => {
    setQuickReplies(quickReplies.filter((_, i) => i !== index));
  };

  const saveEditQuickReply = () => {
    if (editIndex !== null && editValue.trim()) {
       const newReplies = [...quickReplies];
       newReplies[editIndex] = editValue.trim();
       setQuickReplies(newReplies);
       setEditIndex(null);
       setEditValue('');
    }
  };

  const handleSend = () => {
    if(inputText.trim()) {
       console.log('Sending:', inputText);
       setInputText('');
    }
  };

  return (
    <div className="bg-slate-50 h-full p-2 lg:p-4 flex flex-col">
      <div className="bg-white rounded-2xl border border-slate-200/60 flex-1 flex overflow-hidden shadow-sm ring-1 ring-black/5">
        
        {/* Left Column: Accounts */}
        <div className="w-[280px] border-r border-slate-200/70 flex flex-col bg-slate-50/50 flex-shrink-0 z-20">
          <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200/70 bg-white">
            <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-600" />
              席位账号
            </h2>
            <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 rounded-md">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 bg-white">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="搜索账号或备注名..." 
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/70 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>
          
          <motion.div variants={listVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {ACCOUNTS.map(acc => (
              <motion.button 
                variants={itemVariants}
                key={acc.id}
                onClick={() => setActiveAccount(acc.id)}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl flex items-center transition-all relative overflow-hidden group",
                  activeAccount === acc.id 
                    ? "bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200/80" 
                    : "hover:bg-white/60 border border-transparent"
                )}
              >
                {activeAccount === acc.id && (
                  <motion.div layoutId="activeAccountIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-500 rounded-r-full" />
                )}
                <div className="w-10 h-10 rounded-[10px] bg-gradient-to-tr from-slate-100 to-slate-50 text-slate-700 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 relative border border-slate-200/60 shadow-sm">
                  {acc.name.charAt(0)}
                  <span className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                    acc.status === 'online' ? "bg-emerald-500" : "bg-slate-400"
                  )}></span>
                </div>
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={cn("text-sm font-bold truncate", activeAccount === acc.id ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")}>{acc.name}</span>
                    {acc.unread > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{acc.unread}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono font-medium truncate tracking-tight">@{acc.xhs}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Middle Column: Sessions */}
        <div className="w-[320px] border-r border-slate-200/70 flex flex-col bg-white flex-shrink-0 z-10">
          <div className="p-3 border-b border-slate-200/70">
             <div className="flex items-center text-sm bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
               <button className="flex-1 bg-white shadow-sm py-1.5 rounded-lg font-bold text-slate-800 text-xs transition-colors">全部私信</button>
               <button className="flex-1 text-slate-500 hover:text-slate-800 font-medium text-xs transition-colors">系统通知 <span className="ml-1 inline-block bg-slate-200 text-slate-600 px-1.5 rounded-full text-[10px]">1</span></button>
             </div>
          </div>
          
          <motion.div variants={listVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto custom-scrollbar">
            {SESSIONS.map(session => (
              <motion.button 
                variants={itemVariants}
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={cn(
                  "w-full text-left p-4 border-b border-slate-100/80 flex items-start transition-colors relative group",
                  activeSession === session.id 
                    ? "bg-slate-50/80" 
                    : "hover:bg-slate-50/50"
                )}
              >
                {activeSession === session.id && (
                  <motion.div layoutId="activeSession" className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 rounded-r-full" />
                )}
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm mr-3.5 flex-shrink-0 border shadow-sm relative",
                  session.type === 'notice' ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 border-slate-200/80"
                )}
                >
                  {session.avatar}
                  {session.unread && activeSession !== session.id && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn(
                      "text-sm truncate",
                      session.unread ? "font-bold text-slate-900" : "font-bold text-slate-700"
                    )}>{session.user}</span>
                    <span className={cn("text-[11px] font-mono", session.unread ? "text-blue-600 font-bold" : "text-slate-400 font-medium")}>{session.time}</span>
                  </div>
                  <div className={cn(
                    "text-[13px] truncate leading-relaxed",
                    session.unread ? "text-slate-800 font-medium" : "text-slate-500"
                  )}>
                    {session.preview}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC] relative z-0">
          
          {/* Chat Header Backdrop */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
          
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between bg-white/80 backdrop-blur-xl z-20 flex-shrink-0 sticky top-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">A</div>
              <div>
                 <div className="flex items-center gap-2 mb-0.5">
                   <h3 className="font-bold text-slate-900 text-lg">User_ABC</h3>
                   <span className="px-2 py-0.5 border border-emerald-200 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Online</span>
                 </div>
                 <div className="text-[12px] font-mono text-slate-500 flex items-center gap-1.5">
                    从您的笔记 <span className="text-blue-600 cursor-pointer hover:underline">"秋冬微胖穿搭..."</span> 分享进入
                 </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-[13px] flex items-center px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-xl hover:border-slate-300 font-bold text-slate-700 transition-all hover:bg-slate-50">
                <Copy className="w-4 h-4 mr-2 text-slate-400" /> 复制客户ID
              </button>
              <button className="text-[13px] flex items-center px-4 py-2 bg-slate-900 text-white shadow-sm shadow-slate-900/20 rounded-xl hover:bg-slate-800 font-bold transition-all">
                设为置顶
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
             ref={chatContainerRef}
             className="flex-1 overflow-y-auto px-6 py-8 space-y-6 custom-scrollbar z-0"
          >
            <div className="flex justify-center my-6">
               <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">昨天 14:30</span>
            </div>
            
            {/* Incoming */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-end max-w-2xl">
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl rounded-bl-sm text-[15px] leading-relaxed text-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                你好，请问你们那款黑色的卫衣还有货吗？
              </div>
            </motion.div>

            <div className="flex justify-center my-6">
               <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">今天 10:42</span>
            </div>

            {/* Incoming */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-end max-w-2xl">
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl rounded-bl-sm text-[15px] leading-relaxed text-slate-800 shadow-sm relative">
                如果拍下什么时候能发货呢？
              </div>
            </motion.div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-slate-200/60 p-4 z-20 flex-shrink-0 flex flex-col shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.02)]">
            
            {/* Quick Replies Strip */}
            <div className="flex items-center mb-3">
              <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar pt-1 pb-2 pr-4 relative mask-image-fade-right">
                {quickReplies.map((reply, index) => (
                  <button 
                    key={index} 
                    onClick={() => setInputText((prev) => prev ? `${prev} ${reply}` : reply)}
                    className="whitespace-nowrap text-[13px] bg-slate-50 text-slate-700 font-medium border border-slate-200/80 px-3.5 py-1.5 rounded-full hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm active:scale-95"
                  >
                    {reply.length > 15 ? reply.substring(0, 15) + '...' : reply}
                  </button>
                ))}
              </div>
              
              {/* Settings Trigger */}
              <div className="pl-3 border-l border-slate-200 flex-shrink-0">
                <button 
                  onClick={() => setIsManageModalOpen(true)}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" /> 管理话术
                </button>
              </div>
            </div>

            {/* Main Textarea */}
            <div className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl p-1 flex shadow-inner focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 focus-within:bg-white transition-all transition-duration-200">
               <textarea 
                  className="flex-1 bg-transparent p-3 outline-none resize-none text-[15px] text-slate-800 placeholder:text-slate-400"
                  rows={3}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="输入回复内容，Cmd + Enter 快速发送..."
               ></textarea>
               <div className="flex flex-col justify-end p-2 gap-2">
                 <button className="text-slate-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-colors">
                   <ImageIcon className="w-5 h-5" />
                 </button>
                 <button 
                   onClick={handleSend}
                   disabled={!inputText.trim()}
                   className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none shadow-lg shadow-blue-600/20 transition-all"
                 >
                   <Send className="w-4 h-4 ml-0.5" />
                 </button>
               </div>
            </div>
            
            {/* Context Footer */}
            <div className="flex items-center justify-between mt-3 px-2">
               <div className="flex items-center text-[11px] font-bold text-emerald-600">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                 当前席位 [潮流风向标] 信道加密握手成功，回复无阻碍
               </div>
               <div className="text-[11px] font-mono text-slate-400 flex items-center font-medium">
                  <Command className="w-3 h-3 mr-1" /> 回车换行，Cmd+Enter 发送
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over / Modal for Manage Quick Replies */}
      <AnimatePresence>
        {isManageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
               onClick={() => setIsManageModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200/60 overflow-hidden flex flex-col max-h-[85vh] relative z-10"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white relative">
                 <h2 className="text-[17px] font-bold text-slate-800">管理快捷回复 (话术库)</h2>
                 <button 
                   onClick={() => setIsManageModalOpen(false)} 
                   className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 custom-scrollbar relative">
                 {/* Add New Reply */}
                 <div className="mb-8">
                    <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-3">新增话术</div>
                    <div className="flex shadow-sm rounded-xl overflow-hidden ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-white p-1">
                      <input 
                        type="text"
                        value={newQuickReply}
                        onChange={(e) => setNewQuickReply(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addQuickReply()}
                        placeholder="输入新快捷回复内容..."
                        className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm font-medium text-slate-800 placeholder:text-slate-400"
                      />
                      <button 
                        onClick={addQuickReply}
                        disabled={!newQuickReply.trim()}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-bold text-[13px] rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                         <Plus className="w-4 h-4" /> 添加
                      </button>
                    </div>
                 </div>

                 {/* List */}
                 <div>
                    <div className="flex items-center justify-between mb-3 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>我的快捷回复列表</span>
                      <span>共 {quickReplies.length} 条</span>
                    </div>
                    <div className="space-y-3">
                      {quickReplies.map((reply, index) => (
                        <div key={index} className="group bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                           {editIndex === index ? (
                             <div className="flex flex-col gap-3">
                                <textarea 
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full text-sm font-medium text-slate-800 p-3 bg-slate-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none custom-scrollbar"
                                  rows={2}
                                />
                                <div className="flex justify-end gap-2">
                                   <button 
                                     onClick={() => setEditIndex(null)}
                                     className="px-4 py-1.5 text-[12px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                   >
                                     取消
                                   </button>
                                   <button 
                                     onClick={saveEditQuickReply}
                                     className="flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                                   >
                                     <CheckCircle2 className="w-3.5 h-3.5" /> 保存
                                   </button>
                                </div>
                             </div>
                           ) : (
                             <div className="flex justify-between items-start gap-4">
                                <p className="text-[14px] text-slate-700 leading-relaxed font-medium">
                                   {reply}
                                </p>
                                <div className="flex shrink-0 opacity-0 group-hover:opacity-100 transition-opacity gap-1.5">
                                   <button 
                                     onClick={() => { setEditIndex(index); setEditValue(reply); }}
                                     className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                     aria-label="编辑"
                                   >
                                     <Edit2 className="w-4 h-4" />
                                   </button>
                                   <button 
                                     onClick={() => removeQuickReply(index)}
                                     className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                                     aria-label="删除"
                                   >
                                     <X className="w-4 h-4" />
                                   </button>
                                </div>
                             </div>
                           )}
                        </div>
                      ))}
                      {quickReplies.length === 0 && (
                        <div className="text-center py-12 text-slate-400 font-medium">
                           暂无快捷回复话术，请在上方添加
                        </div>
                      )}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

