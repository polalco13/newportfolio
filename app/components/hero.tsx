"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // ajustar tamaño al cargar y al redimensionar
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Matrix-like digital rain effect
    const fontSize = 14
    let columns = Math.floor(canvas.width / fontSize)
    let drops: number[] = Array.from({ length: columns }, () => Math.random() * -100)
    const characters = "01"

    function draw() {
      if (!ctx) return
      // pintar un negro semitransparente más intenso para 'fijar' el fondo oscuro
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 122, 204, 0.7)" // Azul de las app icons
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    // actualizar columnas y drops al cambiar tamaño
    const handleResize = () => {
      resizeCanvas()
      columns = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: columns }, () => Math.random() * -100)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-black opacity-30"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          POL ALCOVERRO
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-lg text-gray-300 sm:text-xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Software Engineer specializing in React Native development
        </motion.p>
        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#projects"
            className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-blue-600"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* degradado final completamente negro hacia transparente */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-32
          bg-gradient-to-t
          from-black
          to-transparent
        "
      />
    </div>
  )
}
