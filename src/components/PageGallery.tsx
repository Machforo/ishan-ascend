import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageGallery({ images: propImages, title: propTitle, className, isInline }: { images?: any, title?: string, className?: string, isInline?: boolean }) {
  const [globalData, setGlobalData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (isInline && typeof window !== 'undefined') {
      (window as any).__renderedGalleryPath = location.pathname;
    }
  }, [isInline, location.pathname]);

  useEffect(() => {
    const fetchGlobalGallery = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://ishan-backend-g096.onrender.com/api";
        const cleanPath = location.pathname.replace(/\/+$/, '') || '/';
        let res = await fetch(`${apiBase}/iimt/page-galleries/by-url?url=${encodeURIComponent(location.pathname)}`);
        if (!res.ok && cleanPath !== location.pathname) {
          res = await fetch(`${apiBase}/iimt/page-galleries/by-url?url=${encodeURIComponent(cleanPath)}`);
        }
        if (res.ok) {
          const data = await res.json();
          if (data && data.images && data.images.length > 0) {
             setGlobalData(data);
          } else {
             setGlobalData(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch global gallery", err);
      }
    };
    fetchGlobalGallery();
  }, [location.pathname]);

  // If this is the bottom fallback gallery outside DynamicPageSections, and an inline gallery was already rendered, avoid duplication
  if (!isInline && typeof window !== 'undefined' && (window as any).__renderedGalleryPath === location.pathname) {
    return null;
  }

  // Use global data if it exists, otherwise fallback to props
  let actualImages = globalData?.images || propImages;
  let actualTitle = globalData?.title || propTitle;
  
  if (actualImages && !Array.isArray(actualImages) && typeof actualImages === 'object') {
     actualTitle = actualImages.title || actualTitle;
     actualImages = actualImages.images;
  }

  if (!actualImages || !Array.isArray(actualImages) || actualImages.length === 0) return null;

  return (
    <section className={`py-12 bg-background border-t ${className || ""}`}>
      <div className="container-wide mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">{actualTitle || "Gallery"}</h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {actualImages.map((img: any, i: number) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
              <img
                src={img.url || img}
                alt={img.caption || ((actualTitle ? actualTitle + " " : "") + "Gallery Image " + (i + 1))}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {img.caption && (
                 <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.caption}
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
