import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2 } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const fallbackAmenities = [
  "Separate boys and girls blocks", "Furnished rooms (2/3 sharing)", "Attached washrooms",
  "Vegetarian mess facility", "CCTV surveillance 24/7", "Wi-Fi connectivity",
  "Common room with TV", "RO water purifier", "Laundry facility",
  "First aid and medical support", "Warden supervision round the clock", "200m from main campus",
];

export default function HostelPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const hostel = data?.hostel;
  const content = hostel?.content;
  const specs = hostel?.specs?.length > 0 ? hostel.specs : [
    { label: "Boys Hostel Fee", value: "₹60,000 / year" },
    { label: "Girls Hostel Fee", value: "₹65,000 / year" },
    { label: "Mess Charges", value: "Included in hostel fee" }
  ];
  const amenities = hostel?.amenities?.length > 0 ? hostel.amenities : fallbackAmenities;

  return (
    <Layout>
      <PageHeader title="Hostel" subtitle="Safe, comfortable residential facilities for outstation students" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Hostel" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal space-y-5 mb-12">
              {content ? (
                <div 
                  className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                  dangerouslySetInnerHTML={{ __html: content }} 
                />
              ) : (
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  IIMT provides comfortable hostel accommodation for both boys and girls in separate residential blocks located within 200 metres of the main campus. The hostel offers a home-away-from-home experience with furnished rooms, nutritious mess meals, and 24/7 security — allowing students to focus on their academics in a safe environment.
                </p>
              )}
            </div>

            <div className="reveal delay-100 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
              {amenities.map((a: any, i: number) => {
                const text = typeof a === 'string' ? a : a.text || '';
                return (
                  <div key={text || i} className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" /> {text}
                  </div>
                );
              })}
            </div>

            <div className="reveal delay-200 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="p-5 rounded-xl border bg-section-alt text-center">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="reveal delay-300 rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-3">Warden Contact</h3>
              <p className="text-sm text-foreground/70">For hostel enquiries and applications, contact the admissions office at <a href="tel:+918448797700" className="text-navy font-semibold">8448797700</a> or visit the campus.</p>
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
