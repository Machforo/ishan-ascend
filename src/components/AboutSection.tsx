import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";
import libraryImg from "@/assets/students-library.jpg";

const defaultHighlights = [
  "Top 5 institution in Delhi NCR for value",
  "ISO 14000:2015 & 50001:2018 Certified",
  "40%+ female student enrollment",
  "Global learning & placement opportunities",
];

export default function AboutSection() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("homepage");
  const defaultImage = libraryImg;
  const apiAbout = data?.aboutIimt;
  const about = {
    title: apiAbout?.heading || "A Legacy of Academic Excellence in Greater Noida",
    description: apiAbout?.description || "Ishan Institute of Management & Technology, established in 1994, is the flagship institution of Ishan Educational Group. Affiliated to CCS University, Meerut and recognized by UGC, the institute focuses on nurturing future-ready professionals through a unique blend of academic rigor and practical exposure.",
    image: (apiAbout?.image && apiAbout.image.length > 5) ? apiAbout.image : "https://www.iecaonline.com/wp-content/uploads/2018/03/College-Campus-cropped-scaled.jpg"
  };

  return (
    <section id="about" className="py-12 md:py-20" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="reveal-left relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_hsl(var(--navy)/0.1)] bg-muted">
              <img
                src={about.image}
                alt="IIMT Campus"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-card rounded-xl shadow-[0_4px_24px_hsl(var(--navy)/0.12)] p-5 border">
              <p className="text-3xl font-display font-bold text-navy">1994</p>
              <p className="text-sm text-muted-foreground">Established</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">About IIMT</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
              {about.title}
            </h2>
            <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
              {about.description}
            </p>
            <div className="space-y-3 pt-2">
              {defaultHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-navy hover:text-navy/80 transition-colors group"
            >
              Learn More About Us
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
