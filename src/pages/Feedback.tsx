import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function FeedbackPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("contact");
  const feedbackData = data?.feedback || {};

  return (
    <Layout>
      <PageHeader title={feedbackData.pageTitle || "Feedback"} subtitle={feedbackData.pageSubtitle || "Help us improve — share your experience as a student, parent, or visitor"} breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Feedback" }]} />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide"><div className="max-w-2xl mx-auto">
          <p className="reveal text-foreground/70 leading-relaxed mb-8">{feedbackData.description || "Your feedback is invaluable in helping us continuously improve our academic programs, campus facilities, and student support services. All feedback is reviewed by the administration and appropriate action is taken within 7 working days."}</p>
          <div className="reveal delay-100 bg-card rounded-2xl p-8 shadow-sm border">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name (optional)" className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                <select className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow">
                  <option value="">I am a...</option><option>Current Student</option><option>Alumni</option><option>Parent</option><option>Visitor</option>
                </select>
              </div>
              <input type="email" placeholder="Email (optional)" className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
              <select className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow">
                <option value="">Feedback Category</option><option>Academic Quality</option><option>Faculty</option><option>Infrastructure</option><option>Placements</option><option>Administration</option><option>Other</option>
              </select>
              <textarea placeholder="Your feedback..." rows={5} className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow resize-none" />
              <label className="flex items-center gap-2 text-sm text-foreground/70"><input type="checkbox" className="rounded" /> Submit anonymously</label>
              <button type="submit" className="w-full py-3.5 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97]">Submit Feedback</button>
            </form>
          </div>
        </div></div>
      </section>
    </Layout>
  );
}
