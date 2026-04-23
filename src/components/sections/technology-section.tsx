"use client";

import { GlassCard } from "@/components/shared/glass-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const skills = [
  { category: "Machine Learning", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks"] },
  { category: "Data Science", items: ["Python", "Pandas", "NumPy", "Data Visualization"] },
  { category: "AI Tools", items: ["OpenAI", "Hugging Face", "NLTK", "Computer Vision"] },
  { category: "Cloud & MLOps", items: ["AWS SageMaker", "Docker", "MLflow", "Kubernetes"] },
];

const techStack = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
];

export function TechnologySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="technology" className="px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Technical Stack"
            title="Advanced tools and languages I use to build."
            description="My technical expertise across AI, ML, and Modern Web Development."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start p-4 sm:p-6">
              {/* <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  As an Engineering student passionate about Artificial Intelligence and Machine Learning, I dive deep into building intelligent systems that learn, adapt, and solve real-world problems.
                  My expertise spans designing scalable, secure systems and leveraging deep learning techniques to push the boundaries of what AI can achieve.
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div> */}

              <div className="space-y-6">
                <div className={`grid gap-6 sm:grid-cols-2 ${!isExpanded ? 'max-md:h-[300px] max-md:overflow-hidden' : ''} transition-all duration-500`}>
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.category} className="p-6 rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur-sm">
                      <h3 className="font-semibold mb-4 text-lg text-white">{skillGroup.category}</h3>
                      <ul className="space-y-2">
                        {skillGroup.items.map((skill) => (
                          <li key={skill} className="text-slate-400 text-sm">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Mobile Read More Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex md:hidden items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 bg-white/5 text-cyan-300 font-semibold transition hover:bg-white/10"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp size={18} /></>
                  ) : (
                    <>Read More <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
