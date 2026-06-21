import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import { Mic2, Calendar, User, Info } from "lucide-react";

export default function GuestLecturesPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("learning");
  
  const lectures = data?.guestLectures;

  const events = lectures?.events?.length > 0 ? lectures.events : [
    {
      speaker: "Dr. Arvind Kumar",
      designation: "Senior Economist, RBI",
      topic: "Monetary Policy and its Impact on Emerging Markets",
      date: "Oct 15, 2023",
      takeaways: "Deep dive into inflation targeting, currency fluctuations, and macro-economic stability.",
    },
    {
      speaker: "Ms. Neha Sharma",
      designation: "Marketing Head, Zomato",
      topic: "Digital First Branding in the Platform Economy",
      date: "Sep 22, 2023",
      takeaways: "Understanding consumer data, hyper-local marketing, and brand loyalty in the digital age.",
    },
    {
      speaker: "Mr. Rajesh V.",
      designation: "VP HR, Tech Mahindra",
      topic: "Future of Work: Skills for the 2030 Workplace",
      date: "Aug 10, 2023",
      takeaways: "Emphasis on emotional intelligence, remote collaboration, and lifelong learning.",
    },
  ];

  const description = lectures?.description || "IIMT hosts prominent professionals, academics, and industry leaders through guest lectures, national seminars, and conferences. Students gain insights beyond the classroom on topics ranging from finance and marketing to technology and entrepreneurship. These sessions bridge the gap between academic theory and the rapidly evolving industrial landscape.";

  const nationalSeminars = lectures?.nationalSeminars || "IIMT regularly organises national-level academic events that bring together researchers, practitioners, and students to discuss emerging trends in management, commerce, and education.";

  return (
    <Layout>
      <PageHeader
        title={lectures?.pageTitle || "Guest Lectures & Seminars"}
        subtitle={lectures?.pageSubtitle || "Insights from prominent professionals, academics, and industry leaders."}
        breadcrumbs={[{ label: "Learning" }, { label: "Guest Lectures" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
            <div className="reveal-up space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{lectures?.subheading || "Beyond Textbooks"}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                {lectures?.heading || "Engaging with Industry Pioneers"}
              </h2>
              {lectures?.description ? (
                <div 
                  className="text-foreground/70 leading-relaxed [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: description }} 
                />
              ) : (
                <p className="text-foreground/70 leading-relaxed">
                  {description}
                </p>
              )}
              <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
                <div className="flex gap-4 items-start">
                  <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground mb-2">{lectures?.whatToExpectTitle || "What to Expect"}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {lectures?.whatToExpectDesc || "Sessions are open to all students across programmes. Topics and schedules are posted in advance on the Events Calendar. We also provide session recordings for student review where possible."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right space-y-4">
              {events.map((e, i) => (
                <div key={i} className="group p-6 rounded-2xl border bg-card hover:bg-muted transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <Mic2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{e.speaker}</h4>
                      <p className="text-xs text-foreground/50">{e.designation}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-navy leading-tight">{e.topic}</h5>
                    <p className="text-xs text-foreground/70 leading-relaxed italic">"{e.takeaways}"</p>
                    <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-gold uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      <span>{e.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container-wide text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">{lectures?.nationalSeminarsHeading || "National Seminars & Conferences"}</h2>
            <p className="text-foreground/70">
              {nationalSeminars}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
