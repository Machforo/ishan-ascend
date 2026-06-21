import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultAccreditations = [];

export default function AccreditationsSection() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("homepage");
  const accreditations = data?.accreditations?.length > 0 ? data.accreditations : defaultAccreditations;

  return (
    <section id="accreditations" className="py-16 md:py-20 border-y" ref={ref}>
      <div className="container-wide">
        <p className="reveal text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Accreditations &amp; Affiliations
        </p>
        <div className="reveal delay-100 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {accreditations.map((acc: any, i: number) => (
            <div key={acc.name || acc.title || i} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              {acc.url || acc.image ? (
                  <img src={acc.url || acc.image} alt={acc.name || acc.title} className="h-16 md:h-20 object-contain" loading="lazy" />
              ) : (
                  <div className="h-16 md:h-20 flex items-center">
                    <span className="text-2xl font-display font-bold text-navy">{acc.name || acc.title}</span>
                  </div>
              )}
              <span className="text-xs font-medium text-muted-foreground">{acc.name || acc.title}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
            <div className="h-16 md:h-20 flex items-center">
              <span className="text-2xl font-display font-bold text-navy">CCS University</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Affiliated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
