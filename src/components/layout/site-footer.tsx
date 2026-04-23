import { ExternalLink, Mail, User } from "lucide-react";

const footerLinks = [
  { label: "Projects", href: "#products" },
  { label: "Skills", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl tracking-tight text-white">ADHIRAJ MISHRA</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            AIML Engineer | B-Tech CSE (AIML) student building practical AI and web solutions.
            Dedicated to solving complex problems through intelligent systems.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex gap-4">
            <a 
              href="https://github.com/adhirajmishra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
              aria-label="GitHub"
            >
              <ExternalLink size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/adhiraj-mishra502" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
              aria-label="LinkedIn"
            >
              <User size={18} />
            </a>
            <a 
              href="mailto:adhiraj.230btccse028@sushantuniversity.edu.in" 
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 transition hover:text-cyan-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Adhiraj Mishra. Built with Next.js & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
