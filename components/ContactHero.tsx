"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

export default function ContactHero() {
  const { language, t } = useLanguage()

  return (
    <section
      className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/heroimage.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container-7xl relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t("contact.hero_title")}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t("contact.hero_subtitle")}</p>
        </motion.div>
      </div>
    </section>
  )
}
