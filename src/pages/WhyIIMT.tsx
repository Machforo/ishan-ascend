import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import DynamicPageSections from "@/components/DynamicPageSections";

const defaultReasons = [];

export default function WhyIIMTPage() {
  const { data } = useIIMTData("aboutus");
  const whyContent: string | undefined = data?.whyIimt?.content;
  const ref = useScrollReveal([whyContent]);

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader
        key="header"
        title="Why IIMT?"
        subtitle="10 reasons why students and parents choose IIMT for quality education in Delhi NCR"
        breadcrumbs={[{ label: "Why IIMT?" }]}
      />
    ),
    overview: (
      <div key="overview">
        {data?.whyIimt?.bannerImage && (
          <div className="container-wide mt-12">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
              <img src={data.whyIimt.bannerImage} alt="Why IIMT Banner" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <section className="py-20 md:py-28" ref={ref}>
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              {whyContent ? (
                <div 
                  className="reveal prose max-w-none text-foreground/70 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: whyContent }}
                />
              ) : (
                <div className="space-y-6">
                  {defaultReasons.map((r: any, i: number) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className={`reveal delay-${Math.min(i % 3, 2)}00 flex gap-5 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group`}>
                        <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                          <Icon className="w-6 h-6 text-navy" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground text-lg mb-2">{i + 1}. {r.title}</h3>
                          <p className="text-sm text-foreground/70 leading-relaxed">{r.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {data?.whyIimt?.images?.length > 0 && (
                <div className="reveal mt-12 pt-10 border-t">
                  <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">Campus Facilities & Culture</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {data.whyIimt.images.map((photo: any, i: number) => {
                      const url = photo?.url || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-md h-48 bg-slate-100 group">
                          <img 
                            src={url} 
                            alt={`Facility ${i + 1}`} 
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
    cta: (
      <EnquiryCTA
        key="cta"
        title="Convinced? Take the Next Step"
        subtitle="Schedule a campus visit or speak with our admissions counsellor today."
      />
    ),
  };

  const defaultOrder = ["header", "overview", "cta"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="why_iimt"
        defaultOrder={defaultOrder}
        defaultSections={defaultSections}
      />
    </Layout>
  );
}
