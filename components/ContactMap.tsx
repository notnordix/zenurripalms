"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/LanguageContext"

export default function ContactMap() {
  const { language, t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 bg-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("contact.map_title")}</h2>
          <p className="text-gray-600">{t("contact.map_subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px]"
        >
          <iframe
            src="https://maps.google.com/maps?q=commune%20Tassultante%20Marrakech%2C%20Morocco&t=m&z=13&output=embed&iwloc=near"
            title={t("contact.map_title")}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  )
}
