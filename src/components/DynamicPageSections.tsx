import React, { ReactNode } from "react";
import { usePageLayout, SectionLayoutItem } from "@/hooks/usePageLayout";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DynamicPageSectionsProps {
  pageId: string;
  defaultSections: Record<string, ReactNode>;
  defaultOrder: string[];
}

export default function DynamicPageSections({
  pageId,
  defaultSections,
  defaultOrder
}: DynamicPageSectionsProps) {
  const { data: layoutData, isLoading } = usePageLayout(pageId);
  const containerRef = useScrollReveal([layoutData, defaultSections]);

  // If loading or no valid sections array received, render default order
  if (isLoading || !layoutData || !Array.isArray(layoutData.sections) || layoutData.sections.length === 0) {
    return (
      <div ref={containerRef}>
        {defaultOrder.map((id) => (
          <React.Fragment key={id}>{defaultSections[id] || null}</React.Fragment>
        ))}
      </div>
    );
  }

  const sections: SectionLayoutItem[] = layoutData.sections;
  const renderedIds = new Set<string>();

  return (
    <div ref={containerRef}>
      {sections.map((sec) => {
        // Skip hidden sections
        if (sec.isHidden) {
          renderedIds.add(sec.id);
          renderedIds.add(sec.id.replace(/-/g, "_"));
          renderedIds.add(sec.id.replace(/_/g, "-"));
          return null;
        }

        // Direct or aliased match (hyphen vs underscore)
        const direct = defaultSections[sec.id];
        const under = defaultSections[sec.id.replace(/-/g, "_")];
        const dash = defaultSections[sec.id.replace(/_/g, "-")];
        const target = direct || under || dash;

        if (target) {
          renderedIds.add(sec.id);
          renderedIds.add(sec.id.replace(/-/g, "_"));
          renderedIds.add(sec.id.replace(/_/g, "-"));
          return <React.Fragment key={sec.id}>{target}</React.Fragment>;
        }

        // Otherwise, render custom section (custom_html, hero, split, cards, cta, faq)
        if (sec.type === "custom_html" || sec.htmlContent || sec.type === "hero" || sec.type === "split" || sec.type === "cards" || sec.type === "cta" || sec.type === "faq") {
          return <CustomSectionRenderer key={sec.id} section={sec} />;
        }

        return null;
      })}

      {/* Crucial Safety: Render any default sections that were not returned by the backend layout and not hidden */}
      {defaultOrder.map((id) => {
        if (!renderedIds.has(id) && defaultSections[id]) {
          return <React.Fragment key={id}>{defaultSections[id]}</React.Fragment>;
        }
        return null;
      })}
    </div>
  );
}
