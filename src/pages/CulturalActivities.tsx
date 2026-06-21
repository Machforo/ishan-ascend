import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function CulturalActivitiesPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const cultural = data?.culturalActivities;
  const content = cultural?.content;
  const fallbackSpecs = [
    { label: "Flagship Event", value: "Kshitiz Fest" },
    { label: "Activities", value: "Music, Dance, Drama, Arts" },
    { label: "Clubs", value: "Literary, Cultural, Tech" }
  ];
  const specs = cultural?.specs?.length > 0 ? cultural.specs : fallbackSpecs;

  return (
    <Layout>
      <PageHeader title="Cultural Activities" subtitle="Kshitiz fest, drama, music, dance, and creative expression at IIMT" breadcrumbs={[{ label: "Learning" }, { label: "Cultural Activities" }]} />
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
            <div className="grid sm:grid-cols-2 gap-4">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 flex items-center justify-between">
                   <span className="text-xs text-muted-foreground">{s.label}</span>
                   <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
