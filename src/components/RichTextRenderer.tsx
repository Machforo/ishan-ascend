import React from 'react';
import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  content?: string;
  className?: string;
  fallbackText?: string;
}

export default function RichTextRenderer({ content, className, fallbackText }: RichTextRendererProps) {
  const displayContent = content || fallbackText;
  
  if (!displayContent) return null;

  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(displayContent);

  if (hasHtml) {
    return (
      <div 
        className={cn("prose prose-slate max-w-none space-y-4", className)}
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />
    );
  }

  return (
    <div className={cn("whitespace-pre-wrap", className)}>
      {displayContent}
    </div>
  );
}
