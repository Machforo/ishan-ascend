import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, ArrowUpRight, Search, X, GraduationCap, Briefcase } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgramsSection() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("courses");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const fallbackPrograms = [
    { 
      name: "BBA", 
      type: "UG",
      category: "Management",
      description: "Bachelor of Business Administration. 3 Years.", 
      link: "/courses/bba",
      overview: "Develop essential management skills and business perspective. Focuses on marketing, HR, and finance fundamentals.",
      outcomes: ["Sales Manager", "Business Development Executive", "HR Generalist", "Management Trainee"]
    },
    { 
      name: "B.Com", 
      type: "UG",
      category: "Commerce",
      description: "Bachelor of Commerce. 3 Years.", 
      link: "/courses/bcom",
      overview: "Comprehensive study of accounting, finance, and taxation. Prepares students for professional roles in the financial sector.",
      outcomes: ["Accountant", "Tax Consultant", "Financial Analyst", "Audit Assistant"]
    },
    { 
      name: "BCA", 
      type: "UG",
      category: "IT",
      description: "Bachelor of Computer Applications. 3 Years.", 
      link: "/courses/bca",
      overview: "Technical course covering software development, database management, and emerging technologies like AI/ML.",
      outcomes: ["Software Developer", "Web Designer", "System Analyst", "Technical Support"]
    },
    { 
      name: "M.Com", 
      type: "PG",
      category: "Commerce",
      description: "Master of Commerce. 2 Years.", 
      link: "/courses/mcom",
      overview: "Advanced study in commerce, ideal for those seeking leadership roles in business or academic research.",
      outcomes: ["Finance Manager", "Senior Auditor", "Business Consultant", "Bank Manager"]
    },
    { 
      name: "B.Ed", 
      type: "UG",
      category: "Education",
      description: "Bachelor of Education. 2 Years.", 
      link: "/courses/bed",
      overview: "Professional training for aspiring teachers. Focuses on pedagogy, child psychology, and classroom management.",
      outcomes: ["School Teacher", "Education Counselor", "Curriculum Designer", "School Administrator"]
    },
    { 
      name: "M.Ed", 
      type: "PG",
      category: "Education",
      description: "Master of Education. 2 Years.", 
      link: "/courses/med",
      overview: "Advanced pedagogical research and leadership development for senior educational roles.",
      outcomes: ["Principal/HOD", "Education Consultant", "Lecturer", "Policy Analyst"]
    }
  ];
  
  const rawPrograms = data?.data?.length > 0 ? data.data : (Array.isArray(data) && data.length > 0 ? data : fallbackPrograms);
  const programs = rawPrograms.map((p: any) => ({
    name: p.programName || p.name,
    type: p.type || "UG",
    category: p.category || "Management",
    description: p.homepageSummary || p.description || p.overview,
    link: p.link || `/courses/${(p.programName || p.name || "").toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    overview: p.overview,
    outcomes: p.careerOutcome ? p.careerOutcome.split(",").map((s: string) => s.trim()) : p.outcomes
  }));
  
  // Dynamically generate available filters
  const availableTypes = Array.from(new Set(programs.map((p: any) => p.type || "Other"))).filter(Boolean) as string[];
  const availableCats = Array.from(new Set(programs.map((p: any) => p.category || "Other"))).filter(Boolean) as string[];
  const filterOptions = ["All", ...availableTypes, ...availableCats];

  const [activeFilter, setActiveFilter] = useState("All");
  const [programSearch, setProgramSearch] = useState("");

  const filteredPrograms = programs.filter((p: any) => {
    const matchesFilter = activeFilter === "All" || p.type === activeFilter || p.category === activeFilter;
    const matchesSearch = programSearch.trim() === "" || p.name.toLowerCase().includes(programSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="programs" className="py-12 md:py-20 bg-section-alt overflow-hidden" ref={ref}>
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Academic Excellence</p>
          <h2 className="reveal delay-100 text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
            Programs Designed for Real-World Success
          </h2>
          <p className="reveal delay-200 mt-5 text-foreground/60 leading-relaxed">
            CCS University affiliated programs approved by UGC &amp; AICTE, blending theoretical depth with intensive industry exposure.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="reveal delay-300 max-w-5xl mx-auto mb-16 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all active:scale-[0.97] ${
                  activeFilter === f ? "bg-navy text-white shadow-xl" : "bg-white text-navy hover:bg-gold hover:text-navy border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Find a program..."
              value={programSearch}
              onChange={(e) => setProgramSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border rounded-xl outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all text-xs font-medium"
            />
            {programSearch && (
              <button 
                onClick={() => setProgramSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program: any, i: number) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={program.name || i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative bg-card rounded-2xl border p-8 shadow-[0_4px_20px_hsl(var(--navy)/0.04)] hover:shadow-[0_20px_40px_hsl(var(--navy)/0.08)] transition-all duration-500 overflow-hidden"
                >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gold/5 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors duration-300">
                    <BookOpen className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-navy">{program.name || "Program Name"}</h3>
                    <p className="text-xs uppercase tracking-wider text-gold mt-1 font-semibold">
                      {program.description?.includes('.') 
                        ? program.description.split('.')[1]?.trim() 
                        : (program.description || program.quickFacts || "Full Time")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Overview</p>
                    <p className="text-sm text-foreground/70 leading-relaxed italic">
                      "{program.homepageSummary || program.overview || program.description}"
                    </p>
                  </div>

                  <AnimatePresence>
                    {(hoveredIndex === i) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Career Outcomes</p>
                        <div className="flex flex-wrap gap-2">
                          {(program.outcomes || program.careerOutcome?.split(',') || ["Management Professional", "Industry Expert"]).map((outcome: string) => (
                            <span key={outcome} className="px-2.5 py-1 bg-muted rounded-full text-[10px] font-medium text-foreground/70">
                              {outcome.trim()}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-6 border-t flex items-center justify-between">
                    <Link to={program.link || "#"} className="flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors group/btn">
                      Explore Program
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
