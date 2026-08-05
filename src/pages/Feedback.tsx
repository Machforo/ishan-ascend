import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIIMTData } from "@/hooks/useIIMTData";
import ImageWithFallback from "@/components/ImageWithFallback";
import PageGallery from "@/components/PageGallery";
import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const ref = useScrollReveal();
  const { data } = useIIMTData("contact");
  const feedbackData = data?.feedback || {};

  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter your feedback message.");
      return;
    }
    setSubmitting(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ishan-backend-g096.onrender.com/api";
      const payload = {
        name: isAnonymous ? "Anonymous" : (name.trim() || "Anonymous"),
        email: email.trim() || "feedback@anonymous.com",
        phone: "0000000000",
        course: category || "General Feedback",
        message: `[${userType || "Visitor"}] ${message}`,
        source: "Feedback Form",
      };
      const response = await fetch(`${apiBase}/iimt/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed");
      toast.success("Thank you! Your feedback has been submitted.");
      setSubmitted(true);
    } catch {
      toast.error("Unable to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setUserType("");
    setCategory("");
    setMessage("");
    setIsAnonymous(false);
  };

  return (
    <Layout>
      <PageHeader
        title={feedbackData.pageTitle || "Feedback"}
        subtitle={feedbackData.pageSubtitle || "Help us improve — share your experience as a student, parent, or visitor"}
        breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: "Feedback" }]}
      />
      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            {feedbackData?.bannerImage && (
              <div className="reveal mb-10 rounded-2xl overflow-hidden aspect-[21/9]">
                <ImageWithFallback
                  src={feedbackData.bannerImage}
                  alt="Feedback Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="reveal text-foreground/70 leading-relaxed mb-8">
              {feedbackData.description ||
                "Your feedback is invaluable in helping us continuously improve our academic programs, campus facilities, and student support services. All feedback is reviewed by the administration and appropriate action is taken within 7 working days."}
            </p>
            <div className="reveal delay-100 bg-card rounded-2xl p-8 shadow-sm border">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-navy">✓</span>
                  </div>
                  <p className="font-semibold text-foreground mb-2">Feedback Submitted!</p>
                  <p className="text-sm text-muted-foreground">
                    Thank you — we'll review your feedback within 7 working days.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-5 text-sm text-navy underline"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isAnonymous}
                      className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow disabled:opacity-50"
                    />
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                    >
                      <option value="">I am a...</option>
                      <option>Current Student</option>
                      <option>Alumni</option>
                      <option>Parent</option>
                      <option>Visitor</option>
                    </select>
                  </div>
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isAnonymous}
                    className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow disabled:opacity-50"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-lg border bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow"
                  >
                    <option value="">Feedback Category</option>
                    <option>Academic Quality</option>
                    <option>Faculty</option>
                    <option>Infrastructure</option>
                    <option>Placements</option>
                    <option>Administration</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Your feedback..."
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.5)] transition-shadow resize-none"
                  />
                  <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    Submit anonymously
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 text-sm font-semibold bg-gold text-foreground rounded-lg shadow-[0_4px_16px_hsl(var(--gold)/0.3)] hover:shadow-[0_6px_24px_hsl(var(--gold)/0.4)] transition-shadow active:scale-[0.97] disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <PageGallery images={data?.pageGallery} />
    </Layout>
  );
}
