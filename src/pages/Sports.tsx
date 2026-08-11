import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { useIIMTData } from "@/hooks/useIIMTData";


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

  return (
    <Layout>
      <PageHeader title="Sports" subtitle="Inter-college competitions, annual sports meet, and campus recreational facilities" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Sports" }]} />
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
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>

            {sports?.interiorDetails?.length > 0 && (
              <div className="reveal mt-12 pt-10 border-t">
                <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">Sports Facilities & Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sports.interiorDetails.map((photo: any, i: number) => {
                    const url = photo?.url || photo?.image || photo;
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-32 md:h-40 bg-slate-100 group">
                        <img 
                          src={url} 
                          alt={`Sports Detail ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {sports?.images?.length > 0 && (
              <div className="reveal mt-12 pt-10 border-t">
                <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">Sports Facilities & Events</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {sports.images.map((photo: any, i: number) => {
                    const url = photo?.url || photo;
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-md h-48 bg-slate-100 group">
                        <img
                          src={url}
                          alt={`Sports Action ${i + 1}`}
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

      <EnquiryCTA />
    </Layout>
  );
}
