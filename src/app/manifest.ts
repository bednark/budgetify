import type { MetadataRoute } from "next";
 
const manifest = (): MetadataRoute.Manifest => {
  return {
    name: "Budgetify",
    short_name: "Budgetify",
    description: 'A Progressive Web App built with Next.js',
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/icons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ]
  }
}

export default manifest;