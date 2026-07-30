import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(deps: any[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observedElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
            observedElements.delete(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const observeNewElements = () => {
      const revealElements = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
      revealElements.forEach((child) => {
        if (!observedElements.has(child) && !child.classList.contains("revealed")) {
          observer.observe(child);
          observedElements.add(child);
        }
      });
      if (
        (el.classList.contains("reveal") || el.classList.contains("reveal-left") || el.classList.contains("reveal-right")) &&
        !observedElements.has(el) &&
        !el.classList.contains("revealed")
      ) {
        observer.observe(el);
        observedElements.add(el);
      }
    };

    // Initial observation
    observeNewElements();

    // Set up MutationObserver to detect new DOM nodes when dynamic data is loaded
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, deps);

  return ref;
}
