import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultStats = [];

function AnimatedCounter({ rawValue }: { rawValue: string }) {
  const numMatch = typeof rawValue === 'string' ? rawValue.match(/^[\d,.]+/) : null;
  const target = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : parseFloat(rawValue as any) || 0;
  const suffix = typeof rawValue === 'string' ? rawValue.replace(/^[\d,.]+/, '') : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useScrollReveal();
  const { data, isLoading } = useIIMTData("homepage");
  
  // Use a ref to keep the stats stable once they are loaded or if using defaults
  const [statsList, setStatsList] = useState(defaultStats);

  useEffect(() => {
    if (data?.numbers?.length > 0) {
      setStatsList(data.numbers);
    }
  }, [data]);

  const brands = [
    { name: "Barclays", logo: "https://www.openbanking.org.uk/wp-content/uploads/barclays.png" },
    { name: "HDFC Bank", logo: "https://cdn.zeebiz.com/sites/default/files/2020/04/08/116007-hdfc.jpg?im=FitAndFill=(448,252)&format=webp&quality=medium" },
    { name: "ICICI Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" },
    { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "TCS", logo: "https://ifs-p-001.sitecorecontenthub.cloud/api/public/content/new_size_948-711_ifs_tata_consultancy_services_logo_july_2022_670x300.jpg-273f76?v=676a79ee" },
    { name: "Wipro", logo: "https://equippp.in/wp-content/uploads/2023/08/WIPRO.png" },
    { name: "AICTE", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png" },
    { name: "UGC", logo: "https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png" },
    { name: "NCTE", logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/NCTE_logo.png" }
  ];

  const dynamicBrands = data?.partnerships && data.partnerships.length > 0
    ? data.partnerships.map((p: any) => ({ name: p.name, logo: p.image }))
    : brands;

  return (
    <section className="bg-navy relative z-10 overflow-hidden" ref={ref}>
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16 md:mb-24">
          {statsList.map((stat: any, i: number) => (
            <div
              key={stat.label || i}
              className="text-center"
            >
              <AnimatedCounter rawValue={stat.value?.toString() || "0"} />
              <p className="stat-label text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Logos Marquee */}
        <div className="reveal delay-500 pt-8 border-t border-white/10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-8">
            Approved By & Partnered With
          </p>
          <div className="relative flex overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {[...dynamicBrands, ...dynamicBrands].map((brand, i) => (
                <div key={`${brand.name}-${i}`} className="mx-8 md:mx-12 shrink-0 group">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 md:h-12 w-auto object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
