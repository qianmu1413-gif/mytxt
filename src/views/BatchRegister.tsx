import { useState } from 'react';
import { Settings, Play, CheckCircle2, Settings2, Smartphone, Globe, Shield, Database, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function BatchRegister() {
  const [activeTab, setActiveTab] = useState<'config' | 'status'>('config');
  const [showSettings, setShowSettings] = useState(false);
  const [commentStrategy, setCommentStrategy] = useState<'none'|'simple'|'advanced'>('simple');
  const [targetType, setTargetType] = useState('feed');
  const [commentCount, setCommentCount] = useState(3);
  const [regMode, setRegMode] = useState('fixed');
  const [dailyLimit, setDailyLimit] = useState(5);
  const [profileMode, setProfileMode] = useState('auto');
  const [profileBio, setProfileBio] = useState('');
  const [nurtureEnabled, setNurtureEnabled] = useState(true);
  const [postNoteEnabled, setPostNoteEnabled] = useState(false);
  
  // Nurture Settings
  const [activeModuleWeight, setActiveModuleWeight] = useState('深度浏览 (80%) + 点赞 (20%)');
  const [stayDuration, setStayDuration] = useState('真实模拟: 单篇 5-15 秒');
  const [commentExtractLogic, setCommentExtractLogic] = useState('随机抽取素材池');
  const [commentCorpus, setCommentCorpus] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [userInput, setUserInput] = useState('');

  // Global Settings
  const [dataMode, setDataMode] = useState('import');
  const [smsPlatform, setSmsPlatform] = useState('YeeMa (首选)');
  const [region, setRegion] = useState('中国大陆 (+86)');
  const [autoMatchRegion, setAutoMatchRegion] = useState(true);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">批量注册工厂</h1>
          <p className="text-sm text-slate-600 mt-1">配置自动化注册策略并执行批量注册</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSettings(true)}
            className="flex items-center px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" /> 全局配置
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
            <Play className="w-4 h-4 mr-2" fill="currentColor" /> 开始执行
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-slate-200">
        {[
          { id: 'config', label: '1. 注册策略', icon: Settings2 },
          { id: 'status', label: '2. 执行队列', icon: CheckCircle2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center px-5 py-3 text-sm font-medium border-b-2 transition-colors relative",
                isActive 
                  ? "border-blue-500 text-blue-600 bg-blue-500/5" 
                  : "border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-100"
              )}
            >
              <Icon className={cn("w-4 h-4 mr-2 transition-colors", isActive ? "text-blue-500" : "text-slate-500")} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg relative overflow-hidden min-h-[400px]">
        
        {/* Subtle top glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <AnimatePresence mode="wait">
          {activeTab === 'config' && (
            <motion.div 
              key="config"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 md:p-12 space-y-8"
            >
              {/* Registration Mode and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">注册模式</h3>
                    <div className="flex gap-4">
                       <label className={cn("flex-1 relative p-4 border rounded-xl cursor-pointer transition-colors", regMode === 'fixed' ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-white hover:border-slate-300")}>
                         <input type="radio" name="regMode" className="absolute top-4 right-4 accent-blue-600" checked={regMode === 'fixed'} onChange={() => setRegMode('fixed')} />
                         <div className="font-medium text-slate-900 mb-1">坑位注册</div>
                         <div className="text-xs text-slate-500">指定设备和IP，严格分配注册</div>
                       </label>
                       <label className={cn("flex-1 relative p-4 border rounded-xl cursor-pointer transition-colors", regMode === 'random' ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-white hover:border-slate-300")}>
                         <input type="radio" name="regMode" className="absolute top-4 right-4 accent-blue-600" checked={regMode === 'random'} onChange={() => setRegMode('random')} />
                         <div className="font-medium text-slate-900 mb-1">随机注册</div>
                         <div className="text-xs text-slate-500">随机分配可用设备，自动轮换IP池</div>
                       </label>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">注册数量分配</h3>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                       <div className="flex justify-between text-sm mb-2">
                         <span className="text-slate-600">单机每日注册上限</span>
                         <span className="font-medium text-slate-900">{dailyLimit} 个/机</span>
                       </div>
                       <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-4" value={dailyLimit} onChange={(e) => setDailyLimit(parseInt(e.target.value) || 1)} min="1" max="10" />
                       
                       <div className="flex items-center justify-between">
                          <span className="text-sm border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600">总计分配设备: <span className="font-bold text-slate-900">120</span> 台</span>
                          <span className="text-sm border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600">预估产出: <span className="font-bold text-slate-900">{120 * dailyLimit}</span> 号</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Profile Config */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">资料配置策略</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <span className="text-sm font-medium text-slate-700">头像 / 昵称设置</span>
                     <div className="flex flex-col gap-2">
                        <label className={cn("flex items-center p-3 border rounded-lg cursor-pointer transition-colors", profileMode === 'auto' ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50")}>
                           <input type="radio" name="profileMode" className="accent-blue-600 mr-3" checked={profileMode === 'auto'} onChange={() => setProfileMode('auto')} />
                           <div>
                             <div className="text-sm font-medium text-slate-900">自动随机配置</div>
                             <div className="text-xs text-slate-500">从公共素材库随机抽取</div>
                           </div>
                        </label>
                        <label className={cn("flex items-center p-3 border rounded-lg cursor-pointer transition-colors", profileMode === 'manual' ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50")}>
                           <input type="radio" name="profileMode" className="accent-blue-600 mr-3" checked={profileMode === 'manual'} onChange={() => setProfileMode('manual')} />
                           <div>
                             <div className="text-sm font-medium text-slate-900">使用个人素材库</div>
                             <div className="text-xs text-slate-500">从已上传的图库和昵称库中随机</div>
                           </div>
                        </label>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <span className="text-sm font-medium text-slate-700">简介与标签 (部分支持AI生成)</span>
                     <textarea 
                        className="w-full h-24 border border-slate-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white" 
                        placeholder="输入默认简介模板，支持 {AI智能生成} 占位符..."
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                     ></textarea>
                   </div>
                </div>
              </div>

              {/* Post-Registration Actions */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">投产后置动作</h3>
                <div className="space-y-4">
                  
                  {/* Nurture Action */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-shadow">
                     <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <label className="flex items-center cursor-pointer font-bold text-slate-800">
                          <input type="checkbox" className="accent-blue-600 w-4 h-4 mr-3" checked={nurtureEnabled} onChange={(e) => setNurtureEnabled(e.target.checked)} />
                          注册成功后自动执行【养号计划】
                        </label>
                     </div>
                     {nurtureEnabled && (
                       <div className="p-5 space-y-5">
                       
                       {/* Basic Action Settings */}
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2">活跃模块权重</label>
                            <select 
                              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 bg-white"
                              value={activeModuleWeight}
                              onChange={(e) => setActiveModuleWeight(e.target.value)}
                            >
                              <option>深度浏览 (80%) + 点赞 (20%)</option>
                              <option>沉浸式浏览 (95%) + 点赞 (5%)</option>
                              <option>精准垂直图文活跃 (100%)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2">停留时长区间</label>
                            <select 
                              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 bg-white"
                              value={stayDuration}
                              onChange={(e) => setStayDuration(e.target.value)}
                            >
                              <option>真实模拟: 单篇 5-15 秒</option>
                              <option>极速养号: 单篇 3-5 秒 (风险较高)</option>
                              <option>深度看文: 单篇 15-40 秒</option>
                            </select>
                          </div>
                       </div>

                       {/* Interactive Target Settings */}
                       <div className="pt-4 border-t border-slate-100">
                          <label className="block text-xs font-bold text-slate-600 mb-3">养号目标人群 / 笔记指定</label>
                          <div className="flex flex-wrap gap-3 mb-3">
                             {['feed', 'keyword', 'user'].map(type => (
                               <label key={type} className={cn("px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer transition-colors", targetType === type ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>
                                 <input type="radio" name="targetType" className="sr-only" checked={targetType === type} onChange={() => setTargetType(type)} />
                                 {type === 'feed' && '信息流随机泛养'}
                                 {type === 'keyword' && '指定关键词垂直养号'}
                                 {type === 'user' && '指定大V对标用户'}
                               </label>
                             ))}
                          </div>
                          {targetType === 'keyword' && (
                             <input type="text" placeholder="输入搜索关键词，例如：咖啡豆、原木风穿搭 (逗号分隔)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none placeholder:text-slate-400" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} />
                          )}
                          {targetType === 'user' && (
                             <input type="text" placeholder="输入用户的的主页链接或小红书号 (一行一个)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none placeholder:text-slate-400" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                          )}
                       </div>

                       {/* Advanced Comments Strategy */}
                       <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between mb-3">
                             <label className="text-xs font-bold text-slate-600">自定义评论策略</label>
                             <select 
                               className="border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 outline-none bg-slate-50 focus:border-blue-500 font-medium"
                               value={commentStrategy}
                               onChange={(e: any) => setCommentStrategy(e.target.value)}
                             >
                                <option value="none">关闭评论</option>
                                <option value="simple">极简随机评论 (预设)</option>
                                <option value="advanced">高级自定义内容</option>
                             </select>
                          </div>
                          
                          {commentStrategy === 'advanced' && (
                             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                                <div className="flex items-center gap-6">
                                   <div className="flex-1">
                                      <label className="block text-[11px] font-bold text-slate-500 mb-1">单号评论篇数</label>
                                      <div className="flex items-center gap-3">
                                         <input 
                                           type="range" 
                                           className="flex-1 accent-blue-600 h-1.5 cursor-pointer" 
                                           min="1" max="20" 
                                           value={commentCount} 
                                           onChange={(e) => setCommentCount(parseInt(e.target.value))} 
                                         />
                                         <span className="text-xs font-mono font-bold text-slate-700 w-8">{commentCount} 条</span>
                                      </div>
                                   </div>
                                   <div className="flex-1">
                                      <label className="block text-[11px] font-bold text-slate-500 mb-1">评论抽取方式</label>
                                      <select className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 outline-none" value={commentExtractLogic} onChange={(e) => setCommentExtractLogic(e.target.value)}>
                                        <option>随机抽取素材池</option>
                                        <option>按顺序依次评论</option>
                                      </select>
                                   </div>
                                </div>
                                <div>
                                   <label className="block text-[11px] font-bold text-slate-500 mb-1.5">评论素材池 (内容指定)</label>
                                   <textarea 
                                     className="w-full h-28 border border-slate-200 rounded-lg p-3 text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-inner font-medium placeholder:text-slate-400" 
                                     placeholder="例如：\n太好看了吧，求链接！\n赞！支持一下博主～\n学到了，感谢分享。\n（支持一行一条评论内容，系统将自动随机抽取评论。如果选择了指定用户，将在他们的最新笔记下留下这些评论）"
                                     value={commentCorpus}
                                     onChange={(e) => setCommentCorpus(e.target.value)}
                                   ></textarea>
                                </div>
                             </div>
                          )}
                       </div>

                      </div>
                    )}
                  </div>

                  {/* Post Note Action */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                     <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <label className="flex items-center cursor-pointer font-medium text-slate-800">
                          <input type="checkbox" className="accent-blue-600 w-4 h-4 mr-3" checked={postNoteEnabled} onChange={(e) => setPostNoteEnabled(e.target.checked)} />
                          注册及养号完成后自动【发布首篇笔记】
                        </label>
                     </div>
                     {postNoteEnabled && (
                       <div className="p-4 flex gap-4">
                          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                             绑定已有素材库
                          </button>
                          <div className="flex-1 border border-slate-200 border-dashed rounded-lg flex items-center justify-center text-sm text-slate-400 bg-slate-50">
                             需勾选后配置图文与话题
                          </div>
                       </div>
                     )}
                  </div>

                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                 <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors">
                   保存配置并前往执行
                 </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'status' && (
            <motion.div 
              key="status"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-8 md:p-12"
            >
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">执行队列与状态</h3>
                   <div className="text-xs text-slate-500 mt-1">当前批次：<span className="font-mono bg-slate-100 px-1 py-0.5 rounded">#BATCH-[自动生成]</span></div>
                 </div>
                 <div className="flex space-x-4 text-sm">
                   <div className="text-center"><div className="font-bold text-slate-800">120</div><div className="text-xs text-slate-500">总任务</div></div>
                   <div className="text-center"><div className="font-bold text-blue-600">45</div><div className="text-xs text-slate-500">执行中</div></div>
                   <div className="text-center"><div className="font-bold text-emerald-600">72</div><div className="text-xs text-slate-500">成功</div></div>
                   <div className="text-center"><div className="font-bold text-rose-600">3</div><div className="text-xs text-slate-500">失败</div></div>
                 </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                     <tr>
                       <th className="font-medium p-4">设备标识</th>
                       <th className="font-medium p-4">分配账号 (手机号)</th>
                       <th className="font-medium p-4">当前节点</th>
                       <th className="font-medium p-4">状态</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 p-4">
                     {[
                       { id: 'dev-1', phone: '138****1234', step: '图片验证码', status: 'pending', statusText: '操作中' },
                       { id: 'dev-2', phone: '138****5678', step: '完善资料 (头像)', status: 'pending', statusText: '操作中' },
                       { id: 'dev-3', phone: '139****8888', step: '全部完成 (后置养号)', status: 'success', statusText: '成功' },
                       { id: 'dev-4', phone: '137****9999', step: '获取验证码超时', status: 'error', statusText: '失败' },
                     ].map((task, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="p-4 font-mono text-xs text-slate-600">{task.id}</td>
                         <td className="p-4 text-slate-800">{task.phone}</td>
                         <td className="p-4 text-slate-600">{task.step}</td>
                         <td className="p-4">
                           <span className={cn(
                             "px-2.5 py-1 rounded-full text-xs font-medium border",
                             task.status === 'success' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                             task.status === 'error' ? "bg-rose-50 text-rose-600 border-rose-200" :
                             "bg-blue-50 text-blue-600 border-blue-200"
                           )}>
                             {task.statusText}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Global Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[540px] bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col max-h-[100dvh]"
            >
               <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">注册全局配置</h2>
                  <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
                  {/* Account Data Mode */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      数据来源模式
                    </h3>
                    <div className="grid gap-3">
                      <label className={cn("flex items-center p-3 border rounded-xl cursor-pointer transition-colors", dataMode === 'import' ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white")}>
                        <input type="radio" name="dataMode" className="accent-blue-600 mr-3" checked={dataMode === 'import'} onChange={() => setDataMode('import')} />
                        <div>
                           <div className="text-sm font-medium text-slate-900">从外部导入数据</div>
                           <div className="text-xs text-slate-500">使用已上传的Excel/CSV批量数据</div>
                        </div>
                      </label>
                      <label className={cn("flex items-center p-3 border rounded-xl cursor-pointer transition-colors", dataMode === 'backup' ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white")}>
                        <input type="radio" name="dataMode" className="accent-blue-600 mr-3" checked={dataMode === 'backup'} onChange={() => setDataMode('backup')} />
                        <div>
                           <div className="text-sm font-medium text-slate-900">备份注册恢复</div>
                           <div className="text-xs text-slate-500">从历史备份快照中恢复注册状态</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* SMS Platform */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      接码平台设置
                    </h3>
                    <div className="grid gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">平台供应商</label>
                          <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 shadow-sm" value={smsPlatform} onChange={(e) => setSmsPlatform(e.target.value)}>
                            <option>YeeMa (首选)</option>
                            <option>接码平台 B</option>
                            <option>接码平台 C</option>
                          </select>
                        </div>
                        <div>
                           <label className="block text-xs font-medium text-slate-600 mb-1.5">API Key</label>
                           <input type="password" value="****************" readOnly className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Region Settings */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      注册地域与号段
                    </h3>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-4">
                       <div>
                         <label className="block text-xs font-medium text-slate-600 mb-1.5">国家地区</label>
                         <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 shadow-sm" value={region} onChange={(e) => setRegion(e.target.value)}>
                           <option>中国大陆 (+86)</option>
                           <option>香港 (+852)</option>
                           <option>马来西亚 (+60)</option>
                         </select>
                       </div>
                       
                       <div className="pt-2 border-t border-slate-100">
                         <label className="flex items-center cursor-pointer font-medium text-slate-700 text-sm">
                           <input type="checkbox" className="accent-blue-600 w-4 h-4 mr-3" checked={autoMatchRegion} onChange={(e) => setAutoMatchRegion(e.target.checked)} />
                           使用设备所处地域自动匹配接码地区
                         </label>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                  <button onClick={() => setShowSettings(false)} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                     取消
                  </button>
                  <button onClick={() => setShowSettings(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md transition-colors">
                     保存配置
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
