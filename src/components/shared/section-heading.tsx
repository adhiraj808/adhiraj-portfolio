import { cn } from "@/library/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.26em] text-cyan-300 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance text-3xl leading-tight font-semibold text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
        {description}
      </p>
    </header>
  );
}
