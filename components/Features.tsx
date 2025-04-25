"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Mountain,
  Home,
  Shield,
  Leaf,
  CalendarClock,
  Bus,
  Building,
  GraduationCap,
  Eye,
  Smile,
  Camera,
  Trees,
  Smartphone,
  Waves,
  Factory,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import type { ReactNode } from "react"

// Define types for our feature categories
type FeatureItem = {
  name: string
  icon: ReactNode
}

type CategoryKey = "location" | "characteristics" | "exterior"

type CategoryData = {
  title: string
  icon: ReactNode
  color: string
  features: FeatureItem[]
}

type Categories = {
  [key in CategoryKey]: CategoryData
}

type MainFeature = {
  icon: ReactNode
  title: string
  color: string
}

const Features = () => {
  const { language, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("location")

  const categories: Categories = {
    location: {
      title: t("features.location"),
      icon: <MapPin size={20} />,
      color: "bg-amber-100 text-amber-600",
      features: [
        { name: t("features.location_bus"), icon: <Bus size={16} /> },
        { name: t("features.location_malls"), icon: <Building size={16} /> },
        { name: t("features.location_schools"), icon: <GraduationCap size={16} /> },
        { name: t("features.location_view"), icon: <Eye size={16} /> },
        { name: t("features.location_quiet"), icon: <Smile size={16} /> },
      ],
    },
    characteristics: {
      title: t("features.characteristics"),
      icon: <Home size={20} />,
      color: "bg-blue-100 text-blue-600",
      features: [
        { name: t("features.char_windows"), icon: <Eye size={16} /> },
        { name: t("features.char_interior"), icon: <Home size={16} /> },
        { name: t("features.char_family"), icon: <Smile size={16} /> },
        { name: t("features.char_secure"), icon: <Shield size={16} /> },
      ],
    },
    exterior: {
      title: t("features.exterior"),
      icon: <Trees size={20} />,
      color: "bg-emerald-100 text-emerald-600",
      features: [
        { name: t("features.ext_security"), icon: <Camera size={16} /> },
        { name: t("features.ext_garden"), icon: <Trees size={16} /> },
        { name: t("features.ext_smart"), icon: <Smartphone size={16} /> },
        { name: t("features.ext_pool"), icon: <Waves size={16} /> },
        { name: t("features.ext_noindustry"), icon: <Factory size={16} /> },
      ],
    },
  }

  const mainFeatures: MainFeature[] = [
    {
      icon: <MapPin size={20} />,
      title: t("features.main_location"),
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Mountain size={20} />,
      title: t("features.main_view"),
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <Home size={20} />,
      title: t("features.main_luxury"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Shield size={20} />,
      title: t("features.main_secure"),
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: <Leaf size={20} />,
      title: t("features.main_eco"),
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <CalendarClock size={20} />,
      title: t("features.main_delivery"),
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
    <section id="features" className="py-8 md:py-20 bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
            {t("features.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.subtitle")}</h2>
        </motion.div>

        {/* Main Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-6 md:mb-10"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center transform will-change-transform"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${feature.color} flex items-center justify-center mb-2 md:mb-3`}
              >
                {feature.icon}
              </div>
              <h3 className="font-medium text-xs md:text-sm">{feature.title}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-4 md:mb-6 overflow-x-auto scrollbar-hide py-1">
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center px-2 sm:px-3 py-1.5 sm:py-2 mx-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                activeCategory === key
                  ? `${categories[key].color} font-medium`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className={language === "ar" ? "ml-1" : "mr-1"}>{categories[key].icon}</span>
              <span>{categories[key].title}</span>
            </button>
          ))}
        </div>

        {/* Feature Details */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${categories[activeCategory].color} flex items-center justify-center ${
                language === "ar" ? "ml-3" : "mr-3"
              }`}
            >
              {categories[activeCategory].icon}
            </div>
            <h3 className="font-bold text-lg">{categories[activeCategory].title}</h3>
          </div>

          <div className="p-4">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
              {categories[activeCategory].features.map((feature, index) => (
                <motion.div key={index} variants={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full ${categories[activeCategory].color} flex items-center justify-center ${
                      language === "ar" ? "ml-3" : "mr-3"
                    } flex-shrink-0`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-sm">{feature.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
