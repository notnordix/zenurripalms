"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

// Add these interfaces at the top of the file, after the imports
interface Language {
  code: string
  name: string
  flag: string
}

const Header = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Optimize scroll listener with throttling
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguageMenu = (): void => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const selectLanguage = (code: string): void => {
    setLanguage(code as "fr" | "ar" | "en")
    setIsLanguageMenuOpen(false)
  }

  const languages: Language[] = [
    {
      code: "fr",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      code: "ar",
      name: "العربية",
      flag: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
    },
  ]

  const getCurrentFlag = (): string => {
    return languages.find((lang) => lang.code === language)?.flag || ""
  }

  // Find the navItems array and update the Gallery link
  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.gallery"), href: "/gallery" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  // Header should be in scrolled state when mobile menu is open
  const headerScrolled = isScrolled || isMobileMenuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        headerScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/white-logo.png"
                alt="Zenurri Palms"
                width={100}
                height={50}
                className={`transition-opacity duration-300 ${headerScrolled ? "opacity-0 absolute" : "opacity-100"}`}
                priority // Prioritize logo loading
              />
              <Image
                src="/logo.png"
                alt="Zenurri Palms"
                width={100}
                height={50}
                className={`transition-opacity duration-300 ${headerScrolled ? "opacity-100" : "opacity-0 absolute"}`}
                priority // Prioritize logo loading
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      headerScrolled ? "text-gray-800" : "text-white"
                    } hover:text-primary`}
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={toggleLanguageMenu}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                  headerScrolled ? "hover:bg-gray-100" : "hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <div className="w-6 h-4 relative overflow-hidden rounded-sm">
                  <Image
                    src={getCurrentFlag() || "/placeholder.svg"}
                    alt={`${language} language`}
                    fill
                    className="object-cover"
                  />
                </div>
                <ChevronDown size={16} className={headerScrolled ? "text-gray-800" : "text-white"} />
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                        onClick={() => selectLanguage(lang.code)}
                      >
                        <div className="w-6 h-4 relative overflow-hidden rounded-sm mr-2">
                          <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
                        </div>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <a href="/plaquette zenurri palms.pdf" download aria-label="Download brochure">
              <Button className="btn-primary rounded-md">{t("cta.brochure")}</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="relative mr-4" ref={languageDropdownRef}>
              <button
                onClick={toggleLanguageMenu}
                className={`flex items-center p-2 rounded-md transition-colors ${
                  headerScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <div className="w-6 h-4 relative overflow-hidden rounded-sm">
                  <Image
                    src={getCurrentFlag() || "/placeholder.svg"}
                    alt={`${language} language`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                        onClick={() => selectLanguage(lang.code)}
                      >
                        <div className="w-6 h-4 relative overflow-hidden rounded-sm mr-2">
                          <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
                        </div>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md transition-colors ${headerScrolled ? "text-gray-800" : "text-white"}`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container-7xl py-4">
              <nav className="mb-6">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="flex items-center py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-4 px-4">
                {/* Language Switcher */}
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        language === lang.code
                          ? "bg-primary bg-opacity-10 text-primary"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => selectLanguage(lang.code)}
                    >
                      <div className="w-6 h-4 relative overflow-hidden rounded-sm mr-2">
                        <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
                      </div>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>

                {/* CTA Button */}
                <a href="/plaquette zenurri palms.pdf" download aria-label="Download brochure" className="w-full">
                  <Button className="btn-primary rounded-md w-full mt-4">{t("cta.brochure")}</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
