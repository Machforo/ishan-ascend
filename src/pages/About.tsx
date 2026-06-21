import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import studentsImg from "@/assets/students-library.jpg";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultMilestones = [];

export default function AboutPage() {
  const ref = useScrollReveal();
  const { data, isLoading } = useIIMTData("aboutus");
  const fallback = `Established in 1994, Ishan Institute of Management & Technology (IIMT) stands as a pioneer of professional education in Knowledge Park, Greater Noida. Affiliated with Chaudhary Charan Singh (CCS) University, Meerut, and approved by the AICTE and NCTE, IIMT is a NAAC accredited institution committed to academic excellence and holistic development. Our journey began with a vision to provide quality higher education that transforms potential into professional performance.

Over the decades, we have evolved into a multi-disciplinary hub offering six distinct programmes: B.Com, BBA, BCA, M.Com, B.Ed, and M.Ed. Our industry-aligned curriculum ensures that students are not just degree holders but industry-ready professionals equipped with critical thinking and leadership skills. The campus life at IIMT is vibrant, featuring the flagship 'Kshitiz' annual fest, NSS activities, and structured skill development workshops that complement classroom learning.

The campus itself is designed to provide a world-class learning environment, featuring state-of-the-art IT labs, a well-stocked library, a modern auditorium, sports facilities, and secure hostel accommodation. We invite aspiring students to join our community and embark on a journey of growth and discovery. Admissions are now open for the current academic session; reach out to our counsellors to explore your future at IIMT.`;

  // Schema: aboutus.ourStory = { title, content } | aboutus.keyDifferentiators = [{title, description}]
  const ourStory = data?.ourStory;
  const milestones = data?.ourJourney?.length > 0 ? data.ourJourney : defaultMilestones;
  const keyDiffRaw = data?.keyDifferentiators;
  const keyDifferentiators: string[] = keyDiffRaw?.length > 0
    ? keyDiffRaw.map((k: any) => typeof k === 'string' ? k : k.title)
    : [
      "NAAC Accredited Institution",
      "Affiliated to CCS University, Meerut",
      "UGC, AICTE & NCTE Approved",
      "Industry-aligned Curriculum",
      "Modern Campus with Smart Classrooms",
      "Active Skill Development Cell",
      "20-week Practice Teaching (Education)",
      "Vibrant Campus Life with Kshitiz Fest",
    ];

  return (
    <Layout>
      <PageHeader
        title={data?.pageHeading || "About IIMT Greater Noida"}
        subtitle={data?.pageSubheading || "Transforming potential into performance through academic excellence since 1994."}
        breadcrumbs={[{ label: "About IIMT" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)]">
                <img src={data?.ourStory?.image || studentsImg} alt="Students at IIMT campus" className="w-full h-[400px] object-cover" />
              </div>
            </div>

            <div className="reveal-right space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                Legacy of Shaping Professional Excellence
              </h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {ourStory?.description || fallback}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{data?.journeyHeading || "Milestones of Growth"}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0 relative">
            <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m: any, i: number) => (
              <div key={m.year || i} className={`relative flex items-start gap-6 py-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-12`}>
                <div className={`shrink-0 w-11 h-11 rounded-full bg-gold flex items-center justify-center z-10 shadow-[0_2px_12px_hsl(var(--gold)/0.3)]`}>
                  <span className="text-xs font-bold text-foreground">{m.year}</span>
                </div>
                <div className={`bg-card rounded-xl border p-5 shadow-sm flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-sm text-foreground/80 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">Key Differentiators</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {keyDifferentiators.map((item: string, i: number) => (
                <div key={item || i} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
