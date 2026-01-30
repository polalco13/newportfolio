"use client";

import { useState, useEffect } from "react";
import {
  Navigation,
  Header,
  About,
  Projects,
  Experience,
  Education,
  Skills,
  Tools,
  Languages,
  Contact,
  Footer,
} from "@/components";

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip Link for accessibility */}
      <a href="#main-content" className="skip-link font-body text-sm">
        Skip to main content
      </a>

      <Navigation isScrolled={isScrolled} />

      <main
        id="main-content"
        className="min-h-screen bg-[var(--color-bg)] py-12 px-5 sm:py-16 sm:px-10"
      >
        <div className="max-w-[680px] mx-auto flex flex-col gap-12 sm:gap-16">
          <Header />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Tools />
          <Languages />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
