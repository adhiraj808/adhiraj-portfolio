import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";
import { Reveal } from "@/components/shared/reveal";

const pillars = [
  {
    title: "Career Objective",
    text: "Driven by AI, machine learning, and web development with a focus on creating practical solutions that actually matter.",
  },
  {
    title: "Education",
    text: "B-Tech in Computer Science and Engineering (AIML), Sushant University, Gurugram (2023-Present).",
  },
  {
    title: "Role",
    text: "AIML Engineer profile with hands-on project work in real-time ML systems and responsive frontend development.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="About Me"
            title="Student engineer building with AI, ML, and modern web technologies."
            description="I focus on solving real problems through deployable applications, continuous learning, and practical implementation."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
