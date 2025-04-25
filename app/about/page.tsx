import type { Metadata } from "next"
import AboutHero from "@/components/AboutHero"
import AboutContent from "@/components/AboutContent"
import Faq from "@/components/Faq"

export const metadata: Metadata = {
  title: "About Us | Zenurri Palms",
  description:
    "Learn more about Zenurri Palms luxury villas in Marrakech, Morocco. Discover our story, vision, and commitment to exceptional living.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <Faq />
    </>
  )
}
