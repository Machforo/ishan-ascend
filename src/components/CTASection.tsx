import { useScrollReveal } from "@/hooks/useScrollReveal";
import auditoriumImg from "@/assets/auditorium.jpg";
import { Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useIIMTData } from "@/hooks/useIIMTData";

export default function CTASection() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", course: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { data } = useIIMTData("homepage");
  const ctaContent = data?.contactUs?.content || "Admissions are open for 2025-26. Connect with our counsellors for guidance on programs, eligibility, and scholarships.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("https://ishan-backend-g096.onrender.com/api/iimt/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Enquiry submitted successfully! Our counselors will contact you soon.");
        setFormData({ name: "", phone: "", email: "", course: "", message: "" });
      } else {
        toast.error("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={auditoriumImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(var(--navy-dark)/0.9)]" />
      </div>

      <div className="relative container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <div className="reveal-left space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground leading-tight">
              Start Your Journey at IIMT Today
            </h2>
            <p className="text-primary-foreground/60 leading-relaxed whitespace-pre-wrap">
              {ctaContent}
            </p>

            <div className="space-y-4 pt-4">
              {[
                { icon: Phone, text: "8448797700", href: "tel:+918448797700" },
                { icon: MapPin, text: "Greater Noida, Uttar Pradesh — Delhi NCR" },
                { icon: Clock, text: "Mon – Sat: 9:00 AM – 5:00 PM" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--gold)/0.15)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-primary-foreground/70">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            <div className="bg-card rounded-2xl p-8 shadow-[0_8px_40px_hsl(var(--navy)/0.2)]">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">Enquiry Form</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                />
                <select
                  className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  <option value="">Select Program</option>
                  <option value="BBA">BBA</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BCA">BCA</option>
                  <option value="M.Com">M.Com</option>
                  <option value="B.Ed">B.Ed</option>
                  <option value="M.Ed">M.Ed</option>
                </select>
                <textarea
                  placeholder="Your Message (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97] disabled:opacity-70"
                >
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
