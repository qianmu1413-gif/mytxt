import React, { useState } from 'react';
import { 
  Play, Pause, RefreshCw, X, Search, Filter, AlertCircle, 
  CheckCircle2, Clock, Terminal, ChevronRight, Server, Zap, HardDrive, Cpu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const TASKS = [
  {
    id: 'TSK-9482',
    name: '美妆矩阵-晚间爆款图文分发',
    type: '批量发布',
    status: 'running',
    progress: 68,
    total: 120,
    completed: 82,
    failed: 1,
    timeElapsed: '12m 45s',
    estimatedTime: '6m 20s',
    logs: [
      { time: '12:05:00', msg: '启动批量发布任务队列', type: 'info' },
      { time: '12:05:15', msg: '账号 [种草小能手] 登录验证成功', type: 'success' },
      { time: '12:06:30', msg: '账号 [风控警报03] IP异常，自动跳过', type: 'error' }
    ]
  },
  {
    id: 'TSK-9481',
    name: '穿搭组-高权重矩阵养号（深度）',
    type: '自动养号',
    status: 'running',
    progress: 35,
    total: 300,
    completed: 105,
    failed: 4,
    timeElapsed: '45m 12s',
    estimatedTime: '1h 25m',
    logs: [
      { time: '11:20:00', msg: '正在执行深度养号（搜关键词、点赞、浏览）', type: 'info' }
    ]
  },
  {
    id: 'TSK-9479',
    name: '节点环境初始化及账号注册',
    type: '批量建号',
    status: 'completed',
    progress: 100,
    total: 50,
    completed: 50,
    failed: 0,
    timeElapsed: '2h 14m',
    estimatedTime: '-',
    logs: [
      { time: '08:00:00', msg: '任务执行完毕，共成功注册 50 个账号', type: 'success' }
    ]
  },
  {
    id: 'TSK-9478',
    name: '全量号档及环境快照备份',
    type: '数据备份',
    status: 'failed',
    progress: 95,
    total: 1500,
    completed: 1420,
    failed: 80,
    timeElapsed: '1h 5m',
    estimatedTime: '-',
    logs: [
      { time: '04:15:30', msg: '存储空间告警，部分快照保存失败', type: 'error' }
    ]
  }
];

export default function TaskCenter() {
  const [activeTask, setActiveTask] = useState(TASKS[0]);
  const [filter, setFilter] = useState('all');

  const filteredTasks = TASKS.filter(t => filter === 'all' ? true : t.status === filter);

  return (
    <div className="bg-slate-50 min-h-full">
      <div className="bg-white rounded-2xl border border-slate-200 h-[calc(100vh-8rem)] flex overflow-hidden shadow-sm relative">
        <div className="w-[400px] border-r border-slate-200 flex flex-col bg-white z-10 shrink-0">
          <div className="p-4 border-b border-slate-200 shrink-0">
            <h2 className="text-[15px] font-bold text-slate-800 mb-3">集群任务监控队列</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="搜索任务ID/名称..." 
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select className="border border-slate-200 bg-slate-50 rounded-lg px-2 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="all">所有状态</option>
                <option value="running">运行中</option>
                <option value="completed">已完成</option>
                <option value="failed">异常/失败</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => setActiveTask(task)}
                className={cn(
                  "p-3 rounded-xl border border-slate-200 cursor-pointer transition-all hover:border-blue-300 relative overflow-hidden group",
                  activeTask.id === task.id ? "bg-blue-50/50 border-blue-400 shadow-sm" : "bg-white hover:bg-slate-50"
                )}
              >
                {activeTask.id === task.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{task.id}</span>
                    <span className="text-[11px] font-bold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded">{task.type}</span>
                  </div>
                  {task.status === 'running' && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                  {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {task.status === 'failed' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                </div>
                <h3 className="text-[13px] font-bold text-slate-800 leading-tight mb-2 truncate">{task.name}</h3>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>进度: {task.completed}/{task.total}</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden border border-slate-200/50">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-500", task.status === 'running' ? 'bg-blue-500' : task.status === 'completed' ? 'bg-emerald-500' : 'bg-rose-500')} 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Detail Panel */}
        <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative">
          {activeTask ? (
            <>
              {/* Header Info */}
              <div className="px-8 py-6 bg-white border-b border-slate-200 shrink-0">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <div className="flex items-center gap-3">
                         <span className="text-[13px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">{activeTask.id}</span>
                         <span className="text-[13px] font-bold text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 bg-white">{activeTask.type}</span>
                       </div>
                       <h1 className="text-xl font-bold text-slate-900 mt-2">{activeTask.name}</h1>
                    </div>
                    <div className="flex gap-2">
                       {activeTask.status === 'running' && (
                         <button className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-sm font-bold rounded-lg transition-colors">
                            <Pause className="w-4 h-4" /> 终止任务
                         </button>
                       )}
                       {activeTask.status === 'failed' && (
                         <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-sm font-bold rounded-lg transition-colors">
                            <RefreshCw className="w-4 h-4" /> 重试失败项
                         </button>
                       )}
                    </div>
                 </div>

                 <div className="grid grid-cols-4 gap-4 mt-8">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                       <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">执行状态</div>
                       <div className="text-[15px] font-bold flex items-center gap-1.5">
                         {activeTask.status === 'running' ? <span className="text-blue-600">正在运行</span> :
                          activeTask.status === 'completed' ? <span className="text-emerald-600">全部完成</span> :
                          <span className="text-rose-600">异常/部分失败</span>}
                       </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                       <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">总设备/账号</div>
                       <div className="text-[15px] font-bold text-slate-800">{activeTask.total.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                       <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">已用时长</div>
                       <div className="text-[15px] font-bold text-slate-800 flex items-center gap-1.5">
                         <Clock className="w-4 h-4 text-slate-400" /> {activeTask.timeElapsed}
                       </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                       <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">成功 / 失败</div>
                       <div className="text-[15px] font-bold text-slate-800">
                         <span className="text-emerald-600">{activeTask.completed}</span> / <span className="text-rose-500">{activeTask.failed}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Progress & Live Terminal */}
              <div className="flex-1 flex overflow-hidden">
                 <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                    {/* Execution Progress */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                       <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                         <Zap className="w-4 h-4 text-amber-500" /> 执行分布图
                       </h3>
                       <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden flex border border-slate-200 shadow-inner">
                          {activeTask.completed > 0 && (
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(activeTask.completed / activeTask.total) * 100}%` }} 
                              className="h-full bg-emerald-500 relative flex items-center justify-center border-r border-black/10"
                            >
                              {(activeTask.completed / activeTask.total) > 0.1 && <span className="text-[10px] text-white font-bold tracking-widest">{activeTask.completed} 成功</span>}
                            </motion.div>
                          )}
                          {activeTask.failed > 0 && (
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(activeTask.failed / activeTask.total) * 100}%` }} 
                              className="h-full bg-rose-500 relative flex items-center justify-center"
                            >
                              <span className="text-[10px] text-white font-bold">{activeTask.failed}</span>
                            </motion.div>
                          )}
                       </div>
                    </div>

                    {/* Resources */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Server className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">分配执行节点群</div>
                            <div className="text-[15px] font-bold text-slate-800">12 组 / 480 线程</div>
                          </div>
                       </div>
                       <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">资源消耗评估</div>
                            <div className="text-[15px] font-bold text-slate-800">正常 (CPU 65% | 动态IP池)</div>
                          </div>
                       </div>
                    </div>

                    {/* Server Logs Simulator */}
                    <div className="bg-[#0f172a] rounded-2xl p-5 shadow-lg flex-1 flex flex-col font-mono relative overflow-hidden border border-slate-800">
                       <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 shrink-0">
                          <h3 className="text-white text-sm font-bold flex items-center gap-2">
                             <Terminal className="w-4 h-4 text-emerald-400" /> 集群实时输出 [STDOUT]
                          </h3>
                          <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded tracking-widest">
                             {activeTask.status === 'running' ? 'LIVE' : 'FINISHED'}
                          </span>
                       </div>
                       <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 text-[12px]">
                          {activeTask.logs.map((log, idx) => (
                             <div key={idx} className="flex items-start gap-3">
                                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                                <span className={cn(
                                   "flex-1", 
                                   log.type === 'success' ? 'text-emerald-400' : 
                                   log.type === 'error' ? 'text-rose-400' : 'text-slate-300'
                                )}>{log.msg}</span>
                             </div>
                          ))}
                          {activeTask.status === 'running' && (
                             <div className="flex items-start gap-3 animate-pulse text-slate-500">
                                <span className="shrink-0">[正在监听]</span>
                                <span className="flex-1">等待节点回传数据... _</span>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
               无选中任务
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
