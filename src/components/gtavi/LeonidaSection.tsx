import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import leonidaImage from "@/assets/leonida.webp";

gsap.registerPlugin(ScrollTrigger);

export function LeonidaSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to(".leonida-image", {
        yPercent: 18,
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(".leonida-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".leonida-headline", start: "top 80%" },
      });

      gsap.to(".leonida-float-a", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".leonida-float-b", {
        yPercent: 45,
        xPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(".leonida-copy", {
        y: 60,
        opacity: 0,
        filter: "blur(12px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".leonida-copy", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="leonida" className="relative overflow-hidden bg-background">
      <div className="relative h-[130vh] w-full overflow-hidden md:h-[150vh]">
        <img
          src={leonidaImage}
          alt="Aerial view of the Leonida coastline at sunset"
          loading="lazy"
          width={1920}
          height={1088}
          className="leonida-image absolute inset-0 h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent,var(--overlay-deep)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_70%,transparent),transparent_28%,color-mix(in_oklab,var(--background)_92%,transparent))]" />

        <div className="absolute inset-0 flex flex-col justify-between px-6 py-24 md:px-14 md:py-32">
          <div className="leonida-headline">
            <h2 className="font-display text-[clamp(2.75rem,12vw,15rem)] leading-[0.8] tracking-[-0.04em] text-foreground">
              <span className="block overflow-hidden">
                <span className="leonida-word block">ONLY IN</span>
              </span>
              <span className="block overflow-hidden gta-gradient-text">
                <span className="leonida-word block">LEONIDA</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p className="leonida-float-a font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-none tracking-[0.02em] text-foreground/90">
              VICE CITY, USA.
            </p>
            <p className="leonida-float-b max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Grand Theft Auto VI returns to modern-day Vice City and expands outward into the
              wider state of Leonida.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-32 md:px-14 md:pb-48">
        <p className="leonida-copy mx-auto max-w-3xl text-center font-display text-[clamp(1.35rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.01em] text-foreground">
          Neon boulevards, humid backroads and the sprawl in between — one state, drawn on a
          scale Rockstar has never attempted before.
        </p>
      </div>
    </section>
  );
}
