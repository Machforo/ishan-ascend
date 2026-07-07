import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

const videos = [
  { title: "Campus Tour — IIMT Greater Noida", category: "Campus", ytId: "" },
  { title: "Kshitiz 2025 — Highlights", category: "Cultural", ytId: "" },
  { title: "Placement Success Stories", category: "Placements", ytId: "" },
  { title: "Convocation 2024", category: "Events", ytId: "" },
  { title: "Guest Lecture: Future of AI", category: "Academic", ytId: "" },
  { title: "Sports Day 2025", category: "Sports", ytId: "" },
];

export default function VideoGalleryPage() {
  const { data } = useIIMTData("gallery");
  const ref = useScrollReveal([data]);

  const getYTId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const videos = data?.videos?.length > 0 ? data.videos.map((v: any) => ({
    ...v,
    ytId: getYTId(v.url)
  })) : [
    { title: "Campus Tour — IIMT Greater Noida", category: "Campus", ytId: "" },
    { title: "Kshitiz 2025 — Highlights", category: "Cultural", ytId: "" },
    { title: "Placement Success Stories", category: "Placements", ytId: "" },
    { title: "Convocation 2024", category: "Events", ytId: "" },
    { title: "Guest Lecture: Future of AI", category: "Academic", ytId: "" },
    { title: "Sports Day 2025", category: "Sports", ytId: "" },
  ];
  return (
    <Layout>
      <PageHeader title="Video Gallery" subtitle="Watch campus tours, event highlights, and student testimonials" breadcrumbs={[{ label: "Gallery" }, { label: "Videos" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v: any, i: number) => (
              <div key={v.title || v.ytId || i} className={`reveal delay-${Math.min(i % 3, 2)}00 group rounded-xl border bg-card overflow-hidden hover:shadow-[0_8px_30px_hsl(var(--navy)/0.08)] transition-shadow cursor-pointer`}>
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  {v.ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.ytId}`}
                      title={v.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-navy/80 flex items-center justify-center group-hover:bg-navy transition-colors">
                      <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-gold">{v.category}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">Video placeholders shown — embed YouTube videos via CMS.</p>
        </div>
      </section>
    </Layout>
  );
}
