import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function CodeOfConductPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentzone");
  const codeOfConduct = data?.codeOfConduct;

  return (
    <Layout>
      <PageHeader 
        title={codeOfConduct?.pageTitle || "Code of Conduct"} 
        subtitle={codeOfConduct?.pageSubtitle || "Student rules, dress code, and academic integrity guidelines"} 
        breadcrumbs={[{ label: "Students" }, { label: "Code of Conduct" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-8">
            {codeOfConduct?.content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4 [&>h2]:text-lg [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4"
                dangerouslySetInnerHTML={{ __html: codeOfConduct.content }}
              />
            ) : (
              [
                { title: "1. General Conduct", content: "Students are expected to maintain decorum and dignity within the campus premises at all times. Respectful behaviour towards faculty, staff, and fellow students is mandatory. Any form of misconduct, including bullying, verbal abuse, or physical altercation, will result in disciplinary action as per the institution's disciplinary committee guidelines." },
                { title: "2. Dress Code", content: "Students must adhere to the prescribed dress code during academic hours. Formal attire is required on presentation days and during campus recruitment drives. The institution may prescribe uniforms for specific departments or events. Students not complying with the dress code may be denied entry to classrooms." },
                { title: "3. Attendance", content: "A minimum of 75% attendance is mandatory for each subject as per CCS University regulations. Students falling below the minimum threshold may not be permitted to appear for university examinations. Medical leave must be accompanied by a valid medical certificate submitted within 7 days." },
                { title: "4. Academic Integrity", content: "Plagiarism, cheating, copying, or any form of academic dishonesty is strictly prohibited. Students found engaging in unfair means during examinations will face immediate disqualification from the examination and may be subject to further disciplinary proceedings including suspension." },
                { title: "5. Use of Mobile Phones", content: "Mobile phones must be switched off or kept on silent mode during lectures and examinations. Use of mobile phones for recording lectures without permission is prohibited. The institution is not responsible for loss or theft of personal electronic devices." },
                { title: "6. Anti-Ragging", content: "As per UGC regulations and Supreme Court directives, ragging in any form — physical, verbal, or psychological — is a criminal offence. IIMT maintains zero tolerance towards ragging. Offenders will face immediate expulsion, FIR registration, and criminal prosecution. Report ragging: Anti-Ragging Helpline 1800-180-5522." },
              ].map((s) => (
                <div key={s.title}>
                  <h2 className="text-lg font-display font-bold text-foreground mb-3">{s.title}</h2>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
