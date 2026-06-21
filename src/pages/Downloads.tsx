import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function DownloadsPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("studentzone");
  
  const downloadsData = data?.downloads;
  const downloads = downloadsData?.files?.length > 0 ? downloadsData.files : [
    { name: "BBA Syllabus 2024-25", fileType: "PDF", category: "Syllabus", size: "2.4 MB" },
    { name: "B.Com Syllabus 2024-25", fileType: "PDF", category: "Syllabus", size: "1.8 MB" },
    { name: "BCA Syllabus 2024-25", fileType: "PDF", category: "Syllabus", size: "2.1 MB" },
    { name: "Academic Calendar 2024-25", fileType: "PDF", category: "Calendar", size: "850 KB" },
    { name: "Examination Form", fileType: "PDF", category: "Forms", size: "320 KB" },
    { name: "Hostel Application Form", fileType: "PDF", category: "Forms", size: "280 KB" },
    { name: "Scholarship Application Form", fileType: "PDF", category: "Forms", size: "350 KB" },
    { name: "Anti-Ragging Undertaking", fileType: "PDF", category: "Forms", size: "210 KB" },
  ];

  return (
    <Layout>
      <PageHeader 
        title={downloadsData?.pageTitle || "Downloads"} 
        subtitle={downloadsData?.pageSubtitle || "Timetables, syllabi, forms, and notices for current students"} 
        breadcrumbs={[{ label: "Students" }, { label: "Downloads" }]} 
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-3">
            {downloads.map((d: any, i: number) => (
              <div key={d.name || i} className={`reveal delay-${Math.min(i % 4, 3)}00 flex items-center gap-4 p-4 rounded-xl border bg-card hover:shadow-sm transition-shadow`}>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-destructive" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.category} · {d.fileType || d.type} · {d.size}</p>
                </div>
                {d.link ? (
                  <a href={d.link} target="_blank" rel="noreferrer" className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"><Download className="w-4 h-4 text-foreground/60" /></a>
                ) : (
                  <button className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"><Download className="w-4 h-4 text-foreground/60" /></button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
