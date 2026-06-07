import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Calendar, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const steps = [
  { num: "01", title: "CCS University Registration", desc: "Begin by registering on the official CCS University web-portal. This is mandatory for all students seeking admission to B.Com, BBA, BCA, M.Com, B.Ed, and M.Ed programmes at IIMT." },
  { num: "02", title: "Entrance Exam Participation", desc: "Appear for the relevant entrance examinations. CUET is mandatory for UG programs; UP Joint B.Ed Entrance for B.Ed; and the CCS University Entrance for M.Ed admissions." },
  { num: "03", title: "Merit-Based Selection", desc: "Admissions are processed through centralized university counselling. Seat allotment is based on your entrance merit and preference for IIMT as your choice institution." },
  { num: "04", title: "Document Verification", desc: "Once allotted a seat, visit our Knowledge Park campus with original documents (marksheets, transfer certificates, and scorecards) for physical verification and registration." },
  { num: "05", title: "Fee Submission & Finalization", desc: "Finalize your admission by submitting the requisite semester fees. Our administrative team will guide you through the final registration on the university and college portals." },
];

const documents = [
  "10th & 12th Marksheets (original + 2 copies)",
  "Graduation Marksheets (for PG/B.Ed/M.Ed)",
  "Transfer Certificate from last institution",
  "Migration Certificate",
  "Character Certificate",
  "Category Certificate (SC/ST/OBC if applicable)",
  "Aadhar Card (original + copy)",
  "8 Passport-size Photographs",
  "CUET / JEECUP Scorecard",
  "Allotment Letter from counselling portal",
];

export default function AdmissionsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("admissions");
  
  const howToApply = data?.howToApply?.admissionProcess?.length > 0 ? data.howToApply.admissionProcess : steps;
  const docs = data?.howToApply?.documentChecklist?.length > 0 ? data.howToApply.documentChecklist : documents;
  const alert = data?.howToApply?.highlight ? { title: "Important Update", content: data.howToApply.highlight, isActive: true } : { title: "Admissions Open for 2025-26", content: "Applications are being accepted for all programs.", isActive: true };
  const contact = { phone: "8448797700", email: "admissions@ishan.ac" };

  return (
    <Layout>
      <PageHeader
        title="Admissions 2025-26"
        subtitle="Step-by-step guide to securing your seat at IIMT — BBA, B.Com, BCA, M.Com, B.Ed & M.Ed"
        breadcrumbs={[{ label: "Admissions" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Alert banner */}
            {alert.isActive && (
              <div className="reveal bg-gold-light rounded-xl p-6 mb-14 border border-[hsl(var(--gold)/0.2)]">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-navy shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">{alert.title}</p>
                    <p className="text-sm text-foreground/70">{alert.content}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Steps */}
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Admission Process</h2>
            
            <div className="space-y-6 mb-16">
              {howToApply.map((step: any, i: number) => (
                <div key={step.step || step.num || i} className={`reveal delay-${Math.min(i, 4)}00 flex gap-5 p-6 rounded-xl border bg-card`}>
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">{step.step || step.num || `0${i+1}`}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title || step.step}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Document Checklist</h2>
            <div className="reveal grid sm:grid-cols-2 gap-3 mb-16">
              {docs.map((doc: string, i: number) => (
                <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  {doc}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="reveal rounded-xl border bg-section-alt p-8 text-center">
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Need Help with Admissions?</h3>
              <p className="text-sm text-foreground/70 mb-6">Our admissions counsellors are available Monday to Saturday, 9 AM – 5 PM</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`tel:+91${contact.phone}`} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]">
                  <Phone className="w-4 h-4" /> Call: {contact.phone}
                </a>
                <a href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-navy/20 text-navy rounded-lg hover:bg-navy/5 transition-colors active:scale-[0.97]">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
