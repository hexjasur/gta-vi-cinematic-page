import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import art1 from "@/assets/art-1-1.png";
import art2 from "@/assets/art-2-2.jpg";
import art3 from "@/assets/art-3-3.webp";
import leonidaImage from "@/assets/leonida.webp";

gsap.registerPlugin(ScrollTrigger);

/**
 * Asymmetric artwork gallery.
 * Swap any entry in this array to replace an image — layout classes stay put.
 */
const PIECES: {
  src: string;
  alt: string;
  wrapper: string;
  ratio: string;
  drift: number;
  tilt: number;
}[] = [
  {
    src: leonidaImage,
    alt: "Leonida coastline at dusk",
    wrapper: "col-span-12 md:col-span-9",
    ratio: "aspect-[16/9]",
    drift: -70,
    tilt: -0.8,
  },
  {
    src: art1,
    alt: "Neon-lit street at night",
    wrapper: "col-span-8 md:col-span-4 md:col-start-2 md:-mt-24",
    ratio: "aspect-[4/5]",
    drift: 90,
    tilt: 1.4,
  },
  {
    src: art3,
    alt: "Muscle car under a streetlight",
    wrapper: "col-span-12 md:col-span-6 md:col-start-7 md:mt-32",
    ratio: "aspect-[7/5]",
    drift: -110,
    tilt: -1.6,
  },
  {
    src: art2,
    alt: "Boat in the wetlands at golden hour",
    wrapper: "col-span-10 col-start-3 md:col-span-5 md:col-start-3 md:mt-16",
    ratio: "aspect-[8/5]",
    drift: 60,
    tilt: 1,
  },
];

export function ArtworkGallery() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-piece").forEach((piece, i) => {
        const media = piece.querySelector<HTMLElement>(".gallery-media");
        const image = piece.querySelector<HTMLElement>(".gallery-image");
        const drift = Number(piece.dataset["drift"] ?? 0);
        const tilt = Number(piece.dataset["tilt"] ?? 0);

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(0% 0% 100% 0%)", rotate: tilt * 2 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              rotate: tilt,
              duration: 1.5,
              ease: "expo.out",
              delay: (i % 2) * 0.08,
              scrollTrigger: { trigger: piece, start: "top 85%" },
            },
          );
        }

        // Horizontal + vertical parallax drift.
        gsap.fromTo(
          piece,
          { x: drift * 0.35 },
          {
            x: -drift * 0.35,
            y: drift * 0.2,
            ease: "none",
            scrollTrigger: { trigger: piece, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.25 },
            {
              scale: 1.02,
              duration: 1.8,
              ease: "expo.out",
              scrollTrigger: { trigger: piece, start: "top 85%" },
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="artwork" className="relative overflow-hidden bg-background px-6 py-32 md:px-14 md:py-48">
      <div className="mx-auto max-w-[1500px]">
        <p className="gallery-eyebrow font-mono text-[0.65rem] uppercase tracking-[0.6em] gta-gradient-text">
          Artwork
        </p>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-28 md:gap-10">
          {PIECES.map((piece) => (
            <figure
              key={piece.alt}
              className={`gallery-piece group ${piece.wrapper}`}
              data-drift={piece.drift}
              data-tilt={piece.tilt}
            >
              <div
                className={`gallery-media relative w-full overflow-hidden bg-card ${piece.ratio}`}
              >
                <img
                  src={piece.src}
                  alt={piece.alt}
                  loading="lazy"
                  className="gallery-image h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[color-mix(in_oklab,var(--background)_35%,transparent)] transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <figcaption className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.45em] text-muted-foreground">
                {piece.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
