import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Download, FileText, Search } from "lucide-react";
import { useState } from "react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function PastPapersPage() {
  const ref = useScrollReveal();
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useIIMTData("studentzone");
  
  const pastPapersData = data?.pastPapers;
  const papers = pastPapersData?.papers?.length > 0 ? pastPapersData.papers : [
    { program: "B.Com", year: "2023", name: "Sem 1 - Financial Accounting", size: "1.2 MB" },
    { program: "BBA", year: "2023", name: "Sem 2 - Business Management", size: "1.5 MB" },
    { program: "BCA", year: "2023", name: "Sem 1 - Programming in C", size: "2.1 MB" },
    { program: "M.Com", year: "2022", name: "Sem 4 - Advanced Auditing", size: "1.8 MB" },
    { program: "B.Ed", year: "2023", name: "Sem 1 - Pedagogy of English", size: "1.4 MB" },
    { program: "M.Ed", year: "2022", name: "Sem 2 - Educational Research", size: "2.5 MB" },
  ];

  const filteredPapers = papers.filter((p: any) => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader
        title="Past Exam Papers"
        subtitle="Access previous years' question papers for comprehensive exam preparation."
        breadcrumbs={[{ label: "Past Papers" }]}
      />

      <section className="py-20" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="reveal-up space-y-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{pastPapersData?.subheading || "Exam Resources"}</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{pastPapersData?.heading || "Prepare with Confidence"}</h2>
              <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
                {pastPapersData?.description || "Access previous years' CCS University question papers for B.Com, BBA, BCA, M.Com, B.Ed, and M.Ed. These are invaluable resources for understanding exam patterns and frequently asked questions. Papers are organised by programme, semester, and year."}
              </p>
            </div>

            <div className="reveal-up">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by subject or programme..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/70">Programme</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/70">Subject</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/70">Year / Sem</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-foreground/70 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredPapers.map((p: any, i: number) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-navy">{p.program}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-gold" />
                              <span className="text-sm text-foreground/80">{p.name || p.subject}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-foreground/60">{p.year} {p.semester ? `| ${p.semester}` : ''}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {p.link ? (
                              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold hover:text-navy transition-colors font-bold text-xs uppercase tracking-wider">
                                <Download className="w-4 h-4" />
                                {p.size}
                              </a>
                            ) : (
                              <button className="inline-flex items-center gap-2 text-gold hover:text-navy transition-colors font-bold text-xs uppercase tracking-wider">
                                <Download className="w-4 h-4" />
                                {p.size}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredPapers.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-foreground/50">
                            No papers found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-foreground/50">
                {pastPapersData?.footerText || "New papers are added after each CCS University examination cycle."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
