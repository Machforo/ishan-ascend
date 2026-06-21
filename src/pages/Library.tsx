import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import libraryImg from "@/assets/students-library.jpg";

export default function LibraryPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const defaultImage = libraryImg;
  const library = data?.library;
  const content = library?.content;
  const fallbackSpecs = [
    { label: "Total Books", value: "15,000+" },
    { label: "Journals", value: "50+ subscriptions" },
    { label: "Reading Room", value: "100+ seats" },
    { label: "Timings", value: "8 AM – 6 PM" },
    { label: "Digital Access", value: "INFLIBNET N-LIST" },
    { label: "Borrowing Limit", value: "3 books / 14 days" },
    { label: "E-Journals", value: "6,000+ via N-LIST" },
    { label: "Archive", value: "Past papers & dissertations" },
  ];
  const specs = library?.specs?.length > 0 ? library.specs : fallbackSpecs;
  return (
    <Layout>
      <PageHeader
        title="Library"
        subtitle="A comprehensive knowledge resource centre supporting academic excellence"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Library" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] mb-10">
              <img src={library?.imageUrl || defaultImage} alt="IIMT Library" className="w-full h-[350px] object-cover" />
            </div>
            <div className="reveal space-y-5 mb-12">
              {content ? (
                <div 
                  className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                  dangerouslySetInnerHTML={{ __html: content }} 
                />
              ) : (
                <>
                  <p className="text-foreground/70 leading-relaxed">
                    The IIMT library serves as the academic backbone of the institution, housing over 15,000 books across management, commerce, computer science, education, and general reference categories. The library subscribes to national and international journals and provides INFLIBNET N-LIST access for digital resources.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    A spacious reading room accommodates 100+ students simultaneously, providing a quiet, air-conditioned environment for focused study.
                  </p>
                </>
              )}
            </div>
            <div className="reveal delay-100 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="p-4 rounded-xl border bg-card">
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
