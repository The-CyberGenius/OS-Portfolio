import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, ShieldCheck, Database, RefreshCw, AlertTriangle, CheckCircle, Wifi, Cpu, HardDrive } from "lucide-react";

interface DiagnosticTask {
  id: string;
  name: string;
  status: "idle" | "running" | "success" | "warning" | "error";
  description: string;
}

export default function AppControlCenter() {
  const [tasks, setTasks] = useState<DiagnosticTask[]>([
    { id: "dns", name: "DNS Record Routing Check", status: "success", description: "Verifying NS record bindings to geniusdevelopers.space." },
    { id: "cpu", name: "AWS EC2 CPU Thermal Load", status: "success", description: "Measuring core load distributions on Ubuntu Instance." },
    { id: "ram", name: "Buffer Allocation Check", status: "warning", description: "Node memory cache heap limits exceeding 85% threshold." },
    { id: "ssl", name: "Let's Encrypt SSL Validation", status: "success", description: "Validating secure socket certification renewal schedules." },
    { id: "db", name: "MySQL Connection pool check", status: "error", description: "Max connections limit reached on primary schema instance." }
  ]);

  const [activeLog, setActiveLog] = useState<string[]>([
    "[SYS] Systems online. Balkrishan.OS Kernel v2.4 initialized.",
    "[SYS] Loading IT Support diagnostics suite...",
    "[SYS] Port 3000 active. Ingress route forwarding OK."
  ]);

  const [networkSpeed, setNetworkSpeed] = useState<number>(45.8);
  const [fixProgress, setFixProgress] = useState<number | null>(null);
  const [fixingId, setFixingId] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic network variation
    const interval = setInterval(() => {
      setNetworkSpeed((prev) => {
        const delta = (Math.random() * 4 - 2);
        const next = prev + delta;
        return Number(next.toFixed(1));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (message: string) => {
    setActiveLog((prev) => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleFix = (taskId: string) => {
    if (fixingId) return; // Prevent multiple concurrent fixes
    setFixingId(taskId);
    setFixProgress(0);
    addLog(`Running automated hot-fix routine for: ${taskId.toUpperCase()}...`);

    const interval = setInterval(() => {
      setFixProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === taskId ? { ...t, status: "success", description: `${t.name} fully optimized and restored.` } : t))
          );
          setFixingId(null);
          setFixProgress(null);
          addLog(`Hot-fix complete! Task '${taskId.toUpperCase()}' restored to state: NOMINAL.`);
          return null;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div id="control-center-root" className="p-6 md:p-8 text-white select-text max-w-6xl mx-auto space-y-6">
      {/* Dashboard Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
            ADMINISTRATIVE CONSOLE
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            IT Support & Live Diagnostics
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Simulate and interact with Balkrishan's deployment servers and automation pipelines.
          </p>
        </div>

        {/* Live bandwidth */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-mono font-bold shrink-0">
          <div className="flex items-center gap-2 text-emerald-400">
            <Wifi size={16} className="animate-pulse" />
            <span>Core Uplink:</span>
          </div>
          <span className="text-white">{networkSpeed} MB/s</span>
        </div>
      </div>

      {/* Grid: Server status + Live logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 columns: Task/Server check list */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-neutral-300 flex items-center gap-2">
              <Activity size={16} className="text-amber-400" />
              <span>Real-time Active Services</span>
            </h3>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition duration-300 gap-3"
                >
                  <div className="flex items-start gap-3">
                    {task.status === "success" && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                    {task.status === "warning" && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                    {task.status === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold font-mono tracking-tight text-white">{task.name}</h4>
                      <p className="text-xs text-neutral-400 max-w-md">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    {task.status !== "success" ? (
                      <button
                        id={`fix-btn-${task.id}`}
                        onClick={() => handleFix(task.id)}
                        disabled={fixingId !== null}
                        className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:hover:bg-amber-500 text-black font-bold text-xs font-mono px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        {fixingId === task.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Fixing {fixProgress}%</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3 h-3" />
                            <span>Execute Fix</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 border border-emerald-400/20 rounded-md font-mono">
                        Nominal
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: System Live Terminal Console & Logs */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-neutral-950 border border-neutral-900 rounded-2xl p-5 flex flex-col font-mono text-[11px] leading-relaxed select-text min-h-[300px]">
            <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-2 mb-3 text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-[9px] uppercase tracking-wider">SysDiag Log Streams</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-neutral-400">
              {activeLog.map((log, idx) => (
                <div key={idx} className={log.includes("NOMINAL") || log.includes("NOMINAL") ? "text-emerald-400" : log.includes("hot-fix") ? "text-amber-400" : "text-neutral-400"}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <Cpu className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
              <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono">CPU Load</span>
              <span className="text-xs font-mono font-bold">14.8%</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <HardDrive className="w-4 h-4 mx-auto text-indigo-400 mb-1" />
              <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Disk Limit</span>
              <span className="text-xs font-mono font-bold">42.1 GB</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Firewall</span>
              <span className="text-xs font-mono font-bold text-emerald-400">Armed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
