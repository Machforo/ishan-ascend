import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";

export default function BestPracticesPage() {
  const { data } = useIIMTData("aboutus");
  // Schema: bestPractices is an array of { title, content, image }
  const practices: Array<{title:string;content:string;image?:string}> = data?.bestPractices?.length > 0 ? data.bestPractices : [];
  const ref = useScrollReveal([practices]);

  return (
    <Layout>
      <PageHeader
        title="Best Practices"
        subtitle="NAAC-documented institutional best practices that set IIMT apart"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Best Practices" }]}
      />

      {data?.bestPracticesBanner && (
        <div className="container-wide mt-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
            <img src={data.bestPracticesBanner} alt="Best Practices Banner" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto prose prose-foreground">
            <div className="reveal space-y-8">
              {practices.length > 0 ? (
                practices.map((p, i) => (
                  <div key={p.title || i} className="p-6 rounded-xl border bg-card grid sm:grid-cols-[1fr_200px] gap-6 items-center">
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground mb-3">{i+1}. {p.title}</h2>
                      <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">{p.content}</p>
                    </div>
                    {p.image && (
                      <div className="rounded-xl overflow-hidden shadow-sm h-36 bg-slate-100 shrink-0">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <p className="text-foreground/70 leading-relaxed">
                    Ishan Institute of Management & Technology is deeply committed to the continuous improvement of teaching methodologies and institutional processes. Our best practices are systematically documented for NAAC peer review, ensuring that every initiative contributes to the holistic development of our students and the overall excellence of the institution.
                  </p>
                  <div className="p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Industry Integration & Experiential Learning</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      We bridge the gap between classroom theory and corporate reality through frequent industrial visits to manufacturing plants and financial hubs, expert guest lectures by industry veterans, and live project assignments. This practice ensures that our students gain real-world insights and are prepared for professional challenges from day one.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Structured Skill Development Programme</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      Beyond academics, we implement a structured soft skills programme that includes communication workshops, digital literacy across all programmes, and professional etiquette training. This practice is designed to enhance the employability and confidence of our students, making them stand out in competitive job markets.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Green Campus & Sustainability Initiatives</h2>
                    <p className="text-foreground/70 leading-relaxed">
                      IIMT prioritizes environmental consciousness through effective waste management, energy conservation measures, and student-led sustainability initiatives. Our commitment to a green campus fosters a sense of responsibility among students towards the environment and promotes a healthy, eco-friendly learning atmosphere.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border bg-card">
                    <h2 className="text-xl font-display font-bold text-foreground mb-3">Institutional Outcomes</h2>
                    <p className="text-foreground/70 leading-relaxed italic">
                      These practices have resulted in measurable improvements in student confidence, higher industry acceptance of our graduates, and a sustained reputation for academic and ethical excellence in the North India region.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <PageGallery images={data?.pageGallery} />
      <EnquiryCTA />
    </Layout>
  );
}
