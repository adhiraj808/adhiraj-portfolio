import { GlassCard } from "@/components/shared/glass-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { products } from "@/data/site-content";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ProductsSection() {
  return (
    <section id="products" className="px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Project work from my current resume."
            description="These projects cover real-time ML detection, multiplayer systems using Web Sockets, and production-ready responsive frontend development."
          />
        </Reveal>

        <div className="mt-12 grid gap-6">
          {products.map((product, index) => (
            <Reveal key={product.title} delay={index * 0.08}>
              <GlassCard className="group relative overflow-hidden p-6 md:p-8">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute top-[-20%] left-[-8%] h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
                </div>
                
                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 space-y-3">
                    <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">{product.category}</p>
                    <h3 className="font-display text-xl text-white md:text-2xl">{product.title}</h3>
                    {/* Hide description and capabilities on mobile/tablet */}
                    <div className="hidden md:block space-y-3">
                      <p className="text-sm leading-relaxed text-slate-300">{product.description}</p>
                      <p className="text-xs text-slate-400/80">{product.capabilities}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2 md:flex-col md:pt-0 shrink-0">
                    {product.githubUrl && (
                      <Link
                        href={product.githubUrl}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10 w-full md:w-auto"
                      >
                        <ExternalLink size={14} />
                        GitHub Code
                      </Link>
                    )}
                    {product.liveUrl && (
                      <Link
                        href={product.liveUrl}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-xs font-semibold text-cyan-100 transition hover:border-cyan-400/60 hover:bg-cyan-400/20 w-full md:w-auto"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </Link>
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
