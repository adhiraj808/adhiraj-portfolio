"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { GradualBlur } from "@/components/shared/gradual-blur";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { useState, useEffect } from "react";
import { AmbientBackground } from "./ambient-background";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

export function PortfolioSite() {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // If we're within 100px of the bottom, consider it "at the bottom"
      setIsAtBottom(Math.ceil(scrollTop + windowHeight) >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SmoothScrollProvider>
      <AmbientBackground />
      <SiteHeader />

      {/* Edge Blur Effects */}
        <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={2}
        curve="bezier"
        zIndex={50}
        style={{ 
          opacity: isAtBottom ? 0 : 1,
          transition: "opacity 0.5s ease-out"
        }}
      />


      <main className="relative overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}
