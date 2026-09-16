import { SectionLayoutItem } from "@/hooks/usePageLayout";
import { rt } from "@/lib/richText";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CustomSectionRenderer({ section }: { section: SectionLayoutItem }) {
  const ref = useScrollReveal();

  if (section.isHidden) return null;

  // 1. Raw / Custom Dangerous HTML template (URL-based / Admin custom sections)
  if (section.type === "custom_html" || (!section.type && section.htmlContent)) {
    const rawHtml = section.htmlContent || "";
    if (!rawHtml.trim()) return null;

    if (typeof window !== 'undefined') {
      if (!(window as any).__renderedCustomHtmls) {
        (window as any).__renderedCustomHtmls = new Set();
      }
      (window as any).__renderedCustomHtmls.add(rawHtml.replace(/\s+/g, ' ').trim());
    }

    return (
      <section className="page-custom-section py-8">
        <div
          className="rich-text w-full max-w-7xl mx-auto px-4"
          dangerouslySetInnerHTML={{ __html: rt(rawHtml) }}
        />
      </section>
    );
  }

  // 2. Hero / Banner Strip
  if (section.type === "hero") {
    return (
      <section className="relative py-20 sm:py-28 overflow-hidden bg-navy text-white" ref={ref}>
        {section.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={section.image}
              alt={section.heading || "Banner"}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/70" />
          </div>
        )}

        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <div className="reveal">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {section.description}
              </p>
            )}
            {section.htmlContent && (
              <div
                className="rich-text text-white/90 max-w-2xl mx-auto mb-8 text-left"
                dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
              />
            )}
            {section.ctaText && (
              <Link to={section.ctaLink || "/contact"}>
                <button className="bg-gold text-slate-900 hover:bg-gold/90 px-8 py-3 rounded-lg text-base font-semibold shadow-lg transition-colors">
                  {section.ctaText}
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 3. Content & Image Split
  if (section.type === "split") {
    return (
      <section className="py-16 sm:py-24 bg-background" ref={ref}>
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 reveal-left">
              {section.subheading && (
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gold uppercase block mb-3">
                  {section.subheading}
                </span>
              )}
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {section.heading || section.name}
              </h2>
              {section.description && (
                <p className="text-foreground/70 leading-relaxed text-base mb-6">
                  {section.description}
                </p>
              )}
              {section.htmlContent && (
                <div
                  className="rich-text text-foreground/80 leading-relaxed text-base mb-6"
                  dangerouslySetInnerHTML={{ __html: rt(section.htmlContent) }}
                />
              )}
              {section.ctaText && (
                <Link to={section.ctaLink || "/contact"}>
                  <button className="bg-navy text-white hover:bg-navy/90 px-6 py-2.5 rounded-lg flex items-center gap-2">
                    {section.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              )}
            </div>

            {section.image && (
              <div className="md:col-span-5 reveal-right">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/60">
                  <img
                    src={section.image}
                    alt={section.heading || "Feature Image"}
                    className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 4. Feature Cards Grid
  if (section.type === "cards") {
    const cardItems = Array.isArray(section.items) && section.items.length > 0 ? section.items : [];
    return (
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-border/40" ref={ref}>
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal">
            {section.subheading && (
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-gold uppercase block mb-3">
                {section.subheading}
              </span>
            )}
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {section.description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cardItems.map((item: any, i: number) => (
              <div
                key={item.title || i}
                className="bg-card p-6 sm:p-8 rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition-shadow"
              >
                {item.icon ? (
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-5 font-bold">
                    {item.icon}
                  </div>
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-gold mb-5" />
                )}
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc || item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 5. Call To Action Strip
  if (section.type === "cta") {
    return (
      <section className="py-16 bg-navy text-white text-center" ref={ref}>
        <div className="container-wide max-w-3xl mx-auto reveal">
          <h2 className="text-3xl font-bold mb-4">{section.heading || section.name}</h2>
          {section.description && (
            <p className="text-white/80 text-base mb-8">{section.description}</p>
          )}
          {section.ctaText && (
            <Link to={section.ctaLink || "/contact"}>
              <button className="bg-gold text-slate-900 hover:bg-gold/90 px-8 py-3.5 rounded-xl font-bold shadow-lg">
                {section.ctaText}
              </button>
            </Link>
          )}
        </div>
      </section>
    );
  }

  // 6. FAQ Accordion Section
  if (section.type === "faq") {
    const faqItems = Array.isArray(section.items) ? section.items : [];
    return (
      <section className="py-16 bg-background" ref={ref}>
        <div className="container-wide max-w-3xl mx-auto">
          <div className="text-center mb-10 reveal">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {section.heading || section.name}
            </h2>
            {section.description && (
              <p className="text-muted-foreground text-sm">{section.description}</p>
            )}
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item: any, idx: number) => (
              <AccordionItem key={idx} value={`custom-faq-${idx}`} className="bg-card rounded-xl border px-5">
                <AccordionTrigger className="font-semibold text-foreground py-4 text-sm sm:text-base">
                  {item.q || item.question || item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-4">
                  {item.a || item.answer || item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }

  return null;
}
