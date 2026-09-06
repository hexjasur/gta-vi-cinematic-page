import { createFileRoute } from "@tanstack/react-router";
import { GTAVIPage } from "@/components/gtavi/GTAVIPage";
import gtaVIImage from "@/assets/gta6-wallpaper.png";

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
const pageTitle = "Grand Theft Auto VI — Only in Leonida | Cinematic Fan Page";
const pageDescription =
  "A cinematic Grand Theft Auto VI fan experience set in Leonida and modern-day Vice City, featuring Jason Duval, Lucia Caminos, story details and release information.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "Grand Theft Auto VI, GTA 6, GTA VI, Vice City, Leonida, Jason Duval, Lucia Caminos, Rockstar Games",
      },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:image", content: gtaVIImage },
      { property: "og:image:alt", content: "Leonida coastline at sunset" },
      ...(siteUrl ? [{ property: "og:url", content: siteUrl }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: gtaVIImage },
    ],
    links: siteUrl ? [{ rel: "canonical", href: siteUrl }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: pageTitle,
          description: pageDescription,
          ...(siteUrl ? { url: siteUrl } : {}),
          about: {
            "@type": "VideoGame",
            name: "Grand Theft Auto VI",
            genre: ["Action-adventure", "Open world"],
            gamePlatform: ["PlayStation 5", "Xbox Series X|S"],
            datePublished: "2026-11-19",
            author: { "@type": "Organization", name: "Rockstar Games" },
          },
        }),
      },
    ],
  }),
  component: GTAVIPage,
});
