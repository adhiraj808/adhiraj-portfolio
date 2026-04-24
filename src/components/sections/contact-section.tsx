"use client";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Mail, MapPin, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const defaultForm: FormState = {
  name: "",
  email: "",
  topic: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [status, setStatus] = useState<string>("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio Inquiry: ${form.topic}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Message:\n${form.message}`
    );

    // This opens the user's default email client
    window.location.href = `mailto:adhirajmishra99@gmail.com?subject=${subject}&body=${body}`;

    setStatus("Opening your email application...");
    
    // Clear status after a short delay
    setTimeout(() => {
      setStatus("");
      setForm(defaultForm);
    }, 3000);
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 md:w-auto"
                >
                  Send Message
                  <Send size={16} />
                </button>

                {status && (
                  <p className="text-sm text-cyan-400">
                    {status}
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
