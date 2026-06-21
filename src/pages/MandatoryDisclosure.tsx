import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function MandatoryDisclosurePage() {
  const { data, loading } = useIIMTData("aboutus");
  if (loading) return null;

  const content = data?.mandatoryDisclosure || {
    complianceStatement: "The information provided below is submitted as required by the All India Council for Technical Education (AICTE) and is updated annually to ensure full transparency. Any discrepancies found in the reported data should be immediately brought to the notice of the Admissions Office at Knowledge Park, Greater Noida.\n\nAICTE mandates public disclosure for the benefit of current and prospective students, parents, and regulatory authorities. It serves as a comprehensive record of the institution's facilities, faculty, and academic standards, ensuring accountability in the delivery of professional education.",
    downloadPdfUrl: "#",
    disclosures: [
      { category: "Institution Details", items: [{ text: "Name of Institution" }, { text: "Address" }, { text: "Year of Establishment — 1994" }, { text: "Status of Institution — Private" }, { text: "Type of Institution — Co-education" }] },
      { category: "Academic Information", items: [{ text: "Programs offered: BBA, B.Com, BCA, M.Com, B.Ed, M.Ed" }, { text: "Annual intake per program" }, { text: "Faculty-student ratio" }, { text: "Pass percentage (last 5 years)" }] },
      { category: "Financial Information", items: [{ text: "Fee structure per program" }, { text: "Scholarship details" }, { text: "Audited financial statements (annual)" }] },
      { category: "Infrastructure", items: [{ text: "Total campus area" }, { text: "Built-up area" }, { text: "Library resources" }, { text: "Computer labs and IT infrastructure" }] },
      { category: "Faculty", items: [{ text: "Permanent faculty list with qualifications" }, { text: "Visiting faculty details" }, { text: "Faculty development programs" }] }
    ]
  };

  const ref = useScrollReveal([content]);

  return (
    <Layout>
      <PageHeader
        title="Mandatory Disclosure"
        subtitle="AICTE / UGC format mandatory disclosure document — updated annually"
        breadcrumbs={[{ label: "Mandatory Disclosure" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal bg-gold-light rounded-xl p-6 mb-12 flex items-start gap-4">
              <FileText className="w-6 h-6 text-navy shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Compliance Statement</p>
                <div className="text-sm text-foreground/70 leading-relaxed space-y-4">
                  {content.complianceStatement?.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {content.disclosures?.map((section: any, i: number) => (
                <div key={section.category || i} className={`reveal delay-${Math.min(i, 4)}00 rounded-xl border bg-card p-6`}>
                  <h3 className="font-display font-bold text-foreground mb-4">{section.category}</h3>
                  <ul className="space-y-2">
                    {section.items?.map((item: any, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                        {item.text || (typeof item === 'string' ? item : '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href={content.downloadPdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]">
                <Download className="w-4 h-4" />
                Download Full Disclosure PDF
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
