import type React from "react"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingContact from "@/components/FloatingContact"
import { LanguageProvider } from "@/context/LanguageContext"
import { HtmlLangUpdater } from "@/components/HtmlLangUpdater"
import type { Metadata } from "next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Zenurri Palms",
    template: "%s | Zenurri Palms",
  },
  description:
    "Découvrez nos villas de luxe à Marrakech, conçues pour offrir un mode de vie exceptionnel dans un cadre enchanteur.",
  keywords: ["villas de luxe", "Marrakech", "immobilier", "Maroc", "propriété", "investissement"],
  authors: [{ name: "Zenurri Palms" }],
  creator: "Zenurri Palms",
  publisher: "Zenurri Palms",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zenurripalms.com"),
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    title: "Zenurri Palms | Villas de Luxe à Marrakech",
    description:
      "Découvrez nos villas de luxe à Marrakech, conçues pour offrir un mode de vie exceptionnel dans un cadre enchanteur.",
    url: "https://zenurripalms.com",
    siteName: "Zenurri Palms",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://zenurripalms.com/wp-content/uploads/2020/02/WhatsApp-Image-2023-10-10-at-12.53.23-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Zenurri Palms Villas de Luxe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenurri Palms | Villas de Luxe à Marrakech",
    description:
      "Découvrez nos villas de luxe à Marrakech, conçues pour offrir un mode de vie exceptionnel dans un cadre enchanteur.",
    images: ["https://zenurripalms.com/wp-content/uploads/2020/02/WhatsApp-Image-2023-10-10-at-12.53.23-1.jpeg"],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="https://zenurripalms.com/wp-content/uploads/2020/02/cropped-palms-fav-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://zenurripalms.com/wp-content/uploads/2020/02/cropped-palms-fav-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="https://zenurripalms.com/wp-content/uploads/2020/02/cropped-palms-fav-180x180.png"
        />
        <meta name="theme-color" content="#07d0ba" />
      </head>
      <body className={dmSans.className}>
        <LanguageProvider defaultLanguage="fr">
          <HtmlLangUpdater />
          <Header />
          <main>{children}</main>
          <FloatingContact />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
