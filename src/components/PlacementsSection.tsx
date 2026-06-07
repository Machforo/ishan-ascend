import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrendingUp, Building2, Users2, Star } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultRecruiters = [
  { name: "Barclays", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Barclays_logo.svg" },
  { name: "HDFC Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/HDFC_Bank_Logo.svg" },
  { name: "ICICI Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" },
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Wipro_logo.svg" },
  { name: "Deloitte", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Deloitte.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
];

export default function PlacementsSection() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("placements");
  const placementsCfg = { title: "Placements That Speak for Themselves", description: "Career Outcomes" };
  const recruiters = data?.partners?.length > 0 ? data.partners : defaultRecruiters;

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
            Our Recruiting Partners
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
