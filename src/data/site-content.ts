export type NavItem = {
  label: string;
  href: string;
};

export type ProductItem = {
  title: string;
  category: string;
  description: string;
  capabilities: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type TechnologyItem = {
  title: string;
  summary: string;
  metrics: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#products" },
  { label: "Skills", href: "#technology" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume" },
];

export const keyMetrics = [
  { label: "Current Role", value: "AIML Engineer" },
  { label: "Education", value: "B-Tech CSE" },
  { label: "Timeline", value: "2023-Present" },
  { label: "Major Projects", value: "3" },
];

export const products: ProductItem[] = [
  {
    title: "Harmful Weapons (Custom) Detection System - YOLOv3",
    category: "December 2025",
    description:
      "Developed a real-time detection system to identify guns, rifles, scissors, and knives from images and video streams with live camera support.",
    capabilities:
      "Pre-trained YOLOv3 customization, dataset preprocessing, annotation formatting, bounding boxes with confidence scores",
    githubUrl: "https://github.com/adhiraj808",
    liveUrl: "#",
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
  },
];

export const technologies: TechnologyItem[] = [
  {
    title: "Programming & Machine Learning",
    summary:
      "Core coding and model-building stack used in coursework and project implementation.",
    metrics: "Python | TensorFlow | Scikit-learn",
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
    metrics: "HTML | CSS | JavaScript | MongoDB | SQL | Git | GitHub | VS Code | Jupyter | PowerBI",
  },
];
