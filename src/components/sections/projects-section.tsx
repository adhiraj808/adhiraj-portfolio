import { GlassCard } from "@/components/shared/glass-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/data/site-content";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Project work from my current resume."
            description="These projects cover real-time ML detection, multiplayer systems using Web Sockets, and production-ready responsive frontend development."
          />
        </Reveal>

        <div className="mt-12 grid gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <GlassCard className="group relative overflow-hidden p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute top-[-20%] left-[-8%] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
                </div>
                
                {/* Top Corner Edges Links (Always visible on mobile) */}
                <div className="absolute top-0 right-0 flex opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:opacity-100 z-20 overflow-hidden rounded-bl-xl rounded-tr-2xl border-b border-l border-white/10">
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-1.5 bg-black/40 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      <ExternalLink size={14} />
                      Code
                    </Link>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-1.5 border-l border-white/10 bg-cyan-400/20 backdrop-blur-md px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/30"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </Link>
                  )}
                </div>

                <div className="relative flex flex-col md:flex-row gap-6 md:items-stretch pt-10 md:pt-0">
                  <div className="flex-1 space-y-4 flex flex-col justify-center">
                    <div>
                      <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase mb-2">{project.category}</p>
                      <h3 className="font-display text-xl text-white md:text-2xl">{project.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
                      <p className="text-xs text-slate-400/80">{project.capabilities}</p>
                    </div>
                  </div>

                  <div className="group/img relative w-full md:w-64 h-56 md:h-auto rounded-xl overflow-hidden shrink-0 border border-white/5 bg-black/20">
                    {project.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">No Image</div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
