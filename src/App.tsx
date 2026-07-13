import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Terminal, User, FolderGit2, ShieldAlert, MessageSquareCode } from "lucide-react";
import { AppId } from "./types";

// Import custom components
import ActiveIsland from "./components/ActiveIsland";
import Dock from "./components/Dock";
import AppWindow from "./components/AppWindow";
import AppTerminal from "./components/AppTerminal";
import AppBentoResume from "./components/AppBentoResume";
import AppProjects from "./components/AppProjects";
import AppControlCenter from "./components/AppControlCenter";
import AppContact from "./components/AppContact";

export default function App() {
  // Track open applications
  const [openApps, setOpenApps] = useState<AppId[]>(["resume"]); // Bento Resume open by default to greet the user
  // Track active focused application
  const [activeApp, setActiveApp] = useState<AppId | null>("resume");
  // Track minimized applications
  const [minimizedApps, setMinimizedApps] = useState<AppId[]>([]);
  // Track maximized applications
  const [maximizedApps, setMaximizedApps] = useState<AppId[]>([]);
  // Window layer order state
  const [zIndices, setZIndices] = useState<Record<AppId, number>>({
    terminal: 10,
    resume: 11, // starts focused
    projects: 10,
    controlCenter: 10,
    contact: 10,
  });

  const handleOpenApp = (app: AppId) => {
    // 1. If it's currently minimized, un-minimize and focus it
    if (minimizedApps.includes(app)) {
      setMinimizedApps((prev) => prev.filter((a) => a !== app));
      handleFocusApp(app);
      return;
    }

    // 2. If it's already open AND currently active/focused, minimize it!
    if (openApps.includes(app) && activeApp === app) {
      handleMinimizeApp(app);
      return;
    }

    // 3. If it's already open but NOT active/focused, bring it to front/focus
    if (openApps.includes(app)) {
      handleFocusApp(app);
      return;
    }

    // 4. If it's not open at all, open it and focus
    setOpenApps((prev) => [...prev, app]);
    handleFocusApp(app);
  };

  const handleMinimizeApp = (app: AppId) => {
    if (!minimizedApps.includes(app)) {
      setMinimizedApps((prev) => [...prev, app]);
    }
    // Shift focus to the next available open and non-minimized app
    const remainingOpen = openApps.filter((a) => a !== app && !minimizedApps.includes(a));
    if (remainingOpen.length > 0) {
      setActiveApp(remainingOpen[remainingOpen.length - 1]);
    } else {
      setActiveApp(null);
    }
  };

  const handleCloseApp = (app: AppId) => {
    setOpenApps((prev) => prev.filter((a) => a !== app));
    setMinimizedApps((prev) => prev.filter((a) => a !== app));
    if (activeApp === app) {
      const remaining = openApps.filter((a) => a !== app);
      setActiveApp(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleFocusApp = (app: AppId) => {
    // If it was minimized, make sure to un-minimize when focused
    if (minimizedApps.includes(app)) {
      setMinimizedApps((prev) => prev.filter((a) => a !== app));
    }
    setActiveApp(app);
    setZIndices((prev) => {
      const maxZ = Math.max(...(Object.values(prev) as number[]), 10);
      return { ...prev, [app]: maxZ + 1 };
    });
  };

  const handleToggleMaximize = (app: AppId) => {
    setMaximizedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const renderAppContent = (app: AppId) => {
    switch (app) {
      case "terminal":
        return <AppTerminal onOpenApp={handleOpenApp} />;
      case "resume":
        return <AppBentoResume />;
      case "projects":
        return <AppProjects />;
      case "controlCenter":
        return <AppControlCenter />;
      case "contact":
        return <AppContact />;
      default:
        return null;
    }
  };

  const getAppTitle = (app: AppId) => {
    switch (app) {
      case "terminal":
        return "Balkrishan_Prajapat@genius-core:~$";
      case "resume":
        return "📄 Balkrishan Prajapat — Executive Resume";
      case "projects":
        return "🧪 Labs & Production Blueprints";
      case "controlCenter":
        return "🛡️ IT Support & Server Diagnostics Dashboard";
      case "contact":
        return "✉️ Secure Dispatch Contact Core";
      default:
        return "Application Window";
    }
  };

  // Launchpad static items grid
  const desktopIcons = [
    { id: "resume" as AppId, label: "Bento Resume", icon: <User size={28} />, color: "from-indigo-500/20 to-violet-600/20 text-indigo-400 border-indigo-500/30" },
    { id: "projects" as AppId, label: "Labs Showcase", icon: <FolderGit2 size={28} />, color: "from-emerald-500/20 to-teal-600/20 text-emerald-400 border-emerald-500/30" },
    { id: "terminal" as AppId, label: "Terminal.sh", icon: <Terminal size={28} />, color: "from-cyan-500/20 to-blue-600/20 text-cyan-400 border-cyan-500/30" },
    { id: "controlCenter" as AppId, label: "SysAdmin", icon: <ShieldAlert size={28} />, color: "from-amber-500/20 to-orange-600/20 text-amber-400 border-amber-500/30" },
    { id: "contact" as AppId, label: "Secure Mail", icon: <MessageSquareCode size={28} />, color: "from-rose-500/20 to-pink-600/20 text-rose-400 border-rose-500/30" },
  ];

  return (
    <div
      id="desktop-canvas-container"
      className="relative w-full min-h-screen bg-[#07070a] overflow-x-hidden select-none font-sans"
    >
      {/* Dynamic Liquid Wallpaper Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/5 blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-fuchsia-500/5 to-rose-500/10 blur-[130px] animate-pulse" style={{ animationDuration: "18s" }} />
        <div className="absolute top-[30%] right-[15%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-amber-500/5 to-emerald-500/5 blur-[140px] animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Top Active Island */}
      <ActiveIsland activeApp={activeApp} onOpenApp={handleOpenApp} />

      {/* Main Desktop Space */}
      <main id="desktop-grid-workplace" className="relative w-full min-h-screen pt-24 pb-32 px-6 md:px-12 z-10 flex flex-col items-start justify-start select-text">
        {/* Launcher Icons Grid (Launchpad) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-6 max-w-4xl mx-auto w-full mb-10 select-none">
          {desktopIcons.map((icon) => {
            const isOpen = openApps.includes(icon.id);
            return (
              <button
                id={`desktop-icon-${icon.id}`}
                key={icon.id}
                onClick={() => handleOpenApp(icon.id)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 group cursor-pointer relative"
              >
                {/* Visual Glow layer */}
                <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${icon.color} opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm -z-10`} />

                <div className={`p-4 rounded-2xl bg-gradient-to-br ${icon.color} border shadow-lg group-hover:scale-105 transition-all duration-300`}>
                  {icon.icon}
                </div>
                <span className="text-[11px] font-mono text-neutral-300 group-hover:text-white font-semibold tracking-wide mt-2.5">
                  {icon.label}
                </span>

                {/* Open app active dot */}
                {isOpen && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Floating App Windows container */}
        <div id="desktop-windows-board" className="relative w-full flex-1 min-h-[500px]">
          <AnimatePresence>
            {openApps.map((appId) => (
              <AppWindow
                key={appId}
                id={appId}
                title={getAppTitle(appId)}
                isOpen={true}
                isFocused={activeApp === appId}
                isMaximized={maximizedApps.includes(appId)}
                isMinimized={minimizedApps.includes(appId)}
                zIndex={zIndices[appId]}
                onClose={() => handleCloseApp(appId)}
                onMinimize={() => handleMinimizeApp(appId)}
                onFocus={() => handleFocusApp(appId)}
                onToggleMaximize={() => handleToggleMaximize(appId)}
              >
                {renderAppContent(appId)}
              </AppWindow>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Apple Dock Navigation */}
      <Dock activeApp={activeApp} openApps={openApps} onOpenApp={handleOpenApp} />
    </div>
  );
}
