"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Landmark, ShoppingBag, Store, Plane, Building, Film } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const Location = () => {
  const { language, t } = useLanguage()
  const [activePlace, setActivePlace] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const nearbyPlaces = [
    {
      id: 1,
      name: t("location.place_jemaa"),
      distance: "9.4 km",
      icon: <Landmark size={18} />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 2,
      name: t("location.place_almazar"),
      distance: "5.4 km",
      icon: <ShoppingBag size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      name: t("location.place_mall"),
      distance: "6.3 km",
      icon: <Store size={18} />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 4,
      name: t("location.place_airport"),
      distance: "10.8 km",
      icon: <Plane size={18} />,
      color: "bg-sky-100 text-sky-600",
    },
    {
      id: 5,
      name: t("location.place_koutoubia"),
      distance: "9 km",
      icon: <Building size={18} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 6,
      name: t("location.place_cinema"),
      distance: "5.2 km",
      icon: <Film size={18} />,
      color: "bg-rose-100 text-rose-600",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <section
      id="location"
      className="py-8 md:py-20 bg-gradient-to-b from-white to-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container-7xl px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
            {t("location.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t("location.subtitle")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">{t("location.description")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-16"
        >
          <iframe
            src="https://maps.google.com/maps?q=commune%20Tassultante%20Marrakech%2C%20Morocco&t=m&z=13&output=embed&iwloc=near"
            title="commune Tassultante Marrakech, Morocco"
            className="w-full h-[200px] md:h-[400px] border-0"
            aria-label="commune Tassultante Marrakech, Morocco"
          ></iframe>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
        >
          {nearbyPlaces.map((place, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`bg-white rounded-md shadow-sm transform will-change-transform ${
                activePlace === place.id ? "ring-2 ring-primary" : ""
              }`}
              onMouseEnter={() => setActivePlace(place.id)}
              onMouseLeave={() => setActivePlace(null)}
            >
              <div className="flex items-center p-2 md:p-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full ${place.color} flex items-center justify-center ${
                    language === "ar" ? "ml-2 md:ml-3" : "mr-2 md:mr-3"
                  }`}
                >
                  {place.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-xs truncate">{place.name}</h3>
                  <div className="flex items-center text-gray-500 mt-0.5">
                    <MapPin size={10} className={`${language === "ar" ? "ml-1" : "mr-1"} flex-shrink-0`} />
                    <span className="text-[10px] md:text-xs truncate">{place.distance}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Location
