import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";

export default function PressCoveragePage() {
  const { data } = useIIMTData("gallery");
  const ref = useScrollReveal([data]);
  const pressItems = data?.pressCoverage?.length > 0 ? data.pressCoverage.map((p: any) => ({
    publication: p.title.split('—')[1]?.trim() || "Press Release",
    date: p.date,
    headline: p.title.split('—')[0]?.trim() || p.title,
    url: p.url
  })) : [
    { publication: "Times of India", date: "March 2025", headline: "IIMT Greater Noida achieves 95% placement in BBA program" },
    { publication: "Hindustan Times", date: "Feb 2025", headline: "Kshitiz 2025: Greater Noida's largest inter-college cultural fest" },
    { publication: "Dainik Jagran", date: "Jan 2025", headline: "IIMT signs MoU with HDFC Bank for campus recruitment" },
  ];

  return (
    <Layout>
      <PageHeader title="Press Coverage" subtitle="IIMT in the news — media mentions and press clippings" breadcrumbs={[{ label: "Gallery" }, { label: "Press Coverage" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-4">
            {pressItems.map((item, i) => (
              <div key={i} className={`reveal delay-${Math.min(i, 5)}00 flex items-center gap-5 p-5 rounded-xl border bg-card hover:shadow-sm transition-shadow`}>
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0"><span className="text-xs font-bold text-muted-foreground/30">CLIP</span></div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold text-navy">{item.publication}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground">{item.headline}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
