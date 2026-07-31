import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";

export default function CulturalActivitiesPage() {
  const { data } = useIIMTData("campuslife");
  const cultural = data?.culturalActivities;
  const content = cultural?.content;
  const ref = useScrollReveal([cultural]);
  const fallbackSpecs = [
    { label: "Flagship Event", value: "Kshitiz Fest" },
    { label: "Activities", value: "Music, Dance, Drama, Arts" },
    { label: "Clubs", value: "Literary, Cultural, Tech" }
  ];
  const specs = cultural?.specs?.length > 0 ? cultural.specs : fallbackSpecs;

  return (
    <Layout>
      <PageHeader title="Cultural Activities" subtitle="Kshitiz fest, drama, music, dance, and creative expression at IIMT" breadcrumbs={[{ label: "Learning" }, { label: "Cultural Activities" }]} />
      {cultural?.bannerImage && (
        <div className="container-wide mt-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
            <img src={cultural.bannerImage} alt="Cultural Activities Banner" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-6">
            {content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <>
                <p className="text-foreground/70 leading-relaxed">Cultural activities at IIMT are anchored by Kshitiz — the annual inter-college cultural festival that draws participation from across the Delhi NCR region. Spanning three days of music, dance, drama, fashion, art, and literary competitions, Kshitiz is a platform for students to showcase their talents beyond the classroom.</p>
                <p className="text-foreground/70 leading-relaxed">Throughout the year, IIMT organizes cultural events including Republic Day and Independence Day celebrations, talent shows, photography contests, rangoli competitions, and departmental cultural programs.</p>
              </>
            )}
            
            <h2 className="text-xl font-display font-bold text-foreground">Cultural Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 flex items-center justify-between">
                   <span className="text-xs text-muted-foreground">{s.label}</span>
                   <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>

            {cultural?.images?.length > 0 && (
              <div className="reveal mt-12 pt-10 border-t">
                <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">Cultural Gallery & Kshitiz Fest</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {cultural.images.map((photo: any, i: number) => {
                    const url = photo?.url || photo;
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-md h-48 bg-slate-100 group">
                        <img 
                          src={url} 
                          alt={`Cultural Event ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <PageGallery images={data?.pageGallery} />
      <EnquiryCTA />
    </Layout>
  );
}
