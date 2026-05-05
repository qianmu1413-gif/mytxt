import React, { useState } from 'react';
import { 
  Folder, Users, Search, Plus, Filter, MoreHorizontal, 
  Smartphone, ShieldCheck, AlertCircle, PlayCircle, Settings,
  Tag, Download, Trash2, CheckSquare, Square, CheckCircle2, AlertTriangle,
  History, Clock, HardDrive, Network, MapPin, X, ChevronRight, ChevronLeft,
  RefreshCw, Save, UserPlus, Heart, Link as LinkIcon, LayoutGrid, ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const ACCOUNT_GROUPS = [
  { id: 'all', name: '全部小红书账号', count: 1256 },
  { id: 'beauty', name: '美妆个护矩阵', count: 452 },
  { id: 'fashion', name: 'OOTD穿搭矩阵', count: 328 },
  { id: 'food', name: '本地探店矩阵', count: 205 },
  { id: 'tech', name: '数码潮物测试', count: 112 },
  { id: 'banned', name: '异常/风控隔离', count: 15, alert: true },
];

// Generate robust mock data for hundreds of accounts
const MOCK_ACCOUNTS = Array.from({ length: 156 }).map((_, i) => ({
  id: `xhs_${Math.floor(Math.random() * 1000000) + 100000}`,
  name: `种草日记_${i}`,
  avatar: `https://ui-avatars.com/api/?name=User${i}&background=random`,
  platform: '小红书',
  group: i % 5 === 0 ? 'OOTD穿搭矩阵' : '美妆个护矩阵',
  status: i % 15 === 0 ? '风控限流' : i === 7 ? '封禁' : '正常',
  followers: Math.floor(Math.random() * 50000),
  notesCount: Math.floor(Math.random() * 150),
  slot: `Cluster-${Math.floor(i / 20) + 1} / Slot-${(i % 20) + 1}`,
  currentIp: `113.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  ipLocation: ['广州', '深圳', '杭州', '成都', '上海'][i % 5],
  lastActive: `${Math.floor(Math.random() * 60)}分钟前`,
  backupTime: `2024-05-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} 03:00:00`,
  restoreTime: i % 3 === 0 ? `2024-04-15 14:30:00` : '-',
  historicalIps: Array.from({ length: 3 }).map((_, j) => `113.11.${j * 10}.${Math.floor(Math.random() * 255)} (停留${Math.floor(Math.random()*10)+1}天)`),
  historicalNames: i % 4 === 0 ? [`逛吃小分队_${i}`, `薯条探店_${i}`] : []
}));

const MOCK_NOTES = Array.from({ length: 12 }).map((_, i) => ({
  id: `note_${i}`,
  title: [
    '周末OOTD | 这样穿真的超级舒服~',
    '被问爆了的秋冬高质感外套🧥',
    '分享我的日常护肤步骤，干皮必看！',
    '探店｜藏在巷子里的神仙咖啡馆☕️',
    '懒人福音！5分钟快手早餐教程🥣',
    '打工人的通勤包里装了啥？',
    '年底大扫除，这些好物相见恨晚🧹',
    '近期爱用物分享，全是无限回购款！',
    '初秋微胖女孩穿搭，显瘦绝了',
    '不用揉面的全麦面包，低脂饱腹',
    '我的桌面改造计划，提升幸福感',
    '假期去哪里？这个小众岛屿太美了'
  ][i % 12],
  cover: `https://picsum.photos/seed/${i + 150}/400/${300 + Math.floor(Math.random() * 300)}`,
  likes: Math.floor(Math.random() * 5000) + 12,
}));

const MOCK_LINKS = [
  { title: "淘宝店铺口令", url: "https://m.tb.cn/h.xxx", clicks: 1205 },
  { title: "商务合作微信", url: "wxid_123456789", clicks: 342 },
  { title: "品牌私域引流页", url: "https://example.com/promo", clicks: 890 }
];

