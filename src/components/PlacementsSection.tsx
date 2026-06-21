import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrendingUp, Building2, Users2, Star } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultRecruiters = [
  { name: "Barclays" }, { name: "HDFC Bank" }, { name: "ICICI Bank" },
  { name: "Infosys" }, { name: "TCS" }, { name: "Wipro" },
  { name: "Deloitte" }, { name: "Amazon" }
];

export default function PlacementsSection() {
  const { data } = useIIMTData("placements");
  const placementsCfg = {
    title: data?.heading || "Placements That Speak for Themselves",
    description: data?.subheading || "Career Outcomes",
    partnersHeading: data?.partnersHeading || "Our Recruiting Partners"
  };
  const recruiters = data?.partners?.length > 0 ? data.partners : defaultRecruiters;
  const ref = useScrollReveal([recruiters]);

  return (
    <section id="placements" className="py-12 md:py-20" ref={ref}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">{placementsCfg.description}</p>
          <h2 className="reveal delay-100 text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
             {placementsCfg.title}
          </h2>
        </div>

        {/* Recruiters marquee */}
        <div className="reveal delay-300">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {placementsCfg.partnersHeading}
          </p>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="flex animate-marquee">
              {[...recruiters, ...recruiters].map((rec: any, i) => (
                <div
                  key={`${rec.name}-${i}`}
                  className="shrink-0 mx-6 px-8 py-4 rounded-lg border bg-card text-sm font-semibold text-foreground/60 flex items-center justify-center whitespace-nowrap min-w-[140px]"
                >
                  {rec.logo ? <img src={rec.logo} alt={rec.name} className="h-8 object-contain" /> : rec.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
