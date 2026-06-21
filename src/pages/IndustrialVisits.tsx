import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import { Factory, Landmark, Cpu, Building2, ExternalLink } from "lucide-react";

export default function IndustrialVisitsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("learning");

  const industrial = data?.industrialVisits;
  
  const visits = industrial?.visits?.length > 0 ? industrial.visits : [
    {
      company: "Mother Dairy",
      sector: "FMCG / Manufacturing",
      program: "B.Com, BBA",
      year: "2023-24",
      outcome: "Understanding large-scale logistics, quality control, and supply chain management.",
    },
    {
      company: "NSE (National Stock Exchange)",
      sector: "Finance / BFSI",
      program: "B.Com, M.Com",
      year: "2023-24",
      outcome: "Insights into stock market operations, trading mechanisms, and financial regulations.",
    },
    {
      company: "Yamaha Motors",
      sector: "Automobile / Tech",
      program: "BCA, BBA",
      year: "2022-23",
      outcome: "Exposure to automated assembly lines and industrial management systems.",
    },
    {
      company: "Parle-G",
      sector: "FMCG",
      program: "BBA",
      year: "2022-23",
      outcome: "Learning about mass production processes and brand management in real-time.",
    },
  ];

  const description = industrial?.description || "Industrial visits are a core part of experiential learning at IIMT. Students visit manufacturing plants, financial institutions, tech companies, and government organisations to witness classroom theory in action. These visits are organised semester-wise for all programmes to ensure students stay updated with current industry practices.";
  
  const whyMatters = industrial?.whyVisitsMatter?.length > 0 ? industrial.whyVisitsMatter : [
    "Professional environment exposure helps students adapt to workplace culture early.",
    "Industry networking opportunities with professionals and HR managers during visits.",
    "Organisational culture insights provide clarity on career paths and industry expectations."
  ];

  return (
    <Layout>
      <PageHeader
        title={visitsData?.pageTitle || "Industrial Visits"}
        subtitle="Connecting classroom theory with real-world industrial operations."
        breadcrumbs={[{ label: "Industrial Visits" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Experiential Learning</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                Beyond the Classroom Walls
              </h2>
              {industrial?.description ? (
                <div 
                  className="text-foreground/70 leading-relaxed [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: industrial.description }} 
                />
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  {description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-card flex items-center gap-3">
                  <Factory className="w-5 h-5 text-gold" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Manufacturing</span>
                </div>
                <div className="p-4 rounded-xl border bg-card flex items-center gap-3">
                  <Landmark className="w-5 h-5 text-gold" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Finance</span>
                </div>
                <div className="p-4 rounded-xl border bg-card flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-gold" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Technology</span>
                </div>
                <div className="p-4 rounded-xl border bg-card flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gold" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">Corporate</span>
                </div>
              </div>
            </div>

            <div className="reveal-right bg-section-alt rounded-3xl p-8 md:p-10 border shadow-sm">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">Why Visits Matter</h3>
              <ul className="space-y-6">
                {whyMatters.map((m: any, i: number) => {
                  const text = typeof m === 'string' ? m : m.text || '';
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                        <span className="text-xs font-bold text-gold">{i + 1}</span>
                      </div>
                      <p className="text-foreground/70 text-sm">{text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container-wide">
          <h2 className="text-3xl font-display font-bold text-foreground mb-12 text-center">Recent Industrial Visits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {visits.map((v, i) => (
              <div key={i} className="group p-6 rounded-2xl border bg-background hover:border-gold transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-foreground group-hover:text-navy transition-colors">{v.company}</h4>
                    <p className="text-xs font-semibold text-gold uppercase tracking-widest">{v.sector}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded text-foreground/60">{v.year}</span>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-foreground/80 leading-relaxed italic">"{v.outcome}"</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50 text-[11px] font-bold text-foreground/50 uppercase">
                    <span>Program: {v.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
