import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import auditoriumImg from "@/assets/auditorium.jpg";

export default function AuditoriumPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const defaultImage = auditoriumImg;
  const auditorium = data?.auditorium;
  const content = auditorium?.content;
  const fallbackSpecs = [
    { label: "Seating", value: "500+ seats" },
    { label: "AV Equipment", value: "Professional setup" },
    { label: "Events Hosted", value: "Convocations, Seminars, Kshitiz" }
  ];
  const specs = auditorium?.specs?.length > 0 ? auditorium.specs : fallbackSpecs;

  return (
    <Layout>
      <PageHeader title="Auditorium" subtitle="A modern venue for convocations, seminars, and cultural events" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Auditorium" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] mb-10">
              <img src={auditorium?.imageUrl || defaultImage} alt="IIMT Auditorium" className="w-full h-[350px] object-cover" />
            </div>
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
            <div className="reveal delay-200 grid sm:grid-cols-3 gap-4">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="p-5 rounded-xl border bg-card text-center">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
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
