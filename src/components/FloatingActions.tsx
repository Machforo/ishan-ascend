import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Phone, ArrowUpRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function WhatsAppButton() {
  const phoneNumber = "919569394675";
  const message = encodeURIComponent("I want to inquire more about IIMT");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-16 bg-navy text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl border border-white/10"
          >
            WhatsApp Click to Chat
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-navy rotate-45 border-r border-t border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] flex items-center justify-center transition-shadow hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" />
      </motion.a>
    </div>
  );
}

export function ChatBot() {
  return null;
}

export function QuickEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", question: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://ishan-backend-g096.onrender.com/api/iimt";
      const response = await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.phone}@placeholder.com`,
          phone: formData.phone,
          message: formData.question,
          source: "Floating Action Quick Enquiry"
        }),
      });

      if (!response.ok) throw new Error("Failed to submit enquiry");

      console.log("Enquiry submitted:", formData);
      setIsSubmitted(true);
      toast.success("Enquiry sent successfully! Our counsellor will contact you.");

      // Reset after some time
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setFormData({ name: "", phone: "", question: "" });
      }, 3000);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="fixed right-0 top-[40%] -translate-y-1/2 z-[55]">
      {!isOpen ? (
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          onClick={() => setIsOpen(true)}
          className="bg-gold text-foreground py-4 px-2 rounded-l-xl shadow-xl flex flex-col items-center gap-4 group"
        >
          <span className="[writing-mode:vertical-lr] rotate-180 uppercase tracking-widest font-bold text-sm">Quick Enquiry</span>
          <Phone size={18} />
        </motion.button>
      ) : (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          className="bg-card border-l shadow-2xl w-80 p-6 rounded-l-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-navy">Quick Enquiry</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="text-success" size={32} />
              </div>
              <h4 className="font-display font-bold text-navy text-xl">Thank You!</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Your enquiry has been received. We will get back to you shortly.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm rounded-lg border bg-muted outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm rounded-lg border bg-muted outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <textarea
                placeholder="Your Question"
                rows={3}
                required
                value={formData.question}
                onChange={(e) => setFormData(p => ({ ...p, question: e.target.value }))}
                className="w-full px-4 py-2.5 text-sm rounded-lg border bg-muted outline-none resize-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" id="contact-counsellor" className="mt-1 accent-gold" defaultChecked />
                <label htmlFor="contact-counsellor" className="text-xs text-muted-foreground">I want the counsellor to contact us</label>
              </div>
              <button type="submit" className="w-full py-3 bg-navy text-white text-sm font-bold rounded-lg shadow-lg hover:bg-navy-dark transition-all active:scale-[0.98]">
                Send Enquiry
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}
