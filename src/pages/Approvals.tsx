import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, ExternalLink } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultAccreditations = [
  { title: "UGC", description: "Recognition under Section 2(f) of UGC Act. University Grants Commission.", logo: "https://iimt.ishan.ac/images/accreditation/ugc-logo.gif" },
  { title: "AICTE", description: "Approval for BBA and BCA programs. All India Council for Technical Education.", logo: "https://iimt.ishan.ac/images/accreditation/aicte-logo.png" },
  { title: "NAAC", description: "Quality accreditation benchmark. National Assessment and Accreditation Council.", logo: "" },
  { title: "NCTE", description: "Approval for B.Ed and M.Ed programs. National Council for Teacher Education.", logo: "https://iimt.ishan.ac/images/accreditation/ncte-logo.png" },
  { title: "SCERT", description: "Recognition for education programs. State Council of Educational Research & Training.", logo: "https://iimt.ishan.ac/images/accreditation/scert-logo.jpg" },
  { title: "CCS University", description: "Affiliation for all degree programs. Chaudhary Charan Singh University, Meerut.", logo: "" },
];

export default function ApprovalsPage() {
  const { data } = useIIMTData("aboutus");
  const accreditations = data?.approvalsAffiliations?.length > 0 ? data.approvalsAffiliations : defaultAccreditations;
  const ref = useScrollReveal([accreditations]);

  return (
    <Layout>
      <PageHeader
        title="Approvals & Affiliations"
        subtitle="IIMT is fully recognized by national regulatory bodies, ensuring credibility and academic standards."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Approvals & Affiliations" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Regulatory Compliance</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">A Fully Accredited Institution</h2>
            <p className="text-foreground/70 leading-relaxed">
              Academic approvals and affiliations are the foundation of institutional credibility. They ensure degree validity, placement acceptance by corporate partners, and strict adherence to national regulatory standards. IIMT holds all relevant approvals from India's premier education regulators, providing our students with a globally recognized qualification.
            </p>
            <div className="grid md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="font-bold text-navy">AICTE</h4>
                <p className="text-xs text-foreground/60">Ensures technical and management education meets global benchmarks of quality and curriculum relevance.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-navy">CCS University</h4>
                <p className="text-xs text-foreground/60">Provides academic affiliation, standardized examination processes, and the final degree certification.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-navy">NAAC</h4>
                <p className="text-xs text-foreground/60">A quality benchmark that audits institutional infrastructure, faculty expertise, and student outcomes.</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {accreditations.map((acc: any, i: number) => (
              <div key={acc.title || acc.name || i} className={`reveal delay-${Math.min(i, 5)}00 bg-card rounded-xl border p-6 text-center shadow-sm hover:shadow-[0_8px_30px_hsl(var(--navy)/0.08)] transition-shadow`}>
                {(acc.logo || acc.image) ? (
                  <img src={acc.logo || acc.image} alt={acc.title || acc.name} className="h-20 mx-auto object-contain mb-4" loading="lazy" />
                ) : (
                  <div className="h-20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-display font-bold text-navy">{acc.title || acc.name}</span>
                  </div>
                )}
                <h3 className="font-semibold text-foreground text-sm">{acc.title || acc.name}</h3>
                <p className="text-xs text-foreground/60 mt-2">{acc.description || acc.desc || acc.subheading}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gold-light border border-[hsl(var(--gold)/0.2)]">
              <FileText className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-foreground/80">
                For approval letters and detailed disclosure documents, visit the{" "}
                <a href="/mandatory-disclosure" className="text-navy font-semibold hover:underline">Mandatory Disclosure</a> page.
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
