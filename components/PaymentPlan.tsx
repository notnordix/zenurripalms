"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, CreditCard, Building2, Wrench, Paintbrush, Home } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const PaymentPlan = () => {
  const { language, t } = useLanguage()
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const paymentSteps = [
    {
      id: 1,
      title: t("payment.step1"),
      percentage: "15%",
      icon: <CreditCard size={20} />,
      color: "bg-blue-100 text-blue-600",
      description: t("payment.step1_desc"),
    },
    {
      id: 2,
      title: t("payment.step2"),
      percentage: "25%",
      icon: <Building2 size={20} />,
      color: "bg-amber-100 text-amber-600",
      description: t("payment.step2_desc"),
    },
    {
      id: 3,
      title: t("payment.step3"),
      percentage: "25%",
      icon: <Wrench size={20} />,
      color: "bg-emerald-100 text-emerald-600",
      description: t("payment.step3_desc"),
    },
    {
      id: 4,
      title: t("payment.step4"),
      percentage: "25%",
      icon: <Paintbrush size={20} />,
      color: "bg-purple-100 text-purple-600",
      description: t("payment.step4_desc"),
    },
    {
      id: 5,
      title: t("payment.step5"),
      percentage: "10%",
      icon: <Home size={20} />,
      color: "bg-rose-100 text-rose-600",
      description: t("payment.step5_desc"),
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
    <section className="py-8 md:py-20 bg-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-4">
            {t("payment.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("payment.subtitle")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("payment.description")}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"} className="space-y-4">
          {paymentSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={item}
              whileHover={{ x: language === "ar" ? -3 : 3, transition: { duration: 0.2 } }}
              className={`bg-white rounded-md shadow-sm overflow-hidden transform will-change-transform ${
                activeStep === step.id ? "ring-2 ring-primary" : ""
              }`}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 md:p-4">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${step.color} flex items-center justify-center ${
                    language === "ar" ? "ml-3 md:ml-4" : "mr-3 md:mr-4"
                  } mb-2 sm:mb-0 flex-shrink-0`}
                >
                  {step.icon}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-0">
                    <h3 className="font-bold text-sm sm:text-lg mr-2">{step.title}</h3>
                    <div className="flex items-center">
                      <div
                        className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full ${step.color} text-xs md:text-sm font-medium`}
                      >
                        {step.percentage}
                      </div>
                      {activeStep === step.id && (
                        <div
                          className={`${language === "ar" ? "mr-2" : "ml-2"} bg-green-100 text-green-600 p-1 rounded-full`}
                        >
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs">{step.description}</p>
                </div>
              </div>
              <div className="h-1 bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: step.percentage } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r from-primary to-primary/70`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Removed financing help section */}
      </div>
    </section>
  )
}

export default PaymentPlan
