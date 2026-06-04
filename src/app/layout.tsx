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
  title: "Pol Alcoverro | Software Engineer & Full-Stack Developer",
  description:
    "Software Engineer and Full-Stack Developer in Barcelona. Recent FIB-UPC graduate building React, Next.js, Angular, and Node.js products.",
  keywords: [
    "Pol Alcoverro",
    "Software Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "Node.js",
    "Docker",
    "PostgreSQL",
    "Java",
    "Python",
    "FIB-UPC",
    "Barcelona",
  ],
  authors: [{ name: "Pol Alcoverro" }],
  creator: "Pol Alcoverro",
  metadataBase: new URL("https://polalcoverro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://polalcoverro.com",
    siteName: "Pol Alcoverro",
    title: "Pol Alcoverro | Software Engineer & Full-Stack Developer",
    description:
      "Recent FIB-UPC graduate building production-minded React, Next.js, Angular, and Node.js products.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pol Alcoverro - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pol Alcoverro | Software Engineer & Full-Stack Developer",
    description:
      "Recent FIB-UPC graduate building production-minded React, Next.js, Angular, and Node.js products.",
    images: ["/opengraph-image"],
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
