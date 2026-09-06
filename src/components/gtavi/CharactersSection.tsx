import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jasonImage from "@/assets/Jason.webp";
import luciaImage from "@/assets/Lucia.webp";

gsap.registerPlugin(ScrollTrigger);

interface Character {
  name: string;
  first: string;
  last: string;
  image: string;
  description: string;
}

const CHARACTERS: Character[] = [
  {
    name: "Jason Duval",
    first: "JASON",
    last: "DUVAL",
    image: jasonImage,
    description:
      "Jason has an Army background and later works with local drug runners in the Keys.",
  },
  {
    name: "Lucia Caminos",
    first: "LUCIA",
    last: "CAMINOS",
    image: luciaImage,
    description:
      "Lucia was recently released from Leonida Penitentiary and wants to change her circumstances.",
  },
];

export function CharactersSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".character-card").forEach((card, i) => {
        const media = card.querySelector<HTMLElement>(".character-media");
        const image = card.querySelector<HTMLElement>(".character-image");
        const lines = card.querySelectorAll<HTMLElement>(".character-line");
        const copy = card.querySelector<HTMLElement>(".character-copy");

        if (media) {
          // Image reveal: curtain wipe + scale settle.
          gsap.fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.6,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 78%" },
            },
          );
        }

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.35 },
            {
              scale: 1.08,
              duration: 2,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 78%" },
            },
          );
          // Parallax drift while scrolling through.
          gsap.to(image, {
            yPercent: i % 2 === 0 ? -10 : -16,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        gsap.from(lines, {
          yPercent: 115,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: card, start: "top 72%" },
        });

        if (copy) {
          gsap.from(copy, {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 68%" },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="characters" className="relative bg-background px-6 py-28 md:px-14 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.6em] gta-gradient-text">
          The protagonists
        </p>

        <div className="mt-16 grid gap-24 md:mt-24 md:grid-cols-2 md:gap-14">
          {CHARACTERS.map((character, i) => (
            <article
              key={character.name}
              className={`character-card group ${i === 1 ? "md:mt-40" : ""}`}
            >
              <div className="character-media relative aspect-[3/4] w-full overflow-hidden bg-card">
                <img
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                  width={1024}
                  height={1408}
                  className="character-image h-full w-full object-cover grayscale-[0.35] transition-[filter,transform] duration-[1200ms] ease-out group-hover:grayscale-0 group-hover:brightness-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--overlay-deep),transparent_55%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--gradient-vice-end)_30%,transparent),color-mix(in_oklab,var(--gradient-vice-mid)_18%,transparent)_35%,color-mix(in_oklab,var(--gradient-vice-start)_12%,transparent)_60%,transparent_75%)]" />
              </div>

              <h3 className="mt-8 font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.85] tracking-[-0.02em] text-foreground">
                <span className="block overflow-hidden">
                  <span className="character-line block">{character.first}</span>
                </span>
                <span className="block overflow-hidden gta-gradient-text">
                  <span className="character-line block">{character.last}</span>
                </span>
              </h3>

              <p className="character-copy mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {character.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
