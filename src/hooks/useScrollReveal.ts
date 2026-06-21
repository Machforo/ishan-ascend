import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(deps: any[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the element and all children with reveal classes
    const revealElements = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach((child) => observer.observe(child));
    if (el.classList.contains("reveal") || el.classList.contains("reveal-left") || el.classList.contains("reveal-right")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, deps);

  return ref;
}
