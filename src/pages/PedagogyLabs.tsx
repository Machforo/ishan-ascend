import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, Beaker, Video, Monitor, BookOpen, GraduationCap } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function PedagogyLabsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("academics");
  const labsData = data?.pedagogyLabs;

  const introTitle = labsData?.introTitle || "Simulated Classrooms for Future Educators";
  const introDesc = labsData?.introDesc || "IIMT provides dedicated labs with micro-teaching setups, video recording for self-evaluation, and simulated classroom environments for trainee teachers. These facilities allow students to practice their teaching methodology in a controlled, supportive environment before entering real schools for internships.";
  const introPoints = labsData?.introPoints?.length > 0 ? labsData.introPoints : [
    "Confidence building before school internships",
    "Systematic lesson plan development and testing",
    "Culture of peer feedback and reflective practice"
  ];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Video": return <Video className="w-6 h-6 text-gold" />;
      case "Beaker": return <Beaker className="w-6 h-6 text-gold" />;
      case "BookOpen": return <BookOpen className="w-6 h-6 text-gold" />;
      case "Monitor": default: return <Monitor className="w-6 h-6 text-gold" />;
    }
  };

  const defaultFacilities = [
    {
      title: "Micro-teaching Studio",
      description: "Equipped with recording and playback facilities for self-evaluation and peer feedback.",
      icon: <Video className="w-6 h-6 text-gold" />,
    },
    {
      title: "Language Lab",
      description: "Focuses on communication skills and linguistic proficiency for trainee teachers.",
      icon: <Monitor className="w-6 h-6 text-gold" />,
    },
    {
      title: "Science Teaching Lab",
      description: "Equipped with apparatus for demonstrating scientific concepts in school settings.",
      icon: <Beaker className="w-6 h-6 text-gold" />,
    },
    {
      title: "ICT Integration Lab",
      description: "Training in using digital tools, smart boards, and educational software.",
      icon: <Monitor className="w-6 h-6 text-gold" />,
    },
    {
      title: "Resource Material Library",
      description: "A collection of teaching aids, charts, and models developed by students.",
      icon: <BookOpen className="w-6 h-6 text-gold" />,
    },
  ];

  const facilitiesList = labsData?.facilities?.length > 0 ? labsData.facilities.map((f: any) => ({
    title: f.title,
    description: f.description,
    icon: getIcon(f.icon)
  })) : defaultFacilities;

  const practiceTeachingDesc = labsData?.practiceTeachingDesc || "Our 20-week supervised placement at partner schools is a cornerstone of the B.Ed and M.Ed programmes. Students engage in lesson plan development, reflective journal maintenance, and receive regular faculty supervision to ensure high standards of pedagogical practice.";

  return (
    <Layout>
      <PageHeader
        title="Demo Teaching & Pedagogy Labs"
        subtitle="Dedicated facilities for nurturing professional teaching skills and practical pedagogy."
        breadcrumbs={[{ label: "Pedagogy Labs" }]}
      />

      {labsData?.equipmentWideImage && (
        <div className="container-wide mt-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
            <img src={labsData.equipmentWideImage} alt="Pedagogy Lab Wide Angle" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Facility Overview</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                {introTitle}
              </h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {introDesc}
              </p>
              <div className="space-y-4">
                {introPoints.map((point: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <p className="text-foreground/80 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-right grid sm:grid-cols-2 gap-6">
              {facilitiesList.map((f: any, i: number) => (
                <div key={i} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/60">{f.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-16 pt-10 border-t">
            {labsData?.equipmentCloseups?.length > 0 && (
              <div className="reveal">
                <h3 className="text-xl font-bold text-navy mb-6">Lab Equipment Closeups</h3>
                <div className="grid grid-cols-3 gap-4">
                  {labsData.equipmentCloseups.map((photo: any, i: number) => {
                    const url = photo?.url || photo;
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-28 bg-slate-100 group">
                        <img 
                          src={url} 
                          alt={`Equipment Closeup ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {labsData?.studentsWorkingImages?.length > 0 && (
              <div className="reveal">
                <h3 className="text-xl font-bold text-navy mb-6">Trainee Teachers in Practice</h3>
                <div className="grid grid-cols-2 gap-4">
                  {labsData.studentsWorkingImages.map((photo: any, i: number) => {
                    const url = photo?.url || photo;
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-28 bg-slate-100 group">
                        <img 
                          src={url} 
                          alt={`Students Working ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {labsData?.safetySignageImage && (
              <div className="reveal lg:col-span-2 p-6 bg-amber-50/50 border border-amber-200/50 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-amber-900 text-lg">Lab Safety & Regulations</h4>
                  <p className="text-sm text-amber-800">Trainees must adhere to safety procedures and follow signage instructions inside pedagogy and micro-teaching labs.</p>
                </div>
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border bg-white shadow-sm">
                  <img src={labsData.safetySignageImage} alt="Safety Signage" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <GraduationCap className="w-12 h-12 text-gold" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Practice Teaching Programme</h2>
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                {practiceTeachingDesc}
              </p>
            </div>
            {labsData?.practiceTeachingImage && (
              <div className="rounded-3xl overflow-hidden shadow-md h-64 border border-slate-100 bg-white p-2">
                <img 
                  src={labsData.practiceTeachingImage} 
                  alt="Practice Teaching" 
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
