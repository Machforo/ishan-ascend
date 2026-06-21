import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Users, Globe, BookOpen, Building, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultReasons = [
  { title: "Academic Excellence", description: "Pioneering professional education with NAAC accreditation.", icon: "Award" },
  { title: "Industry-aligned Curriculum", description: "Courses updated continuously in response to industry trends.", icon: "BookOpen" },
  { title: "Experienced Faculty", description: "Learn from recognized experts and researchers with years of experience.", icon: "Users" },
  { title: "Modern Campus Labs", description: "High-speed internet, IT systems, and advanced learning tools.", icon: "Globe" },
];

const getWhyIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    Award, Users, Globe, BookOpen, Building, TrendingUp, Shield, Lightbulb
  };
  return iconMap[iconName] || Award;
};

export default function WhyIIMTSection() {
  const { data } = useIIMTData("homepage");
  const reasons = data?.standApart?.points?.length > 0 
    ? data.standApart.points 
    : defaultReasons;
  const ref = useScrollReveal([reasons]);

  return (
    <section id="why-iimt" className="py-12 md:py-20" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left */}
          <div className="reveal-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
              {data?.standApart?.heading || "What Makes IIMT Stand Apart"}
            </h2>
            <p 
              className="mt-4 text-foreground/60 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: data?.standApart?.description || "For over three decades, IIMT has maintained its commitment to academic excellence, holistic development, and career-focused education in the Delhi NCR region." 
              }}
            />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]"
            >
              {data?.standApart?.cta || "Schedule a Visit"}
            </a>
          </div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r: any, i: number) => {
              const Icon = typeof r.icon === 'string' ? getWhyIcon(r.icon) : (r.icon || Award);
              return (
                <div
                  key={r.title || i}
                  className={`reveal delay-${Math.min(i % 4, 4)}00 flex gap-4 p-5 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc || r.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
