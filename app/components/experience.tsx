"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Briefcase } from "lucide-react"

export default function Experience() {
  const education = [
    {
      degree: "Computer Engineering",
      institution: "Universitat Politècnica de Catalunya (UPC)",
      period: "2021 - Present",
      description:
        "Currently pursuing a Bachelor’s degree in Computer Engineering with a specialization in software development, algorithm design, and system architecture.",
    },
    {
      degree: "Scientific Baccalaureate",
      institution: "Institut Intermunicipal del Penedès",
      period: "2019 - 2021",
      description:
        "Completed a Scientific Baccalaureate focusing on advanced mathematics, physics, and technological applications at Institut Intermunicipal del Penedès in Sant Sadurní d’Anoia.",
    },
  ]

  const experiences = [
    {
      title: "Junior Software Engineer",
      company: "GooApps",
      period: "2025 - Present",
      description:
        "Designing, developing, and maintaining mobile applications using React Native and Angular, with an emphasis on real-time features and delivering production-ready solutions.",
    },
  ]

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl gradient-border inline-block">
            Studies & Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">Academic background and professional journey</p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger
                value="education"
                className="flex items-center gap-2 data-[state=active]:bg-blue-900/30 data-[state=active]:text-white"
              >
                <GraduationCap className="h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="flex items-center gap-2 data-[state=active]:bg-blue-900/30 data-[state=active]:text-white"
              >
                <Briefcase className="h-4 w-4" />
                Experience
              </TabsTrigger>
            </TabsList>

            <TabsContent value="education">
              <div className="space-y-12">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="relative border-l border-gray-700 pl-8 pb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500" />
                    <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                      <span className="text-blue-400">{edu.institution}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative border-l border-gray-700 pl-8 pb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-blue-500" />
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                      <span className="text-blue-400">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
