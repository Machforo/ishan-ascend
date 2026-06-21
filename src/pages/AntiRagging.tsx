import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function AntiRaggingPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentzone");
  const antiRagging = data?.antiRagging;

  return (
    <Layout>
      <PageHeader 
        title={antiRagging?.pageTitle || "Anti-Ragging Zone"} 
        subtitle={antiRagging?.pageSubtitle || "Zero tolerance policy — UGC mandate for student safety"} 
        breadcrumbs={[{ label: "Anti-Ragging" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-6">
            <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <p className="text-sm font-semibold text-destructive mb-2">24x7 Anti-Ragging Helpline</p>
              <p className="text-2xl font-display font-bold text-foreground">{antiRagging?.helplinePhone || "1800-180-5522"}</p>
              <p className="text-xs text-muted-foreground mt-1">Toll-free | UGC helpline available round the clock</p>
            </div>
            
            {antiRagging?.content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4 [&>h2]:text-lg [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4"
                dangerouslySetInnerHTML={{ __html: antiRagging.content }}
              />
            ) : (
              <>
                <p className="text-foreground/70 leading-relaxed">As per the directions of the Hon'ble Supreme Court of India and UGC Regulations on Curbing the Menace of Ragging, IIMT maintains an absolute zero-tolerance policy against ragging in any form — physical, mental, verbal, or psychological. Ragging is a criminal offence under the Indian Penal Code and can lead to expulsion, criminal prosecution, imprisonment, and fine.</p>
                <h2 className="text-lg font-display font-bold text-foreground">Anti-Ragging Committee</h2>
                <p className="text-foreground/70 leading-relaxed text-sm">The committee comprises senior faculty members, administrative officers, and student representatives who monitor campus activities, conduct regular awareness programs, and handle complaints with strict confidentiality. The committee meets monthly and submits reports to the university and UGC.</p>
                <h2 className="text-lg font-display font-bold text-foreground">How to Report</h2>
                <ol className="space-y-2 text-sm text-foreground/70 list-decimal pl-5">
                  <li>Call the UGC Anti-Ragging Helpline: 1800-180-5522 (toll-free, 24x7)</li>
                  <li>Email: antiragging@ishan.ac</li>
                  <li>Submit a written complaint to the Anti-Ragging Committee (confidential)</li>
                  <li>Visit the Director's office during working hours</li>
                  <li>Report online at www.antiragging.in</li>
                </ol>
                <h2 className="text-lg font-display font-bold text-foreground">Student Pledge</h2>
                <p className="text-foreground/70 leading-relaxed text-sm">Every student at IIMT is required to sign the anti-ragging undertaking at the time of admission. This pledge confirms that the student will not engage in any form of ragging and understands the consequences of violation including immediate expulsion and criminal proceedings.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
