export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-noise absolute inset-0 opacity-40" />
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute top-[-15%] left-[-10%] h-[35rem] w-[35rem] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute right-[-15%] bottom-[-20%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="absolute top-[35%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-[140px]" />
    </div>
  );
}
