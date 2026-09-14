import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import auditoriumImg from "@/assets/auditorium.jpg";
import DynamicPageSections from "@/components/DynamicPageSections";

export default function AuditoriumPage() {
  const { data } = useIIMTData("campuslife");
  const defaultImage = auditoriumImg;
  const auditorium = data?.auditorium;
  const content = auditorium?.content;
  const ref = useScrollReveal([auditorium]);
  const fallbackSpecs = [
    { label: "Seating", value: "500+ seats" },
    { label: "AV Equipment", value: "Professional setup" },
    { label: "Events Hosted", value: "Convocations, Seminars, Kshitiz" }
  ];
  const specs = auditorium?.specs?.length > 0 ? auditorium.specs : fallbackSpecs;

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader
        key="header"
        title="Auditorium"
        subtitle="A modern venue for convocations, seminars, and cultural events"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Auditorium" }]}
      />
    ),
    overview: (
      <div key="overview">
        {(auditorium?.equipmentWideImage || auditorium?.image || auditorium?.bannerImage || auditorium?.imageUrl) && (
          <div className="container-wide mt-12">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
              <img src={auditorium.equipmentWideImage || auditorium.image || auditorium.bannerImage || auditorium.imageUrl} alt="Auditorium Wide Angle" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <section className="py-20 md:py-28" ref={ref}>
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              {!auditorium?.equipmentWideImage && !auditorium?.bannerImage && (
                <div className="reveal rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] mb-10">
                  <img src={auditorium?.image || auditorium?.imageUrl || defaultImage} alt="IIMT Auditorium" className="w-full h-[350px] object-cover" />
                </div>
              )}
              <div className="reveal delay-100 space-y-5 mb-12">
                {content ? (
                  <div 
                    className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                ) : (
                  <>
                    <p className="text-foreground/70 leading-relaxed">The IIMT Auditorium is a centrally air-conditioned, 500+ seat multi-purpose venue designed for major academic conferences, convocation ceremonies, corporate guest lectures, and cultural performances. Built with acoustic wall panelling and professional stage lighting, it provides an exceptional experience for both presenters and audience members.</p>
                    <p className="text-foreground/70 leading-relaxed">The venue is equipped with a high-definition projection system, digital sound console, wireless microphones, and dedicated green rooms for performers. It serves as the cultural hub of the campus throughout the academic year.</p>
                  </>
                )}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {specs.map((s: any, i: number) => (
                  <div key={s.label || i} className={`reveal delay-${Math.min(i, 3)}00 p-5 rounded-xl border bg-card text-center`}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="font-display font-bold text-foreground text-sm">{s.value}</p>
                  </div>
                ))}
              </div>

              {auditorium?.equipmentCloseups?.length > 0 && (
                <div className="reveal mb-16 pt-10 border-t">
                  <h3 className="text-xl font-bold text-navy mb-6">Stage & Technical Equipment</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {auditorium.equipmentCloseups.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-slate-100 group">
                          <img 
                            src={url} 
                            alt={`Equipment ${i + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {auditorium?.gallery?.length > 0 && (
                <div className="reveal mb-16 pt-10 border-t">
                  <h3 className="text-xl font-bold text-navy mb-6">Auditorium Event Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {auditorium.gallery.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-100 group">
                          <img 
                            src={url} 
                            alt={`Auditorium Event ${i + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {auditorium?.safetySignageImage && (
                <div className="reveal p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
                  <div className="space-y-2 flex-1">
                    <h4 className="font-bold text-navy text-lg">Safety & Guidelines</h4>
                    <p className="text-sm text-slate-600">Please locate the nearest fire exits upon entering. Food, drinks, and smoking are strictly prohibited inside the main hall.</p>
                  </div>
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border bg-white shadow-sm">
                    <img src={auditorium.safetySignageImage} alt="Auditorium Safety Guidelines" className="w-full h-full object-cover" />
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
        pageId="auditorium"
        defaultOrder={defaultOrder}
        defaultSections={defaultSections}
      />
    </Layout>
  );
}
