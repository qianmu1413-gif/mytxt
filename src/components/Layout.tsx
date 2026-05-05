import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, MessageSquare, MonitorPlay, UserPlus, Send, 
  HeartHandshake, Server, Wallet, CheckSquare, BarChart3, Bell, 
  RefreshCw, Maximize, CheckCircle2, Flame, Sparkles, LineChart
} from 'lucide-react';
import { cn } from '../lib/utils';

const MAIN_NAV = [
  { name: '总览', path: '/', icon: LayoutDashboard },
  { name: '私信', path: '/messages', icon: MessageSquare },
  { name: '投屏', path: '/streaming', icon: MonitorPlay },
  { name: '注册', path: '/register', icon: UserPlus },
  { name: '发布', path: '/publish', icon: Send },
  { name: '养号', path: '/nurture', icon: HeartHandshake },
];

const SECONDARY_NAV = [
  { name: '智能创作', path: '/editor', icon: Sparkles },
  { name: '发布追踪', path: '/tracking', icon: LineChart },
  { name: '对标图库', path: '/library', icon: Flame },
  { name: '账号资产', path: '/assets', icon: Wallet },
  { name: '任务执行', path: '/tasks', icon: CheckSquare },
  { name: '数据中心', path: '/data', icon: BarChart3 },
];

export default function Layout() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const getPageTitle = () => {
    const route = [...MAIN_NAV, ...SECONDARY_NAV].find(r => r.path === location.pathname);
    return route ? route.name : '魔云腾';
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="h-16 flex items-center px-5 border-b border-slate-200 font-bold text-[17px] tracking-wider text-slate-900">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center mr-2 relative shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <span className="text-white text-base leading-none relative z-10">❖</span>
            <div className="absolute inset-0 bg-blue-400 rounded-md blur-sm opacity-50 z-0"></div>
          </div>
          魔云腾
        </div>

        <div className="flex-1 overflow-y-auto py-5 custom-scrollbar">
          <div className="px-5 mb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">核心操作</div>
          <nav className="space-y-1 px-3 mb-6">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm transition-all group relative overflow-hidden",
                    isActive 
                      ? "text-blue-600 font-medium bg-blue-50/50" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute inset-0 border-l-2 border-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className={cn("w-4 h-4 mr-2.5 flex-shrink-0 relative z-10", isActive ? "text-blue-600" : "opacity-70 group-hover:opacity-100")} />
                    <span className="relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="px-5 mb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">资源支撑</div>
          <nav className="space-y-1 px-3">
            {SECONDARY_NAV.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm transition-all group relative overflow-hidden",
                    isActive 
                      ? "text-blue-600 font-medium bg-blue-50/50" 
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute inset-0 border-l-2 border-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className={cn("w-4 h-4 mr-2.5 flex-shrink-0 relative z-10", isActive ? "text-blue-600" : "opacity-70 group-hover:opacity-100")} />
                    <span className="relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* User / Org Bottom */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center p-2 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-slate-200 group shadow-sm hover:shadow">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mr-2.5 shadow-inner">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-800 font-medium text-xs truncate group-hover:text-blue-600 transition-colors">Admin User</div>
              <div className="text-slate-400 text-[10px] truncate uppercase tracking-widest">System Ops</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10 w-full relative">
          <div className="flex items-center">
            <h1 className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wider">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-slate-500">
             <div className="hidden lg:flex items-center text-[10px] uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md border border-emerald-100 font-bold shadow-sm">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              API Connected
            </div>
            
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all focus:outline-none" title="刷新">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all relative focus:outline-none" title="通知">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)] border border-white"></span>
            </button>
            <button onClick={toggleFullscreen} className="p-2 w-8 h-8 flex items-center justify-center rounded-md border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all focus:outline-none" title="全屏">
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className={cn("flex-1 overflow-auto relative custom-scrollbar z-10", location.pathname === '/messages' ? 'p-0' : 'p-6')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
