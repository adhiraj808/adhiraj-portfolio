"use client";

import { navItems } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    // Determine initial theme on client mount
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => {
        try {
          return document.querySelector(item.href);
        } catch {
          return null;
        }
      })
      .filter((element): element is Element => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [isMobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <motion.div
        initial={{ y: -16, opacity: 5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "mx-auto max-w-7xl rounded-2xl border border-(--header-border) bg-(--header-bg) px-4 py-3 backdrop-blur-xl md:px-6 transition-all duration-300",
          isScrolled &&
            "border-( -- header-border-scrolled)' bg-(--header-bg-scrolled)",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="#home" className="flex items-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
            <span className="font-display text-sm tracking-[0.28em] text-white uppercase md:text-base">
              AM
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {/* Theme Toggle Button (Desktop - before nav links) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="mr-2 inline-flex rounded-full border border-(--button-ghost-border) bg-(--button-ghost-bg) p-2 text-slate-300 hover:text-white transition hover:bg-(--button-ghost-hover-bg) cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {navItems.map((item) => {
              const isHash = item.href.startsWith("#");
              const isAsset = item.href.includes(".");
              const id = isHash ? item.href.replace("#", "") : "";
              const isActive = isHash ? id === activeSection : false;

              if (isHash) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white",
                      isActive && "bg-white/10 text-cyan-200",
                    )}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={isAsset ? "_blank" : undefined}
                  rel={isAsset ? "noopener noreferrer" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white",
                    isActive && "bg-white/10 text-cyan-200",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            {/* Theme Toggle Button (Mobile) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex rounded-full border border-(--button-ghost-border) bg-(--button-ghost-bg) p-2 text-slate-300 hover:text-white transition hover:bg-(--button-ghost-hover-bg) cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen((value) => !value)}
              className="inline-flex rounded-full border border-(--button-ghost-border)] bg-(--button-ghost-bg) p-2 text-slate-300 hover:text-white transition hover:bg-(--button-ghost-hover-bg) cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMobileOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-(--header-border) pt-4 lg:hidden">
            {navItems.map((item) => {
              const isHash = item.href.startsWith("#");
              const isAsset = item.href.includes(".");
              const id = isHash ? item.href.replace("#", "") : "";
              const isActive = isHash ? id === activeSection : false;

              if (isHash) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-(--button-ghost-bg) hover:text-white",
                      isActive && "bg-white/10 text-cyan-100",
                    )}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={isAsset ? "_blank" : undefined}
                  rel={isAsset ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-(--button-ghost-bg) hover:text-white",
                    isActive && "bg-white/10 text-cyan-100",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        ) : null}
      </motion.div>
    </header>
  );
}
