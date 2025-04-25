"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, X } from "lucide-react"
import { FaWhatsapp, FaViber } from "react-icons/fa"

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Responsive icon sizes
  const mainIconSize = isMobile ? 28 : 24
  const contactIconSize = isMobile ? 26 : 24

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        {/* Main button with pulsing animation - Increased size */}
        <button
          onClick={toggleOpen}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all transform will-change-transform animate-pulse-ring"
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
        >
          {isOpen ? <X size={mainIconSize} /> : <MessageCircle size={mainIconSize} />}
        </button>

        {/* Contact options */}
        {isOpen && (
          <div className="absolute bottom-16 md:bottom-18 left-0 space-y-3 md:space-y-4 animate-fadeIn">
            {/* Phone button with tooltip - Increased size */}
            <div className="relative tooltip-trigger">
              <div className="tooltip">Appelez-nous</div>
              <a
                href="tel:+212632063769"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md hover:bg-green-600 transition-all transform hover:-translate-y-1 will-change-transform"
                aria-label="Phone"
              >
                <Phone size={contactIconSize} />
              </a>
            </div>

            {/* WhatsApp button with tooltip - Increased size */}
            <div className="relative tooltip-trigger">
              <div className="tooltip">WhatsApp</div>
              <a
                href="https://wa.me/+33788288103"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:bg-[#128C7E] transition-all transform hover:-translate-y-1 will-change-transform"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={contactIconSize} />
              </a>
            </div>

            {/* Viber button with tooltip - Increased size */}
            <div className="relative tooltip-trigger">
              <div className="tooltip">Viber</div>
              <a
                href="viber://chat?number=+33788288103"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#665CAC] text-white flex items-center justify-center shadow-md hover:bg-[#59267c] transition-all transform hover:-translate-y-1 will-change-transform"
                aria-label="Viber"
              >
                <FaViber size={contactIconSize} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingContact
