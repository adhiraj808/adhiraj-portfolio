"use client";

import { keyMetrics } from "@/data/site-content";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import introImage from "./images/4thSection-croped.png";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-28 pb-20 md:px-10 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
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
              <div className="flex items-center gap-4 sm:gap-8">
                <h1 className="font-display text-balance text-3xl leading-[1.1] font-semibold text-white min-[400px]:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Adhiraj Mishra
                </h1>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-white/5 backdrop-blur-sm sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 xl:h-52 xl:w-52">
                  <Image
                    src={introImage}
                    alt="Adhiraj Mishra"
                    fill
                    className="object-cover p-1 sm:p-2"
                    priority
                  />
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
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {keyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 + 0.25 }}
                  className="rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-xl"
                >
                  <p className="font-display text-2xl text-cyan-100">{metric.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
