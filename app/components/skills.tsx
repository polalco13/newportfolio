"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const skillCategories = [
    {
      name: "frontend",
      skills: [
        { name: "React Native", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React", level: 80 },
        { name: "CSS/Tailwind", level: 75 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      name: "backend",
      skills: [
        { name: "Firebase", level: 85 },
        { name: "Node.js", level: 75 },
        { name: "Express", level: 70 },
        { name: "MongoDB", level: 65 },
        { name: "REST APIs", level: 80 },
      ],
    },
    {
      name: "tools",
      skills: [
        { name: "Git", level: 90 },
        { name: "Expo", level: 85 },
        { name: "Jest", level: 75 },
        { name: "CI/CD", level: 70 },
        { name: "App Store/Play Store", level: 80 },
      ],
    },
  ]

  return (
    <section id="skills" className="bg-zinc-950 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl gradient-border inline-block">Skills</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">Technical expertise and proficiencies</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 bg-zinc-900/50 border border-zinc-800">
              <TabsTrigger
                value="frontend"
                className="capitalize data-[state=active]:bg-blue-900/30 data-[state=active]:text-white"
              >
                Frontend
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="capitalize data-[state=active]:bg-blue-900/30 data-[state=active]:text-white"
              >
                Backend
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="capitalize data-[state=active]:bg-blue-900/30 data-[state=active]:text-white"
              >
                Tools
              </TabsTrigger>
            </TabsList>
            {skillCategories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
