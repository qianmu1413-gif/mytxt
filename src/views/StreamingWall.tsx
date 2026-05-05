import { useState, useMemo } from 'react';
import { Search, Monitor, Play, Square, LayoutGrid, CheckSquare, Expand, RefreshCw, X, Power, Globe, UserCircle, Edit3, Heart, Target, Smartphone, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_DEVICES = Array.from({ length: 64 }).map((_, i) => {
  let status: 'running' | 'backup' | 'empty' = 'running';
  if (i % 7 === 3) status = 'backup';
  else if (i % 5 === 4) status = 'empty';

  return {
    id: `dev-${String(i+1).padStart(3, '0')}`,
    name: `xhs-reg-${String(i+1).padStart(2, '0')}`,
    status,
    ip: `192.168.2.${100 + i}`,
    account: i % 2 === 0 ? `xhs_user_${i}` : '未分配',
    backups: Math.floor(Math.random() * 15) + 1,
    screen: status === 'running' 
  };
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const LAYOUT_OPTIONS = [
  { id: 'layout-4', label: '4屏 (4x1)', cols: 4, rows: 1 },
  { id: 'layout-8', label: '8屏 (4x2)', cols: 4, rows: 2 },
  { id: 'layout-12', label: '12屏 (4x3)', cols: 4, rows: 3 },
  { id: 'layout-16', label: '16屏 (8x2)', cols: 8, rows: 2 },
  { id: 'layout-32', label: '32屏 (8x4)', cols: 8, rows: 4 },
];

export default function StreamingWall() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeDevice, setActiveDevice] = useState<typeof MOCK_DEVICES[0] | null>(null);
  const [layoutMode, setLayoutMode] = useState<string>('layout-8'); // Default to 8屏 (4x2)
  const [customCols, setCustomCols] = useState<number>(4);
  const [customRows, setCustomRows] = useState<number>(2);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentLayout = useMemo(() => {
    if (layoutMode === 'custom') {
      return { cols: Math.max(1, customCols), rows: Math.max(1, customRows) };
    }
    return LAYOUT_OPTIONS.find(o => o.id === layoutMode) || LAYOUT_OPTIONS[1];
  }, [layoutMode, customCols, customRows]);

  const pageSize = currentLayout.cols * currentLayout.rows;

  const toggleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === MOCK_DEVICES.length) setSelected([]);
    else setSelected(MOCK_DEVICES.map(d => d.id));
  };

  const filteredDevices = useMemo(() => {
    if (!searchTerm) return MOCK_DEVICES;
    const term = searchTerm.toLowerCase();
    return MOCK_DEVICES.filter(d => 
      d.id.toLowerCase().includes(term) || d.name.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const displayedDevices = useMemo(() => {
    return filteredDevices.slice(page * pageSize, (page + 1) * pageSize);
  }, [filteredDevices, page, pageSize]);

  const totalPages = Math.ceil(filteredDevices.length / pageSize);

  // Auto-fix page out of bounds when changing layouts or filtering
  useMemo(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalPages, page]);

  return (
    <div className="h-full flex flex-col p-4 bg-slate-50 text-slate-900 font-sans">
      {/* Top Controls */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mb-4 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto flex-wrap gap-y-2 sm:gap-y-0">
          <div className="relative flex-1 sm:w-56 group min-w-[200px]">
             <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
             <input 
               type="text" 
               placeholder="搜索设备 ID 或名称..." 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400" 
             />
          </div>
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
            <LayoutGrid className="w-4 h-4 ml-2 text-slate-500" />
            <select 
              value={layoutMode} 
              onChange={(e) => { setLayoutMode(e.target.value); setPage(0); }}
              className="bg-transparent text-slate-700 text-sm font-bold pl-1 pr-2 py-1 outline-none cursor-pointer [&>option]:bg-white"
            >
              {LAYOUT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
              <option value="custom">自定义 (Custom)</option>
            </select>
            {layoutMode === 'custom' && (
              <div className="flex items-center gap-1 pl-2 border-l border-slate-200 mr-2">
                <input type="number" min="1" max="10" value={customCols} onChange={e => setCustomCols(parseInt(e.target.value) || 1)} className="w-10 bg-white border border-slate-300 rounded-lg text-center text-sm py-0.5 focus:border-blue-500 focus:outline-none" title="列数 Columns" />
                <span className="text-slate-400 text-xs font-medium">x</span>
                <input type="number" min="1" max="10" value={customRows} onChange={e => setCustomRows(parseInt(e.target.value) || 1)} className="w-10 bg-white border border-slate-300 rounded-lg text-center text-sm py-0.5 focus:border-blue-500 focus:outline-none" title="行数 Rows" />
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
              <button 
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="上一页"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-600 px-2 min-w-[3rem] text-center">{page + 1} / {totalPages}</span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="下一页"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
           <button onClick={toggleAll} className="flex items-center px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm rounded-xl transition-all border border-slate-200 shadow-sm font-bold active:scale-95">
              <CheckSquare className={cn("w-4 h-4 mr-2", selected.length > 0 ? "text-blue-600" : "text-slate-400")} /> 
              {selected.length === MOCK_DEVICES.length ? '取消全选' : '全选'}
           </button>
           <div className="w-px h-6 bg-slate-200 mx-2"></div>
           <button className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)] active:scale-95">
              <Play className="w-4 h-4 mr-1.5 fill-current" /> 批量推流
           </button>
           <button className="flex items-center px-5 py-2.5 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-rose-600 text-sm font-bold rounded-xl transition-all shadow-sm active:scale-95">
              <Square className="w-4 h-4 mr-1.5 fill-current opacity-80" /> 停止
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 relative bg-slate-100 flex items-start overflow-y-auto rounded-xl border border-slate-200 shadow-inner p-4">
        <motion.div 
          className="grid w-full gap-4 pb-8 auto-rows-max"
          style={{ 
            gridTemplateColumns: `repeat(${currentLayout.cols}, minmax(0, 1fr))`,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={layoutMode + '-' + currentLayout.cols + '-' + currentLayout.rows + '-' + page} // Formats grid animation on change
        >
          {displayedDevices.map((device, index) => (
            <motion.div 
              variants={itemVariants}
              key={device.id} 
              className={cn(
                "relative flex flex-col bg-white rounded-xl overflow-hidden border transition-all shadow-sm",
                selected.includes(device.id) ? "border-blue-500 ring-1 ring-blue-500 z-10" : "border-slate-200 hover:border-slate-300 hover:shadow-md z-0"
              )}
            >
              {/* Top Bar */}
              <div className="flex px-3 py-2.5 items-center justify-between border-b border-slate-100 bg-white shrink-0">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div 
                    className="relative flex items-center justify-center cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); toggleSelect(device.id); }}
                  >
                    <input 
                      type="checkbox" 
                      onChange={() => {}} // Controlled via parent onClick
                      checked={selected.includes(device.id)}
                      className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer pointer-events-none transition-colors"
                    />
                  </div>
                  <span className="text-indigo-600 font-bold text-[11px] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md leading-none">{(page * pageSize) + index + 1}</span>
                  {device.status !== 'empty' && (
                    <span className="text-sm font-bold text-slate-700 truncate leading-none tracking-tight" title={device.name}>
                      {device.name}
                    </span>
                  )}
                </div>
                
                {/* Status Badge */}
                {device.status === 'running' && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded-md text-emerald-600 bg-emerald-50 shrink-0 leading-none shadow-sm shadow-emerald-100/50">
                    已运行
                  </span>
                )}
                {device.status === 'backup' && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded-md text-amber-600 bg-amber-50 shrink-0 leading-none shadow-sm shadow-amber-100/50">
                    {device.backups} 备份
                  </span>
                )}
                {device.status === 'empty' && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded-md text-slate-500 bg-slate-100 shrink-0 leading-none">
                    空闲
                  </span>
                )}
              </div>

              {/* Screen Area Wrapper */}
              <div className="w-full bg-slate-50/50 p-3 pt-4 pb-3 flex flex-col items-center justify-center">
                <div 
                  className={cn(
                    "w-full relative flex flex-col items-center justify-center overflow-hidden rounded-[1rem] transition-all",
                    device.status === 'running' ? "shadow-[0_0_0_4px_#1e293b,0_4px_20px_rgba(0,0,0,0.1)]" : "shadow-[0_0_0_2px_#e2e8f0]",
                    device.status === 'empty' && "border-2 border-dashed border-slate-300 shadow-none bg-slate-100/50"
                  )} 
                  style={{ aspectRatio: '9/16' }}
                >
                  {device.status === 'running' ? (
                    <div className="w-full h-full relative cursor-pointer group/screen flex flex-col" onClick={() => setActiveDevice(device)}>
                       {/* Background Gradient */}
                       <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900"></div>
                       
                       {/* Status Bar */}
                       <div className="relative z-10 w-full px-4 py-3 flex justify-between items-center text-white/90 text-[10px] font-medium shrink-0">
                          <span>12:00</span>
                          {/* Notch Fake */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#1e293b] rounded-b-xl z-20"></div>
                          <div className="flex gap-1.5 items-center">
                             <span>5G</span>
                             <span className="w-3 h-2 rounded-[2px] bg-white/90"></span>
                          </div>
                       </div>

                       {/* Content Overlay Fake */}
                       <div className="relative z-10 flex-1 w-full px-3 flex flex-col items-center justify-center pt-8">
                         <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl flex items-center justify-center mb-4 group-hover/screen:scale-105 transition-transform duration-500">
                           <div className="w-7 h-7 border-2 border-white rounded-xl opacity-90"></div>
                         </div>
                         <div className="text-xs font-bold text-white tracking-wide shadow-sm">矩阵自动化正在运行</div>
                         <div className="mt-2 flex items-center gap-1.5 opacity-70 bg-black/20 px-3 py-1 rounded-full">
                           <UserCircle className="w-3.5 h-3.5 text-white" />
                           <span className="text-[10px] font-medium text-white tracking-wider">{device.account}</span>
                         </div>
                       </div>

                       {/* Dock */}
                       <div className="relative z-10 w-[85%] mx-auto mb-4 py-2 px-3 bg-white/10 backdrop-blur-xl rounded-3xl flex justify-between items-center border border-white/10 shadow-lg shrink-0">
                          <div className="w-6 h-6 rounded-xl bg-emerald-500 shadow-md flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-sm"></div></div>
                          <div className="w-6 h-6 rounded-xl bg-rose-500 shadow-md flex items-center justify-center"><div className="w-3 h-3 border-2 border-white rounded-full"></div></div>
                          <div className="w-6 h-6 rounded-xl bg-blue-500 shadow-md flex items-center justify-center"><div className="w-3 h-2 bg-white rounded-[2px]"></div></div>
                          <div className="w-6 h-6 rounded-xl bg-amber-500 shadow-md flex items-center justify-center"><div className="w-3 h-3 border-2 border-white rounded-sm"></div></div>
                       </div>
                       
                       {/* Hover Overlay */}
                       <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[2px] opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
                         <div className="bg-white text-indigo-600 rounded-full p-4 shadow-2xl transform scale-90 group-hover/screen:scale-100 transition-all duration-500">
                           <Expand className="w-5 h-5" />
                         </div>
                       </div>
                    </div>
                  ) : device.status === 'backup' ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-100 w-full relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-slate-200/50 flex items-center justify-center mb-3">
                          <Monitor className="w-5 h-5 text-slate-400" />
                        </div>
                        <span className="text-sm font-bold text-slate-600 mb-1">已关机</span>
                        <span className="text-[11px] font-medium text-indigo-500 cursor-pointer hover:text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2 transition-colors">点击切换备份</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 w-full">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-3">
                        <span className="text-slate-300 flex items-center justify-center">+</span>
                      </div>
                      <span className="text-[11px] font-medium tracking-wide text-slate-500">空闲坑位</span>
                      <span className="text-[10px] font-mono mt-2 bg-white border border-slate-200 shadow-sm px-2 py-0.5 rounded text-slate-400">{device.ip}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeDevice && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDevice(null)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '20px', opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '20px', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-10 lg:inset-x-20 xl:inset-x-32 2xl:inset-x-64 bg-white rounded-[2rem] border border-slate-200 z-50 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-white text-slate-800 shadow-sm shrink-0">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    {activeDevice.name}
                  </h2>
                  <div className="text-sm text-slate-500 mt-1 font-mono flex items-center gap-3">
                    <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-bold text-slate-600"><Globe className="w-3.5 h-3.5"/> IPv4: {activeDevice.ip}</span>
                    <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-bold text-slate-600"><Target className="w-3.5 h-3.5"/> ID: {activeDevice.id}</span>
                  </div>
                </div>
                <button onClick={() => setActiveDevice(null)} className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full transition-colors font-bold group border border-slate-200 shadow-sm">
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-10 bg-slate-50/50">
                 {/* Left: Live Preview Extremely Large */}
                 <div className="w-full md:w-1/2 lg:w-5/12 h-full flex flex-col min-h-0 bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center">
                         <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse mr-2.5 shadow-[0_0_8px_#f43f5e]"></div>
                         实时操作监视
                      </h3>
                      <div className="text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-bold">60 FPS / 24ms</div>
                    </div>
                    
                    <div 
                      className="flex-1 rounded-[2rem] relative shadow-inner overflow-hidden group min-h-0 flex items-center justify-center bg-slate-950 border-[8px] border-slate-900"
                      style={{ containerType: 'size' }}
                    >
                      <div 
                        className="bg-slate-900 relative overflow-hidden flex flex-col"
                        style={{
                          width: '100cqw',
                          height: '100cqh',
                          maxWidth: 'calc(100cqh * 9 / 16)',
                          maxHeight: 'calc(100cqw * 16 / 9)'
                        }}
                      >
                      {activeDevice.screen ? (
                        <div className="w-full h-full bg-slate-50 flex flex-col relative overflow-hidden">
                           {/* Status Bar */}
                           <div className="h-6 w-full flex justify-between items-center px-4 text-[10px] sm:text-xs text-slate-800 absolute top-0 z-10 bg-gradient-to-b from-white/90 to-white/20 pt-1 font-medium">
                             <span>12:00</span>
                             <span className="flex gap-1 items-center">5G <div className="w-3 sm:w-4 h-1.5 sm:h-2 bg-slate-800 rounded-sm"></div></span>
                           </div>
                           
                           {/* App Top Bar */}
                           <div className="h-16 w-full flex items-end justify-between px-4 pb-2 bg-white z-0 shrink-0 border-b border-rose-100 pt-6 shadow-sm">
                              <div className="flex gap-4 items-center">
                                 <div className="w-8 h-3 bg-slate-200 rounded-full"></div>
                                 <div className="w-8 h-3 bg-rose-500 rounded-full relative">
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-rose-500 rounded-full"></div>
                                 </div>
                                 <div className="w-8 h-3 bg-slate-200 rounded-full"></div>
                              </div>
                              <Search className="w-5 h-5 text-slate-400 stroke-[2.5]" />
                           </div>

                           {/* App Content */}
                           <div className="flex-1 p-2 flex gap-2 bg-slate-100 overflow-hidden">
                              <div className="flex-1 flex flex-col gap-2">
                                 <div className="w-full h-[60%] bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative group/post cursor-pointer">
                                   <div className="absolute inset-0 bg-slate-200 group-hover/post:opacity-90 transition-opacity"></div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                   <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                                     <div className="w-3/4 h-3 bg-white border border-white/20 shadow-sm rounded-full"></div>
                                     <div className="w-1/2 h-3 bg-white/70 border border-white/10 shadow-sm rounded-full mt-1"></div>
                                   </div>
                                 </div>
                                 <div className="w-full flex-1 bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative group/post cursor-pointer">
                                   <div className="absolute inset-0 bg-slate-200 group-hover/post:opacity-90 transition-opacity"></div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                   <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                                     <div className="w-2/3 h-3 bg-white border border-white/20 shadow-sm rounded-full"></div>
                                   </div>
                                 </div>
                              </div>
                              <div className="flex-1 flex flex-col gap-2">
                                 <div className="w-full h-[40%] bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative group/post cursor-pointer">
                                   <div className="absolute inset-0 bg-slate-200 group-hover/post:opacity-90 transition-opacity"></div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                   <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                                     <div className="w-2/3 h-3 bg-white border border-white/20 shadow-sm rounded-full"></div>
                                   </div>
                                 </div>
                                 <div className="w-full flex-1 bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative group/post cursor-pointer">
                                   <div className="absolute inset-0 bg-slate-200 group-hover/post:opacity-90 transition-opacity"></div>
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                   <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                                     <div className="w-4/5 h-3 bg-white border border-white/20 shadow-sm rounded-full"></div>
                                     <div className="w-1/2 h-3 bg-white/70 border border-white/10 shadow-sm rounded-full mt-1"></div>
                                   </div>
                                 </div>
                              </div>
                           </div>

                           {/* Bottom Tab Bar */}
                           <div className="h-[60px] w-full border-t border-slate-200 bg-white flex justify-around items-center shrink-0 px-2">
                             <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                               <div className="w-5 h-5 rounded-full bg-slate-800"></div>
                               <div className="w-6 h-1 bg-slate-800 rounded-full"></div>
                             </div>
                             <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                               <div className="w-5 h-5 rounded-full bg-slate-400"></div>
                               <div className="w-6 h-1 bg-slate-400 rounded-full"></div>
                             </div>
                             <div className="w-12 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-rose-500/20 active:scale-95 transition-transform cursor-pointer pb-1">+</div>
                             <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                               <div className="w-5 h-5 rounded-full bg-slate-400"></div>
                               <div className="w-6 h-1 bg-slate-400 rounded-full"></div>
                             </div>
                             <div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                               <div className="w-5 h-5 rounded-full bg-slate-400"></div>
                               <div className="w-6 h-1 bg-slate-400 rounded-full"></div>
                             </div>
                           </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-600 w-full h-full bg-slate-900">
                          <Monitor className="w-12 h-12 mb-4 opacity-50" />
                          <span className="text-sm tracking-widest uppercase font-bold">No Signal</span>
                        </div>
                      )}
                      </div>
                      
                      {/* Interaction Area Layer */}
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="flex gap-4">
                           <button className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transform active:scale-95 duration-200">
                             <Expand className="w-5 h-5 mr-2" /> 全屏操作
                           </button>
                         </div>
                      </div>
                    </div>
                 </div>
                 
                 {/* Right: Details & Operations */}
                 <div className="flex-1 flex flex-col space-y-6">
                   {/* Phone Controls */}
                   <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2"><Settings className="w-4 h-4 text-slate-400"/> 设备基础控制</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2.5 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-[15px] font-bold text-slate-700 transition-all shadow-sm group">
                           <Power className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" /> 安全重启
                        </button>
                        <button className="flex items-center justify-center gap-2.5 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-[15px] font-bold text-slate-700 transition-all shadow-sm group">
                           <Globe className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" /> 动态IP轮换
                        </button>
                        <button className="flex items-center justify-center gap-2.5 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-[15px] font-bold text-slate-700 transition-all shadow-sm group">
                           <Edit3 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" /> 软改机型
                        </button>
                        <button className="flex items-center justify-center gap-2.5 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white text-[15px] font-bold text-slate-700 transition-all shadow-sm group">
                           <RefreshCw className="w-5 h-5 text-amber-500 group-hover:rotate-180 transition-transform duration-500" /> 应用强刷清理
                        </button>
                      </div>
                   </div>

                   {/* Account Operations */}
                   <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center justify-between">
                         <span className="flex items-center gap-2"><UserCircle className="w-4 h-4 text-slate-400"/> 当前挂载账号资源</span>
                         <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md border border-emerald-200 font-bold shadow-sm">● 环境安全</span>
                      </h3>
                      
                      <div className="flex items-center gap-5 p-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl border border-slate-200 mb-6 cursor-pointer">
                         <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                           <UserCircle className="w-10 h-10 text-slate-300" />
                         </div>
                         <div className="flex-1">
                           <div className="text-lg font-black text-slate-800 tracking-wide">{activeDevice.account}</div>
                           <div className="text-xs text-slate-600 mt-1.5 font-bold bg-white inline-flex items-center px-2 py-0.5 rounded border border-slate-200 shadow-sm">策略组: 小红书种草矩阵</div>
                         </div>
                         <button className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl hover:border-slate-400 hover:text-slate-900 text-sm font-bold transition-all shadow-sm hover:shadow active:scale-95">快速脱更</button>
                      </div>

                      <div className="space-y-4 flex-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">业务流自动化指令</h4>
                        <div className="grid grid-cols-2 gap-4 h-full">
                          <button className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-200 text-indigo-700 transition-all gap-3 shadow-sm group active:scale-95">
                            <Heart className="w-8 h-8 group-hover:scale-110 transition-transform fill-indigo-100" />
                            <span className="text-[15px] font-black">极速养号 (模拟)</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-purple-100 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-200 text-purple-700 transition-all gap-3 shadow-sm group active:scale-95">
                            <Target className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            <span className="text-[15px] font-black">执行最新发布计划</span>
                          </button>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
