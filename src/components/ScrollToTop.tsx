import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Slight delay to ensure content is rendered before scrolling
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }
  }, [pathname, hash]);

  return null;
}
