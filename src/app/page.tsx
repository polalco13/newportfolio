import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Plus,
} from "lucide-react";
import {
  contact,
  education,
  experience,
  languages,
  personalInfo,
  skills,
} from "@/data";
import { PortfolioNav, CopyEmail } from "@/components/PortfolioControls";
import { caseStudies } from "@/data/case-studies";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: personalInfo.name,
            url: "https://polalcoverro.com",
            jobTitle: "Software Engineer & Full-Stack Developer",
            email: contact.email,
            sameAs: [contact.github, contact.linkedin],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Universitat Politècnica de Catalunya",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barcelona",
              addressCountry: "ES",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PortfolioNav />
      <main id="main">
        <section className="hero container" id="intro" aria-labelledby="hero-title">
          <div className="hero-topline">
            <p className="eyebrow">Software engineer & full-stack developer</p>
            <span className="availability">
              <span className="status-dot" /> Open to opportunities
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                Thoughtful code.
                <br />
                <span>Useful products.</span>
              </h1>
              <p className="hero-intro">
                I’m Pol Alcoverro, a software engineer in Barcelona.
                <br className="desktop-break" /> I turn complex problems into
                clear, reliable web experiences — from the first interface to
                the systems behind it.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="button button-dark">
                  View projects <ArrowDown size={17} />
                </a>
                <a
                  href="/Pol-Alcoverro-CV.pdf"
                  download
                  className="button button-text"
                >
                  Download CV <Download size={17} />
                </a>
              </div>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-frame">
                <Image
                  src="/profile_alco.png"
                  alt="Pol Alcoverro"
                  width={1024}
                  height={1536}
                  priority
                  sizes="(max-width: 600px) 96px, (max-width: 1000px) 230px, 280px"
                  className="portrait"
                />
                <span className="portrait-symbol" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="portrait-caption">
                <span>Pol Alcoverro</span>
                <span>
                  <MapPin size={13} /> Barcelona, ES
                </span>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-stack">
              <span className="muted">Built with intention. Built with</span>
              <span>React</span>
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Node.js</span>
            </div>
            <a className="scroll-link" href="#projects">
              A little further down <ArrowDownRight size={16} />
            </a>
          </div>
        </section>
        <section
          className="work-section section-pad"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow section-index">01 / Selected work</p>
                <h2 id="projects-title">Built to be used.</h2>
              </div>
              <p>
                Real problems. Considered solutions.
                <br />A selection of products I’ve brought to life.
              </p>
            </div>
            <div className="project-grid">
              {caseStudies.map((project, index) => (
                <article className="project-card" key={project.slug}>
                  <a
                    className={`project-visual ${project.slug}`}
                    href={project.liveUrl}
                    {...external}
                    title={`Visit ${project.title} (opens in a new tab)`}
                  >
                    <div className="project-visual-top">
                      <span>{project.category}</span>
                      <span className="project-number">0{index + 1}</span>
                    </div>
                    <div className="browser-frame">
                      <div className="browser-toolbar">
                        <span className="browser-dots" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                        </span>
                        <span>{project.domain}</span>
                        <ArrowUpRight size={11} />
                      </div>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        width={1440}
                        height={1000}
                        loading="eager"
                        sizes="(max-width: 700px) 92vw, 46vw"
                        className="project-image"
                      />
                    </div>
                    <span className="visit-project">
                      Visit project <ArrowUpRight size={15} />
                    </span>
                  </a>
                  <div className="project-title-row">
                    <h3>
                      <a href={project.liveUrl} {...external}>
                        {project.title}
                      </a>
                    </h3>
                    <ArrowUpRight size={23} aria-hidden="true" />
                  </div>
                  <p className="project-description">{project.summary}</p>
                  <ul className="tags" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <details
                    className="case-study"
                    id={`case-study-${project.slug}`}
                  >
                    <summary>
                      Behind the build <Plus size={17} />
                    </summary>
                    <div className="case-study-content">
                      <div>
                        <h4>The problem</h4>
                        <p>{project.problem}</p>
                      </div>
                      <div>
                        <h4>My role</h4>
                        <p>{project.role}</p>
                      </div>
                      <div>
                        <h4>The approach</h4>
                        <p>{project.process}</p>
                      </div>
                      <div>
                        <h4>The outcome</h4>
                        <p>{project.outcome}</p>
                      </div>
                      <div className="case-links">
                        <a href={project.liveUrl} {...external}>
                          Explore live project <ArrowUpRight size={15} />
                        </a>
                        {project.githubUrl && (
                          <a href={project.githubUrl} {...external}>
                            Source code <Github size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
            <div className="work-footer">
              <p>Curious about the code behind the work?</p>
              <a href={contact.github} {...external}>
                Find me on GitHub <Github size={18} />
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <section
          className="experience-section container section-pad"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">02 / Experience</p>
              <h2 id="experience-title">
                From learning.
                <br />
                To delivering.
              </h2>
            </div>
            <p>
              Hands-on experience in product teams,
              <br />
              academic systems, and business software.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-date">
                  <span>{job.dates.replaceAll(" - ", " — ")}</span>
                  <span className="job-type">{job.type}</span>
                </div>
                <div className="experience-role">
                  <span className="job-number">
                    0{experience.length - index}
                  </span>
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>
                <div className="experience-detail">
                  <p>{job.description}</p>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <a
            className="inline-link resume-link"
            href="/Pol-Alcoverro-CV.pdf"
            download
          >
            Download my CV <Download size={16} />
          </a>
        </section>
        <section
          className="about-section section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div>
              <p className="eyebrow section-index">03 / A bit about me</p>
              <h2 id="about-title">
                Curious by nature.
                <br />
                Engineer by training.
              </h2>
              <div className="about-location">
                <MapPin size={17} />
                <span>Barcelona, Spain · Open to remote teams</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I like understanding how things work.
                <br />I like making them work better even more.
              </p>
              <p>{personalInfo.about}</p>
              <p>
                My work connects thoughtful interfaces with the systems that
                power them. I’m looking for a team where I can contribute, keep
                learning, and take ownership of meaningful work.
              </p>
              <div className="education-card">
                <span className="small-label">Education</span>
                <h3>Computer Engineering</h3>
                <p>FIB · Universitat Politècnica de Catalunya</p>
                <div className="education-meta">
                  <span>Software Engineering major</span>
                  <span>{education[0].years}</span>
                </div>
                <div className="thesis">
                  <span>
                    Final thesis · <strong>{education[0].grade}</strong>
                  </span>
                  <p>{education[0].thesis}</p>
                </div>
              </div>
              <div className="languages">
                {languages.map((language) => (
                  <span key={language.name}>
                    <strong>{language.name}</strong> {language.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="skills-section container section-pad"
          id="skills"
          aria-labelledby="skills-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">04 / My toolkit</p>
              <h2 id="skills-title">
                The right tools.
                <br />A thoughtful approach.
              </h2>
            </div>
            <p>
              Comfortable across the stack.
              <br />
              Especially at home on the frontend.
            </p>
          </div>
          <div className="skills-grid">
            <div className="skill-group">
              <span className="skill-number">01</span>
              <h3>Interfaces that make sense.</h3>
              <p>
                Responsive applications, reusable components, and clear user
                journeys.
              </p>
              <ul className="skill-tags">
                {skills.frontend.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="skill-group">
              <span className="skill-number">02</span>
              <h3>Systems that hold up.</h3>
              <p>
                APIs, relational data, and containerized services that support
                the product.
              </p>
              <ul className="skill-tags">
                {skills.backend.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="skill-group">
              <span className="skill-number">03</span>
              <h3>Strong engineering foundations.</h3>
              <p>
                Typed code, collaborative development, and a practical approach
                to delivery.
              </p>
              <ul className="skill-tags">
                {[...skills.languages, "Git", "Agile / Scrum"].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="contact-top">
              <p className="eyebrow">05 / What’s next?</p>
              <span className="availability">
                <span className="status-dot" /> Available for frontend &
                full-stack roles
              </span>
            </div>
            <div className="contact-main">
              <div>
                <h2 id="contact-title">
                  Good work starts
                  <br />
                  with a conversation<span>.</span>
                </h2>
                <p>
                  Have a role, a project, or an interesting challenge?
                  <br />
                  I’d love to hear about it.
                </p>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="contact-arrow"
                aria-label="Contact Pol by email"
              >
                <ArrowUpRight strokeWidth={1.2} />
              </a>
            </div>
            <div className="contact-bottom">
              <div className="email-group">
                <a className="email-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                <CopyEmail email={contact.email} />
              </div>
              <div className="contact-socials">
                <a href={contact.linkedin} {...external}>
                  LinkedIn <Linkedin size={17} />
                  <ArrowUpRight size={15} />
                </a>
                <a href={contact.github} {...external}>
                  GitHub <Github size={17} />
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a
          className="wordmark"
          href="#"
          aria-label="pa. — Pol Alcoverro, back to top"
        >
          pa<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Pol Alcoverro</p>
        <span>Made with care. Built in Barcelona.</span>
        <a href="#main">
          Back to top <ArrowRight size={15} className="up-arrow" />
        </a>
      </footer>
    </>
  );
}
