"use client";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Mail, MapPin, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

const defaultForm: FormState = {
  name: "",
  email: "",
  company: "",
  interest: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus(payload.message ?? "Unable to submit inquiry. Please try again.");
        return;
      }

      setStatus("Message received. I will get back to you soon.");
      setForm(defaultForm);
    } catch {
      setStatus("Network issue detected. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
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
                    <p className="mt-1 text-sm text-slate-400">Yamuna Nagar, Haryana, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">Email</p>
                    <a
                      href="mailto:adhiraj.230btccse028@sushantuniversity.edu.in"
                      className="mt-1 block text-sm text-slate-400 transition hover:text-cyan-300 break-words"
                    >
                      adhiraj.230btccse028@sushantuniversity.edu.in
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

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="company">Organization</label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(event) => setForm((curr) => ({ ...curr, company: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                      placeholder="Company or Institution"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200" htmlFor="interest">Interest</label>
                    <select
                      id="interest"
                      value={form.interest}
                      onChange={(event) => setForm((curr) => ({ ...curr, interest: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                    >
                      <option value="" className="bg-slate-900">Select interest</option>
                      <option value="AI/ML Project" className="bg-slate-900">AI/ML Project</option>
                      <option value="Web Development" className="bg-slate-900">Web Development</option>
                      <option value="Internship" className="bg-slate-900">Internship</option>
                      <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                  </div>
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
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>

                {status && (
                  <p className={`text-sm ${status.includes("successfully") ? "text-cyan-400" : "text-red-400"}`}>
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
