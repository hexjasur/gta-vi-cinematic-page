import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideoSection } from "./ScrollVideoSection";
import { GTAVIStory } from "./GTAVIStory";
import { CharactersSection } from "./CharactersSection";
import { LeonidaSection } from "./LeonidaSection";
import { ArtworkGallery } from "./ArtworkGallery";
import { GTAVIFinal } from "./GTAVIFinal";
import { FilmGrain } from "./FilmGrain";

// Local assets only. Spaces in the filenames are URL-encoded.
const VIDEO_ONE = "/videos/scroole%201.mp4";
const VIDEO_TWO = "/videos/scroole%202.mp4";

function HeroOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_78%,transparent),color-mix(in_oklab,var(--background)_18%,transparent)_38%,var(--overlay-deep))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_45%,transparent,var(--overlay-deep)_85%)]" />
    </>
  );
}

function HeroContent() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-word", { yPercent: 120, opacity: 0, duration: 1.6, stagger: 0.14 })
        .from(".hero-sub", { y: 30, opacity: 0, duration: 1.2 }, "-=1")
        .from(".hero-hint", { opacity: 0, duration: 1 }, "-=0.8");

      // Text drifts and dissolves as the pinned video scrubs forward.
      gsap.to(root, {
        yPercent: -14,
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.closest("section"),
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 py-14 md:px-14 md:py-16"
    >
      <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.5em] text-foreground/70">
        <span>Rockstar Games</span>
        <span className="hidden md:inline">Leonida / Vice City</span>
      </div>

      <h1 className="font-display text-[clamp(3rem,14vw,17rem)] leading-[0.78] tracking-[-0.05em] text-foreground">
        <span className="block overflow-hidden">
          <span className="hero-word block">GRAND THEFT</span>
        </span>
        <span className="block overflow-hidden text-accent">
          <span className="hero-word block">AUTO VI</span>
        </span>
      </h1>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="hero-sub max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
          A cinematic fan tribute. Scroll to move through the footage — every frame is tied to
          your scroll position.
        </p>
        <p className="hero-hint font-mono text-[0.6rem] uppercase tracking-[0.5em] text-foreground/70">
          Scroll ↓
        </p>
      </div>
    </div>
  );
}

/** Fade / scale / blur bridge between the hero footage and the story. */
function CinematicTransition() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.7 },
        })
        .fromTo(
          ".transition-text",
          { opacity: 0, scale: 1.35, filter: "blur(26px)", letterSpacing: "0.5em" },
          { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.12em", duration: 1 },
        )
        .to(
          ".transition-text",
          { opacity: 0, scale: 0.92, filter: "blur(18px)", duration: 0.8 },
          ">0.3",
        );

      gsap.fromTo(
        ".transition-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex h-[80vh] items-center justify-center overflow-hidden bg-background"
    >
      <p className="transition-text px-6 text-center font-display text-[clamp(1.5rem,5vw,4.5rem)] uppercase leading-tight text-foreground">
        Everything is for sale
      </p>
      <div className="transition-bar absolute bottom-0 left-0 h-px w-full origin-left bg-accent" />
    </div>
  );
}

function SecondVideoContent({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.closest("section"),
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
          },
        })
        .fromTo(".v2-line-a", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 })
        .to(".v2-line-a", { opacity: 0, x: 40, duration: 1 }, ">0.6")
        .fromTo(".v2-line-b", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1 }, "<")
        .to(".v2-line-b", { opacity: 0, filter: "blur(16px)", duration: 1 }, ">0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center gap-10 px-6 transition-opacity duration-700 md:px-14 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="v2-line-a font-display text-[clamp(2rem,9vw,10rem)] leading-[0.85] tracking-[-0.04em] text-foreground">
        NO WAY BACK
      </p>
      <p className="v2-line-b self-end text-right font-mono text-[0.65rem] uppercase leading-loose tracking-[0.5em] text-accent md:max-w-xs">
        Jason and Lucia are drawn into a criminal conspiracy across Leonida
      </p>
    </div>
  );
}

export function GTAVIPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Pinned sections change layout height; refresh once assets settle.
    const timeout = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-background text-foreground antialiased">
      <FilmGrain />

      <ScrollVideoSection
        id="hero"
        src={VIDEO_ONE}
        scrollLength={4}
        overlay={<HeroOverlay />}
        videoClassName="scale-[1.04] brightness-[0.85] contrast-[1.05] saturate-[1.05]"
      >
        {() => <HeroContent />}
      </ScrollVideoSection>

      <CinematicTransition />

      <GTAVIStory />

      <CharactersSection />

      <LeonidaSection />

      <ScrollVideoSection
        id="footage-two"
        src={VIDEO_TWO}
        scrollLength={3.5}
        videoClassName="brightness-[0.6] contrast-[1.2] saturate-[0.75]"
        overlay={
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,var(--overlay-deep),transparent_45%,color-mix(in_oklab,var(--accent)_18%,transparent))]" />
        }
      >
        {({ ready }) => <SecondVideoContent ready={ready} />}
      </ScrollVideoSection>

      <ArtworkGallery />

      <GTAVIFinal />
    </main>
  );
}
