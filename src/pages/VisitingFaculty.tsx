import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultFaculty = [
  { name: "CA Rakesh Mehta", org: "Mehta & Associates", specialisation: "Advanced Accounting & Taxation", dept: "Commerce" },
  { name: "Mr. Sunil Kapoor", org: "HDFC Bank (Retd. VP)", specialisation: "Banking Operations & Risk Management", dept: "Management" },
  { name: "Ms. Deepika Nair", org: "Google India (Sr. Manager)", specialisation: "Digital Marketing & Analytics", dept: "IT" },
  { name: "Dr. Anjali Saxena", org: "DPS Greater Noida (Principal)", specialisation: "School Administration & Leadership", dept: "Education" },
  { name: "CFA Arun Bhatia", org: "Axis Capital", specialisation: "Investment Analysis & Portfolio Mgmt", dept: "Commerce" },
  { name: "Mr. Rajiv Tandon", org: "Infosys (Project Lead)", specialisation: "Software Development & Agile", dept: "IT" },
  { name: "Dr. Preeti Malhotra", org: "NCERT (Sr. Researcher)", specialisation: "Curriculum Design & Assessment", dept: "Education" },
  { name: "Mr. Harsh Vardhan", org: "Startup Founder, eVentures", specialisation: "Entrepreneurship & Business Strategy", dept: "Management" },
];

export default function VisitingFacultyPage() {
  const { data, loading } = useIIMTData("campuslife");
  const visitingFaculty = data?.visitingFaculty?.length > 0 ? data.visitingFaculty : defaultFaculty;
  const ref = useScrollReveal([visitingFaculty]);

  if (loading) return null;

  return (
    <Layout>
      <PageHeader
        title="Visiting Faculty"
        subtitle="Industry professionals and domain experts who bring real-world insights to the classroom"
        breadcrumbs={[{ label: "Faculty", href: "/faculty" }, { label: "Visiting Faculty" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <p className="reveal text-foreground/70 leading-relaxed max-w-3xl mb-12">
            IIMT's visiting faculty program bridges the gap between academic theory and industry practice. These distinguished professionals — CAs, CFAs, corporate leaders, school principals, and startup founders — deliver guest lectures, workshop sessions, and mentoring that enriches the learning experience for all students.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitingFaculty.map((f: any, i: number) => (
              <div key={f.name || i} className={`reveal delay-${Math.min(i % 4, 3)}00 bg-card rounded-xl border p-6 hover:shadow-[0_4px_20px_hsl(var(--navy)/0.06)] transition-shadow`}>
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-primary-foreground">
                    {f.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{f.name}</h3>
                <p className="text-xs text-gold font-medium mt-1">{f.org}</p>
                <p className="text-xs text-foreground/60 mt-2">{f.specialisation}</p>
                <span className="inline-block mt-3 px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{f.dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
