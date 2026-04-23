"use client";

import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProductsSection } from "@/components/sections/products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { AmbientBackground } from "./ambient-background";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

export function PortfolioSite() {
  return (
    <SmoothScrollProvider>
      <AmbientBackground />
      <SiteHeader />

      <main className="relative overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TechnologySection />
        <ContactSection />
      </main>

      <SiteFooter />
    </SmoothScrollProvider>
  );
}
