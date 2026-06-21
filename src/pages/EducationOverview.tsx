import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { GraduationCap, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function EducationOverviewPage() {
  const ref = useScrollReveal();
  const { data, isLoading } = useIIMTData("academics");
  
  const fallbackDesc = "The Education wing of IIMT offers NCTE-approved Bachelor of Education (B.Ed) and Master of Education (M.Ed) programs under CCS University affiliation. Recognized by SCERT, Uttar Pradesh, these programs prepare aspiring teachers with the pedagogical skills, classroom management techniques, and subject expertise required for a successful teaching career. With dedicated pedagogy labs, micro-teaching facilities, ICT-integrated instruction, and a strong network of partner schools for practice teaching, IIMT's education programs stand among the best in the Delhi NCR region.";
  const fallbackHighlights = [
    "NCTE approved institution", "SCERT recognized", "CCS University affiliated",
    "Dedicated pedagogy labs", "Practice teaching at partner schools", "ICT-integrated instruction",
    "Prepares for CTET, UPTET, TGT, PGT", "Micro-teaching lab with video recording"
  ];

  const description = data?.educationOverview?.description || fallbackDesc;
  const highlights = data?.educationOverview?.highlights?.length > 0 ? data.educationOverview.highlights : fallbackHighlights;

  return (
    <Layout>
      <PageHeader
        title="Education Programs"
        subtitle="NCTE-approved B.Ed and M.Ed programs preparing future teachers for TGT, PGT, and CTET careers"
        breadcrumbs={[{ label: "Education Programs" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal space-y-5 mb-16">
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item: string) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Link to="/courses/bed" className="reveal group block p-8 rounded-xl border bg-card hover:shadow-[0_8px_30px_hsl(var(--navy)/0.1)] transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gold-light flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <GraduationCap className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">B.Ed</h3>
                <p className="text-sm text-muted-foreground mb-1">Bachelor of Education</p>
                <p className="text-sm text-foreground/70 mb-4">2-year professional degree for aspiring school teachers. NCTE approved.</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                  View Details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link to="/courses/med" className="reveal delay-100 group block p-8 rounded-xl border bg-card hover:shadow-[0_8px_30px_hsl(var(--navy)/0.1)] transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gold-light flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Users className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">M.Ed</h3>
                <p className="text-sm text-muted-foreground mb-1">Master of Education</p>
                <p className="text-sm text-foreground/70 mb-4">2-year PG degree for educational leadership and research. NCTE approved.</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                  View Details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
