import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { useIIMTData } from "@/hooks/useIIMTData";

type Photo = { title: string; url: string };

// Static fallback albums (shown when CMS has no photos)
const staticAlbums = [
  { category: "Campus Life", images: Array.from({ length: 8 }, (_, i) => ({ id: `cl-${i}`, alt: `Campus life ${i + 1}` })) },
  { category: "Kshitiz Fest", images: Array.from({ length: 6 }, (_, i) => ({ id: `kf-${i}`, alt: `Kshitiz fest ${i + 1}` })) },
  { category: "Seminars", images: Array.from({ length: 6 }, (_, i) => ({ id: `sm-${i}`, alt: `Seminar ${i + 1}` })) },
  { category: "Sports", images: Array.from({ length: 4 }, (_, i) => ({ id: `sp-${i}`, alt: `Sports ${i + 1}` })) },
  { category: "Industrial Visits", images: Array.from({ length: 4 }, (_, i) => ({ id: `iv-${i}`, alt: `Industrial visit ${i + 1}` })) },
];

const staticCategories = ["All", ...staticAlbums.map((a) => a.category)];

export default function PhotoGalleryPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("gallery");
  const [filter, setFilter] = useState("All");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // CMS data: gallery.photos = [{title, url}]
  const photos: Photo[] = data?.photos?.length > 0 ? data.photos : [];
  const usingCMS = photos.length > 0;

  const activeCategories = usingCMS ? ["All"] : staticCategories;
  const filteredAlbums = usingCMS
    ? []
    : filter === "All"
    ? staticAlbums
    : staticAlbums.filter((a) => a.category === filter);

  const handleImgError = (key: string) =>
    setImgErrors((prev) => ({ ...prev, [key]: true }));

  return (
    <Layout>
      <PageHeader
        title="Photo Gallery"
        subtitle="Capturing moments from campus life, events, and academic activities"
        breadcrumbs={[{ label: "Gallery" }, { label: "Photos" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          {/* Category filter tabs */}
          <div className="reveal flex flex-wrap gap-2 mb-10">
            {activeCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors active:scale-[0.97] ${
                  filter === c
                    ? "bg-navy text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {usingCMS ? (
            /* ── CMS Photo Grid ── */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, i) => {
                const key = `${photo.url || "photo"}-${i}`;
                const broken = imgErrors[key] || !photo.url;
                return (
                  <div
                    key={key}
                    className={`reveal delay-${Math.min(i % 4, 3)}00 aspect-[4/3] rounded-xl bg-muted border overflow-hidden group cursor-pointer`}
                  >
                    {!broken ? (
                      <img
                        src={photo.url}
                        alt={photo.title}
                        onError={() => handleImgError(key)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50 gap-2 p-3">
                        <span className="text-muted-foreground/20 text-3xl font-bold">📷</span>
                        <span className="text-xs text-muted-foreground/50 text-center leading-snug">
                          {photo.title}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Static Placeholder Albums ── */
            <>
              {filteredAlbums.map((album) => (
                <div key={album.category} className="mb-12">
                  <h2 className="text-xl font-display font-bold text-foreground mb-5">
                    {album.category}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {album.images.map((img, i) => (
                      <div
                        key={img.id}
                        className={`reveal delay-${Math.min(i % 4, 3)}00 aspect-[4/3] rounded-xl bg-muted border overflow-hidden group cursor-pointer`}
                      >
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 group-hover:scale-105 transition-transform duration-500">
                          <span className="text-2xl font-display font-bold text-muted-foreground/20">
                            {album.category[0]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-center text-sm text-muted-foreground mt-8">
                Upload photos via the CMS gallery manager to populate this section.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
