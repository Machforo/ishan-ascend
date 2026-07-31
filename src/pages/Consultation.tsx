import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { User, Phone, BookOpen, Send, Calendar, Clock, CheckCircle } from "lucide-react";
import PageGallery from "@/components/PageGallery";

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <PageHeader 
        title="Book a Consultation with Ishan" 
        subtitle="Speak directly with our expert counsellors to find the perfect programme that aligns with your career goals."
      />
      
      <div className="container-wide py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-navy mb-4">Why Book a Consultation?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Choosing the right professional degree is the most important decision of your career. Our academic counsellors are here to help you navigate your options, understand the placement landscape, and find your perfect fit at IIMT.
              </p>
            </div>
            
            <ul className="space-y-6">
              {[
                { title: "Personalized Career Path", desc: "Get tailored advice based on your strengths and goals." },
                { title: "Course Details & Curriculum", desc: "Understand exactly what you'll learn and how it applies to the real world." },
                { title: "Placement & Internship Opportunities", desc: "Learn about our 150+ corporate tie-ups and average salary packages." },
                { title: "Scholarship Guidance", desc: "Find out if you qualify for merit-based or early-bird scholarships." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-border/50">
              {submitted ? (
                <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-success" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-navy">Booking Confirmed!</h3>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your consultation has been scheduled. Our academic counsellor will contact you shortly to confirm the details.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({name: "", phone: "", course: "", date: "", time: ""}); }}
                    className="mt-8 px-8 py-3 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-navy-dark transition-all"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8 text-center sm:text-left">
                    <h3 className="text-2xl font-display font-bold text-navy mb-2">Schedule Your Session</h3>
                    <p className="text-muted-foreground">Fill in the details below and we'll arrange a call.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy ml-1">Full Name *</label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            type="text" 
                            required 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" 
                            placeholder="John Doe" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy ml-1">Mobile Number *</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            type="tel" 
                            required 
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" 
                            placeholder="+91 XXXXX XXXXX" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy ml-1">Programme of Interest *</label>
                      <div className="relative">
                        <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <select 
                          required 
                          value={formData.course}
                          onChange={e => setFormData({...formData, course: e.target.value})}
                          className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white appearance-none transition-all text-sm cursor-pointer"
                        >
                          <option value="" disabled>Select Programme</option>
                          <option value="BBA">BBA (Bachelor of Business Administration)</option>
                          <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                          <option value="B.Com">B.Com (Bachelor of Commerce)</option>
                          <option value="M.Com">M.Com (Master of Commerce)</option>
                          <option value="B.Ed">B.Ed (Bachelor of Education)</option>
                          <option value="M.Ed">M.Ed (Master of Education)</option>
                          <option value="Not Sure">Not sure yet, need guidance</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy ml-1">Preferred Date *</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input 
                            type="date" 
                            required 
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                            className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white transition-all text-sm" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-navy ml-1">Preferred Time *</label>
                        <div className="relative">
                          <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <select 
                            required 
                            value={formData.time}
                            onChange={e => setFormData({...formData, time: e.target.value})}
                            className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border rounded-xl outline-none focus:ring-2 focus:ring-gold/60 focus:bg-white appearance-none transition-all text-sm cursor-pointer"
                          >
                            <option value="" disabled>Select Time Slot</option>
                            <option value="Morning">Morning (10:00 AM - 12:00 PM)</option>
                            <option value="Afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                            <option value="Evening">Evening (4:00 PM - 6:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-navy-dark transition-all flex items-center justify-center gap-2 group mt-4">
                      Book Consultation Now
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting this form, you agree to our privacy policy and authorize IIMT to contact you regarding your consultation.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    <PageGallery />
      </Layout>
  );
}
