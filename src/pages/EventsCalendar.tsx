import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, MapPin, Tag, Clock, Share2 } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const fallbackEvents = [
  {
    name: "National Seminar on Digital Business",
    date: "May 15, 2024",
    venue: "Main Auditorium",
    category: "Academic",
    description: "A comprehensive seminar on how digital transformation is reshaping traditional business models.",
  },
  {
    name: "Kshitiz 2024: Annual Cultural Fest",
    date: "June 05-07, 2024",
    venue: "Campus Grounds",
    category: "Cultural",
    description: "Our flagship cultural festival featuring music, dance, and arts from across the region.",
  },
  {
    name: "Mega Placement Drive",
    date: "May 20, 2024",
    venue: "Placement Cell",
    category: "Placement",
    description: "Annual recruitment event with 30+ corporate partners participating.",
  },
  {
    name: "Workshop on Python for Data Science",
    date: "May 10, 2024",
    venue: "IT Lab 1",
    category: "Workshop",
    description: "Hands-on skill development workshop for BCA and interested BBA students.",
  },
];

export default function EventsCalendarPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("learning");
  const calendar = data?.eventsCalendar;
  
  const events = calendar?.events?.length > 0 ? calendar.events : fallbackEvents;

  return (
    <Layout>
      <PageHeader
        title={calendar?.pageTitle || "Events Calendar"}
        subtitle={calendar?.pageSubtitle || "Stay updated with academic, cultural, and professional events at IIMT."}
        breadcrumbs={[{ label: calendar?.pageTitle || "Events Calendar" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="reveal-up space-y-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{calendar?.subheading || "What's Happening"}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                {calendar?.heading || "Plan Your Campus Experience"}
              </h2>
              {calendar?.description ? (
                <div 
                  className="text-foreground/70 leading-relaxed max-w-2xl mx-auto [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: calendar.description }} 
                />
              ) : (
                <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                  IIMT maintains a packed events calendar including national seminars, guest lectures, cultural festivals, sports meets, and placement drives. This helps students plan their participation and never miss an opportunity for growth.
                </p>
              )}
              <div className="flex justify-center gap-4 pt-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 text-xs font-bold text-navy hover:bg-gold hover:text-white transition-all shadow-sm">
                  <Share2 className="w-3 h-3" /> {calendar?.ctaText1 || "Export to Google Calendar"}
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 text-xs font-bold text-navy hover:bg-gold hover:text-white transition-all shadow-sm">
                  <Share2 className="w-3 h-3" /> {calendar?.ctaText2 || "Download iCal"}
                </button>
              </div>
            </div>

            <div className="reveal-up grid gap-6">
              {events.map((e, i) => (
                <div key={i} className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border bg-card hover:border-gold transition-all duration-300">
                  <div className="md:w-32 shrink-0 flex flex-col items-center justify-center p-4 bg-muted rounded-xl text-center group-hover:bg-gold group-hover:text-white transition-colors">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="text-sm font-bold uppercase tracking-tighter leading-none">{e.date.split(',')[0]}</span>
                    <span className="text-xl font-display font-black leading-none">{e.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-gold/10 text-[10px] font-bold text-gold uppercase tracking-widest">{e.category}</span>
                      <div className="flex items-center gap-1.5 text-foreground/50 text-xs font-medium">
                        <MapPin className="w-3 h-3" /> {e.venue}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{e.name}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{e.description}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-32 flex items-center justify-end">
                    <button className="px-4 py-2 rounded-lg bg-navy text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gold transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
