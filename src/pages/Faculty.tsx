import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultDepartments = [];

const defaultFaculty = [];

export default function FacultyPage() {
  const { data } = useIIMTData("campuslife");
  const faculty = data?.faculty?.length > 0 ? data.faculty : defaultFaculty;
  const ref = useScrollReveal([faculty]);
  const departments = ["All", ...Array.from(new Set(faculty.map((f: any) => f.dept || f.department || "General"))).filter(Boolean) as string[]];

  const [filter, setFilter] = useState("All");
  const [facultySearch, setFacultySearch] = useState("");

  const filtered = faculty.filter((f: any) => {
    const matchesDept = filter === "All" || (f.dept || f.department) === filter;
    const matchesSearch = facultySearch.trim() === "" || 
      f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
      (f.specialisation || f.specialization || "").toLowerCase().includes(facultySearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <Layout>
      <PageHeader
        title="Faculty Directory"
        subtitle="Experienced academicians and industry practitioners shaping future professionals"
        breadcrumbs={[{ label: "Faculty" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-16 space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Academic Excellence</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Guided by Expert Mentors</h2>
            <p className="text-foreground/70 leading-relaxed">
              At IIMT, our faculty is a vibrant mix of seasoned academicians, PhD scholars, and industry practitioners who bring a wealth of practical experience to the classroom. We maintain a healthy student-faculty ratio to ensure personalized attention and foster a strong mentoring culture, where every student is assigned a dedicated faculty mentor (1 mentor per 20 students) to guide their academic and professional growth.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Our faculty members are actively involved in continuous professional development, participating in national FDPs, workshops, and international conferences. Their contributions to academic research papers and curriculum design ensure that the learning at IIMT remains contemporary and industry-aligned. Our core team is dedicated to the holistic development of every student, nurturing both technical proficiency and ethical leadership.
            </p>
          </div>

          <div className="reveal max-w-2xl mx-auto mb-12 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search faculty by name or specialization..."
              value={facultySearch}
              onChange={(e) => setFacultySearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-card border rounded-2xl outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all text-sm"
            />
            {facultySearch && (
              <button 
                onClick={() => setFacultySearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="reveal flex flex-wrap gap-2 mb-10 justify-center">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors active:scale-[0.97] ${
                  filter === d ? "bg-navy text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((f: any, i: number) => (
              <div key={f.name || i} className={`reveal delay-${Math.min(i % 4, 3)}00 bg-card rounded-xl border p-6 text-center hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <div className="w-20 h-20 mx-auto rounded-full bg-gold-light flex items-center justify-center mb-4 overflow-hidden">
                  {f.image ? (
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-display font-bold text-navy">
                      {f.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm">{f.name}</h3>
                <p className="text-xs text-gold font-medium mt-1">{f.designation}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.qualification}</p>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-foreground/60">{f.specialisation || f.specialization}</p>
                </div>
                <span className="inline-block mt-3 px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{f.dept || f.department}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
