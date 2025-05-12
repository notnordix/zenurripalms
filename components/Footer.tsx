"use client"
import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import { useLanguage } from "@/context/LanguageContext"

const Footer = () => {
  const { language, t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <Image
              src="/white-logo.png"
              alt="Zenurri Palms"
              width={120}
              height={60}
              className="mb-6"
              loading="lazy"
            />
            <p className="mb-6 text-gray-300 leading-relaxed">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/zenurripalms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/zenurri.palms/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">{t("footer.quicklinks")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("footer.features")}
                </Link>
              </li>
              <li>
                <Link href="#location" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("footer.location")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <span className="mr-2">›</span> {t("nav.gallery")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">{t("footer.contact")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">{t("footer.address")}</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-primary flex-shrink-0" />
                <a href="tel:+212632063769" className="text-gray-300 hover:text-primary transition-colors">
                  +212 632063769
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-primary flex-shrink-0" />
                <a href="tel:+33788288103" className="text-gray-300 hover:text-primary transition-colors">
                  +33 788288103
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary flex-shrink-0" />
                <a
                  href="mailto:Zenurripalms.contact@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Zenurripalms.contact@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container-7xl">
          <div className="text-center">
            <p className="text-gray-400 text-sm">{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
