import { cn } from "@/library/utils";
import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/12 bg-white/6 p-6 backdrop-blur-xl",
        "shadow-[0_20px_60px_-30px_rgba(13,179,255,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
