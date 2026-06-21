import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, MessageSquare, MapPin, Laptop } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function AdmissionsEnquiryPage() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", phone: "", email: "", program: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data } = useIIMTData("admissions");
  const eqData = data?.enquiryPage;

  const introText = eqData?.introText || "Choosing the right institution is a significant decision. At IIMT, we offer personal guidance to help you navigate your academic and career path. Whether you are curious about our programmes, eligibility, or campus life, our admissions team is here to provide all the information you need.";
  const counsellingPoints = eqData?.counsellingPoints?.length > 0 ? eqData.counsellingPoints : [
    "Eligibility Assessment",
    "Career Fit Analysis",
    "Detailed Fee Breakdown",
    "Scholarship Guidance"
  ];
  const onlinePortalText = eqData?.onlinePortalText || "For your convenience, our online admissions portal allows you to track your application, upload documents, and pay fees digitally, ensuring a low-friction admission experience from anywhere.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/iimt/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: form.email || form.phone + "@placeholder.com", message: "Programme: " + form.program + ". " + form.message, source: "Admissions Enquiry" }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      toast.success("Enquiry submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      toast.error("Unable to submit enquiry. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Admissions Enquiry"
        subtitle="Start your journey with personal guidance and expert counselling."
        breadcrumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Enquiry" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="reveal-left space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-foreground">Begin Your Journey</h2>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {introText}
                </p>
                <div className="bg-gold-light p-6 rounded-2xl border border-gold/20 flex gap-4">
                  <MapPin className="w-6 h-6 text-navy shrink-0" />
                  <p className="text-sm font-medium text-navy">We warmly invite you and your parents to visit our campus in Knowledge Park III for a guided tour and a one-on-one interaction with our faculty.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gold" /> Personal Counselling Session
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">During your counselling session at IIMT, you can expect:</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {counsellingPoints.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold" /> {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-gold" /> Online Admissions Portal
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {onlinePortalText}
                </p>
              </div>
            </div>

            <div className="reveal-right">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-2xl border sticky top-32">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">Enquire Now</h3>
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Thank You!</h4>
                    <p className="text-foreground/60 leading-relaxed">Your enquiry has been received. Our admissions counsellor will contact you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="text-sm text-gold font-bold hover:underline">Submit another enquiry</button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">Full Name</label>
                        <input type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">Phone Number</label>
                        <input type="tel" placeholder="10-digit mobile" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">Email Address</label>
                      <input type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">Programme of Interest</label>
                      <select value={form.program} onChange={e => setForm(p => ({ ...p, program: e.target.value }))} className="w-full px-4 py-3 rounded-xl border bg-background text-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none">
                        <option value="">Select Programme</option>
                        <option>BBA</option>
                        <option>B.Com</option>
                        <option>BCA</option>
                        <option>M.Com</option>
                        <option>B.Ed</option>
                        <option>M.Ed</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider ml-1">Message (Optional)</label>
                      <textarea placeholder="Tell us more about your query..." rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none" />
                    </div>
                    <button type="submit" disabled={submitting} className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-gold hover:text-navy transition-all active:scale-[0.98] disabled:opacity-50">
                      {submitting ? "Sending..." : "Submit Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
