import Dither from "@/components/common/Dither";

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#03050c]"
      aria-hidden="true"
    >
      {/* Dynamic interactive WebGL Dither background */}
      <Dither
        waveSpeed={0.015} // Extremely smooth, slow floating wave
        waveFrequency={2.0} // Broader, cleaner wave structures
        waveAmplitude={0.3}
        waveColor={[0.25, 0.35, 0.85]} // Vibrant neon indigo-blue
        colorNum={5}
        pixelSize={2} // Sleek, fine-grain dither instead of chunky blocks
        enableMouseInteraction={true}
        mouseRadius={1.0}
      />

      {/* Retro scanline, noise, and grid overlays */}
      <div className="hero-noise absolute inset-0 opacity-25" />
      <div className="hero-grid absolute inset-0 opacity-20" />

      {/* Subtle colorful ambient glows blending in the backgrounds */}
      <div className="absolute top-[-15%] left-[-10%] h-[35rem] w-[35rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-[-15%] bottom-[-20%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/10 blur-[140px]" />
    </div>
  );
}

