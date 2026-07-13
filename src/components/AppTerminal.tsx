import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Sparkles, Send } from "lucide-react";
import { CommandLineOutput } from "../types";

interface AppTerminalProps {
  onOpenApp: (app: any) => void;
}

export default function AppTerminal({ onOpenApp }: AppTerminalProps) {
  const [history, setHistory] = useState<CommandLineOutput[]>([
    { text: "Balkrishan.OS [Version 2.4.1206]", type: "system" },
    { text: "Initializing kernel modules... OK", type: "system" },
    { text: "Type 'help' to view all available commands.", type: "success" },
    { text: "Balkrishan_Prajapat@genius-core:~$ ", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newHistory = [...history];
    // Remove the trailing prompt indicator from the end if needed, but we'll append the exact command typed.
    newHistory.push({ text: `Balkrishan_Prajapat@genius-core:~$ ${cmd}`, type: "input" });

    const args = cmd.split(" ");
    const command = args[0].toLowerCase();
    const commandParam = args.slice(1).join(" ");

    setInput("");

    switch (command) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "system" },
          { text: "  about       - Summarize Balkrishan's profile", type: "system" },
          { text: "  skills      - List core programming, cloud, and DevOps skills", type: "system" },
          { text: "  projects    - Open the Labs Projects visual window", type: "system" },
          { text: "  diag        - Run diagnostics and launch the SysAdmin control center", type: "system" },
          { text: "  education   - View education history", type: "system" },
          { text: "  contact     - Display emails, phone number, and social links", type: "system" },
          { text: "  clear       - Clear the console terminal screen", type: "system" }
        );
        break;

      case "about":
        newHistory.push(
          { text: "BALKRISHAN PRAJAPAT", type: "success" },
          { text: "Role: Software Developer | AI Engineer | IT Support Specialist", type: "system" },
          { text: "A research-driven problem solver and BCA Graduate (2024) who excels at developing full-stack web applications, integrating custom AI pipelines (RAG, Agents), and handling robust cloud servers (AWS EC2, Ubuntu) & IT configurations.", type: "system" }
        );
        break;

      case "skills":
        newHistory.push(
          { text: "CORE TECH STACK:", type: "success" },
          { text: "  [Frontend]  React, Vite, HTML5, CSS3, Tailwind CSS, JavaScript", type: "system" },
          { text: "  [Backend]   PHP, Node.js (Express), MySQL, PostgreSQL", type: "system" },
          { text: "  [DevOps]    AWS EC2, Ubuntu Linux, SSH, Vercel, DNS & Domain routing", type: "success" },
          { text: "  [Support]   Hardware Troubleshooting, Software Setup, SysAdmin, Networking", type: "system" }
        );
        break;

      case "projects":
        newHistory.push({ text: "Launching Labs Visual Projects module...", type: "success" });
        setTimeout(() => onOpenApp("projects"), 600);
        break;

      case "diag":
        newHistory.push({ text: "Triggering hardware & cloud routing checks... Launching Support console.", type: "success" });
        setTimeout(() => onOpenApp("controlCenter"), 600);
        break;

      case "education":
        newHistory.push(
          { text: "ACADEMIC LANDMARKS:", type: "success" },
          { text: "  Degree: Bachelor of Computer Applications (BCA)", type: "system" },
          { text: "  University: Maharaja Ganga Singh University (MGSU), Bikaner, Rajasthan", type: "system" },
          { text: "  Graduation: 2024 | Result: First Division", type: "success" }
        );
        break;

      case "contact":
        newHistory.push(
          { text: "SECURE COMMS LINES:", type: "success" },
          { text: "  Email:    sshivaprajapat@gmail.com", type: "system" },
          { text: "  Phone:    +91 8955256878", type: "system" },
          { text: "  GitHub:   github.com/The-CyberGenius", type: "system" },
          { text: "  Web:      geniusdevelopers.space", type: "system" }
        );
        break;

      case "clear":
        setHistory([{ text: "Balkrishan.OS [Console cleared]", type: "system" }]);
        return;

      case "chat":
        newHistory.push({ text: "The AI Copilot has been offline-decoupled to keep this portfolio a pure, high-performance static experience. Please use the contact form or email sshivaprajapat@gmail.com directly!", type: "error" });
        break;

      default:
        newHistory.push({ text: `Command not found: '${command}'. Type 'help' for a list of available routines.`, type: "error" });
        break;
    }

    setHistory(newHistory);
  };

  return (
    <div
      id="terminal-body"
      onClick={focusInput}
      className="flex flex-col h-full bg-neutral-950 font-mono text-sm text-neutral-200 p-5 min-h-[500px]"
    >
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 select-text">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-white font-bold"
                : line.type === "error"
                ? "text-rose-400"
                : line.type === "success"
                ? "text-emerald-400 font-semibold"
                : line.type === "ai"
                ? "text-fuchsia-300 font-medium italic border-l-2 border-fuchsia-500/50 pl-3 py-1 bg-fuchsia-500/5"
                : "text-neutral-400"
            }`}
          >
            {line.text}
          </div>
        ))}
        {isAiLoading && (
          <div className="flex items-center gap-2 text-fuchsia-400 animate-pulse font-medium">
            <Sparkles size={16} className="animate-spin" />
            <span>AI agent thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form id="terminal-input-form" onSubmit={handleCommand} className="flex items-center gap-2 border-t border-neutral-900 pt-3">
        <span className="text-emerald-400 font-bold shrink-0">Balkrishan_Prajapat@genius-core:~$</span>
        <input
          id="terminal-cli-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isAiLoading}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="flex-1 bg-transparent text-white border-none outline-none font-mono focus:ring-0 p-0 text-sm"
        />
        <button
          id="terminal-send-btn"
          type="submit"
          disabled={!input.trim() || isAiLoading}
          className="p-1.5 rounded-lg text-neutral-500 hover:text-white transition disabled:opacity-30 disabled:hover:text-neutral-500 cursor-pointer"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
