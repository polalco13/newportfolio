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
import { contact, personalInfo, skills } from "@/data";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: "Software Engineer",
  url: "https://polalcoverro.com",
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "Spain",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitat Politecnica de Catalunya - FIB",
  },
  knowsAbout: [
    ...skills.frontend,
    ...skills.backend,
    "Software Engineering",
    "Full-Stack Development",
  ],
  sameAs: [contact.github, contact.linkedin],
};

export default function Portfolio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <a href="#main-content" className="skip-link font-body text-sm">
        Skip to main content
      </a>

      <Navigation />

      <main
        id="main-content"
        className="min-h-screen bg-[var(--color-bg)] px-4 py-8 sm:px-8 sm:py-14 lg:px-10"
      >
        <div className="mx-auto flex max-w-[1040px] flex-col gap-12 sm:gap-16 lg:gap-20">
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
