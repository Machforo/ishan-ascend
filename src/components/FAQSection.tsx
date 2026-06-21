import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIIMTData } from "@/hooks/useIIMTData";

const faqs = [
  {
    question: "What courses are offered at IIMT Greater Noida?",
    answer: "IIMT offers a variety of undergraduate and postgraduate programs including BBA, BCA, B.Com, M.Com, B.Ed, and M.Ed, all affiliated with CCS University and recognized by UGC."
  },
  {
    question: "Is IIMT affiliated with any University?",
    answer: "Yes, all our academic programs are affiliated with Chaudhary Charan Singh (CCS) University, Meerut, and are approved by the appropriate regulatory bodies like NCTE (for Education) and UGC."
  },
  {
    question: "What is the placement record of IIMT?",
    answer: "IIMT has a robust placement cell with a track record of over 90% placement success. Our students are placed in top MNCs including Barclays, HDFC Bank, ICICI Bank, Infosys, and TCS."
  },
  {
    question: "What are the eligibility criteria for BBA/BCA?",
    answer: "For BBA and BCA, candidates must have passed 10+2 with a minimum of 45% marks (40% for SC/ST). For BCA, Mathematics at the high school or intermediate level is preferred."
  },
  {
    question: "Does the institute provide hostel facilities?",
    answer: "Yes, IIMT provides separate, well-furnished hostel facilities for both boys and girls with all modern amenities, including Wi-Fi, 24/7 security, and hygienic mess facilities."
  },
  {
    question: "Are there any scholarship programs available?",
    answer: "Yes, IIMT offers merit-based scholarships to deserving students. Additionally, students can also apply for state government scholarships as per the eligibility norms."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data } = useIIMTData("admissions");
  const faqList = data?.faqs?.length > 0 ? data.faqs : faqs;
  const ref = useScrollReveal([faqList]);

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">Common Inquiries</p>
            <h2 className="reveal delay-100 text-3xl md:text-5xl font-display font-bold text-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((faq: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`border rounded-2xl overflow-hidden transition-shadow duration-300 ${openIndex === i ? "border-gold shadow-lg shadow-gold/5" : "border-muted hover:border-gold/30"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? "bg-gold text-white" : "bg-muted text-navy/40"}`}>
                      <MessageSquare size={18} />
                    </div>
                    <span className="font-bold text-navy text-base md:text-lg leading-tight">{faq.question}</span>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${openIndex === i ? "bg-gold/10 rotate-180" : "bg-muted/50 rotate-0"}`}>
                    <ChevronDown size={20} className={openIndex === i ? "text-gold" : "text-navy/20"} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-foreground/70 leading-relaxed bg-card">
                        <div className="pl-14 border-l-2 border-gold/20 ml-5 py-2">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
