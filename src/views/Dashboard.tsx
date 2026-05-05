import { Activity, AlertTriangle, MonitorPlay, Smartphone, UserPlus, Send, MessageSquare, HeartHandshake, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const METRICS = [
  { title: "在营账号", value: "1,248", total: "/ 1,500", trend: "+12", status: "success", icon: Smartphone },
  { title: "活跃设备", value: "3,842", total: "", trend: "+124", status: "success", icon: Activity },
  { title: "运行任务", value: "156", total: "", trend: "-12", status: "neutral", icon: MonitorPlay },
  { title: "高风险账号", value: "45", total: "", trend: "+5", status: "danger", icon: AlertTriangle },
];

const QUICK_LINKS = [
  { name: '设备风控', path: '/streaming', icon: MonitorPlay, color: 'text-blue-600', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/30' },
  { name: '私信回复', path: '/messages', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/30' },
  { name: '智能创作', path: '/editor', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/30' },
  { name: '批量注册', path: '/register', icon: UserPlus, color: 'text-sky-600', bg: 'bg-sky-500/10', border: 'hover:border-sky-500/30' },
  { name: '批量发布', path: '/publish', icon: Send, color: 'text-violet-600', bg: 'bg-violet-500/10', border: 'hover:border-violet-500/30' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function DashboardDelivery() {
  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <motion.div variants={itemVariants} key={idx} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col relative overflow-hidden group hover:border-slate-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 rounded-xl bg-white text-slate-600 border border-slate-200 group-hover:text-slate-800 transition-colors">
                <metric.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[11px] font-bold px-2 py-1 rounded-md border",
                metric.status === 'success' && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                metric.status === 'danger' && "bg-rose-500/10 text-rose-600 border-rose-500/20",
                metric.status === 'neutral' && "bg-slate-50 text-slate-600 border-slate-200"
              )}>
                {metric.trend} 今日
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{metric.title}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{metric.value}</span>
                {metric.total && <span className="ml-1 text-slate-500 text-sm font-medium">{metric.total}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Links & Priority */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wide">核心快捷入口</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {QUICK_LINKS.map((link, idx) => (
                <Link key={idx} to={link.path} className={cn("flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white/50 hover:bg-white transition-all group", link.border)}>
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110", link.bg, link.color)}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800">{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Running Tasks Chart Mockup */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-6 min-h-[300px] flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
               <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">趋势</h2>
               <select className="text-xs bg-white border-slate-200 border rounded-lg px-3 py-2 text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none">
                 <option>实时并发</option>
                 <option>活跃设备</option>
                 <option>新增笔记</option>
               </select>
            </div>
            <div className="flex-1 flex items-end relative z-10">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 pb-6 pointer-events-none">
                 <div className="border-b border-slate-200 w-full flex-1 border-dashed"></div>
                 <div className="border-b border-slate-200 w-full flex-1 border-dashed"></div>
                 <div className="border-b border-slate-200 w-full flex-1 border-dashed"></div>
                 <div className="w-full flex-1"></div>
               </div>
               
               <div className="w-full flex items-end justify-between px-2 h-40 space-x-2 relative z-20">
                 {[40, 25, 60, 45, 80, 55, 90, 75, 110, 85, 130, 100].map((h, i) => (
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: (h/130)*100 + '%' }}
                     transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                     key={i} 
                     className="w-full relative h-full flex flex-col justify-end group/bar"
                   >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-800 border border-slate-300 text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-30">
                       {h} 增量
                     </div>
                     <div className="bg-blue-500/20 hover:bg-blue-500/40 w-full rounded-sm transition-colors border-t border-blue-400 group-hover/bar:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0)] group-hover/bar:shadow-[0_0_15px_rgba(59,130,246,0.3)] h-full relative overflow-hidden">
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-600/20 to-transparent" style={{ height: '100%' }}></div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
            <div className="w-full flex justify-between px-2 pt-4 text-[10px] uppercase tracking-wider text-slate-500 mt-2 border-t border-slate-200">
               <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Priorities & Records */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-[610px]">
            <h2 className="text-sm font-bold text-slate-900 mb-5 flex items-center uppercase tracking-wide">
              <span className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
              今日优先事项
            </h2>
            
            <div className="space-y-3 mb-8">
              {[
                { title: "跨区节点掉线警报", desc: "US-West-2 节点 12 台设备心跳停止", time: "10 分钟前", type: "error" },
                { title: "45 个账号被标记高风险", desc: "建议立即暂停这批账号", time: "1 小时前", type: "warning" },
                { title: "18 个账号私信风控限流", desc: "触发平台短时发送频率限制", time: "2 小时前", type: "warning" },
              ].map((item, i) => (
                <div key={i} className="flex p-4 bg-white/50 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-2 mr-4 flex-shrink-0",
                    item.type === 'error' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  )} />
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">{item.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-3 font-mono">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-sm font-bold text-slate-900 mb-4 mt-auto uppercase tracking-wide">系统操作记录</h2>
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent flex-1 overflow-auto custom-scrollbar pr-2">
               {[
                { action: "批量发布完成", target: "任务组 #892", user: "Admin", time: "10:42", status: 'success' },
                { action: "系统全量备份", target: "节点_SH", user: "System", time: "09:00", status: 'info' },
                { action: "新增代理IP", target: "JP_Tokyo", user: "Admin", time: "08:15", status: 'info' },
                { action: "账号资料同步", target: "A组", user: "System", time: "07:30", status: 'success' },
                { action: "设备注册流水", target: "并发: 20", user: "System", time: "02:00", status: 'info' }
               ].map((log, i) => (
                 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-3">
                   {/* Marker */}
                   <div className="flex items-center justify-center w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-500 z-10 mx-3 shrink-0 transition-colors shadow-[0_0_0_4px_#ffffff]"></div>
                   
                   <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg bg-white border border-slate-200 group-hover:border-slate-300 transition-colors">
                     <div className="flex items-center justify-between mb-1">
                       <span className="font-medium text-xs text-slate-800">{log.action}</span>
                       <span className="text-[10px] font-mono text-slate-500">{log.time}</span>
                     </div>
                     <div className="text-[11px] text-slate-500">{log.target}</div>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
