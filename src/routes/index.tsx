import { createFileRoute } from "@tanstack/react-router";
import { GTAVIPage } from "@/components/gtavi/GTAVIPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Theft Auto VI — Only in Leonida | Cinematic Fan Page" },
      {
        name: "description",
        content:
          "A cinematic Grand Theft Auto VI fan experience: scroll-controlled footage, Jason Duval and Lucia Caminos, Leonida and Vice City. Coming November 19, 2026.",
      },
      { property: "og:title", content: "Grand Theft Auto VI — Only in Leonida" },
      {
        property: "og:description",
        content:
          "Scroll-driven cinematic fan tribute to Grand Theft Auto VI. Leonida, Vice City, Jason and Lucia. November 19, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GTAVIPage,
});
