import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 backdrop-blur-xl glass-card-style transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
