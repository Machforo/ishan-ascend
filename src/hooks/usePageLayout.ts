import { useQuery } from "@tanstack/react-query";

export interface SectionLayoutItem {
  id: string;
  name: string;
  type: 'builtin' | 'custom_html' | 'hero' | 'split' | 'cards' | 'cta' | 'faq';
  order: number;
  isHidden: boolean;
  heading?: string;
  subheading?: string;
  description?: string;
  htmlContent?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: any[];
  settings?: any;
}

export interface PageLayoutResponse {
  siteKey: string;
  pageId: string;
  sections: SectionLayoutItem[];
  isDefault?: boolean;
}

export function usePageLayout(pageId: string) {
  return useQuery<PageLayoutResponse>({
    queryKey: ["iimt-page-layout", pageId],
    queryFn: async () => {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      try {
        const response = await fetch(`${apiBase}/iimt/page-layout/${pageId}`);
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn(`Could not load page layout from ${apiBase}:`, err);
      }
      // If primary failed and was not localhost, try local fallback
      if (apiBase !== "http://localhost:5000/api") {
        try {
          const fb = await fetch(`http://localhost:5000/api/iimt/page-layout/${pageId}`);
          if (fb.ok) return await fb.json();
        } catch {}
      }
      return { siteKey: 'iimt', pageId, sections: [] };
    },
    staleTime: 1000 * 30, // 30 seconds fresh
    refetchOnWindowFocus: true,
  });
}
