"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

// Gallery data extracted from the HTML
const galleryData = {
  extérieur: [
    {
      id: "8268",
      url: "/gallery/1.jpg",
      thumbnail: "/gallery/1.jpg",
      title: "1",
    },
    {
      id: "8269",
      url: "/gallery/2.jpg",
      thumbnail: "/gallery/2.jpg",
      title: "2",
    },
    {
      id: "8270",
      url: "/gallery/3.jpg",
      thumbnail: "/gallery/3.jpg",
      title: "3",
    },
    {
      id: "8271",
      url: "/gallery/4.jpg",
      thumbnail: "/gallery/4.jpg",
      title: "4",
    },
    {
      id: "8272",
      url: "/gallery/5.jpg",
      thumbnail: "/gallery/5.jpg",
      title: "5",
    },
    {
      id: "8273",
      url: "/gallery/6.jpg",
      thumbnail: "/gallery/6.jpg",
      title: "6",
    },
    {
      id: "8274",
      url: "/gallery/7.jpg",
      thumbnail: "/gallery/7.jpg",
      title: "7",
    },
    {
      id: "8275",
      url: "/gallery/8.jpg",
      thumbnail: "/gallery/8.jpg",
      title: "8",
    },
    {
      id: "8276",
      url: "/gallery/9.jpg",
      thumbnail: "/gallery/9.jpg",
      title: "9",
    },
    {
      id: "8277",
      url: "/gallery/10.jpg",
      thumbnail: "/gallery/10.jpg",
      title: "10",
    },
    {
      id: "8278",
      url: "/gallery/11.jpg",
      thumbnail: "/gallery/11.jpg",
      title: "11",
    },
    {
      id: "8279",
      url: "/gallery/12.jpg",
      thumbnail: "/gallery/12.jpg",
      title: "12",
    },
  ],
  "rdc-chambre1-séjour": [
    {
      id: "8308",
      url: "/gallery/13.jpg",
      thumbnail: "/gallery/13.jpg",
      title: "1",
    },
    {
      id: "8309",
      url: "/gallery/14.jpg",
      thumbnail: "/gallery/14.jpg",
      title: "2",
    },
    {
      id: "8310",
      url: "/gallery/15.jpg",
      thumbnail: "/gallery/15.jpg",
      title: "3",
    },
    {
      id: "8311",
      url: "/gallery/16.jpg",
      thumbnail: "/gallery/16.jpg",
      title: "4",
    },
    {
      id: "8312",
      url: "/gallery/17.jpg",
      thumbnail: "/gallery/17.jpg",
      title: "5",
    },
    {
      id: "8313",
      url: "/gallery/18.jpg",
      thumbnail: "/gallery/18.jpg",
      title: "6",
    },
    {
      id: "8314",
      url: "/gallery/19.jpg",
      thumbnail: "/gallery/19.jpg",
      title: "7",
    },
    {
      id: "8315",
      url: "/gallery/20.jpg",
      thumbnail: "/gallery/20.jpg",
      title: "8",
    },
    {
      id: "8316",
      url: "/gallery/21.jpg",
      thumbnail: "/gallery/21.jpg",
      title: "9",
    },
  ],
  masterroom: [
    {
      id: "8298",
      url: "/gallery/22.jpg",
      thumbnail: "/gallery/22.jpg",
      title: "1",
    },
    {
      id: "8299",
      url: "/gallery/23.jpg",
      thumbnail: "/gallery/23.jpg",
      title: "2",
    },
    {
      id: "8300",
      url: "/gallery/24.jpg",
      thumbnail: "/gallery/24.jpg",
      title: "3",
    },
    {
      id: "8301",
      url: "/gallery/25.jpg",
      thumbnail: "/gallery/25.jpg",
      title: "4",
    },
    {
      id: "8302",
      url: "/gallery/26.jpg",
      thumbnail: "/gallery/26.jpg",
      title: "5",
    },
    {
      id: "8303",
      url: "/gallery/27.jpg",
      thumbnail: "/gallery/27.jpg",
      title: "6",
    },
    {
      id: "8304",
      url: "/gallery/28.jpg",
      thumbnail: "/gallery/28.jpg",
      title: "7",
    },
  ],
  chambre2: [
    {
      id: "8283",
      url: "/gallery/29.png",
      thumbnail: "/gallery/29.png",
      title: "1",
    },
    {
      id: "8284",
      url: "/gallery/30.jpg",
      thumbnail: "/gallery/30.jpg",
      title: "2",
    },
    {
      id: "8285",
      url: "/gallery/31.jpg",
      thumbnail: "/gallery/31.jpg",
      title: "3",
    },
    {
      id: "8286",
      url: "/gallery/32.jpg",
      thumbnail: "/gallery/32.jpg",
      title: "4",
    },
    {
      id: "8287",
      url: "/gallery/33.jpg",
      thumbnail: "/gallery/33.jpg",
      title: "5",
    },
    {
      id: "8288",
      url: "/gallery/34.jpg",
      thumbnail: "/gallery/34.jpg",
      title: "6",
    },
  ],
  chambre3: [
    {
      id: "8292",
      url: "/gallery/35.png",
      thumbnail: "/gallery/35.png",
      title: "1",
    },
    {
      id: "8293",
      url: "/gallery/36.jpg",
      thumbnail: "/gallery/36.jpg",
      title: "2",
    },
    {
      id: "8294",
      url: "/gallery/37.jpg",
      thumbnail: "/gallery/37.jpg",
      title: "3",
    },
    {
      id: "8295",
      url: "/gallery/38.jpg",
      thumbnail: "/gallery/38.jpg",
      title: "4",
    },
    {
      id: "8296",
      url: "/gallery/39.jpg",
      thumbnail: "/gallery/39.jpg",
      title: "5",
    },
    {
      id: "8297",
      url: "/gallery/40.png",
      thumbnail: "/gallery/40.png",
      title: "5",
    },
  ],
}

export default function GalleryComponent() {
  const { language, t } = useLanguage()
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }

  const getAllImages = () => {
    const allImages: any[] = []
    Object.keys(galleryData).forEach((category) => {
      galleryData[category as keyof typeof galleryData].forEach((image) => {
        allImages.push({ ...image, category })
      })
    })
    return allImages
  }

  const renderGalleryItems = () => {
    if (selectedTab === "all") {
      return getAllImages().map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleImageClick(image.url)}
        >
          <div className="relative h-40 sm:h-52 md:h-64 w-full">
            <Image
              src={image.thumbnail || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 md:p-2 text-xs md:text-sm truncate">
            {getCategoryLabel(image.category)}
          </div>
        </div>
      ))
    } else {
      return galleryData[selectedTab as keyof typeof galleryData].map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleImageClick(image.url)}
        >
          <div className="relative h-40 sm:h-52 md:h-64 w-full">
            <Image
              src={image.thumbnail || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      ))
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "extérieur":
        return t("gallery.category_exterior")
      case "rdc-chambre1-séjour":
        return t("gallery.category_ground_floor")
      case "masterroom":
        return t("gallery.category_master")
      case "chambre2":
        return t("gallery.category_bedroom2")
      case "chambre3":
        return t("gallery.category_bedroom3")
      default:
        return category
    }
  }

  // Create an array of all categories including "all"
  const categories = ["all", ...Object.keys(galleryData)]

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Custom Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedTab(category)}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                selectedTab === category ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? t("gallery.category_all") : getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      >
        {renderGalleryItems()}
      </motion.div>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">{t("gallery.selected_image_alt")}</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={t("gallery.selected_image_alt")}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2"
                aria-label={t("gallery.close")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
