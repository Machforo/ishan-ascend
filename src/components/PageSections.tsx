import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { rt } from "@/lib/richText";

export default function PageSections({ sections: propSections }: { sections?: any }) {
  const [globalData, setGlobalData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchGlobalSections = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://ishan-backend-g096.onrender.com/api";
        const cleanPath = location.pathname.replace(/\/+$/, '') || '/';
        let res = await fetch(`${apiBase}/iimt/page-sections/by-url?url=${encodeURIComponent(location.pathname)}`);
        if (!res.ok && cleanPath !== location.pathname) {
          res = await fetch(`${apiBase}/iimt/page-sections/by-url?url=${encodeURIComponent(cleanPath)}`);
        }
        if (res.ok) {
          const data = await res.json();
          if (data && data.sections && data.sections.length > 0) {
             setGlobalData(data);
          } else {
             setGlobalData(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch global sections", err);
      }
    };
    fetchGlobalSections();
  }, [location.pathname]);

  // If this page's layout is dynamically rendered (via DynamicPageSections or StandardPage),
  // all sections including custom sections are already rendered inline in their layout positions.
  if (typeof window !== 'undefined' && (window as any).__renderedDynamicPagePath === location.pathname) {
    return null;
  }

  // Use global data if it exists, otherwise fallback to props
  let actualSections = globalData?.sections || propSections;

  if (actualSections && !Array.isArray(actualSections) && typeof actualSections === 'object') {
     actualSections = actualSections.sections;
  }

  if (!actualSections || !Array.isArray(actualSections) || actualSections.length === 0) return null;

  // Filter out any section whose html content has already been rendered on this page
  const renderedSet: Set<string> = (typeof window !== 'undefined' && (window as any).__renderedCustomHtmls) || new Set();
  const unrenderedSections = actualSections.filter((sec: any) => {
    const html = (sec.htmlContent || "").replace(/\s+/g, ' ').trim();
    if (!html) return false;
    return !renderedSet.has(html);
  });

  if (unrenderedSections.length === 0) return null;

  return (
    <>
      {unrenderedSections.map((sec: any, i: number) => (
        <div key={i} className="page-custom-section" dangerouslySetInnerHTML={{ __html: rt(sec.htmlContent || "") }} />
      ))}
    </>
  );
}
