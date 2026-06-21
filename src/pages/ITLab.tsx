import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Monitor, Wifi, Clock, Shield } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";



export default function ITLabPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("campuslife");
  const itLabs = data?.itLabs;
  const content = itLabs?.content;
  const specs = itLabs?.specs ? [
    { label: "Computers", value: itLabs.specs.computers },
    { label: "Internet Connection", value: itLabs.specs.internetSpeed },
    { label: "Software Installed", value: itLabs.specs.software },
    { label: "Operating Hours", value: itLabs.specs.timings },
  ] : [
    { label: "Computers", value: "100+ High-Performance Systems" },
    { label: "Internet Connection", value: "100 Mbps Dedicated Fiber" },
    { label: "Software Installed", value: "MS Office, VS Code, Python, Tally Prime" },
    { label: "Operating Hours", value: "09:00 AM to 05:00 PM" },
  ];

  const rules = itLabs?.rules && itLabs.rules.length > 0 ? itLabs.rules : [
    "Students must carry their ID card to access the lab",
    "No food or beverages inside the lab area",
    "Personal USB drives require prior scanning approval",
    "Report any hardware/software issues to the lab attendant immediately",
    "Save work regularly — the institute is not responsible for data loss"
  ];

  return (
    <Layout>
      <PageHeader
        title="IT Lab"
        subtitle="Well-equipped computer labs supporting BCA, BBA, B.Com and certificate programs"
        breadcrumbs={[{ label: "Campus", href: "/infrastructure" }, { label: "IT Lab" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="reveal space-y-5 mb-12">
              {content ? (
                <div className="text-foreground/70 leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <>
                  <p className="text-foreground/70 leading-relaxed">
                    The IT labs at IIMT are designed to provide hands-on computing experience for students across all programs. Equipped with the latest hardware and licensed software, the labs support practical sessions in programming, database management, web development, and accounting software.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    The lab infrastructure includes 100 Mbps dedicated internet connectivity, networked printers, UPS backup, and professional IT support.
                  </p>
                </>
              )}
            </div>

            <div className="reveal delay-100 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {specs.map((s: any, i: number) => (
                <div key={s.label || i} className="p-4 rounded-xl border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="reveal delay-200 rounded-xl border bg-section-alt p-6">
              <h3 className="font-semibold text-foreground mb-3">Lab Rules</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                {rules.map((rule: any, i: number) => {
                  const text = typeof rule === 'string' ? rule : rule.text || '';
                  return <li key={i}>• {text}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
