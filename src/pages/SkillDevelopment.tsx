import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function SkillDevelopmentPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("learning");
  
  const skillDev = data?.skillDevelopment;
  const description = skillDev?.description || "IIMT's Skill Development Cell organizes structured workshops and training sessions every semester, designed to bridge the gap between academic knowledge and professional competence. These programs are mandatory for all students and contribute to their overall personality development.";
  const skills = skillDev?.skills?.length > 0 ? skillDev.skills : [
    "Communication Skills & Public Speaking", "Resume Building & Interview Prep", 
    "Leadership & Team Management", "Business Etiquette & Grooming", 
    "Presentation Skills", "Time Management & Goal Setting", 
    "Critical Thinking & Problem Solving", "Emotional Intelligence"
  ];
  return (
    <Layout>
      <PageHeader title="Skill Development" subtitle="Soft skills, communication, and leadership training integrated into every program" breadcrumbs={[{ label: "Learning" }, { label: "Skill Development" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide"><div className="max-w-3xl mx-auto reveal space-y-6">
          {skillDev?.description ? (
            <div 
              className="text-foreground/70 leading-relaxed [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: skillDev.description }} 
            />
          ) : (
            <p className="text-foreground/70 leading-relaxed">{description}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((s: any, i: number) => {
              const text = typeof s === 'string' ? s : s.text || s.title || '';
              return (
                <div key={i} className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {text}
                </div>
              );
            })}
          </div>
        </div></div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
