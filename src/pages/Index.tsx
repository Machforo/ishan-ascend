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

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsBar />
      <div id="about"><AboutSection /></div>
      <div id="programs"><ProgramsSection /></div>
      <div id="why-iimt"><WhyIIMTSection /></div>
      <div id="placements"><PlacementsSection /></div>
      <FacultySection />
      <div id="campus"><CampusExperience /></div>
      <div id="news"><NewsSection /></div>
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
