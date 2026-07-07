import React from "react";
import StandardPage, { PageSection } from "@/components/templates/StandardPage";
import { useIIMTData } from "@/hooks/useIIMTData";
import studentsImg from "@/assets/students-library.jpg";
import EnquiryCTA from "@/components/EnquiryCTA";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const { data, isLoading } = useIIMTData("aboutus");

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

  const sections: PageSection[] = [
    {
      id: "our-story",
      type: "hero",
      subtitle: "Our Story",
      title: "Legacy of Shaping Professional Excellence",
      content: data?.ourStory?.description || fallbackText,
      image: data?.ourStory?.image || studentsImg,
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
  ];

  return (
    <>
      <StandardPage
        pageTitle={data?.pageHeading || "About IIMT Greater Noida"}
        pageSubtitle={data?.pageSubheading || "Transforming potential into performance through academic excellence since 1994."}
        breadcrumbs={[{ label: "About IIMT" }]}
        sections={sections}
      />
      <EnquiryCTA />
    </>
  );
}
