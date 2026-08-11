import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Clock, IndianRupee, Users, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import PageSections from "@/components/PageSections";
import RichTextRenderer from "@/components/RichTextRenderer";

interface CoursePageProps {
  name: string;
  fullName: string;
  duration: string;
  fee: string;
  intake: string;
  eligibility: string;
  approvedBy: string;
  overview: string;
  careerScope: string;
  subjects: { year: string; items: string[] }[];
  careers: string[];
  breadcrumbParent?: { label: string; href: string };
}

export default function CourseDetailPage(props: CoursePageProps) {
  const ref = useScrollReveal();

  return (
    <Layout>
      <PageHeader
        title={`${props.name} — ${props.fullName}`}
        subtitle={`${props.duration} | ${props.approvedBy} | Affiliated to CCS University, Meerut`}
        breadcrumbs={[
          props.breadcrumbParent || { label: "Courses" },
          { label: props.name },
        ]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12">
            {/* Main content */}
            <div className="space-y-12">
              {/* Overview */}
              <div className="reveal">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">Program Overview</h2>
                <RichTextRenderer content={props.overview} className="text-foreground/70 leading-relaxed" />
              </div>

              {/* Subjects */}
              <div className="reveal delay-100">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Curriculum Structure</h2>
                <div className="space-y-6">
                  {props.subjects.map((yr) => (
                    <div key={yr.year} className="rounded-xl border bg-card p-6">
                      <h3 className="font-semibold text-foreground mb-3">{yr.year}</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {yr.items.map((sub) => (
                          <div key={sub} className="flex items-start gap-2 text-sm text-foreground/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Scope */}
              <div className="reveal delay-200">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">Career Scope</h2>
                <RichTextRenderer content={props.careerScope} className="text-foreground/70 leading-relaxed mb-6" />
                <div className="grid sm:grid-cols-2 gap-3">
                  {props.careers.map((c) => (
                    <div key={c} className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="reveal-right rounded-xl border bg-card p-6 shadow-sm sticky top-24">
                <h3 className="font-display font-bold text-foreground mb-5">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: "Duration", value: props.duration },
                    { icon: IndianRupee, label: "Annual Fee", value: props.fee },
                    { icon: Users, label: "Annual Intake", value: props.intake },
                    { icon: GraduationCap, label: "Eligibility", value: props.eligibility },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold-light flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-semibold text-foreground">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <Link to="/admissions" className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97]">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-navy border border-navy/20 rounded-lg hover:bg-navy/5 transition-colors active:scale-[0.97]">
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    <PageSections />
      </Layout>
  );
}
