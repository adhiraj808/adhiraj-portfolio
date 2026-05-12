"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import introImage from "./images/4thSection-croped.png";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-28 pb-20 md:px-10 md:pt-32 lg:min-h-[90vh] lg:flex lg:items-center">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/8 px-4 py-1.5 text-xs font-semibold tracking-[0.24em] text-cyan-200 uppercase">
              Portfolio Website of Adhiraj Mishra
            </span>

            <div className="space-y-6">
              <div className="flex items-center gap-4 sm:gap-6 lg:block">
                <h1 className="font-display text-balance text-4xl leading-[1.1] font-semibold text-white min-[400px]:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Adhiraj Mishra
                </h1>
                {/* Mobile/Tablet Image: Inline with name */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-cyan-400/30 bg-white/5 backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden">
                  {/* Animated Border for Mobile */}
                  <div className="absolute inset-0 p-[3px] overflow-hidden rounded-xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{
                        background: "conic-gradient(from 0deg, transparent 30%, #5fe8ff 50%, #5fe8ff 70%, transparent 90%)",
                      }}
                      className="absolute inset-[-150%] blur-[2px]"
                    />
                  </div>
                  <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#03050c]">
                    <Image
                      src={introImage}
                      alt="Adhiraj Mishra"
                      fill
                      className="object-cover p-0.5 sm:p-1"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl font-medium text-cyan-100 md:text-3xl">AIML Engineer</p>
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
                  Passionate B-Tech CSE (AIML) student deeply into AI, machine learning, and web
                  development. Built and deployed real-time ML models along with responsive,
                  production-ready web applications.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="rounded-full border border-cyan-300/60 bg-cyan-300/12 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/24"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-200 hover:text-cyan-100"
              >
                Contact Me
              </Link>
              <a
                href="/resume.pdf"
                download="Adhiraj_Mishra_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/60 hover:bg-cyan-400/20"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Desktop Image: Large, prominent, fills the right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex relative justify-end items-center"
          >
            <div className="relative aspect-square w-full max-w-[450px] xl:max-w-[550px]">
              <div className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />
              
              {/* Animated Border Beam Layer */}
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] p-[4px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "conic-gradient(from 0deg, transparent 30%, #5fe8ff 50%, #5fe8ff 70%, transparent 90%)",
                  }}
                  className="absolute inset-[-150%] blur-[3px]"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#03050c] shadow-2xl">
                <Image
                  src={introImage}
                  alt="Adhiraj Mishra"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
