import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Pol Alcoverro. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/polalco13/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-blue-400"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/pol-alcoverro-sabaté-6519192a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:polalcoverros@gmail.com"
              className="text-gray-400 transition-colors hover:text-blue-400"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
