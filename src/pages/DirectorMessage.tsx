import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";

export default function DirectorMessagePage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("aboutus");
  const defaultImage = "/assets/director.jpg"; // Placeholder path for now
  const msg = data?.directorMessage || {
      name: "Dr. D.K. Garg",
      designation: "Founder Chairman, Ishan Group",
      message: `Welcome to Ishan Institute of Management & Technology. As we navigate an era of rapid global change, I believe that true education goes beyond textbooks—it is a powerful catalyst that transforms human potential into professional performance. At IIMT, our philosophy is rooted in the belief that every student possesses a unique spark that, when nurtured with the right guidance and environment, can lead to extraordinary outcomes.

Our vision for IIMT is to create a learning ecosystem that prioritizes practical learning and meaningful industry exposure. We aim for the holistic development of our students, focusing not just on technical skills, but on fostering critical thinking, ethical leadership, and a resilient mindset. We want our graduates to be individuals who can lead with integrity and innovate with purpose in an increasingly complex world.

I warmly invite you to join the IIMT community and experience an education that is designed to prepare you for both professional success and personal fulfillment. Explore our programmes and see how we can help you achieve your aspirations. We look forward to welcoming you to our campus in Knowledge Park.`,
      image: defaultImage
  };

  return (
    <Layout>
      <PageHeader
        title="Director's Message"
        subtitle="A vision for academic excellence and student success"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Director's Message" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14">
              <div className="reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_hsl(var(--navy)/0.1)] border bg-card">
                  {msg.image ? (
                      <img src={msg.image} alt={msg.name} className="w-full h-auto object-cover" />
                  ) : (
                      <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto rounded-full bg-gold-light flex items-center justify-center mb-3">
                            <span className="text-3xl font-display font-bold text-navy">{msg.name ? msg.name.charAt(0) : "D"}</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">{msg.name}</p>
                          <p className="text-xs text-muted-foreground">{msg.designation}</p>
                        </div>
                      </div>
                  )}
                </div>
              </div>

              <div className="reveal-right space-y-6">
                {msg.message && /<\/?[a-z][\s\S]*>/i.test(msg.message) ? (
                  <div 
                    className="text-foreground/70 leading-relaxed space-y-4 prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: msg.message }}
                  />
                ) : (
                  <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                     {msg.message}
                  </div>
                )}

                {msg.candidImage && (
                  <div className="mt-8 rounded-2xl overflow-hidden shadow-md max-h-[350px]">
                    <img 
                      src={msg.candidImage} 
                      alt={`${msg.name} Academic Setting`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="font-semibold text-foreground">{msg.name}</p>
                  <p className="text-sm text-muted-foreground">{msg.designation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageGallery images={data?.pageGallery} />
      <EnquiryCTA />
    </Layout>
  );
}
