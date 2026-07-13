import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, Code, Sparkles, Server, Newspaper, ArrowLeft } from "lucide-react";
import { Project } from "../types";

const PROJECTS_DATA: Project[] = [
  {
    id: "ai-chat",
    title: "AI Chat Application",
    subtitle: "Advanced Multi-Turn AI Conversations",
    description: "Built an intelligent, highly responsive conversational portal powered by state-of-the-art LLM architectures.",
    longDescription: "Designed and engineered a production-grade conversational AI node. The application supports continuous chat histories, system prompt injection, response optimization, and is wrapped in a highly polished glassmorphism web shell. It features advanced frontend debounce systems to manage rapid streaming text updates and maintains sub-second latency.",
    tags: ["React", "Express", "Node.js", "Gemini API", "Tailwind CSS"],
    features: [
      "Dynamic chat memories and token-safe conversation truncations",
      "Robust state management preserving conversation structures on hard-refreshes",
      "Polished markdown renderer with copy-code blocks and latex formulas",
      "Seamless client-to-server API proxy masking backend keys completely"
    ],
    category: "AI",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "ai-rag",
    title: "AI RAG System",
    subtitle: "Retrieval-Augmented Intelligent Agent",
    description: "Built a document-informed contextual generator that restricts response domains to custom enterprise files.",
    longDescription: "Developed a Retrieval-Augmented Generation (RAG) platform designed to let organizations interact securely with their custom knowledge bases. Implemented text-chunking algorithms, vector embeddings pipelines, and search weighting systems. This guarantees the LLM answers queries strictly from user-uploaded PDFs, TXT, or markdown data pools, preventing hallucinations.",
    tags: ["Python", "Vector DB", "Embeddings", "RAG Pipeline", "API Integration"],
    features: [
      "Custom chunk overlapping algorithms for maximum semantic retention",
      "Vector database semantic search with threshold filtering",
      "Automated system reference tagging pointing to original text sources",
      "Dual-channel contextual pipeline combining hybrid lexical and semantic lookups"
    ],
    category: "AI",
    accent: "from-fuchsia-500 to-indigo-600",
  },
  {
    id: "genius-dev",
    title: "Genius Developers",
    subtitle: "Cloud Hosting, Virtual Node & DNS Engine",
    description: "Managed full-stack web products while configuring bare-metal Ubuntu boxes on AWS with DNS routing.",
    longDescription: "A flagship cloud staging platform. Manages multiple custom domains and microservices. Handled server provisioning (AWS EC2 instances), configured SSH tunnels, reverse proxy routing (Nginx / Apache), let's encrypt SSL renewals, and custom DNS records to build and maintain multiple live customer systems.",
    tags: ["AWS EC2", "Ubuntu Linux", "Nginx", "DNS Routing", "SSL", "Cloud Management"],
    features: [
      "Configured robust web servers on raw Ubuntu Server environments",
      "Full SSH setup, security group firewalls, and active load monitoring",
      "Automated DNS routing mappings with near-zero cold starts",
      "Pioneered secure automated backups protecting persistent DB volumes"
    ],
    link: "https://geniusdevelopers.space",
    category: "Infrastructure",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "jg-news",
    title: "JG News Portal",
    subtitle: "High-Traffic News Administration & Feed",
    description: "A fast, fully responsive news channel featuring active categories, database optimization, and high performance.",
    longDescription: "Developed, optimized, and deployed an online media news outlet. Implemented complex categorical indexing, a database-driven administration backoffice, custom media content loaders, and cached query structures to handle high traffic spikes seamlessly.",
    tags: ["PHP", "MySQL", "JavaScript", "Responsive Design", "SEO Engine"],
    features: [
      "Multi-category article indexes with sub-second database queries",
      "Comprehensive rich-text editor administration suite for editorial staff",
      "Tailored SEO layout markup driving high clickthrough organic reach",
      "Optimized media asset processing with progressive image loaders"
    ],
    link: "https://jgnews.live",
    category: "Web",
    accent: "from-rose-500 to-amber-600",
  }
];

export default function AppProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI":
        return <Sparkles className="w-4 h-4 text-fuchsia-400" />;
      case "Web":
        return <Newspaper className="w-4 h-4 text-amber-400" />;
      case "Infrastructure":
        return <Server className="w-4 h-4 text-emerald-400" />;
      default:
        return <Code className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div id="projects-core" className="p-6 md:p-8 text-white select-text max-w-6xl mx-auto h-full">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold">
                LABS & PROTOFILES
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                Engineering Showcase
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Click on any system deployment below to read the core technical blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((project) => (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-white/25 transition-all duration-300 hover:bg-white/10 cursor-pointer shadow-lg overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  {/* Subtle background glow */}
                  <span className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${project.accent} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/5 text-[10px] font-bold tracking-wider font-mono uppercase text-white/80">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition">
                        {project.title}
                      </h3>
                      <p className="text-xs font-medium text-neutral-400 font-mono mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4 relative z-10">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-neutral-400">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-neutral-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Back button */}
            <button
              id="project-back-btn"
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Showcase</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
              {/* Background gradient blur */}
              <span className={`absolute -right-40 -top-40 w-96 h-96 rounded-full bg-gradient-to-br ${selectedProject.accent} opacity-15 blur-3xl`} />

              {/* Left description column */}
              <div className="md:col-span-2 space-y-5 relative z-10">
                <div className="space-y-2">
                  <span className="flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full bg-white/10 border border-white/5 text-[10px] font-bold font-mono uppercase tracking-wider">
                    {getCategoryIcon(selectedProject.category)}
                    {selectedProject.category} Blueprint
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    {selectedProject.title}
                  </h1>
                  <p className="text-xs font-mono text-emerald-400 font-bold">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-neutral-300">
                    Deployment Specification
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-neutral-300">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_5px_#10b981]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right metadata panel */}
              <div className="space-y-5 bg-white/5 border border-white/5 p-5 rounded-xl flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                      Platform Tech stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                      Status
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span>Active Production</span>
                    </div>
                  </div>
                </div>

                {/* External links */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  {selectedProject.link && (
                    <a
                      id={`project-live-btn-${selectedProject.id}`}
                      href={selectedProject.link}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex items-center justify-center gap-2 w-full text-center bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                    >
                      <ArrowUpRight size={14} />
                      <span>Explore Live System</span>
                    </a>
                  )}
                  <a
                    id={`project-git-btn-${selectedProject.id}`}
                    href="https://github.com/The-CyberGenius"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 w-full text-center bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                  >
                    <Github size={14} />
                    <span>Inspect Repositories</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
