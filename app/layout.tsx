import "@/styles/globals.css"
import { Inter, Poppins } from "next/font/google"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Pol Alcoverro | Software Engineer",
  description: "Professional portfolio of Pol Alcoverro, Software Engineer specializing in React Native development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
