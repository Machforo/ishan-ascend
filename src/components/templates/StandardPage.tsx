import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import PageSections from "@/components/PageSections";
import PageGallery from "@/components/PageGallery";

export interface PageSection {
  id: string;
  type: "hero" | "content" | "grid" | "call-to-action";
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  image?: string;
  className?: string;
  items?: any[];
}

export interface StandardPageProps {
  pageTitle: string;
  pageSubtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  sections: PageSection[];
  children?: React.ReactNode;
}

export default function StandardPage({ pageTitle, pageSubtitle, breadcrumbs, sections, children }: StandardPageProps) {
  const ref = useScrollReveal([sections]);

  const renderSection = (section: PageSection, index: number) => {
    switch (section.type) {
      case "hero":
        return (
          <section key={section.id} className={cn("py-20 md:py-28", section.className)}>
            <div className="container-wide">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {section.image && (
                  <div className={cn("reveal-left relative", index % 2 === 1 && "lg:order-last")}>
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent z-10" />
                       <img src={section.image} alt={section.title || "Section Image"} className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                )}
                <div className="reveal-right space-y-6">
                  {section.subtitle && (
                    <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-bold tracking-widest uppercase">
                      {section.subtitle}
                    </span>
                  )}
                  {section.title && (
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 leading-[1.15] tracking-tight">
                      {section.title}
                    </h2>
                  )}
                  <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
        
      case "content":
        return (
          <section key={section.id} className={cn("py-16 md:py-24 bg-slate-50/50", section.className)}>
            <div className="container-wide">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                {section.subtitle && <p className="text-gold font-bold uppercase tracking-widest text-sm">{section.subtitle}</p>}
                {section.title && <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">{section.title}</h2>}
                <div className="text-slate-600 leading-relaxed text-lg text-left">
                  {section.content}
                </div>
              </div>
            </div>
          </section>
        );

      case "grid":
        return (
          <section key={section.id} className={cn("py-16 md:py-24", section.className)}>
            <div className="container-wide">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                 {section.subtitle && <p className="text-gold font-bold uppercase tracking-widest text-sm mb-4">{section.subtitle}</p>}
                 {section.title && <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">{section.title}</h2>}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items?.map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                    {item.icon && <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center mb-6">{item.icon}</div>}
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout>
      <PageHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumbs={breadcrumbs}
      />
      <div ref={ref}>
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    {children}
    <PageSections />
      </Layout>
  );
}
