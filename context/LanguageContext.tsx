"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import translations from "@/translations"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, defaultLanguage = "fr" }: LanguageProviderProps) {
  // Initialize with default language
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [translationData, setTranslationData] = useState<Record<string, string>>(translations[defaultLanguage])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load translations when language changes
  useEffect(() => {
    setTranslationData(translations[language] || translations.fr)
  }, [language])

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem("language", language)
    }
  }, [language, isInitialized])

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null

      if (savedLanguage && ["fr", "ar", "en"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0]
        if (["fr", "ar", "en"].includes(browserLang)) {
          setLanguage(browserLang as Language)
        }
        // If browser language is not supported, use the defaultLanguage
      }
      setIsInitialized(true)
    }
  }, [defaultLanguage])

  // Translation function
  const t = (key: string): string => {
    return translationData[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
