import Hero from "./components/hero"
import Projects from "./components/projects"
import Skills from "./components/skills"
import Experience from "./components/experience"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black to-zinc-950 text-white">
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
