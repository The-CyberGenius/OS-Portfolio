import React from "react";
import { motion } from "motion/react";
import { Terminal, User, FolderGit2, ShieldAlert, MessageSquareCode } from "lucide-react";
import { AppId, DockItem } from "../types";

interface DockProps {
  activeApp: AppId | null;
  openApps: AppId[];
  onOpenApp: (app: AppId) => void;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "resume", label: "Bento Resume", icon: "user", color: "bg-indigo-500" },
  { id: "projects", label: "Labs Portfolio", icon: "projects", color: "bg-emerald-500" },
  { id: "terminal", label: "Terminal.sh", icon: "terminal", color: "bg-cyan-500" },
  { id: "controlCenter", label: "IT Support Diagnostics", icon: "control", color: "bg-amber-500" },
  { id: "contact", label: "Secure Mail", icon: "contact", color: "bg-rose-500" },
];

export default function Dock({ activeApp, openApps, onOpenApp }: DockProps) {
  const renderIcon = (iconName: string) => {
    const size = 22;
    switch (iconName) {
      case "terminal":
        return <Terminal size={size} />;
      case "user":
        return <User size={size} />;
      case "projects":
        return <FolderGit2 size={size} />;
      case "control":
        return <ShieldAlert size={size} />;
      case "contact":
        return <MessageSquareCode size={size} />;
      default:
        return <Terminal size={size} />;
    }
  };

  return (
    <div id="dock-bar-container" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div
        id="dock-bar-glass"
        className="pointer-events-auto flex items-end gap-3.5 px-4.5 py-3 bg-black/40 border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-black/50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      >
        {DOCK_ITEMS.map((item) => {
          const isOpen = openApps.includes(item.id);
          const isActive = activeApp === item.id;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div
                id={`tooltip-${item.id}`}
                className="absolute -top-11 scale-90 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bg-black/95 text-white text-[11px] font-medium font-mono px-2.5 py-1 rounded-lg border border-white/10 shadow-lg whitespace-nowrap z-50"
              >
                {item.label}
              </div>

              {/* Icon Orb */}
              <motion.button
                id={`dock-btn-${item.id}`}
                onClick={() => onOpenApp(item.id)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl text-white ${item.color} shadow-lg shadow-black/35 focus:outline-none cursor-pointer`}
                whileHover={{
                  scale: 1.25,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow layer */}
                <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
                  {renderIcon(item.icon)}
                </span>
              </motion.button>

              {/* Status Indicator */}
              <div className="absolute -bottom-1.5 flex items-center justify-center w-full h-1">
                {isActive ? (
                  <motion.div
                    layoutId="active-dot"
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
                  />
                ) : isOpen ? (
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                ) : null}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
