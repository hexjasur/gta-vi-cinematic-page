import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GTAVIFinal() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".final-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.14,
        scrollTrigger: { trigger: ".final-title", start: "top 80%" },
      });

      gsap.from(".final-date-line", {
        y: 50,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: ".final-date", start: "top 88%" },
      });

      gsap.to(".final-glow", {
        opacity: 1,
        scale: 1.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      gsap.from(".final-footer", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".final-footer", start: "top 95%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="final"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background px-6 py-28 md:px-14 md:py-36"
    >
      <div
        aria-hidden="true"
        className="final-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 65%)",
        }}
      />

      <h2 className="final-title relative font-display text-[clamp(3rem,15vw,18rem)] leading-[0.78] tracking-[-0.05em] text-foreground">
        <span className="block overflow-hidden">
          <span className="final-word block">GRAND</span>
        </span>
        <span className="block overflow-hidden">
          <span className="final-word block">THEFT</span>
        </span>
        <span className="block overflow-hidden gta-gradient-text">
          <span className="final-word block">AUTO VI</span>
        </span>
      </h2>

      <div className="final-date relative mt-24 flex flex-col gap-2 md:mt-0 md:items-end">
        <p className="final-date-line font-mono text-[0.7rem] uppercase tracking-[0.6em] text-muted-foreground">
          Coming
        </p>
        <p className="final-date-line font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-[-0.02em] text-foreground">
          NOVEMBER 19
        </p>
        <p className="final-date-line font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-[-0.02em] gta-gradient-text">
          2026
        </p>
      </div>

      <div className="final-footer relative mt-20 flex flex-col gap-4 border-t border-border pt-8 font-mono text-[0.6rem] uppercase tracking-[0.45em] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>PlayStation 5 / Xbox Series X|S</span>
        <span>Fan-made tribute — not affiliated with Rockstar Games</span>
        <span>© 2026 <span className="gta-gradient-text font-extrabold">Jasurbek Haydarov</span>, Github Source Code.</span>
      </div>
    </section>
  );
}
