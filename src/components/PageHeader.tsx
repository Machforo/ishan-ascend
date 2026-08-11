import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  const ref = useScrollReveal();

  return (
    <section className="bg-navy relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold) / 0.3) 0%, transparent 50%)" }} />
      </div>
      <div className="relative container-wide pt-28 pb-16 md:pt-36 md:pb-24">
        <h1 className="reveal delay-100 text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          /<\/?[a-z][\s\S]*>/i.test(subtitle) ? (
            <div 
              className="reveal delay-200 mt-4 text-lg text-primary-foreground/60 max-w-2xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          ) : (
            <p className="reveal delay-200 mt-4 text-lg text-primary-foreground/60 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )
        )}
      </div>
    </section>
  );
}
