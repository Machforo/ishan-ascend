import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultPrograms = [
  { name: "Tally ERP 9 / Prime", duration: "3 Months", fee: "₹5,000", eligibility: "Any student / graduate", desc: "Complete accounting software training covering voucher entries, GST reports, balance sheets, and payroll management." },
  { name: "GST Compliance", duration: "2 Months", fee: "₹3,500", eligibility: "B.Com / BBA students", desc: "Practical training in GST registration, return filing (GSTR-1, 3B, 9), invoice generation, and input tax credit." },
  { name: "Stock Market & Trading", duration: "3 Months", fee: "₹6,000", eligibility: "Any student", desc: "Learn fundamental and technical analysis, demat account operations, mutual funds, and investment strategies." },
  { name: "Digital Marketing", duration: "3 Months", fee: "₹6,000", eligibility: "Any student", desc: "Covers SEO, SEM, social media marketing, Google Ads, email marketing, and analytics using industry tools." },
  { name: "Advanced MS Excel", duration: "1 Month", fee: "₹2,000", eligibility: "Any student", desc: "Pivot tables, VLOOKUP, macros, data visualization, and dashboard creation for business analysis." },
  { name: "Entrepreneurship Development", duration: "2 Months", fee: "₹4,000", eligibility: "BBA / B.Com students", desc: "Business plan development, startup ecosystem, financial modeling, and pitch deck preparation." },
];

export default function CertificateProgramsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("academics");
  const certData = data?.certificatePrograms;

  const introText = certData?.introText || "IIMT offers structured certificate programs alongside regular degree courses. These industry-aligned short courses help students develop practical skills that employers actively seek — from accounting software to digital marketing and financial trading. All certificate programs include hands-on training, assessments, and a certificate of completion.";
  const programsList = certData?.programs?.length > 0 ? certData.programs : defaultPrograms;

  return (
    <Layout>
      <PageHeader
        title="Certificate Programs"
        subtitle="Industry add-on courses that complement your degree and boost employability"
        breadcrumbs={[{ label: "Learning", href: "/news-events" }, { label: "Certificate Programs" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal text-foreground/70 leading-relaxed max-w-3xl mb-12 whitespace-pre-wrap">
            {introText}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programsList.map((p: any, i: number) => (
              <div key={p.name} className={`reveal delay-${Math.min(i, 5)}00 bg-card rounded-xl border p-6 hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <h3 className="font-display font-bold text-foreground mb-2">{p.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-muted font-medium">{p.duration}</span>
                  <span className="px-2.5 py-1 rounded-md bg-muted font-medium">{p.fee}</span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">{p.desc}</p>
                <p className="text-xs text-muted-foreground"><strong>Eligibility:</strong> {p.eligibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
