import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import WhyIIMTSection from "@/components/WhyIIMTSection";
import PlacementsSection from "@/components/PlacementsSection";
import CampusExperience from "@/components/CampusExperience";
import NewsSection from "@/components/NewsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FacultySection from "@/components/FacultySection";
import CTASection from "@/components/CTASection";

import DynamicPageSections from "@/components/DynamicPageSections";

const Index = () => {
  const defaultSections: Record<string, React.ReactNode> = {
    hero: <HeroSection />,
    stats: <StatsBar />,
    about: <div id="about"><AboutSection /></div>,
    programs: <div id="programs"><ProgramsSection /></div>,
    why_iimt: <div id="why-iimt"><WhyIIMTSection /></div>,
    placements: <div id="placements"><PlacementsSection /></div>,
    faculty: <FacultySection />,
    campus: <div id="campus"><CampusExperience /></div>,
    news: <div id="news"><NewsSection /></div>,
    testimonials: <TestimonialsSection />,
    faqs: <FAQSection />,
    cta: <CTASection />
  };

  const defaultOrder = [
    'hero',
    'stats',
    'about',
    'programs',
    'why_iimt',
    'placements',
    'faculty',
    'campus',
    'news',
    'testimonials',
    'faqs',
    'cta'
  ];

  return (
    <Layout>
      <DynamicPageSections
        pageId="homepage"
        defaultSections={defaultSections}
        defaultOrder={defaultOrder}
      />
    </Layout>
  );
};

export default Index;
