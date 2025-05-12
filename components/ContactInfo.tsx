"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function ContactInfo() {
  const { language, t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const contactDetails = [
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: t("contact.address_title"),
      details: [t("contact.address_line1"), t("contact.address_line2")],
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: t("contact.phone_title"),
      details: ["+212 632063769", "+33 788288103 (WhatsApp)"],
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: t("contact.email_title"),
      details: ["Zenurripalms.contact@gmail.com"],
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: t("contact.hours_title"),
      details: [t("contact.hours_weekdays"), t("contact.hours_saturday"), t("contact.hours_sunday")],
    },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("contact.info_title")}</h2>
      <p className="text-gray-600 mb-8">{t("contact.info_subtitle")}</p>

      <div className="space-y-8">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-10 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4">{t("contact.follow_us")}</h3>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/zenurripalms"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/zenurri.palms/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
