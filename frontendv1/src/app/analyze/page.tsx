import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analyzer } from "@/components/analysis/analyzer";

export const metadata: Metadata = {
  title: "Analyze a paper",
  description:
    "Upload a research paper and get a summary, its domain, keywords, and related work.",
};

export default function AnalyzePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
          <div className="mb-8 max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold tracking-tight">
              Analyze a paper
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Upload a PDF and Papermind will return a summary, the research
              domain, its keywords, and related papers — in one pass.
            </p>
          </div>
          <Analyzer />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
