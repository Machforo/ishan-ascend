import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function GrievanceRedressalPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentzone");
  const grievanceRedressal = data?.grievanceRedressal;

  return (
    <Layout>
      <PageHeader 
        title={grievanceRedressal?.pageTitle || "Grievance Redressal"} 
        subtitle={grievanceRedressal?.pageSubtitle || "Structured process for addressing student and stakeholder concerns"} 
        breadcrumbs={[{ label: "Grievance Redressal" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-6">
            {grievanceRedressal?.content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4 [&>h2]:text-lg [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4"
                dangerouslySetInnerHTML={{ __html: grievanceRedressal.content }}
              />
            ) : (
              <>
                <p className="text-foreground/70 leading-relaxed">As mandated by the University Grants Commission, IIMT has established a comprehensive Grievance Redressal Mechanism to address concerns related to academic matters, administrative processes, campus facilities, and interpersonal issues. Our goal is to resolve all grievances within 7 working days through a transparent and fair process.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Grievance Process</h2>
                <ol className="space-y-3 text-sm text-foreground/70">
                  {["Submit a written complaint to the Grievance Redressal Cell or email grievance@ishan.ac", "Complaint acknowledged within 24 hours with a reference number", "Investigation conducted by the committee with confidentiality maintained", "Resolution communicated to the complainant within 7 working days", "If unsatisfied, escalate to the Director with original reference number", "Final appeal to the Vice Chancellor of CCS University if resolution is inadequate"].map((s, i) => (
                    <li key={i} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-navy flex items-center justify-center shrink-0 text-xs font-bold text-primary-foreground">{i + 1}</span>{s}</li>
                  ))}
                </ol>
                <div className="p-5 rounded-xl border bg-section-alt">
                  <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                  <p className="text-sm text-foreground/70">Email: <a href="mailto:grievance@ishan.ac" className="text-navy font-semibold">grievance@ishan.ac</a></p>
                  <p className="text-sm text-foreground/70">Phone: <a href="tel:+918448797700" className="text-navy font-semibold">8448797700</a></p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
