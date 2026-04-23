"use client";

import { navItems } from "@/data/site-content";
import { cn } from "@/library/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
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
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl md:px-6",
          isScrolled && "border-cyan-300/25 bg-black/50",
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
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = id === activeSection;

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
            })}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20 lg:inline-flex"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setIsMobileOpen((value) => !value)}
            className="inline-flex rounded-full border border-white/15 bg-white/5 p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMobileOpen ? (
          <nav className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = id === activeSection;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white",
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
