import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import auditoriumImg from "@/assets/auditorium.jpg";


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

  return (
    <Layout>
      <PageHeader title="Auditorium" subtitle="A modern venue for convocations, seminars, and cultural events" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Auditorium" }]} />
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
            {!auditorium?.equipmentWideImage && (
              <div className="reveal rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] mb-10">
                <img src={auditorium?.image || auditorium?.imageUrl || auditorium?.bannerImage || defaultImage} alt="IIMT Auditorium" className="w-full h-[350px] object-cover" />
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
                  <p className="text-foreground/70 leading-relaxed">The IIMT auditorium is a 500+ seat multipurpose venue equipped with professional audio-visual systems, stage lighting, and climate control. It serves as the primary venue for convocation ceremonies, national seminars, guest lectures, cultural performances during Kshitiz fest, and institutional functions.</p>
                  <p className="text-foreground/70 leading-relaxed">The facility includes a large stage, green rooms for performers, separate entry/exit points for crowd management, and modern projection equipment for presentations and film screenings.</p>
                </>
              )}
            </div>
            
            <div className="reveal delay-200 grid sm:grid-cols-3 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="p-5 rounded-xl border bg-card text-center">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mt-12 pt-10 border-t mb-12">
              {auditorium?.equipmentCloseups?.length > 0 && (
                <div className="reveal">
                  <h3 className="text-xl font-bold text-navy mb-6">Stage & Technical Control</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {auditorium.equipmentCloseups.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-28 bg-slate-100 group">
                          <img src={url} alt={`Auditorium Facility ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {auditorium?.studentsWorkingImages?.length > 0 && (
                <div className="reveal">
                  <h3 className="text-xl font-bold text-navy mb-6">Performances & Events</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {auditorium.studentsWorkingImages.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-28 bg-slate-100 group">
                          <img src={url} alt={`Event Performance ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {auditorium?.safetySignageImage && (
              <div className="reveal p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-6 items-center mb-12">
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-slate-800 text-lg">Fire Exit & Safety Guidelines</h4>
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
      <EnquiryCTA />
    </Layout>
  );
}
