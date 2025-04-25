"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

const Hero = () => {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    "/heroimage.jpeg",
    "/heroimage2.jpeg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    const setVh = () => {
      // This accounts for mobile browser chrome/header more accurately
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Run immediately
    setVh()

    // Add event listeners with a small delay to ensure accurate calculation
    window.addEventListener("resize", () => {
      // Small timeout to ensure the browser UI has settled
      setTimeout(setVh, 100)
    })
    window.addEventListener("orientationchange", () => {
      // Longer timeout for orientation changes
      setTimeout(setVh, 200)
    })

    // Initial load with a slight delay
    setTimeout(setVh, 100)

    return () => {
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
    }
  }, [])

  return (
    <section className="relative hero-section flex flex-col" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Background Slider - Optimized for performance */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide || "/placeholder.svg"}
            alt={`Zenurri Palms Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw" // Optimize responsive images
            quality={80} // Slightly reduce quality for better performance
            loading={index === 0 ? "eager" : "lazy"} // Only eagerly load the first image
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="container-7xl relative h-full flex flex-col justify-end pb-20">
        <div className="text-white max-w-2xl mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-primary px-4 py-1 rounded-full text-sm font-medium">{t("hero.location")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-xl md:text-2xl mb-6">{t("hero.price")}</p>
          <div className="flex flex-wrap gap-4">
            <Button className="btn-primary rounded-md" onClick={() => (window.location.href = "/contact")}>
              {t("hero.contact")}
            </Button>
            <a href="/brochure.pdf" download aria-label="Download brochure">
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black rounded-md"
              >
                {t("hero.brochure")}
              </Button>
            </a>
          </div>
        </div>

        {/* Property Info Cards - Made more compact for mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-2 md:p-4 rounded-md text-white border border-white border-opacity-20">
            <span className="block text-xs md:text-sm opacity-80">{t("hero.location_label")}</span>
            <span className="text-sm md:text-base font-bold">{t("hero.location")}</span>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-2 md:p-4 rounded-md text-white border border-white border-opacity-20">
            <span className="block text-xs md:text-sm opacity-80">{t("hero.area_label")}</span>
            <span className="text-sm md:text-base font-bold">{t("hero.area_value")}</span>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-2 md:p-4 rounded-md text-white border border-white border-opacity-20">
            <span className="block text-xs md:text-sm opacity-80">{t("hero.delivery_label")}</span>
            <span className="text-sm md:text-base font-bold">{t("hero.delivery_value")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
