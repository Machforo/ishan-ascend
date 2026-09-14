import React from "react";
import StandardPage, { PageSection } from "@/components/templates/StandardPage";
import { useIIMTData } from "@/hooks/useIIMTData";
import studentsImg from "@/assets/students-library.jpg";
import EnquiryCTA from "@/components/EnquiryCTA";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const { data } = useIIMTData("aboutus");

  const fallbackText = `Established in 1994, Ishan Institute of Management & Technology (IIMT) stands as a pioneer of professional education in Knowledge Park, Greater Noida. Affiliated with Chaudhary Charan Singh (CCS) University, Meerut, and approved by the AICTE and NCTE, IIMT is a NAAC accredited institution committed to academic excellence and holistic development. Our journey began with a vision to provide quality higher education that transforms potential into professional performance.

Over the decades, we have evolved into a multi-disciplinary hub offering six distinct programmes: B.Com, BBA, BCA, M.Com, B.Ed, and M.Ed. Our industry-aligned curriculum ensures that students are not just degree holders but industry-ready professionals equipped with critical thinking and leadership skills.`;

  const keyDifferentiators = data?.keyDifferentiators?.length > 0 
    ? data.keyDifferentiators.map((k: any) => typeof k === 'string' ? k : k.title)
    : [
      "NAAC Accredited Institution",
      "Affiliated to CCS University, Meerut",
      "UGC, AICTE & NCTE Approved",
      "Industry-aligned Curriculum",
      "Modern Campus with Smart Classrooms",
      "Active Skill Development Cell"
    ];

  const bannerImg = data?.ourStory?.bannerImage;

  const sections: PageSection[] = [];

  // Add Banner Image at the top if present
  if (bannerImg) {
    sections.push({
      id: "about-banner",
      type: "content",
      className: "py-0 md:py-0 bg-transparent",
      content: (
        <div className="container-wide mt-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl max-h-[450px]">
            <img src={bannerImg} alt="IIMT Campus Banner" className="w-full h-full object-cover" />
          </div>
        </div>
      )
    });
  }

  sections.push(
    {
      id: "our-story",
      type: "hero",
      subtitle: "Our Story",
      title: "Legacy of Shaping Professional Excellence",
      image: data?.ourStory?.image || undefined,
      content: (
        <div className="space-y-6">
          <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
            {data?.ourStory?.description || fallbackText}
          </div>
          
          {data?.ourStory?.editorialPhotos?.length > 0 && (
            <div className="pt-4">
              <h4 className="text-base font-bold text-navy uppercase tracking-wider mb-4">Campus Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.ourStory.editorialPhotos.map((photo: any, i: number) => {
                  const url = photo?.url || photo;
                  if (!url) return null;
                  return (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-36 group bg-slate-100">
                      <img 
                        src={url} 
                        alt={`Campus Life ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(() => {
            const timelineList = [
              ...(data?.ourStory?.timelineImages || []).map((t: any) => t?.url || t?.image || t),
              ...(data?.ourStory?.timelineInfographic ? [data.ourStory.timelineInfographic] : [])
            ].filter(Boolean);

            if (timelineList.length === 0) return null;

            return (
              <div className="pt-6">
                <h4 className="text-base font-bold text-navy uppercase tracking-wider mb-4">Milestones & Journey</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {timelineList.map((imgUrl: string, idx: number) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white p-2">
                      <img 
                        src={imgUrl} 
                        alt={`IIMT Timeline Infographic ${idx + 1}`} 
                        className="w-full max-h-[400px] object-contain mx-auto" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      ),
    },
    {
      id: "key-differentiators",
      type: "grid",
      subtitle: "Why Choose Us",
      title: "Key Differentiators",
      items: keyDifferentiators.map((item: string) => ({
        title: item,
        description: "Experience the standard of excellence through our top-tier facilities and curriculum.",
        icon: <CheckCircle2 className="w-6 h-6 text-gold" />
      })),
      className: "bg-slate-50/50"
    }
  );

  if (data?.ourJourney?.length > 0) {
    sections.splice(2, 0, {
      id: "our-journey",
      type: "content",
      subtitle: "Milestones",
      title: "Our Journey",
      className: "bg-white",
      content: (
        <div className="relative mt-12 max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {data.ourJourney.map((j: any, i: number) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white shadow-sm -translate-x-1/2 z-10"></div>
                
                {/* Empty space for the other side */}
                <div className="hidden md:block w-[45%]"></div>
                
                {/* Content Card */}
                <div className="w-full pl-20 md:pl-0 md:w-[45%]">
                  <div className={`bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 relative ${i % 2 === 0 ? 'md:text-right md:mr-6' : 'md:text-left md:ml-6'}`}>
                    {/* Tiny connector arrow (desktop only) */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-slate-50 ${i % 2 === 0 ? 'border-l-[12px] -right-3' : 'border-r-[12px] -left-3'}`}></div>
                    
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold font-bold rounded-lg text-sm mb-3">
                      {j.year}
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {j.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  return (
    <>
      <StandardPage
        pageId="about_us"
        pageTitle={data?.pageHeading || "About IIMT Greater Noida"}
        pageSubtitle={data?.pageSubheading || "Transforming potential into performance through academic excellence since 1994."}
        breadcrumbs={[{ label: "About IIMT" }]}
        sections={sections}
      >
        <EnquiryCTA />
      </StandardPage>
    </>
  );
}
