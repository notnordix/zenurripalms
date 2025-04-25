import type { Metadata } from "next"
import ContactHero from "@/components/ContactHero"
import ContactForm from "@/components/ContactForm"
import ContactInfo from "@/components/ContactInfo"
import ContactMap from "@/components/ContactMap"

export const metadata: Metadata = {
  title: "Contact Us | Zenurri Palms",
  description:
    "Get in touch with the Zenurri Palms team. We're here to answer your questions about our luxury villas in Marrakech, Morocco.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="py-16 md:py-24 bg-white">
        <div className="container-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactMap />
    </>
  )
}
