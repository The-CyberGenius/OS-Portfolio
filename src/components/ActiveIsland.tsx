import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Wifi, Sparkles, Terminal, Activity, RefreshCw } from "lucide-react";
import { AppId } from "../types";

interface ActiveIslandProps {
  activeApp: AppId | null;
  onOpenApp: (app: AppId) => void;
}

export default function ActiveIsland({ activeApp, onOpenApp }: ActiveIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(12);
  const [cpuUsage, setCpuUsage] = useState(4);
  const [diagnosticStatus, setDiagnosticStatus] = useState("All Systems Nominal");

  useEffect(() => {
    // Clock tick
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Simulated fluctuating CPU / Ping loads
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 1 ? 1 : next > 25 ? 25 : next;
      });
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return next < 8 ? 8 : next > 20 ? 20 : next;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  const getAppStatus = () => {
    switch (activeApp) {
      case "terminal":
        return "Terminal Active";
      case "resume":
        return "Bento Resume Opened";
      case "projects":
        return "Browsing Labs";
      case "controlCenter":
        return "SysAdmin Dashboard";
      case "contact":
        return "Secure Mailroom";
      default:
        return "Ready for Action";
    }
  };

  return (
    <div id="active-island-container" className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div
        id="active-island-pill"
        className="pointer-events-auto flex flex-col items-center bg-black/90 text-white border border-white/10 rounded-[28px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden cursor-pointer"
        animate={{
          width: isExpanded ? 360 : 230,
          height: isExpanded ? 180 : 38,
          borderRadius: isExpanded ? 32 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full h-[38px] px-4 text-xs font-mono select-none"
            >
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/90">
                  {getAppStatus()}
                </span>
              </div>
              <div className="w-[1.5px] h-3 bg-white/15" />
              <div className="text-white/80 font-mono tracking-wider font-semibold">
                {time || "00:00:00"}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col w-full h-full p-5 text-sm"
            >
              {/* Dynamic Island Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white/10 rounded-lg">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase font-mono text-emerald-400">
                      Balkrishan.OS v2.4
                    </h4>
                    <p className="text-[10px] text-white/50 font-mono">Kernel Core: Stable</p>
                  </div>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/75">
                  {time}
                </span>
              </div>

              {/* Island Content Grid */}
              <div className="grid grid-cols-2 gap-4 mt-3.5">
                {/* Diagnostics */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    System Stats
                  </span>
                  <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CPU Load: {cpuUsage}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ping: {ping}ms</span>
                  </div>
                </div>

                {/* Micro Actions */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Direct Commands
                  </span>
                  <div className="flex flex-col gap-1">
                    <button
                      id="command-resume"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenApp("resume");
                        setIsExpanded(false);
                      }}
                      className="flex items-center justify-between w-full text-left bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-300 transition px-2 py-1 rounded text-[10px] font-mono border border-white/5"
                    >
                      <span>📄 View Executive Resume</span>
                    </button>
                    <button
                      id="command-terminal"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenApp("terminal");
                        setIsExpanded(false);
                      }}
                      className="flex items-center justify-between w-full text-left bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 transition px-2 py-1 rounded text-[10px] font-mono border border-white/5"
                    >
                      <span>💻 Open CLI Core</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
