import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIIMTData } from "@/hooks/useIIMTData";
import { Clock, GraduationCap, IndianRupee, Users, CheckCircle2 } from "lucide-react";
import NotFound from "./NotFound";

export default function DynamicCourse() {
  const { courseId } = useParams();
  const { data, isLoading } = useIIMTData("courses");

  if (isLoading) return <div className="min-h-screen flex flex-col"><Navbar /><div className="flex-1 flex items-center justify-center font-display text-xl text-navy animate-pulse">Loading Academic Program...</div></div>;
  
  // Clean string to match slugs
  const sanitizeSlug = (str: string) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const fallbackCourses = [
    {
      programName: "BBA (Bachelor of Business Administration)",
      duration: "3 Years (Full-time)",
      eligibility: "10+2 from any recognized board. CUET/Entrance based.",
      annualIntake: "60 Seats",
      overview: "The Bachelor of Business Administration (BBA) at IIMT is designed to nurture future business leaders and entrepreneurs. The programme provides a strong foundation in core business disciplines including Marketing, Finance, HR, and Operations. We emphasize practical learning through case studies, industrial visits, and regular interactions with industry veterans in Knowledge Park, Greater Noida.",
      curriculumStructure: "The 3-year programme follows the CCS University curriculum, integrated with IIMT's professional development modules. Key subjects include Management Principles, Business Communication, Financial Accounting, Marketing Management, and Organizational Behaviour. Students also undertake a mandatory industry internship in their final year.",
      careerScope: "BBA graduates can explore diverse roles in corporate sectors, including Management Trainee, Marketing Executive, Business Analyst, and HR Assistant. It also serves as a perfect stepping stone for pursuing an MBA or launching your own startup venture.",
    },
    {
      programName: "BCA (Bachelor of Computer Applications)",
      duration: "3 Years (Full-time)",
      eligibility: "10+2 with Mathematics (preferred). CUET/Entrance based.",
      annualIntake: "60 Seats",
      overview: "Our BCA programme is a launchpad for a successful career in the rapidly evolving IT industry. We focus on providing deep technical knowledge alongside practical programming skills. With state-of-the-art computer labs and a curriculum aligned with modern tech trends, IIMT ensures that BCA students are ready for the digital-first economy.",
      curriculumStructure: "The curriculum covers core areas like Programming in C/C++, Java, Database Management Systems, Web Development, and Software Engineering. Students also gain exposure to emerging technologies like Python and Data Science through specialized workshops and live lab sessions.",
      careerScope: "Graduates can pursue careers as Software Developers, Web Developers, System Analysts, Database Administrators, and IT Consultants. Many of our students also progress to MCA or specialized masters in Data Science and AI.",
    },
    {
      programName: "B.Com (Bachelor of Commerce)",
      duration: "3 Years (Full-time)",
      eligibility: "10+2 from any recognized board. Merit-based.",
      annualIntake: "120 Seats",
      overview: "The B.Com programme at IIMT offers a comprehensive understanding of accounting, finance, and business laws. It is designed for students aiming for careers in banking, financial services, and corporate accounting. Our faculty brings a blend of academic rigor and professional insights from the world of commerce and taxation.",
      curriculumStructure: "The programme follows the CCS University framework, covering subjects like Financial Accounting, Corporate Law, Auditing, Income Tax, and Macro-economics. We supplement this with workshops on Tally, GST, and advanced Excel to enhance employability.",
      careerScope: "B.Com graduates find opportunities in Banking, Insurance, Accounting firms, and Corporate Finance departments. It is an ideal foundation for professional certifications like CA, CS, and CMA, as well as for pursuing an M.Com or MBA.",
    },
    {
      programName: "M.Com (Master of Commerce)",
      duration: "2 Years (Full-time)",
      eligibility: "B.Com / BBA / Graduate with Commerce background. Merit-based.",
      annualIntake: "30 Seats",
      overview: "Our M.Com programme is designed for advanced learning in commerce and research methodologies. It caters to students aspiring for careers in higher education, specialized accounting, and research. IIMT provides an environment that encourages critical inquiry and academic excellence in the field of commerce.",
      curriculumStructure: "The 2-year programme covers advanced topics in Financial Management, Research Methodology, Marketing Research, and Strategic Management. Students are required to complete a research project/dissertation as part of their final assessment.",
      careerScope: "Graduates are well-prepared for roles in academic research, teaching (post-NET/JRF), senior accounting positions, and financial consultancy. It also provides a strong base for pursuing a Ph.D. in Commerce or Management.",
    },
    {
      programName: "B.Ed (Bachelor of Education)",
      duration: "2 Years (Full-time)",
      eligibility: "Graduate/Post-graduate with 50% marks. UP Joint B.Ed Entrance qualified.",
      annualIntake: "100 Seats",
      overview: "The B.Ed programme at IIMT is dedicated to nurturing highly skilled and compassionate educators. Approved by NCTE and affiliated with CCS University, we emphasize pedagogical innovation, psychological foundations of education, and reflective teaching practices. Our Pedagogy Labs and micro-teaching setups provide the perfect training ground for future teachers.",
      curriculumStructure: "The programme includes theory papers on Educational Psychology, Contemporary India and Education, and Pedagogy of School Subjects. A cornerstone of the course is the 20-week supervised practice teaching programme in partner schools, ensuring real classroom exposure.",
      careerScope: "Graduates are eligible for teaching positions in secondary and senior secondary schools across India (CTET/TET qualified). They can also work as educational consultants, curriculum designers, and academic coordinators.",
    },
    {
      programName: "M.Ed (Master of Education)",
      duration: "2 Years (Full-time)",
      eligibility: "B.Ed / B.A. B.Ed / B.Sc. B.Ed with 50% marks. University Entrance based.",
      annualIntake: "50 Seats",
      overview: "Our M.Ed programme is an advanced professional degree for those seeking leadership roles in education and academic research. We focus on developing expertise in educational administration, curriculum development, and advanced research techniques. IIMT's M.Ed scholars are trained to lead and innovate in the educational ecosystem.",
      curriculumStructure: "The curriculum includes advanced study of Educational Philosophy, Sociology of Education, Information & Communication Technology in Education, and Teacher Education. A significant portion of the programme is dedicated to independent research through a Master's dissertation.",
      careerScope: "M.Ed graduates are prepared for careers as Teacher Educators in B.Ed/D.El.Ed colleges, Educational Administrators, Curriculum Specialists, and Researchers in government and private educational organizations.",
    },
  ];

  const courseList = data?.data?.length > 0 ? data.data : (Array.isArray(data) && data.length > 0 ? data : fallbackCourses);
  const course = courseList.find((c: any) => sanitizeSlug(c.programName || c.name).includes(sanitizeSlug(courseId || '')));

  if (!course) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-navy py-20 md:py-32 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
              {course.programName || course.name}
            </h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed font-light">
              Expand your horizons and build a foundation for success.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container-wide py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Program Overview</h2>
              <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.overview || course.description || "Program overview details will be updated shortly."}</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Curriculum Structure</h2>
              <div className="bg-card border rounded-2xl p-6 shadow-sm">
                 <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.curriculumStructure || "Curriculum structure will be updated shortly."}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-navy mb-5 text-gold-underline">Career Scope</h2>
              <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">{course.careerScope || "Career scope will be updated shortly."}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-navy text-primary-foreground rounded-2xl p-8 sticky top-32 shadow-[0_8px_30px_hsl(var(--navy)/0.2)]">
              <h3 className="text-2xl font-display font-bold mb-8">Quick Facts</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Duration</p>
                    <p className="font-semibold text-lg">{course.duration || (course.quickFacts && course.quickFacts.split('|')[0]) || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Annual Fee</p>
                    <p className="font-semibold text-lg">{course.annualFee || (course.careerOutcome && course.careerOutcome.split('|')[0]) || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Annual Intake</p>
                    <p className="font-semibold text-lg">{course.annualIntake || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60 mb-1">Eligibility</p>
                    <p className="font-semibold">{course.eligibility || (course.quickFacts && course.quickFacts.split('|')[1]) || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-primary-foreground/10">
                <button className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl transition-colors shadow-lg active:scale-[0.98]">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
