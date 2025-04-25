"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { RulerIcon as SquareRuler, Building, Users, Maximize, ArrowRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { useLanguage } from "@/context/LanguageContext"

const About = () => {
  const { language, t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [videoOpen, setVideoOpen] = useState(false)

  const propertyDetails = [
    {
      icon: <SquareRuler size={20} />,
      label: t("about.surface"),
      value: "450 m²",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Building size={20} />,
      label: t("about.type"),
      value: t("about.type_value"),
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Users size={20} />,
      label: t("about.community"),
      value: t("about.community_value"),
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Maximize size={20} />,
      label: t("about.area"),
      value: "1 000 m²",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <section id="about" className="py-8 md:py-20 bg-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden h-[250px] md:h-[500px] cursor-pointer group"
            onClick={() => setVideoOpen(true)}
          >
            <Image
              src="/heroimage.jpeg"
              alt="Zenurri Palms Villa"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary bg-opacity-90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Zenurri Palms</h3>
              <p className="text-white/80 text-sm">{t("hero.location")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
              {t("about.title")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{t("about.subtitle")}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{t("about.description")}</p>

            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8"
            >
              {propertyDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-white p-3 md:p-4 rounded-xl shadow-sm flex items-start transform will-change-transform"
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${detail.color} flex items-center justify-center ${
                      language === "ar" ? "ml-3" : "mr-3"
                    } flex-shrink-0`}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{detail.label}</p>
                    <p className="font-bold text-sm">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Button
              className="group bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full flex items-center"
              onClick={() => (window.location.href = "/contact")}
            >
              <span>{t("about.contact")}</span>
              <ArrowRight
                size={16}
                className={`${language === "ar" ? "mr-2 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"} transition-transform`}
              />
            </Button>
          </motion.div>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative w-full pt-[56.25%]">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-[-40px] right-0 text-white hover:text-gray-200 transition-colors"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/j55tlh7Sixc?autoplay=1"
              title="Luxury Homes in Marrakech / Vente des Villas Luxueuses à Marrakech"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default About
