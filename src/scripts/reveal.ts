export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>(".rise, .draw");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((e) => e.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => {
    const r = e.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) e.classList.add("is-in"); // already on screen: never hide
    else io.observe(e);
  });
  // Hide-until-seen only starts once this script runs, so without JS (or if it fails) everything stays visible.
  document.documentElement.classList.add("js");
}
