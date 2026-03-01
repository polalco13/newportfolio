import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
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
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
