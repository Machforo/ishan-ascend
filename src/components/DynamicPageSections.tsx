import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { usePageLayout, SectionLayoutItem } from "@/hooks/usePageLayout";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import PageGallery from "@/components/PageGallery";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DynamicPageSectionsProps {
  pageId: string;
  defaultSections?: Record<string, ReactNode>;
  defaultOrder?: string[];
  renderSection?: (id: string) => ReactNode;
}

export default function DynamicPageSections({
  pageId,
  defaultSections,
  defaultOrder,
  renderSection,
}: DynamicPageSectionsProps) {
  const location = useLocation();
  if (typeof window !== "undefined") {
    (window as any).__renderedDynamicPagePath = location.pathname;
  }
  const { data: layoutData, isLoading } = usePageLayout(pageId);
  const containerRef = useScrollReveal([layoutData, defaultSections]);

  // Safe fallback calculation for effectiveOrder: ensures .map is never called on undefined
  const effectiveOrder: string[] =
    defaultOrder && defaultOrder.length > 0
      ? defaultOrder
      : defaultSections
      ? Object.keys(defaultSections)
      : [];

  const resolveSectionNode = (id: string): ReactNode => {
    if (renderSection) {
      const node = renderSection(id);
      if (node) return node;
    }
    if (!defaultSections) return null;
    const under = id.replace(/-/g, "_");
    const dash = id.replace(/_/g, "-");
    return defaultSections[id] || defaultSections[under] || defaultSections[dash] || null;
  };

  // If loading or no valid sections array received, render fallback order
  if (isLoading || !layoutData || !Array.isArray(layoutData.sections) || layoutData.sections.length === 0) {
    return (
      <div ref={containerRef}>
        {effectiveOrder.map((id) => (
          <React.Fragment key={id}>{resolveSectionNode(id)}</React.Fragment>
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

        // Direct or aliased match
        const target = resolveSectionNode(sec.id);
        if (target) {
          renderedIds.add(sec.id);
          renderedIds.add(sec.id.replace(/-/g, "_"));
          renderedIds.add(sec.id.replace(/_/g, "-"));
          return <React.Fragment key={sec.id}>{target}</React.Fragment>;
        }

        // Built-in gallery section placed in layout
        if (sec.id === "gallery" || sec.id === "page_gallery" || sec.type === "gallery" || sec.id.includes("gallery")) {
          renderedIds.add(sec.id);
          return <PageGallery key={sec.id} isInline={true} />;
        }

        // Custom section added by user (custom_html, hero, split, cards, cta, faq)
        if (
          sec.type === "custom_html" ||
          sec.htmlContent ||
          sec.type === "hero" ||
          sec.type === "split" ||
          sec.type === "cards" ||
          sec.type === "cta" ||
          sec.type === "faq"
        ) {
          return <CustomSectionRenderer key={sec.id} section={sec} />;
        }

        return null;
      })}

      {/* Crucial Safety: Render any default sections that were not returned by the backend layout and not hidden */}
      {effectiveOrder.map((id) => {
        if (!renderedIds.has(id)) {
          const node = resolveSectionNode(id);
          if (node) {
            return <React.Fragment key={id}>{node}</React.Fragment>;
          }
        }
        return null;
      })}
    </div>
  );
}
