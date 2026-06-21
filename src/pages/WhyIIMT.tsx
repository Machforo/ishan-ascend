import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Users, Globe, BookOpen, Building, TrendingUp, Shield, Lightbulb, GraduationCap, Heart, CheckCircle } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultReasons = [];

export default function WhyIIMTPage() {
  const { data } = useIIMTData("aboutus");
  const whyContent: string | undefined = data?.whyIimt?.content;
  const ref = useScrollReveal([whyContent]);

  return (
    <Layout>
      <PageHeader
        title="Why IIMT?"
        subtitle="10 reasons why students and parents choose IIMT for quality education in Delhi NCR"
        breadcrumbs={[{ label: "Why IIMT?" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {whyContent ? (
              <div 
                className="reveal prose max-w-none text-foreground/70 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: whyContent }}
              />
            ) : (
              <div className="space-y-6">
                {defaultReasons.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.title} className={`reveal delay-${Math.min(i % 3, 2)}00 flex gap-5 p-6 rounded-xl border bg-card hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow group`}>
                      <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-6 h-6 text-navy" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground text-lg mb-2">{i + 1}. {r.title}</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">{r.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <EnquiryCTA title="Convinced? Take the Next Step" subtitle="Schedule a campus visit or speak with our admissions counsellor today." />
    </Layout>
  );
}
