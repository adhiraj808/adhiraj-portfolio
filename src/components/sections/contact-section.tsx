"use client";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
  honeypot: string; // Anti-spam field
};

const defaultForm: FormState = {
  name: "",
  email: "",
  topic: "",
  message: "",
  honeypot: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [status, setStatus] = useState<{ type: "success" | "error" | "loading" | null; message: string }>({
    type: null,
    message: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent! I'll get back to you soon." });
        setForm(defaultForm);
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "Failed to connect to the server." });
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus({ type: null, message: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something together."
            description="Use the form below to reach out for projects, internships, or technical collaborations. I'll get back to you within 24 hours."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row">
          <Reveal className="w-full lg:w-1/3">
            <div className="rounded-3xl border border-white/12 bg-white/5 p-6 md:p-8 backdrop-blur-xl h-fit">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">Contact Information</p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Location</p>
                    <p className="mt-1 text-sm text-slate-400">Haryana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">Email</p>
                    <a
                      href="mailto:adhirajmishra99@gmail.com"
                      className="mt-1 block text-sm text-slate-400 transition hover:text-cyan-300 break-words"
                    >
                      adhirajmishra99@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-5 md:p-6">
                <p className="text-sm font-semibold text-cyan-200 uppercase tracking-wider">Currently Seeking</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Opportunities in AI/ML engineering, full-stack web development, and research internships.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="w-full lg:w-2/3">
            <div className="rounded-3xl border border-white/12 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="name">Name</label>
                    <input
                      id="name"
                      required
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm((curr) => ({ ...curr, name: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="email">Email</label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((curr) => ({ ...curr, email: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200" htmlFor="topic">Topics</label>
                  <input
                    id="topic"
                    required
                    type="text"
                    value={form.topic}
                    onChange={(event) => setForm((curr) => ({ ...curr, topic: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                    placeholder="What would you like to discuss? (e.g. AI/ML, Web Dev, Robotics)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(event) => setForm((curr) => ({ ...curr, message: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:bg-white/10 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
                >
                  {status.type === "loading" ? (
                    <>
                      Sending...
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

                {status.message && (
                  <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-cyan-400"}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
