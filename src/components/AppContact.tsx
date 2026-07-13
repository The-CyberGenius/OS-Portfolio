import React, { useState } from "react";
import { Mail, Phone, Github, Globe, Check, Copy, Send, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function AppContact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const contactLines = [
    { id: "email", label: "Professional Email", value: "sshivaprajapat@gmail.com", href: "mailto:sshivaprajapat@gmail.com", icon: <Mail className="text-rose-400" size={18} /> },
    { id: "phone", label: "Direct Phone / WhatsApp", value: "+91 8955256878", href: "https://wa.me/918955256878", icon: <Phone className="text-emerald-400" size={18} /> },
    { id: "github", label: "GitHub Architecture", value: "github.com/The-CyberGenius", href: "https://github.com/The-CyberGenius", icon: <Github className="text-neutral-300" size={18} /> },
    { id: "portfolio", label: "Portfolio Staging Node", value: "geniusdevelopers.space", href: "https://geniusdevelopers.space", icon: <Globe className="text-cyan-400" size={18} /> },
    { id: "news", label: "JG News Production Channel", value: "jgnews.live", href: "https://jgnews.live", icon: <Globe className="text-amber-400" size={18} /> }
  ];

  const handleCopy = (id: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitting(true);
    // Simulate SMTP dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSentSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div id="contact-app-root" className="p-6 md:p-8 text-white select-text max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Left panel: Info channels */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-rose-400 font-bold">
            SECURE ROUTING KEYS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Let's build together
          </h2>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
            Reach out to establish direct collaboration or inquire about hiring Balkrishan for software development, IT setup, and AI integration services.
          </p>
        </div>

        <div className="space-y-3.5">
          {contactLines.map((line) => (
            <div
              key={line.id}
              className="group flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition duration-300 gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-white/5 rounded-lg shrink-0">
                  {line.icon}
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{line.label}</span>
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-neutral-200 hover:text-emerald-400 transition truncate block"
                  >
                    {line.value}
                  </a>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  id={`contact-copy-${line.id}`}
                  onClick={() => handleCopy(line.id, line.value)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-400 hover:text-white transition cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied === line.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Mock messaging console */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow */}
        <span className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 opacity-5 blur-3xl" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-rose-400">
            <Sparkles size={16} />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Direct Message Terminal</h3>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Your Name</label>
              <input
                id="contact-name-input"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-0 placeholder:text-neutral-500 transition"
                placeholder="Tony Stark"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Your Email Address</label>
              <input
                id="contact-email-input"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-0 placeholder:text-neutral-500 transition"
                placeholder="tony@starkindustries.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">Message Body</label>
              <textarea
                id="contact-msg-textarea"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-rose-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-0 placeholder:text-neutral-500 transition resize-none"
                placeholder="We are looking for an AI & Cloud deployment developer..."
              />
            </div>

            {sentSuccess ? (
              <motion.div
                id="contact-success-banner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-3"
              >
                <Check size={16} />
                <span>Message securely relayed! Balkrishan's core will contact you soon.</span>
              </motion.div>
            ) : null}

            <button
              id="contact-submit-btn"
              type="submit"
              disabled={submitting || !formState.name || !formState.email || !formState.message}
              className="flex items-center justify-center gap-2 w-full text-center bg-rose-500 hover:bg-rose-600 disabled:opacity-45 disabled:hover:bg-rose-500 text-black text-xs font-bold py-3 px-4 rounded-xl transition cursor-pointer font-mono uppercase tracking-widest relative z-10 shadow-lg shadow-rose-500/10"
            >
              {submitting ? (
                <>
                  <AlertCircle size={14} className="animate-spin" />
                  <span>Relaying signal...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Transmit Signals</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
