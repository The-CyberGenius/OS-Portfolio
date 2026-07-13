import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Mail, Phone, MapPin, Code2, Cpu, Cloud, Wrench, Sparkles, BrainCircuit } from "lucide-react";

export default function AppBentoResume() {
  const skills = {
    programming: ["React", "Vite", "Tailwind CSS", "JavaScript", "TypeScript", "HTML5", "CSS3", "PHP"],
    ai: ["AI Agents", "RAG Systems", "Prompt Engineering", "AI-Assisted Development"],
    cloud: ["AWS EC2", "Ubuntu Linux", "SSH", "Git & GitHub", "DNS Routing", "Domain Setup", "Vercel"],
    support: ["Hardware Diagnostics", "Networking", "Software Deploy", "Windows/OS Setup", "SysAdmin"]
  };

  const strengths = [
    "Research-Driven Problem Solving",
    "AI-Assisted Development",
    "Fast Learner & Self-Taught",
    "Analytical & Troubleshooting",
    "Adaptability & Team Collaboration"
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <motion.div
      id="bento-resume-root"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-8 space-y-6 select-text text-white max-w-6xl mx-auto"
    >
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold">
            Software Developer & AI Engineer
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
            BALKRISHAN PRAJAPAT
          </h1>
          <p className="text-neutral-400 mt-2 text-sm max-w-xl">
            A research-driven software builder specializing in fullstack engineering, persistent AI workflows, and active cloud administration.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs text-neutral-400 shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-2 hover:text-emerald-400 transition">
            <Mail size={14} className="text-emerald-400" />
            <a href="mailto:sshivaprajapat@gmail.com">sshivaprajapat@gmail.com</a>
          </div>
          <div className="flex items-center gap-2 hover:text-emerald-400 transition">
            <Phone size={14} className="text-emerald-400" />
            <a href="tel:+918955256878">+91 8955256878</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-emerald-400" />
            <span>Rajasthan, India</span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Box 1: Summary Statement */}
        <motion.div
          id="bento-summary"
          variants={itemVariants}
          className="md:col-span-2 bg-gradient-to-br from-neutral-900/60 to-black/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-3">
              <Sparkles size={18} />
              <h3 className="text-xs uppercase font-bold tracking-wider font-mono">Professional Persona</h3>
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-3 tracking-tight">
              Bridging the Gap Between Code, AI Automation, and Cloud Systems
            </h2>
            <p className="text-sm leading-relaxed text-neutral-400">
              Graduating as a computer applications specialist, I dedicated my focus to the modern intersection of traditional development and intelligence frameworks. I don't just write templates; I deploy responsive solutions, establish automated API systems, and configure secure linux nodes on EC2. Problem-solving is my primary framework, driven heavily by fast research, deep-diving documentation, and AI-assisted velocity.
            </p>
          </div>
          <div className="mt-4 border-t border-white/5 pt-3 flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>💻 100% committed</span>
            <span>⚡ Built for Scale</span>
          </div>
        </motion.div>

        {/* Box 2: Education Card */}
        <motion.div
          id="bento-education"
          variants={itemVariants}
          className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <GraduationCap size={18} />
              <h3 className="text-xs uppercase font-bold tracking-wider font-mono">Academic Track</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full">
                  2021 — 2024
                </span>
                <h4 className="text-base font-bold tracking-tight mt-2 text-neutral-100">
                  Bachelor of Computer Applications (BCA)
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Maharaja Ganga Singh University (MGSU), Bikaner
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-white/5 pt-3.5">
                <Award size={16} className="text-emerald-400" />
                <span className="text-xs text-emerald-400 font-mono font-bold uppercase">First Division Graduate</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono mt-4">
            Graduated: May 2024
          </p>
        </motion.div>

        {/* Box 3: Skills Bento */}
        <motion.div
          id="bento-skills"
          variants={itemVariants}
          className="md:col-span-3 bg-neutral-900/30 border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 text-emerald-400 mb-4">
            <BrainCircuit size={18} />
            <h3 className="text-xs uppercase font-bold tracking-wider font-mono">Technical Weapons Loadout</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Programming */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 font-mono border-b border-white/5 pb-1">
                <Code2 size={13} className="text-cyan-400" />
                <span>Frontend & Logic</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.programming.map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* AI */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 font-mono border-b border-white/5 pb-1">
                <Cpu size={13} className="text-indigo-400" />
                <span>AI Engineering</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.ai.map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 font-mono border-b border-white/5 pb-1">
                <Cloud size={13} className="text-emerald-400" />
                <span>Cloud & DevOps</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.cloud.map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* IT Support */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 font-mono border-b border-white/5 pb-1">
                <Wrench size={13} className="text-amber-400" />
                <span>SysAdmin & IT</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.support.map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-amber-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Box 4: Strengths */}
        <motion.div
          id="bento-strengths"
          variants={itemVariants}
          className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 text-rose-400 mb-3">
            <BookOpen size={18} />
            <h3 className="text-xs uppercase font-bold tracking-wider font-mono">Personal Strengths</h3>
          </div>
          <ul className="space-y-2.5">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Box 5: Career Objective */}
        <motion.div
          id="bento-objective"
          variants={itemVariants}
          className="md:col-span-2 bg-gradient-to-tr from-neutral-900/50 to-neutral-900/20 border border-white/5 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-2">Career Objective</h3>
            <p className="text-sm leading-relaxed text-neutral-300">
              "To contribute my technical expertise in Software Development, Artificial Intelligence, and IT Support while continuously learning emerging technologies and building reliable, scalable, and highly impactful solutions."
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-4 text-[11px] font-mono text-neutral-400">
            <div>
              <span className="text-neutral-500 uppercase block text-[9px] tracking-wider">Languages</span>
              <span className="text-neutral-200">Hindi (Native), English (Working Proficiency)</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block text-[9px] tracking-wider">Current Timezone</span>
              <span className="text-neutral-200">Asia/Kolkata (IST)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
