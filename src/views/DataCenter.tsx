import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle, 
  MapPin, Clock, Download, Filter, Target, Activity, CheckCircle2,
  AlertTriangle, Flame
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

// --- Mock Data ---
const performanceData = [
  { name: '10-01', views: 4000, likes: 2400, newFans: 240 },
  { name: '10-02', views: 3000, likes: 1398, newFans: 2210 },
  { name: '10-03', views: 2000, likes: 9800, newFans: 2290 },
  { name: '10-04', views: 2780, likes: 3908, newFans: 2000 },
  { name: '10-05', views: 1890, likes: 4800, newFans: 2181 },
  { name: '10-06', views: 2390, likes: 3800, newFans: 2500 },
  { name: '10-07', views: 3490, likes: 4300, newFans: 2100 },
];

const groupPerformanceData = [
  { name: '美妆矩阵', pv: 8500, fans: 4300 },
  { name: '穿搭矩阵', pv: 7200, fans: 3100 },
  { name: '本地探店', pv: 5400, fans: 2800 },
  { name: '数码潮物', pv: 3200, fans: 1500 },
  { name: '个人成长', pv: 2800, fans: 1100 }
];

const accountHealthData = [
  { name: '正常运行', value: 1248, color: '#10b981' },
  { name: '风控限流', value: 87, color: '#f59e0b' },
  { name: '异常封禁', value: 15, color: '#ef4444' },
];

const HIGHLIGHTS = [
  { label: '昨日新增粉丝', value: '+12,450', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '昨日矩阵总曝光', value: '458.2w', trend: 'up', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: '图文总互动赞藏', value: '185.3w', trend: 'down', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
  { label: '账户存活率 (实时)', value: '96.2%', trend: 'up', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function DataCenter() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="bg-slate-50 min-h-full space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-800" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">矩阵数据中心</h1>
         </div>
         <div className="flex gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-slate-200 text-sm font-bold text-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            >
              <option value="today">今日实时</option>
              <option value="yesterday">昨日</option>
              <option value="7d">最近 7 天</option>
              <option value="30d">最近 30 天</option>
            </select>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow-sm">
               <Download className="w-4 h-4" /> 导出分析报告
            </button>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HIGHLIGHTS.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 transition-transform group-hover:scale-150 blur-2xl", item.bg)}></div>
            <div className="flex justify-between items-start z-10">
               <div>
                 <div className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{item.label}</div>
                 <div className="text-3xl font-bold text-slate-900 leading-none tracking-tight">{item.value}</div>
               </div>
               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", item.bg)}>
                 <item.icon className={cn("w-5 h-5", item.color)} />
               </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 z-10 text-[12px] font-bold">
               {item.trend === 'up' ? (
                 <span className="text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded">
                   <TrendingUp className="w-3.5 h-3.5 mr-1" /> 相较上期 +12.5%
                 </span>
               ) : (
                 <span className="text-rose-500 flex items-center bg-rose-50 px-1.5 py-0.5 border border-rose-100 rounded">
                   <TrendingUp className="w-3.5 h-3.5 mr-1 transform rotate-180" /> 相较上期 -3.2%
                 </span>
               )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart : Growth Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
               <Activity className="w-4 h-4 text-blue-600" /> 增长与曝光趋势
             </h3>
             <div className="flex gap-2">
                <span className="flex items-center text-[10px] uppercase font-bold tracking-widest text-slate-500"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>小红书曝光</span>
                <span className="flex items-center text-[10px] uppercase font-bold tracking-widest text-slate-500"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>粉丝增长</span>
             </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="newFans" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
               <Target className="w-4 h-4 text-rose-500" /> 账号矩阵健康度
             </h3>
          </div>
          <div className="flex-1 min-h-[220px] flex items-center justify-center relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={accountHealthData}
                   innerRadius={65}
                   outerRadius={90}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {accountHealthData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
               <span className="text-3xl font-bold text-slate-800 mt-2">1,350</span>
               <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">总号档</span>
             </div>
          </div>
          
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
             {accountHealthData.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center text-[12px] font-bold">
                 <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                 </div>
                 <div className="text-slate-800">{item.value} <span className="text-slate-400 font-normal ml-1">({((item.value / 1350) * 100).toFixed(1)}%)</span></div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
         {/* Group Performance */}
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
                 <Flame className="w-4 h-4 text-orange-500" /> 分组矩阵产出贡献
               </h3>
               <button className="text-xs text-blue-600 font-bold hover:underline">查看名细</button>
            </div>
            <div className="flex-1 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={groupPerformanceData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                   <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#334155', fontWeight: 'bold' }} width={80} />
                   <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                   <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                   <Bar dataKey="pv" name="曝光贡献 (W)" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={12} />
                   <Bar dataKey="fans" name="涨粉贡献" fill="#34d399" radius={[0, 4, 4, 0]} barSize={12} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Hot Topics / Trends (Placeholder) */}
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-slate-800 flex items-center gap-2 mb-6">
              <MessageCircle className="w-4 h-4 text-indigo-500" /> 近期高频热门标签 (舆情提取)
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
               <span className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-sm font-bold shadow-sm"># 秋季OOTD <span className="opacity-50 ml-1 text-xs font-normal">45% 涨幅</span></span>
               <span className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-sm font-bold shadow-sm"># 干敏皮精简护肤 <span className="opacity-50 ml-1 text-xs font-normal">HOT</span></span>
               <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-sm font-bold shadow-sm"># 小众氛围感餐厅</span>
               <span className="px-3 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-sm font-bold shadow-sm"># iPhone16评测</span>
               <span className="px-3 py-1.5 bg-purple-50 text-purple-600 border border-purple-100 rounded-lg text-sm font-bold shadow-sm"># 职场生存指南</span>
            </div>

            <div className="border-t border-slate-100 pt-5">
               <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3">高互动话题建议 (基于大模型分析)</h4>
               <ul className="space-y-3">
                 <li className="flex gap-3 items-start border-l-2 border-rose-400 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-bold text-slate-800 leading-tight mb-1">【换季护肤】存在流量红利</p>
                     <p className="text-[12px] text-slate-500 leading-relaxed">系统检测到近期美妆对标库中「换季、干敏、急救」等关键词图文完播和收藏率环比上升 24%，建议加大该类草稿生成及分发。</p>
                   </div>
                 </li>
                 <li className="flex gap-3 items-start border-l-2 border-blue-400 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-bold text-slate-800 leading-tight mb-1">优化【本地探店】发布时段</p>
                     <p className="text-[12px] text-slate-500 leading-relaxed">分析发现周四/周五晚 18:00 发布同城种草图文，转化率比平时高出 3.5 倍。</p>
                   </div>
                 </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
