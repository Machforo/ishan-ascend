import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function StudentPortalPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentportal");
  const content = data || {};

  return (
    <Layout>
      <PageHeader title={content?.title || "Student Portal"} subtitle="Access timetables, attendance, and university results" breadcrumbs={[{ label: "Students" }, { label: "Student Portal" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="reveal space-y-4 mb-10 text-center">
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">{content?.description || "Current IIMT students can access their Office 365 accounts for email, timetables, and academic resources. Examination results are available through the CCS University result portal."}</p>
            </div>
            
            {content?.link ? (
              <div className="flex justify-center">
                <a href={content.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97]">
                  {content?.cta || "Access Student Portal →"}
                </a>
              </div>
            ) : (
              <div className="reveal delay-100 grid sm:grid-cols-2 gap-4">
                <a href="https://login.microsoftonline.com" target="_blank" rel="noopener" className="block p-6 rounded-xl border bg-card text-center hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#0078d4]/10 flex items-center justify-center"><span className="text-xl font-bold text-[#0078d4]">O</span></div>
                  <h3 className="font-semibold text-foreground mb-1">Office 365 Login</h3>
                  <p className="text-xs text-muted-foreground">Email, calendar, and OneDrive</p>
                </a>
                <a href="https://www.ccsuniversity.ac.in/result" target="_blank" rel="noopener" className="block p-6 rounded-xl border bg-card text-center hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-light flex items-center justify-center"><span className="text-xl font-display font-bold text-navy">R</span></div>
                  <h3 className="font-semibold text-foreground mb-1">CCS University Results</h3>
                  <p className="text-xs text-muted-foreground">Check examination results</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
