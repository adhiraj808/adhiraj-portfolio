"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050c] px-6 pt-32 pb-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          <h1 className="font-display mt-8 text-4xl font-bold text-white md:text-6xl">
            My Resume
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Check out the lastest version of my CV.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="/resume.pdf"
              download="Adhiraj_Mishra_Resume.pdf"
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-cyan-100"
            >
              <Download size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              Download Resume (PDF)
            </a>
          </div>


        </motion.div>
      </div>
    </main>
  );
}
