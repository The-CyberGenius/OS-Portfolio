export type AppId = "terminal" | "resume" | "projects" | "controlCenter" | "contact";

export interface DockItem {
  id: AppId;
  label: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  link?: string;
  github?: string;
  category: "AI" | "Web" | "Infrastructure";
  accent: string;
}

export interface Message {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface CommandLineOutput {
  text: string;
  type: "input" | "system" | "error" | "success" | "ai";
}
