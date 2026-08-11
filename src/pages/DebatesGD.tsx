import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import { MessageSquare, Users, Mic2, Briefcase, Trophy } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";


// Helper to map icon string to Lucide component
const getIcon = (name: string) => {
  switch(name) {
    case 'Mic2': return <Mic2 className="w-6 h-6 text-gold" />;
    case 'Briefcase': return <Briefcase className="w-6 h-6 text-gold" />;
    case 'Trophy': return <Trophy className="w-6 h-6 text-gold" />;
    case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-gold" />;
    default: return <Mic2 className="w-6 h-6 text-gold" />;
  }
};

export default function DebatesGDPage() {
  const { data } = useIIMTData("learning");

  const debates = data?.debatesGD;
  const ref = useScrollReveal([debates]);
  
  const activities = debates?.activities?.length > 0 ? debates.activities : [
    {
      title: "Topic-based Debates",
      description: "Regular sessions on current affairs, economic policies, and ethical dilemmas.",
      icon: <Mic2 className="w-6 h-6 text-gold" />,
    },
    {
      title: "Management Case GDs",
      description: "Group discussions centered around real-world business cases and decision-making.",
      icon: <Briefcase className="w-6 h-6 text-gold" />,
    },
    {
      title: "Mock CAT GD-PI",
      description: "Specialized training for students aiming for premium management admissions.",
      icon: <Trophy className="w-6 h-6 text-gold" />,
    },
    {
      title: "Extempore Sessions",
      description: "Spontaneous speaking drills to improve quick thinking and articulation.",
      icon: "MessageSquare",
    },
  ];

  const description = debates?.description || "At IIMT, we believe the ability to articulate and defend ideas is as important as academic excellence. Regular debates and GD sessions prepare students for corporate interviews, competitive exams, and future leadership roles. This culture of open dialogue helps build confidence, critical thinking, and respectful disagreement.";
  
  const points = debates?.participationPoints?.length > 0 ? debates.participationPoints : [
    "Inter-college competitions",
    "Campus debate society",
    "Faculty-led workshops",
    "Alumni mentoring sessions"
  ];
  
  const highlights = debates?.pastHighlights || "Our students have consistently won accolades at regional and national debate competitions. Notable wins include the Greater Noida Inter-College Management Debate and the CCS University Zonal Cultural Meet.";

  return (
    <Layout>
      <PageHeader
        title={debates?.pageTitle || "Debates & Group Discussions"}
        subtitle={debates?.pageSubtitle || "Articulating ideas, defending perspectives, and building leadership communication."}
        breadcrumbs={[{ label: "Debates & GD" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          {debates?.bannerImage && (
            <div className="reveal mb-16 rounded-2xl overflow-hidden aspect-[21/9]">
              <ImageWithFallback
                src={debates.bannerImage}
                alt="Debates & GD Banner"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{debates?.subheading || "Communication Culture"}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                {debates?.heading || "Preparing Students for Corporate Leadership"}
              </h2>
              {debates?.description ? (
                <div 
                  className="text-foreground/70 leading-relaxed [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: debates.description }} 
                />
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  {description}
                </p>
              )}
              <div className="space-y-4">
                <p className="text-sm font-bold text-foreground">Participation includes:</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {points.map((p: any, i: number) => {
                    const text = typeof p === 'string' ? p : p?.text || '';
                    return (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <Users className="w-4 h-4 text-gold" /> {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="reveal-right grid gap-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted transition-colors">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                    {typeof a.icon === 'string' ? getIcon(a.icon) : a.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground">{a.title}</h3>
                    <p className="text-sm text-foreground/60">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {debates?.images && debates.images.length > 0 && (
            <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
              {debates.images.map((img: any, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={img.url}
                    alt={`Debates Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">{debates?.highlightsHeading || "Past Event Highlights"}</h2>
            <p className="text-white/70 leading-relaxed">
              {highlights}
            </p>
            <div className="pt-4">
              <p className="text-gold font-bold">{debates?.highlightsFooter || "Open to all students. Check the Events Calendar for the next session."}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
