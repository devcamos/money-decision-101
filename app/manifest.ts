import type { MetadataRoute } from "next"
import { appBrand } from "@/lib/brand"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Money Decision 101",
    short_name: "Money 101",
    description: "UK educational money guidance and investing foundations.",
    lang: "en-GB",
    start_url: "/money-decision",
    scope: "/",
    display: "standalone",
    background_color: appBrand.cream,
    theme_color: appBrand.cream,
    icons: [
      { src: "/pwa/icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
