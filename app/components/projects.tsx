"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: "Grade Tracker",
      description:
        "A comprehensive mobile application for students to track assignments, grades, and academic progress with real-time updates. Built with React Native and Firebase for seamless cross-platform performance.",
      image: "/images/notas-app.png",
      detailImage: "/images/notas-app-detail.png",
      tags: ["React Native", "TypeScript", "Firebase"],
      github: "https://github.com/polalco13/",
      demo: "https://gradetracker.es/",
    },
    {
      title: "Busos Penedès",
      description:
        "Real-time bus tracking application with route planning, schedules for public transportation in the Penedès region. Leverages Firebase for real-time data synchronization.",
      image: "/images/bus-app.png",
      detailImage: "/images/busos-penedes-detail.png",
      tags: ["React Native", "TypeScript", "Firebase"],
      github: "https://github.com/polalco13/",
      demo: "https://busos-alco.vercel.app/",
    },
  ]

  return (
    <section id="projects" className="relative py-24">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl gradient-border inline-block">Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Showcasing my React Native applications built with TypeScript and Firebase
          </p>
        </motion.div>
        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full overflow-hidden bg-zinc-900/70 border-zinc-800 text-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden h-64 sm:h-72">
                  <img
                    src={project.detailImage || "/placeholder.svg"}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="mb-6 text-gray-300 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-900/30 text-blue-100 hover:bg-blue-800/40">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 gap-2"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 gap-2"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
