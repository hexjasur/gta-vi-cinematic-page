import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOCKS: { index: string; label: string; body: string }[] = [
  {
    index: "01",
    label: "Rockstar Games",
    body: "Grand Theft Auto VI is developed by Rockstar Games.",
  },
  {
    index: "02",
    label: "Leonida",
    body: "The game is set in the state of Leonida, including modern-day Vice City.",
  },
  {
    index: "03",
    label: "Jason & Lucia",
    body: "The main protagonists are Jason Duval and Lucia Caminos.",
  },
  {
    index: "04",
    label: "The Keys",
    body: "Jason has an Army background and later works with local drug runners in the Keys.",
  },
  {
    index: "05",
    label: "Leonida Penitentiary",
    body: "Lucia was recently released from Leonida Penitentiary and wants to change her circumstances.",
  },
  {
    index: "06",
    label: "The conspiracy",
    body: "Jason and Lucia become partners and are drawn into a criminal conspiracy across Leonida.",
  },
];

export function GTAVIStory() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Cinematic entry: the whole section resolves out of blur + scale.
      gsap.from(root, {
        scrollTrigger: { trigger: root, start: "top 85%", end: "top 35%", scrub: 0.8 },
        filter: "blur(24px)",
        scale: 1.06,
        opacity: 0.15,
      });

      gsap.from(".story-eyebrow, .story-title-line", {
        scrollTrigger: { trigger: ".story-head", start: "top 80%" },
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.12,
      });

      gsap.utils.toArray<HTMLElement>(".story-block").forEach((block) => {
        gsap.from(block, {
          scrollTrigger: { trigger: block, start: "top 88%" },
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".story-rule").forEach((rule) => {
        gsap.from(rule, {
          scrollTrigger: { trigger: rule, start: "top 92%" },
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.out",
        });
      });

      gsap.from(".story-meta-item", {
        scrollTrigger: { trigger: ".story-meta", start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="story" className="relative bg-background px-6 py-32 md:px-14 md:py-48">
      <div className="mx-auto max-w-[1500px]">
        <div className="story-head max-w-4xl">
          <div className="overflow-hidden">
            <p className="story-eyebrow font-mono text-[0.65rem] uppercase tracking-[0.6em] text-accent">
              The story
            </p>
          </div>
          <h2 className="mt-8 font-display text-[clamp(2.75rem,9vw,9rem)] leading-[0.86] tracking-[-0.03em] text-foreground">
            <span className="block overflow-hidden">
              <span className="story-title-line block">TWO PEOPLE.</span>
            </span>
            <span className="block overflow-hidden text-accent">
              <span className="story-title-line block">ONE STATE.</span>
            </span>
          </h2>
        </div>

        <div className="mt-24 grid gap-x-20 gap-y-16 md:mt-40 md:grid-cols-2">
          {BLOCKS.map((block) => (
            <article key={block.index} className="story-block">
              <div className="story-rule h-px w-full bg-border" />
              <div className="mt-6 flex items-baseline gap-6">
                <span className="font-mono text-[0.7rem] tracking-[0.35em] text-muted-foreground">
                  {block.index}
                </span>
                <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-foreground md:text-3xl">
                  {block.label}
                </h3>
              </div>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {block.body}
              </p>
            </article>
          ))}
        </div>

        <div className="story-meta mt-28 flex flex-col gap-12 border-t border-border pt-14 md:mt-44 md:flex-row md:items-end md:justify-between">
          <div className="story-meta-item">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-muted-foreground">
              Release date
            </p>
            <p className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.02em] text-foreground">
              NOVEMBER 19, 2026
            </p>
          </div>
          <div className="story-meta-item md:text-right">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.5em] text-muted-foreground">
              Platforms
            </p>
            <p className="mt-4 font-display text-[clamp(1.25rem,2.6vw,2.5rem)] leading-tight tracking-[0.02em] text-foreground">
              PLAYSTATION 5<span className="text-accent"> / </span>XBOX SERIES X|S
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
