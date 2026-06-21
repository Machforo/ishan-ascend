import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EnquiryCTA from "@/components/EnquiryCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIIMTData } from "@/hooks/useIIMTData";

const defaultFaqCategories = [
  {
    category: "General & Admissions Information",
    faqs: [
      {
        q: "What courses are offered at IIMT Greater Noida?",
        a: "IIMT offers a variety of undergraduate and postgraduate programs including BBA, BCA, B.Com, M.Com, B.Ed, and M.Ed, all affiliated with CCS University and recognized by UGC."
      },
      {
        q: "Is IIMT affiliated with any University?",
        a: "Yes, all our academic programs are affiliated with Chaudhary Charan Singh (CCS) University, Meerut, and are approved by the appropriate regulatory bodies like NCTE (for Education) and UGC."
      },
      {
        q: "What are the eligibility criteria for BBA/BCA?",
        a: "For BBA and BCA, candidates must have passed 10+2 with a minimum of 45% marks (40% for SC/ST). For BCA, Mathematics at the high school or intermediate level is preferred."
      }
    ]
  },
  {
    category: "Placement & Campus Life",
    faqs: [
      {
        q: "What is the placement record of IIMT?",
        a: "IIMT has a robust placement cell with a track record of over 90% placement success. Our students are placed in top MNCs including Barclays, HDFC Bank, ICICI Bank, Infosys, and TCS."
      },
      {
        q: "Does the institute provide hostel facilities?",
        a: "Yes, IIMT provides separate, well-furnished hostel facilities for both boys and girls with all modern amenities, including Wi-Fi, 24/7 security, and hygienic mess facilities."
      },
      {
        q: "Are there any scholarship programs available?",
        a: "Yes, IIMT offers merit-based scholarships to deserving students. Additionally, students can also apply for state government scholarships as per the eligibility norms."
      }
    ]
  }
];

export default function FAQsPage() {
  const { data } = useIIMTData("admissions");

  // If API provides faqs array, group them into a single category; otherwise fall back to default
  const faqCategories = data?.faqs?.length > 0
    ? [{ category: "Frequently Asked Questions", faqs: data.faqs.map((f: any) => ({ q: f.question, a: f.answer })) }]
    : defaultFaqCategories;

  const ref = useScrollReveal([faqCategories]);

  return (
    <Layout>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common queries about admissions, fees, campus life, and career outcomes"
        breadcrumbs={[{ label: "Admissions", href: "/admissions" }, { label: "FAQs" }]}
      />

      <section className="py-20 md:py-28" ref={ref}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto space-y-10">
            {faqCategories.map((cat, ci) => (
              <div key={cat.category} className={`reveal delay-${Math.min(ci, 4)}00`}>
                <h2 className="text-xl font-display font-bold text-foreground mb-4">{cat.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {cat.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`${ci}-${i}`} className="border rounded-lg bg-card px-5">
                      <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-foreground/70 leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </Layout>
  );
}
