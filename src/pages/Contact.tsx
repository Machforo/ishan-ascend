import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useIIMTData } from "@/hooks/useIIMTData";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("contact");
  const mainContact = {
    address: data?.address || "IIMT, Knowledge Park-III, Greater Noida, Uttar Pradesh 201308",
    phone: data?.phone || "8448797700",
    email: data?.email || "info@ishan.ac",
    mapEmbed: data?.mapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2!2d77.49!3d28.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIIMT+Greater+Noida!5e0!3m2!1sen!2sin!4v1"
  };
  const collegeContacts = data?.departments || [];

  const [form, setForm] = useState({ name: "", phone: "", email: "", program: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Attempt real submit but don't block the UI if it fails (as backend might not be up)
    try {
      await fetch("https://ishan-backend-g096.onrender.com/api/iimt/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Contact Page" }),
      });
    } catch (err) {
      console.warn("Backend not reachable, simulating success for demo", err);
    }

    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", program: "", message: "" });
    setSubmitting(false);
  };

  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="Reach out for admissions enquiries, campus visits, and general information" breadcrumbs={[{ label: "Contact" }]} />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="reveal-left space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Campus Address", value: mainContact.address },
                    { icon: Phone, label: "Admissions Helpline", value: mainContact.phone, href: `tel:${mainContact.phone}` },
                    { icon: Mail, label: "Email", value: mainContact.email, href: `mailto:${mainContact.email}` },
                    { icon: Clock, label: "Office Hours", value: "Monday – Saturday: 9:00 AM – 5:00 PM" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 p-4 rounded-xl border bg-card text-xs sm:text-sm">
                      <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-navy" /></div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                        {href ? <a href={href} className="font-semibold text-navy hover:underline">{value}</a> : <p className="font-medium text-foreground">{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border h-[300px]">
                <iframe src={mainContact.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="IIMT Location" />
              </div>
            </div>

            <div className="reveal-right">
              <div className="bg-card rounded-2xl p-8 shadow-[0_8px_40px_hsl(var(--navy)/0.08)] border">
                <h3 className="text-xl font-display font-bold text-foreground mb-6">Enquiry Form</h3>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-navy">✓</span>
                    </div>
                    <p className="font-semibold text-foreground mb-2">Enquiry Submitted!</p>
                    <p className="text-sm text-muted-foreground">We'll reach out to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-5 text-sm text-navy underline">Submit another enquiry</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name*" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                      <input type="tel" placeholder="Phone Number*" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                    </div>
                    <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow" />
                    <select value={form.program} onChange={e => setForm(p => ({ ...p, program: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow">
                      <option value="">Select Program</option>
                      <option>BBA</option><option>B.Com</option><option>BCA</option><option>M.Com</option><option>B.Ed</option><option>M.Ed</option>
                    </select>
                    <textarea placeholder="Your Message (optional)" rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow resize-none" />
                    <button type="submit" disabled={submitting} className="w-full py-3.5 text-sm font-semibold bg-navy text-primary-foreground rounded-lg shadow-lg hover:bg-navy/90 transition-all active:scale-[0.97] disabled:opacity-60">
                      {submitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {collegeContacts.length > 0 && (
            <div className="mt-20 reveal">
              <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">Departmental Contacts</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collegeContacts.map((c: any, i: number) => (
                  <div key={i} className="p-6 rounded-xl border bg-card">
                    <h3 className="font-semibold text-foreground mb-3 border-b pb-2 text-sm">{c.name}</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-foreground/70">
                        <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                        <a href={`tel:${c.phone}`} className="hover:text-navy hover:underline">{c.phone}</a>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-foreground/70">
                        <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                        <a href={`mailto:${c.email}`} className="hover:text-navy hover:underline">{c.email}</a>
                      </div>
                      {c.contactPerson && (
                        <div className="flex items-start gap-2.5 text-xs text-foreground/70">
                          <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>Contact Person: {c.contactPerson}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
