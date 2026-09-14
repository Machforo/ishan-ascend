import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";
import DynamicPageSections from "@/components/DynamicPageSections";

export default function DirectorMessagePage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("aboutus");
  const defaultImage = "/assets/director.jpg";
  const msg = data?.directorMessage || {
      name: "Dr. D.K. Garg",
      designation: "Founder Chairman, Ishan Group",
      message: `Welcome to Ishan Institute of Management & Technology. As we navigate an era of rapid global change, I believe that true education goes beyond textbooks—it is a powerful catalyst that transforms human potential into professional performance. At IIMT, our philosophy is rooted in the belief that every student possesses a unique spark that, when nurtured with the right guidance and environment, can lead to extraordinary outcomes.

Our vision for IIMT is to create a learning ecosystem that prioritizes practical learning and meaningful industry exposure. We aim for the holistic development of our students, focusing not just on technical skills, but on fostering critical thinking, ethical leadership, and a resilient mindset. We want our graduates to be individuals who can lead with integrity and innovate with purpose in an increasingly complex world.

I warmly invite you to join the IIMT community and experience an education that is designed to prepare you for both professional success and personal fulfillment. Explore our programmes and see how we can help you achieve your aspirations. We look forward to welcoming you to our campus in Knowledge Park.`,
      image: defaultImage
  };

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader
        key="header"
        title="Director's Message"
        subtitle="A vision for academic excellence and student success"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Director's Message" }]}
      />
    ),
    profile: (
      <section key="profile" className="py-10 md:py-14">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-card border shadow-[0_4px_24px_hsl(var(--navy)/0.06)] flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border shrink-0 bg-slate-100">
                {msg.image ? (
                  <img src={msg.image} alt={msg.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gold-light">
                    <span className="text-4xl font-display font-bold text-navy">{msg.name ? msg.name.charAt(0) : "D"}</span>
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left space-y-3 flex-1">
                <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy bg-gold-light rounded-full">
                  Leadership & Governance
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">{msg.name}</h2>
                <p className="text-base text-gold font-semibold">{msg.designation}</p>
                <p className="text-sm text-foreground/70 leading-relaxed pt-1">
                  Founder & Director leading IIMT with a commitment to transforming human potential into professional excellence, combining academic rigour, industry immersion, and values-driven leadership.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">30+ Years Legacy</span>
                  <span className="text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">Academic Visionary</span>
                  <span className="text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">Knowledge Park III</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    message: (
      <section key="message" className="py-10 md:py-14">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-card border shadow-[0_4px_24px_hsl(var(--navy)/0.06)] space-y-6">
              <div className="flex items-center gap-4 border-b pb-6">
                <div className="w-12 h-12 rounded-2xl bg-gold-light flex items-center justify-center text-navy text-2xl font-bold">
                  ❝
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">Welcome Message & Educational Philosophy</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">From the Desk of the Director</p>
                </div>
              </div>

              {msg.message && /<\/?[a-z][\s\S]*>/i.test(msg.message) ? (
                <div 
                  className="text-foreground/75 leading-relaxed space-y-4 prose prose-slate max-w-none text-base sm:text-lg"
                  dangerouslySetInnerHTML={{ __html: msg.message }}
                />
              ) : (
                <div className="text-foreground/75 leading-relaxed whitespace-pre-wrap text-base sm:text-lg space-y-4">
                  {msg.message}
                </div>
              )}

              <div className="pt-6 border-t flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-lg">{msg.name}</p>
                  <p className="text-sm text-gold font-medium">{msg.designation}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block">Institution</span>
                  <span className="text-sm font-semibold text-foreground">IIMT Greater Noida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    candid_image: msg.candidImage ? (
      <section key="candid_image" className="py-10 md:py-14">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-xl border relative max-h-[440px] group">
              <img 
                src={msg.candidImage} 
                alt={`${msg.name} Academic Setting & Leadership`} 
                className="w-full h-full object-cover max-h-[440px] transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-8 sm:p-10">
                <div>
                  <p className="text-white font-display font-bold text-xl sm:text-2xl drop-shadow-md">Campus Leadership & Academic Environment</p>
                  <p className="text-white/80 text-sm sm:text-base drop-shadow max-w-2xl mt-1">
                    Empowering future leaders through holistic learning, industry mentorship, and cutting-edge pedagogy at IIMT Knowledge Park.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null,
    gallery: <PageGallery key="gallery" images={data?.pageGallery} />,
    cta: <EnquiryCTA key="cta" />,
  };

  const defaultOrder = ["header", "profile", "message", "candid_image", "gallery", "cta"];

  return (
    <Layout>
      <DynamicPageSections
        pageId="director_message"
        defaultOrder={defaultOrder}
        defaultSections={defaultSections}
      />
    </Layout>
  );
}