export default function AccountAssets() {
  const [activeGroup, setActiveGroup] = useState('beauty');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailAccount, setDetailAccount] = useState<typeof MOCK_ACCOUNTS[0] | null>(null);
  const [detailTab, setDetailTab] = useState<'notes' | 'links' | 'env'>('notes');

  const toggleSelect = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const filteredData = MOCK_ACCOUNTS.filter(acc => acc.name.includes(searchQuery) || acc.id.includes(searchQuery));
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    const pageIds = pageData.map(a => a.id);
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedAccounts.includes(id));
    if (allSelected) {
      setSelectedAccounts(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      setSelectedAccounts(prev => [...new Set([...prev, ...pageIds])]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 h-[calc(100vh-8rem)] flex overflow-hidden shadow-sm relative">
      {/* Left Sidebar: Groups */}
      <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col flex-shrink-0 relative z-10 transition-all duration-300">
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-[15px] font-bold text-slate-800">账号矩阵编组</h2>
          <button className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {ACCOUNT_GROUPS.map(group => (
            <div 
              key={group.id}
              onClick={() => { setActiveGroup(group.id); setCurrentPage(1); }}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all border",
                activeGroup === group.id 
                  ? "bg-white border-blue-500 shadow-sm text-blue-700 font-bold" 
                  : "bg-transparent border-transparent text-slate-600 hover:bg-slate-200/50 hover:text-slate-800 font-medium"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Folder className={cn("w-4 h-4", activeGroup === group.id ? "text-blue-500" : "text-slate-400")} fill={activeGroup === group.id ? "currentColor" : "none"} opacity={activeGroup === group.id ? 0.2 : 1} />
                <span className="text-[13px]">{group.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {group.alert && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                <span className={cn(
                  "text-[11px] px-1.5 rounded-md", 
                  activeGroup === group.id ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
                )}>{group.count}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Storage Widget */}
        <div className="p-4 bg-white border-t border-slate-200 m-3 rounded-xl shadow-sm">
           <div className="flex justify-between items-end mb-2">
             <div className="text-[12px] font-bold text-slate-700">云端存储限额 (用于号档备份)</div>
             <div className="text-[10px] text-slate-500">420GB / 1TB</div>
           </div>
           <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div className="bg-blue-500 h-full rounded-full" style={{ width: '42%' }}></div>
           </div>
        </div>
      </div>

      {/* Main Content: Table */}
      <div className="flex-1 flex flex-col bg-white min-w-0 relative z-0">
        {/* Top Action Bar */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
             <div className="relative w-72">
                <input 
                  type="text" 
                  placeholder="搜索小红书账号、UID、坑位号..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
             </div>
             <button className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-[13px] font-medium flex items-center gap-2">
               <Filter className="w-4 h-4" /> 状态筛选
             </button>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[13px] font-bold shadow-sm transition-colors flex items-center gap-2">
               <Download className="w-4 h-4" /> 导出归档
             </button>
             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[13px] font-bold shadow-sm transition-colors flex items-center gap-2">
               <Smartphone className="w-4 h-4" /> 批量上号录入
             </button>
          </div>
        </div>

        {/* Batch Actions Toolkit */}
        {selectedAccounts.length > 0 && (
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-2.5 flex items-center justify-between shrink-0 animation-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">
                已选 {selectedAccounts.length} 项
              </span>
              <div className="h-4 w-px bg-blue-200"></div>
              <button className="text-[12px] font-medium text-slate-700 hover:text-blue-700 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-100/50 transition-colors">
                 <Network className="w-3.5 h-3.5" /> 切换IP/网络
              </button>
              <button className="text-[12px] font-medium text-slate-700 hover:text-blue-700 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-100/50 transition-colors">
                 <Save className="w-3.5 h-3.5" /> 全量号档备份
              </button>
              <button className="text-[12px] font-medium text-slate-700 hover:text-blue-700 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-100/50 transition-colors">
                 <RefreshCw className="w-3.5 h-3.5" /> 恢复至快照
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-[12px] font-medium text-slate-700 hover:text-rose-600 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-rose-50 transition-colors">
                 <Trash2 className="w-3.5 h-3.5" /> 批量下号
              </button>
            </div>
          </div>
        )}

        {/* Table Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="py-3 px-6 w-12">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-blue-600 mt-1">
                    {pageData.length > 0 && pageData.every(a => selectedAccounts.includes(a.id)) ? <CheckSquare className="w-[18px] h-[18px] text-blue-600" /> : <Square className="w-[18px] h-[18px]" />}
                  </button>
                </th>
                <th className="py-3 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest w-[250px]">账号信息</th>
                <th className="py-3 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-center w-[100px]">状态</th>
                <th className="py-3 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">坑位与环境 (IP)</th>
                <th className="py-3 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">号档资产与备份</th>
                <th className="py-3 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-widest text-right w-[100px]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageData.map((acc) => {
                const isSelected = selectedAccounts.includes(acc.id);
                const isFocused = detailAccount?.id === acc.id;
                return (
                  <tr 
                    key={acc.id} 
                    onClick={() => setDetailAccount(acc)} 
                    className={cn(
                      "group cursor-pointer transition-colors",
                      isSelected ? "bg-blue-50/40" : "hover:bg-slate-50",
                      isFocused ? "bg-blue-50/80 border-l-2 border-l-blue-500" : "border-l-2 border-l-transparent"
                    )}
                  >
                    <td className="py-4 px-6 border-l-inherit" onClick={(e) => toggleSelect(acc.id, e)}>
                      <button className="text-slate-300 group-hover:text-slate-400">
                        {isSelected ? <CheckSquare className="w-[18px] h-[18px] text-blue-600" /> : <Square className="w-[18px] h-[18px]" />}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={acc.avatar} alt="" className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200" />
                        <div>
                          <div className="font-bold text-[14px] text-slate-800 flex items-center gap-2">
                             {acc.name}
                             {acc.historicalNames.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] text-slate-500 border border-slate-200" title="曾用名记录">更名</span>
                             )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5" title="小红书号 / UID">UID: {acc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                       {acc.status === '正常' ? (
                         <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100 shadow-sm">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 正常
                         </span>
                       ) : acc.status === '风控限流' ? (
                         <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-100 shadow-sm">
                           <AlertTriangle className="w-3.5 h-3.5" /> 风控限流
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-rose-50 text-rose-600 text-[11px] font-bold border border-rose-100 shadow-sm">
                           <AlertCircle className="w-3.5 h-3.5" /> 异常封禁
                         </span>
                       )}
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex flex-col gap-1.5">
                         <div className="flex items-center gap-2">
                            <span className="text-[12px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded shadow-sm border border-slate-200 flex items-center gap-1.5">
                              <HardDrive className="w-3 h-3 text-slate-400" />
                              {acc.slot}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {acc.lastActive}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-[12px] font-mono text-blue-600 flex items-center gap-1">
                               <Network className="w-3 h-3" /> {acc.currentIp}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> {acc.ipLocation}</span>
                         </div>
                       </div>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center justify-between w-[300px]">
                         <div className="flex flex-col">
                            <div className="text-[12px] font-medium text-slate-600 flex items-center gap-1.5">
                               <Save className="w-3.5 h-3.5 text-slate-400" />
                               <span className="text-slate-400 font-mono">备份:</span> 
                               <span className="text-slate-700">{acc.backupTime.split(' ')[0]}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1">
                               <RefreshCw className="w-3 h-3 text-slate-400" />
                               <span className="text-slate-400 font-mono">恢复:</span> 
                               {acc.restoreTime}
                            </div>
                         </div>
                         <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
                           <div className="text-center">
                             <div className="text-[13px] font-bold text-slate-700 leading-tight">{acc.followers.toLocaleString()}</div>
                             <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">粉丝</div>
                           </div>
                           <div className="text-center">
                             <div className="text-[13px] font-bold text-slate-700 leading-tight">{acc.notesCount}</div>
                             <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">笔记</div>
                           </div>
                         </div>
                       </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                       <div className="flex justify-end items-center gap-2" onClick={(e) => { e.stopPropagation(); setDetailAccount(acc); }}>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors border border-transparent hover:border-blue-100" title="详情">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="h-14 border-t border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-10 relative">
           <div className="text-[12px] text-slate-500 font-medium">
             正在显示 {filteredData.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, filteredData.length)} 项，共 <span className="font-bold text-slate-800">{filteredData.length}</span> 个账号
           </div>
           <div className="flex items-center gap-2">
              <select 
                 className="text-[12px] border border-slate-200 rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 font-mono"
                 value={pageSize}
                 onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              >
                 <option value={20}>20 / 页</option>
                 <option value={50}>50 / 页</option>
                 <option value={100}>100 / 页</option>
              </select>
              <div className="h-4 w-px bg-slate-200 mx-1"></div>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-colors"
                title="上一页"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[12px] font-mono text-slate-600 px-2 min-w-[3rem] text-center">{currentPage} / {Math.max(1, totalPages)}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 rounded bg-slate-100 text-slate-600 disabled:opacity-50 hover:bg-slate-200 transition-colors"
                title="下一页"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>

      {/* Detail Slide Panel */}
      <AnimatePresence>
        {detailAccount && (
          <>
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
               onClick={() => setDetailAccount(null)}
            />
            {/* Slide Panel */}
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[760px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 relative z-20">
                 <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                    系统托管档案
                 </h3>
                 <button onClick={() => setDetailAccount(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Profile Top Section */}
              <div className="shrink-0 bg-white relative">
                 {/* Banner Image */}
                 <div className="h-40 bg-slate-200 relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/${detailAccount.id}/800/300`} className="w-full h-full object-cover" alt="Cover" />
                    <div className="absolute inset-0 bg-black/10"></div>
                 </div>
                 <div className="px-8 pb-5">
                    <div className="flex items-start gap-6 relative -mt-10">
                       <img src={detailAccount.avatar} className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-sm bg-slate-100 object-cover z-10" alt="Avatar"/>
                       <div className="flex-1 mt-12">
                         <div className="flex justify-between items-start">
                           <div>
                             <h2 className="text-2xl font-bold text-slate-900 mb-1">{detailAccount.name}</h2>
                             <div className="text-[12px] font-mono text-slate-500 flex items-center gap-2 mb-2">
                                小红书号: {detailAccount.id}
                                <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold border", detailAccount.status === '正常' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200")}>
                                  {detailAccount.status}
                                </span>
                             </div>
                             <div className="text-[13px] text-slate-700 flex flex-col gap-2 mb-4">
                                <div className="flex flex-wrap gap-2">
                                   <span className="bg-slate-100/80 text-slate-600 px-2 py-0.5 rounded-full text-[11px] flex items-center gap-1"><MapPin className="w-3 h-3"/> IP属地: {detailAccount.ipLocation}机房</span>
                                   <span className="bg-slate-100/80 text-slate-600 px-2.5 py-0.5 rounded-full text-[11px]">23岁</span>
                                   <span className="bg-slate-100/80 text-slate-600 px-2.5 py-0.5 rounded-full text-[11px]">女</span>
                                </div>
                                <p className="opacity-80">在这里分享我的日常穿搭和好物，感谢关注~</p>
                             </div>
                           </div>
                           <div className="flex gap-2">
                              <button className="px-5 py-2 border border-slate-200 rounded-full text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">编辑资料</button>
                              <button className="px-5 py-2 bg-slate-900 rounded-full text-[13px] font-bold text-white hover:bg-slate-800 transition-colors shadow-sm">取消托管</button>
                           </div>
                         </div>
                         <div className="flex items-center gap-8 mt-2">
                           <div className="flex items-baseline gap-1.5 cursor-pointer hover:opacity-80 group">
                             <div className="text-[17px] font-extrabold text-slate-900">128</div>
                             <div className="text-[13px] text-slate-500 font-medium group-hover:text-slate-800 transition-colors">关注</div>
                           </div>
                           <div className="flex items-baseline gap-1.5 cursor-pointer hover:opacity-80 group">
                             <div className="text-[17px] font-extrabold text-slate-900">{detailAccount.followers.toLocaleString()}</div>
                             <div className="text-[13px] text-slate-500 font-medium group-hover:text-slate-800 transition-colors">粉丝</div>
                           </div>
                           <div className="flex items-baseline gap-1.5 cursor-pointer hover:opacity-80 group">
                             <div className="text-[17px] font-extrabold text-slate-900">{(detailAccount.followers * 3.4).toLocaleString()}</div>
                             <div className="text-[13px] text-slate-500 font-medium group-hover:text-slate-800 transition-colors">获赞与收藏</div>
                           </div>
                         </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Tabs */}
              <div className="px-8 border-b border-slate-200 flex gap-6 shrink-0 bg-white">
                 <button 
                   onClick={() => setDetailTab('notes')}
                   className={cn("pb-3 text-[14px] font-bold border-b-2 transition-colors flex items-center gap-1.5", detailTab === 'notes' ? "border-blue-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
                 >
                   <LayoutGrid className="w-4 h-4" /> 笔记 {detailAccount.notesCount > 0 && `(${detailAccount.notesCount})`}
                 </button>
                 <button 
                   onClick={() => setDetailTab('links')}
                   className={cn("pb-3 text-[14px] font-bold border-b-2 transition-colors flex items-center gap-1.5", detailTab === 'links' ? "border-blue-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
                 >
                   <LinkIcon className="w-4 h-4" /> 绑定的资产
                 </button>
                 <button 
                   onClick={() => setDetailTab('env')}
                   className={cn("pb-3 text-[14px] font-bold border-b-2 transition-colors flex items-center gap-1.5", detailTab === 'env' ? "border-blue-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700")}
                 >
                   <ShieldCheck className="w-4 h-4" /> 设备及网络环境
                 </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 p-6 relative">
                 {/* Notes Tab */}
                 {detailTab === 'notes' && (
                   <div className="columns-2 gap-4 space-y-4 pb-8 max-w-5xl mx-auto">
                     {MOCK_NOTES.map((note, idx) => (
                        <div key={note.id} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100/50 cursor-pointer group flex flex-col">
                           <div className="relative overflow-hidden bg-slate-100">
                             <img src={note.cover} alt={note.title} className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" loading="lazy" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                             {/* Optional Video Icon Mock */}
                             {idx % 4 === 0 && (
                                <div className="absolute top-3 right-3 w-7 h-7 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                                  <PlayCircle className="w-4 h-4" />
                                </div>
                             )}
                           </div>
                           <div className="p-4 flex flex-col flex-1">
                              <h4 className="text-[14px] font-bold text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-indigo-600 transition-colors">{note.title}</h4>
                              <div className="flex items-center justify-between mt-auto">
                                 <div className="flex items-center gap-2">
                                    <img src={detailAccount.avatar} className="w-[18px] h-[18px] rounded-full object-cover border border-slate-200/50 shadow-sm" alt="author" />
                                    <span className="text-[11px] text-slate-500 truncate max-w-[80px] font-medium">{detailAccount.name}</span>
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-bold group-hover:text-rose-500 transition-colors">
                                   <Heart className="w-3.5 h-3.5 group-hover:fill-rose-500 transition-all" /> {note.likes}
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                   </div>
                 )}

                 {/* Links Tab */}
                 {detailTab === 'links' && (
                   <div className="space-y-4 max-w-2xl mx-auto">
                     <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="text-[13px] font-bold text-blue-900 mb-1">外链流量监控中</h4>
                           <p className="text-[12px] text-blue-700 leading-relaxed">系统会自动拦截小红书中的敏感推广词，并将用户引流至以下挂载的安全跳转链接中。</p>
                        </div>
                     </div>
                     <div className="grid gap-3">
                       {MOCK_LINKS.map((link, idx) => (
                         <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-slate-300 transition-colors">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                 <LinkIcon className="w-5 h-5" />
                               </div>
                               <div>
                                 <h4 className="font-bold text-[14px] text-slate-800">{link.title}</h4>
                                 <div className="text-[12px] text-slate-500 font-mono mt-0.5 flex items-center gap-1 cursor-pointer hover:text-blue-600">
                                   {link.url} <ExternalLink className="w-3 h-3" />
                                 </div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-xl font-bold text-slate-800">{link.clicks}</div>
                               <div className="text-[10px] uppercase text-slate-400 mt-0.5">累计点击</div>
                            </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Environment Tab */}
                 {detailTab === 'env' && (
                   <div className="space-y-6 max-w-2xl mx-auto">
                     {/* Metrics Grid */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                           <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-2">物理环境坑位 (设备ID)</div>
                           <div className="font-mono text-sm text-slate-800 font-bold flex items-center gap-2">
                             <HardDrive className="w-5 h-5 text-blue-500 shrink-0" /> {detailAccount.slot}
                           </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                           <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-2">账号运行评级</div>
                           <div className="font-mono text-sm font-bold flex items-center gap-2">
                              <span className={cn("w-3 h-3 rounded-full shadow-inner", detailAccount.status === '正常' ? "bg-emerald-500" : detailAccount.status === '风控限流' ? "bg-amber-500" : "bg-rose-500")}></span>
                              <span className={detailAccount.status === '正常' ? "text-emerald-700" : detailAccount.status === '风控限流' ? "text-amber-700" : "text-rose-700"}>{detailAccount.status}</span>
                           </div>
                        </div>
                     </div>

                     {/* Network IPs */}
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-5">
                        <h4 className="text-[13px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Network className="w-4 h-4 text-slate-500" /> 网络与IP指纹
                        </h4>
                        <div className="mb-4 flex items-start justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                           <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-emerald-800 text-[15px] font-mono font-bold">
                                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                                {detailAccount.currentIp}
                              </div>
                              <div className="text-[12px] text-emerald-600 font-medium ml-4.5">
                                正在记录中 (最近活跃: {detailAccount.lastActive})
                              </div>
                           </div>
                           <div className="text-[12px] text-emerald-700 font-bold bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md">
                              {detailAccount.ipLocation}机房
                           </div>
                        </div>
                        <div className="text-[12px] text-slate-500 font-bold uppercase tracking-wider mb-2">历史记录 (近3次变动)</div>
                        <div className="space-y-2">
                           {detailAccount.historicalIps.map((ipStr, idx) => (
                             <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-600 text-[13px] font-mono">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {ipStr}
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* Data snapshots */}
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-5">
                        <h4 className="text-[13px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Save className="w-4 h-4 text-slate-500" /> 号档隔离快照
                        </h4>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                              <div>
                                <div className="text-[14px] font-bold text-slate-800">最新备份版本包</div>
                                <div className="text-[12px] font-mono text-slate-500 mt-1">{detailAccount.backupTime}</div>
                              </div>
                              <button className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[13px] font-bold hover:bg-blue-100 transition-colors">
                                 更新快照
                              </button>
                           </div>
                           <div className="flex items-center justify-between">
                              <div>
                                <div className="text-[14px] font-bold text-slate-800">最近系统回滚/恢复</div>
                                <div className="text-[12px] font-mono text-slate-500 mt-1">{detailAccount.restoreTime}</div>
                              </div>
                              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-[13px] font-bold hover:bg-slate-50 transition-colors">
                                 回滚至最新快照
                              </button>
                           </div>
                        </div>
                     </div>

                   </div>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
