import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Sun, Recycle, Droplets, TreePine } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const initiatives = [
  { icon: Sun, title: "Energy Conservation", desc: "We prioritize energy efficiency through LED lighting across campus, sensor-based systems in common areas, and a commitment to reducing overall carbon footprint. Solar installations contribute significantly to our renewable energy goals.", stat: "20% Renewable energy" },
  { icon: TreePine, title: "Tree Plantation Drives", desc: "Annual plantation drives are a hallmark of IIMT, resulting in over 1,500 trees across the Knowledge Park campus. These drives involve students and faculty, fostering a deep connection with nature and improving local air quality.", stat: "1,500+ trees planted" },
  { icon: Recycle, title: "Waste Segregation & Plastic Ban", desc: "IIMT maintains a single-use plastic ban across campus. A robust waste segregation system ensures proper disposal of organic and inorganic waste, with organic waste being composted for campus gardens.", stat: "100% Plastic-free campus" },
  { icon: Leaf, title: "Paperless Administration", desc: "We are progressively moving towards a paperless administration through digital portals for students and faculty, reducing paper consumption and improving administrative efficiency.", stat: "Digital-first workflow" },
  { icon: Droplets, title: "Water Harvesting", desc: "Active rainwater harvesting systems recharge groundwater levels, while efficient plumbing fixtures ensure minimal water wastage across hostels and academic blocks.", stat: "Water harvesting active" },
];

export default function GreenInitiativesPage() {
  const { data } = useIIMTData("aboutus");
  const content = data?.greenInitiatives?.content;
  const ref = useScrollReveal([content]);

  return (
    <Layout>
      <PageHeader
        title="Green Initiatives"
        subtitle="Our commitment to sustainability through solar energy, waste management, and eco-conscious campus practices"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Green Initiatives" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-8">
            {content && (
              <div 
                className="reveal space-y-6 mb-12 prose max-w-none text-lg text-foreground/70 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {initiatives.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`reveal delay-${Math.min(i, 4)}00 grid md:grid-cols-[1fr_auto] gap-6 items-center p-6 rounded-xl border bg-card`}>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--success)/0.1)] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" style={{ color: "hsl(var(--success))" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-[hsl(var(--success)/0.08)] text-sm font-semibold whitespace-nowrap" style={{ color: "hsl(var(--success))" }}>
                    {item.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
