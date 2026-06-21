import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, ExternalLink } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultScholarships = [];

export default function ScholarshipsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("admissions");
  // Schema: scholarships = [{category, concession, description}]
  const scholarships = data?.scholarships?.length > 0 ? data.scholarships : defaultScholarships;

  return (
    <Layout>
      <PageHeader
        title="Scholarships"
        subtitle="Financial support options for deserving students across all programs"
        breadcrumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Scholarships" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <p className="reveal text-foreground/70 leading-relaxed mb-12">
              IIMT believes that financial constraints should never hinder a student's access to quality education. We offer multiple scholarship schemes — merit-based, category-based, and need-based — to ensure that every deserving student can pursue their academic goals.
            </p>

            <div className="space-y-6">
              {scholarships.map((s: any, i: number) => (
                <div key={s.category || i} className={`reveal delay-${Math.min(i, 5)}00 rounded-xl border bg-card p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-navy" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">{s.category}</h3>
                      <div className="grid sm:grid-cols-1 gap-3 text-sm">
                        <div className="sm:col-span-1"><span className="text-muted-foreground block text-xs mb-1">Details</span><span className="text-foreground/80">{s.description || s.concession}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-section-alt border text-center">
              <p className="text-sm text-foreground/70 mb-3">Government Scholarships (SC/ST/OBC) are processed through:</p>
              <a href="https://scholarship.up.gov.in" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline">
                UP Scholarship Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
