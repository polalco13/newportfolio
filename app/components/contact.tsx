"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your backend
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black py-24">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl gradient-border inline-block">
            Get in Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Interested in working together or have a question? Feel free to reach out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/30 border border-blue-800/50">
                <Mail className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <a
                  href="mailto:polalcoverros@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  polalcoverros@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/30 border border-blue-800/50">
                <Linkedin className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/pol-alcoverro-sabaté-6519192a1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Pol Alcoverro Sabaté
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/30 border border-blue-800/50">
                <Github className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium">GitHub</h3>
                <a
                  href="https://github.com/polalco13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  github.com/polalco13
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="bg-zinc-900/50 border-zinc-800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" className="bg-zinc-900/50 border-zinc-800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          className="min-h-[120px] bg-zinc-900/50 border-zinc-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="rgba(0, 122, 204, 0.3)" strokeWidth="0.1" />
          ))}
        </svg>
      </div>
    </section>
  )
}
