import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAFA",
};

export const metadata: Metadata = {
  title: "Pol Alcoverro | Software Engineer",
  description:
    "Software Engineer and Full-Stack Developer. Recent Computer Engineering graduate from FIB-UPC specializing in React, Angular, Node.js, and Docker.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "React",
    "Angular",
    "TypeScript",
    "Node.js",
    "Docker",
    "Java",
    "Python",
    "Pol Alcoverro",
    "Barcelona",
  ],
  authors: [{ name: "Pol Alcoverro" }],
  creator: "Pol Alcoverro",
  metadataBase: new URL("https://polalcoverro.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://polalcoverro.com",
    siteName: "Pol Alcoverro",
    title: "Pol Alcoverro | Software Engineer",
    description:
      "Software Engineer and Full-Stack Developer. Recent Computer Engineering graduate from FIB-UPC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pol Alcoverro | Software Engineer",
    description:
      "Software Engineer and Full-Stack Developer. Recent Computer Engineering graduate from FIB-UPC.",
    creator: "@polalcoverro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
