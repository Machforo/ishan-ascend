import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Lightbulb, Rocket, Users, Briefcase, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function ECellPage() {
  const { data, loading } = useIIMTData("placements");
  const content = data?.eCell || {
    aboutTitle: "Fueling Innovation at IIMT",
    aboutDescription: "The Entrepreneurship Cell at IIMT is established to nurture business creators. We provide a platform for students to ideate, prototype, and pitch their business ideas. Mentored by experienced faculty and industry experts, the E-Cell bridges the gap between academic theory and real-world business execution.",
    offerings: [
      { title: "Business Plan Workshops", description: "Structured sessions to help students transform ideas into viable business models.", icon: "Lightbulb" },
      { title: "Startup Mentorship", description: "Direct access to industry experts and successful alumni entrepreneurs.", icon: "Users" },
      { title: "Pitch Competitions", description: "Platforms to pitch ideas to faculty and industry panels for feedback.", icon: "Trophy" },
      { title: "Incubation Support", description: "Guidance on prototyping, legal registration, and early-stage growth.", icon: "Rocket" },
    ],
    internshipTitle: "Internship Programme",
    internshipDescription: "Our mandatory 4-8 week industry internship programme provides students with essential exposure to corporate environments. The Internship Coordinator facilitates placements across BFSI, IT, Retail, and Manufacturing sectors.",
    internshipPoints: [
      "Dedicated internship placement support",
      "Corporate tie-ups for live projects",
      "Mentored experiential learning"
    ],
    internshipCtaText: "Enquire about Internships",
    internshipCtaLink: "/contact",
    alumniSpotlightTitle: "Entrepreneurial Success Stories",
    alumniSpotlightDescription: "Many IIMT graduates have successfully launched their own ventures, serving as role models for current students. From technology startups to consulting firms, our alumni network continues to inspire the next generation of creators."
  };
  const ref = useScrollReveal([content]);

  if (loading) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb": return <Lightbulb className="w-6 h-6 text-gold" />;
      case "Users": return <Users className="w-6 h-6 text-gold" />;
      case "Trophy": return <Trophy className="w-6 h-6 text-gold" />;
      case "Rocket": return <Rocket className="w-6 h-6 text-gold" />;
      default: return <Lightbulb className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Entrepreneurship Cell & Internships"
        subtitle="Nurturing the next generation of business leaders and creators."
        breadcrumbs={[{ label: "E-Cell & Internships" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">About E-Cell</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                {content.aboutTitle}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {content.aboutDescription}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {content.offerings?.map((o: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0">{getIcon(o.icon)}</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground">{o.title}</h4>
                      <p className="text-xs text-foreground/60 leading-relaxed">{o.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-right bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10 space-y-6">
                <Briefcase className="w-12 h-12 text-gold" />
                <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">{content.internshipTitle}</h3>
                <p className="text-white/70 leading-relaxed">
                  {content.internshipDescription}
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                  {content.internshipPoints?.map((pt: any, i: number) => (
                    <li key={i} className="flex items-center gap-2">• {typeof pt === 'string' ? pt : pt.text}</li>
                  ))}
                </ul>
                <Link to={content.internshipCtaLink || "/contact"} className="inline-flex items-center gap-2 text-gold font-bold hover:gap-3 transition-all pt-4">
                  {content.internshipCtaText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="alumni" className="py-16 md:py-24 bg-section-alt scroll-mt-24">
        <div className="container-wide text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Alumni Spotlight</p>
            <h2 className="text-3xl font-display font-bold text-foreground">{content.alumniSpotlightTitle}</h2>
            <p className="text-foreground/70">
              {content.alumniSpotlightDescription}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
