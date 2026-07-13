import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { AppId } from "../types";

interface AppWindowProps {
  id: AppId;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  isFocused: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  onToggleMaximize: () => void;
  children: React.ReactNode;
  key?: string;
}

const getDefaultSize = (id: AppId) => {
  switch (id) {
    case "terminal":
      return { width: 740, height: 480 };
    case "resume":
      return { width: 840, height: 600 };
    case "projects":
      return { width: 860, height: 620 };
    case "controlCenter":
      return { width: 880, height: 620 };
    case "contact":
      return { width: 780, height: 560 };
    default:
      return { width: 780, height: 560 };
  }
};

const getDefaultPosition = (id: AppId) => {
  switch (id) {
    case "terminal":
      return { left: "15%", top: "140px" };
    case "resume":
      return { left: "12%", top: "120px" };
    case "projects":
      return { left: "18%", top: "160px" };
    case "controlCenter":
      return { left: "8%", top: "110px" };
    case "contact":
      return { left: "20%", top: "180px" };
    default:
      return { left: "15%", top: "130px" };
  }
};

export default function AppWindow({
  id,
  title,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  isFocused,
  isMaximized,
  isMinimized,
  onToggleMaximize,
  children,
}: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(() => getDefaultSize(id));
  const [position] = useState(() => getDefaultPosition(id));

  if (!isOpen) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startWidth = size.width;
    const startHeight = size.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setSize({
        width: Math.max(380, startWidth + deltaX),
        height: Math.max(280, startHeight + deltaY),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchResizeStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const startWidth = size.width;
    const startHeight = size.height;
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - startX;
      const deltaY = moveTouch.clientY - startY;

      setSize({
        width: Math.max(320, startWidth + deltaX),
        height: Math.max(240, startHeight + deltaY),
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <motion.div
      id={`window-${id}`}
      ref={windowRef}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      drag={!isMaximized && !isMobile}
      dragHandleClassName="window-drag-handle"
      dragMomentum={false}
      dragElastic={0.02}
      initial={{ scale: 0.92, opacity: 0, y: 25 }}
      animate={
        isMinimized
          ? {
              scale: 0.25,
              opacity: 0,
              y: 450,
              transitionEnd: { display: "none" },
            }
          : {
              display: "flex",
              scale: 1,
              opacity: 1,
              y: 0,
              width: isMobile ? "100%" : isMaximized ? "100%" : `${size.width}px`,
              height: isMobile ? "calc(100vh - 160px)" : isMaximized ? "calc(100vh - 140px)" : `${size.height}px`,
              maxWidth: isMobile ? "100%" : "100%",
              top: isMobile ? "96px" : isMaximized ? "84px" : position.top,
              left: isMobile ? "0px" : isMaximized ? "0px" : position.left,
              x: isMaximized ? 0 : undefined,
            }
      }
      exit={{ scale: 0.92, opacity: 0, y: 25 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
      style={{
        zIndex,
        position: isMaximized || isMobile ? "fixed" : "absolute",
        pointerEvents: isMinimized ? "none" : "auto",
      }}
      className={`flex flex-col rounded-2xl bg-black/55 border ${
        isFocused ? "border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.65)] bg-black/60" : "border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
      } backdrop-blur-3xl overflow-hidden select-none transition-shadow duration-300 md:max-h-[85vh] w-full`}
    >
      {/* OS Titlebar */}
      <div
        id={`titlebar-${id}`}
        className="window-drag-handle flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Apple Style Circles */}
        <div className="flex items-center gap-2">
          <button
            id={`window-close-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-rose-500 border border-rose-600/50 cursor-pointer text-rose-950 font-bold"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            id={`window-minimize-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-amber-500 border border-amber-600/50 cursor-pointer text-amber-950 font-bold"
          >
            <Minimize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            id={`window-maximize-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize();
            }}
            className="group relative flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/50 cursor-pointer text-emerald-950 font-bold"
          >
            <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Title */}
        <div className="text-xs font-mono font-semibold text-white/70 tracking-wider">
          {title}
        </div>

        {/* Window Active Status indicator */}
        <div className="flex items-center gap-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isFocused ? "bg-emerald-400 shadow-[0_0_5px_#10b981]" : "bg-white/20"
            }`}
          />
        </div>
      </div>

      {/* App Body Content */}
      <div className="flex-1 overflow-y-auto select-text bg-black/25 relative">
        {children}
      </div>

      {/* Apple-style Resize handle corner */}
      {!isMaximized && !isMobile && (
        <div
          id={`window-resize-corner-${id}`}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5"
          onMouseDown={handleResizeStart}
          onTouchStart={handleTouchResizeStart}
        >
          <svg className="w-2.5 h-2.5 text-white/30 hover:text-white/60 transition" viewBox="0 0 10 10">
            <path d="M10,0 L0,10 M10,4 L4,10 M10,8 L8,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
