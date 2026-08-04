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

  return (
    <>
      <StandardPage
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
