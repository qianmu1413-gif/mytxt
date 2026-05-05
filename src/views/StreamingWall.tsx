import { useState, useMemo } from 'react';
import { Search, Monitor, Play, Square, LayoutGrid, CheckSquare, Expand, RefreshCw, X, Power, Globe, UserCircle, Edit3, Heart, Target, Smartphone, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_DEVICES = Array.from({ length: 32 }).map((_, i) => ({
  id: `dev-${String(i+1).padStart(3, '0')}`,
  name: `群控设备-${String(i+1).padStart(2, '0')}`,
  status: i % 4 === 0 ? 'idle' : 'streaming',
  ip: `192.168.1.${100 + i}`,
  account: i % 2 === 0 ? `xhs_user_${i}` : '未分配',
  screen: i % 4 !== 0 
}));

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
  { id: 'layout-4', label: '4屏 (2x2)', cols: 2, rows: 2 },
  { id: 'layout-6', label: '6屏 (3x2)', cols: 3, rows: 2 },
  { id: 'layout-8', label: '8屏 (4x2)', cols: 4, rows: 2 },
  { id: 'layout-14', label: '14屏 (7x2)', cols: 7, rows: 2 },
  { id: 'layout-32', label: '32屏 (8x4)', cols: 8, rows: 4 },
];

export default function StreamingWall() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeDevice, setActiveDevice] = useState<typeof MOCK_DEVICES[0] | null>(null);
  const [layoutMode, setLayoutMode] = useState<string>('layout-6'); // Default to 6屏
  const [customCols, setCustomCols] = useState<number>(3);
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
      <div className="flex-1 min-h-0 relative bg-slate-900 flex items-center justify-center rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        <motion.div 
          className="grid w-full h-full p-1"
          style={{ 
            gap: currentLayout.cols > 4 ? '4px' : '8px',
            gridTemplateColumns: `repeat(${currentLayout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${currentLayout.rows}, minmax(0, 1fr))`
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={layoutMode + '-' + currentLayout.cols + '-' + currentLayout.rows + '-' + page} // Formats grid animation on change
        >
          {displayedDevices.map(device => (
            <motion.div 
              variants={itemVariants}
              key={device.id} 
              className="relative group transition-all flex items-center justify-center bg-black rounded-lg overflow-hidden border border-slate-700/50"
              style={{ containerType: 'size' }}
            >
                <div 
                  className={cn(
                    "relative overflow-hidden transition-all duration-300 w-full h-full flex flex-col",
                    selected.includes(device.id) ? "ring-2 ring-blue-500 z-10" : "z-0"
                  )}
                >
                 {device.screen ? (
                    <div className="w-full h-full relative">
                       {/* Background color for mobile screen placeholder */}
                       <div className="absolute inset-0 bg-slate-50 flex flex-col">
                          {/* Top Bar Minimal */}
                          <div className="w-full h-[6%] min-h-[20px] flex items-end justify-between px-2 pb-1 bg-white z-10 shrink-0 border-b border-slate-200">
                             <div className="w-[30%] h-[40%] bg-slate-200 rounded-full"></div>
                             <div className="w-[15%] h-[40%] bg-slate-200 rounded-full"></div>
                          </div>
                          {/* App Content */}
                          <div className="flex-1 p-[2cqw] flex gap-[2cqw] bg-slate-100 overflow-hidden">
                             {/* Left Column */}
                             <div className="flex-1 flex flex-col gap-[2cqw]">
                                <div className="w-full h-[60%] bg-white rounded-md border border-slate-200/60 shadow-sm relative overflow-hidden">
                                </div>
                                <div className="w-full flex-1 bg-white rounded-md border border-slate-200/60 shadow-sm relative overflow-hidden">
                                </div>
                             </div>
                             {/* Right Column */}
                             <div className="flex-1 flex flex-col gap-[2cqw]">
                                <div className="w-full h-[45%] bg-white rounded-md border border-slate-200/60 shadow-sm relative overflow-hidden">
                                </div>
                                <div className="w-full flex-1 bg-white rounded-md border border-slate-200/60 shadow-sm relative overflow-hidden">
                                </div>
                             </div>
                          </div>
                          {/* Bottom Tab Bar Minimal */}
                          <div className="w-full h-[8%] min-h-[30px] border-t border-slate-200 bg-white flex justify-around items-center shrink-0">
                            <div className="w-[12%] aspect-square rounded-full bg-slate-800"></div>
                            <div className="w-[12%] aspect-square rounded-full bg-slate-200"></div>
                            <div className="w-[15%] aspect-[1.2] rounded-[4px] bg-rose-500 shadow-sm"></div>
                            <div className="w-[12%] aspect-square rounded-full bg-slate-200"></div>
                            <div className="w-[12%] aspect-square rounded-full bg-slate-200"></div>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
                       <Monitor className="w-[15cqw] h-[15cqw] text-slate-700/50 mb-[2cqw]" />
                       <span className="text-[5cqw] font-bold tracking-widest text-slate-600/80">No Signal</span>
                    </div>
                 )}

                 {/* Top Overlay: Device ID & Checkbox */}
                 <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-2 pb-6 flex justify-between items-start z-20 pointer-events-none">
                    <span className="text-[min(4cqw,12px)] leading-none text-white/95 font-mono bg-black/60 px-1.5 py-1 rounded-[4px] border border-white/20 backdrop-blur-md shadow-sm flex items-center gap-1.5 origin-top-left">
                       {device.status === 'streaming' && <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>}
                       {device.id}
                    </span>
                 </div>

                 {/* Checkbox (interactive) */}
                 <button 
                  onClick={(e) => { e.stopPropagation(); toggleSelect(device.id); }} 
                  className="absolute top-2 right-2 z-30 opacity-60 group-hover:opacity-100 transition-opacity"
                 >
                    <div className={cn(
                      "w-[min(6cqw,20px)] h-[min(6cqw,20px)] rounded-[3px] border flex items-center justify-center transition-colors shadow-sm",
                      selected.includes(device.id) ? "bg-blue-500 border-blue-500 text-white" : "bg-black/60 border-white/50 text-transparent hover:bg-black/80"
                    )}>
                      {selected.includes(device.id) && <CheckSquare className="w-3 h-3" strokeWidth={3} />}
                    </div>
                 </button>

                 {/* Bottom Overlay: Metadata */}
                 <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 pt-6 flex flex-col z-20 pointer-events-none border-t border-white/10">
                    <span className="text-[min(5cqw,14px)] leading-tight text-white font-bold truncate tracking-wide">{device.name}</span>
                    <span className="text-[min(4cqw,11px)] text-slate-300 truncate mt-0.5 flex items-center gap-1">
                      <UserCircle className="w-3 h-3" /> {device.account}
                    </span>
                 </div>

                 {/* Hover Action Zone */}
                 <div 
                   className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center cursor-pointer"
                   onClick={() => setActiveDevice(device)}
                 >
                    <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                       <Expand className="w-5 h-5" />
                    </button>
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
