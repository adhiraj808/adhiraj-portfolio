import pjct1 from "@/assets/mediai.png";
import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  capabilities: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
};

export type SkillItem = {
  title: string;
  summary: string;
  metrics: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const keyMetrics = [
  { label: "Current Role", value: "AIML Engineer" },
  { label: "Education", value: "B-Tech CSE" },
  { label: "Timeline", value: "2023-Present" },
  { label: "Major Projects", value: "3" },
];

export const projects: ProjectItem[] = [
  {
    title: "MediAI – AI Medical Assistant",
    category: "Recent Project",
    description:
      "An AI-powered medical assistant web application built to help users with symptom guidance, general health questions, and skin issue analysis through uploaded images.",
    capabilities:
      "React, Node.js, SQLite, Google Gemini AI, Clerk Authentication",
    githubUrl: "https://github.com/Ankit231ak/Medical_ChatBot_3.0",
    liveUrl: "#",
    imageUrl: pjct1.src,
  },
  {
    title: "Harmful Weapons (Custom) Detection System - YOLOv3",
    category: "December 2025",
    description:
      "Developed a real-time detection system to identify guns, rifles, scissors, and knives from images and video streams with live camera support.",
    capabilities:
      "Pre-trained YOLOv3 customization, dataset preprocessing, annotation formatting, bounding boxes with confidence scores",
    githubUrl: "https://github.com/adhiraj808",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Ping-Pong Game (Multiplayer)",
    category: "July-August 2024",
    description:
      "Built a real-time multiplayer Ping-Pong game with Web Sockets and live game-state synchronization between players.",
    capabilities:
      "Ball physics, paddle movement, scoring logic, HTML + Tailwind CSS + JavaScript frontend, ongoing UI/UX improvements",
    githubUrl: "https://github.com/adhiraj808",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Frontend Development - VKRE Health Website",
    category: "June-August 2024",
    description:
      "Developed and deployed a responsive healthcare website with reusable UI components and production-ready frontend quality.",
    capabilities:
      "HTML, Tailwind CSS, JavaScript, performance optimization, live site: https://vkrehealth-in.vercel.app",
    githubUrl: "https://github.com/adhiraj808",
    liveUrl: "https://vkrehealth-in.vercel.app",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
  },
];

export const skills: SkillItem[] = [
  {
    title: "Programming & Machine Learning",
    summary:
      "Core coding and model-building stack used in coursework and project implementation.",
    metrics: "Python | Pytorch | Scikit-learn",
  },
  {
    title: "Data Analysis",
    summary:
      "Libraries used for cleaning, transforming, visualizing, and understanding data.",
    metrics: "NumPy | Pandas | Matplotlib",
  },
  {
    title: "Web Development & Tools",
    summary:
      "Frontend foundations with database familiarity and practical development tool usage.",
    metrics:
      "HTML | CSS | JavaScript | MongoDB | SQL | Git | GitHub | VS Code | Jupyter | PowerBI",
  },
];
