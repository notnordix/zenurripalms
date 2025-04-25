import type { Metadata } from "next"
import GalleryHero from "@/components/GalleryHero"
import GalleryComponent from "@/components/GalleryComponent"

export const metadata: Metadata = {
  title: "Galerie | Zenurri Palms",
  description:
    "Découvrez nos villas luxueuses à travers notre galerie d'images. Explorez l'intérieur et l'extérieur de nos propriétés à Marrakech.",
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <div className="py-16 md:py-24 bg-white">
        <div className="container-7xl px-4">
          <GalleryComponent />
        </div>
      </div>
    </>
  )
}
