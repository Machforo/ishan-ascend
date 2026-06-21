import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function CareersPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("contact");
  const careersData = data?.careers || {};
  const email = careersData.email || "hr@ishan.ac";
  const jobs = careersData.jobs?.length > 0 ? careersData.jobs : [
    { title: "Assistant Professor — Management", qualification: "MBA with PhD/NET", dept: "Management", type: "Full-time" },
    { title: "Assistant Professor — Commerce", qualification: "M.Com with PhD/NET", dept: "Commerce", type: "Full-time" },
    { title: "Lab Technician — IT", qualification: "BCA/B.Tech with lab experience", dept: "IT", type: "Full-time" },
    { title: "Administrative Assistant", qualification: "Graduate with computer skills", dept: "Admin", type: "Full-time" },
  ];

  return (
    <Layout>
      <PageHeader title={careersData.pageTitle || "Careers at IIMT"} subtitle={careersData.pageSubtitle || "Join our team of dedicated educators and professionals"} breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Careers" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide"><div className="max-w-3xl mx-auto">
          <p className="reveal text-foreground/70 leading-relaxed mb-10 whitespace-pre-wrap">{careersData.description || "Ishan Institute of Management & Technology is always looking for passionate educators and professionals to join our growing team. We offer competitive compensation, a supportive work environment, and opportunities for professional development."}</p>
          <div className="space-y-4">
            {jobs.map((j: any, i: number) => (
              <div key={i} className={`reveal delay-${Math.min(i, 3)}00 p-6 rounded-xl border bg-card`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-foreground">{j.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{j.qualification}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{j.dept}</span>
                      <span className="px-2.5 py-1 rounded-md bg-gold-light text-xs font-medium text-navy">{j.type}</span>
                    </div>
                  </div>
                  <a href={`mailto:${email}`} className="shrink-0 px-5 py-2.5 text-sm font-semibold bg-navy text-primary-foreground rounded-lg hover:bg-navy/90 transition-colors active:scale-[0.97]">Apply</a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8 text-center">Send your CV to <a href={`mailto:${email}`} className="text-navy font-semibold">{email}</a></p>
        </div></div>
      </section>
    </Layout>
  );
}
