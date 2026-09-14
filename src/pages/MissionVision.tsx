import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, Eye, Compass } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";
import PageGallery from "@/components/PageGallery";

import DynamicPageSections from "@/components/DynamicPageSections";

export default function MissionVisionPage() {
  const { data } = useIIMTData("aboutus");

  const mv = data?.missionVision;
  const ref = useScrollReveal([mv]);

  const vision = mv?.vision || `To be a premier institution in North India, recognized for producing ethical leaders and socially responsible professionals who contribute meaningfully to the regional and global economy.`;

  const missionStr = mv?.mission;
  const missionList = missionStr ? missionStr.split('\n').filter((x: string) => x.trim() !== '') : [
    "IIMT delivers industry-aligned education in management, commerce, technology, and teacher training to empower students for professional success.",
    "We integrate rigorous curriculum with practical industry links and expert faculty mentorship to ensure superior career outcomes for every student.",
    "Our mission is to foster an inclusive learning environment that emphasizes ethical values, critical thinking, and real-world application of knowledge.",
    "We serve as a catalyst for regional impact by nurturing skilled professionals who are ready to lead in their respective fields across North India.",
  ];

  const defaultCoreValues = [
    { title: "Excellence", description: "Maintaining the highest standards in every academic and professional pursuit." },
    { title: "Integrity", description: "Upholding honesty, ethics, and transparency in all our interactions." },
    { title: "Innovation", description: "Embracing new ideas and technologies to enhance the learning experience." },
    { title: "Inclusion", description: "Ensuring equal opportunities and a sense of belonging for all students." },
    { title: "Practical Learning", description: "Bridging the gap between theory and industry through hands-on experience." },
    { title: "Community", description: "Fostering a supportive network of students, faculty, alumni, and partners." },
    { title: "Research", description: "Encouraging a spirit of inquiry and academic contribution among all scholars." },
    { title: "Accessibility", description: "Providing high-quality professional education that is accessible to deserving candidates." },
  ];

  const coreValuesRaw = mv?.coreValues;
  const coreValues = Array.isArray(coreValuesRaw) && coreValuesRaw.length > 0
    ? coreValuesRaw.map((v: any) => ({ 
        title: typeof v === 'string' ? v : (v.text || v.title || ''), 
        description: typeof v === 'string' ? '' : (v.description || '') 
      }))
    : defaultCoreValues;

  const defaultSections: Record<string, React.ReactNode> = {
    header: (
      <PageHeader
        title="Mission & Vision"
        subtitle="Guiding principles that drive academic excellence and holistic development at IIMT"
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Mission & Vision" }]}
      />
    ),
    banner_image: mv?.bannerImage ? (
      <div className="container-wide mt-12">
        <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[400px]">
          <img src={mv.bannerImage} alt="Mission & Vision Banner" className="w-full h-full object-cover" />
        </div>
      </div>
    ) : null,
    vision: (
      <section className="py-12 md:py-16" ref={ref}>
        <div className="container-wide max-w-4xl mx-auto">
          <div className="reveal grid md:grid-cols-[80px_1fr] gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center shrink-0">
              <Eye className="w-8 h-8 text-navy" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Our Vision</h2>
              <div 
                className="text-lg text-foreground/70 leading-relaxed whitespace-pre-wrap" 
                dangerouslySetInnerHTML={{ __html: vision }} 
              />
            </div>
          </div>
        </div>
      </section>
    ),
    mission: (
      <section className="py-12 md:py-16 bg-slate-50/50">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="reveal delay-100 grid md:grid-cols-[80px_1fr] gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center shrink-0">
              <Target className="w-8 h-8 text-navy" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Our Mission</h2>
              {missionStr && /<\/?[a-z][\s\S]*>/i.test(missionStr) ? (
                <div 
                  className="text-foreground/70 leading-relaxed space-y-4 prose prose-slate max-w-none" 
                  dangerouslySetInnerHTML={{ __html: missionStr }} 
                />
              ) : (
                <ul className="space-y-3">
                  {missionList.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
                      <p className="text-foreground/70 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    ),
    core_values: (
      <section className="py-12 md:py-16">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="reveal delay-200 grid md:grid-cols-[80px_1fr] gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center shrink-0">
              <Compass className="w-8 h-8 text-navy" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Core Values</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {coreValues.map((v: any, i: number) => (
                  <div key={v.title || i} className="p-4 rounded-xl border bg-card">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.description || v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    editorial_photos: mv?.editorialPhotos?.length > 0 ? (
      <section className="py-8 md:py-12 border-t">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="reveal">
            <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">Our Vision in Action</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {mv.editorialPhotos.map((photo: any, i: number) => {
                const url = photo?.url || photo;
                if (!url) return null;
                return (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-md h-48 bg-slate-100 group">
                    <img 
                      src={url} 
                      alt={`Vision Action ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    ) : null,
    gallery: <PageGallery images={data?.pageGallery} />,
    cta: <EnquiryCTA />
  };

  const defaultOrder = [
    'header',
    'banner_image',
    'vision',
    'mission',
    'core_values',
    'editorial_photos',
    'gallery',
    'cta'
  ];

  return (
    <Layout>
      <DynamicPageSections
        pageId="mission_vision"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
}
