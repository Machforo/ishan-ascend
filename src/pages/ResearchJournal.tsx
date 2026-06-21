import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function ResearchJournalPage() {
  const { data, loading } = useIIMTData("aboutus");
  const content = data?.researchJournal || {
    description: "Management Stream (ISSN: 0974-0554) is the peer-reviewed research journal published by Ishan Institute of Management & Technology. Listed in the UGC CARE list, the journal publishes original research papers in areas of management, commerce, economics, and allied social sciences. The journal is published bi-annually and invites contributions from researchers, academicians, and practitioners.",
    issn: "0974-0554",
    frequency: "Bi-annual",
    ugcCare: "Listed",
    peerReviewed: "Yes",
    websiteUrl: "https://ms.ishan.ac"
  };
  const ref = useScrollReveal([content]);

  if (loading) return null;

  return (
    <Layout>
      <PageHeader title="Research Journal" subtitle="Management Stream — UGC CARE listed peer-reviewed journal" breadcrumbs={[{ label: "Research" }, { label: "Journal" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide"><div className="max-w-3xl mx-auto reveal space-y-6">
          <p className="text-foreground/70 leading-relaxed">{content.description}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ label: "ISSN", value: content.issn }, { label: "Frequency", value: content.frequency }, { label: "UGC CARE", value: content.ugcCare }, { label: "Peer Reviewed", value: content.peerReviewed }].map((s) => (
              <div key={s.label} className="p-4 rounded-xl border bg-card">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <a href={content.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]">
            Visit Journal Website <ExternalLink className="w-4 h-4" />
          </a>
        </div></div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
