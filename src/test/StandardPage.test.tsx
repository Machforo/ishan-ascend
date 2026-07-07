import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StandardPage from "@/components/templates/StandardPage";
import { BrowserRouter } from "react-router-dom";

// Mocking useScrollReveal
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => ({ current: null })
}));

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("StandardPage Template", () => {
  it("renders page header and sections correctly", () => {
    const sections = [
      {
        id: "hero-1",
        type: "hero" as const,
        title: "Hero Section Title",
        content: "Hero content goes here",
      },
      {
        id: "content-1",
        type: "content" as const,
        title: "Content Section Title",
        content: "Detailed content goes here",
      }
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <StandardPage 
            pageTitle="Test Page Title" 
            pageSubtitle="Test Page Subtitle"
            sections={sections} 
          />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Check Header
    expect(screen.getByText("Test Page Title")).toBeInTheDocument();
    expect(screen.getByText("Test Page Subtitle")).toBeInTheDocument();

    // Check Hero Section
    expect(screen.getByText("Hero Section Title")).toBeInTheDocument();
    expect(screen.getByText("Hero content goes here")).toBeInTheDocument();

    // Check Content Section
    expect(screen.getByText("Content Section Title")).toBeInTheDocument();
    expect(screen.getByText("Detailed content goes here")).toBeInTheDocument();
  });
});
