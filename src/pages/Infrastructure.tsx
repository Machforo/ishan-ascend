import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Wifi, Monitor, BookOpen, Building2, Cctv, MapPin, ArrowRight } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const fallbackFacilities = [
  { icon: "Monitor", title: "Smart Classrooms", desc: "Air-conditioned classrooms equipped with projectors, interactive whiteboards, and modern AV systems for engaging lectures.", link: "/infrastructure" },
  { icon: "Monitor", title: "IT Labs", desc: "State-of-the-art computer labs with latest hardware, licensed software, and high-speed internet. 1:1 student-to-computer ratio.", link: "/it-lab" },
  { icon: "BookOpen", title: "Library", desc: "15,000+ books, national & international journals, INFLIBNET N-LIST access, dedicated reading room open 8 AM – 6 PM.", link: "/library" },
  { icon: "Building2", title: "Auditorium", desc: "500+ seat auditorium with professional AV equipment, used for convocations, seminars, cultural events, and guest lectures.", link: "/auditorium" },
  { icon: "Cctv", title: "Hostel", desc: "Separate boys and girls hostels with mess, CCTV surveillance, warden supervision, and proximity to campus.", link: "/hostel" },
  { icon: "Wifi", title: "Wi-Fi Campus", desc: "Full campus Wi-Fi connectivity for students and faculty — accessible in classrooms, library, and common areas." },
];

const getIcon = (name: string) => {
  switch(name) {
    case 'Monitor': return Monitor;
    case 'BookOpen': return BookOpen;
    case 'Building2': return Building2;
    case 'Cctv': return Cctv;
    case 'Wifi': return Wifi;
    case 'MapPin': return MapPin;
    default: return Monitor;
  }
};

export default function InfrastructurePage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const infrastructure = data?.infrastructure;
  
  const content = infrastructure?.content || `IIMT's campus is strategically located in Knowledge Park III, Greater Noida, offering a secure, green, and aesthetically designed environment conducive to academic focus. The campus is built on a foundation of sustainability and modern design, providing a premium learning experience for our students.\n\nOur facilities include smart classrooms with modern AV systems, state-of-the-art IT labs, a comprehensive library, and a professional 500-seat auditorium for institutional events. We also offer dedicated sports areas and secure hostel accommodations, ensuring a well-rounded campus life.\n\nThe campus is highly accessible, situated in close proximity to the Pari Chowk Metro Station and well-connected by major transport links across Delhi NCR, making it a convenient choice for day scholars and residents alike.`;

  const facilities = infrastructure?.facilities?.length > 0 ? infrastructure.facilities : fallbackFacilities;

  return (
    <Layout>
      <PageHeader
        title="Campus Infrastructure"
        subtitle="Modern facilities designed to create an optimal learning environment"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Infrastructure" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="reveal max-w-3xl mb-14">
            <div 
              className="text-foreground/70 leading-relaxed [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f: any, i: number) => {
              const Icon = typeof f.icon === 'string' ? getIcon(f.icon) : f.icon;
              const cardContent = (
                <div className={`reveal delay-${Math.min(i, 5)}00 bg-card rounded-xl border p-6 h-full hover:shadow-[0_8px_30px_hsl(var(--navy)/0.08)] transition-shadow ${f.link ? 'group cursor-pointer' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-navy" />}
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
                  {f.link && (
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              );
              return f.link ? <Link key={i} to={f.link}>{cardContent}</Link> : <div key={i}>{cardContent}</div>;
            })}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
