"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

export default function AboutContent() {
  const { language, t } = useLanguage()
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="py-16 md:py-24 bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4">
        {/* Section 1: Our Story */}
        <div ref={ref1} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
                {t("about_page.story_label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about_page.story_title")}</h2>
              <p className="text-gray-600 mb-4">{t("about_page.story_p1")}</p>
              <p className="text-gray-600">{t("about_page.story_p2")}</p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/zenurri palms logo-2.png"
                alt={t("about_page.story_img_alt")}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 2: Our Philosophy */}
        <div ref={ref2} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div
              className={`order-2 lg:order-1 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden ${language === "ar" ? "lg:order-2" : ""}`}
            >
              <Image
                src="/gallery/14.jpg"
                alt={t("about_page.philosophy_img_alt")}
                fill
                className="object-cover"
              />
            </div>
            <div className={`order-1 lg:order-2 ${language === "ar" ? "lg:order-1" : ""}`}>
              <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
                {t("about_page.philosophy_label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about_page.philosophy_title")}</h2>
              <p className="text-gray-600 mb-4">{t("about_page.philosophy_p1")}</p>
              <p className="text-gray-600">{t("about_page.philosophy_p2")}</p>
            </div>
          </motion.div>
        </div>

        {/* Section 3: Our Commitment */}
        <div ref={ref3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
                {t("about_page.commitment_label")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about_page.commitment_title")}</h2>
              <p className="text-gray-600 mb-4">{t("about_page.commitment_p1")}</p>
              <p className="text-gray-600">{t("about_page.commitment_p2")}</p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/gallery/21.jpg"
                alt={t("about_page.commitment_img_alt")}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
