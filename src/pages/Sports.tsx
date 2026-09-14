import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import DynamicPageSections from "@/components/DynamicPageSections";

export default function SportsPage() {
  const { data } = useIIMTData("campuslife");
  const sports = data?.sports;
  const content = sports?.content;
  const fallbackSpecs = [
    { label: "Outdoor", value: "Cricket Ground, Basketball Court" },
    { label: "Indoor", value: "Table Tennis, Badminton, Chess" },
    { label: "Annual Event", value: "Sports Meet" },
    { label: "Teams", value: "Inter-College Tournaments" }
  ];
  const specs = sports?.specs?.length > 0 ? sports.specs : fallbackSpecs;
  const ref = useScrollReveal([sports]);

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader
        key="header"
        title="Sports"
        subtitle="Inter-college competitions, annual sports meet, and campus recreational facilities"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Sports" }]}
      />
    ),
    overview: (
      <div key="overview">
        {(sports?.bannerImage || sports?.image || sports?.heroWideAngle || sports?.imageUrl) && (
          <div className="container-wide mt-12">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
              <img src={sports.bannerImage || sports.image || sports.heroWideAngle || sports.imageUrl} alt="Sports Banner" className="w-full h-full object-cover" />
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
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  IIMT promotes physical fitness and sportsmanship through a comprehensive sports program. The campus features facilities for cricket, basketball, badminton, volleyball, table tennis, and athletics. The annual sports meet is a highlight of the academic calendar, bringing together students from all departments in a spirit of healthy competition.
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {specs.map((s: any, i: number) => (
                  <div key={s.label || i} className="p-5 rounded-xl border bg-card text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="font-display font-bold text-foreground text-sm">{s.value}</p>
                  </div>
                ))}
              </div>

              {sports?.equipmentCloseups?.length > 0 && (
                <div className="reveal mt-12 pt-10 border-t">
                  <h3 className="text-xl font-bold text-navy mb-6">Sports Facilities & Grounds</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {sports.equipmentCloseups.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-slate-100 group">
                          <img
                            src={url}
                            alt={`Sports Facility ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {sports?.gallery?.length > 0 && (
                <div className="reveal mt-12 pt-10 border-t">
                  <h3 className="text-xl font-bold text-navy mb-6">Sports Events & Tournaments</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sports.gallery.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-100 group">
                          <img
                            src={url}
                            alt={`Tournament Event ${i + 1}`}
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
      </div>
    ),
    cta: <EnquiryCTA key="cta" />,
  };

  const defaultOrder = ["header", "overview", "cta"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="sports"
        defaultOrder={defaultOrder}
        defaultSections={defaultSections}
      />
    </Layout>
  );
}
