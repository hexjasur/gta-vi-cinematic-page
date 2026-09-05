import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollVideoSectionProps {
  /** Public path to the local video file, e.g. "/videos/scroole 1.mp4" */
  src: string;
  /** Scroll distance of the pinned scrub, expressed in viewport heights. */
  scrollLength?: number;
  /** Extra classes for the video element (filters, scale treatments). */
  videoClassName?: string;
  /** Overlay treatment rendered above the video. */
  overlay?: ReactNode;
  /** Content layered on top of the video inside the pinned viewport. */
  children?: (progress: { ready: boolean }) => ReactNode;
  id?: string;
}

/**
 * A pinned, scroll-scrubbed video.
 * Scroll progress maps 1:1 onto video.currentTime (down = forward, up = backward).
 * Nothing autoplays: the element is muted, paused and driven exclusively by scroll.
 */
export function ScrollVideoSection({
  src,
  scrollLength = 3,
  videoClassName = "",
  overlay,
  children,
  id,
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.pause();

    // Mobile devices throttle heavy seeking: shorten the scrub and lower precision.
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    const state = { time: 0 };
    let target = 0;
    let seeking = false;
    let raf = 0;

    /** Frame-limited seek loop: never queue a new seek while one is in flight. */
    const pump = () => {
      raf = 0;
      if (seeking) return;
      const current = video.currentTime;
      if (Math.abs(current - target) < 1 / 60) return;
      seeking = true;
      video.currentTime = target;
    };

    const onSeeked = () => {
      seeking = false;
      if (Math.abs(video.currentTime - target) > 1 / 60 && !raf) {
        raf = requestAnimationFrame(pump);
      }
    };
    video.addEventListener("seeked", onSeeked);

    let trigger: ScrollTrigger | null = null;

    const setup = () => {
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;
      setReady(true);

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${(isCoarse ? scrollLength * 0.7 : scrollLength) * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: isCoarse ? 0.4 : 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.time = self.progress * duration;
          target = Math.min(duration - 0.02, Math.max(0, state.time));
          if (!raf) raf = requestAnimationFrame(pump);
        },
      });
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", setup);
      trigger?.kill();
    };
  }, [scrollLength, src]);

  return (
    <section id={id} ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      />
      {overlay}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={ready}
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-muted-foreground">
          Loading
        </span>
      </div>
      {children?.({ ready })}
    </section>
  );
}
