"use client"
import { useState, useRef } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/LanguageContext"
import { sendContactEmail } from "@/app/actions/contact"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Country codes data
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+33", country: "France" },
  { code: "+212", country: "Morocco" },
  { code: "+44", country: "United Kingdom" },
  { code: "+49", country: "Germany" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  { code: "+32", country: "Belgium" },
  { code: "+31", country: "Netherlands" },
  { code: "+41", country: "Switzerland" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+974", country: "Qatar" },
  { code: "+965", country: "Kuwait" },
]

export default function ContactForm() {
  const { language, t } = useLanguage()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [countryCode, setCountryCode] = useState("+212")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      if (!formRef.current) return

      const formData = new FormData(formRef.current)
      formData.append("countryCode", countryCode)

      const result = await sendContactEmail(formData)

      setFormStatus(result)

      if (result.success) {
        formRef.current.reset()
        setPhoneNumber("")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        success: false,
        message: t("contact.error_message"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("contact.form_title")}</h2>
      <p className="text-gray-600 mb-6">{t("contact.form_subtitle")}</p>

      {formStatus.message && (
        <div
          className={`${formStatus.success ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"} border rounded-lg p-4 mb-6 flex items-start`}
        >
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {formStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          </div>
          <div>
            <p className="font-medium">{formStatus.success ? t("contact.success_title") : t("contact.error_title")}</p>
            <p>{formStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t("contact.first_name")} *</Label>
            <Input id="firstName" name="firstName" placeholder={t("contact.first_name_placeholder")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t("contact.last_name")} *</Label>
            <Input id="lastName" name="lastName" placeholder={t("contact.last_name_placeholder")} required />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="email">{t("contact.email")} *</Label>
          <Input id="email" name="email" type="email" placeholder={t("contact.email_placeholder")} required />
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="phone">{t("contact.phone")} *</Label>
          <div className="flex">
            <div className="w-24 mr-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("contact.code")} />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t("contact.phone_placeholder")}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="subject">{t("contact.subject")} *</Label>
          <Input id="subject" name="subject" placeholder={t("contact.subject_placeholder")} required />
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="message">{t("contact.message")} *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t("contact.message_placeholder")}
            className="min-h-[150px]"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("contact.sending") : t("contact.send")}
        </Button>
      </form>
    </motion.div>
  )
}
