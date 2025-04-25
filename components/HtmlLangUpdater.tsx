"use client"

import { useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

export function HtmlLangUpdater() {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    }
  }, [language])

  return null
}
