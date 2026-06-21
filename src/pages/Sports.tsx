import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { useIIMTData } from "@/hooks/useIIMTData";

export default function SportsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const sports = data?.sports;
  const content = sports?.content;
  const fallbackSpecs = [
    { label: "Outdoor", value: "Cricket Ground, Basketball Court" },
    { label: "Indoor", value: "Table Tennis, Badminton, Chess" },
    { label: "Annual Event", value: "Sports Meet" },
    { label: "Teams", value: "Inter-College Tournaments" }
  ];
  const specs = sports?.specs?.length > 0 ? sports.specs : fallbackSpecs;

  return (
    <Layout>
      <PageHeader title="Sports" subtitle="Inter-college competitions, annual sports meet, and campus recreational facilities" breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "Sports" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto reveal space-y-6">
            {content ? (
              <div 
                className="text-foreground/70 leading-relaxed [&>p]:mb-4" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                IIMT promotes physical fitness and sportsmanship through a comprehensive sports program. The campus features facilities for cricket, basketball, badminton, volleyball, table tennis, and athletics. The annual sports meet is a highlight of the academic calendar, bringing together students from all departments in a spirit of healthy competition.
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="px-4 py-3 rounded-lg border bg-card text-sm text-foreground/80 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </Layout>
  );
}
