"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { RulerIcon as SquareRuler, Bed, Bath, Waves, CalendarClock } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

interface CountUpProps {
  end: number
  duration?: number
}

const CountUp = ({ end, duration = 1500 }: CountUpProps) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // Changed to false to allow re-triggering
  })

  useEffect(() => {
    let startTime: number | undefined
    let animationFrame: number | undefined

    // Reset count when not in view
    if (!inView) {
      setCount(0)
      return
    }

    // Start animation when in view
    if (inView) {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)

        setCount(Math.floor(percentage * end))

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, inView]) // Added inView to dependencies

  return <span ref={ref}>{count}</span>
}

const Stats = () => {
  const { language, t } = useLanguage()

  const stats = [
    {
      icon: <SquareRuler size={24} />,
      value: 450,
      label: t("stats.area"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Bed size={24} />,
      value: 5,
      label: t("stats.bedrooms"),
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Bath size={24} />,
      value: 5,
      label: t("stats.bathrooms"),
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Waves size={24} />,
      value: 1,
      label: t("stats.pool"),
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <CalendarClock size={24} />,
      value: 2026,
      label: t("stats.delivery"),
      color: "bg-rose-100 text-rose-600",
    },
  ]

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Changed to false to allow re-triggering
  })

  return (
    <section className="py-8 md:py-20 bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
            {t("stats.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("stats.subtitle")}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 md:p-4 text-center transform will-change-transform"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}
              >
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">
                <CountUp end={stat.value} />
              </div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-gray-50 rounded-xl p-6 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">{t("stats.description")}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
