/**
 * Full-screen film grain + vignette overlay.
 * Purely decorative, sits above all content and ignores pointer events.
 */
export function FilmGrain() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      <div className="grain-layer absolute inset-0" />
      <div className="vignette-layer absolute inset-0" />
    </div>
  );
}
