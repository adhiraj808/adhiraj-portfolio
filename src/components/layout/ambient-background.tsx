import Dither from "@/components/common/Dither";

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background transition-colors duration-300"
      aria-hidden="true"
    >
      {/* Dynamic interactive WebGL Dither background - Hidden on mobile/tablet, visible on desktop */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        <Dither
          waveSpeed={0.5} // Faster wave speed
          waveFrequency={3} // Higher frequency wave structures
          waveAmplitude={0.3} // Standard amplitude
          waveColor={[0.25, 0.35, 0.85]} // Vibrant neon indigo-blue
          colorNum={4} // Color intensity step levels
          pixelSize={2} // Fine high-tech dither grain
          enableMouseInteraction={true}
          mouseRadius={0.1} // Custom pointer influence radius
        />
      </div>



      {/* Retro scanline, noise, and grid overlays */}
      <div className="hero-noise absolute inset-0 opacity-25" />
      <div className="hero-grid absolute inset-0 opacity-20" />

      {/* Subtle colorful ambient glows blending in the backgrounds */}
      <div className="absolute top-[-15%] left-[-10%] h-[35rem] w-[35rem] rounded-full bg-[var(--hero-glow-cyan)] blur-[140px] transition-colors duration-300" />
      <div className="absolute right-[-15%] bottom-[-20%] h-[32rem] w-[32rem] rounded-full bg-[var(--hero-glow-indigo)] blur-[140px] transition-colors duration-300" />
    </div>
  );
}

